import React from "react";
import { X, Minus, Square } from "lucide-react";
import { getCurrentWindow } from "@tauri-apps/api/window";

const appWindow = getCurrentWindow();

export const TitleBar: React.FC = () => {
  return (
    <div data-tauri-drag-region className="custom-titlebar">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-echo-cyan shadow-[0_0_8px_rgba(0,229,255,0.5)]" />
        <span className="text-[10px] font-display uppercase tracking-widest text-echo-muted">ECHO v0.1.0</span>
      </div>
      
      <div className="flex items-center gap-4">
        <button onClick={() => appWindow.minimize()} className="text-echo-muted hover:text-echo-cyan transition-colors">
          <Minus size={14} />
        </button>
        <button onClick={() => appWindow.toggleMaximize()} className="text-echo-muted hover:text-echo-cyan transition-colors">
          <Square size={12} />
        </button>
        <button onClick={() => appWindow.close()} className="text-echo-muted hover:text-red-500 transition-colors">
          <X size={14} />
        </button>
      </div>
    </div>
  );
};
