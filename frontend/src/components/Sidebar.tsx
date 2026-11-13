import React from 'react';
import { 
  LayoutDashboard, 
  Mail, 
  CheckSquare, 
  ShieldCheck, 
  FileText, 
  HelpCircle,
  AlertTriangle,
  Layers,
  ExternalLink
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    {
      id: 'overview',
      label: 'Dashboard Overview',
      icon: LayoutDashboard,
      badge: 'Metrics'
    },
    {
      id: 'analysis',
      label: 'Email Forensics (5)',
      icon: Mail,
      badge: '5 Samples'
    },
    {
      id: 'evidence',
      label: 'Annotated Evidence',
      icon: Layers,
      badge: 'Callouts'
    },
    {
      id: 'checklist',
      label: 'Warning Checklist',
      icon: CheckSquare,
      badge: 'Audit'
    },
    {
      id: 'reporting',
      label: 'Safe Reporting SOP',
      icon: ShieldCheck,
      badge: '5-Step'
    },
    {
      id: 'awareness',
      label: 'Awareness Guide',
      icon: FileText,
      badge: 'Print'
    },
    {
      id: 'quiz',
      label: 'Knowledge Quiz',
      icon: HelpCircle,
      badge: 'Interactive'
    }
  ];

  return (
    <aside className="w-64 bg-[#0c1322] border-r border-[#1e2e4f] flex flex-col shrink-0 min-h-[calc(100vh-4rem)]">
      {/* Navigation Label */}
      <div className="px-5 pt-6 pb-2">
        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
          ANALYST WORKSPACE
        </span>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 space-y-1 py-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-950/80 to-blue-950/40 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                  : 'text-slate-300 hover:bg-[#111c33] hover:text-white border border-transparent'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                  isActive 
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30' 
                    : 'bg-[#16233f] text-slate-400 border border-[#1e2e4f]'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* SOC Status Box */}
      <div className="p-4 m-3 rounded-xl bg-[#080d1a] border border-[#1e2e4f]/80">
        <div className="flex items-center space-x-2 mb-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-semibold text-slate-200">Simulated Environment</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
          All specimens are safely contained educational mockups. No live C2 links are active.
        </p>
        <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 bg-[#0e1628] px-2.5 py-1.5 rounded border border-[#1c2a47]">
          <span>TLP:CLEAR</span>
          <span>MITRE T1566</span>
        </div>
      </div>

      {/* User / Intern Tag */}
      <div className="p-4 border-t border-[#1e2e4f] flex items-center space-x-3">
        <div className="w-8 h-8 rounded-full bg-cyan-900/60 border border-cyan-400/40 flex items-center justify-center text-cyan-300 text-xs font-mono font-bold">
          INT
        </div>
        <div className="overflow-hidden">
          <div className="text-xs font-semibold text-slate-200 truncate">Cybersecurity Intern</div>
          <div className="text-[10px] text-slate-400 font-mono truncate">SOC Tier-1 Analyst Track</div>
        </div>
      </div>
    </aside>
  );
};
