<div align="center">

  <img src="assets/logo.svg" alt="Gournadi Digital Logo" width="200"/>

  # গৌরনদী ডিজিটাল · Gournadi Ecommerce

  <p align="center">
    <strong>A high-performance, Bangla-first headless ecommerce storefront and content platform.</strong>
  </p>

  <p align="center">
    Built with <strong>Astro 6</strong>, powered by <strong>EmDash CMS</strong> and <strong>DashCommerce</strong>, with dual-currency support and seamless <strong>Stripe</strong> checkout.
  </p>

  <p align="center">
    <a href="https://astro.build"><img src="https://img.shields.io/badge/Astro-6.0-BC52EE?style=for-the-badge&logo=astro&logoColor=white" alt="Astro 6"/></a>
    <a href="https://docs.emdashcms.com"><img src="https://img.shields.io/badge/EmDash%20CMS-1.4-0F8A5F?style=for-the-badge" alt="EmDash CMS"/></a>
    <a href="https://dashcommerce.dev"><img src="https://img.shields.io/badge/DashCommerce-0.3-E55B3C?style=for-the-badge" alt="DashCommerce"/></a>
    <a href="https://www.cloudflare.com/"><img src="https://img.shields.io/badge/Cloudflare-D1%20Ready-F38020?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Cloudflare D1"/></a>
    <a href="https://stripe.com"><img src="https://img.shields.io/badge/Stripe-Checkout-635BFF?style=for-the-badge&logo=stripe&logoColor=white" alt="Stripe"/></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-2BAE66?style=for-the-badge" alt="License"/></a>
  </p>

  <p align="center">
    <a href="#-key-features">Key Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-quick-start">Quick Start</a> •
    <a href="#-admin-dashboard">Admin Dashboard</a> •
    <a href="#-storefront-routes">Routes</a> •
    <a href="#-deployment">Deployment</a> •
    <a href="#-license">License</a>
  </p>

</div>

---

## 📖 Overview

**Gournadi Ecommerce** (গৌরনদী ডিজিটাল) is a modern storefront engineered for speed, clean aesthetics, and flexible content management. It blends the best of static site generation with dynamic headless ecommerce capabilities.

Designed specifically for Bangladesh with a **Bangla-first interface** and **Taka (`৳ BDT`)** pricing, it seamlessly integrates with Stripe for global card settlements (`USD`), backed by a lightweight SQLite database locally and Cloudflare D1 for edge deployment.

---

## ✨ Key Features

- 🛍️ **Comprehensive Storefront Experience**
  - Dynamic product catalog with category/tag filtering, fast search, responsive cart drawer, and frictionless checkout.
- 🇧🇩 **Bangla-First Localization**
  - Native Bengali typography (Hind Siliguri), Bengali product descriptions, and currency localization (`BDT 1,990.00`).
- 🎛️ **Full Headless CMS Management**
  - Powered by **EmDash CMS** — manage products, orders, categories, hero slides, promotional banners, trust bars, announcements, navigation menus, and blog articles from a built-in admin panel.
- ⚡ **Blazing-Fast Island Architecture**
  - Powered by **Astro 6** Server-Side Rendering (SSR) with React 19 interactive components only where needed.
- 💳 **Stripe Checkout Integration**
  - Secure payment processing with automated webhooks and order confirmation receipts.
- 💱 **Multi-Currency Architecture**
  - Primary store pricing in `BDT`, with automatic `USD` rate mapping for Stripe payment settlement.
- ☁️ **Edge & Cloud Deployment Ready**
  - Runs locally with zero-setup SQLite (`data.db`) and deploys effortlessly to Cloudflare Workers + D1 or Node.js / Railway.

---

## 🛠️ Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [Astro 6](https://astro.build) | Islands architecture, SSR & high performance |
| **CMS Engine** | [EmDash CMS 1.4](https://docs.emdashcms.com) | Headless content management & admin dashboard |
| **Ecommerce** | [`@dashcommerce/core`](https://dashcommerce.dev) | Catalog, cart, checkout & order lifecycle |
| **UI & Islands** | [React 19](https://react.dev) | Interactive components (Cart, Stripe checkout forms) |
| **Database** | SQLite & [Cloudflare D1](https://developers.cloudflare.com/d1/) | Serverless edge SQL database |
| **Payments** | [Stripe](https://stripe.com) | Embedded Stripe Elements and Checkout |
| **Styling** | Custom Responsive CSS | Handcrafted warm paper palette (`#FBF9F4`, `#0F8A5F`, `#C8923C`) |

---

## 🎨 Visual Identity & Palette

The design reflects a warm, editorial paper aesthetic tailored for Gournadi:

```
Paper Background    #FBF9F4  ████████
Primary Ink         #0B1B17  ████████
Brand Green         #0F8A5F  ████████
Warm Gold Accent    #C8923C  ████████
Muted Text          #7A857F  ████████
```

* **Typography**: *Instrument Serif* (Display & Headlines), *Hind Siliguri* (Bangla copy), *Inter* (UI & Navigation).

---

## 🚀 Quick Start

### 1. Prerequisites

- **Node.js**: v20 or higher
- **npm**: v10 or higher

### 2. Clone Repository

```bash
git clone https://github.com/murshed/gournadiecommerce.git
cd gournadiecommerce
```

### 3. Install Dependencies

> [!NOTE]
> Use `--legacy-peer-deps` due to version alignment across Cloudflare Worker types.

```bash
npm install --legacy-peer-deps
```

### 4. Bootstrap Database & Seed Content

Initialize EmDash collections, merge DashCommerce ecommerce schemas, and apply sample content:

```bash
npm run bootstrap
```

### 5. Launch Development Server

```bash
npm run dev
```

Your storefront will be live at:
👉 **`http://localhost:4321`**

---

## 🎛️ Admin Dashboard

Access the EmDash management console:

```
http://localhost:4321/_emdash/admin
```

> [!TIP]
> **Local Dev Quick Login**: Bypass passkey authentication during local development by opening:
> `http://localhost:4321/_emdash/api/setup/dev-bypass?redirect=/_emdash/admin`

### What You Can Manage

- 📦 **Products**: Titles, SKUs, inventory, multi-currency price matrices (`BDT` & `USD`), category taxonomy, and tags.
- 🏷️ **Taxonomies**: Categories (`audio`, `wearable`, `computer`, `mobile`, `home`, `accessory`).
- 📰 **Journal**: Publish Bangla blog posts with rich content and topic categorizations (`guide`, `review`, `tips`, `offers`).
- 🖼️ **Homepage Layout**: Hero carousel sliders, category showcase tiles, promo banners, and trust badges.
- 🧭 **Site Menus**: Header navigation, footer columns (`Shop`, `Account`, `Help`, `Legal`).
- ⚙️ **Settings**: Site title (`গৌরনদী ডিজিটাল`), social channels, SEO meta tags, and payment credentials.

---

## 🗺️ Storefront Routes

| Route | Description |
| :--- | :--- |
| `/` | Homepage — hero slider, categories, featured grid, promos, trust strip, journal |
| `/shop` | Full product catalogue with category & price filtering |
| `/shop/[slug]` | Product details, image gallery, specs, and add-to-cart |
| `/category/[slug]` | Filtered category listings |
| `/tag/[slug]` | Tagged product collections |
| `/cart` | Dynamic cart drawer and order review |
| `/checkout` | Stripe-powered checkout flow |
| `/checkout/success` | Order confirmation with tracking details |
| `/account` | Customer account overview |
| `/orders/lookup` | Guest order status lookup |
| `/blog` | Journal listing and updates |
| `/blog/[slug]` | Single editorial article |
| `/about`, `/contact` | Store information and contact channels |
| `/privacy`, `/terms`, `/returns` | Policy and compliance pages |

---

## 💳 Payments, Currency & Shipping

### Currency Mapping
The primary customer display currency is **Bangladeshi Taka (`BDT`)**. Products carry a dual price structure:
- **BDT** (e.g., `৳ 1,990.00`): Displayed throughout catalogue, cart, and summaries.
- **USD** (e.g., `$ 18.00`): Used for Stripe payment processing since Stripe does not directly support BDT card settlement.

### Configuring Stripe
1. Go to **Admin → Plugins → DashCommerce → Settings**.
2. Enter your keys:
   - `stripePublishableKey` (`pk_test_...`)
   - `stripeSecretKey` (`sk_test_...`)
   - `stripeWebhookSecret` (`whsec_...`)

### Shipping Rates
Configure flat-rate delivery rules in **Admin → DashCommerce → Shipping** for local Bangladesh delivery zones (Inside Dhaka, Outside Dhaka, Barisal division, etc.).

---

## 📂 Project Structure

```plaintext
gournadiecommerce/
├── .emdash/               # EmDash schemas, migrations, and seed definitions
│   ├── build-seed.ts
│   ├── migrations.json
│   └── seed.json          # Default database seed
├── assets/                # Brand logos, category vectors, and illustrations
├── patches/               # Local npm package patches (emdash)
├── public/                # Static assets (robots.txt, icons)
├── scripts/               # Seed builders, Cloudflare D1 migration scripts
├── src/
│   ├── components/        # Astro & React UI components (Cart, Header, Banner)
│   ├── layouts/           # Master layout templates (Shop.astro)
│   ├── lib/               # DashCommerce helpers, site metadata, edition configs
│   ├── pages/             # File-based routing (Astro pages & endpoints)
│   ├── styles/            # Global styling (paper palette & typography)
│   └── worker.ts          # Cloudflare Worker entry point
├── astro.config.mjs       # Astro configuration & adapters
├── package.json           # Scripts & project dependencies
├── railway.json           # Railway hosting configuration
├── tsconfig.json          # TypeScript configuration
└── wrangler.jsonc         # Cloudflare Workers / D1 configuration
```

---

## 💻 Available Scripts

| Script | Command | Purpose |
| :--- | :--- | :--- |
| **Development** | `npm run dev` | Starts local Astro dev server on `http://localhost:4321` |
| **Build** | `npm run build` | Builds production bundle for Cloudflare deployment |
| **Node Build** | `npm run build:node` | Builds standalone Node.js server bundle |
| **Preview** | `npm run preview` | Previews production build locally |
| **Bootstrap** | `npm run bootstrap` | Initializes EmDash, merges commerce schemas & seeds DB |
| **Seed** | `npm run seed` | Applies `.emdash/seed.json` (`--on-conflict=update`) |
| **Type Check** | `npm run typecheck` | Runs `astro check` across TypeScript and Astro templates |
| **Cloudflare Dev** | `npm run cf:dev` | Runs site locally inside Wrangler worker runtime |
| **Cloudflare Deploy**| `npm run cf:deploy` | Deploys bundle to Cloudflare Workers |

---

## ☁️ Deployment

### Option A: Cloudflare Pages / Workers & D1 (Recommended)

1. **Create D1 Database**:
   ```bash
   npm run cf:d1:create
   ```
2. **Seed Remote D1 Database**:
   ```bash
   npm run cf:d1:seed
   ```
3. **Deploy via Wrangler**:
   ```bash
   npm run cf:deploy
   ```

### Option B: Railway or Standalone Node.js Container

Build the standalone server package:
```bash
npm run build:node
npm run start
```
A `railway.json` is provided in the repository root for zero-config Railway deployments.

---

## 🤝 Contributing

Contributions, feedback, and issue reports are warmly welcomed!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).

<div align="center">
  <p>Made with ❤️ for <strong>গৌরনদী ডিজিটাল</strong></p>
</div>
