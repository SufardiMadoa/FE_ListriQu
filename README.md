
# FE_ListriQu
Frontend project ini dibangun dengan **Vue 3** dan **Vite** untuk performa tinggi dan kemudahan pengembangan.
## Backlog Pengerjaan
[lihat track pengerjaan saya **[ListriQu]((https://github.com/users/SufardiMadoa/projects/6))**](https://github.com/users/SufardiMadoa/projects/6)

---

## 📁 Struktur Folder

```
src/
├── api/           # Konfigurasi API dan request handler (axios/fetch)
├── assets/        # Gambar, icon, dan asset statis lainnya
├── components/    # Komponen UI reusable (form, table, modal, dsb)
├── plugins/       # Plugin pihak ketiga yang di-*inject* ke Vue app
├── router/        # Konfigurasi routing menggunakan vue-router
├── services/      # Service layer untuk komunikasi API dan logic bisnis
├── stores/        # State management (menggunakan Pinia atau Vuex)
├── views/         # Halaman utama (Dashboard, Profile, Settings, dll)
├── App.vue        # Komponen root aplikasi
└── main.js        # Entry point aplikasi
```

---

## 🛠️ Setup Proyek

### 🔧 Install Dependensi

```bash
npm install
```

### 🚀 Jalankan Mode Pengembangan

```bash
npm run dev
```

Akses: [http://localhost:5173](http://localhost:5173)

### 📦 Build untuk Produksi

```bash
npm run build
```

### ✅ Jalankan Unit Test (Vitest)

```bash
npm run test:unit
```

### 🔁 Jalankan End-to-End Test (Cypress)

```bash
npm run test:e2e:dev
```

Build produksi + test e2e:

```bash
npm run build
npm run test:e2e
```

### 🧹 Linting

```bash
npm run lint
```

---

## 🔧 Rekomendasi Editor

Gunakan [VSCode](https://code.visualstudio.com/) dengan ekstensi:

- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) — rekomendasi resmi Vue 3
- Nonaktifkan Vetur jika sebelumnya aktif

---

## 📚 Referensi

- [Vue 3 Docs](https://vuejs.org/guide/introduction.html)
- [Vite Configuration](https://vitejs.dev/config/)
- [Pinia](https://pinia.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Vitest](https://vitest.dev/)
- [Cypress](https://www.cypress.io/)

---

## 🧑‍💻 Dibuat oleh

> Tim **ListriQu** – Frontend modern dan modular untuk sistem informasi terintegrasi.
