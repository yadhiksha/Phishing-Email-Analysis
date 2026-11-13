import React, { useState } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';
import { quizQuestions } from '../data/quizData';

export const InteractiveQuizView: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<Record<number, boolean>>({});
  const [quizComplete, setQuizComplete] = useState(false);

  const currentQ = quizQuestions[currentQuestionIndex];

  const handleSelectOption = (optionId: string) => {
    if (isSubmitted[currentQ.id]) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionId
    }));
  };

  const handleConfirmAnswer = () => {
    if (!selectedAnswers[currentQ.id]) return;
    setIsSubmitted(prev => ({
      ...prev,
      [currentQ.id]: true
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizComplete(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setIsSubmitted({});
    setQuizComplete(false);
  };

  // Calculate score
  const correctCount = Object.keys(selectedAnswers).reduce((count, qIdStr) => {
    const qId = parseInt(qIdStr);
    const q = quizQuestions.find(item => item.id === qId);
    const selected = selectedAnswers[qId];
    const correctOpt = q?.options.find(opt => opt.isCorrect);
    return correctOpt?.id === selected ? count + 1 : count;
  }, 0);

  const scorePercentage = Math.round((correctCount / quizQuestions.length) * 100);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#0c1322] border border-[#1e2e4f] rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>EMPLOYEE READINESS ASSESSMENT</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">Interactive Phishing Knowledge Check</h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl">
              Test your technical intuition on real-world phishing scenarios: domain obfuscation, psychological urgency, reporting headers, and scam patterns.
            </p>
          </div>

          <div className="bg-[#070b14] border border-[#1e2e4f] rounded-xl px-4 py-2.5 shrink-0 flex items-center space-x-3 text-xs font-mono">
            <Award className="w-4 h-4 text-cyan-400" />
            <span>Progress: Question {currentQuestionIndex + 1} of {quizQuestions.length}</span>
          </div>
        </div>
      </div>

      {!quizComplete ? (
        /* Question Card */
        <div className="bg-[#0c1322] border border-[#1e2e4f] rounded-2xl p-6 space-y-6 max-w-4xl mx-auto shadow-xl">
          {/* Progress Bar */}
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-cyan-500 h-full transition-all duration-300" 
              style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
            ></div>
          </div>

          {/* Question Header */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
              <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30 font-bold">
                SCENARIO {currentQ.id}
              </span>
              <span>Category: {currentQ.category}</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white leading-relaxed">
              {currentQ.question}
            </h2>
            <div className="text-xs text-slate-400 italic flex items-center space-x-1.5 pt-1">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Analyst Hint: {currentQ.context}</span>
            </div>
          </div>

          {/* Options Grid */}
          <div className="space-y-3">
            {currentQ.options.map((option) => {
              const isSelected = selectedAnswers[currentQ.id] === option.id;
              const hasSubmitted = isSubmitted[currentQ.id];
              let optionStyle = 'bg-[#070b14] border-[#1e2e4f] hover:border-slate-500 hover:bg-[#111c33] text-slate-200';

              if (hasSubmitted) {
                if (option.isCorrect) {
                  optionStyle = 'bg-emerald-950/80 border-emerald-400 text-emerald-200';
                } else if (isSelected && !option.isCorrect) {
                  optionStyle = 'bg-red-950/80 border-red-400 text-red-200';
                }
              } else if (isSelected) {
                optionStyle = 'bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-950/40';
              }

              return (
                <div
                  key={option.id}
                  onClick={() => handleSelectOption(option.id)}
                  className={`p-4 rounded-xl border text-xs sm:text-sm font-sans transition-all cursor-pointer ${optionStyle}`}
                >
                  <div className="flex items-start space-x-3">
                    <span className="w-6 h-6 rounded-md bg-[#16233f] text-cyan-300 font-mono font-bold flex items-center justify-center shrink-0 text-xs">
                      {option.id}
                    </span>
                    <div className="space-y-1 flex-1">
                      <div className="font-medium">{option.text}</div>
                      {hasSubmitted && (
                        <p className={`text-xs mt-2 pt-2 border-t ${
                          option.isCorrect ? 'border-emerald-500/30 text-emerald-300' : 'border-red-500/30 text-red-300'
                        }`}>
                          {option.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Button Row */}
          <div className="flex items-center justify-between pt-4 border-t border-[#1e2e4f]">
            <span className="text-xs font-mono text-slate-400">
              {isSubmitted[currentQ.id] ? 'Review explanation above' : 'Select an answer to continue'}
            </span>

            {!isSubmitted[currentQ.id] ? (
              <button
                onClick={handleConfirmAnswer}
                disabled={!selectedAnswers[currentQ.id]}
                className="px-5 py-2 rounded-lg bg-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-all"
              >
                Confirm Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs font-mono flex items-center space-x-2 transition-all shadow-lg shadow-cyan-500/20"
              >
                <span>{currentQuestionIndex < quizQuestions.length - 1 ? 'Next Scenario' : 'View Results'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Complete Card */
        <div className="bg-[#0c1322] border border-[#1e2e4f] rounded-2xl p-8 max-w-2xl mx-auto text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-500/40 mx-auto flex items-center justify-center text-cyan-400">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Assessment Complete!</h2>
            <p className="text-sm text-slate-300">
              You scored <strong className="text-cyan-400 font-mono text-lg">{correctCount} of {quizQuestions.length} ({scorePercentage}%)</strong>
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#070b14] border border-[#1e2e4f] text-xs font-mono text-slate-300">
            {scorePercentage >= 80 ? (
              <div className="text-emerald-400 font-bold">
                🌟 Outstanding Defense Readiness! You demonstrate advanced proficiency in detecting deceptive sender domains, psychological urgency, and email header anomalies.
              </div>
            ) : scorePercentage >= 60 ? (
              <div className="text-amber-400 font-bold">
                ⚠️ Competent Baseline Defense. Review the Phishing Checklist and Awareness Guide to sharpen your analysis of subdomains and header forwarding.
              </div>
            ) : (
              <div className="text-red-400 font-bold">
                🛑 High Phishing Vulnerability. Review the 5-step STOP → VERIFY → REPORT procedure and re-read the specimen evidence cards.
              </div>
            )}
          </div>

          <button
            onClick={handleResetQuiz}
            className="px-6 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono inline-flex items-center space-x-2 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Assessment</span>
          </button>
        </div>
      )}
    </div>
  );
};
