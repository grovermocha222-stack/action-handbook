/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Volume2, Wind, Droplets, AlertTriangle } from "lucide-react";
import { SOUND_GUIDE, SMOKE_GUIDE, LEAK_GUIDE } from "../data";

export default function Diagnostics() {
  const [activeTab, setActiveTab] = useState<"sound" | "smoke" | "leak">("sound");

  return (
    <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_#000]">
      <div className="mb-6 flex flex-col justify-between gap-4 border-b-4 border-black pb-5 sm:flex-row sm:items-end">
        <div>
          <span className="bg-black text-[#CCFF00] font-mono text-xs font-black uppercase tracking-widest px-2.5 py-1">FIELD ANALYSIS</span>
          <h2 className="text-2xl font-black uppercase text-black mt-2">Interactive Field Diagnostics</h2>
          <p className="text-sm font-bold text-zinc-600 uppercase">Read the machine's symptoms before a catastrophic breakdown happens.</p>
        </div>

        <div className="flex border-4 border-black p-1 bg-black shrink-0">
          <button
            onClick={() => setActiveTab("sound")}
            className={`flex items-center gap-1.5 px-3 py-2 font-mono text-xs font-black uppercase tracking-tight transition-all cursor-pointer ${
              activeTab === "sound" ? "bg-[#CCFF00] text-black" : "bg-black text-white hover:bg-zinc-900"
            }`}
          >
            <Volume2 className="h-4 w-4 stroke-[3]" />
            <span>Sounds</span>
          </button>
          <button
            onClick={() => setActiveTab("smoke")}
            className={`flex items-center gap-1.5 px-3 py-2 font-mono text-xs font-black uppercase tracking-tight transition-all cursor-pointer ${
              activeTab === "smoke" ? "bg-[#CCFF00] text-black" : "bg-black text-white hover:bg-zinc-900"
            }`}
          >
            <Wind className="h-4 w-4 stroke-[3]" />
            <span>Smoke</span>
          </button>
          <button
            onClick={() => setActiveTab("leak")}
            className={`flex items-center gap-1.5 px-3 py-2 font-mono text-xs font-black uppercase tracking-tight transition-all cursor-pointer ${
              activeTab === "leak" ? "bg-[#CCFF00] text-black" : "bg-black text-white hover:bg-zinc-900"
            }`}
          >
            <Droplets className="h-4 w-4 stroke-[3]" />
            <span>Leaks</span>
          </button>
        </div>
      </div>

      {activeTab === "sound" && (
        <div className="space-y-6">
          <div className="bg-amber-100 border-4 border-black p-4 text-sm text-black flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 shrink-0 text-black mt-0.5 stroke-[2.5]" />
            <div>
              <strong className="underline uppercase tracking-wider block mb-1">Sound Diagnostic Principle:</strong> "Learn the machine’s voice. A machine that sounds 'angry' is already telling you the bill is coming."
            </div>
          </div>

          <div className="space-y-4">
            {SOUND_GUIDE.map((item, idx) => (
              <div key={idx} className="border-4 border-black p-4 bg-white flex flex-col md:flex-row md:items-start justify-between gap-4 shadow-[4px_4px_0px_0px_#000]">
                <div className="space-y-2 md:max-w-xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-lg font-black uppercase tracking-tight text-black">{item.sound}</h4>
                    <span
                      className={`inline-block border-2 border-black px-2 py-0.5 font-mono text-[10px] font-black tracking-wider uppercase ${
                        item.urgency === "CRITICAL"
                          ? "bg-[#FF3E00] text-white"
                          : item.urgency === "HIGH"
                          ? "bg-amber-400 text-black"
                          : "bg-black text-white"
                      }`}
                    >
                      {item.urgency}
                    </span>
                  </div>
                  
                  <p className="text-xs text-zinc-700 font-bold">
                    <strong className="underline uppercase">Component Source:</strong> {item.source}
                  </p>
                </div>

                <div className="bg-zinc-50 border-2 border-black p-3 text-sm md:w-72 self-stretch flex flex-col justify-center shadow-[2px_2px_0px_0px_#000]">
                  <span className="font-mono text-[10px] uppercase font-black text-zinc-500 border-b border-zinc-200 pb-1 mb-1 block">Likely Root Cause</span>
                  <p className="text-black font-bold leading-relaxed">{item.cause}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "smoke" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SMOKE_GUIDE.map((item, idx) => {
              let headerBg = "bg-zinc-100 text-zinc-800 border-black";
              if (item.color.includes("White")) headerBg = "bg-white text-black border-black";
              if (item.color.includes("Black")) headerBg = "bg-black text-[#CCFF00] border-black";
              if (item.color.includes("Blue")) headerBg = "bg-[#FF3E00] text-white border-black";
              
              return (
                <div key={idx} className="border-4 border-black overflow-hidden flex flex-col bg-zinc-50 shadow-[4px_4px_0px_0px_#000]">
                  <div className={`px-4 py-3 border-b-4 font-black uppercase text-sm ${headerBg}`}>
                    {item.color} Smoke
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between gap-4">
                    <div>
                      <span className="font-mono text-[10px] uppercase font-black text-black bg-[#CCFF00] border border-black px-1.5 py-0.5">Likely Causes:</span>
                      <ul className="mt-3 space-y-2 font-bold text-xs">
                        {item.causes.map((cause, cIdx) => (
                          <li key={cIdx} className="text-zinc-800 flex items-start gap-1.5">
                            <span className="text-[#FF3E00] font-black mt-0.5">■</span>
                            <span>{cause}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="bg-black text-[#CCFF00] p-4 text-center font-mono text-xs border-4 border-black font-black uppercase">
            WARNING: If exhaust smoke is heavy and persistent, reject the machine from going to the field.
          </div>
        </div>
      )}

      {activeTab === "leak" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LEAK_GUIDE.map((item, idx) => (
              <div key={idx} className="border-4 border-black p-5 bg-white shadow-[4px_4px_0px_0px_#000]">
                <div className="flex items-center gap-3 border-b-4 border-black pb-3 mb-4 bg-zinc-50 p-2.5">
                  <span className="h-10 w-10 bg-black text-[#CCFF00] flex items-center justify-center border-2 border-black font-black shrink-0">
                    <Droplets className="h-5 w-5 stroke-[2.5]" />
                  </span>
                  <div>
                    <h4 className="text-base font-black uppercase text-black leading-none">{item.type} Leak</h4>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="font-mono text-[10px] uppercase font-black text-black bg-[#CCFF00] px-2 py-0.5 border border-black inline-block">Diagnosis & Hotspots:</span>
                  <ul className="space-y-2">
                    {item.origins.map((origin, oIdx) => (
                      <li key={oIdx} className="text-xs font-bold text-black bg-zinc-50 border-2 border-black p-2.5 flex items-start gap-2">
                        <span className="text-[#FF3E00] font-black mt-0.5">#</span>
                        <span>{origin}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-[#FF3E00] border-4 border-black p-4 text-sm text-white flex items-start gap-3 shadow-[4px_4px_0px_0px_#000]">
            <AlertTriangle className="h-6 w-6 shrink-0 text-white mt-0.5" />
            <div>
              <strong className="underline uppercase tracking-wider block mb-1">Leak Alert Directive:</strong> Any leak on a heavy equipment unit that is supposed to go to a remote site is highly likely to blow out or expand under deep work stress.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
