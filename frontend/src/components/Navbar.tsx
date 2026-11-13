import React, { useState, useEffect } from 'react';
import { Shield, ShieldAlert, Bell, Clock, Terminal, Activity } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab }) => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toUTCString().replace('GMT', 'UTC'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-16 border-b border-[#1e2e4f] bg-[#0c1322]/90 backdrop-blur-md sticky top-0 z-40 px-6 flex items-center justify-between">
      {/* Brand / Logo */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 border border-cyan-400/40">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-lg tracking-wider text-white">PHISH<span className="text-cyan-400">SHIELD</span></span>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-semibold tracking-wide">
              v1.0 • SOC TIER-1
            </span>
          </div>
          <p className="text-xs text-slate-400 hidden sm:block">Phishing Email Forensics & Employee Awareness Platform</p>
        </div>
      </div>

      {/* Center status pill */}
      <div className="hidden lg:flex items-center space-x-4 bg-[#070b14] px-4 py-1.5 rounded-full border border-[#1e2e4f]">
        <div className="flex items-center space-x-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-mono text-slate-300">SYSTEM: ACTIVE DEFENSE</span>
        </div>
        <span className="text-slate-600">|</span>
        <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span>{time || 'SYNCHRONIZING...'}</span>
        </div>
      </div>

      {/* Right side controls */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 text-xs font-mono">
          <ShieldAlert className="w-4 h-4 text-red-400 animate-pulse" />
          <span className="hidden sm:inline">CAMPAIGN RISK:</span>
          <span className="font-bold text-red-400">ELEVATED</span>
        </div>

        <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#111c33] border border-[#1e2e4f] text-slate-300 text-xs font-mono">
          <Activity className="w-3.5 h-3.5 text-cyan-400" />
          <span>5 SPECIMENS LOADED</span>
        </div>
      </div>
    </header>
  );
};
