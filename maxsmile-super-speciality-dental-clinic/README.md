# Maxsmile Super Speciality Dental Clinic

A high-performance, production-ready healthcare web application for **Maxsmile Super Speciality Dental Clinic**, located in Sargasan, Gandhinagar, Gujarat. Built with React, TypeScript, GSAP ScrollTrigger animations, and Tailwind CSS following the approved Google Stitch design specifications.

---

## 🏥 Business Configuration Summary

All central business details are maintained in `src/config/businessConfig.ts`:

- **Official Name**: Maxsmile Super Speciality Dental Clinic
- **Location**: Shyam Heights, 105, Palm Road, near Gurudwara, Sargasan, Gandhinagar, Gujarat 382419
- **Landmark**: Near Gurudwara, Sargasan
- **Google Rating**: 5.0 / 5.0 (21 Verified Reviews)
- **Opening Time**: 10:00 AM onwards (Daily Morning Hours)
- **Coordinates**: `23°10'41"N 72°37'52"E`
- **Phone Number**: Configurable in `src/config/businessConfig.ts` (`phone: null` by default to keep phone CTA hidden until verified by clinic management).

---

## 🛠️ Features & Technology Stack

- **React 19 & TypeScript**: Strict typing and functional modular architecture.
- **GSAP & ScrollTrigger**: Smooth text reveals, staggered card entrances, timeline connector animations, and scoped context cleanups with React Strict Mode safety and `prefers-reduced-motion` respect.
- **Tailwind CSS v4**: Engineered custom theme system with Graphite (`#20252B`), Medical Lime (`#B7D94A`), Steel Grey (`#A8B0B8`), and Clinical White.
- **Express Backend**: Server route `POST /api/consultation` for intake processing with server-side validation for Indian mobile numbers (`/^\+91?[6789]\d{9}$/`), preferred dates, service selection, and consent.
- **Accessible UI**: ARIA accordion for Patient Education, focus traps, semantic markup, and Schema.org `Dentist` JSON-LD structured data.

---

## 🚀 Deployment Instructions for Vercel

### 1. Repository Setup
1. Push this repository to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "Initial release for Maxsmile Super Speciality Dental Clinic"
   git branch -M main
   git remote add origin https://github.com/your-username/maxsmile-dental.git
   git push -u origin main
   ```

### 2. Import into Vercel
1. Log in to your [Vercel Dashboard](https://vercel.com).
2. Click **Add New** > **Project** and import your `maxsmile-dental` GitHub repository.
3. Vercel will automatically detect Vite:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**.

---

## 📋 Verification Checklist & Incomplete Information Notice

| Item | Status | Action Required Before Production Launch |
| :--- | :--- | :--- |
| Official Name | Verified | Maxsmile Super Speciality Dental Clinic |
| Clinic Address | Verified | Shyam Heights, 105, Palm Road, near Gurudwara, Sargasan, Gandhinagar, Gujarat 382419 |
| Google Review Score | Verified | 5.0 rating with 21 verified Google reviews |
| Telephone Number | Pending Verification | Set `phone: "+91 XXXXXXXXXX"` and `enablePhoneCTA: true` in `src/config/businessConfig.ts` once verified with reception. |
| Weekly Operating Hours | Pending Verification | Confirm full afternoon/evening schedule with doctor duty rotation in `src/config/businessConfig.ts`. |
| Database Integration | In-Memory / File | Currently logs consultation requests to `consultations.json`. Connect to MongoDB/PostgreSQL or email service (Resend/SendGrid) for direct SMS/Email alerts. |

---

© 2025 Maxsmile Super Speciality Dental Clinic. All rights reserved.
