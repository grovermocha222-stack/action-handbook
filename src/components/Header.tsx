/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Wrench, WifiOff, MapPin } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b-8 border-black bg-black p-6 text-white">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center bg-[#CCFF00] text-black font-black border-4 border-black shadow-[4px_4px_0px_0px_#000] shrink-0">
              <Wrench className="h-6 w-6 stroke-[3]" />
            </span>
            <div>
              <h1 id="app-title" className="font-sans text-3xl font-black uppercase leading-none tracking-tighter text-[#CCFF00] md:text-4xl">
                Action Handbook
              </h1>
              <p className="font-mono text-sm font-bold tracking-wider mt-1 text-white uppercase">
                Preventive Maintenance &bull; Site Ready Only
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 bg-zinc-900 border-2 border-[#CCFF00] px-3 py-1 font-mono text-xs text-[#CCFF00]">
            <MapPin className="h-4 w-4" />
            <span className="font-bold">NIGERIA OPS</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#CCFF00] text-black px-3 py-1 font-mono text-xs border-2 border-black font-black">
            <WifiOff className="h-4 w-4 animate-pulse" />
            <span>OFFLINE READY</span>
          </div>
        </div>
      </div>
    </header>
  );
}
