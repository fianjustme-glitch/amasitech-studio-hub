import React, { useState, useMemo } from 'react';
import { studioConfig } from '../config/studioConfig';
import { Calculator as CalcIcon, Printer, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function Calculator() {
  const [area, setArea] = useState<number>(0);
  const [selectedPackageId, setSelectedPackageId] = useState(studioConfig.packages[1].id);

  const selectedPackage = studioConfig.packages.find(p => p.id === selectedPackageId)!;
  const rate = (studioConfig.rates as any)[selectedPackage.rateKey];
  
  const totalFee = useMemo(() => {
    return area * rate;
  }, [area, rate]);

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-px bg-white/10 border border-white/10"
    >
      {/* Left: Input Dashboard */}
      <div className="md:col-span-5 space-y-8 bg-studio-panel p-10">
        <div className="flex items-center gap-3 mb-6 text-white/30">
          <CalcIcon size={14} />
          <h3 className="font-bold text-[10px] uppercase tracking-[0.3em]">02. Archi-Budget Dashboard</h3>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-white/40 tracking-widest pl-1">Input Luas Bangunan</label>
            <div className="flex items-end gap-3 border-b border-white/10 pb-2 group focus-within:border-white transition-colors">
              <input 
                type="number" 
                value={area || ''} 
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full bg-transparent p-0 text-6xl font-light outline-none text-white font-mono"
                placeholder="0"
              />
              <span className="text-sm text-white/20 mb-3 font-bold">M²</span>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <label className="text-[10px] font-bold uppercase text-white/40 tracking-widest pl-1">Pilihan Paket Layanan</label>
            <div className="space-y-2">
              {studioConfig.packages.map(pkg => (
                <button
                  key={pkg.id}
                  onClick={() => setSelectedPackageId(pkg.id)}
                  className={`w-full text-left p-5 transition-all border ${
                    selectedPackageId === pkg.id 
                    ? 'bg-white/5 border-white text-white' 
                    : 'bg-studio-input border-white/5 text-white/30 hover:border-white/20'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest">{pkg.name}</p>
                    <p className="text-[9px] font-mono">Rp {(studioConfig.rates as any)[pkg.rateKey].toLocaleString()}/m²</p>
                  </div>
                  <p className="text-[9px] opacity-60 leading-relaxed max-w-[80%]">{pkg.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right: Results Display */}
      <div className="md:col-span-7 bg-studio-card p-12 relative flex flex-col justify-center">
        <div className="relative z-10 space-y-10">
          <div className="space-y-1">
            <p className="text-[10px] uppercase font-bold text-white/20 tracking-[.4em] mb-4">Professional Fee Estimation</p>
            <h1 className="text-5xl md:text-7xl font-bold tabular-nums text-white tracking-tighter">
              {formatIDR(totalFee)}
            </h1>
          </div>
          
          <div className="grid grid-cols-2 gap-y-6 gap-x-12 py-10 border-y border-white/5">
            <div>
              <p className="text-[9px] uppercase font-bold text-white/30 mb-1 tracking-widest">Layanan</p>
              <p className="text-xs font-semibold text-white/60">{selectedPackage.name.toUpperCase()}</p>
            </div>
            <div>
              <p className="text-[9px] uppercase font-bold text-white/30 mb-1 tracking-widest">Volume Lahan</p>
              <p className="text-xs font-semibold text-white/60">{area} SQM</p>
            </div>
            <div>
              <p className="text-[9px] uppercase font-bold text-white/30 mb-1 tracking-widest">Rate Basis</p>
              <p className="text-xs font-semibold text-white/60 font-mono">@{rate}/M²</p>
            </div>
            <div>
               <p className="text-[9px] uppercase font-bold text-white/30 mb-1 tracking-widest">Estimasi DED</p>
               <p className="text-xs font-semibold text-white/60 italic">V2.0 COMPLIANT</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button 
              onClick={() => window.print()}
              className="flex-1 flex items-center justify-center gap-3 bg-white text-black py-5 text-[10px] font-bold uppercase tracking-[.3em] hover:bg-neutral-200 transition-all"
            >
              <Printer size={16} />
              Cetak Ringkasan Penawaran
            </button>
            <p className="sm:max-w-xs text-[9px] text-white/20 italic leading-relaxed self-center">
              *Tarif berdasarkan studioConfig.js v2.0. Nilai akhir bergantung pada tingkat kerumitan desain arsitektural.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
