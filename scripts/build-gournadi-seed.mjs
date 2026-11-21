/**
 * Build the Gournadi Digital seed.
 *
 * Reads .emdash/seed.json (whose collection + taxonomy definitions come from
 * EmDash / DashCommerce), then replaces every piece of demo content with
 * Gournadi's own catalogue, journal, navigation and site copy.
 *
 * Run: node scripts/build-gournadi-seed.mjs && npm run seed
 */
import { readFileSync, writeFileSync } from "node:fs";

const SEED = ".emdash/seed.json";
const seed = JSON.parse(readFileSync(SEED, "utf8"));

// ── helpers ─────────────────────────────────────────────────────────────────
let keyN = 0;
const span = (text) => ({ _type: "span", _key: `s${keyN++}`, marks: [], text });
const block = (style, text) => ({
  _type: "block",
  _key: `b${keyN++}`,
  style,
  markDefs: [],
  children: [span(text)],
});
const rich = (parts) =>
  parts.map((p) => (typeof p === "string" ? block("normal", p) : block("h2", p.h2)));

/** Taka price, also priced in USD so a Stripe account can settle. */
const BDT_PER_USD = 120;
const price = (bdt) => ({
  BDT: { amount: bdt * 100 },
  USD: { amount: Math.round((bdt / BDT_PER_USD) * 100) },
});

const product = ({ slug, title, sku, bdt, stock, featured, goods, body, bundle }) => ({
  id: slug,
  slug,
  status: "published",
  data: {
    title,
    type: bundle ? "grouped" : "simple",
    sku,
    prices: price(bdt),
    description: rich(body),
    manage_stock: true,
    stock_quantity: stock,
    stock_status: stock > 0 ? "instock" : "outofstock",
    backorders: "no",
    low_stock_threshold: 5,
    weight_grams: 300,
    tax_class: "standard",
    shipping_class_slug: null,
    featured: Boolean(featured),
    is_downloadable: false,
    is_virtual: false,
    ...(bundle ? { child_product_ids: bundle } : {}),
  },
  taxonomies: { product_category: [goods], product_tag: [] },
});

// ── Catalogue ───────────────────────────────────────────────────────────────
const products = [
  product({
    slug: "aura-12", title: "Aura 12 ওয়্যারলেস ইয়ারবাড · Aura 12 earbuds",
    sku: "AURA-12", bdt: 1990, stock: 34, featured: true, goods: "audio",
    body: [
      "হাইব্রিড ANC, ৩৬ ঘণ্টা ব্যাটারি ব্যাকআপ এবং IPX5 ওয়াটার রেজিস্ট্যান্স।",
      "একবার চার্জে ৯ ঘণ্টা শোনা যায়, কেসসহ মিলিয়ে ৩৬ ঘণ্টা। টাচ কন্ট্রোল আর ডুয়াল মাইক্রোফোনে কল স্পষ্ট।",
    ],
  }),
  product({
    slug: "bud-pro", title: "Bud Pro মিনি স্পিকার · Bud Pro speaker",
    sku: "BUD-PRO", bdt: 3490, stock: 21, featured: true, goods: "audio",
    body: [
      "কমপ্যাক্ট ফর্মে 360° সাউন্ড, ১৬ ঘণ্টা প্লে-টাইম।",
      "ব্লুটুথ ৫.৩ এবং AUX — দুটোই সাপোর্টেড। IPX6 রেটিং, বৃষ্টির দিনেও নিশ্চিন্তে ব্যবহার করা যায়।",
    ],
  }),
  product({
    slug: "pixel-15-watch", title: "Pixel 15 স্মার্ট ওয়াচ · Pixel 15 watch",
    sku: "PIX-15", bdt: 5490, stock: 17, featured: true, goods: "wearable",
    body: [
      "১.৪৩ ইঞ্চি AMOLED ডিসপ্লে, always-on মোড, GPS ও SpO2 মনিটর।",
      "১০ দিন ব্যাটারি এবং ৫ATM ওয়াটার রেজিস্ট্যান্স — প্রতিদিনের ব্যবহারে বাস্তবসম্মত।",
    ],
  }),
  product({
    slug: "key-mx", title: "Key MX মেকানিক্যাল কিবোর্ড · Key MX keyboard",
    sku: "KEY-MX", bdt: 7990, stock: 9, featured: true, goods: "computer",
    body: [
      "হট-সোয়াপ সুইচ, PBT keycaps এবং অ্যালুমিনিয়াম চেসিস।",
      "ব্লুটুথ, 2.4G এবং টাইপ-সি — তিন মোডেই সংযোগ হয়। প্রোগ্রামেবল RGB সহ।",
    ],
  }),
  product({
    slug: "cam-4k", title: "Cam 4K পকেট ক্যামেরা · Cam 4K camera",
    sku: "CAM-4K", bdt: 9990, stock: 6, featured: true, goods: "mobile",
    body: [
      "৩-অ্যাক্সিস জিম্বাল সহ 4K 60fps শ্যুটিং, AI ট্র্যাকিং।",
      "ভ্রমণ আর ভ্লগের জন্য পকেটে চলে যাওয়া ফোল্ডেবল ডিজাইন।",
    ],
  }),
  product({
    slug: "rout-7", title: "Rout 7 মেশ রাউটার · Rout 7 router",
    sku: "ROUT-7", bdt: 12500, stock: 11, featured: true, goods: "computer",
    body: [
      "Wi-Fi 7 (802.11be), 6GHz ব্যান্ড এবং 2.5G ইথারনেট পোর্ট।",
      "তিনটি নোডে পুরো বাসা কভার — সেটআপ অ্যাপ সহ।",
    ],
  }),
  product({
    slug: "charger-65w", title: "চার্জার ৬৫ ওয়াট GaN · 65W GaN charger",
    sku: "CHG-65", bdt: 1490, stock: 54, featured: true, goods: "accessory",
    body: [
      "একসাথে দুটি ডিভাইস — ডুয়াল USB-C এবং USB-A, ল্যাপটপ পর্যন্ত সাপোর্ট।",
      "কমপ্যাক্ট GaN ডিজাইন, ফোল্ডেবল পিন — ব্যাগে সহজে ফিট হয়।",
    ],
  }),
  product({
    slug: "lite-9", title: "Lite 9 ই-রিডার · Lite 9 e-reader",
    sku: "LITE-9", bdt: 8990, stock: 14, featured: true, goods: "mobile",
    body: [
      "৯ ইঞ্চি পেপার-হোয়াইট ডিসপ্লে, আই কেয়ার ওয়ার্ম লাইট।",
      "IPX8 ওয়াটারপ্রুফ, একবার চার্জে ৬ সপ্তাহ।",
    ],
  }),
  product({
    slug: "aeroclean", title: "AeroClean এয়ার পিউরিফায়ার · Air purifier",
    sku: "AIR-PUR", bdt: 11500, stock: 8, featured: true, goods: "home",
    body: [
      "৩-স্টেজ HEPA H13 ফিল্ট্রেশন, ৩৫ বর্গমিটার পর্যন্ত রুম কভার।",
      "স্মার্ট অটো মোড এবং সাইলেন্ট স্লিপ মোড।",
    ],
  }),
  product({
    slug: "mouse-x", title: "Mouse X এর্গোনমিক মাউস · Mouse X",
    sku: "MOUSE-X", bdt: 2290, stock: 42, goods: "accessory",
    body: [
      "উলম্ব গ্রিপ ডিজাইন — দীর্ঘক্ষণ ব্যবহারে কবজির চাপ কমায়।",
      "সাইলেন্ট ক্লিক, ৪০০০ DPI, USB-C রিচার্জেবল।",
    ],
  }),
  product({
    slug: "power-20k", title: "পাওয়ার ২০কে পাওয়ার ব্যাংক · Power 20K",
    sku: "POWER-20", bdt: 2490, stock: 62, goods: "accessory",
    body: [
      "২০০০০mAh, USB-C PD ২২.৫ ওয়াট এবং USB-A QC ১৮ ওয়াট।",
      "একসাথে দুটি ডিভাইস চার্জ — কমপ্যাক্ট বডি।",
    ],
  }),
  product({
    slug: "office-bundle", title: "অফিস স্টার্টার বান্ডেল · Office bundle",
    sku: "OFF-BUNDLE", bdt: 11990, stock: 5, featured: true, goods: "computer",
    body: [
      "Key MX কিবোর্ড আর Mouse X মাউস — একসাথে বান্ডেল দামে।",
      "আলাদা কিনলে ১০,২৮০ টাকা; বান্ডেলে সাশ্রয়।",
    ],
    bundle: ["key-mx", "mouse-x"],
  }),
];

const tagMap = {
  audio: ["new", "sale", "bestseller"],
  wearable: ["new", "bestseller"],
  computer: ["sale", "bestseller", "bundle"],
  mobile: ["new", "bestseller"],
  home: ["new", "bestseller"],
  accessory: ["new", "sale", "bestseller"],
};
for (const p of products) {
  const cat = p.taxonomies.product_category[0];
  p.taxonomies.product_tag = Array.from(new Set(tagMap[cat] ?? ["new"])).slice(0, 3);
}

// ── Categories + tags ───────────────────────────────────────────────────────
const productCategories = [
  { slug: "audio", label: "অডিও · Audio", description: "ইয়ারবাড, স্পিকার আর হেডফোন।" },
  { slug: "wearable", label: "স্মার্ট ওয়াচ · Wearables", description: "স্মার্ট ওয়াচ আর ফিটনেস ট্র্যাকার।" },
  { slug: "computer", label: "কম্পিউটার · Computer", description: "কিবোর্ড, রাউটার আর অফিস সেটআপ।" },
  { slug: "mobile", label: "মোবাইল ও গ্যাজেট · Mobile", description: "ক্যামেরা, ই-রিডার আর মোবাইল গ্যাজেট।" },
  { slug: "home", label: "হোম অ্যাপ্লায়েন্স · Home", description: "ঘরকে আরামদায়ক করার ইলেকট্রনিক্স।" },
  { slug: "accessory", label: "অ্যাক্সেসরিজ · Accessories", description: "চার্জার, মাউস, পাওয়ার ব্যাংক।" },
];

const productTags = [
  { slug: "new", label: "নতুন এসেছে" },
  { slug: "bestseller", label: "বেস্ট সেলার" },
  { slug: "sale", label: "ফ্ল্যাশ সেল" },
  { slug: "bundle", label: "বান্ডেল" },
];

const postCategories = [
  { slug: "guide", label: "গ্যাজেট গাইড", description: "কেনার আগে যা জানা দরকার।" },
  { slug: "review", label: "রিভিউ", description: "ব্যবহারের অভিজ্ঞতা।" },
  { slug: "offers", label: "অফার", description: "সেল আর কুপন।" },
  { slug: "tips", label: "টিপস", description: "গ্যাজেট যত্ন আর ব্যবহার।" },
  { slug: "company", label: "কোম্পানি", description: "গৌরনদী ডিজিটালের গল্প।" },
];

seed.taxonomies = seed.taxonomies.map((t) => {
  if (t.name === "product_category") return { ...t, terms: productCategories };
  if (t.name === "product_tag") return { ...t, terms: productTags };
  if (t.name === "post_category") return { ...t, terms: postCategories };
  return t;
});

// ── Journal ─────────────────────────────────────────────────────────────────
const post = (slug, title, cat, excerpt, author, date, minutes, parts) => ({
  id: `post-${slug}`,
  slug,
  status: "published",
  data: {
    title,
    excerpt,
    cover_gradient: "linear-gradient(135deg, #0B1B17 0%, #0F8A5F 100%)",
    author_name: author,
    published_date: `${date}T09:00:00.000Z`,
    reading_minutes: minutes,
    body: rich(parts),
  },
  taxonomies: { post_category: [cat] },
});

const posts = [
  post(
    "true-wireless-2026",
    "২০২৬ সালে ট্রু ওয়্যারলেস ইয়ারবাড কেনার আগে যা জানা দরকার",
    "guide",
    "ANC, ড্রাইভার সাইজ, কোডেক — কোনটা আপনার কানের জন্য সঠিক?",
    "রাহাত চৌধুরী",
    "2026-08-21",
    6,
    [
      "দেশীয় বাজারে ১,৫০০ থেকে ১৫,০০০ টাকার মধ্যে বিস্তৃত রেঞ্জ পাওয়া যায়। বাজেট ঠিক করলে সিদ্ধান্ত নেওয়া অনেক সহজ হয়।",
      { h2: "ANC কী এবং কখন দরকার" },
      "হাইব্রিড ANC সবচেয়ে কার্যকর। ক্যাজুয়াল শোনার জন্য ২৫–৩০ ডেসিবেল কমানোই যথেষ্ট — বাসার ফ্যান বা রাস্তার শব্দ অনেকটাই চলে যায়।",
      { h2: "ব্যাটারি লাইফ" },
      "একবার চার্জে ৬–১০ ঘণ্টা এবং কেসসহ ৩০+ ঘণ্টা ভালো মানদণ্ড। দিনে দুই ঘণ্টার বেশি ব্যবহার করলে কেসের চার্জিং স্পিডও দেখুন।",
      { h2: "আমাদের পরামর্শ" },
      "প্রথমে ফিট আর কমফোর্ট দেখুন, তারপর স্পেসিফিকেশন। কানে ঠিক না বসলে দামি ড্রাইভারও কাজে আসে না।",
    ],
  ),
  post(
    "smartwatch-vs-band",
    "স্মার্ট ওয়াচ নাকি ফিটনেস ব্যান্ড — কোনটা আপনার জন্য?",
    "review",
    "AMOLED, GPS, ব্যাটারি — সিদ্ধান্ত নেওয়ার আগে তুলনা দেখুন।",
    "নাজনীন আক্তার",
    "2026-08-12",
    5,
    [
      "ফিটনেস ব্যান্ড সাধারণত ছোট, সস্তা আর দীর্ঘ ব্যাটারি দেয়। স্মার্ট ওয়াচ দেয় অ্যাপ সাপোর্ট, GPS আর বড় ডিসপ্লে।",
      { h2: "কোনটা কার জন্য" },
      "শুধু স্টেপ আর ঘুম ট্র্যাক করতে চাইলে ব্যান্ড যথেষ্ট। নোটিফিকেশন, কল আর বাইক রুট দরকার হলে স্মার্ট ওয়াচ নিন।",
      { h2: "একটা বাস্তব পরামর্শ" },
      "ওয়াচের স্ট্র্যাপ বদলানো যায় কি না দেখুন। এক বছর পর স্ট্র্যাপই প্রথম নষ্ট হয়।",
    ],
  ),
  post(
    "mechanical-keyboard-guide",
    "মেকানিক্যাল কিবোর্ড: রেড, ব্রাউন, ব্লু — কোন সুইচ আপনার?",
    "guide",
    "চাপের অনুভূতি, শব্দ, গেমিং আর টাইপিং — ভেঙে দেখাচ্ছি।",
    "আবিদ হাসান",
    "2026-08-04",
    7,
    [
      "সুইচ বেছে নেওয়াটাই কিবোর্ড কেনার আসল সিদ্ধান্ত। বাকিটা ফর্মফ্যাক্টর আর বাজেট।",
      { h2: "রেড সুইচ" },
      "লিনিয়ার, শান্ত, দ্রুত — গেমিং এবং দ্রুত টাইপিংয়ে দারুণ।",
      { h2: "ব্রাউন সুইচ" },
      "হালকা ট্যাকটাইল — অফিস আর বাসা দুটোতেই ভালো কাজ করে।",
      { h2: "ব্লু সুইচ" },
      "ক্লিকি আর উচ্চ শব্দ — টাইপিং উপভোগ করতে চাইলে সেরা, তবে শেয়ার করা অফিসে সাবধান।",
    ],
  ),
  post(
    "flash-sale-myths",
    "ফ্ল্যাশ সেল আসলে কাজ করে কীভাবে — ৫টি মিথ ভাঙা",
    "offers",
    "স্টক সীমিত থাকে, দাম বাড়ে, কিন্তু কোনটা বেশি কাজ করে?",
    "এডিটরস ডেস্ক",
    "2026-07-28",
    4,
    [
      "ফ্ল্যাশ সেলের মূল্য পুরোটাই সময়সীমার মধ্যে। কিন্তু সব ঘোষণা সমান নয়।",
      { h2: "মিথ ১: ফ্ল্যাশ সেলে পণ্য নতুন" },
      "বেশিরভাগ সময় একই পণ্য, শুধু সময়সীমা বেঁধে দেওয়া হয়। দাম আগে থেকে নোট করে রাখলে বুঝতে পারবেন।",
      { h2: "আসল সুবিধা" },
      "আগে থেকে পণ্য চিহ্নিত রাখলে ফ্ল্যাশ সেলে কয়েকশ টাকা বাঁচানো সম্ভব।",
    ],
  ),
  post(
    "gournadi-story",
    "গৌরনদী থেকে সারাদেশে — আমাদের গল্প",
    "company",
    "ছোট একটা দোকান থেকে আজকের ৬৪ জেলায় পৌঁছানো।",
    "ফাউন্ডার",
    "2026-07-10",
    3,
    [
      "বরিশালের গৌরনদী বাসস্ট্যান্ডের পাশে ছোট্ট একটি দোকান। লক্ষ্য ছিল একটাই — ভালো পণ্য, সঠিক দামে, সময়মতো পৌঁছে দেওয়া।",
      { h2: "আজ" },
      "৬৪ জেলায় ডেলিভারি, হাজারো সন্তুষ্ট ক্রেতা, আর দলে ১২ জন। ধন্যবাদ আপনাদের ভরসার জন্য।",
    ],
  ),
  post(
    "monsoon-care",
    "বর্ষায় ইলেকট্রনিক্স সুরক্ষিত রাখার ৭টি উপায়",
    "tips",
    "আর্দ্রতা, পানি, বিদ্যুৎ স্পাইক — আপনার গ্যাজেট বাঁচান সহজেই।",
    "টেক টিম",
    "2026-06-22",
    4,
    [
      "বাংলাদেশে বর্ষা মানেই উচ্চ আর্দ্রতা। ইলেকট্রনিক্সের সবচেয়ে বড় শত্রু পানির ছিটা নয়, ভেতরে জমা আর্দ্রতা।",
      { h2: "সিলিকা জেল" },
      "প্রতিটি ইলেকট্রনিক্স বাক্সে সিলিকা জেল রাখুন — আর্দ্রতা শোষণ করে।",
      { h2: "সার্জ প্রোটেক্টর" },
      "বিদ্যুৎ স্পাইক থেকে রক্ষা পেতে সার্জ প্রোটেক্টর ব্যবহার করুন — ৫০০ টাকা থেকে শুরু।",
      { h2: "চার্জার বন্ধ রাখুন" },
      "বজ্রপাতের সময় চার্জারে ফোন রেখে ঘুমাবেন না। প্লাগ খুলে রাখাই নিরাপদ।",
    ],
  ),
];

// ── Homepage collections ────────────────────────────────────────────────────
const heroSlides = [
  {
    id: "slide-delivery", slug: "slide-delivery", status: "published",
    data: {
      eyebrow: "সারা বাংলাদেশে ডেলিভারি",
      headline: "অরিজিনাল গ্যাজেট,\nহাতে পেয়ে টাকা দিন",
      subtitle: "ইয়ারবাড, স্মার্ট ওয়াচ, কিবোর্ড আর আরও অনেক কিছু — ৬৪ জেলায় পৌঁছে দিই।",
      cta_label: "এখনই কিনুন",
      cta_href: "/shop",
      bg_type: "gradient",
      bg_css: "radial-gradient(ellipse at 75% 40%, #0F8A5F 0%, #0B1B17 65%, #07120F 100%)",
      accent_css: "linear-gradient(90deg, #C8923C, #B37C2A)",
      sort_order: 10,
    },
  },
  {
    id: "slide-launch", slug: "slide-launch", status: "published",
    data: {
      eyebrow: "লঞ্চ অফার",
      headline: "২৫% ছাড়,\nসীমিত সময়ের জন্য",
      subtitle: "ফ্ল্যাশ সেলে সেরা দামে গ্যাজেট নিন। স্টক সীমিত।",
      cta_label: "অফার দেখুন",
      cta_href: "/shop",
      bg_type: "gradient",
      bg_css: "radial-gradient(ellipse at 30% 60%, #1E4A3B 0%, #0B1B17 70%)",
      accent_css: "linear-gradient(90deg, #C8923C, #8B6520)",
      sort_order: 20,
    },
  },
  {
    id: "slide-cod", slug: "slide-cod", status: "published",
    data: {
      eyebrow: "ক্যাশ অন ডেলিভারি",
      headline: "পণ্য দেখে নিন,\nতারপর টাকা দিন",
      subtitle: "ঢাকায় ২৪–৪৮ ঘণ্টা, ঢাকার বাইরে ৩–৫ দিন। সমস্যা হলে ৭ দিনে বদলে দিই।",
      cta_label: "অর্ডার শুরু করুন",
      cta_href: "/shop",
      bg_type: "gradient",
      bg_css: "radial-gradient(ellipse at 60% 50%, #C8923C 0%, #0B1B17 72%)",
      accent_css: "linear-gradient(90deg, #E9D3A8, #C8923C)",
      sort_order: 30,
    },
  },
];

const banners = [
  {
    id: "banner-home-promise", slug: "home-promise", status: "published",
    data: {
      internal_name: "হোমপেজ · আমাদের কথা",
      eyebrow: "আমাদের কথা",
      headline: "গৌরনদী থেকে শুরু,\nসারা দেশে পৌঁছানো",
      body: rich([
        "২০২১ সালে বরিশালের গৌরনদীতে ছোট একটা দোকান দিয়ে শুরু। উদ্দেশ্য একটাই ছিল — মানুষ যেন আসল পণ্য আসল দামে পায়, আর হাতে পেয়ে টাকা দিতে পারে।",
      ]),
      primary_cta_label: "সব পণ্য দেখুন",
      primary_cta_href: "/shop",
      secondary_cta_label: "যোগাযোগ করুন",
      secondary_cta_href: "/contact",
      theme: "dark",
      alignment: "left",
      bg_type: "gradient",
      bg_css: "linear-gradient(135deg, #0B1B17 0%, #123A2C 100%)",
    },
  },
];

const trustItems = [
  { slug: "cash-on-delivery", icon: "৳", title: "ক্যাশ অন ডেলিভারি", description: "পণ্য হাতে পেয়ে টাকা দিন", sort_order: 10 },
  { slug: "secure-payment", icon: "◈", title: "নিরাপদ পেমেন্ট", description: "কার্ড ও মোবাইল ব্যাংকিং", sort_order: 20 },
  { slug: "easy-returns", icon: "↺", title: "৭ দিনে রিটার্ন", description: "সমস্যা হলে বদলে দিই", sort_order: 30 },
  { slug: "fast-delivery", icon: "⚡", title: "দ্রুত ডেলিভারি", description: "ঢাকায় ২৪–৪৮ ঘণ্টা", sort_order: 40 },
].map((t) => ({
  id: `trust-${t.slug}`,
  slug: t.slug,
  status: "published",
  data: { icon: t.icon, title: t.title, description: t.description, sort_order: t.sort_order },
}));

const tileMeta = [
  { slug: "audio", label: "অডিও", desc: "ইয়ারবাড ও স্পিকার", size: "large", bg: "linear-gradient(135deg, #0F8A5F 0%, #0B1B17 100%)" },
  { slug: "wearable", label: "স্মার্ট ওয়াচ", desc: "স্বাস্থ্য ট্র্যাকিং", size: "small", bg: "linear-gradient(135deg, #123A2C 0%, #0B1B17 100%)" },
  { slug: "computer", label: "কম্পিউটার", desc: "কিবোর্ড ও রাউটার", size: "small", bg: "linear-gradient(135deg, #C8923C 0%, #0B1B17 100%)" },
  { slug: "mobile", label: "মোবাইল", desc: "ক্যামেরা ও ই-রিডার", size: "large", bg: "linear-gradient(135deg, #0A6B49 0%, #0B1B17 100%)" },
  { slug: "home", label: "হোম", desc: "ঘরের ইলেকট্রনিক্স", size: "small", bg: "linear-gradient(135deg, #2A3D35 0%, #0B1B17 100%)" },
  { slug: "accessory", label: "অ্যাক্সেসরিজ", desc: "চার্জার ও পাওয়ার ব্যাংক", size: "small", bg: "linear-gradient(135deg, #8B6520 0%, #0B1B17 100%)" },
];

const categoryTiles = tileMeta.map((t, i) => ({
  id: `tile-${t.slug}`,
  slug: t.slug,
  status: "published",
  data: {
    label: t.label,
    description: t.desc,
    href: `/category/${t.slug}`,
    size: t.size,
    bg_css: t.bg,
    sort_order: (i + 1) * 10,
  },
}));

const announcements = [
  { slug: "launch-offer", message: "লঞ্চ অফারে ২৫% ছাড় — কুপন LAUNCH25", location: "both", sort_order: 10 },
  { slug: "free-delivery", message: "২,০০০ টাকার উপরে অর্ডারে ফ্রি ডেলিভারি", location: "top_bar", sort_order: 20 },
  { slug: "cod", message: "সারা দেশে ক্যাশ অন ডেলিভারি", location: "top_bar", sort_order: 30 },
  { slug: "returns", message: "৭ দিনের রিটার্ন সুবিধা", location: "top_bar", sort_order: 40 },
  { slug: "m-northsound", message: "NorthSound", location: "marquee", sort_order: 100 },
  { slug: "m-aerobeat", message: "AeroBeat", location: "marquee", sort_order: 110 },
  { slug: "m-pixelcorp", message: "PixelCorp", location: "marquee", sort_order: 120 },
  { slug: "m-orawear", message: "OraWear", location: "marquee", sort_order: 130 },
  { slug: "m-volthome", message: "VoltHome", location: "marquee", sort_order: 140 },
  { slug: "m-nimbus", message: "Nimbus", location: "marquee", sort_order: 150 },
  { slug: "m-halcyon", message: "Halcyon", location: "marquee", sort_order: 160 },
].map((a) => ({
  id: `ann-${a.slug}`,
  slug: a.slug,
  status: "published",
  data: { message: a.message, location: a.location, enabled: true, sort_order: a.sort_order },
}));

const siteText = [
  {
    id: "site-text-main", slug: "main", status: "published",
    data: {
      footer_tagline: "গৌরনদী থেকে সারা বাংলাদেশে গ্যাজেট ডেলিভারি — আসল পণ্য, আসল দামে।",
      footer_newsletter_title: "অফার সবার আগে জানুন",
      footer_newsletter_body: "নতুন স্টক আর ফ্ল্যাশ সেলের খবর পাঠিয়ে দিই। স্প্যাম নেই।",
      footer_newsletter_placeholder: "০১XXXXXXXXX বা ইমেইল",
      footer_newsletter_cta: "সাবস্ক্রাইব",
      footer_copyright: "© {year} {title} — সর্বস্বত্ব সংরক্ষিত।",
    },
  },
];

const sectionHeaders = [
  {
    id: "section-homepage-bento", slug: "homepage-bento", status: "published",
    data: {
      label: "হোমপেজ · ক্যাটাগরি",
      eyebrow: "ক্যাটাগরি",
      title: "প্রয়োজন অনুযায়ী\nকিনে নিন",
      subtitle: "ছয়টি ক্যাটাগরিতে সাজানো — অডিও থেকে হোম অ্যাপ্লায়েন্স।",
      render_mode: "compact",
      theme: "light",
      alignment: "left",
    },
  },
  {
    id: "section-homepage-products", slug: "homepage-products", status: "published",
    data: {
      label: "হোমপেজ · পণ্য",
      eyebrow: "নতুন এসেছে",
      title: "এই সপ্তাহের\nনতুন পণ্য",
      render_mode: "compact",
      theme: "dark",
      alignment: "left",
      cta_label: "সব পণ্য দেখুন",
      cta_href: "/shop",
    },
  },
  {
    id: "section-homepage-journal", slug: "homepage-journal", status: "published",
    data: {
      label: "হোমপেজ · ব্লগ",
      eyebrow: "ব্লগ",
      title: "গ্যাজেট গাইড\nও পরামর্শ",
      subtitle: "কেনার আগে যা জানা দরকার, ব্যবহারের টিপস আর রিভিউ।",
      render_mode: "compact",
      theme: "dark",
      alignment: "left",
      cta_label: "সব লেখা",
      cta_href: "/blog",
    },
  },
];

// ── Navigation ──────────────────────────────────────────────────────────────
const cats = productCategories.map((c, i) => ({
  type: "custom",
  label: c.label.split(" · ")[0],
  url: `/category/${c.slug}`,
  titleAttr: c.description,
  cssClasses: ["grad-green", "grad-blue", "grad-amber", "grad-purple"][i % 4],
}));

const primaryMenu = {
  name: "primary",
  label: "প্রধান নেভিগেশন",
  items: [
    { type: "custom", label: "সব পণ্য", url: "/shop", children: cats },
    { type: "custom", label: "অফার", url: "/shop", cssClasses: "is-accent" },
    { type: "custom", label: "ব্লগ", url: "/blog" },
    { type: "custom", label: "আমাদের গল্প", url: "/about" },
    { type: "custom", label: "যোগাযোগ", url: "/contact" },
  ],
};

const footerShopMenu = {
  name: "footer-shop",
  label: "ফুটার · ক্যাটাগরি",
  items: [
    { type: "custom", label: "সব পণ্য", url: "/shop" },
    ...productCategories.map((c) => ({ type: "custom", label: c.label, url: `/category/${c.slug}` })),
  ],
};

const footerAccountMenu = {
  name: "footer-account",
  label: "ফুটার · অ্যাকাউন্ট",
  items: [
    { type: "custom", label: "কার্ট", url: "/cart" },
    { type: "custom", label: "চেকআউট", url: "/checkout" },
    { type: "custom", label: "অর্ডার খুঁজুন", url: "/orders/lookup" },
    { type: "custom", label: "আমার অ্যাকাউন্ট", url: "/account" },
  ],
};

const footerHelpMenu = {
  name: "footer-help",
  label: "ফুটার · সহায়তা",
  items: [
    { type: "custom", label: "রিটার্ন পলিসি", url: "/returns" },
    { type: "custom", label: "প্রাইভেসি", url: "/privacy" },
    { type: "custom", label: "শর্তাবলি", url: "/terms" },
    { type: "custom", label: "যোগাযোগ", url: "/contact" },
  ],
};

const footerLegalMenu = {
  name: "footer-legal",
  label: "ফুটার · লিগ্যাল",
  items: [
    { type: "custom", label: "রিটার্ন পলিসি", url: "/returns" },
    { type: "custom", label: "প্রাইভেসি", url: "/privacy" },
    { type: "custom", label: "শর্তাবলি", url: "/terms" },
  ],
};

// ── Assemble ────────────────────────────────────────────────────────────────
seed.meta = {
  name: "Gournadi Digital",
  description:
    "গৌরনদী ডিজিটাল — সারা বাংলাদেশে গ্যাজেট ডেলিভারি। EmDash + DashCommerce storefront.",
  author: "Gournadi Digital",
};

seed.settings = {
  title: "গৌরনদী ডিজিটাল",
  tagline: "সারা বাংলাদেশে গ্যাজেট ডেলিভারি — ক্যাশ অন ডেলিভারি সহ।",
  postsPerPage: 6,
  social: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    youtube: "https://youtube.com/",
  },
  seo: { titleSeparator: " — " },
};

seed.menus = [primaryMenu, footerShopMenu, footerAccountMenu, footerHelpMenu, footerLegalMenu];

seed.content = {
  products,
  hero_slides: heroSlides,
  posts,
  banners,
  trust_items: trustItems,
  category_tiles: categoryTiles,
  announcements,
  site_text: siteText,
  section_headers: sectionHeaders,
};

writeFileSync(SEED, JSON.stringify(seed, null, "\t") + "\n");
console.log(
  `Gournadi seed written: ${products.length} products, ${posts.length} posts, ` +
    `${heroSlides.length} hero slides, ${categoryTiles.length} tiles, ${seed.menus.length} menus.`,
);
