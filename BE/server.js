const express = require("express");
const cors = require("cors");
let produkTas = require("./data/tas");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Cek status server
app.get("/", (req, res) => {
  res.json({
    message: "API NusaBag Studio aktif",
    author: "25552012010_SHERRYL AZIZAH AULIA"
  });
});

// 1. READ ALL - Ambil semua data tas
app.get("/api/tas", (req, res) => {
  res.status(200).json({
    status: "success",
    total: produkTas.length,
    data: produkTas
  });
});

// 2. READ BY ID - Ambil detail 1 tas berdasarkan ID
app.get("/api/tas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const tas = produkTas.find((item) => item.id === id);

  if (!tas) {
    return res.status(404).json({
      status: "error",
      message: `Tas dengan ID ${id} tidak ditemukan`
    });
  }

  res.status(200).json({
    status: "success",
    data: tas
  });
});

// 3. CREATE - Tambah data tas baru
app.post("/api/tas", (req, res) => {
  const { nama_tas, kategori, bahan, harga, stok, dimensi, deskripsi } = req.body;

  if (!nama_tas || !kategori || !harga) {
    return res.status(400).json({
      status: "error",
      message: "Field nama_tas, kategori, dan harga wajib diisi"
    });
  }

  const newId = produkTas.length > 0 ? Math.max(...produkTas.map((t) => t.id)) + 1 : 1;
  const newTas = {
    id: newId,
    nama_tas,
    kategori,
    bahan: bahan || "-",
    harga: Number(harga),
    stok: stok !== undefined ? Number(stok) : 0,
    dimensi: dimensi || "-",
    deskripsi: deskripsi || "-"
  };

  produkTas.push(newTas);

  res.status(201).json({
    status: "success",
    message: "Data tas berhasil ditambahkan",
    data: newTas
  });
});

// 4. UPDATE - Ubah data tas berdasarkan ID
app.put("/api/tas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = produkTas.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: `Tas dengan ID ${id} tidak ditemukan`
    });
  }

  const { nama_tas, kategori, bahan, harga, stok, dimensi, deskripsi } = req.body;

  produkTas[index] = {
    ...produkTas[index],
    nama_tas: nama_tas ?? produkTas[index].nama_tas,
    kategori: kategori ?? produkTas[index].kategori,
    bahan: bahan ?? produkTas[index].bahan,
    harga: harga !== undefined ? Number(harga) : produkTas[index].harga,
    stok: stok !== undefined ? Number(stok) : produkTas[index].stok,
    dimensi: dimensi ?? produkTas[index].dimensi,
    deskripsi: deskripsi ?? produkTas[index].deskripsi
  };

  res.status(200).json({
    status: "success",
    message: "Data tas berhasil diperbarui",
    data: produkTas[index]
  });
});

// 5. DELETE - Hapus data tas berdasarkan ID
app.delete("/api/tas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = produkTas.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: `Tas dengan ID ${id} tidak ditemukan`
    });
  }

  const deleted = produkTas.splice(index, 1)[0];

  res.status(200).json({
    status: "success",
    message: "Data tas berhasil dihapus",
    data: deleted
  });
});

app.listen(PORT, () => {
  console.log(`Server NusaBag API berjalan di http://localhost:${PORT}`);
});