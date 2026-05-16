/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * AMASITECH Studio Hub - Central Configuration
 * Masita dapat mengubah data di bawah ini untuk menyesuaikan tarif, kontak, dan layanan.
 */

export const studioConfig = {
  studioName: "AMASITECH Studio Hub",
  ownerName: "Masita",
  whatsappNumber: "62895325003291", // Ganti dengan nomor WhatsApp aktif (gunakan format internasional 62...)
  email: "studio@amasitech.com",
  socials: {
    instagram: "@masita.archi",
    github: "github.com/afiq-tech",
  },
  
  // Tarif Jasa (IDR per m2)
  rates: {
    konsepAwal: 15000,
    desainLengkap: 45000,
    paketKomplet: 75000,
    interiorOnly: 35000,
  },

  // Deskripsi Paket Layanan
  packages: [
    { 
      id: "konsepAwal", 
      name: "Konsep Awal & Layout", 
      desc: "Denah 2D, Moodboard, & Visualisasi 3D Kasar",
      rateKey: "konsepAwal"
    },
    { 
      id: "desainLengkap", 
      name: "Desain Lengkap + DED", 
      desc: "Gambar Kerja Arsitektur, Struktur, & MEP Lengkap",
      rateKey: "desainLengkap"
    },
    { 
      id: "paketKomplet", 
      name: "Paket Komplet + Pengawasan", 
      desc: "Desain Lengkap & Supervisi Berkala di Lapangan",
      rateKey: "paketKomplet" 
    },
  ],

  // Pilihan Gaya Desain
  designStyles: [
    "Minimalis", 
    "Japandi", 
    "Industrial", 
    "Klasik Modern", 
    "Tropis Modern", 
    "Scandinavian"
  ],

  // Alur Proyek (Project Tracker)
  projectStages: [
    { title: "Briefing & Proposal", desc: "Penentuan kebutuhan & estimasi biaya" },
    { title: "Survey & Site Analysis", desc: "Pengukuran lahan & pengecekan kondisi lapangan" },
    { title: "Concept Design", desc: "Pengembangan layout & moodboard" },
    { title: "3D Rendering", desc: "Visualisasi eksterior & interior" },
    { title: "Working Drawings (DED)", desc: "Penyusunan gambar teknis konstruksi" },
    { title: "Final Handover", desc: "Penyerahan seluruh dokumen blueprint" },
  ]
};
