// Render katalog di index.html
function renderKatalog() {
  const container = document.getElementById("katalog-tas");
  if (!container) return;

  container.innerHTML = "";
  produkTas.forEach((item) => {
    container.innerHTML += `
      <div class="col-md-6 col-lg-3 mb-4">
        <div class="card h-100 shadow-sm border-0">
          <img src="${item.gambar}" class="card-img-top katalog-img" alt="${item.nama_tas}">
          <div class="card-body d-flex flex-column">
            <span class="badge bg-secondary mb-2 align-self-start">${item.kategori}</span>
            <h5 class="card-title fw-bold">${item.nama_tas}</h5>
            <p class="card-text text-muted small flex-grow-1">${item.deskripsi}</p>
            <div class="fw-bold text-dark mb-3">${formatRupiah(item.harga)}</div>
            <a href="detail.html?id=${item.id}" class="btn btn-dark w-100">Lihat Detail</a>
          </div>
        </div>
      </div>
    `;
  });
}

// Render detail informasi di detail.html
function renderDetail() {
  const detailContainer = document.getElementById("detail-produk");
  if (!detailContainer) return;

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  const tas = produkTas.find((item) => item.id === id);

  if (!tas) {
    detailContainer.innerHTML = `
      <div class="alert alert-warning text-center">
        Data tas tidak ditemukan. <a href="index.html" class="alert-link">Kembali ke Halaman Utama</a>
      </div>
    `;
    return;
  }

  detailContainer.innerHTML = `
    <div class="row align-items-center g-4">
      <div class="col-md-6">
        <img src="${tas.gambar}" class="img-fluid rounded shadow-sm detail-img w-100" alt="${tas.nama_tas}">
      </div>
      <div class="col-md-6">
        <span class="badge bg-dark mb-2">${tas.kategori}</span>
        <h2 class="fw-bold mb-2">${tas.nama_tas}</h2>
        <h4 class="text-primary fw-bold mb-3">${formatRupiah(tas.harga)}</h4>
        <p class="text-muted">${tas.deskripsi}</p>
        <ul class="list-group list-group-flush mb-4">
          <li class="list-group-item px-0"><strong>Bahan:</strong> ${tas.bahan}</li>
          <li class="list-group-item px-0"><strong>Dimensi:</strong> ${tas.dimensi}</li>
          <li class="list-group-item px-0"><strong>Stok Tersedia:</strong> ${tas.stok} pcs</li>
        </ul>
        <a href="index.html#katalog" class="btn btn-outline-dark">← Kembali ke Katalog</a>
      </div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  renderKatalog();
  renderDetail();
});