/* =====================================================
   NAVBAR SCROLL (SHRINK + BLUR)
===================================================== */
const navbar = document.querySelector(".nav");

window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

/* =====================================================
   MOBILE MENU (HAMBURGER)
===================================================== */
function toggleMenu() {
  const menu = document.getElementById("menu");
  if (menu.style.display === "flex") {
    menu.style.display = "none";
  } else {
    menu.style.display = "flex";
  }
}

/* =====================================================
   LIGHTBOX GALLERY
===================================================== */
document.querySelectorAll(".gallery-grid img").forEach(img => {
  img.addEventListener("click", () => {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    lightboxImg.src = img.src;
    lightbox.style.display = "flex";
  });
});

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

/* =====================================================
   SCROLL REVEAL (HALUS)
===================================================== */
const reveals = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right"
);

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  const revealPoint = 120;

  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - revealPoint) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* =====================================================
   MULTI LANGUAGE (ID / EN + FLAG)
===================================================== */
const translations = {
  id: {
    nav_home: "Home",
    nav_services: "Layanan",
    nav_about: "Tentang",
    nav_gallery: "Galeri",
    nav_contact: "Kontak",

    hero_title: "PT ALSINAR INDO ABADI",
    hero_subtitle: "General Supplier & Contractor Terpercaya",
    hero_cta: "Hubungi Kami",

    services_title: "Layanan Kami",
    service_1: "General Supplier",
    service_2: "Manajemen Scrap Iron (Besi Tua)",
    service_3: "Kontraktor dan Konstruksi",

    about_title: "Tentang Perusahaan",
    about_desc:
     about_desc:
  "PT Alsinar Indo Abadi merupakan perusahaan yang bergerak di bidang General Supplier dan Contractor, yang berkomitmen untuk memberikan layanan terbaik dengan standar profesionalisme, kualitas, dan integritas yang tinggi. Sejak didirikan, perusahaan terus berkembang dengan mengedepankan prinsip kepercayaan, ketepatan waktu, dan kepuasan pelanggan. Didukung oleh sumber daya manusia yang berpengalaman, manajemen yang profesional, serta jaringan mitra kerja yang solid, PT Alsinar Indo Abadi siap menjadi mitra strategis yang andal dalam mendukung pertumbuhan industri nasional dan pembangunan yang berkelanjutan.",
    vision_title: "Visi",
    vision_desc:
      vision_desc:
  "Menjadi perusahaan General Supplier dan Contractor terkemuka di Indonesia yang terpercaya, profesional, dan berdaya saing tinggi, dengan komitmen memberikan layanan terpadu yang berkualitas, tepat waktu, dan berkelanjutan, serta berperan aktif dalam mendukung pertumbuhan industri nasional.",

    mission_title: "Misi",
    mission_1: "Memberikan layanan General Supplier & Contractor yang berkualitas",
    mission_2: "Mengutamakan kepuasan klien melalui solusi yang efisien",
    mission_3: "Membangun hubungan jangka panjang berbasis integritas",
    mission_4: "Mendukung praktik bisnis berkelanjutan dan ramah lingkungan",

    gallery_title: "Galeri Proyek",
    contact_title: "Kontak Kami",
    contact_text: "Siap menjadi mitra strategis bisnis Anda."
  },

  en: {
    nav_home: "Home",
    nav_services: "Services",
    nav_about: "About",
    nav_gallery: "Gallery",
    nav_contact: "Contact",

    hero_title: "PT ALSINAR INDO ABADI",
    hero_subtitle: "Trusted General Supplier & Contractor",
    hero_cta: "Contact Us",

    services_title: "Our Services",
    service_1: "General Supplier",
    service_2: "Scrap Iron Management",
    service_3: "Contractor & Construction",

    about_title: "About Company",
    about_desc:
      "PT Alsinar Indo Abadi is a company engaged in General Supplier & Contractor services with a strong commitment to professionalism, quality, and sustainability.",

    vision_title: "Vision",
    vision_desc:
      "To become a trusted, professional, and leading integrated service provider supporting national industry needs.",

    mission_title: "Mission",
    mission_1: "Provide high-quality General Supplier & Contractor services",
    mission_2: "Prioritize client satisfaction through efficient solutions",
    mission_3: "Build long-term relationships based on integrity",
    mission_4: "Support sustainable and environmentally friendly business practices",

    gallery_title: "Project Gallery",
    contact_title: "Contact Us",
    contact_text: "Ready to become your strategic business partner."
  }
};

function setLang(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // active flag
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.remove("active");
  });
  document
    .querySelector(`.lang-btn[onclick="setLang('${lang}')"]`)
    ?.classList.add("active");

  localStorage.setItem("lang", lang);
}

// default language
document.addEventListener("DOMContentLoaded", () => {
  setLang(localStorage.getItem("lang") || "id");
});

/* ==================================
   GALERI AUTO + PANAH (FINAL)
================================== */
window.addEventListener("load", () => {
  const track = document.querySelector(".gallery-track");
  const prev = document.querySelector(".gallery-btn.prev");
  const next = document.querySelector(".gallery-btn.next");

  if (!track) return;

  const images = Array.from(track.children);
  if (images.length < 2) return;

  // Clone images supaya loop
  images.forEach(img => {
    track.appendChild(img.cloneNode(true));
  });

  let index = 0;
  const gap = 16;
  let interval;

  const slide = (dir = 1) => {
    const imgWidth = images[0].getBoundingClientRect().width + gap;
    index += dir;

    track.style.transition = "transform 0.8s ease";
    track.style.transform = `translateX(-${index * imgWidth}px)`;

    if (index >= images.length) {
      setTimeout(() => {
        track.style.transition = "none";
        track.style.transform = "translateX(0)";
        index = 0;
      }, 850);
    }

    if (index < 0) {
      index = images.length - 1;
      track.style.transition = "none";
      track.style.transform = `translateX(-${index * imgWidth}px)`;
    }
  };

  const startAuto = () => {
    interval = setInterval(() => slide(1), 3000);
  };

  const resetAuto = () => {
    clearInterval(interval);
    startAuto();
  };

  next.addEventListener("click", () => {
    slide(1);
    resetAuto();
  });

  prev.addEventListener("click", () => {
    slide(-1);
    resetAuto();
  });

  startAuto();
});
/* ================= GALERI FULL FEATURE ================= */
window.addEventListener("load", () => {
  const track = document.querySelector(".gallery-track");
  const images = document.querySelectorAll(".gallery-track img");
  const prev = document.querySelector(".gallery-btn.prev");
  const next = document.querySelector(".gallery-btn.next");

  if (!track || images.length === 0) return;

  let index = 0;
  const gap = 16;

  function imgWidth(){
    return images[0].getBoundingClientRect().width + gap;
  }

  function update(){
    track.style.transform = `translateX(${-index * imgWidth()}px)`;
  }

  next.addEventListener("click", () => {
    index = (index + 1) % images.length;
    update();
  });

  prev.addEventListener("click", () => {
    index = (index - 1 + images.length) % images.length;
    update();
  });

  /* Auto slide */
  setInterval(() => {
    index = (index + 1) % images.length;
    update();
  }, 3000);

  /* Swipe Mobile */
  let startX = 0;
  track.addEventListener("touchstart", e => startX = e.touches[0].clientX);
  track.addEventListener("touchend", e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (diff > 50) next.click();
    if (diff < -50) prev.click();
  });

  /* Lightbox */
  const lightbox = document.getElementById("lightbox");
  const lightImg = document.getElementById("lightbox-img");
  const close = document.querySelector("#lightbox .close");

  images.forEach(img => {
    img.addEventListener("click", () => {
      lightImg.src = img.src;
      lightbox.style.display = "flex";
    });
  });

  close.addEventListener("click", () => {
    lightbox.style.display = "none";
  });
});
