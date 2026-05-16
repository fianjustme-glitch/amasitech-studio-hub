import React from 'react';
import { studioConfig } from '../config/studioConfig';
import { ExternalLink, CheckCircle2, ArrowRight, FolderClock } from 'lucide-react';
import { motion } from 'motion/react';

export default function Tracker() {
  // In a real app, currentStage would come from a database associated with a Client ID
  const currentStageIndex = 2; // Simulating project at "Concept Design"

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto space-y-16"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
        <div className="space-y-4">
          <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-white/20"></div>
            03. Project Progress Tracker
          </div>
          <h2 className="text-3xl font-bold uppercase tracking-widest text-white">Client Portal</h2>
        </div>
        <div className="bg-white/5 px-4 py-2 text-[10px] font-mono text-white/50 border border-white/10 uppercase tracking-tighter self-start md:self-auto">
          ID: AST-2026-042
        </div>
      </div>

      {/* Progress Timeline */}
      <div className="relative space-y-10 ml-4 border-l border-white/5 pl-8 py-2">
        {studioConfig.projectStages.map((stage, idx) => (
          <div key={idx} className="relative group">
            <div className={`absolute -left-[41px] top-1 w-4 h-4 rounded-full border-2 transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)] ${
              idx < currentStageIndex 
              ? 'bg-green-500 border-green-500' 
              : idx === currentStageIndex
              ? 'bg-white border-white scale-110 shadow-[0_0_20px_rgba(255,255,255,0.2)]'
              : 'bg-studio-black border-white/20'
            }`}>
              {idx < currentStageIndex && <CheckCircle2 size={10} className="text-black m-auto mt-[1px]" />}
            </div>
            
            <div className={`transition-opacity duration-500 ${idx > currentStageIndex ? 'opacity-20' : 'opacity-100'}`}>
              <div className="flex items-center gap-3 mb-2">
                <h4 className="text-[11px] font-bold uppercase tracking-widest text-white">
                  {stage.title}
                </h4>
                {idx === currentStageIndex && (
                  <span className="text-[8px] bg-white text-black px-2 py-0.5 font-bold uppercase tracking-tighter">Current Phase</span>
                )}
              </div>
              <p className="text-[11px] text-white/40 leading-relaxed font-light">{stage.desc}</p>
              {idx < currentStageIndex && (
                <p className="text-[9px] text-green-500/50 mt-2 font-mono uppercase tracking-tighter">Completed Phase</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Cloud Storage Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10 border border-white/10 overflow-hidden">
        <a 
          href="#" 
          className="flex flex-col justify-between p-8 bg-studio-panel hover:bg-studio-input transition-all group"
        >
          <div className="space-y-4">
            <div className="w-8 h-8 flex items-center justify-center border border-white/10 group-hover:border-white transition-colors">
              <ExternalLink size={12} className="text-white/40 group-hover:text-white" />
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase text-white/20 mb-1 tracking-widest">Blueprint DED</p>
              <p className="text-xs font-semibold text-white/80">amasitech-masita-ded.pdf</p>
            </div>
          </div>
          <div className="mt-8 flex items-center gap-2 text-[9px] uppercase font-bold tracking-widest text-white/40 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
            Download File <ArrowRight size={10} />
          </div>
        </a>
        
        <a 
          href="#" 
          className="flex flex-col justify-between p-8 bg-studio-panel hover:bg-studio-input transition-all group"
        >
           <div className="space-y-4">
            <div className="w-8 h-8 flex items-center justify-center border border-white/10 group-hover:border-white transition-colors">
              <FolderClock size={12} className="text-white/40 group-hover:text-white" />
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase text-white/20 mb-1 tracking-widest">3D Renders / Assets</p>
              <p className="text-xs font-semibold text-white/80">DROPBOX SHARED FOLDER</p>
            </div>
          </div>
          <div className="mt-8 flex items-center gap-2 text-[9px] uppercase font-bold tracking-widest text-white/40 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
            Open Folder <ArrowRight size={10} />
          </div>
        </a>
      </div>
    </motion.div>
  );
}
