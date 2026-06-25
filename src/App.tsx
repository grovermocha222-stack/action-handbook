/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { BookOpen, CheckSquare, Activity, ClipboardCheck, ShieldAlert, MessageSquare, Flame, AlertCircle } from "lucide-react";
import Header from "./components/Header";
import HandbookContent from "./components/HandbookContent";
import Checklists from "./components/Checklists";
import Diagnostics from "./components/Diagnostics";
import PreHireInspection from "./components/PreHireInspection";
import BlacklistLog from "./components/BlacklistLog";
import { InspectionForm, BlacklistEntry } from "./types";

const INITIAL_BLACKLIST: BlacklistEntry[] = [
  {
    id: "bl-1",
    machineName: "330 #04",
    machineType: "excavator",
    owner: "Alhaji Bello",
    problemHistory: "Frequent cooling fan failure & cylinder head overheating in high-temp afternoon shifts.",
    dateAdded: "June 10, 2026"
  },
  {
    id: "bl-2",
    machineName: "D6 #02",
    machineType: "dozer",
    owner: "Ngozi Equipment Ltd",
    problemHistory: "Weak left steering clutch cylinder; drifts heavily when pushing high mounds of sand.",
    dateAdded: "June 15, 2026"
  },
  {
    id: "bl-3",
    machineName: "14G #01",
    machineType: "grader",
    owner: "Kano Roads Broking",
    problemHistory: "Blade circle gear play exceeds 6mm. Circle skips teeth under standard blade side-shift load.",
    dateAdded: "June 20, 2026"
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<"handbook" | "checklists" | "diagnostics" | "pre-hire" | "blacklist">("handbook");
  
  // LocalStorage synced states
  const [reports, setReports] = useState<InspectionForm[]>([]);
  const [blacklist, setBlacklist] = useState<BlacklistEntry[]>([]);

  // Load Initial State
  useEffect(() => {
    const savedReports = localStorage.getItem("equipment_pm_reports");
    const savedBlacklist = localStorage.getItem("equipment_pm_blacklist");

    if (savedReports) {
      setReports(JSON.parse(savedReports));
    } else {
      setReports([]);
    }

    if (savedBlacklist) {
      setBlacklist(JSON.parse(savedBlacklist));
    } else {
      // Seed initial blacklist if none exists
      setBlacklist(INITIAL_BLACKLIST);
      localStorage.setItem("equipment_pm_blacklist", JSON.stringify(INITIAL_BLACKLIST));
    }
  }, []);

  // Sync Reports
  const handleSaveReport = (newReport: InspectionForm) => {
    const updated = [newReport, ...reports];
    setReports(updated);
    localStorage.setItem("equipment_pm_reports", JSON.stringify(updated));

    // Auto-blacklist if critical decision was REJECT
    if (newReport.finalDecision === "reject") {
      const existing = blacklist.find(b => b.machineName.toLowerCase() === newReport.model.toLowerCase());
      if (!existing) {
        const blacklistEntry: BlacklistEntry = {
          id: `bl-${Date.now()}`,
          machineName: newReport.model,
          machineType: newReport.machineType,
          owner: newReport.owner,
          problemHistory: newReport.notes || "Auto-Blacklisted due to critical pre-hire inspection failure.",
          dateAdded: newReport.date
        };
        const updatedBlacklist = [blacklistEntry, ...blacklist];
        setBlacklist(updatedBlacklist);
        localStorage.setItem("equipment_pm_blacklist", JSON.stringify(updatedBlacklist));
      }
    }
  };

  const handleDeleteReport = (id: string) => {
    const updated = reports.filter((r) => r.id !== id);
    setReports(updated);
    localStorage.setItem("equipment_pm_reports", JSON.stringify(updated));
  };

  // Sync Blacklist Actions
  const handleAddBlacklist = (entry: Omit<BlacklistEntry, "id" | "dateAdded">) => {
    const newEntry: BlacklistEntry = {
      id: `bl-${Date.now()}`,
      dateAdded: new Date().toLocaleDateString("en-NG", { year: 'numeric', month: 'long', day: 'numeric' }),
      ...entry
    };
    const updated = [newEntry, ...blacklist];
    setBlacklist(updated);
    localStorage.setItem("equipment_pm_blacklist", JSON.stringify(updated));
  };

  const handleDeleteBlacklist = (id: string) => {
    const updated = blacklist.filter((b) => b.id !== id);
    setBlacklist(updated);
    localStorage.setItem("equipment_pm_blacklist", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-[#F0F0EE] font-sans text-black selection:bg-[#CCFF00] selection:text-black">
      <Header />

      <main className="mx-auto max-w-5xl px-4 py-8 md:px-8">
        {/* Core Quick Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_#000] flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center border-2 border-black bg-[#CCFF00] text-black shrink-0 shadow-[2px_2px_0px_0px_#000]">
              <BookOpen className="h-6 w-6 stroke-[2.5]" />
            </span>
            <div>
              <h3 className="font-mono text-xl font-black text-black uppercase">CAT G-Series</h3>
              <p className="text-xs font-bold text-zinc-600 uppercase">Mechanical PM Guide</p>
            </div>
          </div>

          <div className="border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_#000] flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center border-2 border-black bg-[#CCFF00] text-black shrink-0 shadow-[2px_2px_0px_0px_#000]">
              <ClipboardCheck className="h-6 w-6 stroke-[2.5]" />
            </span>
            <div>
              <h3 className="font-mono text-2xl font-black text-black">{reports.length}</h3>
              <p className="text-xs font-bold text-zinc-600 uppercase">Saved Inspections</p>
            </div>
          </div>

          <div className="border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_#000] flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center border-2 border-black bg-[#FF3E00] text-white shrink-0 shadow-[2px_2px_0px_0px_#000]">
              <ShieldAlert className="h-6 w-6 stroke-[2.5]" />
            </span>
            <div>
              <h3 className="font-mono text-2xl font-black text-[#FF3E00]">{blacklist.length}</h3>
              <p className="text-xs font-bold text-[#FF3E00] uppercase">Blacklisted Units</p>
            </div>
          </div>
        </div>

        {/* Primary Dashboard Tabs Selector */}
        <div className="flex flex-wrap gap-3 mb-8 border-b-4 border-black pb-6">
          <button
            onClick={() => setActiveTab("handbook")}
            className={`flex items-center gap-2 border-4 border-black px-4 py-2.5 font-mono text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "handbook"
                ? "bg-[#CCFF00] text-black shadow-[4px_4px_0px_0px_#000] -translate-x-0.5 -translate-y-0.5"
                : "bg-white text-black hover:bg-zinc-50 shadow-[2px_2px_0px_0px_#000]"
            }`}
          >
            <BookOpen className="h-4.5 w-4.5 stroke-[2.5]" />
            <span>Field Handbook</span>
          </button>

          <button
            onClick={() => setActiveTab("checklists")}
            className={`flex items-center gap-2 border-4 border-black px-4 py-2.5 font-mono text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "checklists"
                ? "bg-[#CCFF00] text-black shadow-[4px_4px_0px_0px_#000] -translate-x-0.5 -translate-y-0.5"
                : "bg-white text-black hover:bg-zinc-50 shadow-[2px_2px_0px_0px_#000]"
            }`}
          >
            <CheckSquare className="h-4.5 w-4.5 stroke-[2.5]" />
            <span>PM Checklists</span>
          </button>

          <button
            onClick={() => setActiveTab("diagnostics")}
            className={`flex items-center gap-2 border-4 border-black px-4 py-2.5 font-mono text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "diagnostics"
                ? "bg-[#CCFF00] text-black shadow-[4px_4px_0px_0px_#000] -translate-x-0.5 -translate-y-0.5"
                : "bg-white text-black hover:bg-zinc-50 shadow-[2px_2px_0px_0px_#000]"
            }`}
          >
            <Activity className="h-4.5 w-4.5 stroke-[2.5]" />
            <span>Diagnostics</span>
          </button>

          <button
            onClick={() => setActiveTab("pre-hire")}
            className={`flex items-center gap-2 border-4 border-black px-4 py-2.5 font-mono text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "pre-hire"
                ? "bg-[#FF3E00] text-white shadow-[4px_4px_0px_0px_#000] -translate-x-0.5 -translate-y-0.5"
                : "bg-amber-100 text-black hover:bg-amber-200 shadow-[2px_2px_0px_0px_#000]"
            }`}
          >
            <ClipboardCheck className="h-4.5 w-4.5 stroke-[2.5]" />
            <span>Pre-Hire Check</span>
          </button>

          <button
            onClick={() => setActiveTab("blacklist")}
            className={`flex items-center gap-2 border-4 border-black px-4 py-2.5 font-mono text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "blacklist"
                ? "bg-[#CCFF00] text-black shadow-[4px_4px_0px_0px_#000] -translate-x-0.5 -translate-y-0.5"
                : "bg-white text-black hover:bg-zinc-50 shadow-[2px_2px_0px_0px_#000]"
            }`}
          >
            <ShieldAlert className="h-4.5 w-4.5 stroke-[2.5]" />
            <span>Blacklist Log</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="space-y-6">
          {activeTab === "handbook" && <HandbookContent />}
          {activeTab === "checklists" && <Checklists />}
          {activeTab === "diagnostics" && <Diagnostics />}
          {activeTab === "pre-hire" && <PreHireInspection onSave={handleSaveReport} />}
          {activeTab === "blacklist" && (
            <BlacklistLog
              reports={reports}
              blacklist={blacklist}
              onDeleteReport={handleDeleteReport}
              onDeleteBlacklist={handleDeleteBlacklist}
              onAddBlacklist={handleAddBlacklist}
            />
          )}
        </div>
      </main>

      <footer className="mt-16 border-t-4 border-black bg-white py-8 text-center text-black">
        <div className="mx-auto max-w-5xl px-4 font-mono text-xs">
          <p className="font-black uppercase tracking-wider text-base mb-1">
            HEAVY EQUIPMENT PREVENTIVE MAINTENANCE FIELD HANDBOOK &bull; NIGERIA
          </p>
          <p className="font-bold text-zinc-600 uppercase">Designed for robust local operations. 100% Offline-Capable.</p>
          <div className="mt-4 inline-block border-2 border-black bg-[#CCFF00] px-3 py-1 font-black uppercase shadow-[2px_2px_0px_0px_#000]">
            MAINTAIN TO EARN, NEGLECT TO PANIC
          </div>
          <p className="mt-6 text-[10px] text-zinc-500 font-bold uppercase">&copy; 2026. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
