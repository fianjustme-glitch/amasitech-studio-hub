import React, { useState, useEffect } from 'react';
import { studioConfig } from '../config/studioConfig';
import { ExternalLink, CheckCircle2, ArrowRight, FolderClock, Settings, Save, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Tracker() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // State for project data that can be edited
  const [projectData, setProjectData] = useState(() => {
    const saved = localStorage.getItem('studio_project_data');
    return saved ? JSON.parse(saved) : {
      clientId: "AST-2026-042",
      currentStageIndex: 2,
      driveLink: studioConfig.portalLinks.googleDrive,
      dropboxLink: studioConfig.portalLinks.dropbox,
      pdfName: "amasitech-masita-ded.pdf"
    };
  });

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('studio_project_data', JSON.stringify(projectData));
  }, [projectData]);

  const handleReset = () => {
    if (confirm('Reset tracker ke data demo standar?')) {
      setProjectData({
        clientId: "AST-2026-042",
        currentStageIndex: 2,
        driveLink: studioConfig.portalLinks.googleDrive,
        dropboxLink: studioConfig.portalLinks.dropbox,
        pdfName: "amasitech-masita-ded.pdf"
      });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto space-y-12"
    >
      {/* Admin Toggle */}
      <div className="flex justify-end">
        <button 
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className={`flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest border transition-all ${
            isSettingsOpen 
            ? 'bg-white text-black border-white' 
            : 'border-white/10 text-white/40 hover:text-white hover:border-white/20'
          }`}
        >
          <Settings size={14} className={isSettingsOpen ? 'animate-spin' : ''} />
          {isSettingsOpen ? 'Tutup Panel Kontrol' : 'Update Progress Project'}
        </button>
      </div>

      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border border-white/10 bg-white/5 p-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em]">Project Management Control</h3>
              <button 
                onClick={handleReset}
                className="text-[9px] uppercase font-bold text-white/20 hover:text-red-400 flex items-center gap-2 transition-colors"
              >
                <RotateCcw size={12} /> Reset Demo
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-bold text-white/30 tracking-widest pl-1">Client Project ID</label>
                  <input 
                    type="text" 
                    value={projectData.clientId}
                    onChange={(e) => setProjectData({...projectData, clientId: e.target.value})}
                    className="w-full bg-studio-input border border-white/5 p-3 text-xs text-white focus:border-white outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-bold text-white/30 tracking-widest pl-1">Current Stage (0-5)</label>
                  <select 
                    value={projectData.currentStageIndex}
                    onChange={(e) => setProjectData({...projectData, currentStageIndex: parseInt(e.target.value)})}
                    className="w-full bg-studio-input border border-white/5 p-3 text-xs text-white focus:border-white outline-none appearance-none"
                  >
                    {studioConfig.projectStages.map((s, i) => (
                      <option key={i} value={i}>{i+1}. {s.title.toUpperCase()}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-bold text-white/30 tracking-widest pl-1">Google Drive Link (PDF)</label>
                  <input 
                    type="text" 
                    value={projectData.driveLink}
                    onChange={(e) => setProjectData({...projectData, driveLink: e.target.value})}
                    className="w-full bg-studio-input border border-white/5 p-3 text-xs text-white focus:border-white outline-none"
                    placeholder="https://drive.google.com/..."
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-bold text-white/30 tracking-widest pl-1">Dropbox Link (Assets)</label>
                  <input 
                    type="text" 
                    value={projectData.dropboxLink}
                    onChange={(e) => setProjectData({...projectData, dropboxLink: e.target.value})}
                    className="w-full bg-studio-input border border-white/5 p-3 text-xs text-white focus:border-white outline-none"
                    placeholder="https://dropbox.com/..."
                  />
                </div>
              </div>
            </div>
            <p className="mt-6 text-[9px] text-white/20 italic">
              *Masita dapat mengupdate link project klien secara real-time di sini. Data tersimpan di local storage browser ini.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
        <div className="space-y-4">
          <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-white/20"></div>
            03. Project Progress Tracker
          </div>
          <h2 className="text-3xl font-bold uppercase tracking-widest text-white">Client Portal</h2>
        </div>
        <div className="bg-white/5 px-4 py-2 text-[10px] font-mono text-white/50 border border-white/10 uppercase tracking-tighter self-start md:self-auto">
          ID: {projectData.clientId}
        </div>
      </div>

      {/* Progress Timeline */}
      <div className="relative space-y-10 ml-4 border-l border-white/5 pl-8 py-2">
        {studioConfig.projectStages.map((stage, idx) => (
          <div key={idx} className="relative group">
            <div className={`absolute -left-[41px] top-1 w-4 h-4 rounded-full border-2 transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)] ${
              idx < projectData.currentStageIndex 
              ? 'bg-green-500 border-green-500' 
              : idx === projectData.currentStageIndex
              ? 'bg-white border-white scale-110 shadow-[0_0_20px_rgba(255,255,255,0.2)]'
              : 'bg-studio-black border-white/20'
            }`}>
              {idx < projectData.currentStageIndex && <CheckCircle2 size={10} className="text-black m-auto mt-[1px]" />}
            </div>
            
            <div className={`transition-opacity duration-500 ${idx > projectData.currentStageIndex ? 'opacity-20' : 'opacity-100'}`}>
              <div className="flex items-center gap-3 mb-2">
                <h4 className="text-[11px] font-bold uppercase tracking-widest text-white">
                  {stage.title}
                </h4>
                {idx === projectData.currentStageIndex && (
                  <span className="text-[8px] bg-white text-black px-2 py-0.5 font-bold uppercase tracking-tighter">Current Phase</span>
                )}
              </div>
              <p className="text-[11px] text-white/40 leading-relaxed font-light">{stage.desc}</p>
              {idx < projectData.currentStageIndex && (
                <p className="text-[9px] text-green-500/50 mt-2 font-mono uppercase tracking-tighter">Completed Phase</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Cloud Storage Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10 border border-white/10 overflow-hidden">
        <a 
          href={projectData.driveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col justify-between p-8 bg-studio-panel hover:bg-studio-input transition-all group"
        >
          <div className="space-y-4">
            <div className="w-8 h-8 flex items-center justify-center border border-white/10 group-hover:border-white transition-colors">
              <ExternalLink size={12} className="text-white/40 group-hover:text-white" />
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase text-white/20 mb-1 tracking-widest">Blueprint DED</p>
              <p className="text-xs font-semibold text-white/80">{projectData.pdfName}</p>
            </div>
          </div>
          <div className="mt-8 flex items-center gap-2 text-[9px] uppercase font-bold tracking-widest text-white/40 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
            Download File <ArrowRight size={10} />
          </div>
        </a>
        
        <a 
          href={projectData.dropboxLink}
          target="_blank"
          rel="noopener noreferrer"
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
