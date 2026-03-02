import React from "react";
import { Search, History, Settings, Brain, MessageSquare } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Sidebar: React.FC = () => {
  const [active, setActive] = React.useState("chat");

  const navItems = [
    { id: "chat", icon: MessageSquare, label: "Active Echo" },
    { id: "memory", icon: Brain, label: "Neural Memory" },
    { id: "history", icon: History, label: "Session History" },
  ];

  return (
    <div className="w-[220px] h-full bg-echo-void flex flex-col pt-12 border-r border-echo-surface/50">
      <div className="px-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-echo-muted" size={14} />
          <input 
            placeholder="Search Memory (⌘K)" 
            className="w-full bg-echo-surface border border-echo-muted/10 rounded-md py-1.5 pl-9 pr-3 text-[11px] font-body focus:outline-none focus:border-echo-cyan/30 transition-all"
          />
        </div>
      </div>

      <nav className="flex-grow space-y-1">
        {navItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActive(item.id)}
            className={cn("sidebar-item", active === item.id && "active")}
          >
            <item.icon size={16} />
            <span className="font-body font-medium tracking-tight">{item.label}</span>
          </div>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-echo-surface/50">
        <div className="sidebar-item">
          <Settings size={16} />
          <span className="font-body font-medium tracking-tight">Preferences</span>
        </div>
      </div>
    </div>
  );
};
