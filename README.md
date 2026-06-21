# Birthday Landing Page - React + Tailwind CSS WOW Version

Landing page ulang tahun pasangan dengan animasi yang lebih menarik dan interaktif.

## Fitur

- Opening surprise screen sebelum masuk halaman utama
- Fireworks canvas effect
- Cursor heart trail saat mouse bergerak
- Floating balloons, falling petals, dan magic particles
- Hero image dengan 3D tilt mengikuti mouse
- Countdown dengan flip animation
- Scroll reveal animation
- Story timeline dengan glowing line
- Wish cards dengan hover effect
- Envelope 3D yang terbuka otomatis saat section surat terlihat
- Love letter typewriter effect
- Gallery carousel 3D
- Gift surprise modal dengan confetti dan fireworks
- Music button
- Scroll progress bar

## Cara menjalankan

```bash
npm install
npm run dev
```

Buka URL yang muncul di terminal, biasanya:

```bash
http://localhost:5173
```

## Bagian yang bisa diedit

Edit file:

```bash
src/App.jsx
```

Ubah bagian `CONFIG`:

```jsx
const CONFIG = {
  partnerName: "Sayang",
  yourName: "Aku",
  birthdayDate: "2026-07-20T00:00:00",
  relationshipStart: "2023-01-12T00:00:00",
  heroImage: "/assets/hero-couple.svg",
  musicUrl: "/assets/music.mp3"
};
```

## Cara ganti foto

Masukkan foto ke folder:

```bash
public/assets
```

Lalu ubah path gambar di `src/App.jsx`, contoh:

```jsx
heroImage: "/assets/foto-kamu.jpg"
```

Untuk gallery, ubah array berikut:

```jsx
const gallery = [
  "/assets/foto1.jpg",
  "/assets/foto2.jpg",
  "/assets/foto3.jpg",
  "/assets/foto4.jpg"
];
```

## Cara tambah musik

Tambahkan file musik dengan nama:

```bash
public/assets/music.mp3
```

Lalu tombol musik akan otomatis bisa dipakai.
# ranaa
