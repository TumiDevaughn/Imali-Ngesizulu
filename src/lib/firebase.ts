import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  addDoc, 
  onSnapshot, 
  query, 
  where, 
  orderBy, 
  deleteDoc,
  serverTimestamp 
} from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";

// Initialize Firebase app & Firestore
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

import { ChatMessage, IndicatorAccessConfig, IndicatorAccessRequest, IndicatorAuditLog } from "../types";

export const DEFAULT_INDICATOR_CONFIG: IndicatorAccessConfig = {
  xmBannerUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop",
  xmReferralUrl: "https://clicks.pipaffiliates.com/c?c=913735&l=en&p=1",
  xmPartnerCode: "UMAGAYI",
  indicatorName: "UMAGAYI WE MALI INDICATOR V1",
  indicatorVersion: "V1",
  tradingViewUrl: ""
};

export interface CommunityGroupData {
  id: string;
  name: string;
  desc: string;
  members: string;
  tag: string;
  isPrivate?: boolean;
  passcode?: string;
  createdBy?: string;
  createdAt?: any;
}

export type ChatMessageData = ChatMessage & {
  createdAt?: any;
};

export const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;

export function getMessageTimestampMs(msg: ChatMessageData): number {
  if (msg.createdAt) {
    const parsed = new Date(msg.createdAt).getTime();
    if (!isNaN(parsed) && parsed > 0) return parsed;
  }
  if (msg.id) {
    const matches = msg.id.match(/(\d{10,13})/);
    if (matches && matches[1]) {
      const ts = Number(matches[1]);
      if (!isNaN(ts) && ts > 0) return ts;
    }
  }
  return Date.now();
}

export function isMessageExpired(msg: ChatMessageData): boolean {
  const msgTime = getMessageTimestampMs(msg);
  return (Date.now() - msgTime) > TWENTY_FOUR_HOURS_MS;
}

export interface StudentRoomAccessData {
  roomId: string;
  fullName: string;
  contact: string;
  tradingId: string;
  registeredAt: string;
}

// 1. Subscribe to Real-Time Community Groups across all users
export function subscribeCommunityGroups(onGroupsUpdate: (groups: CommunityGroupData[]) => void) {
  const groupsColRef = collection(db, "community_groups");
  
  return onSnapshot(groupsColRef, (snapshot) => {
    const groups: CommunityGroupData[] = [];
    snapshot.forEach((doc) => {
      groups.push(doc.data() as CommunityGroupData);
    });
    
    // Sort groups by creation or name if available
    groups.sort((a, b) => (b.createdAt || "").toString().localeCompare((a.createdAt || "").toString()));
    
    onGroupsUpdate(groups);
  }, (error) => {
    console.warn("Firestore Community Groups sync issue:", error);
  });
}

// 2. Create or Update Community Group
export async function saveCommunityGroupToCloud(group: CommunityGroupData) {
  try {
    const groupDocRef = doc(db, "community_groups", group.id);
    await setDoc(groupDocRef, {
      ...group,
      createdAt: group.createdAt || new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.error("Error saving group to cloud:", err);
  }
}

// 3. Delete Community Group
export async function deleteCommunityGroupFromCloud(groupId: string) {
  try {
    const groupDocRef = doc(db, "community_groups", groupId);
    await deleteDoc(groupDocRef);
  } catch (err) {
    console.error("Error deleting group from cloud:", err);
  }
}

// 4. Subscribe to Real-Time Chat Messages for a Group
export function subscribeGroupMessages(onMessagesUpdate: (messagesByGroup: Record<string, ChatMessageData[]>) => void) {
  const messagesColRef = collection(db, "group_messages");

  return onSnapshot(messagesColRef, (snapshot) => {
    const messagesByGroup: Record<string, ChatMessageData[]> = {};

    snapshot.forEach((docSnap) => {
      const msg = docSnap.data() as ChatMessageData;
      if (msg.groupId) {
        if (isMessageExpired(msg)) {
          // Auto-delete expired messages from cloud after 24 hours
          deleteDoc(doc(db, "group_messages", docSnap.id)).catch(() => {});
        } else {
          if (!messagesByGroup[msg.groupId]) {
            messagesByGroup[msg.groupId] = [];
          }
          messagesByGroup[msg.groupId].push(msg);
        }
      }
    });

    // Sort messages in each group by timestamp/createdAt
    Object.keys(messagesByGroup).forEach(groupId => {
      messagesByGroup[groupId].sort((a, b) => {
        const timeA = getMessageTimestampMs(a);
        const timeB = getMessageTimestampMs(b);
        return timeA > timeB ? 1 : -1;
      });
    });

    onMessagesUpdate(messagesByGroup);
  }, (error) => {
    console.warn("Firestore Messages sync issue:", error);
  });
}

// 5. Send/Save Message to Cloud
export async function saveMessageToCloud(msg: ChatMessageData) {
  try {
    const msgDocRef = doc(db, "group_messages", msg.id);
    await setDoc(msgDocRef, {
      ...msg,
      createdAt: msg.createdAt || new Date().toISOString()
    });
  } catch (err) {
    console.error("Error saving message to cloud:", err);
  }
}

// 6. Subscribe to Real-Time Room Access
export function subscribeStudentRoomAccess(onAccessUpdate: (accessMap: Record<string, StudentRoomAccessData>) => void) {
  const accessColRef = collection(db, "student_room_access");

  return onSnapshot(accessColRef, (snapshot) => {
    const accessMap: Record<string, StudentRoomAccessData> = {};
    snapshot.forEach((doc) => {
      const data = doc.data() as StudentRoomAccessData;
      if (data.roomId) {
        accessMap[data.roomId] = data;
      }
    });
    onAccessUpdate(accessMap);
  }, (error) => {
    console.warn("Firestore Room Access sync issue:", error);
  });
}

// 7. Save Student Room Access to Cloud
export async function saveStudentRoomAccessToCloud(access: StudentRoomAccessData) {
  try {
    const accessDocRef = doc(db, "student_room_access", `${access.roomId}_${access.tradingId}`);
    await setDoc(accessDocRef, access, { merge: true });
  } catch (err) {
    console.error("Error saving room access to cloud:", err);
  }
}

// 8. Subscribe to Indicator Access Global Configuration
export function subscribeIndicatorConfig(onConfigUpdate: (config: IndicatorAccessConfig) => void) {
  const configDocRef = doc(db, "indicator_system", "global_config");
  
  return onSnapshot(configDocRef, (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data() as IndicatorAccessConfig;
      onConfigUpdate({
        ...DEFAULT_INDICATOR_CONFIG,
        ...data
      });
    } else {
      onConfigUpdate(DEFAULT_INDICATOR_CONFIG);
    }
  }, (error) => {
    console.warn("Firestore Indicator Config sync issue:", error);
    onConfigUpdate(DEFAULT_INDICATOR_CONFIG);
  });
}

// 9. Save/Update Indicator Access Global Configuration
export async function saveIndicatorConfigToCloud(config: Partial<IndicatorAccessConfig>) {
  try {
    const configDocRef = doc(db, "indicator_system", "global_config");
    await setDoc(configDocRef, {
      ...config,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.error("Error saving indicator config to cloud:", err);
    throw err;
  }
}

// 10. Subscribe to All Indicator Access Requests (Real-time for Users & Admins)
export function subscribeIndicatorRequests(onRequestsUpdate: (requests: IndicatorAccessRequest[]) => void) {
  const requestsColRef = collection(db, "indicator_access_requests");

  return onSnapshot(requestsColRef, (snapshot) => {
    const requests: IndicatorAccessRequest[] = [];
    snapshot.forEach((docSnap) => {
      requests.push(docSnap.data() as IndicatorAccessRequest);
    });

    // Sort by latest submission or update
    requests.sort((a, b) => {
      const timeA = new Date(a.lastUpdatedAt || a.submittedAt || 0).getTime();
      const timeB = new Date(b.lastUpdatedAt || b.submittedAt || 0).getTime();
      return timeB - timeA;
    });

    onRequestsUpdate(requests);
  }, (error) => {
    console.warn("Firestore Indicator Requests sync issue:", error);
  });
}

// 11. Save or Update Indicator Access Request
export async function saveIndicatorRequestToCloud(request: IndicatorAccessRequest) {
  try {
    const requestDocRef = doc(db, "indicator_access_requests", request.id);
    await setDoc(requestDocRef, {
      ...request,
      lastUpdatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.error("Error saving indicator request to cloud:", err);
    throw err;
  }
}

// 12. Subscribe to Indicator Audit Logs
export function subscribeIndicatorAuditLogs(onLogsUpdate: (logs: IndicatorAuditLog[]) => void) {
  const logsColRef = collection(db, "indicator_audit_logs");

  return onSnapshot(logsColRef, (snapshot) => {
    const logs: IndicatorAuditLog[] = [];
    snapshot.forEach((docSnap) => {
      logs.push(docSnap.data() as IndicatorAuditLog);
    });

    logs.sort((a, b) => {
      const timeA = new Date(a.timestamp || 0).getTime();
      const timeB = new Date(b.timestamp || 0).getTime();
      return timeB - timeA;
    });

    onLogsUpdate(logs);
  }, (error) => {
    console.warn("Firestore Indicator Audit Logs sync issue:", error);
  });
}

// 13. Save Indicator Audit Log Entry
export async function saveIndicatorAuditLogToCloud(log: IndicatorAuditLog) {
  try {
    const logDocRef = doc(db, "indicator_audit_logs", log.id);
    await setDoc(logDocRef, log);
  } catch (err) {
    console.error("Error saving audit log to cloud:", err);
  }
}
