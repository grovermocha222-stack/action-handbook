/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { BookOpen, ShieldAlert, CheckCircle2, ChevronRight, Eye, RefreshCw, Layers } from "lucide-react";
import { MACHINE_WATCHPOINTS, DECEPTION_TACTICS } from "../data";
import { MachineType } from "../types";

export default function HandbookContent() {
  const [selectedMachine, setSelectedMachine] = useState<MachineType>("excavator");

  return (
    <div className="space-y-8">
      {/* Machine Watch Points */}
      <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_#000]">
        <div className="flex flex-col justify-between gap-4 border-b-4 border-black pb-5 sm:flex-row sm:items-end mb-6">
          <div>
            <span className="bg-black text-[#CCFF00] font-mono text-xs font-black uppercase tracking-widest px-2.5 py-1">SPECIFICATION</span>
            <h2 className="text-2xl font-black uppercase text-black tracking-tight mt-2">Machine-Specific Field Checkpoints</h2>
            <p className="text-sm font-bold text-zinc-600 uppercase tracking-tight">Every machine class has separate mechanical failure spots. Select to inspect.</p>
          </div>

          <div className="flex border-4 border-black p-1 bg-black shrink-0">
            <button
              onClick={() => setSelectedMachine("excavator")}
              className={`px-4 py-2 font-mono text-xs font-black uppercase tracking-tight transition-all cursor-pointer ${
                selectedMachine === "excavator" 
                  ? "bg-[#CCFF00] text-black" 
                  : "bg-black text-white hover:bg-zinc-900"
              }`}
            >
              Excavator
            </button>
            <button
              onClick={() => setSelectedMachine("grader")}
              className={`px-4 py-2 font-mono text-xs font-black uppercase tracking-tight transition-all cursor-pointer ${
                selectedMachine === "grader" 
                  ? "bg-[#CCFF00] text-black" 
                  : "bg-black text-white hover:bg-zinc-900"
              }`}
            >
              Grader
            </button>
            <button
              onClick={() => setSelectedMachine("dozer")}
              className={`px-4 py-2 font-mono text-xs font-black uppercase tracking-tight transition-all cursor-pointer ${
                selectedMachine === "dozer" 
                  ? "bg-[#CCFF00] text-black" 
                  : "bg-black text-white hover:bg-zinc-900"
              }`}
            >
              Dozer
            </button>
          </div>
        </div>

        {/* Selected Watchpoint Detail */}
        {selectedMachine && MACHINE_WATCHPOINTS[selectedMachine] && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-black p-4 border-4 border-black text-white flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#CCFF00] font-black">Class Watch Profile</span>
                <h3 className="text-xl font-black uppercase tracking-tight text-white">{MACHINE_WATCHPOINTS[selectedMachine].modelName}</h3>
              </div>
              <span className="h-4 w-4 bg-[#CCFF00] animate-pulse border-2 border-black" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Core checks list */}
              <div className="space-y-3">
                <span className="font-mono text-sm font-black text-black bg-[#CCFF00] border-2 border-black px-2 py-1 uppercase inline-flex items-center gap-1.5">
                  <Eye className="h-4.5 w-4.5 text-black stroke-[3]" /> Core Inspection Areas
                </span>
                
                <ul className="space-y-3">
                  {MACHINE_WATCHPOINTS[selectedMachine].checks.map((check, idx) => (
                    <li key={idx} className="text-sm font-bold text-black bg-white border-2 border-black p-3.5 flex items-start gap-2.5 shadow-[3px_3px_0px_0px_#000]">
                      <ChevronRight className="h-5 w-5 text-black shrink-0 mt-0.5 stroke-[3]" />
                      <span>{check}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Red flags list */}
              <div className="space-y-3">
                <span className="font-mono text-sm font-black text-white bg-[#FF3E00] border-2 border-black px-2 py-1 uppercase inline-flex items-center gap-1.5">
                  <ShieldAlert className="h-4.5 w-4.5 text-white" /> Immediate Red Flags
                </span>

                <ul className="space-y-3">
                  {MACHINE_WATCHPOINTS[selectedMachine].badSigns.map((sign, idx) => (
                    <li key={idx} className="text-sm font-bold text-white bg-[#FF3E00] border-2 border-black p-3.5 flex items-start gap-2.5 shadow-[3px_3px_0px_0px_#000]">
                      <span className="h-2.5 w-2.5 bg-black shrink-0 mt-1.5 border border-white" />
                      <span>{sign}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Extra Stress Test */}
            <div className="border-4 border-dashed border-black bg-amber-100 p-5">
              <span className="bg-black text-[#CCFF00] px-2.5 py-1 font-mono text-[11px] uppercase font-black tracking-wider">
                Stress Test: {MACHINE_WATCHPOINTS[selectedMachine].extraTest.name}
              </span>
              
              <p className="text-sm text-black mt-3.5 font-bold leading-relaxed">
                <strong className="underline uppercase tracking-wide">How it works:</strong> {MACHINE_WATCHPOINTS[selectedMachine].extraTest.description}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Ground Archaeology & Deception Tactics */}
      <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_#000]">
        <div className="mb-6 border-b-4 border-black pb-4">
          <span className="bg-black text-[#CCFF00] font-mono text-xs font-black uppercase tracking-widest px-2.5 py-1">TACTICAL DIRECTIVE</span>
          <h2 className="text-2xl font-black uppercase text-black tracking-tight mt-2">Owner Deception Tactics & Ground Archaeology</h2>
          <p className="text-sm font-bold text-zinc-600 uppercase tracking-tight mt-1">How to identify owner tricks to mask machine faults before you pay.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DECEPTION_TACTICS.map((tactic, idx) => (
            <div key={idx} className="border-4 border-black bg-white p-5 flex flex-col justify-between gap-5 shadow-[4px_4px_0px_0px_#000]">
              <div>
                <div className="flex items-center gap-2 mb-2.5 bg-black p-2 border-2 border-black">
                  <span className="h-3 w-3 bg-[#FF3E00] border border-white" />
                  <h4 className="text-sm font-black uppercase text-white tracking-wide">{tactic.title}</h4>
                </div>
                
                <p className="text-sm font-bold text-zinc-800 leading-relaxed mb-3">
                  {tactic.description}
                </p>
              </div>

              <div className="bg-[#CCFF00] p-3 border-2 border-black text-black">
                <span className="font-mono text-[10px] uppercase font-black tracking-wide block border-b border-black pb-1 mb-1">Broker Counter-Action</span>
                <p className="text-xs font-bold leading-normal">{tactic.counterAction}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nigerian Field Realities */}
      <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_#000]">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6 border-b-4 border-black pb-4">
          <span className="flex h-12 w-12 items-center justify-center bg-black text-[#CCFF00] border-4 border-black shrink-0">
            <Layers className="h-6 w-6 stroke-[3]" />
          </span>
          <div>
            <h3 className="text-xl font-black uppercase text-black">Nigerian Field Realities vs Standard OEM Manuals</h3>
            <p className="text-sm font-bold text-zinc-600 uppercase">Standard operating manuals assume perfect conditions. Here is the local truth.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border-4 border-black p-4 bg-zinc-50 shadow-[3px_3px_0px_0px_#000]">
            <span className="font-mono text-[11px] uppercase font-black text-[#FF3E00] bg-black px-1.5 py-0.5">Dust & Air Filters</span>
            <h5 className="text-sm font-black uppercase text-black mt-2.5">3–5x Dust Volume</h5>
            <p className="text-xs font-semibold text-zinc-700 mt-2 leading-relaxed">
              Harmattan winds choke air filters rapidly. Halve OEM service intervals. Always verify the intake housing seals.
            </p>
          </div>

          <div className="border-4 border-black p-4 bg-zinc-50 shadow-[3px_3px_0px_0px_#000]">
            <span className="font-mono text-[11px] uppercase font-black text-[#FF3E00] bg-black px-1.5 py-0.5">Heat Cycling</span>
            <h5 className="text-sm font-black uppercase text-black mt-2.5">Aggressive Cooling Stress</h5>
            <p className="text-xs font-semibold text-zinc-700 mt-2 leading-relaxed">
              Tropical heat degrades coolant hoses and fan belts fast. Inspect daily for cracking, swelling, or low levels to avoid pressure blowouts.
            </p>
          </div>

          <div className="border-4 border-black p-4 bg-zinc-50 shadow-[3px_3px_0px_0px_#000]">
            <span className="font-mono text-[11px] uppercase font-black text-[#FF3E00] bg-black px-1.5 py-0.5">Fuel Impurities</span>
            <h5 className="text-sm font-black uppercase text-black mt-2.5">Injector Danger Zones</h5>
            <p className="text-xs font-semibold text-zinc-700 mt-2 leading-relaxed">
              Sediments are common. Run the lighter test on a small diesel sample: if it ignites immediately, it is mixed with petrol. The separator filter is your main shield.
            </p>
          </div>

          <div className="border-4 border-black p-4 bg-zinc-50 shadow-[3px_3px_0px_0px_#000]">
            <span className="font-mono text-[11px] uppercase font-black text-[#FF3E00] bg-black px-1.5 py-0.5">Hydraulic Heat</span>
            <h5 className="text-sm font-black uppercase text-black mt-2.5">Extreme Oil Thinning</h5>
            <p className="text-xs font-semibold text-zinc-700 mt-2 leading-relaxed">
              Long hot shifts overheat fluid, causing cavitation and power drops. Inspect oil viscosity and verify auxiliary coolers are clean.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
