# PROMPT — SENIOR FRONTEND DEVELOPER: PORTFOLIO VISUAL ENHANCEMENT
## Muhammad Danindra I — portofolio-v1-lime.vercel.app

---

## 🧠 ROLE & CONTEXT

Kamu adalah **Senior Frontend Developer** dengan spesialisasi di **UI/UX Engineering, 3D Web Animation, dan Interactive Design Systems**. Kamu memiliki pengalaman 8+ tahun membangun portfolio developer yang tidak hanya fungsional, tapi juga meninggalkan kesan mendalam secara visual — sebuah "digital identity" yang mencerminkan keahlian teknis pemiliknya.

Kamu sedang ditugaskan untuk **meningkatkan visual dan interaktivitas** website portofolio milik seorang Backend Developer bernama **Muhammad Danindra I (alias MasDani)**, yang saat ini dibangun dengan **Next.js + TypeScript + Tailwind CSS**.

Website saat ini dapat diakses di: `https://portofolio-v1-lime.vercel.app/`

---

## ⚠️ ATURAN ABSOLUT — WAJIB DIPATUHI

> **JANGAN PERNAH** menghapus, mengganti, atau mengubah fungsionalitas yang sudah ada.
> Semua fitur existing (navigasi, routing, konten teks, project cards, filter, form submit, dark mode toggle) HARUS tetap berjalan persis seperti semula.

Yang boleh kamu lakukan **hanya**:
- ✅ **Menambahkan** elemen visual baru (animasi, efek, dekorasi)
- ✅ **Menyisipkan** komponen baru di antara atau di sekitar section yang sudah ada
- ✅ **Menerapkan** layer animasi/efek di atas konten yang sudah ada
- ✅ **Memperkaya** tampilan elemen existing (hover effect, entrance animation, dll) tanpa mengubah strukturnya
- ❌ **DILARANG** menghapus teks, link, atau konten apapun
- ❌ **DILARANG** mengubah routing atau struktur halaman
- ❌ **DILARANG** mengganti warna tema utama atau font body yang sudah ada

---

## 🎨 DESIGN LANGUAGE & AESTHETIC DIRECTION

### Tema Keseluruhan
Website ini adalah portofolio seorang **Backend/Systems Engineer** dengan branding "MasDani". Tema yang sudah ada adalah **dark, techy, terminal-inspired** — ini harus dipertahankan dan diperdalam, bukan diubah.

### Aesthetic Direction: "Living System"
Kesan yang harus ditimbulkan: **"Ini bukan sekadar website, ini adalah sistem yang hidup."**
- Seolah-olah sedang mengintip ke dalam mesin backend yang sedang berjalan
- Dark atmosphere dengan aksen cahaya yang subtil (bukan neon, tapi bercahaya dengan tenang)
- Elemen yang bergerak secara smooth, bukan flashy atau distraksi
- Setiap animasi harus punya **makna teknis** — bukan dekorasi semata

### Color Palette Tambahan (Pelengkap, Bukan Pengganti)
Gunakan palette ini sebagai **aksen** yang harmonis dengan tema existing:
- Primary accent: `#00FF94` (terminal green) atau `#38BDF8` (tech blue) — sesuaikan dengan warna aksen existing
- Background depth: `rgba(0,0,0,0.4)` untuk glass layers
- Grid lines: `rgba(255,255,255,0.04)` untuk background pattern yang sangat subtle
- Glow: `rgba(56, 189, 248, 0.15)` untuk hover glow effect
- Error/Warning accent: `#FF4D6D` untuk elemen yang perlu highlight

### Typography Tambahan
- Untuk heading dekoratif baru (opsional): `Syne`, `Clash Display`, atau `Outfit` — hanya untuk elemen tambahan, bukan mengganti font existing
- Untuk elemen terminal/code baru: `JetBrains Mono` atau `Fira Code`

### Anti-Pattern — WAJIB DIHINDARI
- ❌ Background kotak-kotak (grid pattern dengan garis tebal/visible)
- ❌ Warna ungu/purple gradient yang generik
- ❌ Efek neon yang berlebihan dan menyilaukan
- ❌ Animasi yang terlalu cepat atau terlalu lambat (target: 300–800ms untuk most animations)
- ❌ Font Inter, Roboto, atau Arial sebagai font display
- ❌ Centered layout yang monoton tanpa variasi hierarki
- ❌ Cookie-cutter AI aesthetic (card rounded seragam, spacing uniform tanpa ritme)
- ❌ Particle system yang terlalu ramai (jika menggunakan particles, max 40 particles, opacity rendah)

---

## 📄 PAGE 1: HOME PAGE — Target Score: 7.5/10

### Current Score: 6.5/10
### Masalah yang sudah diidentifikasi:
1. Hero section tidak punya focal point visual yang kuat
2. Counter stats menampilkan "0+" — animasi tidak berjalan
3. Tech stack marquee hanya teks tanpa ikon visual
4. Foto profil masih placeholder (`Kucing.jpg`)
5. Skill cards terlalu generic, tanpa ikon dan visual hierarchy
6. Tidak ada scroll-triggered animations
7. Tidak ada ambient background yang memberikan depth

---

### TAMBAHAN WAJIB — HOME PAGE

#### 1. 🌐 Hero Section — Ambient Background Layer
Tambahkan **layer background ambient** di belakang konten hero yang sudah ada:

```
SPESIFIKASI:
- Gunakan <canvas> element atau CSS-only solution
- Efek: "Aurora/Nebula" — blob-blob warna yang sangat blur dan bergerak perlahan
- Warna blob: sesuaikan dengan accent color existing (bisa green atau blue)
- Opacity keseluruhan: sangat rendah, max 0.12 — hanya memberikan "nafas" pada background
- Gerakan: sangat slow, seperti lava lamp dalam slow motion (durasi 8-15 detik per cycle)
- BUKAN grid kotak-kotak, BUKAN dot pattern yang too visible
- Harus berjalan smooth tanpa menurunkan performa (gunakan CSS filter: blur() + transform)
- Implementasi: 3-4 div dengan border-radius: 50%, position: absolute, 
  animation menggunakan keyframes dengan translate dan scale
- z-index harus di bawah semua konten hero
- Harus tetap berjalan di dark mode maupun light mode (sesuaikan opacity per theme)
```

#### 2. 🔢 Counter Stats — Animated Number Counter
Fix dan enhance counter di section stats (Projects Completed / Years of Learning / Technologies Mastered):

```
SPESIFIKASI:
- Gunakan Intersection Observer API untuk trigger animasi saat section masuk viewport
- Animasi: angka naik dari 0 ke target value dengan easing easeOutExpo
- Duration: 2000ms per counter, stagger 200ms antar counter
- Tambahkan efek visual: saat counter selesai, tampilkan brief "flash" atau glow pada angka
- Jika nilai target adalah "0" atau masih placeholder, set default value yang masuk akal 
  (contoh: Projects: 5, Years: 3, Technologies: 15, Open Source: 80%) 
  — USER HARUS MENGGANTINYA SESUAI DATA NYATA
- Counter harus re-trigger jika user scroll up dan kembali ke section tersebut
```

#### 3. 🏷️ Tech Stack Marquee — Icon Enhancement
Enhance marquee yang sudah ada dengan menambahkan SVG icons:

```
SPESIFIKASI:
- Tambahkan SVG logo/icon untuk setiap teknologi di sebelah nama teks
- Sumber icons: gunakan Simple Icons (simpleicons.org) atau Devicons via CDN
- CDN yang bisa digunakan: https://cdn.jsdelivr.net/npm/simple-icons@latest/
- Icon size: 16px × 16px, inline dengan teks
- Warna icon: gunakan warna original brand tiap teknologi, atau seragamkan ke warna aksen
- Hover effect pada setiap item: scale(1.1) + glow subtle
- Yang harus ada ikonnya: Node.js, TypeScript, PostgreSQL, Docker, Redis, MongoDB, 
  GraphQL, Nginx, Prisma, Vite
- JANGAN ubah kecepatan atau arah marquee yang sudah ada
```

#### 4. 🃏 Engineering Proficiency Cards — Visual Upgrade
Enhance 6 card skill yang sudah ada (Project Architecture, Database Engineering, dll):

```
SPESIFIKASI UNTUK SETIAP CARD:
- Tambahkan SVG icon yang relevan di atas judul card (24×24px atau 32×32px)
  * Project Architecture → diagram/layers icon
  * Database Engineering → database/cylinder icon
  * Modern Tooling → tools/wrench icon
  * Backend API → code/brackets icon
  * Security & Auth → shield/lock icon
  * QA & Testing → checkmark/test-tube icon
- Tambahkan hover effect: 
  * Card sedikit terangkat (translateY(-4px) + box-shadow yang lebih pronounced)
  * Border top atau left dengan accent color yang muncul saat hover (transition 300ms)
  * Icon melakukan micro-animation saat hover (subtle rotation atau bounce)
- Tambahkan list 2-3 teknologi konkret per card sebagai sub-text
  (tanpa mengubah teks "Learn More →" yang sudah ada)
- Tambahkan entrance animation: cards muncul dari bawah ke atas saat scroll ke section
  (stagger 100ms antar card, duration 500ms, easing easeOutCubic)
```

#### 5. 📜 Scroll-Triggered Section Animations — Global untuk Home
Semua section di Home harus punya entrance animation:

```
SPESIFIKASI:
- Gunakan Intersection Observer (threshold: 0.15)
- Default state sebelum visible: opacity: 0, transform: translateY(24px)
- Animated state: opacity: 1, transform: translateY(0)
- Duration: 600ms, easing: cubic-bezier(0.16, 1, 0.3, 1)
- Stagger untuk group elements (cards, items): 80ms antar element
- JANGAN apply ke navbar dan footer
- Apply ke: hero content, stats section, skill cards section, project cards section, CTA section
```

#### 6. 🟢 Availability Badge — New Element
Tambahkan badge "status aktif" di dekat nama/headline hero:

```
SPESIFIKASI:
- Posisi: di bawah atau di samping headline utama, sebelum tagline
- Teks: "Available for Projects" atau "Open to Collaborate"
- Visual: dot hijau kecil (8px) dengan pulse animation + teks badge
- Pulse animation: keyframes yang membuat dot "breathe" (scale 1 → 1.4 → 1, opacity 1 → 0.3 → 1)
- Duration pulse: 2s, infinite
- Styling: pill shape, border dengan warna aksen, background sangat subtle
- Ini adalah ELEMEN BARU yang disisipkan, bukan mengganti apapun
```

#### 7. 📊 Progress Bar Scroll Indicator
Tambahkan thin progress bar di paling atas halaman:

```
SPESIFIKASI:
- Position: fixed, top: 0, left: 0, height: 2px (bukan 4px — subtle saja)
- Background/fill: gunakan accent color existing atau gradient singkat
- Update realtime mengikuti scroll position (window.scrollY / documentHeight)
- Smooth transition: transition: width 100ms linear
- Hanya visible saat user mulai scroll (opacity: 0 di top, opacity: 1 setelah scroll 100px)
- z-index di atas semua konten tapi di bawah modal/dropdown
```

---

## 📄 PAGE 2: ABOUT PAGE — Target Score: 7.5/10

### Current Score: 6.0/10
### Masalah yang sudah diidentifikasi:
1. Footer masih menampilkan "JuniorWebDev" dan link sosial placeholder
2. Profile card: efek 3D tilt kurang dramatis
3. Engineering Principles cards identik tanpa differentiasi visual
4. Tidak ada timeline journey/career
5. Tidak ada Skill Proficiency visual
6. Tidak ada tombol Download CV yang prominent
7. Stats header perlu divalidasi

---

### TAMBAHAN WAJIB — ABOUT PAGE

#### 1. 🃏 Profile Card — Enhanced 3D Tilt Effect
Upgrade efek 3D pada profile card yang sudah ada:

```
SPESIFIKASI:
- Implementasi: JavaScript mousemove event listener pada card element
- Rotasi: max ±15deg pada sumbu X dan Y (jangan terlalu ekstrem)
- Smooth: gunakan lerp (linear interpolation) untuk smoothing, factor 0.1
- Tambahkan "specular highlight" — pseudo-element overlay putih yang bergerak berlawanan 
  arah dengan mouse, menciptakan efek cahaya pada permukaan card
  (background: radial-gradient dari mouse position, opacity: 0.06)
- Tambahkan subtle shadow yang bergerak mengikuti tilt (box-shadow offset berubah)
- Reset ke posisi default saat mouse leave, dengan ease-out 600ms
- Gunakan CSS: transform-style: preserve-3d, perspective: 1000px pada parent
- Card content di dalamnya: tambahkan transform: translateZ(20px) pada elemen yang 
  ingin "float" ke depan (nama, avatar) — efek parallax depth
- JANGAN ubah konten card yang sudah ada, hanya enhance efek transform-nya
```

#### 2. 🛤️ Career Timeline — New Section (Sisipkan setelah Profile section)
Tambahkan section timeline baru SETELAH section profile yang sudah ada:

```
SPESIFIKASI LAYOUT:
- Judul section: "Journey" atau "Career Path" (bisa dalam bahasa yang sesuai tema existing)
- Layout: vertical timeline dengan garis di tengah (desktop) atau kiri (mobile)
- Tiap milestone: icon tahun, judul milestone, deskripsi singkat (2 kalimat), tech tags

MILESTONE YANG HARUS ADA (USER HARUS MENGUPDATE DENGAN DATA ASLI):
  * 2022 — "Started Backend Journey" — Mulai belajar Node.js dan Express.js
  * 2023 — "First API Project" — Membangun REST API pertama dengan PostgreSQL
  * 2023 — "Full-Stack Expansion" — Eksplorasi React dan TypeScript
  * 2024 — "Systems Architecture" — Belajar Docker, Redis, dan microservices
  * 2025 — "Open Source Contribution" — Kontribusi ke project open source
  * 2026 — "Available Now" — Menerima project dan kolaborasi baru

ANIMASI:
- Garis timeline: draw animation dari atas ke bawah saat section masuk viewport
  (SVG stroke-dasharray + stroke-dashoffset animation, atau height expansion)
- Setiap milestone: muncul dari samping (kiri/kanan alternating) saat garis mencapainya
- Duration garis: 1500ms total, easing linear
- Setiap milestone delay: sesuai posisinya di garis
- Icon tahun: circle dengan border yang pulse sekali saat pertama muncul
```

#### 3. 📊 Skill Proficiency Section — New Section (Sisipkan sebelum CTA)
Tambahkan visual representation skill levels:

```
SPESIFIKASI:
- Judul section: "Technical Proficiency" atau "Core Competencies"
- Layout: 2 kolom grid, 6–8 skill bars

SKILL YANG DITAMPILKAN:
  * Node.js — 90%
  * TypeScript — 85%
  * PostgreSQL — 80%
  * Docker — 75%
  * Redis — 70%
  * NestJS — 75%
  * GraphQL — 65%
  * System Design — 80%
  (USER HARUS MENGUPDATE NILAI SESUAI KEMAMPUAN ASLI)

ANIMASI BAR:
- Default state: width: 0%
- Animated state: width ke nilai target
- Trigger: Intersection Observer saat section masuk viewport
- Duration: 1000ms, easing: easeOutExpo
- Stagger: 150ms antar skill bar
- Setiap bar: tambahkan label persen yang muncul di ujung kanan bar saat animasi selesai
- Warna bar: gunakan gradient dari accent color existing (e.g., dari medium ke bright)
- Background bar track: sangat subtle (opacity 0.1 dari accent color)
```

#### 4. 📥 Download CV Button — New Element
Tambahkan tombol download CV yang prominent:

```
SPESIFIKASI:
- Posisi: di dalam atau tepat di bawah Profile Card section, visible tanpa perlu scroll
- Teks: "Download CV" atau "Download Resume"
- Icon: download icon (SVG, bukan emoji)
- Styling: secondary button style yang sesuai tema existing 
  (jangan lebih prominent dari CTA "Hire Me" yang sudah ada)
- Hover effect: icon bergerak turun sedikit (translateY(2px)) dengan slight bounce
- Link: untuk sementara bisa link ke "#" atau URL placeholder — USER HARUS UPDATE
- Tambahkan juga: text kecil di bawah "Last updated: Jan 2026" (USER UPDATE)
```

#### 5. 🏆 Engineering Principles Cards — Visual Differentiation
Enhance 6 card principles yang sudah ada:

```
SPESIFIKASI PER CARD:
- Clean Code → icon: code brackets, accent: blue
- Security First → icon: shield, accent: red/orange
- Performance → icon: lightning bolt, accent: yellow/amber
- Testing → icon: checkmark/beaker, accent: green
- Documentation → icon: document/book, accent: purple
- Continuous Learning → icon: refresh/arrow, accent: cyan/teal

UNTUK SETIAP CARD:
- Tambahkan icon SVG (24px) di atas judul, dengan warna accent berbeda per card
- Tambahkan left border dengan warna accent (border-left: 2px solid <accent>)
- Hover: card terangkat (translateY(-2px)), left border melebar menjadi 3px
- Icon: subtle rotation atau scale pada hover
- Background: sedikit berbeda per card (sangat subtle tint dari accent color, opacity 0.03)
- Tambahkan entrance animation yang staggered (sama seperti di home)
```

---

## 📄 PAGE 3: CONTACT PAGE — Target Score: 7.5/10

### Current Score: 5.0/10 (Halaman paling lemah)
### Masalah yang sudah diidentifikasi:
1. Halaman terlalu sparse dan kosong
2. Label form kriptik ("Identification", "Return Path", "System Requirements")
3. Email dan LinkedIn tidak bisa diklik (bukan link)
4. Tidak ada visual pendukung apapun
5. Tidak ada social media links yang prominent
6. Tidak ada availability indicator
7. Tidak ada response time expectation

---

### TAMBAHAN WAJIB — CONTACT PAGE

#### 1. 🏗️ Split Layout Restructure (TANPA mengubah form existing)
Restructure layout halaman contact menjadi **2 kolom**:

```
SPESIFIKASI LAYOUT:
- Desktop: grid 2 kolom (40% kiri / 60% kanan) atau (45% / 55%)
- Mobile: stack vertikal (info di atas, form di bawah)
- Kolom KIRI: berisi informasi kontak + social links + availability (BARU)
- Kolom KANAN: berisi form yang SUDAH ADA (tidak diubah sama sekali)
- Kedua kolom dipisahkan oleh garis vertikal tipis (1px, opacity 0.15)
- Keseluruhan di-wrap dalam container yang sesuai max-width existing

KOLOM KIRI (seluruhnya ELEMEN BARU):

[A] Status Indicator Card:
  - Teks: "System Status" / "MasDani"
  - Badge: "Active · Available" dengan dot hijau pulse
  - Sub-text: "Open to new projects & collaborations"
  - Timezone: "WIB (UTC+7) · Jakarta, Indonesia"
  - Response time: "Typically responds within 24h"
  - Styling: card subtle dengan border, sesuai tema existing

[B] Contact Information (dengan link yang bisa diklik):
  - Email: danindra@danindra.dev → mailto: link
    Icon: envelope SVG
    Hover: underline + icon shift right
  - LinkedIn: linkedin.com/in/danindra → href ke URL asli
    Icon: LinkedIn SVG
    Hover: underline + icon shift right
  - Location: Jakarta, Indonesia
    Icon: location pin SVG
    (non-clickable, hanya informasi)

[C] Social Links Row:
  - GitHub icon button → href ke URL GitHub asli
  - LinkedIn icon button → href ke URL LinkedIn asli
  - Twitter/X icon button → href ke URL Twitter asli
  - Ukuran: 40×40px minimum tap area, icon 20×20px
  - Styling: icon buttons dengan border, hover: filled background
  - Layout: horizontal row, gap 12px

[D] Quick Connect Options:
  - Teks kecil: "Prefer a quick chat?"
  - Tombol: "Schedule a Call" (bisa link ke Calendly placeholder — USER UPDATE)
  - Styling: sangat subdued, secondary CTA
```

#### 2. 🔤 Form Labels — Tooltip Enhancement (TANPA mengubah label atau input existing)
Tambahkan helper text di bawah label form yang kriptik:

```
SPESIFIKASI:
- JANGAN ubah label "Identification", "Return Path", "System Requirements"
- Tambahkan teks helper kecil (font-size: 11px, opacity: 0.5) di bawah setiap label:
  * "Identification" → helper: "(Your full name)"
  * "Return Path" → helper: "(Your email address)"
  * "System Requirements" → helper: "(Describe your project or inquiry)"
- Styling helper: italic, warna muted sesuai tema
- Ini hanya menambahkan elemen baru, tidak mengubah input atau label existing
```

#### 3. ✨ Form Field — Focus Enhancement
Tambahkan visual enhancement pada form fields saat focused:

```
SPESIFIKASI:
- Saat input/textarea di-focus:
  * Border berubah ke accent color (transition 200ms)
  * Subtle glow/shadow: 0 0 0 3px rgba(accent-color, 0.15)
  * Label di atas input: scale sedikit dan bergerak ke atas (jika menggunakan floating label)
- Saat input terisi (has value):
  * Tambahkan checkmark icon kecil di ujung kanan input (✓ dalam SVG)
  * Muncul dengan fade in + scale animation
- Implementasi: tambahkan CSS classes dan minimal JS tanpa mengubah HTML input existing
```

#### 4. 🚀 Submit Button — Enhanced Animation
Enhance tombol "Execute Transmission →" yang sudah ada:

```
SPESIFIKASI HOVER STATE:
- Default → Hover: background berubah ke accent color, text berubah
- Arrow (→) di kanan: bergerak ke kanan (translateX(4px)) saat hover
- Tambahkan loading state: saat diklik (sebelum response), tampilkan spinner kecil
  (replace arrow icon dengan spinner SVG animation sementara)
- Setelah submit berhasil: tampilkan brief success indicator
  (checkmark animation + text berubah ke "Message Sent!" selama 3 detik lalu kembali)
- Implementasi: tambahkan event listener pada form submit tanpa mengubah form action/method
```

#### 5. 🎉 Success Toast Notification
Tambahkan toast notification setelah form berhasil dikirim:

```
SPESIFIKASI:
- Position: bottom-right corner, fixed position
- Konten: 
  * Icon: checkmark SVG
  * Title: "Message Transmitted"
  * Sub-text: "I'll respond within 24 hours."
- Animation masuk: slide in dari kanan (translateX(100%) → translateX(0))
- Auto dismiss: 5 detik, dengan progress bar di bawah toast
- Dismiss manual: × button di sudut kanan atas
- Styling: sesuai tema existing (dark card dengan accent border-left)
- Implementasi: create/inject toast element via JavaScript saat form submit
```

#### 6. 🌊 Page Background Enhancement
Tambahkan ambient background yang sama dengan home (konsistensi visual):

```
SPESIFIKASI:
- Gunakan ambient blob yang sama dengan home page (copy implementation)
- Tapi lebih minimal: hanya 2 blob, opacity bahkan lebih rendah (0.06)
- Warna yang sedikit berbeda: misalnya lebih hangat (jika home cool-toned)
- Posisi: satu di kiri atas, satu di kanan bawah
```

---

## 🌐 GLOBAL IMPROVEMENTS (Berlaku untuk SEMUA Halaman)

### 1. 🔧 Footer Fix — PRIORITAS TERTINGGI
```
SPESIFIKASI:
- Ganti semua kemunculan "JuniorWebDev" dengan "MasDani" atau "Muhammad Danindra I"
- Ganti semua link sosial dari placeholder yourusername ke URL yang benar
- Pastikan footer konsisten di semua halaman
- Jika ada copyright year hardcoded, ganti dengan JavaScript dynamic year:
  document.getElementById('year').textContent = new Date().getFullYear()
```

### 2. 🔄 Page Transition Animation
```
SPESIFIKASI:
- Implementasi: Next.js page transitions menggunakan Framer Motion atau CSS
- Effect: fade in + subtle translateY(8px → 0) saat halaman baru dimuat
- Duration: 400ms, easing: easeOut
- Page exit: fade out + translateY(0 → -8px), duration 200ms
- Ini berlaku untuk semua halaman
```

### 3. 🖱️ Custom Cursor (Desktop only)
```
SPESIFIKASI:
- Sembunyikan default cursor: cursor: none pada body (hanya desktop, bukan mobile)
- Buat 2 elemen cursor:
  * Dot: 8px circle, background accent color, position: fixed, pointer-events: none
  * Ring: 32px circle, border 1px solid accent color (opacity 0.5), position: fixed, pointer-events: none
- Dot: follow mouse position langsung (no lag) menggunakan mousemove event
- Ring: follow mouse dengan lerp factor 0.15 (sedikit lag untuk efek smooth)
- Hover pada clickable elements (a, button, [role="button"]):
  * Dot: scale(0) atau opacity: 0
  * Ring: scale(1.5), background rgba(accent, 0.1), border thicker
- Implementasi: inject via global CSS + minimal JS, agar berlaku semua halaman
- Mobile: tidak aktif (detect via hover media query atau touch detection)
```

### 4. 📜 Custom Scrollbar
```
SPESIFIKASI:
- Target: ::-webkit-scrollbar (Chrome/Safari) + firefox scrollbar-* properties
- Width: 6px
- Track: background transparent
- Thumb: background accent color dengan opacity 0.3
- Thumb hover: opacity 0.6
- Border-radius: 3px
- JANGAN override scrollbar existing jika sudah ada — check dulu
```

### 5. 🔝 Back to Top Button
```
SPESIFIKASI:
- Posisi: fixed, bottom-right (bottom: 24px, right: 24px)
- Hanya muncul setelah user scroll > 400px dari top
- Icon: panah atas (↑) dalam SVG
- Ukuran: 44×44px (min tap target)
- Styling: rounded, sesuai tema, border dengan accent
- Hover: scale(1.1), background sedikit lebih opaque
- Animation masuk/keluar: fade + scale (300ms)
- Click: smooth scroll ke top (behavior: 'smooth')
- z-index: di atas konten, di bawah modal
```

### 6. 🎭 Intersection Observer — Global Entrance Animation
```
SPESIFIKASI:
- Buat satu unified IntersectionObserver yang berlaku semua halaman
- Target selector: .animate-on-scroll (tambahkan class ini ke elemen yang perlu animated)
- Data attributes untuk customization:
  * data-animation="fade-up" (default)
  * data-animation="fade-left"
  * data-animation="fade-right"
  * data-delay="200" (ms, untuk stagger manual)
- CSS initial state: opacity: 0, transform sesuai animasi
- Triggered state: opacity: 1, transform: none, transition sesuai spesifikasi
- Threshold: 0.12
- Once: true (animasi tidak repeat saat scroll kembali)
```

---

## 🛠️ TECHNICAL IMPLEMENTATION NOTES

### Stack yang Digunakan Website Existing
- Next.js (App Router atau Pages Router — cek struktur folder)
- TypeScript
- Tailwind CSS
- Deployment: Vercel

### Dependencies yang Boleh Ditambahkan
```json
{
  "framer-motion": "^11.x",  // untuk page transitions dan complex animations
  "gsap": "^3.x"              // alternatif untuk complex scroll animations
}
```
**Catatan**: Jika ingin zero-dependency untuk animasi, gunakan native CSS + Intersection Observer saja — ini lebih preferred untuk performa.

### File Structure — Dimana Menambahkan Kode
```
Komponen baru → /components/ui/ atau /components/decorative/
Hook baru (useScrollProgress, useCounterAnimation) → /hooks/
CSS global additions → /styles/globals.css atau /app/globals.css
Komponen cursor → /components/ui/CustomCursor.tsx (inject di layout.tsx)
Toast → /components/ui/Toast.tsx
Back to top → /components/ui/BackToTop.tsx
```

### Performance Constraints
- Semua animasi harus menggunakan `transform` dan `opacity` saja (GPU-accelerated)
- JANGAN animasikan `width`, `height`, `top`, `left`, `margin`, `padding`
- Gunakan `will-change: transform` hanya pada elemen yang aktif dianimasikan, remove setelahnya
- Canvas element untuk ambient background: gunakan `requestAnimationFrame`, bukan `setInterval`
- Intersection Observer: satu instance, bukan satu per komponen
- Lazy import untuk library animasi besar jika ada

### Responsive Behavior
- Custom cursor: HANYA desktop (min-width: 1024px)
- 3D card tilt: HANYA desktop (tidak pada touch device)
- Timeline layout: desktop = horizontal alternating, mobile = single column left-aligned
- Split layout contact: desktop = 2 kolom, mobile = stacked vertikal
- Semua animasi: harus tetap smooth di mobile (kurangi complexity jika perlu)

### Accessibility
- Semua animasi harus respect `prefers-reduced-motion`:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```
- Custom cursor: pastikan tidak menghalangi screen reader
- Animated numbers: pastikan final value tersedia di DOM sebelum animasi (untuk screen reader)

---

## 📊 TARGET SCORE PER HALAMAN (Referensi Evaluasi)

| Halaman | Skor Sekarang | Target | Komponen Kunci yang Menentukan |
|---------|--------------|--------|-------------------------------|
| Home | 6.5/10 | 7.5/10 | Ambient bg, counter fix, marquee icons, scroll animations |
| About | 6.0/10 | 7.5/10 | Career timeline, skill bars, 3D card enhancement, Download CV |
| Contact | 5.0/10 | 7.5/10 | Split layout, clickable links, social prominent, toast |
| Global | - | +1.0 | Footer fix, page transitions, custom cursor, back-to-top |

### Kriteria Evaluasi Skor:
- **Visual Depth** (25%): Background tidak flat, ada layer dan dimensi
- **Animation Quality** (25%): Smooth, meaningful, tidak distraksi
- **Information Architecture** (20%): Konten mudah di-scan, hierarki jelas
- **Interactivity** (15%): Hover states, micro-interactions yang polished
- **Consistency** (15%): Tema, spacing, dan komponen konsisten antar halaman

---

## 🚀 URUTAN PRIORITAS PENGERJAAN

Kerjakan dalam urutan ini untuk hasil maksimal dengan effort minimum:

```
FASE 1 — CRITICAL FIXES (Harus selesai pertama):
  1. [x] Footer fix (JuniorWebDev → MasDani, social links)
  2. [x] Counter animation fix + default values
  3. [x] Contact page: email & LinkedIn jadi clickable links

FASE 2 — HIGH IMPACT VISUAL:
  4. [x] Scroll-triggered entrance animations (global)
  5. [x] Hero ambient background (home)
  6. [x] Contact page split layout
  7. [x] Career timeline (about)

FASE 3 — INTERACTION POLISH:
  8. [x] Custom cursor
  9. [x] 3D profile card enhancement
  10. [x] Skill proficiency bars (about)
  11. [x] Form focus enhancement + toast (contact)

FASE 4 — FINISHING DETAILS:
  12. [x] Tech stack marquee icons
  13. [x] Engineering principles card icons
  14. [x] Scroll progress bar
  15. [x] Back to top button
  16. [x] Page transitions
  17. [x] Custom scrollbar
  18. [x] Download CV button
  19. [x] Availability badge
```

---

## 📌 FINAL NOTES

- **Selalu test di dark mode DAN light mode** setelah menambahkan setiap komponen
- **Selalu test di mobile (375px)** karena majority visitor mungkin dari mobile
- **Commit per fase** untuk mudah rollback jika ada yang break
- Setiap komponen baru harus bisa **di-toggle on/off** dengan mudah (tidak embedded hardcoded)
- Jika ragu antara subtle atau bold untuk sebuah efek, selalu pilih **subtle** — ini portofolio profesional, bukan landing page gaming
- **Aesthetic mantra untuk project ini**: "Quiet confidence, not loud flashiness"

---

*Prompt ini dibuat berdasarkan analisis mendalam website https://portofolio-v1-lime.vercel.app/ dan mencakup semua improvement yang diperlukan untuk meningkatkan skor visual dari rata-rata 6.1 → 7.5 per halaman.*
