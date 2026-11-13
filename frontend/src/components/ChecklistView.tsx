import React, { useState } from 'react';
import { 
  CheckSquare, 
  Square, 
  AlertTriangle, 
  ShieldAlert, 
  ShieldCheck, 
  RotateCcw, 
  Info,
  Filter,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { phishingChecklist } from '../data/checklistData';

export const ChecklistView: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const categories = ['All', 'Senders & Domains', 'Emotional Triggers', 'Requests & Actions', 'Links & Payloads', 'Grammar & Formatting'];

  const toggleItem = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const resetAudit = () => {
    setSelectedIds([]);
  };

  const filteredItems = phishingChecklist.filter(item => {
    if (categoryFilter === 'All') return true;
    return item.category === categoryFilter;
  });

  // Calculate Phishing Threat Score (PTS)
  const currentScore = selectedIds.reduce((sum, id) => {
    const found = phishingChecklist.find(i => i.id === id);
    return sum + (found ? found.points : 0);
  }, 0);

  // Verdict calculation
  let verdict = 'LOW RISK / LIKELY SAFE';
  let verdictColor = 'text-emerald-400 bg-emerald-950/80 border-emerald-500/40';
  let verdictDesc = 'No critical threat indicators detected. Normal business caution applies.';
  
  if (currentScore >= 40) {
    verdict = 'CRITICAL / CONFIRMED PHISHING';
    verdictColor = 'text-red-400 bg-red-950/80 border-red-500/40';
    verdictDesc = 'Multiple high-severity red flags detected. Do NOT click links or reply. Escalate immediately to SOC!';
  } else if (currentScore >= 15) {
    verdict = 'SUSPICIOUS / ELEVATED RISK';
    verdictColor = 'text-amber-400 bg-amber-950/80 border-amber-500/40';
    verdictDesc = 'Moderate risk indicators present. Conduct out-of-band verification before taking any action.';
  }

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#0c1322] border border-[#1e2e4f] rounded-xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              <CheckSquare className="w-3.5 h-3.5 text-cyan-400" />
              <span>INTERACTIVE EMAIL THREAT AUDIT TOOL</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Phishing Warning Sign Checklist
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl">
              Inspect any suspicious email against our 15 forensic criteria. Check the matching indicators to dynamically calculate the Phishing Threat Score (PTS) and generate an instant triage verdict.
            </p>
          </div>

          {/* Quick Score Meter */}
          <div className="bg-[#070b14] border border-[#1e2e4f] rounded-xl p-4 shrink-0 flex items-center space-x-5">
            <div>
              <div className="text-[11px] font-mono text-slate-400 uppercase">Audit Score</div>
              <div className="text-2xl font-mono font-extrabold text-cyan-400">{currentScore} <span className="text-xs text-slate-500">PTS</span></div>
            </div>
            <div className="border-l border-[#1e2e4f] pl-4">
              <div className="text-[11px] font-mono text-slate-400 uppercase">Calculated Verdict</div>
              <div className={`text-xs font-mono font-bold px-2.5 py-1 rounded border mt-0.5 ${verdictColor}`}>
                {verdict.split(' / ')[0]}
              </div>
            </div>
            <button
              onClick={resetAudit}
              title="Reset Audit Checklist"
              className="p-2 rounded-lg bg-[#111c33] hover:bg-[#162544] text-slate-400 hover:text-white border border-[#1e2e4f] transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Threat Meter Banner */}
      <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
        currentScore >= 40 
          ? 'bg-red-950/40 border-red-500/40 text-red-200' 
          : currentScore >= 15 
            ? 'bg-amber-950/40 border-amber-500/40 text-amber-200' 
            : 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
      }`}>
        <div className="flex items-center space-x-3">
          {currentScore >= 40 ? (
            <ShieldAlert className="w-6 h-6 text-red-400 shrink-0 animate-bounce" />
          ) : currentScore >= 15 ? (
            <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0" />
          ) : (
            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
          )}
          <div>
            <div className="text-sm font-bold tracking-wide">{verdict}</div>
            <div className="text-xs opacity-90">{verdictDesc}</div>
          </div>
        </div>

        <div className="text-xs font-mono shrink-0 sm:text-right">
          <span>{selectedIds.length} of {phishingChecklist.length} indicators flagged</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#1e2e4f] pb-3 text-xs font-mono">
        <span className="text-slate-400 flex items-center space-x-1 mr-2">
          <Filter className="w-3.5 h-3.5" />
          <span>FILTER:</span>
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              categoryFilter === cat
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'bg-[#0c1322] text-slate-400 hover:text-white border border-[#1e2e4f]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Checklist Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => {
          const isChecked = selectedIds.includes(item.id);
          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start space-x-3.5 ${
                isChecked
                  ? 'bg-red-950/40 border-red-500/60 shadow-lg shadow-red-950/30'
                  : 'bg-[#0c1322] border-[#1e2e4f] hover:border-slate-500 hover:bg-[#111c33]'
              }`}
            >
              <div className="mt-0.5 shrink-0 text-cyan-400">
                {isChecked ? (
                  <CheckSquare className="w-5 h-5 text-red-400 fill-red-950" />
                ) : (
                  <Square className="w-5 h-5 text-slate-500 hover:text-slate-300" />
                )}
              </div>

              <div className="space-y-1.5 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-sm font-semibold ${isChecked ? 'text-white' : 'text-slate-200'}`}>
                    {item.title}
                  </span>
                  <div className="flex items-center space-x-1.5 shrink-0">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      item.severity === 'CRITICAL' ? 'bg-red-950 text-red-400 border border-red-500/30' :
                      item.severity === 'HIGH' ? 'bg-amber-950 text-amber-400 border border-amber-500/30' :
                      item.severity === 'MEDIUM' ? 'bg-purple-950 text-purple-400 border border-purple-500/30' :
                      'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}>
                      {item.severity}
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400 bg-[#070b14] px-1.5 py-0.5 rounded border border-[#1e2e4f]">
                      +{item.points}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-2 text-[11px] text-cyan-300 font-mono flex items-start space-x-1.5 border-t border-[#1e2e4f]/80">
                  <span className="text-cyan-400 font-bold">Detection Tip:</span>
                  <span className="text-slate-400">{item.detectionTip}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
