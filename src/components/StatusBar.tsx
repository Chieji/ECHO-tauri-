import React, { useEffect, useState } from "react";
import { Cpu, Wifi, HardDrive, ShieldCheck } from "lucide-react";
import { invoke } from "@tauri-apps/api/core";

export const StatusBar: React.FC = () => {
  const [status, setStatus] = useState("INITIALIZING");
  const [latency, setLatency] = useState(0);

  useEffect(() => {
    // Poll backend status every 5 seconds
    const interval = setInterval(async () => {
      const start = Date.now();
      try {
        const result = await invoke<string>("get_echo_status");
        setStatus(result);
        setLatency(Date.now() - start);
      } catch (e) {
        setStatus("DISCONNECTED");
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[28px] bg-echo-void border-t border-echo-surface flex items-center justify-between px-4 fixed bottom-0 left-0 right-0 z-50 text-[9px] font-display uppercase tracking-widest text-echo-muted select-none cursor-default">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <ShieldCheck size={12} className={status === "DISCONNECTED" ? "text-red-500" : "text-green-500"} />
          <span>ECHO CORE: {status === "DISCONNECTED" ? "OFFLINE" : "SECURE"}</span>
        </div>
        <div className="flex items-center gap-2">
          <Wifi size={12} className="text-echo-cyan" />
          <span>NEURAL LINK: ACTIVE</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <HardDrive size={12} />
          <span>MEM: 4.2GB FREE</span>
        </div>
        <div className="flex items-center gap-2">
          <Cpu size={12} />
          <span>LATENCY: {latency}ms</span>
        </div>
        <div className={`px-2 py-0.5 rounded border font-bold ${
          status === "DISCONNECTED" 
            ? "bg-red-500/10 text-red-500 border-red-500/20" 
            : "bg-echo-cyan/10 text-echo-cyan border-echo-cyan/20"
        }`}>
          {status === "DISCONNECTED" ? "ERROR" : "LIVE"}
        </div>
      </div>
    </div>
  );
};
