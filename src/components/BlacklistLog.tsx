/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { History, ShieldAlert, Trash2, Clipboard, ChevronDown, CheckCircle, XCircle, AlertTriangle, PlusCircle } from "lucide-react";
import { InspectionForm, BlacklistEntry } from "../types";

interface BlacklistLogProps {
  reports: InspectionForm[];
  blacklist: BlacklistEntry[];
  onDeleteReport: (id: string) => void;
  onDeleteBlacklist: (id: string) => void;
  onAddBlacklist: (entry: Omit<BlacklistEntry, "id" | "dateAdded">) => void;
}

export default function BlacklistLog({
  reports,
  blacklist,
  onDeleteReport,
  onDeleteBlacklist,
  onAddBlacklist
}: BlacklistLogProps) {
  const [activeTab, setActiveTab] = useState<"history" | "blacklist">("history");
  
  // States for adding blacklisted item
  const [showAddBlack, setShowAddBlack] = useState(false);
  const [blacklistForm, setBlacklistForm] = useState({
    machineName: "",
    machineType: "excavator" as any,
    owner: "",
    problemHistory: ""
  });

  // State for expanded report detail view
  const [expandedReportId, setExpandedReportId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleAddBlacklistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blacklistForm.machineName || !blacklistForm.problemHistory) {
      alert("Fill in Machine Code Name and Problems first!");
      return;
    }
    onAddBlacklist(blacklistForm);
    setBlacklistForm({
      machineName: "",
      machineType: "excavator",
      owner: "",
      problemHistory: ""
    });
    setShowAddBlack(false);
  };

  const getWhatsAppFormat = (report: InspectionForm) => {
    const decEmoji = report.finalDecision === "accept" ? "✅" : report.finalDecision === "repair_needed" ? "⚠️" : "❌";
    const decText = report.finalDecision === "accept" ? "ACCEPT - Deploy Immediately" : report.finalDecision === "repair_needed" ? "ACCEPT ONLY AFTER REPAIRS" : "REJECT - Critical Failures Detected";
    
    // Aggregate faults
    const faults: string[] = [];
    if (!report.engineStartsWell) faults.push("Engine Starts Slow");
    if (!report.smokeNormal) faults.push("Abnormal Smoke Color");
    if (!report.noEngineKnocking) faults.push("Engine Knocking Sound");
    if (!report.noOverheating) faults.push("Overheating Issues");
    if (!report.strongHydraulicResponse) faults.push("Sluggish Hydraulics");
    if (!report.noHydraulicLeaks) faults.push("Active Hydraulic Oil Leaks");
    if (!report.pumpSoundNormal) faults.push("Pump Cavitation Noise");
    if (!report.travelBothSidesEqual) faults.push("Uneven Track Pull");
    if (!report.noPullsToSide) faults.push("Tracks Pull To One Side");
    if (!report.brakesSteeringOk) faults.push("Spongy Brakes / Steering Play");
    if (!report.noStructuralCracks) faults.push("Boom/Blade Structural Cracks");
    if (!report.pinsAndBushingsOk) faults.push("Excessive Pin/Bushing Play");

    const verificationNotes = [
      report.checkedColdStart ? "Checked Cold Start: Yes" : "Checked Cold Start: No",
      report.checkedGroundArchaeology ? "Ground Archaeology Done: Yes" : "Ground Archaeology Done: No",
      report.checkedFreshWashDown ? "Behind Fresh Washdown Checked: Yes" : "Behind Fresh Washdown Checked: No",
      report.spokeToOperatorSeparately ? "Interviewed Operator Separately: Yes" : "Interviewed Operator Separately: No"
    ].join("\n");

    return `🇳🇬 *HEAVY EQUIPMENT PRE-HIRE REPORT*
📅 *Date:* ${report.date}
🚜 *Machine:* CAT ${report.machineType.toUpperCase()} (${report.model})
👤 *Owner:* ${report.owner}
📍 *Site:* ${report.site || "N/A"}
⏱️ *HMR:* ${report.hours || "N/A"}

*FINAL DECISION:* ${decEmoji} *${decText}*

${faults.length > 0 ? `*Faults Identified:*\n${faults.map(f => `• ${f}`).join("\n")}` : `*Faults Identified:* None! Clean Run`}

*Deception Verification Checks:*\n${verificationNotes}

*Field Notes:*
"${report.notes || "No extra notes logged"}"

_Report compiled using Nigeria PM Handbook - Reliable deliveries only_ 🚜🔍`;
  };

  const copyToClipboard = (report: InspectionForm) => {
    const text = getWhatsAppFormat(report);
    navigator.clipboard.writeText(text);
    setCopiedId(report.id);
    setTimeout(() => setCopiedId(null), 3000);
  };

  return (
    <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_#000]">
      <div className="flex flex-col justify-between gap-4 border-b-4 border-black pb-5 sm:flex-row sm:items-end mb-6">
        <div>
          <span className="bg-black text-[#CCFF00] font-mono text-xs font-black uppercase tracking-widest px-2.5 py-1">DEPLOYMENT SECURITY</span>
          <h2 className="text-2xl font-black uppercase text-black mt-2">Reports Log & Blacklist</h2>
          <p className="text-sm font-bold text-zinc-600 uppercase">Track inspected units or blacklist notorious machines to protect deployment sites.</p>
        </div>

        <div className="flex border-4 border-black p-1 bg-black shrink-0">
          <button
            onClick={() => setActiveTab("history")}
            className={`flex items-center gap-1.5 px-3 py-2 font-mono text-xs font-black uppercase tracking-tight transition-all cursor-pointer ${
              activeTab === "history" ? "bg-[#CCFF00] text-black" : "bg-black text-white hover:bg-zinc-900"
            }`}
          >
            <History className="h-4 w-4 stroke-[3]" />
            <span>Inspection Archive</span>
          </button>
          <button
            onClick={() => setActiveTab("blacklist")}
            className={`flex items-center gap-1.5 px-3 py-2 font-mono text-xs font-black uppercase tracking-tight transition-all cursor-pointer ${
              activeTab === "blacklist" ? "bg-[#CCFF00] text-black" : "bg-black text-white hover:bg-zinc-900"
            }`}
          >
            <ShieldAlert className="h-4 w-4 stroke-[3]" />
            <span>Machine Blacklist</span>
          </button>
        </div>
      </div>

      {/* History Log */}
      {activeTab === "history" && (
        <div className="space-y-4">
          {reports.length === 0 ? (
            <div className="border-4 border-dashed border-black p-8 text-center text-zinc-500 bg-zinc-50">
              <History className="h-10 w-10 mx-auto text-black mb-3" />
              <p className="text-base font-black uppercase text-black">No inspection reports saved yet</p>
              <p className="text-xs text-zinc-600 font-bold mt-1 uppercase">Inspections you save in the Pre-Hire tab will appear here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reports.map((report) => {
                const isExpanded = expandedReportId === report.id;
                const decisionStyle =
                  report.finalDecision === "accept"
                    ? { bg: "bg-[#CCFF00] text-black border-black", icon: <CheckCircle className="h-4 w-4 shrink-0 text-black stroke-[3]" />, label: "ACCEPT" }
                    : report.finalDecision === "repair_needed"
                    ? { bg: "bg-amber-400 text-black border-black", icon: <AlertTriangle className="h-4 w-4 shrink-0 text-black stroke-[3]" />, label: "REPAIR FIRST" }
                    : { bg: "bg-[#FF3E00] text-white border-black", icon: <XCircle className="h-4 w-4 shrink-0 text-white stroke-[3]" />, label: "REJECTED" };

                return (
                  <div key={report.id} className="border-4 border-black bg-white overflow-hidden shadow-[4px_4px_0px_0px_#000]">
                    {/* Header Summary */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-zinc-50 border-b-2 border-black">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="font-mono text-xs font-black text-white bg-black px-2 py-0.5 uppercase tracking-wider">
                            CAT {report.machineType.toUpperCase()}
                          </span>
                          <span className="text-xs text-zinc-600 font-mono font-bold">&bull; {report.date}</span>
                        </div>
                        <h4 className="text-base font-black text-black uppercase">
                          {report.model} ({report.owner})
                        </h4>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-center">
                        <span className={`inline-flex items-center gap-1.5 border-2 px-3 py-1 text-xs font-black uppercase ${decisionStyle.bg}`}>
                          {decisionStyle.icon}
                          <span>{decisionStyle.label}</span>
                        </span>

                        <button
                          onClick={() => setExpandedReportId(isExpanded ? null : report.id)}
                          className="h-9 w-9 border-2 border-black bg-white hover:bg-zinc-100 flex items-center justify-center text-black cursor-pointer shadow-[2px_2px_0px_0px_#000]"
                        >
                          <ChevronDown className={`h-5 w-5 stroke-[2.5] transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                        </button>
                      </div>
                    </div>

                    {/* Expandable details */}
                    {isExpanded && (
                      <div className="p-4 bg-white border-t border-zinc-200 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 border-b border-black pb-4">
                          <div>
                            <span className="font-mono text-[10px] uppercase font-black text-zinc-400">Owner & Location</span>
                            <p className="text-sm text-black font-bold mt-0.5">{report.owner} &bull; {report.site || "N/A"}</p>
                          </div>
                          <div>
                            <span className="font-mono text-[10px] uppercase font-black text-zinc-400">Hour Meter Reading</span>
                            <p className="text-sm text-black font-bold mt-0.5">{report.hours || "N/A"}</p>
                          </div>
                        </div>

                        {/* Status Grid */}
                        <div>
                          <span className="font-mono text-[10px] uppercase font-black text-black bg-[#CCFF00] border border-black px-1.5 py-0.5 inline-block mb-2">Operational Breakdown</span>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <div className="bg-zinc-50 border-2 border-black p-2.5 text-xs">
                              <span className="text-zinc-500 font-bold block uppercase tracking-tight">Engine:</span>
                              <span className={`font-black uppercase text-sm ${report.noEngineKnocking && report.noOverheating ? "text-emerald-700" : "text-[#FF3E00]"}`}>
                                {report.noEngineKnocking && report.noOverheating ? "Pass" : "Fault"}
                              </span>
                            </div>
                            <div className="bg-zinc-50 border-2 border-black p-2.5 text-xs">
                              <span className="text-zinc-500 font-bold block uppercase tracking-tight">Hydraulics:</span>
                              <span className={`font-black uppercase text-sm ${report.noHydraulicLeaks && report.strongHydraulicResponse ? "text-emerald-700" : "text-[#FF3E00]"}`}>
                                {report.noHydraulicLeaks && report.strongHydraulicResponse ? "Pass" : "Fault"}
                              </span>
                            </div>
                            <div className="bg-zinc-50 border-2 border-black p-2.5 text-xs">
                              <span className="text-zinc-500 font-bold block uppercase tracking-tight">Tracks/Brakes:</span>
                              <span className={`font-black uppercase text-sm ${report.brakesSteeringOk && report.travelBothSidesEqual ? "text-emerald-700" : "text-[#FF3E00]"}`}>
                                {report.brakesSteeringOk && report.travelBothSidesEqual ? "Pass" : "Fault"}
                              </span>
                            </div>
                            <div className="bg-zinc-50 border-2 border-black p-2.5 text-xs">
                              <span className="text-zinc-500 font-bold block uppercase tracking-tight">Structure:</span>
                              <span className={`font-black uppercase text-sm ${report.noStructuralCracks ? "text-emerald-700" : "text-[#FF3E00]"}`}>
                                {report.noStructuralCracks ? "Pass" : "Fault"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Verification checklist indicators */}
                        <div className="border-2 border-black p-3 space-y-2 bg-zinc-50 shadow-[2px_2px_0px_0px_#000]">
                          <span className="font-mono text-[10px] uppercase font-black text-black border-b border-black pb-1 block">Deception Protection Audit</span>
                          <div className="flex flex-wrap gap-x-4 gap-y-1.5 font-bold text-xs">
                            <div className="flex items-center gap-1.5 text-zinc-900">
                              <span className={`h-2.5 w-2.5 border border-black ${report.checkedColdStart ? "bg-[#CCFF00]" : "bg-white"}`} />
                              <span>Checked Cold Start</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-zinc-900">
                              <span className={`h-2.5 w-2.5 border border-black ${report.checkedGroundArchaeology ? "bg-[#CCFF00]" : "bg-white"}`} />
                              <span>Ground Archaeology Done</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-zinc-900">
                              <span className={`h-2.5 w-2.5 border border-black ${report.checkedFreshWashDown ? "bg-[#CCFF00]" : "bg-white"}`} />
                              <span>Checked Fresh Wash-down</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-zinc-900">
                              <span className={`h-2.5 w-2.5 border border-black ${report.spokeToOperatorSeparately ? "bg-[#CCFF00]" : "bg-white"}`} />
                              <span>Operator Interviewed</span>
                            </div>
                          </div>
                        </div>

                        {report.notes && (
                          <div className="border-2 border-black p-3 text-xs text-black leading-normal bg-amber-100 font-bold">
                            <strong className="underline uppercase tracking-wider block mb-1">Field Inspector Notes:</strong>
                            "{report.notes}"
                          </div>
                        )}

                        {/* Export / Delete Action Bar */}
                        <div className="flex items-center justify-between gap-3 border-t-2 border-black pt-3 flex-wrap">
                          <button
                            onClick={() => copyToClipboard(report)}
                            className="flex items-center gap-2 bg-black text-[#CCFF00] border-2 border-black px-4 py-2 font-mono text-xs font-black uppercase tracking-wider hover:bg-[#CCFF00] hover:text-black transition-all shadow-[2px_2px_0px_0px_#000] cursor-pointer"
                          >
                            <Clipboard className="h-4 w-4 stroke-[2.5]" />
                            <span>{copiedId === report.id ? "Copied! ✅" : "Copy WhatsApp Report 📲"}</span>
                          </button>

                          <button
                            onClick={() => onDeleteReport(report.id)}
                            className="flex items-center gap-1.5 bg-[#FF3E00] text-white border-2 border-black px-4 py-2 font-mono text-xs font-black uppercase hover:bg-rose-700 transition-all shadow-[2px_2px_0px_0px_#000] cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Delete Report</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Blacklist Log */}
      {activeTab === "blacklist" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <span className="font-mono text-xs font-bold text-black bg-[#CCFF00] border border-black px-2 py-0.5 uppercase">
              NOTORIOUS MACHINE ROSTER (DO NOT HIRE THESE UNITS)
            </span>
            <button
              onClick={() => setShowAddBlack(!showAddBlack)}
              className="flex items-center gap-1.5 bg-black text-[#CCFF00] border-2 border-black px-3 py-1.5 font-mono text-xs font-black uppercase hover:bg-[#CCFF00] hover:text-black transition-all shadow-[2px_2px_0px_0px_#000] cursor-pointer"
            >
              <PlusCircle className="h-4 w-4 stroke-[2.5]" />
              <span>Blacklist Machine</span>
            </button>
          </div>

          {showAddBlack && (
            <form onSubmit={handleAddBlacklistSubmit} className="border-4 border-black bg-amber-100 p-4 space-y-4 shadow-[4px_4px_0px_0px_#000]">
              <span className="font-mono text-xs font-black text-black uppercase bg-black text-[#CCFF00] px-2 py-0.5 inline-block">Flag Notorious Defective Machine</span>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-black text-black uppercase mb-1">Machine Class</label>
                  <select
                    value={blacklistForm.machineType}
                    onChange={(e) => setBlacklistForm(prev => ({ ...prev, machineType: e.target.value as any }))}
                    className="w-full border-2 border-black px-2.5 py-1.5 text-xs font-bold bg-white focus:outline-none"
                  >
                    <option value="excavator">Excavator</option>
                    <option value="grader">Grader</option>
                    <option value="dozer">Dozer</option>
                    <option value="general">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-black uppercase mb-1">Machine Code / Identifier</label>
                  <input
                    type="text"
                    placeholder="e.g. 330 #04"
                    value={blacklistForm.machineName}
                    onChange={(e) => setBlacklistForm(prev => ({ ...prev, machineName: e.target.value }))}
                    className="w-full border-2 border-black px-2.5 py-1.5 text-xs font-bold bg-white focus:outline-none placeholder:text-zinc-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-black uppercase mb-1">Owner Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Alhaji Bello"
                    value={blacklistForm.owner}
                    onChange={(e) => setBlacklistForm(prev => ({ ...prev, owner: e.target.value }))}
                    className="w-full border-2 border-black px-2.5 py-1.5 text-xs font-bold bg-white focus:outline-none placeholder:text-zinc-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-black uppercase mb-1">Chronic Defect / Problem History</label>
                <input
                  type="text"
                  placeholder="e.g. Chronic overheating in afternoons, weak final drive motor"
                  value={blacklistForm.problemHistory}
                  onChange={(e) => setBlacklistForm(prev => ({ ...prev, problemHistory: e.target.value }))}
                  className="w-full border-2 border-black px-2.5 py-1.5 text-xs font-bold bg-white focus:outline-none placeholder:text-zinc-400"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddBlack(false)}
                  className="border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-tight hover:bg-zinc-100 transition-all cursor-pointer shadow-[2px_2px_0px_0px_#000]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#FF3E00] text-white border-2 border-black px-4 py-1 text-xs font-black uppercase tracking-tight hover:bg-rose-700 transition-all cursor-pointer shadow-[2px_2px_0px_0px_#000]"
                >
                  Save to Blacklist
                </button>
              </div>
            </form>
          )}

          {blacklist.length === 0 ? (
            <div className="border-4 border-dashed border-black p-8 text-center text-zinc-500 bg-zinc-50">
              <ShieldAlert className="h-10 w-10 mx-auto text-black mb-3" />
              <p className="text-base font-black uppercase text-black">Roster is empty</p>
              <p className="text-xs text-zinc-600 font-bold mt-1 uppercase">Inspected machines that you blacklist will keep your clients safe from delays.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {blacklist.map((item) => (
                <div key={item.id} className="border-4 border-black p-4 bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-[3px_3px_0px_0px_#000]">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-black text-[#FF3E00] uppercase tracking-wide">{item.machineName}</span>
                      <span className="text-xs text-zinc-600 font-mono font-bold">({item.owner || "Owner unknown"})</span>
                    </div>
                    <p className="text-sm text-black leading-snug font-bold">
                      <strong className="underline uppercase text-xs">Defect history:</strong> {item.problemHistory}
                    </p>
                    <span className="text-[10px] text-zinc-500 font-mono font-bold block uppercase">Blacklisted on {item.dateAdded}</span>
                  </div>

                  <button
                    onClick={() => onDeleteBlacklist(item.id)}
                    className="bg-[#FF3E00] text-white border-2 border-black p-2 hover:bg-rose-700 transition-all cursor-pointer shadow-[2px_2px_0px_0px_#000] shrink-0 self-end sm:self-center"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
