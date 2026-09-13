// src/data/cv.ts
// TEK KAYNAK: /ozgecmis sayfası, PDF üretimi ve JSON-LD Person yapısı buradan beslenir.
// Kaynak: NihanArmanCV.pdf (Eylül 2026). Değişiklik olduğunda sadece bu dosya güncellenir.

export type SkillLevel = "production" | "applied" | "basic";

export interface CvSkill {
  name: string;
  level: SkillLevel;
  /** İlgili proje sayfasına slug referansı, varsa */
  linkedProjectSlug?: string;
}

export interface CvExperienceEntry {
  title: string;
  titleEn: string;
  period: string;
  periodEn: string;
  /** Bootcamp sprint mi, uzun soluklu proje mi — case study çerçevesini belirler */
  kind: "sprint" | "long-term" | "competition";
  summary: string;
  summaryEn: string;
  stack: string[];
  linkedProjectSlug?: string;
}

export interface CvEducationEntry {
  institution: string;
  program?: string;
  period: string;
  detail?: string;
}

export interface CvCertificate {
  name: string;
  issuer: string;
}

export const cv = {
  person: {
    name: "Nihan Arman",
    titleTr: "Bilgisayar Mühendisliği Öğrencisi",
    titleEn: "Computer Engineering Student",
    location: "Konya, Türkiye",
    email: "nhnarman@gmail.com",
    phone: "0535 629 33 57",
    linkedin: "https://www.linkedin.com/in/nihanarman",
    github: "https://github.com/lichae57",
  },

  summaryTr:
    "Uygulamalı projeler ve topluluk çalışmalarıyla teknik becerilerini aktif olarak geliştiren bir siber güvenlik meraklısı. Şu an HSD Selçuk'ta Başkan Yardımcılığı yaparak ekip koordinasyonu ve iş birliği yönetimine katkı veriyor.",
  summaryEn:
    "A cybersecurity enthusiast actively building technical skills through hands-on projects and community engagement. Currently serving as Vice President at HSD Selçuk, contributing to team coordination and partnership management.",

  education: [
    {
      institution: "Selçuk Üniversitesi",
      program: "Bilgisayar Mühendisliği (Lisans Adayı)",
      period: "2025–2029",
      detail: "GNO: 3.4/4.0",
    },
    {
      institution: "İçel Anadolu Lisesi",
      period: "2021–2025",
    },
  ] satisfies CvEducationEntry[],

  // "kind: sprint" olan girdiler bootcamp/eğitim programı görevleridir — vaka
  // çalışmalarında "X aylık proje" değil "Y günlük yoğun sprint" olarak yazılır.
  experience: [
    {
      title: "Wikkon — Açık Kaynak Bilgi Platformu (sprint)",
      titleEn: "Wikkon — Open-Source Knowledge Platform (sprint)",
      period: "26–30 Kasım 2025",
      periodEn: "Nov 26–30, 2025",
      kind: "sprint",
      summary:
        "Figma'da kullanıcı odaklı, yüksek etkileşimli arayüzler tasarlayıp bunları Next.js ile optimize frontend uygulamalarına dönüştürdüğüm 5 günlük yoğun sprint.",
      summaryEn:
        "A 5-day intensive sprint designing user-centric, high-interaction interfaces in Figma and turning them into optimized Next.js frontend applications.",
      stack: ["Figma", "Next.js", "Cursor"],
      linkedProjectSlug: "wikkon-sprint",
    },
    {
      title: "Fintech Web Portal 2.0",
      titleEn: "Fintech Web Portal 2.0",
      period: "19–21 Aralık 2025",
      periodEn: "Dec 19–21, 2025",
      kind: "sprint",
      summary:
        ".NET 8 mimarisi üzerine kurulu, API entegrasyonları, güvenli OTP sistemi ve SMS doğrulama akışlarıyla yüksek performanslı bir fintech çözümü sunduğum 3 günlük sprint.",
      summaryEn:
        "A 3-day sprint delivering a high-performance fintech solution on .NET 8, implementing API integrations, a secure OTP system, and SMS verification flows.",
      stack: [".NET 8", "Visual Studio", "Cursor"],
      linkedProjectSlug: "fintech-web-portal",
    },
    {
      title: "Siber Vatan CTF Yarışması",
      titleEn: "Siber Vatan CTF Competition",
      period: "26 Aralık 2025",
      periodEn: "Dec 26, 2025",
      kind: "competition",
      summary:
        "Siber güvenlik eğitiminin ilk aşamasında 38 sorudan 28'ini tamamladım. OSINT, kriptografi, steganografi ve tersine mühendislik alanlarında pratik problemler üzerinde çalıştım.",
      summaryEn:
        "Completed 28 of 38 challenges in the initial phase of cybersecurity training, working on OSINT, cryptography, steganography, and reverse engineering.",
      stack: ["OSINT", "Kriptografi", "Steganografi", "Tersine Mühendislik"],
    },
    {
      title: "Agri-Water: Yapay Zekâ Destekli Sulama Asistanı",
      titleEn: "Agri-Water: AI-Powered Irrigation Assistant",
      period: "Nisan 2026",
      periodEn: "April 2026",
      kind: "long-term",
      summary:
        "OpenWeather API ile gerçek zamanlı hava durumu verisi ve Vertex AI (Gemini 2.5 Flash) ile ürüne özel sulama tavsiyesi üreten, Google Cloud Functions üzerinde çalışan sunucusuz bir Node.js backend'i. Google Cloud Console ve gcloud CLI ile uçtan uca kurulum: Model Garden, IAM rolleri, bölgesel kota yönetimi.",
      summaryEn:
        "A serverless Node.js backend on Google Cloud Functions integrating the OpenWeather API for real-time weather data and Vertex AI (Gemini 2.5 Flash) for crop-specific irrigation advice. Configured end-to-end via Google Cloud Console and gcloud CLI, including Model Garden setup, IAM roles, and regional quota management.",
      stack: [
        "Node.js",
        "Google Cloud Functions",
        "Vertex AI (Gemini 2.5 Flash)",
        "OpenWeather API",
        "gcloud CLI",
      ],
      linkedProjectSlug: "agri-water",
    },
  ] satisfies CvExperienceEntry[],

  certificates: [
    {
      name: "Introduction to Cybersecurity",
      issuer: "Cisco Networking Academy & Akbank Gençlik Akademisi",
    },
    {
      // TODO(nihan): "Linux Unhatched" muhtemelen bir yazım hatası —
      // kursun tam adını doğrula (Cisco kataloğunda "Linux Unhatched"
      // diye bir kurs yok; "Linux Unplugged/Unhatched" karışıklığı olabilir).
      name: "Linux Unhatched",
      issuer: "Cisco Networking Academy & Akbank Gençlik Akademisi",
    },
  ] satisfies CvCertificate[],

  skills: {
    designUx: ["Figma", "Canva", "Temel UI/UX Tasarımı"],
    technical: [
      { name: "Next.js", level: "production", linkedProjectSlug: "wikkon-sprint" },
      { name: "Node.js", level: "production", linkedProjectSlug: "agri-water" },
      { name: "Git / GitHub", level: "production" },
      { name: ".NET 8", level: "applied", linkedProjectSlug: "fintech-web-portal" },
      { name: "Python", level: "basic" },
      { name: "C", level: "basic" },
    ] satisfies CvSkill[],
    aiTools: [
      "Cursor",
      "Visual Studio",
      "Google Cloud Functions",
      "Prompt Engineering",
    ],
  },

  languages: [
    { name: "Türkçe", level: "Anadil" },
    { name: "İngilizce", level: "B1" },
    { name: "Korece", level: "A2" },
  ],

  abilities: [
    "Liderlik ve Proje Yönetimi",
    "Zaman Kritik Görev Yönetimi",
    "Disiplinlerarası Ortamlarda Uyum Sağlama",
  ],

  community: [
    {
      role: "Başkan Yardımcısı",
      org: "Huawei Student Developers Community (HSD Selçuk)",
    },
    {
      role: "Core Team Member",
      org: "Google Developer Groups Cloud Konya",
    },
  ],
} as const;