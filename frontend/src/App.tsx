import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DashboardOverview } from './components/DashboardOverview';
import { EmailAnalysisView } from './components/EmailAnalysisView';
import { AnnotatedEvidenceGallery } from './components/AnnotatedEvidenceGallery';
import { ChecklistView } from './components/ChecklistView';
import { ReportingProcessView } from './components/ReportingProcessView';
import { AwarenessGuideView } from './components/AwarenessGuideView';
import { InteractiveQuizView } from './components/InteractiveQuizView';
import { Footer } from './components/Footer';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedEmailId, setSelectedEmailId] = useState<string>('email-1');

  return (
    <div className="min-h-screen flex flex-col bg-[#070b14] text-slate-100">
      {/* Top Navbar */}
      <Navbar activeTab={activeTab} />

      {/* Main Layout Container */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Navigation */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-x-hidden">
          {activeTab === 'overview' && (
            <DashboardOverview 
              onSelectEmail={(id) => setSelectedEmailId(id)}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'analysis' && (
            <EmailAnalysisView 
              selectedEmailId={selectedEmailId}
              setSelectedEmailId={setSelectedEmailId}
            />
          )}

          {activeTab === 'evidence' && (
            <AnnotatedEvidenceGallery />
          )}

          {activeTab === 'checklist' && (
            <ChecklistView />
          )}

          {activeTab === 'reporting' && (
            <ReportingProcessView />
          )}

          {activeTab === 'awareness' && (
            <AwarenessGuideView />
          )}

          {activeTab === 'quiz' && (
            <InteractiveQuizView />
          )}
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
