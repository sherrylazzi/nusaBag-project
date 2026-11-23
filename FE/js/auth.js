const DEFAULT_USER = {
  nama: "Sherryl Azizah",
  email: "member@nusabag.id",
  password: "nusabag123"
};

function getRegisteredUser() {
  try {
    const saved = localStorage.getItem("nusabag_user");
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (err) {
    console.error("Gagal membaca data user:", err);
  }
  return DEFAULT_USER;
}

// Proses Registrasi
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nama = document.getElementById("regNama").value.trim();
    const email = document.getElementById("regEmail").value.trim().toLowerCase();
    const password = document.getElementById("regPassword").value;
    const alertBox = document.getElementById("regAlert");

    if (nama === "" || email === "" || password === "") {
      alertBox.innerHTML = `<div class="alert alert-danger">Semua kolom wajib diisi.</div>`;
    } else if (password.length < 6) {
      alertBox.innerHTML = `<div class="alert alert-warning">Password minimal 6 karakter.</div>`;
    } else {
      localStorage.setItem("nusabag_user", JSON.stringify({ nama, email, password }));
      alertBox.innerHTML = `
        <div class="alert alert-success">
          Registrasi berhasil! Silakan <a href="login.html" class="alert-link">login di sini</a>.
        </div>
      `;
      registerForm.reset();
    }
  });
}

// Proses Login dengan percabangan if
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const emailInput = document.getElementById("loginEmail").value.trim().toLowerCase();
    const passwordInput = document.getElementById("loginPassword").value;
    const alertBox = document.getElementById("loginAlert");
    const validUser = getRegisteredUser();

    if (emailInput === "" || passwordInput === "") {
      alertBox.innerHTML = `<div class="alert alert-warning">Email dan password tidak boleh kosong.</div>`;
    } else if (
      (emailInput === validUser.email.toLowerCase() && passwordInput === validUser.password) ||
      (emailInput === DEFAULT_USER.email && passwordInput === DEFAULT_USER.password)
    ) {
      const activeUser =
        emailInput === validUser.email.toLowerCase() && passwordInput === validUser.password
          ? validUser
          : DEFAULT_USER;

      localStorage.setItem("nusabag_logged_in", JSON.stringify({
        nama: activeUser.nama,
        email: activeUser.email
      }));
      alertBox.innerHTML = `<div class="alert alert-success">Login berhasil! Mengalihkan ke menu utama...</div>`;
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 600);
    } else {
      alertBox.innerHTML = `<div class="alert alert-danger">Email atau password salah. Silakan coba lagi.</div>`;
    }
  });
}

function lihatDetailDashboard(id) {
  if (typeof produkTas === "undefined") return;
  const tas = produkTas.find((item) => item.id === id);
  const detailCard = document.getElementById("dashboard-detail-card");
  const detailBody = document.getElementById("dashboard-detail-body");
  if (!tas || !detailCard || !detailBody) return;

  detailBody.innerHTML = `
    <div class="row align-items-center g-4">
      <div class="col-md-4">
        <img src="${tas.gambar}" alt="${tas.nama_tas}" class="img-fluid rounded w-100" style="max-height: 240px; object-fit: cover;">
      </div>
      <div class="col-md-8">
        <span class="badge bg-dark mb-2">${tas.kategori}</span>
        <h4 class="fw-bold mb-1">${tas.nama_tas}</h4>
        <h5 class="text-primary fw-bold mb-3">${formatRupiah(tas.harga)}</h5>
        <p class="text-muted mb-3">${tas.deskripsi}</p>
        <div class="row g-2 small">
          <div class="col-sm-4"><strong>Bahan:</strong> ${tas.bahan}</div>
          <div class="col-sm-4"><strong>Dimensi:</strong> ${tas.dimensi}</div>
          <div class="col-sm-4"><strong>Stok:</strong> ${tas.stok} pcs</div>
        </div>
      </div>
    </div>
  `;

  detailCard.classList.remove("d-none");
  detailCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function tutupDetailDashboard() {
  const detailCard = document.getElementById("dashboard-detail-card");
  if (detailCard) {
    detailCard.classList.add("d-none");
  }
}

function initDashboard() {
  const katalogContainer = document.getElementById("member-katalog-tas");
  if (!katalogContainer) return;

  const session = localStorage.getItem("nusabag_logged_in");
  if (!session) {
    window.location.href = "login.html";
    return;
  }

  const user = JSON.parse(session);
  const welcomeEl = document.getElementById("user-greeting");
  const headingEl = document.getElementById("welcome-heading");
  if (welcomeEl) welcomeEl.textContent = `Halo, ${user.nama}`;
  if (headingEl) headingEl.textContent = `Selamat Datang, ${user.nama}!`;

  if (typeof produkTas === "undefined") return;

  katalogContainer.innerHTML = "";
  produkTas.forEach((item) => {
    katalogContainer.innerHTML += `
      <div class="col-md-6 col-lg-3 mb-4">
        <div class="card h-100 shadow-sm border-0">
          <img src="${item.gambar}" class="card-img-top katalog-img" alt="${item.nama_tas}">
          <div class="card-body d-flex flex-column">
            <span class="badge bg-secondary mb-2 align-self-start">${item.kategori}</span>
            <h5 class="card-title fw-bold">${item.nama_tas}</h5>
            <p class="card-text text-muted small flex-grow-1">${item.deskripsi}</p>
            <div class="fw-bold text-dark mb-3">${formatRupiah(item.harga)}</div>
            <div class="d-grid gap-2">
              <button type="button" class="btn btn-dark btn-sm" onclick="lihatDetailDashboard(${item.id})">Lihat Detail</button>
              <button type="button" class="btn btn-outline-warning text-dark btn-sm" onclick="tandaiFavorit('${item.nama_tas}')">+ Simpan Favorit</button>
            </div>
          </div>
        </div>
      </div>
    `;
  });
}

function tandaiFavorit(namaTas) {
  alert(`"${namaTas}" berhasil disimpan ke daftar favoritmu!`);
}

function logoutUser() {
  localStorage.removeItem("nusabag_logged_in");
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", initDashboard);