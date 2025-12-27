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
  if (!menu) return;

  if (menu.style.display === "flex") {
    menu.style.display = "none";
  } else {
    menu.style.display = "flex";
  }
}


/* =====================================================
   GALLERY SLIDER (AUTO + PANAH + SWIPE)
===================================================== */
window.addEventListener("load", () => {
  const track = document.querySelector(".gallery-track");
  const prev = document.querySelector(".gallery-btn.prev");
  const next = document.querySelector(".gallery-btn.next");

  if (!track || !prev || !next) return;

  let images = Array.from(track.children);
  if (images.length < 2) return;

  const gap = 16;
  let index = 0;
  let autoSlide;

  // Clone images untuk efek loop
  images.forEach(img => {
    const clone = img.cloneNode(true);
    track.appendChild(clone);
  });

  function imgWidth() {
    return images[0].getBoundingClientRect().width + gap;
  }

  function update() {
    track.style.transition = "transform 0.6s ease";
    track.style.transform = `translateX(${-index * imgWidth()}px)`;

    // Reset loop
    if (index >= images.length) {
      setTimeout(() => {
        track.style.transition = "none";
        track.style.transform = "translateX(0)";
        index = 0;
      }, 600);
    }
  }

  function slide(dir = 1) {
    index += dir;
    update();
  }

  function startAuto() {
    autoSlide = setInterval(() => slide(1), 3000);
  }

  function resetAuto() {
    clearInterval(autoSlide);
    startAuto();
  }

  next.addEventListener("click", () => {
    slide(1);
    resetAuto();
  });

  prev.addEventListener("click", () => {
    index = Math.max(index - 1, 0);
    update();
    resetAuto();
  });

  // Swipe mobile
  let startX = 0;
  track.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  track.addEventListener("touchend", e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (diff > 50) next.click();
    if (diff < -50) prev.click();
  });

  startAuto();
});


/* =====================================================
   LIGHTBOX GALLERY (EVENT DELEGATION - AMAN)
===================================================== */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

// Klik gambar (asli + clone)
document.addEventListener("click", e => {
  const img = e.target.closest(".gallery-track img");
  if (!img || !lightbox || !lightboxImg) return;

  lightbox.style.display = "flex";
  lightboxImg.src = img.src;
});

// Tutup lightbox
function closeLightbox() {
  if (!lightbox) return;
  lightbox.style.display = "none";
  lightboxImg.src = "";
}

// ESC untuk tutup
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeLightbox();
});
/* ================= HERO SLIDER AUTO ================= */
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".hero-slide");
  let index = 0;

  setInterval(() => {
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
  }, 5000); // 5 detik
});
