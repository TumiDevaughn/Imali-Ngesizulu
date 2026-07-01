import React, { useState, useEffect, useRef } from "react";
import { 
  Users, 
  Lock, 
  Sparkles, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Download, 
  Phone, 
  PhoneOff, 
  Plus, 
  Play, 
  Search, 
  Radio, 
  Trash2, 
  FileText, 
  Hand, 
  Check, 
  X, 
  Clock, 
  HelpCircle,
  AlertTriangle,
  Flame,
  UserCheck,
  UserX,
  Compass
} from "lucide-react";
import { Role } from "../types";

// Types for Imali Meetings
export interface MeetingParticipant {
  id: string;
  name: string;
  role: Role;
  isMuted: boolean;
  hasHandRaised: boolean;
  canSpeak: boolean;
  joinedAt: string;
}

export interface MeetingState {
  roomId: string;
  roomName: string;
  topic: string;
  startedAt: string | null;
  isLive: boolean;
  scheduledTime?: string;
  participants: MeetingParticipant[];
}

interface ImaliMeetingsProps {
  language: "en" | "zu";
  activeRole: Role;
  studentDetails: { name: string; email: string; activationCode: string };
  instructorDetails: { name: string; email: string };
  adminDetails: { name: string; email: string };
  setActiveTab: (tab: string) => void;
}

export default function ImaliMeetings({
  language,
  activeRole,
  studentDetails,
  instructorDetails,
  adminDetails,
  setActiveTab
}: ImaliMeetingsProps) {
  // Local auth for meeting dashboard
  const [meetingAuth, setMeetingAuth] = useState<{
    isAuthenticated: boolean;
    role: Role | null;
    email: string;
  }>(() => {
    const saved = localStorage.getItem("imali_meetings_auth");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return { isAuthenticated: false, role: null, email: "" };
  });

  // Login form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginRole, setLoginRole] = useState<Role.ADMIN | Role.INSTRUCTOR>(Role.INSTRUCTOR);
  const [loginError, setLoginError] = useState("");

  // Student join code state
  const [studentJoinCode, setStudentJoinCode] = useState("");
  const [studentDisplayName, setStudentDisplayName] = useState(
    studentDetails.name || localStorage.getItem("imali_student_name") || ""
  );
  const [studentJoinError, setStudentJoinError] = useState("");

  // Create meeting states
  const [roomName, setRoomName] = useState("");
  const [roomTopic, setRoomTopic] = useState("");
  const [startType, setStartType] = useState<"immediate" | "scheduled">("immediate");
  const [scheduledDateTime, setScheduledDateTime] = useState("");

  // Speed acceleration mode state (1 sec = 1 min) for quick testing of 60 mins limit
  const [isAccelerated, setIsAccelerated] = useState(false);

  // Active meeting state
  const [meeting, setMeeting] = useState<MeetingState | null>(null);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [showWarningPopup, setShowWarningPopup] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);

  // Textarea notes
  const [hostNotes, setHostNotes] = useState("");
  const [studentNotes, setStudentNotes] = useState("");

  // Student specific active state inside a joined meeting
  const [joinedParticipantId, setJoinedParticipantId] = useState<string>("");
  const [disconnectionMessage, setDisconnectionMessage] = useState("");

  // Load active meeting on mount & keep in sync
  useEffect(() => {
    loadMeetingState();
    
    // Polling interval for fast reactivity
    const interval = setInterval(() => {
      loadMeetingState();
    }, 1500);

    // Cross-tab synchronization
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "imali_active_meeting_v1") {
        loadMeetingState();
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorage);
    };
  }, [joinedParticipantId]);

  const loadMeetingState = () => {
    const data = localStorage.getItem("imali_active_meeting_v1");
    if (data) {
      try {
        const parsed: MeetingState = JSON.parse(data);
        setMeeting(parsed);

        // Check if student was removed by instructor
        if (joinedParticipantId && parsed.participants) {
          const stillIn = parsed.participants.some(p => p.id === joinedParticipantId);
          if (!stillIn) {
            setJoinedParticipantId("");
            setDisconnectionMessage(
              language === "en" 
                ? "You have been disconnected from the meeting room by the moderator."
                : "Ukhishiwe ekamelweni lomhlangano ngomphathi."
            );
          }
        }
      } catch (e) {
        setMeeting(null);
      }
    } else {
      setMeeting(null);
      if (joinedParticipantId) {
        setJoinedParticipantId("");
        setDisconnectionMessage(
          language === "en"
            ? "The meeting has ended and the room was closed by the host."
            : "Umhlangano usuphelile futhi ikamelo livaliwe ngomphathi."
        );
      }
    }
  };

  // Keep elapsed timer ticking
  useEffect(() => {
    if (!meeting || !meeting.isLive || !meeting.startedAt) {
      setSecondsElapsed(0);
      return;
    }

    const interval = setInterval(() => {
      const start = new Date(meeting.startedAt!).getTime();
      const now = new Date().getTime();
      let diffSeconds = Math.floor((now - start) / 1000);

      if (isAccelerated) {
        // Acceleration mode: tick 60 times faster
        // We use a custom stored state or multiply seconds elapsed
        setSecondsElapsed(prev => {
          const next = prev + 1; // Ticks 1 virtual minute per real second
          
          // Trigger the 5-minute warning at 55 virtual minutes
          if (next === 55) {
            setShowWarningPopup(true);
          }
          
          // Auto end meeting at 60 virtual minutes
          if (next >= 60) {
            clearInterval(interval);
            autoEndMeeting();
            return 60;
          }
          return next;
        });
      } else {
        const actualMins = Math.floor(diffSeconds / 60);
        setSecondsElapsed(actualMins);

        // Warning at 55 minutes
        if (actualMins === 55 && !showWarningPopup) {
          setShowWarningPopup(true);
        }

        // Auto end at 60 minutes
        if (actualMins >= 60) {
          clearInterval(interval);
          autoEndMeeting();
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [meeting?.isLive, meeting?.startedAt, isAccelerated]);

  // Audio recording timer ticking
  useEffect(() => {
    let recInterval: any;
    if (isRecording) {
      recInterval = setInterval(() => {
        setRecordingSeconds(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingSeconds(0);
    }
    return () => clearInterval(recInterval);
  }, [isRecording]);

  // Handler for staff login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    const targetEmail = loginEmail.trim().toLowerCase();
    const targetPassword = loginPassword.trim();

    // Verification check as requested: "info@imalingesizulu.com" & "IMALI-SECURE-2026"
    if (targetEmail === "info@imalingesizulu.com" && targetPassword === "IMALI-SECURE-2026") {
      const auth = {
        isAuthenticated: true,
        role: loginRole,
        email: targetEmail
      };
      setMeetingAuth(auth);
      localStorage.setItem("imali_meetings_auth", JSON.stringify(auth));
      setLoginEmail("");
      setLoginPassword("");
    } else {
      setLoginError(
        language === "en"
          ? "Invalid professional email or Syndicate Access Key."
          : "I-imeyili engavumelekile noma iKhodi Enkulu engalungile."
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("imali_meetings_auth");
    setMeetingAuth({ isAuthenticated: false, role: null, email: "" });
  };

  // Create meeting room
  const handleCreateMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomName.trim()) return;

    const code = "IMALI-MEET-" + Math.floor(1000 + Math.random() * 9000);
    const newMeeting: MeetingState = {
      roomId: code,
      roomName: roomName.trim(),
      topic: roomTopic.trim() || "Financial Syndicate Open Forum",
      startedAt: startType === "immediate" ? new Date().toISOString() : null,
      isLive: startType === "immediate",
      scheduledTime: startType === "scheduled" ? scheduledDateTime : undefined,
      participants: [
        {
          id: "moderator_" + Math.random().toString(36).substr(2, 9),
          name: meetingAuth.role === Role.ADMIN ? "Dean Admin" : "Lead Instructor",
          role: meetingAuth.role || Role.INSTRUCTOR,
          isMuted: false,
          hasHandRaised: false,
          canSpeak: true,
          joinedAt: new Date().toISOString()
        }
      ]
    };

    localStorage.setItem("imali_active_meeting_v1", JSON.stringify(newMeeting));
    setMeeting(newMeeting);
    setRoomName("");
    setRoomTopic("");
    setSecondsElapsed(0);
    setShowWarningPopup(false);
    setIsRecording(false);
    setHostNotes("");
  };

  // Student Join Meeting
  const handleStudentJoin = (e: React.FormEvent) => {
    e.preventDefault();
    setStudentJoinError("");
    setDisconnectionMessage("");

    if (!studentJoinCode.trim()) {
      setStudentJoinError(language === "en" ? "Please enter an Invitation Code." : "Sicela ufake iKhodi Yesimemo.");
      return;
    }

    if (!studentDisplayName.trim()) {
      setStudentJoinError(language === "en" ? "Please enter your name." : "Sicela ufake igama lakho.");
      return;
    }

    const saved = localStorage.getItem("imali_active_meeting_v1");
    if (!saved) {
      setStudentJoinError(language === "en" ? "No active meetings are scheduled." : "Akukho mihlangano esebenzayo.");
      return;
    }

    try {
      const activeMeeting: MeetingState = JSON.parse(saved);
      if (activeMeeting.roomId.toUpperCase() !== studentJoinCode.trim().toUpperCase()) {
        setStudentJoinError(
          language === "en" 
            ? "Invalid room code. Please check your invitation link."
            : "Ikhodi engavumelekile. Sicela uhlole isimemo sakho."
        );
        return;
      }

      if (!activeMeeting.isLive) {
        setStudentJoinError(
          language === "en"
            ? "This scheduled room is currently closed. Wait for the instructor to launch."
            : "Leli kamelo livaliwe okwamanje. Linda umfundisi ukuthi aliqale."
        );
        return;
      }

      // Check if student is already joined
      const participantId = "student_" + Math.random().toString(36).substr(2, 9);
      const updatedParticipants = [
        ...activeMeeting.participants,
        {
          id: participantId,
          name: studentDisplayName.trim(),
          role: Role.STUDENT,
          isMuted: true, // students join muted by default
          hasHandRaised: false,
          canSpeak: false,
          joinedAt: new Date().toISOString()
        }
      ];

      const updatedMeeting = { ...activeMeeting, participants: updatedParticipants };
      localStorage.setItem("imali_active_meeting_v1", JSON.stringify(updatedMeeting));
      setMeeting(updatedMeeting);
      setJoinedParticipantId(participantId);
      setStudentNotes("");
    } catch (e) {
      setStudentJoinError("Error joining room.");
    }
  };

  // Student Raise Hand
  const toggleRaiseHand = () => {
    if (!meeting || !joinedParticipantId) return;

    const updatedParticipants = meeting.participants.map(p => {
      if (p.id === joinedParticipantId) {
        return { ...p, hasHandRaised: !p.hasHandRaised };
      }
      return p;
    });

    const updatedMeeting = { ...meeting, participants: updatedParticipants };
    localStorage.setItem("imali_active_meeting_v1", JSON.stringify(updatedMeeting));
    setMeeting(updatedMeeting);
  };

  // Student Mute/Unmute self (only if speaking is enabled)
  const toggleStudentMuteSelf = () => {
    if (!meeting || !joinedParticipantId) return;

    const updatedParticipants = meeting.participants.map(p => {
      if (p.id === joinedParticipantId && p.canSpeak) {
        return { ...p, isMuted: !p.isMuted };
      }
      return p;
    });

    const updatedMeeting = { ...meeting, participants: updatedParticipants };
    localStorage.setItem("imali_active_meeting_v1", JSON.stringify(updatedMeeting));
    setMeeting(updatedMeeting);
  };

  // Instructor/Admin permissions
  const acceptSpeakingRequest = (studentId: string) => {
    if (!meeting) return;

    const updatedParticipants = meeting.participants.map(p => {
      if (p.id === studentId) {
        return { ...p, canSpeak: true, isMuted: false, hasHandRaised: false };
      }
      return p;
    });

    const updatedMeeting = { ...meeting, participants: updatedParticipants };
    localStorage.setItem("imali_active_meeting_v1", JSON.stringify(updatedMeeting));
    setMeeting(updatedMeeting);
  };

  const rejectSpeakingRequest = (studentId: string) => {
    if (!meeting) return;

    const updatedParticipants = meeting.participants.map(p => {
      if (p.id === studentId) {
        return { ...p, hasHandRaised: false };
      }
      return p;
    });

    const updatedMeeting = { ...meeting, participants: updatedParticipants };
    localStorage.setItem("imali_active_meeting_v1", JSON.stringify(updatedMeeting));
    setMeeting(updatedMeeting);
  };

  const muteParticipant = (participantId: string) => {
    if (!meeting) return;

    const updatedParticipants = meeting.participants.map(p => {
      if (p.id === participantId) {
        return { ...p, isMuted: true, canSpeak: false };
      }
      return p;
    });

    const updatedMeeting = { ...meeting, participants: updatedParticipants };
    localStorage.setItem("imali_active_meeting_v1", JSON.stringify(updatedMeeting));
    setMeeting(updatedMeeting);
  };

  const unmuteParticipant = (participantId: string) => {
    if (!meeting) return;

    const updatedParticipants = meeting.participants.map(p => {
      if (p.id === participantId) {
        return { ...p, isMuted: false, canSpeak: true };
      }
      return p;
    });

    const updatedMeeting = { ...meeting, participants: updatedParticipants };
    localStorage.setItem("imali_active_meeting_v1", JSON.stringify(updatedMeeting));
    setMeeting(updatedMeeting);
  };

  const removeParticipant = (participantId: string) => {
    if (!meeting) return;

    const updatedParticipants = meeting.participants.filter(p => p.id !== participantId);
    const updatedMeeting = { ...meeting, participants: updatedParticipants };
    localStorage.setItem("imali_active_meeting_v1", JSON.stringify(updatedMeeting));
    setMeeting(updatedMeeting);
  };

  // Start a scheduled meeting
  const startScheduledMeeting = () => {
    if (!meeting) return;
    const updated = { ...meeting, isLive: true, startedAt: new Date().toISOString() };
    localStorage.setItem("imali_active_meeting_v1", JSON.stringify(updated));
    setMeeting(updated);
    setSecondsElapsed(0);
  };

  // Auto/Manual End Meeting
  const autoEndMeeting = () => {
    // Clear recording & warn state
    setIsRecording(false);
    setShowWarningPopup(false);
    
    // Clear state
    localStorage.removeItem("imali_active_meeting_v1");
    setMeeting(null);
  };

  const handleEndMeetingManually = () => {
    if (confirm(language === "en" ? "Are you sure you want to end this meeting? All temporary room data will be wiped." : "Uqinisekile ukuthi ufuna ukuqeda lo mhlangano? Yonke imininingwane izosulwa.")) {
      autoEndMeeting();
    }
  };

  // Student disconnect voluntarily
  const leaveAsStudent = () => {
    if (!meeting || !joinedParticipantId) return;

    const updatedParticipants = meeting.participants.filter(p => p.id !== joinedParticipantId);
    const updatedMeeting = { ...meeting, participants: updatedParticipants };
    localStorage.setItem("imali_active_meeting_v1", JSON.stringify(updatedMeeting));
    
    setJoinedParticipantId("");
    setMeeting(null);
  };

  // Real browser text file downloader helper
  const triggerTextDownload = (filename: string, content: string) => {
    const file = new Blob([content], { type: "text/plain;charset=utf-8" });
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Simulated WAV file generator for premium compliance
  const triggerAudioDownload = (filename: string) => {
    // Generate simple metadata saying 'IMALI Audio Recording' inside binary stream
    const header = new TextEncoder().encode("RIFF....WAVEfmt ");
    const file = new Blob([header], { type: "audio/wav" });
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6 w-full animate-fade-in text-white">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-900 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold tracking-widest text-[#D4AF37] uppercase bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/25">
              👑 {language === "en" ? "IMALI AUDIO MEETINGS" : "IMIHANGANO YE-IMALI"}
            </span>
            {meeting?.isLive && (
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
            )}
          </div>
          <h2 className="text-3xl font-serif font-light text-white tracking-wide uppercase mt-2">
            {language === "en" ? "Syndicate" : "Ibandla"}{" "}
            <span className="text-[#D4AF37] italic font-normal">Audio Suite</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-1 max-w-2xl font-sans">
            {language === "en" 
              ? "Premium private voice channels, master seminars, and real-time audio rooms for the IMALI elite education network."
              : "Amakhasimende wephrofeshinali eliphakeme, izinkundla zokucobelelana ngolwazi zomsindo, nemicimbi ebukhoma."}
          </p>
        </div>

        {/* ACCELERATION TOGGLE */}
        <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-900 p-2 rounded-xl shrink-0">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-zinc-500 font-mono">⚡ {language === "en" ? "Time Warp" : "Sheshisa Isikhathi"}</span>
            <button
              onClick={() => setIsAccelerated(!isAccelerated)}
              className={`px-3 py-1 text-[10px] rounded font-mono font-black uppercase tracking-wider transition ${
                isAccelerated 
                  ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20" 
                  : "bg-zinc-900 text-zinc-400 hover:text-white"
              }`}
            >
              {isAccelerated ? "60x ACTIVE" : "NORMAL"}
            </button>
          </div>
        </div>
      </div>

      {/* WARNING POPUP - 5 MINS REMAINING */}
      {showWarningPopup && (
        <div className="bg-gradient-to-r from-red-950/90 to-amber-950/90 border-2 border-red-500/50 p-6 rounded-2xl shadow-2xl relative overflow-hidden animate-bounce-mild">
          <div className="absolute top-0 right-0 p-2">
            <button 
              onClick={() => setShowWarningPopup(false)}
              className="text-zinc-400 hover:text-white text-xs p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <div className="space-y-2">
              <h4 className="text-base font-bold text-white uppercase tracking-wider">
                ⏳ 5 Minutes Remaining in Session!
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed max-w-2xl">
                {language === "en"
                  ? "5 minutes remaining. Please download your notes and recording before the meeting ends. The room will automatically reset and delete temporary data in 5 minutes."
                  : "Kusele imizuzu emi-5. Sicela ulande amanothi akho kanye nokurekodiwe ngaphambi kokuba umhlangano uphele."}
              </p>
              <div className="flex gap-3 pt-2">
                {meetingAuth.isAuthenticated && (
                  <button 
                    onClick={() => triggerTextDownload(`${meeting?.roomName || "meeting"}_host_notes.txt`, hostNotes)}
                    className="px-4 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[#D4AF37] text-[10px] font-mono rounded"
                  >
                    Download Host Notes
                  </button>
                )}
                {joinedParticipantId && (
                  <button 
                    onClick={() => triggerTextDownload("my_personal_meeting_notes.txt", studentNotes)}
                    className="px-4 py-1.5 bg-[#D4AF37] hover:brightness-110 text-black text-[10px] font-mono font-bold rounded"
                  >
                    Download My Notes
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DISCONNECTION ALERT */}
      {disconnectionMessage && (
        <div className="bg-red-950/50 border border-red-500/30 p-4 rounded-xl text-xs text-zinc-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-red-400 font-bold">⚠️ DISCONNECTED:</span>
            <span>{disconnectionMessage}</span>
          </div>
          <button 
            onClick={() => setDisconnectionMessage("")}
            className="text-zinc-500 hover:text-white font-mono"
          >
            DISMISS
          </button>
        </div>
      )}

      {/* MEETING STATES RENDERING */}
      {/* 1. STUDENT ROOM ACTIVE */}
      {joinedParticipantId && meeting && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Meeting Stage & Speakers (Left & Middle Columns) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#050505] border border-zinc-900 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[400px]">
              <div className="absolute top-0 right-0 p-4">
                <span className="text-[10px] font-mono bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1 rounded-full uppercase font-bold animate-pulse">
                  🎙️ Student Listening Stream
                </span>
              </div>

              {/* Room details */}
              <div className="space-y-1">
                <h3 className="text-xl font-serif text-white tracking-wide uppercase">
                  {meeting.roomName}
                </h3>
                <p className="text-xs text-zinc-400 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#D4AF37]" /> {meeting.topic}
                </p>
                <div className="flex flex-wrap gap-2 pt-2.5">
                  <span className="text-[9px] bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded font-mono">
                    Room Code: <strong className="text-white">{meeting.roomId}</strong>
                  </span>
                  <span className="text-[9px] bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#D4AF37]" /> 
                    Elapsed: <strong className="text-amber-400">{secondsElapsed} / 60 Mins</strong>
                  </span>
                </div>
              </div>

              {/* Dynamic Soundwave Visualizer */}
              <div className="my-10 flex flex-col items-center justify-center space-y-4">
                <div className="flex items-end justify-center gap-1.5 h-16 w-full max-w-sm">
                  {Array.from({ length: 15 }).map((_, i) => {
                    // Check if anyone is speaking to animate the sound bars
                    const activeSpeakers = meeting.participants.filter(p => !p.isMuted && p.canSpeak);
                    const isAnySpeaking = activeSpeakers.length > 0;
                    
                    return (
                      <div
                        key={i}
                        className={`w-1 bg-[#D4AF37] rounded-full transition-all duration-300 ${
                          isAnySpeaking 
                            ? "animate-pulse" 
                            : "opacity-45"
                        }`}
                        style={{
                          height: isAnySpeaking 
                            ? `${Math.max(12, Math.floor(Math.random() * 64))}px` 
                            : "10px",
                          animationDelay: `${i * 80}ms`,
                          animationDuration: "400ms"
                        }}
                      ></div>
                    );
                  })}
                </div>
                <div className="text-center">
                  <p className="text-xs font-mono text-zinc-400">
                    {meeting.participants.some(p => !p.isMuted && p.canSpeak) 
                      ? "⚡ Live Audio Transmitting..." 
                      : "🔇 Stream Silent (Speakers Muted)"}
                  </p>
                </div>
              </div>

              {/* Bottom controls */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-zinc-900 pt-5">
                {/* Active Micro state for Student */}
                {(() => {
                  const me = meeting.participants.find(p => p.id === joinedParticipantId);
                  if (!me) return null;

                  return (
                    <div className="flex items-center gap-4">
                      {me.canSpeak ? (
                        <button
                          onClick={toggleStudentMuteSelf}
                          className={`flex items-center gap-2 py-2 px-4 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition ${
                            me.isMuted 
                              ? "bg-red-500 text-white hover:bg-red-600" 
                              : "bg-emerald-500 text-black hover:bg-emerald-600"
                          }`}
                        >
                          {me.isMuted ? (
                            <>
                              <MicOff className="w-4 h-4" /> Unmute Mic
                            </>
                          ) : (
                            <>
                              <Mic className="w-4 h-4 animate-bounce" /> Mute Mic
                            </>
                          )}
                        </button>
                      ) : (
                        <div className="bg-zinc-900 border border-zinc-800 p-2.5 rounded-xl text-[10px] text-zinc-400 flex items-center gap-2">
                          <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>Mic Locked. Raise your hand to speak.</span>
                        </div>
                      )}

                      {/* Hand raise request button */}
                      <button
                        onClick={toggleRaiseHand}
                        className={`flex items-center gap-1.5 py-2 px-4 rounded-xl text-xs font-mono uppercase font-black tracking-widest transition border ${
                          me.hasHandRaised 
                            ? "bg-amber-500/10 border-amber-500 text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.1)]"
                            : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
                        }`}
                      >
                        <Hand className={`w-4 h-4 ${me.hasHandRaised ? "animate-bounce" : ""}`} />
                        {me.hasHandRaised ? "Hand Raised" : "Raise Hand ✋"}
                      </button>
                    </div>
                  );
                })()}

                <button
                  onClick={leaveAsStudent}
                  className="py-2 px-5 bg-red-600 hover:bg-red-700 text-white text-xs font-mono font-bold uppercase rounded-xl transition flex items-center gap-1.5"
                >
                  <PhoneOff className="w-4 h-4" /> Leave Room
                </button>
              </div>
            </div>

            {/* Private Notes Section */}
            <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                <h4 className="text-sm font-bold font-mono text-[#D4AF37] uppercase flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Personal Notes Scratchpad
                </h4>
                <button
                  onClick={() => triggerTextDownload(`${meeting.roomName}_personal_notes.txt`, studentNotes)}
                  disabled={!studentNotes.trim()}
                  className="py-1.5 px-3 bg-[#D4AF37] hover:brightness-110 disabled:opacity-35 disabled:cursor-not-allowed text-black text-[10px] font-mono font-bold rounded-lg uppercase tracking-wider transition flex items-center gap-1"
                >
                  <Download className="w-3 h-3" /> Download Notes
                </button>
              </div>
              <p className="text-[11px] text-zinc-500 leading-relaxed font-sans">
                Write down your personal key findings, calculations, and strategies here. These notes are fully confidential, never stored on our servers, and can only be downloaded by you.
              </p>
              <textarea
                value={studentNotes}
                onChange={(e) => setStudentNotes(e.target.value)}
                placeholder="Type your personal insights, currency targets, or questions to ask the host..."
                className="w-full h-40 bg-zinc-900/60 border border-zinc-805 p-3 rounded-xl text-xs text-zinc-200 outline-none focus:border-[#D4AF37] resize-none font-sans"
              />
            </div>
          </div>

          {/* Participant Presence Sidebar (Right Column) */}
          <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-6 space-y-4 h-fit">
            <h4 className="text-sm font-bold font-mono text-[#D4AF37] uppercase border-b border-zinc-900 pb-3 flex items-center gap-2">
              <Users className="w-4 h-4" /> Attendees ({meeting.participants.length})
            </h4>
            <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
              {meeting.participants.map(p => (
                <div key={p.id} className="flex items-center justify-between bg-zinc-900/40 p-3 rounded-xl border border-zinc-900">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center text-xs border border-zinc-700 font-bold uppercase">
                      {p.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-200">
                        {p.name} {p.id === joinedParticipantId && " (You)"}
                      </p>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-[#D4AF37]">
                        {p.role}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {p.hasHandRaised && (
                      <span className="text-xs animate-bounce" title="Hand Raised">✋</span>
                    )}
                    {p.canSpeak ? (
                      p.isMuted ? (
                        <MicOff className="w-3.5 h-3.5 text-red-400" title="Muted" />
                      ) : (
                        <Mic className="w-3.5 h-3.5 text-emerald-400 animate-pulse" title="Active Speaker" />
                      )
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-zinc-600" title="Mic Locked" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. STAFF WORKSPACE (INSTRUCTOR OR ADMIN VIEW) */}
      {meetingAuth.isAuthenticated && (
        <div className="space-y-6">
          {/* Subheader with Role status & exit */}
          <div className="bg-zinc-950 border border-zinc-900 p-4 rounded-2xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-zinc-400 font-mono uppercase">
                Staff Identity Verified: <strong className="text-white">{meetingAuth.role} • info@imalingesizulu.com</strong>
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="text-[10px] font-mono font-black uppercase text-red-400 hover:text-red-300 tracking-wider"
            >
              Disconnect Session ✖
            </button>
          </div>

          {/* ACTIVE MEETING ROOM CONTROLS */}
          {meeting ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
              
              {/* Main controls (Left & Middle Column) */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-[#050505] border border-zinc-900 rounded-3xl p-6 flex flex-col justify-between min-h-[420px] relative overflow-hidden">
                  
                  {/* Flashing Live Tag */}
                  <div className="absolute top-0 right-0 p-4 flex items-center gap-2">
                    {meeting.isLive ? (
                      <span className="text-[10px] font-mono bg-red-600/10 text-red-400 border border-red-500/35 px-3 py-1 rounded-full uppercase font-bold animate-pulse flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span> Live Seminar Active
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono bg-amber-500/10 text-amber-500 border border-amber-500/20 px-3 py-1 rounded-full uppercase font-bold">
                        📅 Scheduled Meeting Room
                      </span>
                    )}
                  </div>

                  {/* Header info */}
                  <div className="space-y-2.5">
                    <span className="text-[9px] bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/25 px-2.5 py-0.5 rounded font-mono font-bold tracking-wider uppercase">
                      Imali Academic Control Console
                    </span>
                    <h3 className="text-2xl font-serif text-white uppercase tracking-wide">
                      {meeting.roomName}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans max-w-xl">
                      {meeting.topic}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-3">
                      <div className="bg-zinc-900 border border-zinc-850 rounded-lg p-2.5 text-center shrink-0 min-w-[120px]">
                        <p className="text-[9px] text-zinc-500 font-mono uppercase">Room Access Code</p>
                        <p className="text-sm font-bold font-mono text-[#D4AF37] tracking-wider uppercase mt-1">
                          {meeting.roomId}
                        </p>
                      </div>

                      <div className="bg-zinc-900 border border-zinc-850 rounded-lg p-2.5 text-center shrink-0 min-w-[150px]">
                        <p className="text-[9px] text-zinc-500 font-mono uppercase">Ticking Active Timer</p>
                        <p className="text-sm font-bold font-mono text-amber-500 mt-1 flex items-center justify-center gap-1">
                          <Clock className="w-4 h-4 text-[#D4AF37]" /> {secondsElapsed} / 60 Mins
                        </p>
                      </div>

                      {!meeting.isLive && meeting.scheduledTime && (
                        <div className="bg-zinc-900 border border-zinc-850 rounded-lg p-2.5 text-center shrink-0 min-w-[150px]">
                          <p className="text-[9px] text-zinc-500 font-mono uppercase">Scheduled Date</p>
                          <p className="text-[11px] font-mono text-white mt-1.5 font-bold">
                            {meeting.scheduledTime.replace("T", " ")}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Sound Wave / Transmitting Area */}
                  {meeting.isLive ? (
                    <div className="my-10 py-6 border border-zinc-900 bg-zinc-950/40 rounded-2xl flex flex-col items-center justify-center space-y-4">
                      <div className="flex items-end justify-center gap-1.5 h-12 w-full max-w-xs">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <div
                            key={i}
                            className="w-1 bg-[#D4AF37] rounded-full animate-pulse h-12"
                            style={{
                              animationDelay: `${i * 120}ms`,
                              animationDuration: "500ms"
                            }}
                          ></div>
                        ))}
                      </div>
                      <p className="text-xs font-mono text-zinc-400">
                        🎙️ Transmitting High-Definition Voice Stream...
                      </p>
                    </div>
                  ) : (
                    <div className="my-10 p-6 border border-dashed border-zinc-800 rounded-2xl text-center space-y-3">
                      <p className="text-xs text-zinc-400">
                        The room is scheduled. Click below to start transmitting the stream immediately.
                      </p>
                      <button
                        onClick={startScheduledMeeting}
                        className="py-2.5 px-6 bg-gradient-to-r from-[#D4AF37] to-[#aa7c11] text-black text-xs font-mono font-black uppercase tracking-widest rounded-xl hover:brightness-110 transition cursor-pointer"
                      >
                        🚀 Launch Live Stream Now
                      </button>
                    </div>
                  )}

                  {/* Action Controls */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-zinc-900 pt-5">
                    <div className="flex flex-wrap gap-2.5">
                      {/* Audio Recording Toggle */}
                      {meeting.isLive && (
                        <button
                          onClick={() => setIsRecording(!isRecording)}
                          className={`flex items-center gap-2 py-2.5 px-5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition ${
                            isRecording 
                              ? "bg-red-500 text-white animate-pulse" 
                              : "bg-zinc-900 border border-zinc-800 text-red-500 hover:bg-zinc-800"
                          }`}
                        >
                          <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block"></span>
                          {isRecording 
                            ? `Stop Recording (${Math.floor(recordingSeconds / 60)}m ${recordingSeconds % 60}s)` 
                            : "Record Meeting Audio"}
                        </button>
                      )}

                      {/* Download Simulated Recording */}
                      {isRecording === false && recordingSeconds > 0 && (
                        <button
                          onClick={() => triggerAudioDownload(`${meeting.roomName}_audio_recording.wav`)}
                          className="flex items-center gap-1.5 py-2.5 px-4 bg-zinc-900 border border-zinc-800 text-[#D4AF37] hover:border-[#D4AF37] hover:bg-zinc-850 rounded-xl text-xs font-mono uppercase transition"
                        >
                          <Download className="w-4 h-4" /> Download Recording
                        </button>
                      )}
                    </div>

                    <button
                      onClick={handleEndMeetingManually}
                      className="py-2.5 px-5 bg-red-600 hover:bg-red-700 text-white text-xs font-mono font-bold uppercase rounded-xl transition flex items-center gap-1.5"
                    >
                      <PhoneOff className="w-4 h-4" /> End Meeting Room
                    </button>
                  </div>
                </div>

                {/* Instructor Notes Panel */}
                <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                    <h4 className="text-sm font-bold font-mono text-[#D4AF37] uppercase flex items-center gap-2">
                      <FileText className="w-4 h-4" /> Syndicate Meeting Notes
                    </h4>
                    <button
                      onClick={() => triggerTextDownload(`${meeting.roomName}_notes_official.txt`, hostNotes)}
                      disabled={!hostNotes.trim()}
                      className="py-1.5 px-3 bg-[#D4AF37] hover:brightness-110 disabled:opacity-35 disabled:cursor-not-allowed text-black text-[10px] font-mono font-bold rounded-lg uppercase tracking-wider transition flex items-center gap-1"
                    >
                      <Download className="w-3 h-3" /> Download Notes
                    </button>
                  </div>
                  <textarea
                    value={hostNotes}
                    onChange={(e) => setHostNotes(e.target.value)}
                    placeholder="Write official meeting records, strategy notes, financial definitions, and homework for the student cohort..."
                    className="w-full h-44 bg-zinc-900/60 border border-zinc-805 p-3 rounded-xl text-xs text-zinc-200 outline-none focus:border-[#D4AF37] resize-none font-sans"
                  />
                  <p className="text-[10px] text-zinc-500 font-mono">
                    ⚠️ Note: meeting notes are temporarily cached in current browser window memory. Download them before ending the session.
                  </p>
                </div>
              </div>

              {/* Attendee Management & Speaking Requests (Right Column) */}
              <div className="space-y-6">
                
                {/* Speaking Requests Queue */}
                <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-6 space-y-4">
                  <h4 className="text-sm font-bold font-mono text-amber-500 uppercase border-b border-zinc-900 pb-3 flex items-center gap-1.5">
                    <Hand className="w-4 h-4 animate-bounce" /> Speaking Requests ({meeting.participants.filter(p => p.hasHandRaised).length})
                  </h4>
                  {meeting.participants.filter(p => p.hasHandRaised).length === 0 ? (
                    <p className="text-xs text-zinc-500 italic py-4 text-center">
                      No pending hand-raising speaking requests.
                    </p>
                  ) : (
                    <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                      {meeting.participants.filter(p => p.hasHandRaised).map(p => (
                        <div key={p.id} className="bg-zinc-900/60 border border-amber-500/20 p-3 rounded-xl flex items-center justify-between">
                          <div>
                            <p className="text-xs font-bold text-white">{p.name}</p>
                            <span className="text-[9px] font-mono text-amber-400">Student • Requesting Mic</span>
                          </div>
                          <div className="flex gap-1">
                            <button
                              onClick={() => acceptSpeakingRequest(p.id)}
                              className="p-1.5 bg-emerald-500 text-black hover:bg-emerald-600 rounded-lg transition"
                              title="Accept & Unmute"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => rejectSpeakingRequest(p.id)}
                              className="p-1.5 bg-red-600 text-white hover:bg-red-700 rounded-lg transition"
                              title="Reject Request"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Attendee Presence & Moderation Sidebar */}
                <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                    <h4 className="text-sm font-bold font-mono text-[#D4AF37] uppercase flex items-center gap-2">
                      <Users className="w-4 h-4" /> Active Attendees ({meeting.participants.length})
                    </h4>
                  </div>

                  <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1">
                    {meeting.participants.map(p => {
                      const isMod = p.role === Role.ADMIN || p.role === Role.INSTRUCTOR;
                      return (
                        <div key={p.id} className="bg-zinc-900/40 p-3 rounded-xl border border-zinc-900/80 flex items-center justify-between">
                          <div className="space-y-0.5">
                            <p className="text-xs font-bold text-zinc-100 flex items-center gap-1">
                              {p.name}
                              {isMod && (
                                <span className="text-[8px] bg-[#D4AF37]/10 border border-[#D4AF37]/35 text-[#D4AF37] px-1 rounded uppercase tracking-tighter">HOST</span>
                              )}
                            </p>
                            <p className="text-[9px] font-mono text-zinc-500 uppercase">
                              {p.role} {p.canSpeak ? "• Enabled" : "• Muted"}
                            </p>
                          </div>

                          {!isMod && (
                            <div className="flex items-center gap-1">
                              {/* Mute/Unmute button */}
                              {p.canSpeak ? (
                                <button
                                  onClick={() => muteParticipant(p.id)}
                                  className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-red-400 rounded-lg transition"
                                  title="Force Mute Participant"
                                >
                                  <MicOff className="w-3.5 h-3.5" />
                                </button>
                              ) : (
                                <button
                                  onClick={() => unmuteParticipant(p.id)}
                                  className="p-1.5 bg-zinc-850 hover:bg-zinc-800 text-emerald-400 rounded-lg transition"
                                  title="Enable Microphone"
                                >
                                  <Mic className="w-3.5 h-3.5" />
                                </button>
                              )}

                              {/* Remove participant */}
                              <button
                                onClick={() => removeParticipant(p.id)}
                                className="p-1.5 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white rounded-lg transition"
                                title="Remove from room"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Quick invite section */}
                  <div className="pt-3 border-t border-zinc-900 space-y-2 font-mono text-[10px]">
                    <div className="flex justify-between text-zinc-500 uppercase font-bold">
                      <span>🔗 Invite Code:</span>
                      <span className="text-white bg-zinc-900 px-1.5 py-0.5 rounded">{meeting.roomId}</span>
                    </div>
                    <p className="text-zinc-500 leading-normal font-sans">
                      Share the Invitation Room Code above with students. They will enter this code on their dashboard to join this voice seminar.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          ) : (
            /* CREATE MEETING VIEW */
            <div className="bg-[#050505] border border-zinc-900 rounded-3xl p-8 max-w-4xl mx-auto space-y-8 relative overflow-hidden">
              <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-[#D4AF37]/5 rounded-full blur-3xl animate-pulse"></div>

              <div className="space-y-2 border-b border-zinc-900 pb-5">
                <span className="text-[10px] bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/25 px-3 py-1 rounded-full font-mono font-bold uppercase tracking-widest block w-fit">
                  👑 ADMIN & INSTRUCTOR SCHEDULING UNIT
                </span>
                <h3 className="text-2xl font-serif font-light text-white uppercase tracking-wide">
                  Create Private <span className="text-[#D4AF37] italic font-normal">Audio Meeting Room</span>
                </h3>
                <p className="text-xs text-zinc-400 font-sans">
                  Configure real-time voice networks, assign topic descriptions, and schedule live seminar classrooms for the student body.
                </p>
              </div>

              <form onSubmit={handleCreateMeeting} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs text-zinc-400 font-mono uppercase block font-semibold">
                      Room Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Imperial Wealth Strategy Webinar"
                      value={roomName}
                      onChange={(e) => setRoomName(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-850 p-3 rounded-xl text-xs text-[#D4AF37] font-mono outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-zinc-400 font-mono uppercase block font-semibold">
                      Topic & Description
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Masterclass on RSI Overbought, Pivot Points & Hedging"
                      value={roomTopic}
                      onChange={(e) => setRoomTopic(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-850 p-3 rounded-xl text-xs text-[#D4AF37] font-mono outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs text-zinc-400 font-mono uppercase block font-semibold">
                    Scheduling Option
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-xs text-zinc-300 font-mono cursor-pointer">
                      <input
                        type="radio"
                        checked={startType === "immediate"}
                        onChange={() => setStartType("immediate")}
                        className="accent-[#D4AF37]"
                      />
                      Start Immediately (Launch Live)
                    </label>
                    <label className="flex items-center gap-2 text-xs text-zinc-300 font-mono cursor-pointer">
                      <input
                        type="radio"
                        checked={startType === "scheduled"}
                        onChange={() => setStartType("scheduled")}
                        className="accent-[#D4AF37]"
                      />
                      Schedule for later
                    </label>
                  </div>
                </div>

                {startType === "scheduled" && (
                  <div className="space-y-1.5 max-w-sm animate-fade-in">
                    <label className="text-xs text-zinc-400 font-mono uppercase block font-semibold">
                      Select Date & Time *
                    </label>
                    <input
                      type="datetime-local"
                      required
                      value={scheduledDateTime}
                      onChange={(e) => setScheduledDateTime(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-850 p-3 rounded-xl text-xs text-[#D4AF37] font-mono outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                )}

                <div className="bg-zinc-950/40 p-4 border border-zinc-900 rounded-xl space-y-1 font-sans text-xs text-zinc-400">
                  <p className="font-bold text-zinc-300">🛡️ SYSTEM RULE PROTOCOL:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Seminars have a strict maximum timeframe of 60 minutes.</li>
                    <li>Students can join only if they are invited and possess the room code.</li>
                    <li>To protect intellectual syndicate asset channels, all notes and recordings will be automatically wiped from the server upon room dissolution.</li>
                  </ul>
                </div>

                <button
                  type="submit"
                  className="py-3 px-8 bg-gradient-to-r from-[#D4AF37] to-[#aa7c11] hover:brightness-110 text-black text-xs font-mono font-black uppercase tracking-widest rounded-xl transition shadow-[0_4px_20px_rgba(212,175,55,0.15)] cursor-pointer"
                >
                  {startType === "immediate" ? "🚀 Create & Launch Room Now" : "📅 Register Room Schedule"}
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      {/* 3. NOT LOGGED IN / GUEST / STUDENT HOME (JOIN GATE) */}
      {!meetingAuth.isAuthenticated && !joinedParticipantId && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Student Join Area */}
          <div className="bg-[#050505] border border-zinc-900 rounded-3xl p-6 md:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/20 flex items-center justify-center text-xl">
                🎓
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xl font-serif text-white uppercase tracking-wide">
                  Join Private <span className="text-[#D4AF37] italic font-normal">Seminar Session</span>
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  Have an official invitation? Enter the Room Code and your name below to instantly join the private audio stream as a student listener.
                </p>
              </div>

              {studentJoinError && (
                <p className="bg-red-950/30 border border-red-500/20 text-red-400 text-[11px] font-mono p-2.5 rounded-lg">
                  ⚠️ {studentJoinError}
                </p>
              )}

              <form onSubmit={handleStudentJoin} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 font-mono uppercase block font-semibold">
                    Invitation Room Code *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. IMALI-MEET-8239"
                    value={studentJoinCode}
                    onChange={(e) => setStudentJoinCode(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-850 p-3 rounded-xl text-xs text-[#D4AF37] font-mono outline-none focus:border-[#D4AF37] uppercase placeholder:lowercase"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 font-mono uppercase block font-semibold">
                    Your Full Display Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={studentDisplayName}
                    onChange={(e) => setStudentDisplayName(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-850 p-3 rounded-xl text-xs text-white outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-zinc-900 border border-zinc-800 text-zinc-200 hover:text-[#D4AF37] hover:border-[#D4AF37] text-xs font-mono tracking-widest uppercase rounded-xl transition cursor-pointer font-bold flex items-center justify-center gap-2"
                >
                  <Volume2 className="w-4 h-4 text-[#D4AF37]" /> Join Audio Room Now
                </button>
              </form>
            </div>

            <div className="pt-5 border-t border-zinc-900 text-[10px] text-zinc-500 font-mono">
              ⚡ Students join voice rooms in listener-only mode. You can raise your hand to request voice transmission access during active sessions.
            </div>
          </div>

          {/* Admin & Instructor Private Lobby Gate */}
          <div className="bg-[#050505] border border-zinc-900 rounded-3xl p-6 md:p-8 space-y-6 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 bg-zinc-900/80 border-b border-l border-zinc-850 text-[9px] text-[#D4AF37] font-mono rounded-bl-xl uppercase font-bold tracking-widest">
              🔒 Faculty Only
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 flex items-center justify-center text-xl">
                🛡️
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xl font-serif text-white uppercase tracking-wide">
                  Faculty <span className="text-[#D4AF37] italic font-normal">Command Center</span>
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  Only verified Administrators and Instructors can create or coordinate private webinars. Login below using your professional credentials.
                </p>
              </div>

              {loginError && (
                <p className="bg-red-950/30 border border-red-500/20 text-red-400 text-[11px] font-mono p-2.5 rounded-lg">
                  ⚠️ {loginError}
                </p>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setLoginRole(Role.INSTRUCTOR)}
                    className={`py-2 text-[10px] font-mono rounded-lg border uppercase font-bold transition ${
                      loginRole === Role.INSTRUCTOR 
                        ? "bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37]" 
                        : "bg-zinc-950 border-zinc-900 text-zinc-500 hover:text-white"
                    }`}
                  >
                    Instructor
                  </button>
                  <button
                    type="button"
                    onClick={() => setLoginRole(Role.ADMIN)}
                    className={`py-2 text-[10px] font-mono rounded-lg border uppercase font-bold transition ${
                      loginRole === Role.ADMIN 
                        ? "bg-emerald-500/10 border-emerald-500 text-emerald-400" 
                        : "bg-zinc-950 border-zinc-900 text-zinc-500 hover:text-white"
                    }`}
                  >
                    Administrator
                  </button>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 font-mono uppercase block font-semibold">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. info@imalingesizulu.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-850 p-3 rounded-xl text-xs text-white outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 font-mono uppercase block font-semibold">
                    Syndicate Access Key *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-850 p-3 rounded-xl text-xs text-white outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#aa7c11] text-black hover:brightness-110 text-xs font-mono tracking-widest uppercase rounded-xl transition cursor-pointer font-bold shadow-lg shadow-[#D4AF37]/5"
                >
                  Verify Identity & Log In
                </button>
              </form>
            </div>

            <div className="pt-5 border-t border-zinc-900 text-[10px] text-zinc-500 font-mono">
              💡 Need verification? Use the Academy's Master Access Credential keys synced within the main profile manager.
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
