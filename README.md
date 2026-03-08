# ✦ MarketSpark Studio

> **"Where Brands Become Inevitable."**  
> A high-performance, luxury lead generation and management platform designed for the modern marketing agency.

---

## ✨ Features

- **🏆 Luxury Aesthetics**: A premium, "Old Money" design language featuring high-contrast typography, gold accents, and fluid animations.
- **🛡️ Secure Admin Portal**: A protected command center (locked with a custom passcode) to manage incoming leads and business intelligence.
- **📧 Real-time Lead Alerts**: Automated email notifications triggered via Supabase Edge Functions for instant response times.
- **📱 Fully Responsive**: A bespoke mobile experience featuring elegant card-based layouts and intuitive gesture-ready overlays.
- **📊 Business Intelligence**: Integrated lead dossiers, internal briefing tools, and filtered CSV export capabilities.

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite (High-performance rendering)
- **Backend/Database**: Supabase (PostgreSQL with real-time capabilities)
- **Edge Runtime**: Deno / Supabase Edge Functions (Secure automation)
- **Styling**: Vanilla CSS (Maximum control & performance)
- **Iconography**: Lucide React + Playfair Display typography

## 🚀 Quick Start

### 1. Prerequisites
- Node.js (v18+)
- Supabase Account

### 2. Environment Setup
Create a `.env` file in the `360_marketing` directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_ADMIN_PASSCODE=your_secret_passcode
```

### 3. Installation
```bash
cd 360_marketing
npm install
npm run dev
```

## 🔒 Security Configuration

To enable real-time email notifications, add the following secrets to your Supabase Edge Functions dashboard:

- `EMAIL_USER`: Your Gmail address
- `EMAIL_PASSWORD`: Your Gmail App Password
- `ADMIN_EMAIL`: recipient@example.com

## 🎨 Branding Note
This project features custom digital assets including a circular gold favicon and bespoke SVG iconography tailored for the MarketSpark brand identity.

---

© 2025 MarketSpark Studio. Built for Growth.
