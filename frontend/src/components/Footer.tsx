import React from 'react';
import { Shield, Lock, FileCode, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="no-print mt-12 border-t border-[#1e2e4f] bg-[#070b14] py-8 px-6 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-7 h-7 rounded bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-200">Cybersecurity Internship Project 03</div>
            <div className="text-[11px] text-slate-500 font-mono">Phishing Email Analysis, Detection & Awareness Defense</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-slate-400">
          <span>TLP:CLEAR</span>
          <span>•</span>
          <span>MITRE ATT&CK T1566</span>
          <span>•</span>
          <span>RFC 7208 / 6376 / 7489 Compliant</span>
          <span>•</span>
          <span>Educational Simulation</span>
        </div>

        <div className="text-[11px] text-slate-500 text-center md:text-right">
          Built with React 19, TypeScript & Tailwind CSS • SOC Tier-1 Portfolio
        </div>
      </div>
    </footer>
  );
};
