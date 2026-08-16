import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  ExternalLink, 
  Copy, 
  Check, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  HelpCircle, 
  Lock, 
  ChevronRight, 
  ChevronDown, 
  Edit3, 
  Send, 
  Headphones, 
  RefreshCw,
  Eye,
  Key
} from "lucide-react";
import { 
  Role, 
  User, 
  IndicatorAccessConfig, 
  IndicatorAccessRequest, 
  IndicatorAuditLog, 
  XMVerificationStatus, 
  TradingViewStatus, 
  IndicatorAccessStatus 
} from "../types";
import { 
  saveIndicatorRequestToCloud, 
  saveIndicatorAuditLogToCloud, 
  DEFAULT_INDICATOR_CONFIG 
} from "../lib/firebase";

interface IndicatorAccessProps {
  currentUser: User;
  activeRole: Role;
  language: "en" | "zu";
  config: IndicatorAccessConfig;
  userRequest?: IndicatorAccessRequest | null;
  onOpenContactSupport: (inquiryContext?: string) => void;
  onAddNotification?: (notification: {
    title_en: string;
    title_zu: string;
    message_en: string;
    message_zu: string;
    type: "system" | "live" | "grade";
  }) => void;
}

export const IndicatorAccess: React.FC<IndicatorAccessProps> = ({
  currentUser,
  activeRole,
  language,
  config,
  userRequest,
  onOpenContactSupport,
  onAddNotification
}) => {
  // Active Form Step (1: Join XM, 2: Return/Create, 3: Verify XM, 4: TradingView, 5: Review)
  const [currentStep, setCurrentStep] = useState<number>(() => {
    if (userRequest) {
      if (userRequest.indicatorAccessStatus === "ACTIVE") return 6;
      if (userRequest.indicatorAccessStatus === "PENDING") return 5;
      if (userRequest.xmVerificationStatus === "ACTION_REQUIRED" || userRequest.tradingViewStatus === "ACTION_REQUIRED") return 3;
    }
    return 1;
  });

  // Editing mode for Action Required or Updating pre-submission
  const [isEditingAfterSubmission, setIsEditingAfterSubmission] = useState<boolean>(false);

  // Form State
  const [xmAccountNumber, setXmAccountNumber] = useState<string>("");
  const [xmEmail, setXmEmail] = useState<string>("");
  const [tradingViewUsername, setTradingViewUsername] = useState<string>("");
  const [confirmedPartnerCode, setConfirmedPartnerCode] = useState<boolean>(false);

  // Form Error & Submission State
  const [formError, setFormError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);
  const [copiedPartnerCode, setCopiedPartnerCode] = useState<boolean>(false);

  // FAQ Expand state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Synchronize form when request is loaded
  useEffect(() => {
    if (userRequest) {
      setXmAccountNumber(userRequest.xmAccountNumber || "");
      setXmEmail(userRequest.xmEmail || "");
      setTradingViewUsername(userRequest.tradingViewUsername || "");
      setConfirmedPartnerCode(true);
    } else {
      // Default pre-fill user's email if available
      if (currentUser?.email && !xmEmail) {
        setXmEmail(currentUser.email);
      }
    }
  }, [userRequest, currentUser]);

  // Copy Partner Code Handler
  const handleCopyPartnerCode = () => {
    const code = config?.xmPartnerCode || DEFAULT_INDICATOR_CONFIG.xmPartnerCode;
    navigator.clipboard.writeText(code).then(() => {
      setCopiedPartnerCode(true);
      setTimeout(() => setCopiedPartnerCode(false), 2500);
    }).catch(() => {
      setCopiedPartnerCode(true);
      setTimeout(() => setCopiedPartnerCode(false), 2500);
    });
  };

  // Step Navigation Validators
  const handleStep1Complete = () => {
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStep2Complete = () => {
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStep3Complete = () => {
    setFormError("");
    if (!xmAccountNumber.trim()) {
      setFormError("Please enter your XM Account Number or Client Reference.");
      return;
    }
    if (!xmEmail.trim() || !xmEmail.includes("@")) {
      setFormError("Please enter a valid email address used for XM registration.");
      return;
    }
    if (!confirmedPartnerCode) {
      setFormError("Please confirm that you registered through the Imali Ngesizulu link using Partner Code UMAGAYI.");
      return;
    }
    setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStep4Complete = () => {
    setFormError("");
    if (!tradingViewUsername.trim()) {
      setFormError("Please enter your TradingView username so indicator access can be provisioned.");
      return;
    }
    setCurrentStep(5);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Submission to Cloud Database
  const handleSubmitRequest = async () => {
    if (isSubmitting) return;
    setFormError("");

    // Validate inputs
    if (!xmAccountNumber.trim() || !xmEmail.trim() || !tradingViewUsername.trim() || !confirmedPartnerCode) {
      setFormError("Please fill in all required fields before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const isUpdate = Boolean(userRequest && userRequest.id);
      const requestId = isUpdate ? userRequest!.id : `IMA-${Math.floor(10000 + Math.random() * 90000)}`;
      const timestamp = new Date().toISOString();

      const newRequest: IndicatorAccessRequest = {
        id: requestId,
        userId: currentUser.id || "usr_student",
        userName: currentUser.name || "Imali Scholar",
        userEmail: currentUser.email || xmEmail.trim(),
        xmEmail: xmEmail.trim(),
        xmAccountNumber: xmAccountNumber.trim(),
        partnerCode: config?.xmPartnerCode || DEFAULT_INDICATOR_CONFIG.xmPartnerCode,
        tradingViewUsername: tradingViewUsername.trim().replace(/^@/, ""),
        xmVerificationStatus: isUpdate && userRequest?.xmVerificationStatus === "VERIFIED" ? "VERIFIED" : "PENDING",
        tradingViewStatus: isUpdate && userRequest?.tradingViewStatus === "APPROVED" ? "APPROVED" : "SUBMITTED",
        indicatorAccessStatus: isUpdate && userRequest?.indicatorAccessStatus === "ACTIVE" ? "ACTIVE" : "PENDING",
        submittedAt: isUpdate ? userRequest!.submittedAt : timestamp,
        lastUpdatedAt: timestamp,
        adminNotes: userRequest?.adminNotes || "",
        actionRequiredReason: ""
      };

      // 1. Save to cloud Firestore
      await saveIndicatorRequestToCloud(newRequest);

      // 2. Create persistent audit log
      const auditLog: IndicatorAuditLog = {
        id: `audit_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        requestId: requestId,
        userId: currentUser.id || "usr_student",
        action: isUpdate ? "TRADINGVIEW_USERNAME_CHANGED" : "REQUEST_SUBMITTED",
        previousStatus: userRequest?.indicatorAccessStatus || "LOCKED",
        newStatus: newRequest.indicatorAccessStatus,
        reason: isUpdate ? "User updated submission details" : "Initial indicator access request submitted by user",
        timestamp: timestamp
      };
      await saveIndicatorAuditLogToCloud(auditLog);

      // 3. In-app notification
      if (onAddNotification) {
        onAddNotification({
          title_en: "Indicator Access Request Submitted",
          title_zu: "Isicelo Sokungena Kwenkomba Sithunyelwe",
          message_en: `Your request #${requestId} for UMAGAYI WE MALI INDICATOR V1 is now PENDING administrator review.`,
          message_zu: `Isicelo sakho #${requestId} se-UMAGAYI WE MALI INDICATOR V1 silinde ukubuyekezwa ngabaphathi.`,
          type: "system"
        });
      }

      setSubmissionSuccess(true);
      setIsEditingAfterSubmission(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      console.error("Submission error:", err);
      setFormError("We couldn't submit your request. Please try again or contact support.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentPartnerCode = config?.xmPartnerCode || DEFAULT_INDICATOR_CONFIG.xmPartnerCode;
  const currentReferralUrl = config?.xmReferralUrl || DEFAULT_INDICATOR_CONFIG.xmReferralUrl;
  const currentBannerUrl = config?.xmBannerUrl || DEFAULT_INDICATOR_CONFIG.xmBannerUrl;
  const currentIndicatorName = config?.indicatorName || DEFAULT_INDICATOR_CONFIG.indicatorName;

  // Determine current active status
  const currentAccessStatus = userRequest?.indicatorAccessStatus || (submissionSuccess ? "PENDING" : "LOCKED");
  const currentXmStatus = userRequest?.xmVerificationStatus || (submissionSuccess ? "PENDING" : "NOT_STARTED");
  const currentTvStatus = userRequest?.tradingViewStatus || (submissionSuccess ? "SUBMITTED" : "NOT_SUBMITTED");
  const isActionRequired = currentXmStatus === "ACTION_REQUIRED" || currentTvStatus === "ACTION_REQUIRED" || currentAccessStatus === "SUSPENDED";
  const isApproved = currentAccessStatus === "ACTIVE";
  const isPending = currentAccessStatus === "PENDING";
  const isRevoked = currentAccessStatus === "REVOKED";

  // Step tracker definitions
  const stepsList = [
    { num: 1, label: "Join XM", desc: "Open broker account" },
    { num: 2, label: "Create Account", desc: "Complete registration" },
    { num: 3, label: "Verify XM", desc: "Account reference" },
    { num: 4, label: "Add TradingView", desc: "TradingView username" },
    { num: 5, label: "Submit", desc: "Review details" },
    { num: 6, label: "Access", desc: "Indicator activation" }
  ];

  // Helper for step tracker status
  const getStepState = (stepNum: number) => {
    if (isApproved) return "completed";
    if (isPending && !isEditingAfterSubmission) {
      if (stepNum < 6) return "completed";
      if (stepNum === 6) return "active";
      return "upcoming";
    }
    if (stepNum < currentStep) return "completed";
    if (stepNum === currentStep) return "active";
    return "upcoming";
  };

  // FAQ Items (Verbatim from requirements)
  const faqList = [
    {
      q: "What is XM?",
      a: "XM is the regulated broker where you create and manage your trading account."
    },
    {
      q: "What is UMAGAYI WE MALI INDICATOR V1?",
      a: "It is the proprietary trading indicator that approved users will access directly through TradingView."
    },
    {
      q: "What is TradingView?",
      a: "TradingView is the charting platform where the indicator will be loaded and displayed on your charts."
    },
    {
      q: "What is the Partner Code?",
      a: `The current Partner Code is ${currentPartnerCode}. If XM asks for a Partner Code during the registration process, enter this code so your account can be verified.`
    },
    {
      q: "Why do you need my XM account/reference?",
      a: "It helps our administration verify that your registration is registered under the Imali Ngesizulu partner network."
    },
    {
      q: "Why do you need my TradingView username?",
      a: "It identifies the exact TradingView account that will receive invite-only access to the indicator."
    },
    {
      q: "Do you need my XM password?",
      a: "No. Never provide your trading or broker password to Imali Ngesizulu or anyone else."
    },
    {
      q: "Do you need my MT4 or MT5 password?",
      a: "No. We never collect or need trading platform passwords."
    },
    {
      q: "Do you need my TradingView password?",
      a: "No. We only need your public username to grant indicator access."
    },
    {
      q: "What happens after I submit?",
      a: "Your request is reviewed by our administration. You can return to this page at any time to check your real-time status."
    },
    {
      q: "Should I submit again while Pending?",
      a: "No. One request is enough. Your request is safely saved in our database."
    },
    {
      q: "I'm stuck. What should I do?",
      a: "Click the 'Contact Support' button to message our support desk directly via Telegram or email."
    }
  ];

  return (
    <div id="indicator_access_view" className="space-y-6 animate-fade-in font-sans text-left max-w-5xl mx-auto w-full pb-16">
      
      {/* 1. TOP HEADER & INTRO */}
      <div className="bg-gradient-to-br from-[#121212] via-[#0d0d0d] to-[#18150d] border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full text-[#D4AF37] text-[10px] font-mono uppercase tracking-widest mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Official Indicator Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-white tracking-tight">
              {currentIndicatorName}
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base mt-1.5 font-light">
              Get started in a few simple steps.
            </p>
          </div>

          {/* Quick status pill if user has an existing request */}
          {userRequest && (
            <div className="bg-black/60 border border-zinc-800 p-3 rounded-2xl flex items-center gap-3 shrink-0">
              <div className="text-right">
                <p className="text-[10px] font-mono text-zinc-400 uppercase">Request Ref</p>
                <p className="text-xs font-mono font-bold text-[#D4AF37]">#{userRequest.id}</p>
              </div>
              <div className="h-7 w-px bg-zinc-800"></div>
              <div className="text-left">
                <p className="text-[10px] font-mono text-zinc-400 uppercase">Status</p>
                <span className={`inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                  isApproved ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40" :
                  isActionRequired ? "bg-amber-500/20 text-amber-400 border border-amber-500/40 animate-pulse" :
                  isRevoked ? "bg-red-500/20 text-red-400 border border-red-500/40" :
                  "bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40"
                }`}>
                  {userRequest.indicatorAccessStatus}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* 2. PROGRESS TRACKER */}
        <div className="mt-8 pt-6 border-t border-zinc-800/80">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
            {stepsList.map((step) => {
              const state = getStepState(step.num);
              const isStepActive = state === "active";
              const isStepDone = state === "completed";

              return (
                <div
                  key={step.num}
                  className={`p-3 rounded-2xl border transition-all ${
                    isStepActive
                      ? "bg-[#D4AF37]/15 border-[#D4AF37] text-white shadow-[0_0_15px_rgba(212,175,55,0.15)] ring-1 ring-[#D4AF37]/50"
                      : isStepDone
                      ? "bg-emerald-950/20 border-emerald-500/40 text-emerald-300"
                      : "bg-black/30 border-zinc-850 text-zinc-400 opacity-80"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold font-mono ${
                      isStepDone
                        ? "bg-emerald-500 text-black"
                        : isStepActive
                        ? "bg-[#D4AF37] text-black"
                        : "bg-zinc-800 text-zinc-400"
                    }`}>
                      {isStepDone ? <Check className="w-3 h-3 stroke-[3]" /> : step.num}
                    </span>
                    {isStepActive && (
                      <span className="text-[9px] font-mono uppercase text-[#D4AF37] font-bold tracking-tighter">
                        Current
                      </span>
                    )}
                    {isStepDone && (
                      <span className="text-[9px] font-mono uppercase text-emerald-400 font-bold tracking-tighter">
                        Done ✓
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-bold truncate">{step.label}</p>
                  <p className="text-[10px] opacity-75 truncate">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. CONDITIONAL STATE SCREENS */}

      {/* ======================= STATE A: APPROVED / ACTIVE ======================= */}
      {isApproved && !isEditingAfterSubmission && (
        <div className="bg-gradient-to-b from-[#0a180e] to-[#0d0d0d] border-2 border-emerald-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-left animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <CheckCircle className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-white">
                Access Approved ✓
              </h2>
              <p className="text-emerald-400 text-xs font-mono uppercase tracking-wider">
                {currentIndicatorName} is active for your account
              </p>
            </div>
          </div>

          {/* Approved Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-black/50 border border-zinc-800 p-4 rounded-2xl">
              <p className="text-[10px] font-mono text-zinc-400 uppercase">XM Broker Status</p>
              <p className="text-sm font-bold text-emerald-400 mt-1 flex items-center gap-1.5">
                <Check className="w-4 h-4" /> VERIFIED
              </p>
              <p className="text-[10px] text-zinc-400 font-mono mt-0.5 truncate">Ref: {userRequest?.xmAccountNumber}</p>
            </div>

            <div className="bg-black/50 border border-zinc-800 p-4 rounded-2xl">
              <p className="text-[10px] font-mono text-zinc-400 uppercase">TradingView Username</p>
              <p className="text-sm font-bold text-white mt-1 truncate">
                @{userRequest?.tradingViewUsername}
              </p>
              <p className="text-[10px] text-emerald-400 font-mono mt-0.5">Assigned & Approved</p>
            </div>

            <div className="bg-black/50 border border-zinc-800 p-4 rounded-2xl">
              <p className="text-[10px] font-mono text-zinc-400 uppercase">Indicator Access</p>
              <p className="text-sm font-bold text-emerald-400 mt-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> ACTIVE
              </p>
              <p className="text-[10px] text-zinc-400 font-mono mt-0.5">Version {config?.indicatorVersion || "V1"}</p>
            </div>
          </div>

          {/* TradingView Launch Card */}
          <div className="bg-[#111] border border-emerald-500/30 p-6 rounded-2xl space-y-4">
            <div className="space-y-2">
              <h3 className="text-base font-bold text-white uppercase font-serif">
                How to use your indicator on TradingView:
              </h3>
              <ul className="text-xs text-zinc-300 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Your access has been approved for the TradingView username <strong>@{userRequest?.tradingViewUsername}</strong>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Open TradingView and sign in using that exact TradingView account.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>{currentIndicatorName}</strong> will be managed separately through TradingView's invite-only access system under <em>Indicators → Invite-Only Scripts</em>.</span>
                </li>
              </ul>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              {config?.tradingViewUrl ? (
                <a
                  href={config.tradingViewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  className="px-6 py-3 bg-[#D4AF37] hover:bg-amber-400 text-black font-mono text-xs uppercase font-bold tracking-wider rounded-xl transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open TradingView
                </a>
              ) : (
                <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 text-xs font-mono">
                  💡 TradingView access is being prepared. Please check again soon.
                </div>
              )}

              <button
                onClick={() => onOpenContactSupport("Indicator Access Support - Approved User")}
                className="px-4 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-mono text-xs uppercase font-bold tracking-wider rounded-xl border border-zinc-800 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Headphones className="w-4 h-4 text-[#D4AF37]" />
                Contact Support
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================= STATE B: ACTION REQUIRED ======================= */}
      {isActionRequired && !isEditingAfterSubmission && (
        <div className="bg-gradient-to-b from-[#221300] to-[#0d0d0d] border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-left animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-white">
                Action Required
              </h2>
              <p className="text-amber-400 text-xs font-mono uppercase tracking-wider">
                We need more information to verify your indicator request
              </p>
            </div>
          </div>

          <div className="bg-black/60 border border-amber-500/30 p-4 rounded-2xl space-y-2">
            <p className="text-[10px] font-mono text-amber-400 uppercase font-bold">
              Administrator Note / Reason:
            </p>
            <p className="text-sm text-zinc-200 leading-relaxed font-sans">
              {userRequest?.actionRequiredReason || userRequest?.adminNotes || "Please double check your XM account reference and TradingView username."}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => {
                setIsEditingAfterSubmission(true);
                setCurrentStep(3);
              }}
              className="px-6 py-3 bg-[#D4AF37] hover:bg-amber-400 text-black font-mono text-xs uppercase font-bold tracking-wider rounded-xl transition-all shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <Edit3 className="w-4 h-4" />
              Update Details
            </button>

            <button
              onClick={() => onOpenContactSupport(`Indicator Access Support - Request #${userRequest?.id}`)}
              className="px-5 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-mono text-xs uppercase font-bold tracking-wider rounded-xl border border-zinc-800 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Headphones className="w-4 h-4 text-[#D4AF37]" />
              Contact Support
            </button>
          </div>
        </div>
      )}

      {/* ======================= STATE C: PENDING REVIEW ======================= */}
      {isPending && !isEditingAfterSubmission && (
        <div className="bg-gradient-to-b from-[#141208] to-[#0d0d0d] border-2 border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-left animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <Clock className="w-7 h-7 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-white">
                Request Received ✓
              </h2>
              <p className="text-[#D4AF37] text-xs font-mono uppercase tracking-wider">
                Status: PENDING REVIEW
              </p>
            </div>
          </div>

          <p className="text-zinc-300 text-sm leading-relaxed">
            Your indicator access request has been submitted successfully. We are currently checking your XM registration and TradingView username. You do not need to submit another request.
          </p>

          {/* Submission Details Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-black/60 border border-zinc-800 p-4 rounded-2xl">
            <div>
              <p className="text-[10px] font-mono text-zinc-400 uppercase">Request Ref</p>
              <p className="text-sm font-mono font-bold text-[#D4AF37]">#{userRequest?.id || "IMA-PENDING"}</p>
            </div>
            <div>
              <p className="text-[10px] font-mono text-zinc-400 uppercase">XM Reference</p>
              <p className="text-sm font-mono text-white truncate">{userRequest?.xmAccountNumber || xmAccountNumber}</p>
            </div>
            <div>
              <p className="text-[10px] font-mono text-zinc-400 uppercase">Partner Code</p>
              <p className="text-sm font-mono font-bold text-emerald-400">{userRequest?.partnerCode || currentPartnerCode}</p>
            </div>
            <div>
              <p className="text-[10px] font-mono text-zinc-400 uppercase">TradingView User</p>
              <p className="text-sm font-mono text-white truncate">@{userRequest?.tradingViewUsername || tradingViewUsername}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => {
                setIsEditingAfterSubmission(true);
                setCurrentStep(3);
              }}
              className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-mono text-xs uppercase font-bold tracking-wider rounded-xl border border-zinc-800 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-[#D4AF37]" />
              Edit Submitted Details
            </button>

            <button
              onClick={() => onOpenContactSupport(`Indicator Access Status Inquiry - #${userRequest?.id}`)}
              className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-mono text-xs uppercase font-bold tracking-wider rounded-xl border border-zinc-800 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Headphones className="w-3.5 h-3.5 text-[#D4AF37]" />
              Contact Support
            </button>
          </div>
        </div>
      )}

      {/* ======================= STATE D: REVOKED / SUSPENDED ======================= */}
      {isRevoked && !isEditingAfterSubmission && (
        <div className="bg-gradient-to-b from-[#1a0808] to-[#0d0d0d] border-2 border-red-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4 text-left animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-white">
                Access Revoked or Inactive
              </h2>
              <p className="text-red-400 text-xs font-mono uppercase tracking-wider">
                Indicator Access has been suspended by the administrator
              </p>
            </div>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed">
            {userRequest?.adminNotes || "Your indicator access is currently inactive. If you believe this is a mistake, please contact academic support."}
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenContactSupport(`Indicator Access Revoked - Request #${userRequest?.id}`)}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-mono text-xs uppercase font-bold tracking-wider rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <Headphones className="w-4 h-4" />
              Contact Support
            </button>
          </div>
        </div>
      )}

      {/* ======================= STATE E: ONBOARDING & SUBMISSION FORM ======================= */}
      {(!userRequest || isEditingAfterSubmission || (!isApproved && !isPending && !isActionRequired && !isRevoked)) && (
        <div className="space-y-6">

          {/* DEDICATED XM ONBOARDING BANNER CARD */}
          <div className="bg-[#0f0f0f] border border-[#D4AF37]/30 rounded-3xl overflow-hidden shadow-2xl text-left">
            <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-black">
              <img 
                src={currentBannerUrl} 
                alt="XM Official Broker Onboarding" 
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-black/40 to-transparent"></div>
              
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
                <div>
                  <span className="bg-[#D4AF37] text-black font-mono text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    Official Partner Broker
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif text-white mt-1">
                    XM Trading Network
                  </h3>
                </div>

                {/* Partner Code Copy Box */}
                <div className="bg-black/90 border border-[#D4AF37]/50 px-3.5 py-2 rounded-2xl flex items-center gap-3 shadow-xl backdrop-blur-md">
                  <div>
                    <p className="text-[9px] font-mono text-zinc-400 uppercase">Partner Code</p>
                    <p className="text-sm font-mono font-bold text-[#D4AF37]">{currentPartnerCode}</p>
                  </div>
                  <button
                    onClick={handleCopyPartnerCode}
                    className="px-2.5 py-1.5 bg-[#D4AF37]/15 hover:bg-[#D4AF37]/30 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-mono uppercase font-bold rounded-xl transition flex items-center gap-1 cursor-pointer"
                  >
                    {copiedPartnerCode ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied ✓</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 1: JOIN XM */}
          <div className={`bg-[#0f0f0f] border rounded-3xl p-6 sm:p-8 transition-all ${
            currentStep === 1 ? "border-[#D4AF37] ring-1 ring-[#D4AF37]/30 shadow-2xl" : "border-zinc-850 opacity-90"
          }`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider font-bold">
                  Step 1 — Join XM
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-serif text-white mt-0.5">
                  Don't have an XM account yet? Start here.
                </h3>
              </div>
              <span className={`w-7 h-7 rounded-full flex items-center justify-center font-mono font-bold text-xs ${
                currentStep > 1 ? "bg-emerald-500 text-black" : "bg-[#D4AF37] text-black"
              }`}>
                {currentStep > 1 ? <Check className="w-4 h-4 stroke-[3]" /> : "1"}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans mb-4">
              Create your XM trading account using the official Imali Ngesizulu XM link below.
            </p>

            <div className="p-4 bg-black/50 border border-zinc-800 rounded-2xl space-y-3 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <p className="text-xs font-bold text-white">Official Imali Ngesizulu XM Link</p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Important: Use the Imali Ngesizulu XM link so your registration can be identified correctly.
                  </p>
                </div>

                <a
                  href={currentReferralUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  className="px-5 py-2.5 bg-[#D4AF37] hover:bg-amber-400 text-black font-mono text-xs uppercase font-bold tracking-wider rounded-xl transition shadow-md flex items-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open XM
                </a>
              </div>

              {/* Partner Code Display */}
              <div className="pt-2 border-t border-zinc-850 flex items-center justify-between">
                <span className="text-[11px] text-zinc-400">
                  If XM asks for a Partner Code, enter: <strong className="text-[#D4AF37] font-mono">{currentPartnerCode}</strong>
                </span>
                <button
                  onClick={handleCopyPartnerCode}
                  className="text-[10px] font-mono text-[#D4AF37] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  {copiedPartnerCode ? "Copied ✓" : "Copy Code"}
                </button>
              </div>
            </div>

            {/* Step-by-Step XM Help ("How to join") */}
            <div className="bg-[#141414] border border-zinc-800/80 p-4 sm:p-5 rounded-2xl space-y-3">
              <h4 className="text-xs font-bold font-mono text-[#D4AF37] uppercase tracking-wider">
                How to join:
              </h4>
              <ol className="text-xs text-zinc-300 space-y-2 list-decimal list-inside leading-relaxed">
                <li><strong className="text-white">Click Open XM</strong> using the button above.</li>
                <li><strong className="text-white">Start your XM registration</strong> on the official XM broker portal.</li>
                <li><strong className="text-white">Enter your correct information</strong> directly on XM.</li>
                <li>If XM asks for a Partner Code, enter <strong className="text-[#D4AF37] font-mono">{currentPartnerCode}</strong>.</li>
                <li><strong className="text-white">Complete the required XM registration steps</strong>.</li>
                <li>Once your XM account has been created, return to Imali Ngesizulu.</li>
              </ol>
            </div>

            {/* Next Button for Step 1 */}
            {currentStep === 1 && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleStep1Complete}
                  className="px-5 py-2.5 bg-[#D4AF37] hover:bg-amber-400 text-black font-mono text-xs uppercase font-bold tracking-wider rounded-xl transition flex items-center gap-2 cursor-pointer"
                >
                  <span>Continue to Step 2</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* STEP 2: RETURN TO IMALI NGESIZULU */}
          <div className={`bg-[#0f0f0f] border rounded-3xl p-6 sm:p-8 transition-all ${
            currentStep === 2 ? "border-[#D4AF37] ring-1 ring-[#D4AF37]/30 shadow-2xl" : "border-zinc-850 opacity-90"
          }`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider font-bold">
                  Step 2 — Return to Imali Ngesizulu
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-serif text-white mt-0.5">
                  Finished creating your XM account?
                </h3>
              </div>
              <span className={`w-7 h-7 rounded-full flex items-center justify-center font-mono font-bold text-xs ${
                currentStep > 2 ? "bg-emerald-500 text-black" : currentStep === 2 ? "bg-[#D4AF37] text-black" : "bg-zinc-800 text-zinc-500"
              }`}>
                {currentStep > 2 ? <Check className="w-4 h-4 stroke-[3]" /> : "2"}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans mb-6">
              After you complete your registration directly on XM, click the button below to provide your verification reference.
            </p>

            {/* Security Notice */}
            <div className="p-4 bg-amber-950/20 border border-amber-500/30 rounded-2xl flex items-start gap-3 mb-6">
              <Lock className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs">
                <p className="font-bold text-[#D4AF37] font-mono uppercase tracking-wider">
                  Important Security Notice
                </p>
                <p className="text-zinc-300 leading-relaxed">
                  Imali Ngesizulu will <strong>NEVER</strong> ask for your XM password, MT4 password or MT5 password. Never share your trading password with anyone through this page.
                </p>
              </div>
            </div>

            {currentStep === 2 && (
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-xs font-mono text-zinc-400 hover:text-white transition cursor-pointer"
                >
                  ← Back to Step 1
                </button>
                <button
                  onClick={handleStep2Complete}
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs uppercase font-bold tracking-wider rounded-xl transition flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>I've Created My XM Account</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* STEP 3: VERIFY YOUR XM ACCOUNT */}
          <div className={`bg-[#0f0f0f] border rounded-3xl p-6 sm:p-8 transition-all ${
            currentStep === 3 ? "border-[#D4AF37] ring-1 ring-[#D4AF37]/30 shadow-2xl" : "border-zinc-850 opacity-90"
          }`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider font-bold">
                  Step 3 — Verify Your XM Account
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-serif text-white mt-0.5">
                  Confirm your XM registration details
                </h3>
              </div>
              <span className={`w-7 h-7 rounded-full flex items-center justify-center font-mono font-bold text-xs ${
                currentStep > 3 ? "bg-emerald-500 text-black" : currentStep === 3 ? "bg-[#D4AF37] text-black" : "bg-zinc-800 text-zinc-500"
              }`}>
                {currentStep > 3 ? <Check className="w-4 h-4 stroke-[3]" /> : "3"}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans mb-6">
              Now we need to confirm that your XM registration belongs to the correct Imali Ngesizulu partner network.
            </p>

            <div className="space-y-4 max-w-xl">
              {/* XM Account Number / Client Reference */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-[#D4AF37] uppercase tracking-wider font-bold block">
                  XM Account Number / Client Reference *
                </label>
                <input
                  type="text"
                  value={xmAccountNumber}
                  onChange={(e) => setXmAccountNumber(e.target.value)}
                  placeholder="e.g. 8492019 or XM-8492019"
                  className="w-full bg-[#141414] hover:bg-zinc-900 focus:bg-black border border-zinc-800 focus:border-[#D4AF37] px-4 py-3 rounded-xl text-sm text-white placeholder-zinc-600 transition outline-none font-mono"
                />
                <p className="text-[10px] text-zinc-500">
                  Enter your XM ID or trading account number provided by XM.
                </p>
              </div>

              {/* Email Used When Registering With XM */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-[#D4AF37] uppercase tracking-wider font-bold block">
                  Email Used When Registering With XM *
                </label>
                <input
                  type="email"
                  value={xmEmail}
                  onChange={(e) => setXmEmail(e.target.value)}
                  placeholder="e.g. yourname@gmail.com"
                  className="w-full bg-[#141414] hover:bg-zinc-900 focus:bg-black border border-zinc-800 focus:border-[#D4AF37] px-4 py-3 rounded-xl text-sm text-white placeholder-zinc-600 transition outline-none font-mono"
                />
              </div>

              {/* Confirmation Checkbox */}
              <label className="flex items-start gap-3 p-3.5 bg-black/60 border border-zinc-800 rounded-2xl cursor-pointer hover:border-zinc-700 transition">
                <input
                  type="checkbox"
                  checked={confirmedPartnerCode}
                  onChange={(e) => setConfirmedPartnerCode(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-[#D4AF37] rounded cursor-pointer"
                />
                <span className="text-xs text-zinc-300 leading-relaxed font-sans">
                  I confirm that I registered through the Imali Ngesizulu XM link and used Partner Code <strong className="text-[#D4AF37] font-mono">{currentPartnerCode}</strong> where applicable.
                </span>
              </label>

              {/* Security reassurance */}
              <div className="p-3 bg-zinc-950 border border-zinc-850 rounded-xl text-[11px] text-zinc-400 font-mono flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>We will never ask for your XM password.</span>
              </div>
            </div>

            {currentStep === 3 && (
              <div className="mt-6 flex justify-between items-center">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="text-xs font-mono text-zinc-400 hover:text-white transition cursor-pointer"
                >
                  ← Back to Step 2
                </button>
                <button
                  onClick={handleStep3Complete}
                  className="px-5 py-2.5 bg-[#D4AF37] hover:bg-amber-400 text-black font-mono text-xs uppercase font-bold tracking-wider rounded-xl transition flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>Continue to Step 4</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* STEP 4: TRADINGVIEW USERNAME */}
          <div className={`bg-[#0f0f0f] border rounded-3xl p-6 sm:p-8 transition-all ${
            currentStep === 4 ? "border-[#D4AF37] ring-1 ring-[#D4AF37]/30 shadow-2xl" : "border-zinc-850 opacity-90"
          }`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider font-bold">
                  Step 4 — Add Your TradingView Username
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-serif text-white mt-0.5">
                  Where should access be assigned?
                </h3>
              </div>
              <span className={`w-7 h-7 rounded-full flex items-center justify-center font-mono font-bold text-xs ${
                currentStep > 4 ? "bg-emerald-500 text-black" : currentStep === 4 ? "bg-[#D4AF37] text-black" : "bg-zinc-800 text-zinc-500"
              }`}>
                {currentStep > 4 ? <Check className="w-4 h-4 stroke-[3]" /> : "4"}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans mb-4">
              <strong>{currentIndicatorName}</strong> is used on TradingView. We need your TradingView username so access can be assigned to the correct TradingView account.
            </p>

            <div className="space-y-4 max-w-xl">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-[#D4AF37] uppercase tracking-wider font-bold block">
                  TradingView Username *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-zinc-500 font-mono text-sm">@</span>
                  <input
                    type="text"
                    value={tradingViewUsername}
                    onChange={(e) => setTradingViewUsername(e.target.value)}
                    placeholder="TumiTrades"
                    className="w-full bg-[#141414] hover:bg-zinc-900 focus:bg-black border border-zinc-800 focus:border-[#D4AF37] pl-8 pr-4 py-3 rounded-xl text-sm text-white placeholder-zinc-600 transition outline-none font-mono"
                  />
                </div>
                <p className="text-[10px] text-zinc-400">
                  Enter your username exactly as it appears on TradingView. We do <strong>NOT</strong> need your TradingView password.
                </p>
              </div>

              <div className="p-3.5 bg-black/60 border border-zinc-800 rounded-2xl text-xs text-zinc-300 leading-relaxed">
                💡 <strong>What is my TradingView username?</strong> Your TradingView username identifies your account so our administrator can invite you directly to the private indicator script. It is not your password.
              </div>
            </div>

            {currentStep === 4 && (
              <div className="mt-6 flex justify-between items-center">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="text-xs font-mono text-zinc-400 hover:text-white transition cursor-pointer"
                >
                  ← Back to Step 3
                </button>
                <button
                  onClick={handleStep4Complete}
                  className="px-5 py-2.5 bg-[#D4AF37] hover:bg-amber-400 text-black font-mono text-xs uppercase font-bold tracking-wider rounded-xl transition flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>Review Details (Step 5)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* STEP 5: REVIEW & REAL SUBMISSION */}
          <div className={`bg-[#0f0f0f] border rounded-3xl p-6 sm:p-8 transition-all ${
            currentStep === 5 ? "border-[#D4AF37] ring-1 ring-[#D4AF37]/30 shadow-2xl" : "border-zinc-850 opacity-90"
          }`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider font-bold">
                  Step 5 — Review Before Submitting
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-serif text-white mt-0.5">
                  Confirm your details
                </h3>
              </div>
              <span className={`w-7 h-7 rounded-full flex items-center justify-center font-mono font-bold text-xs ${
                currentStep === 5 ? "bg-[#D4AF37] text-black" : "bg-zinc-800 text-zinc-500"
              }`}>
                5
              </span>
            </div>

            {/* Review Card */}
            <div className="bg-black/70 border border-zinc-800 rounded-2xl p-5 space-y-4 mb-6">
              <h4 className="text-xs font-bold font-mono text-[#D4AF37] uppercase tracking-wider">
                Your Submitted Details:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <p className="text-[10px] font-mono text-zinc-500 uppercase">XM Email:</p>
                  <p className="text-white font-mono font-semibold truncate">{xmEmail || "(Not provided)"}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] font-mono text-zinc-500 uppercase">XM Account / Reference:</p>
                  <p className="text-white font-mono font-semibold truncate">{xmAccountNumber || "(Not provided)"}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] font-mono text-zinc-500 uppercase">Partner Code:</p>
                  <p className="text-emerald-400 font-mono font-bold">{currentPartnerCode}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] font-mono text-zinc-500 uppercase">TradingView Username:</p>
                  <p className="text-white font-mono font-semibold truncate">@{tradingViewUsername.replace(/^@/, "") || "(Not provided)"}</p>
                </div>
              </div>

              {/* Edit Buttons */}
              <div className="pt-3 border-t border-zinc-850 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-[10.5px] font-mono rounded-xl border border-zinc-800 transition flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="w-3 h-3 text-[#D4AF37]" />
                  Edit XM Details
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-[10.5px] font-mono rounded-xl border border-zinc-800 transition flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="w-3 h-3 text-[#D4AF37]" />
                  Edit TradingView Username
                </button>
              </div>
            </div>

            {/* Privacy & Security Statement */}
            <div className="p-4 bg-zinc-950 border border-zinc-850 rounded-2xl text-xs text-zinc-400 leading-relaxed mb-6 font-sans">
              🔒 <strong>Privacy & Security Notice:</strong> We only use the information submitted here to review your indicator access request. Never submit your XM, MT4, MT5 or TradingView password.
            </div>

            {/* Error messaging */}
            {formError && (
              <div className="p-3.5 bg-red-950/40 border border-red-500/40 text-red-400 rounded-xl text-xs font-mono mb-4 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* Action Bar */}
            {currentStep === 5 && (
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <button
                  onClick={() => setCurrentStep(4)}
                  className="text-xs font-mono text-zinc-400 hover:text-white transition cursor-pointer"
                >
                  ← Back to Step 4
                </button>

                <button
                  onClick={handleSubmitRequest}
                  disabled={isSubmitting}
                  className={`w-full sm:w-auto px-8 py-3.5 bg-[#D4AF37] hover:bg-amber-400 text-black font-mono text-xs uppercase font-bold tracking-wider rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-xl ${
                    isSubmitting ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit for Approval</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

        </div>
      )}

      {/* 4. USER HELP — A TO Z (Accordion / FAQ) */}
      <div className="bg-[#0e0e0e] border border-zinc-850 rounded-3xl p-6 sm:p-8 shadow-xl text-left space-y-4">
        <div className="flex items-center gap-2.5 pb-2 border-b border-zinc-800">
          <HelpCircle className="w-5 h-5 text-[#D4AF37]" />
          <h3 className="text-lg font-bold font-serif text-white uppercase tracking-tight">
            Need Help? (A to Z Guide)
          </h3>
        </div>

        <div className="divide-y divide-zinc-850">
          {faqList.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="py-3">
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full flex justify-between items-center text-left py-1 text-xs sm:text-sm font-semibold text-zinc-200 hover:text-[#D4AF37] transition cursor-pointer gap-3"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform duration-200 shrink-0 ${
                    isOpen ? "rotate-180 text-[#D4AF37]" : ""
                  }`} />
                </button>

                {isOpen && (
                  <p className="mt-2 text-xs text-zinc-400 leading-relaxed font-sans animate-fade-in pl-1">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Support Footer in FAQ */}
        <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-xs text-zinc-400">
            Have questions about your XM verification or TradingView access?
          </p>
          <button
            onClick={() => onOpenContactSupport("General Indicator Access Help")}
            className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-mono uppercase font-bold tracking-wider rounded-xl transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Headphones className="w-3.5 h-3.5" />
            Contact Support
          </button>
        </div>
      </div>

    </div>
  );
};
