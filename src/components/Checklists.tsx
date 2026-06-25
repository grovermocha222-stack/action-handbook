/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { CheckSquare, Square, RefreshCw, Calendar, Clock } from "lucide-react";
import { DAILY_CHECKLIST, WEEKLY_CHECKLIST } from "../data";

export default function Checklists() {
  const [activeTab, setActiveTab] = useState<"daily" | "weekly">("daily");
  
  // Real-time checked states saved in memory (resettable)
  const [dailyChecked, setDailyChecked] = useState<Record<string, boolean>>({});
  const [weeklyChecked, setWeeklyChecked] = useState<Record<string, boolean>>({});

  const toggleDaily = (id: string) => {
    setDailyChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleWeekly = (id: string) => {
    setWeeklyChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const resetChecked = () => {
    if (activeTab === "daily") {
      setDailyChecked({});
    } else if (activeTab === "weekly") {
      setWeeklyChecked({});
    }
  };

  // Calculations for progress bar
  const totalDaily = DAILY_CHECKLIST.length;
  const completedDaily = Object.values(dailyChecked).filter(Boolean).length;
  const pctDaily = Math.round((completedDaily / totalDaily) * 100);

  const totalWeekly = WEEKLY_CHECKLIST.length;
  const completedWeekly = Object.values(weeklyChecked).filter(Boolean).length;
  const pctWeekly = Math.round((completedWeekly / totalWeekly) * 100);

  return (
    <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_#000]">
      <div className="flex flex-col justify-between gap-4 border-b-4 border-black pb-5 sm:flex-row sm:items-end">
        <div>
          <span className="bg-black text-[#CCFF00] font-mono text-xs font-black uppercase tracking-widest px-2.5 py-1">SCHEDULES & LOGS</span>
          <h2 className="text-2xl font-black uppercase text-black mt-2">Preventive Maintenance Schedules</h2>
          <p className="text-sm font-bold text-zinc-600 uppercase">Run standard cumulative cycles. Tick items off during inspections.</p>
        </div>

        <div className="flex border-4 border-black p-1 bg-black shrink-0">
          <button
            onClick={() => setActiveTab("daily")}
            className={`flex items-center gap-1.5 px-3 py-2 font-mono text-xs font-black uppercase tracking-tight transition-all cursor-pointer ${
              activeTab === "daily" ? "bg-[#CCFF00] text-black" : "bg-black text-white hover:bg-zinc-900"
            }`}
          >
            <Clock className="h-4 w-4 stroke-[3]" />
            <span>Daily</span>
          </button>
          <button
            onClick={() => setActiveTab("weekly")}
            className={`flex items-center gap-1.5 px-3 py-2 font-mono text-xs font-black uppercase tracking-tight transition-all cursor-pointer ${
              activeTab === "weekly" ? "bg-[#CCFF00] text-black" : "bg-black text-white hover:bg-zinc-900"
            }`}
          >
            <Calendar className="h-4 w-4 stroke-[3]" />
            <span>Weekly</span>
          </button>
        </div>
      </div>

      {/* Progress & Reset Controls */}
      <div className="mt-6 mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-4 border-black bg-zinc-50 p-4">
        <div className="flex-1 min-w-[200px]">
          <div className="flex justify-between items-center text-xs font-black text-black uppercase tracking-tight mb-2">
            <span>Inspection Progress</span>
            <span className="font-mono bg-black text-[#CCFF00] px-2 py-0.5">
              {activeTab === "daily" ? `${completedDaily}/${totalDaily}` : `${completedWeekly}/${totalWeekly}`} Checked ({activeTab === "daily" ? pctDaily : pctWeekly}%)
            </span>
          </div>
          <div className="h-4 w-full bg-zinc-200 border-2 border-black">
            <div
              className="h-full bg-[#CCFF00] border-r-2 border-black transition-all duration-300"
              style={{ width: `${activeTab === "daily" ? pctDaily : pctWeekly}%` }}
            />
          </div>
        </div>

        <button
          onClick={resetChecked}
          className="flex items-center justify-center gap-1.5 bg-black text-white border-2 border-black px-4 py-2 font-mono text-xs font-black uppercase tracking-wider hover:bg-[#FF3E00] hover:text-white transition-all cursor-pointer shadow-[3px_3px_0px_0px_#000]"
        >
          <RefreshCw className="h-4 w-4 stroke-[3]" />
          <span>Reset Sheet</span>
        </button>
      </div>

      {/* Daily Tab */}
      {activeTab === "daily" && (
        <div className="space-y-4">
          {DAILY_CHECKLIST.map((item) => {
            const isChecked = !!dailyChecked[item.id];
            return (
              <div
                key={item.id}
                className={`border-4 border-black transition-all p-4.5 shadow-[4px_4px_0px_0px_#000] ${
                  isChecked ? "bg-[#CCFF00]/10" : "bg-white"
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleDaily(item.id)}
                    className={`mt-0.5 shrink-0 transition-all cursor-pointer ${
                      isChecked ? "text-[#FF3E00]" : "text-black hover:text-rose-600"
                    }`}
                  >
                    {isChecked ? (
                      <CheckSquare className="h-6 w-6 stroke-[3]" />
                    ) : (
                      <Square className="h-6 w-6 stroke-[3]" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="inline-block bg-black px-2 py-0.5 font-mono text-[10px] font-black uppercase text-[#CCFF00] border border-black">
                        {item.category}
                      </span>
                    </div>

                    <p className={`text-base font-black uppercase tracking-tight text-black ${isChecked ? "line-through text-zinc-400" : ""}`}>
                      {item.task}
                    </p>

                    {item.notes && (
                      <p className="text-xs text-zinc-700 mt-1 font-bold">
                        <strong className="underline uppercase">Guide:</strong> {item.notes}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Weekly Tab */}
      {activeTab === "weekly" && (
        <div className="space-y-4">
          {WEEKLY_CHECKLIST.map((item) => {
            const isChecked = !!weeklyChecked[item.id];
            return (
              <div
                key={item.id}
                className={`border-4 border-black transition-all p-4.5 shadow-[4px_4px_0px_0px_#000] ${
                  isChecked ? "bg-[#CCFF00]/10" : "bg-white"
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleWeekly(item.id)}
                    className={`mt-0.5 shrink-0 transition-all cursor-pointer ${
                      isChecked ? "text-[#FF3E00]" : "text-black hover:text-rose-600"
                    }`}
                  >
                    {isChecked ? (
                      <CheckSquare className="h-6 w-6 stroke-[3]" />
                    ) : (
                      <Square className="h-6 w-6 stroke-[3]" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="inline-block bg-black px-2 py-0.5 font-mono text-[10px] font-black uppercase text-[#CCFF00] border border-black">
                        {item.category}
                      </span>
                    </div>

                    <p className={`text-base font-black uppercase tracking-tight text-black ${isChecked ? "line-through text-zinc-400" : ""}`}>
                      {item.task}
                    </p>

                    {item.notes && (
                      <p className="text-xs text-zinc-700 mt-1 font-bold">
                        <strong className="underline uppercase">Guide:</strong> {item.notes}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
