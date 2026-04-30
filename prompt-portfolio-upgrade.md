# 🧠 PROMPT — Frontend Developer Professional: Portfolio Visual Upgrade

---

## 🎯 KONTEKS & PERAN

Kamu adalah **senior frontend developer** dengan spesialisasi di **creative web development**, **WebGL / Three.js**, dan **motion design engineering**. Kamu telah mengerjakan portofolio untuk developer-level rekruter top di perusahaan seperti Vercel, Stripe, dan Linear. Kamu sangat paham bagaimana membedakan antara portofolio yang "dibuat AI" vs portofolio yang terasa **didesain oleh manusia dengan karakter**.

Tugasmu adalah **menambahkan** layer visual dan interaksi baru ke atas website portofolio yang sudah ada — **tanpa mengubah atau menghapus konten, fitur, routing, maupun logic yang sudah ada**. Semua yang kamu tambahkan bersifat **purely visual/presentational enhancements**.

---

## 🌐 WEBSITE YANG DIMAKSUD

**URL:** https://portofolio-v1-lime.vercel.app/  
**Stack:** Next.js + TypeScript  
**Persona:** Muhammad Danindra — Backend Systems Engineer  
**Spesialisasi:** Node.js, TypeScript, PostgreSQL, Docker, Redis, GraphQL  
**Tone:** Profesional, teknikal, presisi — seperti karya seorang engineer yang serius

---

## 🚫 LARANGAN (JANGAN DILAKUKAN)

- ❌ Jangan ubah routing, URL, atau struktur halaman yang ada
- ❌ Jangan hapus/ubah konten teks yang sudah ada (nama, deskripsi, proyek)
- ❌ Jangan ganti navigasi yang sudah ada
- ❌ Jangan pakai background kotak-kotak (grid pattern)
- ❌ Jangan pakai tampilan yang terlalu "AI-generated" — hindari purple gradient generik, Inter font everywhere, dan card layout yang terlalu template
- ❌ Jangan tambahkan placeholder link / konten kosong baru
- ❌ Jangan ubah color scheme yang sudah ada secara drastis — hanya enhance

---

## ✅ YANG PERLU DITAMBAHKAN

Berikut daftar fitur visual / interaksi yang harus kamu implementasikan satu per satu. Setiap poin dijelaskan secara spesifik untuk langsung bisa dikerjakan:

---

### 1. 🌌 HERO SECTION — Ambient Background dengan Particle / Noise Field

**Lokasi:** `app/page.tsx` atau `components/hero.tsx`  
**Yang ditambahkan:**

Buat background ambient yang hidup di belakang teks hero. Pilih salah satu dari opsi berikut (yang paling cocok dengan tone "backend engineer"):

**Opsi A — Floating Particle Mesh (Rekomendasi Utama):**
- Gunakan `Three.js` atau `tsparticles` untuk render partikel kecil yang bergerak lambat
- Partikel terhubung dengan garis tipis saat berdekatan (seperti network topology / server mesh)
- Warna: monochromatic — putih/abu gelap jika dark mode, hitam/abu muda jika light mode
- Partikel bereaksi terhadap posisi mouse (subtle parallax / repel effect)
- Opacity rendah: 15–25% agar tidak mengalihkan dari teks

**Opsi B — Animated Gradient Orbs (Glassmorphism):**
- 3–4 buah blob/orb berwarna yang bergerak sangat lambat dengan `CSS animation` + `filter: blur(80px)`
- Warna: sesuaikan dengan accent color site yang ada (green/teal karena backend vibes)
- Letakkan di sudut-sudut hero, z-index di belakang semua konten

**Spesifikasi teknis:**
```tsx
// Pastikan canvas / container ini:
position: absolute;
inset: 0;
z-index: 0;
pointer-events: none;
overflow: hidden;

// Semua konten hero tetap di z-index: 1
```

---

### 2. 🔤 HERO TEKS — Animated Text Reveal + Typewriter Effect

**Lokasi:** Hero section, nama "Muhammad Danindra I" + subtitle "Backend Systems Engineer"

**Yang ditambahkan:**

- **Nama besar:** gunakan staggered character reveal — setiap huruf fade-in + slide-up dengan delay bertahap (0ms, 30ms, 60ms, dst). Gunakan `Framer Motion` dengan `variants` + `staggerChildren`
- **Subtitle:** setelah nama selesai muncul, subtitle muncul sebagai typewriter effect yang mengetik satu per satu
- **"Available for projects" badge:** muncul dengan subtle pulse animation (ring yang melebar dan hilang, seperti sinyal aktif) — ini sudah ada, hanya perlu ditambah animasi

**Library yang direkomendasikan:**
```bash
npm install framer-motion
```

```tsx
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 }
  }
}

const letter = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
}
```

---

### 3. 🃏 SKILL CARDS — 3D Tilt + Glassmorphism Effect

**Lokasi:** Section "Engineering Proficiency" — 6 kartu (Project Architecture, Database Engineering, dll)

**Yang ditambahkan:**

**3D Card Tilt on Hover:**
- Gunakan `react-parallax-tilt` atau implementasi manual dengan mouse event
- Saat hover, kartu "miring" mengikuti arah mouse (perspective transform 3D)
- Rotasi maksimal: `rotateX: ±15deg`, `rotateY: ±15deg`
- Tambahkan efek "shine" — gradient putih semi-transparan yang bergerak mengikuti mouse (seperti holographic card)
- `transform-style: preserve-3d` + `perspective: 1000px`

**Glassmorphism layer:**
- Background kartu: `background: rgba(255,255,255,0.05)` (dark mode) atau `rgba(0,0,0,0.03)` (light mode)
- Border: `1px solid rgba(255,255,255,0.1)`
- `backdrop-filter: blur(10px)`
- Tambahkan subtle glow di border saat hover (menggunakan `box-shadow`)

**Ikon SVG:**
- Tambahkan ikon SVG besar (48px) di atas setiap kartu, dari library `lucide-react` yang sudah ada di Next.js ecosystem:
  - Project Architecture → `Network` atau `GitBranch`
  - Database Engineering → `Database`
  - Modern Tooling → `Zap`
  - Backend API → `Server`
  - Security & Auth → `Shield`
  - QA & Testing → `TestTube`

```bash
npm install react-parallax-tilt
# atau implementasi manual:
```

```tsx
const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  setRotation({ x: y * -15, y: x * 15 });
};
```

---

### 4. 📊 STATS SECTION — Counter Animation (Baru, Tambahkan di antara Hero dan Skills)

**Lokasi:** Tambahkan section baru antara hero dan "Engineering Proficiency"  
**Konten yang ditampilkan (sesuaikan dengan profil Danindra):**

```
3+        Projects Completed
2+        Years of Learning
5+        Technologies Mastered
100%      Open Source Enthusiast
```

**Implementasi:**
- Gunakan `Intersection Observer API` untuk trigger animasi saat section masuk viewport
- Angka berjalan dari 0 ke target value dalam 1.5 detik dengan easing `easeOutCubic`
- Layout: 4 kolom horizontal, borderless, background transparan
- Tipografi: angka besar (64px, font-weight 700) + label kecil (14px, muted)
- Pemisah antar stat: garis vertikal tipis (`border-left: 1px solid`) 

```tsx
function useCountUp(end: number, duration = 1500, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration, start]);
  return count;
}
```

---

### 5. 🚀 PROJECT CARDS — Hover Reveal + Mockup Preview Layer

**Lokasi:** Section "Selected Creations" — 3 kartu proyek

**Yang ditambahkan:**

**Hover Reveal Effect:**
- Default state: kartu tampil normal seperti sekarang
- Saat hover: layer baru muncul dari bawah dengan `translateY` animation (slide up 100% → 0%)
- Layer ini berisi: deskripsi proyek yang lebih panjang + tombol "View Details" yang lebih prominent
- Warna overlay layer: sesuai dengan accent color site (dark overlay, 90% opacity)

**Animated Border:**
- Saat hover, border kartu berubah menjadi animated gradient border yang "berjalan" mengelilingi kartu
- Implementasikan dengan `@keyframes` dan `background-clip: border-box`
- Atau gunakan `conic-gradient` yang berotasi

**Tech Tags:**
- Tag teknologi (Node.js, Express, dll) yang sudah ada → tambahkan staggered fade-in animation saat kartu pertama kali masuk viewport

---

### 6. 🖱️ CUSTOM CURSOR (Opsional tapi High Impact)

**Implementasi global:** `components/cursor.tsx` → import di `layout.tsx`

**Desain cursor:**
- Cursor default tetap, tapi tambahkan **follower dot** yang mengikuti dengan lag (spring animation)
- Follower: lingkaran kecil 8px, border 1px, transparan — bergerak dengan `lerp` (linear interpolation) sehingga selalu "tertinggal" sedikit dari cursor asli
- Saat hover di atas link/button: follower **membesar** dari 8px ke 40px + opacity berubah

```tsx
useEffect(() => {
  const follower = document.querySelector('.cursor-follower');
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const animate = () => {
    followerX += (mouseX - followerX) * 0.1; // lerp factor
    followerY += (mouseY - followerY) * 0.1;
    if (follower) {
      (follower as HTMLElement).style.transform = 
        `translate(${followerX - 4}px, ${followerY - 4}px)`;
    }
    requestAnimationFrame(animate);
  };
  animate();
}, []);
```

---

### 7. 📜 SCROLL PROGRESS INDICATOR

**Lokasi:** Top of page, fixed position  
**Yang ditambahkan:**
- Thin progress bar (2–3px) di bagian paling atas halaman
- Bergerak dari kiri ke kanan seiring user scroll ke bawah
- Warna: accent color site yang sudah ada
- Implementasi simple dengan `useScroll` dari Framer Motion atau manual `window.scrollY`

```tsx
const { scrollYProgress } = useScroll();
const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

<motion.div
  style={{ scaleX, transformOrigin: "left" }}
  className="fixed top-0 left-0 right-0 h-[2px] bg-primary z-50"
/>
```

---

### 8. 🌊 SKILL TICKER ENHANCEMENT — Smooth Infinite Scroll + Logo Icons

**Lokasi:** Skill ticker yang sudah ada (marquee/ticker Node.js✦TypeScript✦dll)

**Yang ditambahkan:**
- Tambahkan logo/ikon SVG kecil di samping setiap nama teknologi (gunakan `devicons` atau SVG inline)
- Gradient mask di kiri dan kanan ticker agar terasa "muncul dari kabut":
```css
.ticker-wrapper::before,
.ticker-wrapper::after {
  content: '';
  position: absolute;
  top: 0; bottom: 0;
  width: 80px;
  z-index: 2;
  pointer-events: none;
}
.ticker-wrapper::before { left: 0; background: linear-gradient(to right, var(--background), transparent); }
.ticker-wrapper::after { right: 0; background: linear-gradient(to left, var(--background), transparent); }
```

---

### 9. 🎭 PAGE TRANSITION ANIMATION

**Lokasi:** `app/layout.tsx` atau buat `components/page-transition.tsx`

**Yang ditambahkan:**
- Saat user klik navigasi (About, Projects, Contact), halaman baru muncul dengan smooth transition
- Efek: fade-in dari bawah (translateY: 20px → 0, opacity: 0 → 1, duration: 300ms)
- Gunakan Framer Motion `AnimatePresence` + `motion.div` wrapper

```tsx
// layout.tsx
<AnimatePresence mode="wait">
  <motion.div
    key={pathname}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
</AnimatePresence>
```

---

### 10. ✨ SECTION SCROLL-REVEAL (Global)

**Implementasi:** Buat custom hook `useScrollReveal.ts` yang bisa dipakai di semua section

```tsx
function useScrollReveal(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}
```

**Gunakan di setiap section:**
```tsx
const { ref, isVisible } = useScrollReveal();

<section
  ref={ref}
  className={`transition-all duration-700 ${
    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
  }`}
>
```

---

## 📦 DEPENDENCY YANG DIBUTUHKAN

```bash
npm install framer-motion
npm install react-parallax-tilt
npm install @tsparticles/react @tsparticles/slim
# Three.js (jika pakai opsi Three.js untuk hero)
npm install three @types/three
```

---

## 🎨 DESIGN PRINCIPLE YANG HARUS DIJAGA

1. **Setiap animasi harus purposeful** — bukan sekadar gerak, tapi memperkuat cerita bahwa ini adalah developer yang presisi dan detail-oriented
2. **Performance first** — semua animasi harus berjalan di 60fps. Gunakan `will-change: transform` dan `transform` (bukan `top/left`) untuk animasi
3. **Respektif terhadap `prefers-reduced-motion`** — semua animasi harus dimatikan saat user request reduced motion:
   ```css
   @media (prefers-reduced-motion: reduce) {
     * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
   }
   ```
4. **Dark/Light mode konsisten** — semua efek baru harus bekerja di kedua mode
5. **Mobile-friendly** — 3D tilt dinonaktifkan di touch device, particle count dikurangi di mobile

---

## 📋 URUTAN PENGERJAAN (dari yang paling berdampak)

| Prioritas | Fitur | Estimasi Waktu |
|-----------|-------|----------------|
| 🔴 1 | Scroll-reveal global (semua section) | 30 menit |
| 🔴 2 | Page transition dengan Framer Motion | 30 menit |
| 🔴 3 | 3D tilt + glassmorphism pada skill cards | 1 jam |
| 🟡 4 | Hero text animated reveal (stagger) | 45 menit |
| 🟡 5 | Stats section dengan counter animation | 45 menit |
| 🟡 6 | Project card hover reveal effect | 1 jam |
| 🟢 7 | Ambient background (particle / orbs) | 1–2 jam |
| 🟢 8 | Scroll progress bar | 15 menit |
| 🟢 9 | Ticker enhancement (gradient mask + ikon) | 30 menit |
| ⚪ 10 | Custom cursor follower | 45 menit |

---

## 💡 CATATAN AKHIR

Website ini adalah representasi diri sebagai **Backend Systems Engineer** — bukan designer. Karena itu, visual yang ditambahkan harus mencerminkan **presisi teknikal**, bukan artistik berlebihan. Think: bagaimana Stripe, Linear, atau Vercel mendesain portofolio engineer mereka — **clean, functional, tapi berkarakter kuat**.

Setiap efek yang ditambahkan harus bisa dijawab dengan: *"Ini mencerminkan bahwa saya engineer yang perhatian terhadap detail dan kualitas."*
