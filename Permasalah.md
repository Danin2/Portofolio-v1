🔍 HASIL ANALISIS ROOT CAUSE (AKAR MASALAH)
Kendala	Temuan Akar Masalah di Codebase
1. LCP 4.4s	1. PageLoader.tsx memblokir viewport dengan overlay z-[99999] selama 1.3 detik (800ms timer + 500ms timeout) saat first load.
2. Elemen H1 Hero (Muhammad Danindra I) dibungkus StaggeredText.tsx dengan initial="hidden" (opacity: 0), sehingga teks H1 baru di-render setelah JS bundle di-parse, di-hydrate, plus delay animasi (0.2s + 0.6s).
3. app/template.tsx membungkus seluruh route dengan motion.div opacity: 0 yang menahan first paint.
4. Unused JS (~1,887 KiB)	1. Dependency tidak terpakai masih di package.json: three & @types/three (~600KB), @splinetool/react-spline, @splinetool/runtime, @tsparticles/react, @tsparticles/slim, shiki, react-parallax-tilt, next-themes (0 import di seluruh halaman aktif).
5. Barrel Import lucide-react: import * as LucideIcons from 'lucide-react' di app/about/AboutClient.tsx menarik seluruh bundle icon library (>1,400 SVG components / >1MB uncompressed JS) ke client chunk.
6. File duplikat/demo tidak terpakai: components/ProfileCard.tsx (23KB), components/LightRays.tsx (13KB), dan 7 demo/unused components lainnya.
3 & 4. Main-thread work (3.7s) & JS Exec (1.5s)	Parsing library raksasa (lucide-react wildcard, Three.js sisa), eksekusi PageLoader setInterval (60ms), GSAP magnetic listeners di Hero.tsx saat init, dan rAF listeners berlebihan.
5. Render-blocking (240ms)	Tag <link rel="preconnect" href="https://fonts.googleapis.com" /> & fonts.gstatic.com di app/layout.tsx. next/font/google sudah men-self-host font secara lokal saat build time; tag preconnect ke CDN eksternal justru membuka koneksi TCP/TLS yang membuang bandwidth di mobile.
6. Network dependency tree	app/contact/ContactClient.tsx meng-import LightRays secara statis (import LightRays from '@/components/ui/LightRays'), sehingga engine WebGL ogl ikut masuk ke critical synchronous chunk halaman contact.
7. Legacy JavaScript (13 KiB)	Polyfill dan transpilation helper yang terbawa oleh library lama/dead dependencies di atas.
8. Forced reflow	Pembacaan layout berulang (getBoundingClientRect, clientWidth) di Navigation.tsx (Magnetic), Hero.tsx (initMagneticButtons), dan ProfileCard.tsx tanpa batching rAF yang tepat.
9. Optimize DOM size	StaggeredText.tsx memecah setiap karakter string menjadi tag <motion.span> individual (~25+ span DOM node untuk judul hero), PageLoader.tsx merender 20 divider DOM element, dan marquee merender duplikasi elemen dengan nested glow wrapper.
📋 RENCANA PERBAIKAN LENGKAP (Prioritas Berdasarkan Dampak)
PRIORITAS 1: Perbaikan LCP (Target: 4.4s ➔ < 2.0s) & First Paint
Dampak: Paling masif ke Lighthouse Performance Score (LCP berbobot 25% dari total skor).

1. Optimasi Critical LCP Hero & Server-Rendered Text
File Terdampak:
components/sections/Hero.tsx
components/ui/StaggeredText.tsx
app/template.tsx
Perubahan yang Diusulkan:
H1 headline ("Muhammad Danindra I") di Hero dibuat langsung tampak via SSR/HTML (default opacity: 1), animasi entrance menggunakan CSS fade/transform murni atau stagger ringan tanpa menahan opacity 0 di server HTML.
Sederhanakan app/template.tsx agar tidak memaksakan opacity: 0 pada initial load pertama.
Alasan Teknis: Browser dapat langsung mencatat H1 sebagai LCP begitu HTML selesai di-parse (dalam ~1.0–1.2s), tanpa menunggu JS React & Framer Motion selesai hydration.
Potensi Risiko & Mitigasi: Animasi teks sedikit berbeda di milidetik awal. Mitigasi: Gunakan CSS animation berbasis keyframe yang berjalan langsung di compositor thread.
2. Optimasi / Bypass PageLoader di Mobile
File Terdampak:
components/ui/PageLoader.tsx
components/ui/ClientProviders.tsx
Perubahan yang Diusulkan:
Kurangi delay blocking PageLoader di mobile atau berikan bypass render cepat jika user menggunakan koneksi lambat/mobile, serta pastikan content-visibility tidak menahan elemen utama di baliknya.
Alasan Teknis: Menghilangkan 800ms–1300ms waktu terbuang di mana layar tertutup overlay hitam pekat saat Lighthouse melakukan audit.
Potensi Risiko & Mitigasi: Loader terasa lebih cepat selesai. Tampilan visual tetap identik karena styling progress bar tidak diubah.
PRIORITAS 2: Pembersihan Unused JS & Tree-Shaking (Estimasi Hemat ~1.8 MB JS)
Dampak: Memangkas Main-Thread Work, JS Execution Time, dan Network Payload.

3. Hapus Dead Dependencies dari package.json
File Terdampak:
package.json
next.config.ts
Perubahan yang Diusulkan:
Uninstall dependency yang tidak memiliki import di halaman aktif:
three & @types/three
@splinetool/react-spline & @splinetool/runtime
@tsparticles/react & @tsparticles/slim
shiki
react-parallax-tilt
next-themes
Hapus referensi "three" dari next.config.ts (optimizePackageImports).
Alasan Teknis: Menghilangkan dead code dari node_modules, bundle analyzer, dan build output.
Potensi Risiko & Mitigasi: Khawatir ada komponen yang diam-diam butuh Three.js. Hasil grep membuktikan Three.js hanya ada di ShapeBlur.tsx dan ParticleField.tsx yang keduanya tidak di-import di page manapun.
4. Fix Wildcard Import Lucide di About Page
File Terdampak:
app/about/AboutClient.tsx
Perubahan yang Diusulkan:
Ganti import * as LucideIcons from 'lucide-react' dengan pemetaan icon spesifik yang benar-benar dipakai (import { Code2, Cpu, Globe, ... } from 'lucide-react').
Alasan Teknis: Wildcard * as LucideIcons merusak tree-shaking Next.js dan memaksa browser mengunduh ~1,400 icon SVG ke dalam satu bundle file.
Potensi Risiko & Mitigasi: Nol risiko fungsional jika list icon yang dipakai dicocokkan dengan data props.
5. Bersihkan File Duplikat / Dead Code di Components
File Terdampak:
Hapus: components/ProfileCard.tsx (duplikat lama dari components/ui/ProfileCard.tsx)
Hapus: components/LightRays.tsx (duplikat lama dari components/ui/LightRays.tsx)
Hapus / Arsipkan demo files yang tidak di-routing: background-beams-demo.tsx, background-boxes-demo.tsx, LogoLoop-demo.tsx, MeteorsDemo.tsx, ShapeBlur.tsx, ParticleField.tsx, background-beams.tsx, background-boxes.tsx, meteors.tsx.
Alasan Teknis: Mencegah accidental import, mengurangi ukuran build artifacts, dan mempercepat bundling.
Potensi Risiko & Mitigasi: Nol risiko karena file-file tersebut tidak direferensikan oleh route manapun di Next.js.
PRIORITAS 3: Render-Blocking & Network Dependency Tree (Hemat ~240ms)
Dampak: Mempercepat FCP, Speed Index, dan melancarkan parallel network requests.

6. Hapus Redundant Google Fonts Preconnect & Pruning Font Weights
File Terdampak:
app/layout.tsx
Perubahan yang Diusulkan:
Hapus tag manual <link rel="preconnect" href="https://fonts.googleapis.com" /> dan fonts.gstatic.com.
Pangkas bobot Lora (dari 8 varian menjadi bobot yang dipakai saja, misal 400 & 700) dan Plus_Jakarta_Sans (400, 600, 700).
Alasan Teknis: Next.js next/font menyematkan font ke domain lokal secara otomatis. Menghapus koneksi eksternal yang tidak terpakai menghilangkan render-blocking request overhead (240ms).
Potensi Risiko & Mitigasi: Tampilan tipografi tetap 100% sama karena font tetap di-load via next/font/google.
7. Dynamic Import untuk LightRays di Contact Page
File Terdampak:
app/contact/ContactClient.tsx
Perubahan yang Diusulkan:
Ubah import LightRays from '@/components/ui/LightRays' menjadi dynamic(() => import('@/components/ui/LightRays'), { ssr: false }) sama seperti di Hero.tsx.
Alasan Teknis: Memotong network dependency chain di halaman kontak agar engine WebGL ogl dimuat secara asynchronous di background.
Potensi Risiko & Mitigasi: Nol risiko, halaman kontak tetap menampilkan background WebGL tanpa menunda first paint form kontak.
PRIORITAS 4: Eliminasi Forced Reflow & Optimasi DOM Size
Dampak: Menurunkan TBT, meningkatkan smooth scrolling 60/120 FPS, dan menyelesaikan audit DOM size.

8. Optimasi Layout Measurement & Passive Event Listeners
File Terdampak:
components/ui/ProfileCard.tsx
components/sections/Hero.tsx
components/layout/Navigation.tsx
Perubahan yang Diusulkan:
Pastikan pembacaan getBoundingClientRect di-cache atau hanya dipicu saat event mouse enter (bukan setiap frame pergerakan kursor).
Pastikan mobile touch device sama sekali tidak menjalankan listener hover/tilt.
Alasan Teknis: Mencegah browser melakukan layout recalculation (forced reflow) saat animasi atau scroll sedang berlangsung.
Potensi Risiko & Mitigasi: Nol risiko, efek visual desktop tetap halus dan mobile terbebas dari kalkulasi sia-sia.
9. Perampingan Node DOM (Optimize DOM Size)
File Terdampak:
components/ui/StaggeredText.tsx
components/sections/TechMarquee.tsx
Perubahan yang Diusulkan:
Ganti pemecahan per-karakter split('') pada teks panjang menjadi pemecahan per-kata (split(' ')) atau CSS letter-spacing transition jika di mobile.
Sederhanakan wrapper nested div pada icon marquee.
Alasan Teknis: Mengurangi jumlah total DOM nodes di bawah batas aman Lighthouse (target < 800 DOM elements).
Potensi Risiko & Mitigasi: Tampilan marquee dan teks tetap identik secara visual.