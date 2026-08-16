import React, { useState, useMemo } from "react";
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  Edit3, 
  Settings, 
  FileText, 
  ExternalLink, 
  RefreshCw, 
  User, 
  ChevronRight, 
  Save, 
  History,
  Lock,
  Eye,
  Sliders,
  Check
} from "lucide-react";
import { 
  IndicatorAccessConfig, 
  IndicatorAccessRequest, 
  IndicatorAuditLog, 
  XMVerificationStatus, 
  TradingViewStatus, 
  IndicatorAccessStatus,
  Role 
} from "../types";
import { 
  saveIndicatorRequestToCloud, 
  saveIndicatorConfigToCloud, 
  saveIndicatorAuditLogToCloud, 
  DEFAULT_INDICATOR_CONFIG 
} from "../lib/firebase";

interface AdminIndicatorRequestsProps {
  adminName: string;
  adminRole: Role;
  config: IndicatorAccessConfig;
  requests: IndicatorAccessRequest[];
  auditLogs: IndicatorAuditLog[];
  onAddNotification?: (notification: {
    title_en: string;
    title_zu: string;
    message_en: string;
    message_zu: string;
    type: "system" | "live" | "grade";
  }) => void;
}

export const AdminIndicatorRequests: React.FC<AdminIndicatorRequestsProps> = ({
  adminName,
  adminRole,
  config,
  requests,
  auditLogs,
  onAddNotification
}) => {
  const [activeAdminSubTab, setActiveAdminSubTab] = useState<"requests" | "config" | "logs">("requests");

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [xmStatusFilter, setXmStatusFilter] = useState<string>("ALL");
  const [indicatorStatusFilter, setIndicatorStatusFilter] = useState<string>("ALL");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  // Selected Request Drawer
  const [selectedRequest, setSelectedRequest] = useState<IndicatorAccessRequest | null>(null);
  const [adminNoteInput, setAdminNoteInput] = useState<string>("");
  const [actionReasonInput, setActionReasonInput] = useState<string>("");
  const [isPromptingActionRequired, setIsPromptingActionRequired] = useState<boolean>(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState<boolean>(false);

  // Global Config Form State
  const [editBannerUrl, setEditBannerUrl] = useState<string>(config.xmBannerUrl || DEFAULT_INDICATOR_CONFIG.xmBannerUrl);
  const [editReferralUrl, setEditReferralUrl] = useState<string>(config.xmReferralUrl || DEFAULT_INDICATOR_CONFIG.xmReferralUrl);
  const [editPartnerCode, setEditPartnerCode] = useState<string>(config.xmPartnerCode || DEFAULT_INDICATOR_CONFIG.xmPartnerCode);
  const [editIndicatorName, setEditIndicatorName] = useState<string>(config.indicatorName || DEFAULT_INDICATOR_CONFIG.indicatorName);
  const [editIndicatorVersion, setEditIndicatorVersion] = useState<string>(config.indicatorVersion || DEFAULT_INDICATOR_CONFIG.indicatorVersion);
  const [editTradingViewUrl, setEditTradingViewUrl] = useState<string>(config.tradingViewUrl || "");
  const [isSavingConfig, setIsSavingConfig] = useState<boolean>(false);
  const [configSavedSuccess, setConfigSavedSuccess] = useState<boolean>(false);

  // Sync state if selectedRequest changes
  const handleSelectRequest = (req: IndicatorAccessRequest) => {
    setSelectedRequest(req);
    setAdminNoteInput(req.adminNotes || "");
    setActionReasonInput(req.actionRequiredReason || "");
    setIsPromptingActionRequired(false);
  };

  // Filter requests
  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      // Search
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery = !q || 
        req.id.toLowerCase().includes(q) ||
        req.userName.toLowerCase().includes(q) ||
        req.userEmail.toLowerCase().includes(q) ||
        req.xmEmail.toLowerCase().includes(q) ||
        req.xmAccountNumber.toLowerCase().includes(q) ||
        req.tradingViewUsername.toLowerCase().includes(q);

      // XM Status
      const matchesXm = xmStatusFilter === "ALL" || req.xmVerificationStatus === xmStatusFilter;

      // Indicator Status
      const matchesIndicator = indicatorStatusFilter === "ALL" || req.indicatorAccessStatus === indicatorStatusFilter;

      return matchesQuery && matchesXm && matchesIndicator;
    });
  }, [requests, searchQuery, xmStatusFilter, indicatorStatusFilter]);

  // Paginated requests
  const totalPages = Math.max(1, Math.ceil(filteredRequests.length / itemsPerPage));
  const paginatedRequests = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRequests.slice(start, start + itemsPerPage);
  }, [filteredRequests, currentPage]);

  // Save updated config
  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingConfig(true);
    setConfigSavedSuccess(false);

    try {
      await saveIndicatorConfigToCloud({
        xmBannerUrl: editBannerUrl.trim(),
        xmReferralUrl: editReferralUrl.trim(),
        xmPartnerCode: editPartnerCode.trim().toUpperCase(),
        indicatorName: editIndicatorName.trim(),
        indicatorVersion: editIndicatorVersion.trim(),
        tradingViewUrl: editTradingViewUrl.trim()
      });

      setConfigSavedSuccess(true);
      setTimeout(() => setConfigSavedSuccess(false), 3000);
    } catch (err) {
      console.error("Config save failed:", err);
      alert("Failed to save configuration to database.");
    } finally {
      setIsSavingConfig(false);
    }
  };

  // Update Request Status in Firestore
  const handleUpdateRequestStatus = async (updates: Partial<IndicatorAccessRequest>, actionName: IndicatorAuditLog["action"], reasonText?: string) => {
    if (!selectedRequest) return;
    setIsUpdatingStatus(true);

    try {
      const updatedReq: IndicatorAccessRequest = {
        ...selectedRequest,
        ...updates,
        adminNotes: adminNoteInput.trim(),
        lastUpdatedAt: new Date().toISOString()
      };

      if (updates.indicatorAccessStatus === "ACTIVE" && !updatedReq.approvedAt) {
        updatedReq.approvedAt = new Date().toISOString();
      }

      // Save to cloud
      await saveIndicatorRequestToCloud(updatedReq);

      // Log Audit entry
      const auditLog: IndicatorAuditLog = {
        id: `audit_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        requestId: selectedRequest.id,
        userId: selectedRequest.userId,
        action: actionName,
        previousStatus: selectedRequest.indicatorAccessStatus,
        newStatus: updatedReq.indicatorAccessStatus,
        adminName: adminName || "Academy Dean",
        reason: reasonText || adminNoteInput.trim() || `Administrative action: ${actionName}`,
        timestamp: new Date().toISOString()
      };
      await saveIndicatorAuditLogToCloud(auditLog);

      // Add in-app notification for user/system
      if (onAddNotification) {
        onAddNotification({
          title_en: `Indicator Request #${selectedRequest.id} Updated`,
          title_zu: `Isicelo Sokungena Kwenkomba #${selectedRequest.id} Silungisiwe`,
          message_en: `Request #${selectedRequest.id} status updated to: XM (${updatedReq.xmVerificationStatus}) | Access (${updatedReq.indicatorAccessStatus})`,
          message_zu: `Isimo sesicelo #${selectedRequest.id} sibuyekeziwe: XM (${updatedReq.xmVerificationStatus}) | Ukungena (${updatedReq.indicatorAccessStatus})`,
          type: "system"
        });
      }

      setSelectedRequest(updatedReq);
      setIsPromptingActionRequired(false);
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Error updating request. Please check cloud connection.");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Filter logs for selected request
  const requestLogs = useMemo(() => {
    if (!selectedRequest) return [];
    return auditLogs.filter(l => l.requestId === selectedRequest.id);
  }, [auditLogs, selectedRequest]);

  return (
    <div className="space-y-6 font-sans text-left animate-fade-in">
      
      {/* Top Header Card */}
      <div className="bg-[#121212] border-2 border-[#D4AF37]/40 rounded-3xl p-5 sm:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-serif text-white">
              Indicator Access Syndicate Console
            </h2>
            <p className="text-xs text-zinc-400 font-mono mt-0.5">
              Review XM registrations, verify partner credentials & provision TradingView indicators
            </p>
          </div>
        </div>

        {/* Sub-Tab Navigation */}
        <div className="flex bg-black/60 p-1 border border-zinc-800 rounded-2xl gap-1">
          <button
            onClick={() => setActiveAdminSubTab("requests")}
            className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition cursor-pointer flex items-center gap-1.5 ${
              activeAdminSubTab === "requests"
                ? "bg-[#D4AF37] text-black shadow-md"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Requests ({requests.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminSubTab("config")}
            className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition cursor-pointer flex items-center gap-1.5 ${
              activeAdminSubTab === "config"
                ? "bg-[#D4AF37] text-black shadow-md"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Portal Settings</span>
          </button>

          <button
            onClick={() => setActiveAdminSubTab("logs")}
            className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition cursor-pointer flex items-center gap-1.5 ${
              activeAdminSubTab === "logs"
                ? "bg-[#D4AF37] text-black shadow-md"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Audit Trail ({auditLogs.length})</span>
          </button>
        </div>
      </div>

      {/* ============================== TAB 1: REQUESTS ============================== */}
      {activeAdminSubTab === "requests" && (
        <div className="space-y-4">
          
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#141414] border border-zinc-800 p-4 rounded-2xl">
              <p className="text-[10px] font-mono text-zinc-400 uppercase">Total Submissions</p>
              <p className="text-2xl font-bold font-mono text-white mt-1">{requests.length}</p>
            </div>
            <div className="bg-[#141414] border border-amber-500/30 p-4 rounded-2xl">
              <p className="text-[10px] font-mono text-amber-400 uppercase">Pending Review</p>
              <p className="text-2xl font-bold font-mono text-amber-400 mt-1">
                {requests.filter(r => r.indicatorAccessStatus === "PENDING" || r.xmVerificationStatus === "PENDING").length}
              </p>
            </div>
            <div className="bg-[#141414] border border-emerald-500/30 p-4 rounded-2xl">
              <p className="text-[10px] font-mono text-emerald-400 uppercase">Active Indicators</p>
              <p className="text-2xl font-bold font-mono text-emerald-400 mt-1">
                {requests.filter(r => r.indicatorAccessStatus === "ACTIVE").length}
              </p>
            </div>
            <div className="bg-[#141414] border border-red-500/30 p-4 rounded-2xl">
              <p className="text-[10px] font-mono text-red-400 uppercase">Action Required / Revoked</p>
              <p className="text-2xl font-bold font-mono text-red-400 mt-1">
                {requests.filter(r => r.xmVerificationStatus === "ACTION_REQUIRED" || r.indicatorAccessStatus === "REVOKED").length}
              </p>
            </div>
          </div>

          {/* Search & Filter Controls */}
          <div className="bg-[#141414] border border-zinc-800 p-4 rounded-2xl flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by TradingView, XM Ref, email, or Request #..."
                className="w-full bg-black/60 border border-zinc-800 focus:border-[#D4AF37] pl-10 pr-4 py-2.5 rounded-xl text-xs text-white placeholder-zinc-500 outline-none transition"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap gap-2">
              <select
                value={xmStatusFilter}
                onChange={(e) => {
                  setXmStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-black/60 border border-zinc-800 text-zinc-300 text-xs font-mono px-3 py-2.5 rounded-xl outline-none focus:border-[#D4AF37] cursor-pointer"
              >
                <option value="ALL">XM: All Statuses</option>
                <option value="PENDING">XM: Pending</option>
                <option value="VERIFIED">XM: Verified</option>
                <option value="ACTION_REQUIRED">XM: Action Required</option>
                <option value="REJECTED">XM: Rejected</option>
              </select>

              <select
                value={indicatorStatusFilter}
                onChange={(e) => {
                  setIndicatorStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-black/60 border border-zinc-800 text-zinc-300 text-xs font-mono px-3 py-2.5 rounded-xl outline-none focus:border-[#D4AF37] cursor-pointer"
              >
                <option value="ALL">Access: All Statuses</option>
                <option value="PENDING">Access: Pending</option>
                <option value="ACTIVE">Access: Active</option>
                <option value="SUSPENDED">Access: Suspended</option>
                <option value="REVOKED">Access: Revoked</option>
              </select>
            </div>
          </div>

          {/* Requests Table */}
          <div className="bg-[#141414] border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-black/80 border-b border-zinc-800 text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Request #</th>
                    <th className="py-3 px-4">Applicant</th>
                    <th className="py-3 px-4">XM Account</th>
                    <th className="py-3 px-4">TradingView</th>
                    <th className="py-3 px-4">XM Status</th>
                    <th className="py-3 px-4">Indicator Access</th>
                    <th className="py-3 px-4">Submitted</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-850">
                  {paginatedRequests.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-10 text-center text-zinc-500 font-mono">
                        No indicator requests found matching your filters.
                      </td>
                    </tr>
                  ) : (
                    paginatedRequests.map((req) => (
                      <tr 
                        key={req.id} 
                        className={`hover:bg-zinc-900/60 transition ${
                          selectedRequest?.id === req.id ? "bg-[#D4AF37]/5 border-l-2 border-[#D4AF37]" : ""
                        }`}
                      >
                        <td className="py-3.5 px-4 font-mono font-bold text-[#D4AF37]">
                          #{req.id}
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="font-semibold text-white truncate max-w-[140px]">{req.userName}</p>
                          <p className="text-[10px] text-zinc-500 truncate max-w-[140px]">{req.userEmail}</p>
                        </td>
                        <td className="py-3.5 px-4 font-mono">
                          <p className="text-white truncate max-w-[120px]">{req.xmAccountNumber}</p>
                          <p className="text-[10px] text-zinc-500 truncate max-w-[120px]">{req.xmEmail}</p>
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-white">
                          @{req.tradingViewUsername}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-block px-2 py-0.5 rounded text-[9.5px] font-mono uppercase font-bold ${
                            req.xmVerificationStatus === "VERIFIED" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40" :
                            req.xmVerificationStatus === "ACTION_REQUIRED" ? "bg-amber-500/20 text-amber-400 border border-amber-500/40" :
                            req.xmVerificationStatus === "REJECTED" ? "bg-red-500/20 text-red-400 border border-red-500/40" :
                            "bg-amber-500/10 text-[#D4AF37] border border-[#D4AF37]/30"
                          }`}>
                            {req.xmVerificationStatus}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-block px-2 py-0.5 rounded text-[9.5px] font-mono uppercase font-bold ${
                            req.indicatorAccessStatus === "ACTIVE" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40" :
                            req.indicatorAccessStatus === "SUSPENDED" ? "bg-amber-500/20 text-amber-400 border border-amber-500/40" :
                            req.indicatorAccessStatus === "REVOKED" ? "bg-red-500/20 text-red-400 border border-red-500/40" :
                            "bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30"
                          }`}>
                            {req.indicatorAccessStatus}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-zinc-400 text-[11px] whitespace-nowrap">
                          {new Date(req.submittedAt).toLocaleDateString()}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => handleSelectRequest(req)}
                            className="px-3 py-1.5 bg-zinc-900 hover:bg-[#D4AF37] hover:text-black text-zinc-300 font-mono text-[10px] uppercase font-bold rounded-lg border border-zinc-800 transition cursor-pointer"
                          >
                            Manage
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="p-3 bg-black/60 border-t border-zinc-800 flex justify-between items-center text-xs font-mono text-zinc-400">
              <span>Showing {paginatedRequests.length} of {filteredRequests.length} requests</span>
              <div className="flex gap-2">
                <button
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className="px-3 py-1 bg-zinc-900 disabled:opacity-40 rounded border border-zinc-800 hover:bg-zinc-800 cursor-pointer"
                >
                  Prev
                </button>
                <span className="px-2 py-1 text-white">Page {currentPage} of {totalPages}</span>
                <button
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  className="px-3 py-1 bg-zinc-900 disabled:opacity-40 rounded border border-zinc-800 hover:bg-zinc-800 cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* ============================== REQUEST DETAIL DRAWER / MODAL ============================== */}
          {selectedRequest && (
            <div className="bg-[#121212] border-2 border-[#D4AF37]/50 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-zinc-800">
                <div>
                  <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider font-bold">
                    Managing Request
                  </span>
                  <h3 className="text-xl font-bold font-serif text-white flex items-center gap-2">
                    <span>#{selectedRequest.id}</span>
                    <span className="text-sm font-sans font-normal text-zinc-400">({selectedRequest.userName})</span>
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedRequest(null)}
                    className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-xl text-xs font-mono uppercase tracking-wider border border-zinc-800 cursor-pointer"
                  >
                    ✕ Close
                  </button>
                </div>
              </div>

              {/* Applicant & Broker Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-black/60 border border-zinc-800 p-4 rounded-2xl text-xs">
                <div>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase">Registered Scholar</p>
                  <p className="font-semibold text-white mt-0.5">{selectedRequest.userName}</p>
                  <p className="text-[10px] text-zinc-400 font-mono">{selectedRequest.userEmail}</p>
                </div>

                <div>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase">XM Broker Reference</p>
                  <p className="font-mono font-bold text-[#D4AF37] mt-0.5">{selectedRequest.xmAccountNumber}</p>
                  <p className="text-[10px] text-zinc-400 font-mono">{selectedRequest.xmEmail}</p>
                </div>

                <div>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase">TradingView Username</p>
                  <p className="font-mono font-bold text-emerald-400 mt-0.5">@{selectedRequest.tradingViewUsername}</p>
                  <p className="text-[10px] text-zinc-500 font-mono">Partner: {selectedRequest.partnerCode}</p>
                </div>

                <div>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase">Timestamps</p>
                  <p className="text-zinc-300 mt-0.5">Submitted: {new Date(selectedRequest.submittedAt).toLocaleDateString()}</p>
                  <p className="text-[10px] text-zinc-500">Updated: {new Date(selectedRequest.lastUpdatedAt).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Administrative Action Control Panel */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold font-mono text-[#D4AF37] uppercase tracking-wider">
                  Administrative Review & Actions:
                </h4>

                {/* Primary Action Buttons */}
                <div className="flex flex-wrap gap-2.5">
                  {/* XM Verification Buttons */}
                  <button
                    disabled={isUpdatingStatus}
                    onClick={() => handleUpdateRequestStatus({ xmVerificationStatus: "VERIFIED" }, "XM_VERIFIED")}
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs uppercase font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Verify XM Registration
                  </button>

                  <button
                    disabled={isUpdatingStatus}
                    onClick={() => setIsPromptingActionRequired(true)}
                    className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs uppercase font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Request Information / Action Required
                  </button>

                  <button
                    disabled={isUpdatingStatus}
                    onClick={() => handleUpdateRequestStatus({ xmVerificationStatus: "REJECTED" }, "XM_REJECTED", "XM broker verification failed")}
                    className="px-4 py-2.5 bg-red-800 hover:bg-red-700 text-white font-mono text-xs uppercase font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    Reject XM
                  </button>

                  {/* Indicator Access Granting / Revocation */}
                  <button
                    disabled={isUpdatingStatus}
                    onClick={() => handleUpdateRequestStatus({ 
                      indicatorAccessStatus: "ACTIVE", 
                      xmVerificationStatus: "VERIFIED", 
                      tradingViewStatus: "APPROVED" 
                    }, "ACCESS_APPROVED")}
                    className="px-5 py-2.5 bg-[#D4AF37] hover:bg-amber-400 text-black font-mono text-xs uppercase font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-lg font-bold"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Approve & Activate Indicator
                  </button>

                  {selectedRequest.indicatorAccessStatus === "ACTIVE" && (
                    <button
                      disabled={isUpdatingStatus}
                      onClick={() => handleUpdateRequestStatus({ indicatorAccessStatus: "SUSPENDED" }, "ACCESS_SUSPENDED", "Suspended by administrator")}
                      className="px-4 py-2.5 bg-amber-900 hover:bg-amber-800 text-amber-200 font-mono text-xs uppercase font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                    >
                      Suspend Access
                    </button>
                  )}

                  {selectedRequest.indicatorAccessStatus === "ACTIVE" && (
                    <button
                      disabled={isUpdatingStatus}
                      onClick={() => handleUpdateRequestStatus({ indicatorAccessStatus: "REVOKED" }, "ACCESS_REVOKED", "Access revoked by administrator")}
                      className="px-4 py-2.5 bg-zinc-900 hover:bg-red-950 text-red-400 font-mono text-xs uppercase font-bold rounded-xl border border-red-500/30 transition flex items-center gap-1.5 cursor-pointer"
                    >
                      Revoke Access
                    </button>
                  )}

                  {selectedRequest.indicatorAccessStatus !== "ACTIVE" && selectedRequest.indicatorAccessStatus !== "PENDING" && (
                    <button
                      disabled={isUpdatingStatus}
                      onClick={() => handleUpdateRequestStatus({ indicatorAccessStatus: "ACTIVE" }, "ACCESS_RESTORED", "Access restored by administrator")}
                      className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-mono text-xs uppercase font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                    >
                      Restore Access
                    </button>
                  )}
                </div>

                {/* Prompt Box for Action Required */}
                {isPromptingActionRequired && (
                  <div className="bg-amber-950/30 border border-amber-500/40 p-4 rounded-2xl space-y-3 animate-fade-in">
                    <p className="text-xs font-mono font-bold text-amber-400 uppercase">
                      Specify what action the user must take:
                    </p>
                    <textarea
                      value={actionReasonInput}
                      onChange={(e) => setActionReasonInput(e.target.value)}
                      rows={2}
                      placeholder="e.g. Please check your XM account number. We could not locate your registration under partner code UMAGAYI."
                      className="w-full bg-black/80 border border-zinc-800 focus:border-amber-500 px-3 py-2 rounded-xl text-xs text-white placeholder-zinc-600 outline-none"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          if (!actionReasonInput.trim()) {
                            alert("Please enter a reason or instruction for the applicant.");
                            return;
                          }
                          handleUpdateRequestStatus({
                            xmVerificationStatus: "ACTION_REQUIRED",
                            actionRequiredReason: actionReasonInput.trim()
                          }, "INFORMATION_REQUESTED", actionReasonInput.trim());
                        }}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs uppercase font-bold rounded-xl cursor-pointer"
                      >
                        Send Action Required Notice
                      </button>
                      <button
                        onClick={() => setIsPromptingActionRequired(false)}
                        className="px-4 py-2 bg-zinc-900 text-zinc-400 text-xs font-mono rounded-xl cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Admin Internal Notes Input */}
                <div className="space-y-1.5 pt-2">
                  <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                    Internal Admin Syndicate Notes (Saved with record):
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={adminNoteInput}
                      onChange={(e) => setAdminNoteInput(e.target.value)}
                      placeholder="e.g. Verified on XM partner dashboard. Granted TradingView access."
                      className="flex-1 bg-black/60 border border-zinc-800 focus:border-[#D4AF37] px-3.5 py-2.5 rounded-xl text-xs text-white placeholder-zinc-600 outline-none font-mono"
                    />
                    <button
                      onClick={() => handleUpdateRequestStatus({ adminNotes: adminNoteInput.trim() }, "ADMIN_NOTE_UPDATED")}
                      className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-[#D4AF37] font-mono text-xs uppercase font-bold rounded-xl border border-zinc-800 cursor-pointer whitespace-nowrap"
                    >
                      Save Note
                    </button>
                  </div>
                </div>

                {/* Request Specific Audit Trail */}
                <div className="pt-4 border-t border-zinc-800 space-y-2">
                  <h5 className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-bold">
                    Audit Trail for Request #{selectedRequest.id}:
                  </h5>
                  {requestLogs.length === 0 ? (
                    <p className="text-[11px] text-zinc-500 font-mono">No prior audit logs recorded for this request.</p>
                  ) : (
                    <div className="space-y-1.5 max-h-44 overflow-y-auto pr-2">
                      {requestLogs.map((log) => (
                        <div key={log.id} className="p-2.5 bg-black/50 border border-zinc-850 rounded-xl text-xs flex justify-between items-start gap-2">
                          <div>
                            <span className="font-mono text-[10px] font-bold text-[#D4AF37] uppercase">{log.action}</span>
                            <p className="text-zinc-300 text-[11px] mt-0.5">{log.reason || "Status changed"}</p>
                            {log.adminName && (
                              <p className="text-[9px] text-zinc-500 font-mono">By: {log.adminName}</p>
                            )}
                          </div>
                          <span className="text-[9px] font-mono text-zinc-500 whitespace-nowrap">
                            {new Date(log.timestamp).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

        </div>
      )}

      {/* ============================== TAB 2: PORTAL SETTINGS ============================== */}
      {activeAdminSubTab === "config" && (
        <form onSubmit={handleSaveConfig} className="bg-[#121212] border-2 border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex justify-between items-start pb-4 border-b border-zinc-800">
            <div>
              <h3 className="text-xl font-bold font-serif text-white">
                Global Indicator & Broker Configuration
              </h3>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">
                All changes save directly to the Firestore database and update the live portal instantly.
              </p>
            </div>

            {configSavedSuccess && (
              <div className="px-3 py-1.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-mono rounded-xl flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>Saved to Cloud ✓</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* XM Partner Code */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider font-bold block">
                XM Partner Code *
              </label>
              <input
                type="text"
                required
                value={editPartnerCode}
                onChange={(e) => setEditPartnerCode(e.target.value.toUpperCase())}
                placeholder="UMAGAYI"
                className="w-full bg-black/60 border border-zinc-800 focus:border-[#D4AF37] px-4 py-3 rounded-xl text-sm text-white placeholder-zinc-600 outline-none font-mono uppercase"
              />
              <p className="text-[10px] text-zinc-500">
                The code users must enter when registering on XM (e.g. UMAGAYI).
              </p>
            </div>

            {/* XM Referral / Partner URL */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider font-bold block">
                Official XM Referral / Partner URL *
              </label>
              <input
                type="url"
                required
                value={editReferralUrl}
                onChange={(e) => setEditReferralUrl(e.target.value)}
                placeholder="https://clicks.pipaffiliates.com/c?c=913735&l=en&p=1"
                className="w-full bg-black/60 border border-zinc-800 focus:border-[#D4AF37] px-4 py-3 rounded-xl text-sm text-white placeholder-zinc-600 outline-none font-mono"
              />
              <p className="text-[10px] text-zinc-500">
                The destination link opened when students click "Open XM".
              </p>
            </div>

            {/* Indicator Name */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider font-bold block">
                Indicator Display Name *
              </label>
              <input
                type="text"
                required
                value={editIndicatorName}
                onChange={(e) => setEditIndicatorName(e.target.value)}
                placeholder="UMAGAYI WE MALI INDICATOR V1"
                className="w-full bg-black/60 border border-zinc-800 focus:border-[#D4AF37] px-4 py-3 rounded-xl text-sm text-white placeholder-zinc-600 outline-none font-serif"
              />
            </div>

            {/* Indicator Version */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider font-bold block">
                Indicator Version Tag *
              </label>
              <input
                type="text"
                required
                value={editIndicatorVersion}
                onChange={(e) => setEditIndicatorVersion(e.target.value)}
                placeholder="V1"
                className="w-full bg-black/60 border border-zinc-800 focus:border-[#D4AF37] px-4 py-3 rounded-xl text-sm text-white placeholder-zinc-600 outline-none font-mono"
              />
            </div>

            {/* TradingView Publication URL */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider font-bold block">
                TradingView Publication / Chart URL (Optional)
              </label>
              <input
                type="url"
                value={editTradingViewUrl}
                onChange={(e) => setEditTradingViewUrl(e.target.value)}
                placeholder="https://www.tradingview.com/script/..."
                className="w-full bg-black/60 border border-zinc-800 focus:border-[#D4AF37] px-4 py-3 rounded-xl text-sm text-white placeholder-zinc-600 outline-none font-mono"
              />
              <p className="text-[10px] text-zinc-500">
                When provided, approved users see an "Open TradingView" button directly to this script.
              </p>
            </div>

            {/* XM Banner Image URL & Live Preview */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider font-bold block">
                XM Onboarding Banner Image URL
              </label>
              <input
                type="url"
                value={editBannerUrl}
                onChange={(e) => setEditBannerUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-black/60 border border-zinc-800 focus:border-[#D4AF37] px-4 py-3 rounded-xl text-sm text-white placeholder-zinc-600 outline-none font-mono"
              />

              {/* Banner Live Preview */}
              <div className="mt-2">
                <p className="text-[10px] font-mono text-zinc-400 uppercase mb-1.5">Live Banner Preview:</p>
                <div className="h-36 rounded-2xl overflow-hidden bg-black border border-zinc-800 relative">
                  <img
                    src={editBannerUrl || DEFAULT_INDICATOR_CONFIG.xmBannerUrl}
                    alt="XM Banner Preview"
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-4">
                    <span className="text-xs font-bold text-white font-mono">
                      Partner Code: {editPartnerCode || "UMAGAYI"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-4 border-t border-zinc-800 flex justify-end">
            <button
              type="submit"
              disabled={isSavingConfig}
              className="px-8 py-3 bg-[#D4AF37] hover:bg-amber-400 text-black font-mono text-xs uppercase font-bold tracking-wider rounded-xl transition flex items-center gap-2 cursor-pointer shadow-xl"
            >
              {isSavingConfig ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Saving to Cloud...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Portal Configuration</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* ============================== TAB 3: AUDIT TRAIL ============================== */}
      {activeAdminSubTab === "logs" && (
        <div className="bg-[#121212] border-2 border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
          <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
            <div>
              <h3 className="text-xl font-bold font-serif text-white">
                Global Indicator Audit Trail
              </h3>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">
                Cryptographically tracked log of all status changes, approvals, and administrative events.
              </p>
            </div>
            <span className="text-xs font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/30">
              {auditLogs.length} Total Events
            </span>
          </div>

          {auditLogs.length === 0 ? (
            <div className="py-12 text-center text-zinc-500 font-mono text-xs">
              No audit events logged yet.
            </div>
          ) : (
            <div className="divide-y divide-zinc-850">
              {auditLogs.map((log) => (
                <div key={log.id} className="py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold text-[#D4AF37] bg-black/60 px-2 py-0.5 rounded border border-zinc-800">
                        {log.action}
                      </span>
                      <span className="font-mono text-white font-semibold">
                        #{log.requestId}
                      </span>
                    </div>
                    <p className="text-zinc-300 font-sans text-xs">{log.reason}</p>
                    {log.adminName && (
                      <p className="text-[10px] text-zinc-500 font-mono">Admin: {log.adminName}</p>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
