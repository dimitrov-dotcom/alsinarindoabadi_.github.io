// NAVBAR SCROLL EFFECT
window.addEventListener("scroll",()=>{
  document.querySelector(".nav")
    .classList.toggle("scrolled", window.scrollY>50);
});

// MOBILE MENU
function toggleMenu(){
  const menu=document.getElementById("menu");
  menu.style.display = menu.style.display==="flex"?"none":"flex";
}
// ===== LIGHTBOX GALLERY =====
document.querySelectorAll(".gallery-grid img").forEach(img=>{
  img.addEventListener("click",()=>{
    document.getElementById("lightbox-img").src = img.src;
    document.getElementById("lightbox").style.display = "flex";
  });
});

function closeLightbox(){
  document.getElementById("lightbox").style.display = "none";
}
