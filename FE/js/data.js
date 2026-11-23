const produkTas = [
  {
    id: 1,
    nama_tas: "Daily Canvas Tote Bag",
    kategori: "Tote Bag",
    bahan: "Kanvas Tebal Water-Repellent",
    harga: 125000,
    stok: 15,
    dimensi: "38 x 28 x 11 cm (Muat laptop 14 inch)",
    gambar: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80",
    deskripsi: "Tas tote harian yang ringan dan tahan percikan air. Dilengkapi resleting utama, saku dalam, dan slot botol minum."
  },
  {
    id: 2,
    nama_tas: "Urban Commuter Backpack",
    kategori: "Backpack",
    bahan: "Polyester Cordura",
    harga: 240000,
    stok: 8,
    dimensi: "43 x 30 x 14 cm (Muat laptop 15.6 inch)",
    gambar: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    deskripsi: "Dirancang untuk mobilitas tinggi ke kampus atau kantor dengan bantalan punggung empuk dan kompartemen laptop terpisah."
  },
  {
    id: 3,
    nama_tas: "Mini Crescent Sling Bag",
    kategori: "Sling Bag",
    bahan: "Nylon Crinkle",
    harga: 95000,
    stok: 20,
    dimensi: "26 x 15 x 8 cm",
    gambar: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
    deskripsi: "Tas selempang ringkas dan fleksibel untuk membawa HP, dompet, charger, serta barang esensial harian."
  },
  {
    id: 4,
    nama_tas: "Weekender Duffel Bag",
    kategori: "Duffel Bag",
    bahan: "Canvas + Vegan Leather Accent",
    harga: 285000,
    stok: 6,
    dimensi: "48 x 25 x 24 cm",
    gambar: "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=800&q=80",
    deskripsi: "Cocok untuk perjalanan singkat 2-3 hari atau olahraga dengan strap bahu yang bisa dilepas-pasang."
  }
];

function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}