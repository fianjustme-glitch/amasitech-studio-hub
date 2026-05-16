import React, { useState } from 'react';
import { studioConfig } from '../config/studioConfig';
import { Send, FileText } from 'lucide-react';
import { motion } from 'motion/react';

export default function BriefForm() {
  const [formData, setFormData] = useState({
    name: '',
    landSize: '',
    floors: '1',
    budget: '',
    style: studioConfig.designStyles[0],
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateBriefText = () => {
    return `*HALO AMASITECH STUDIO HUB*%0A
*CLIENT BRIEF SUMMARY*%0A
----------------------------------%0A
*Nama:* ${formData.name}%0A
*Luas Tanah:* ${formData.landSize} m2%0A
*Jumlah Lantai:* ${formData.floors}%0A
*Estimasi Budget:* IDR ${formData.budget}%0A
*Gaya Desain:* ${formData.style}%0A
*Catatan:* ${formData.notes || '-'}%0A
----------------------------------%0A
_Dikirim via Studio Hub Dashboard_`;
  };

  const handleWhatsApp = () => {
    const text = generateBriefText();
    window.open(`https://wa.me/${studioConfig.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-xl mx-auto bg-studio-panel p-10 border border-white/10"
    >
      <div className="mb-10 text-xs font-bold uppercase tracking-[0.3em] flex items-center gap-3 text-white/30">
        <div className="w-2 h-2 bg-white"></div>
        01. Client Brief Collector
      </div>

      <form className="space-y-8">
        <div className="space-y-1">
          <label className="text-[10px] uppercase text-white/40 font-bold tracking-widest pl-1">Identitas Klien</label>
          <input 
            type="text" name="name" onChange={handleChange}
            className="w-full bg-studio-input border border-white/5 p-4 text-sm text-white focus:border-white outline-none transition-all placeholder:text-white/10"
            placeholder="NAMA LENGKAP"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] uppercase text-white/40 font-bold tracking-widest pl-1">Dimensi Lahan</label>
            <div className="relative">
              <input 
                type="number" name="landSize" onChange={handleChange}
                className="w-full bg-studio-input border border-white/5 p-4 text-sm text-white focus:border-white outline-none transition-all placeholder:text-white/10"
                placeholder="LUAS TANAH"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-white/20">M²</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase text-white/40 font-bold tracking-widest pl-1">Volume Ruang</label>
            <select 
              name="floors" onChange={handleChange}
              className="w-full bg-studio-input border border-white/5 p-4 text-sm text-white focus:border-white outline-none transition-all appearance-none"
            >
              <option value="1">1 LANTAI</option>
              <option value="2">2 LANTAI</option>
              <option value="3">3 LANTAI+</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] uppercase text-white/40 font-bold tracking-widest pl-1">Budget Est.</label>
            <input 
              type="text" name="budget" onChange={handleChange}
              className="w-full bg-studio-input border border-white/5 p-4 text-sm text-white focus:border-white outline-none transition-all placeholder:text-white/10"
              placeholder="MISAL: 500 JUTA"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase text-white/40 font-bold tracking-widest pl-1">Estetika</label>
            <select 
              name="style" onChange={handleChange}
              className="w-full bg-studio-input border border-white/5 p-4 text-sm text-white focus:border-white outline-none transition-all appearance-none"
            >
              {studioConfig.designStyles.map(s => <option key={s} value={s}>{s.toUpperCase()}</option>)}
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] uppercase text-white/40 font-bold tracking-widest pl-1">Catatan Moodboard</label>
          <textarea 
            name="notes" onChange={handleChange} rows={4}
            className="w-full bg-studio-input border border-white/5 p-4 text-sm text-white focus:border-white outline-none transition-all resize-none placeholder:text-white/10"
            placeholder="JELASKAN KEINGINAN KHUSUS ANDA..."
          ></textarea>
        </div>

        <button 
          type="button"
          onClick={handleWhatsApp}
          className="w-full bg-white text-black font-bold py-5 text-[10px] uppercase tracking-[0.3em] hover:bg-neutral-200 transition-colors flex items-center justify-center gap-3"
        >
          <Send size={14} />
          Kirim via WhatsApp
        </button>
      </form>
    </motion.div>
  );
}
