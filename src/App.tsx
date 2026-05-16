import React, { useState } from 'react';
import { studioConfig } from './config/studioConfig';
import BriefForm from './components/BriefForm';
import Calculator from './components/Calculator';
import Tracker from './components/Tracker';
import ThemeToggle from './components/ThemeToggle';
import { LayoutGrid, ClipboardEdit, Calculator as CalcIcon, FolderClock, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('brief');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'brief', label: '01. Brief & Briefing', icon: <ClipboardEdit size={14} />, component: <BriefForm /> },
    { id: 'calc', label: '02. Budget Kalkulator', icon: <CalcIcon size={14} />, component: <Calculator /> },
    { id: 'tracker', label: '03. Progress Portal', icon: <FolderClock size={14} />, component: <Tracker /> },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-studio-black text-studio-text selection:bg-white selection:text-black">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 border border-white/20 flex items-center justify-center">
                <span className="text-white font-bold text-xs uppercase tracking-tighter">A</span>
              </div>
              <div className="flex items-baseline gap-2">
                <h1 className="font-bold text-lg leading-none uppercase tracking-tighter">AMASITECH</h1>
                <span className="text-[10px] text-white/40 italic font-light lowercase">Studio Hub</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative py-2 ${
                    activeTab === tab.id 
                    ? 'text-white' 
                    : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-px bg-white" 
                    />
                  )}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-6">
              <div className="hidden lg:block px-3 py-1 border border-white/10 text-[9px] uppercase font-bold text-white/30 tracking-widest">
                AFIQ-TECH COLLAB
              </div>
              <button 
                className="md:hidden p-2 text-white/60 hover:text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden bg-studio-panel border-t border-white/10 overflow-hidden"
            >
              <div className="px-6 py-6 space-y-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-4 w-full text-left py-3 px-4 text-[10px] font-bold uppercase tracking-widest border border-white/5 ${
                      activeTab === tab.id ? 'bg-white text-black' : 'text-white/40'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-12 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              {tabs.find(t => t.id === activeTab)?.component}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-8 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[9px] tracking-[0.3em] uppercase text-white/20 text-center md:text-left leading-relaxed">
            Powered by AFIQ-TECH × Masita Architecture © 2026<br/>
            All Rights Reserved.
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
              <span className="text-[9px] uppercase tracking-widest text-white/40">Hand-over Ready</span>
            </div>
            <div className="h-4 w-px bg-white/10 hidden md:block"></div>
            <div className="text-[9px] text-white/30 uppercase tracking-widest font-mono">
              V2.0.126
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

