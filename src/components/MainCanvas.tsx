import React, { useState, useEffect } from "react";
import { Mic, Send, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import { invoke } from "@tauri-apps/api/core";

export const MainCanvas: React.FC = () => {
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleCommand = async () => {
    if (!input.trim()) return;
    
    setIsThinking(true);
    setResponse(null);
    
    try {
      // Bridge: Send command to Rust backend
      const result = await invoke<string>("echo_compute", { input });
      setResponse(result);
    } catch (error) {
      console.error("ECHO Bridge Error:", error);
      setResponse("ECHO CORE ERROR: NEURAL LINK FAILED");
    } finally {
      setIsThinking(false);
      setInput("");
    }
  };

  return (
    <div className="flex-grow flex flex-col h-full bg-echo-surface pt-12 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-echo-cyan/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Dynamic Content Area */}
      <div className="flex-grow flex flex-col items-center justify-center p-8 overflow-y-auto">
        {/* Waveform Visualization */}
        <div className="flex items-center gap-1.5 h-32 mb-8">
          {[...Array(24)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ height: 4 }}
              animate={{ 
                height: isThinking ? [4, 48, 8, 64, 4] : [4, 8, 4],
                backgroundColor: isThinking ? "#00E5FF" : "#555570"
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.05,
                ease: "easeInOut"
              }}
              className="w-1.5 rounded-full"
            />
          ))}
        </div>

        {/* AI Response Display */}
        {response && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl text-center"
          >
            <p className="text-echo-primary text-lg font-body leading-relaxed border-l-2 border-echo-cyan pl-4 text-left">
              {response}
            </p>
          </motion.div>
        )}
      </div>

      {/* Command Input */}
      <div className="max-w-3xl w-full mx-auto p-8 mb-8 z-10">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-echo-cyan/20 to-blue-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
          <div className="relative flex items-center bg-echo-void border border-echo-muted/20 rounded-2xl p-2 shadow-2xl">
            <div className="p-3 text-echo-muted group-focus-within:text-echo-cyan transition-colors">
              <Terminal size={20} />
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Deploy a command or reflect a thought..."
              rows={1}
              className="flex-grow bg-transparent border-none focus:ring-0 text-echo-primary placeholder-echo-muted/50 py-3 text-sm resize-none font-body outline-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleCommand();
                }
              }}
            />
            <div className="flex items-center gap-2 pr-2">
              <button className="p-3 text-echo-muted hover:text-echo-cyan transition-all">
                <Mic size={20} />
              </button>
              <button 
                onClick={handleCommand}
                disabled={isThinking || !input.trim()}
                className={`p-3 rounded-xl border transition-all ${
                  isThinking || !input.trim() 
                    ? "bg-echo-surface text-echo-muted border-echo-muted/10 cursor-not-allowed" 
                    : "bg-echo-cyan/10 text-echo-cyan border-echo-cyan/20 hover:bg-echo-cyan/20"
                }`}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-center gap-6 text-[10px] font-display uppercase tracking-[0.2em] text-echo-muted/40">
          <span>⌘ Enter to submit</span>
          <span>Shift + Enter for new line</span>
          <span>ESC to clear</span>
        </div>
      </div>
    </div>
  );
};
