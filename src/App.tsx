import React from "react";
import { TitleBar } from "./components/TitleBar";
import { Sidebar } from "./components/Sidebar";
import { MainCanvas } from "./components/MainCanvas";
import { StatusBar } from "./components/StatusBar";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  return (
    <div className="h-screen w-full flex flex-col bg-echo-void text-echo-primary relative overflow-hidden">
      <TitleBar />
      
      <div className="flex-grow flex min-h-0 pt-8 pb-[28px]">
        <Sidebar />
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex-grow flex flex-col min-w-0"
        >
          <MainCanvas />
        </motion.div>

        {/* Right Panel - Metadata / Tool Logs (Collapsible Placeholder) */}
        <div className="w-[280px] h-full bg-echo-void border-l border-echo-surface/50 hidden xl:flex flex-col p-6">
          <h3 className="text-[10px] font-display uppercase tracking-[0.2em] text-echo-muted mb-6">Neural Context</h3>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-[9px] font-display text-echo-cyan/60 uppercase">Last Tool Execution</span>
              <div className="bg-echo-surface/50 border border-echo-muted/10 rounded-lg p-3 font-display text-[10px] text-echo-muted leading-relaxed">
                <span className="text-echo-cyan">execute_shell</span> --dir="/home/soweto"
                <br/>
                <span className="text-green-500/80">SUCCESS (24ms)</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[9px] font-display text-echo-cyan/60 uppercase">Memory Index</span>
              <div className="space-y-1">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center justify-between text-[10px] font-body text-echo-muted/80 py-1 border-b border-echo-surface/30">
                    <span>artifact_v1_{i}.md</span>
                    <span className="text-[8px] font-display opacity-40">2m ago</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <StatusBar />
    </div>
  );
}

export default App;
