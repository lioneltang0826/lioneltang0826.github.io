/*
  gallery-lightbox.js
  ------------------------------------------------------------
  Shared logic for rendering a grid of project thumbnails and
  opening them into a slideshow modal (title + brief + images/
  video). Used by index.html (homepage "Work" section) and by
  each gallery-<category>.html page.

  Requires projects-data.js to be loaded first (defines PROJECTS).
  Requires gallery-lightbox.css to be linked for styling.
*/

const DEFAULT_GRADIENT = "radial-gradient(circle at 45% 32%, #fff 0%, #eceee2 22%, #a9b98d 55%, #566b42 85%, #303f24 100%)";

function projectsByCategory(category){
  return (typeof PROJECTS !== "undefined" ? PROJECTS : []).filter(p => p.category === category);
}

function featuredProjects(limit){
  const list = (typeof PROJECTS !== "undefined" ? PROJECTS : []).filter(p => p.featured);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

function thumbBackground(p){
  return p.thumbnail ? `url('${p.thumbnail}') center/cover no-repeat` : (p.placeholderGradient || DEFAULT_GRADIENT);
}

function mediaSlides(p){
  const slides = [];
  if(p.video) slides.push({ type: "video", src: p.video });
  if(p.images && p.images.length) p.images.forEach(src => slides.push({ type: "image", src }));
  if(slides.length === 0) slides.push({ type: "placeholder", src: p.placeholderGradient || DEFAULT_GRADIENT });
  return slides;
}

function renderThumbGrid(container, projectsList){
  if(!container) return;
  container.innerHTML = "";
  projectsList.forEach(p => {
    const card = document.createElement("div");
    card.className = "thumb";
    card.setAttribute("data-slug", p.slug);
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", `View ${p.title}`);
    card.innerHTML = `
      <div class="thumb-media" style="background:${thumbBackground(p)};"></div>
      <div class="thumb-overlay">
        <div class="thumb-info">
          <div class="cat">${p.category}</div>
          <h3>${p.title}</h3>
        </div>
      </div>`;
    card.addEventListener("click", () => openLightbox(p));
    card.addEventListener("keydown", (e) => { if(e.key === "Enter" || e.key === " "){ e.preventDefault(); openLightbox(p); } });
    container.appendChild(card);
  });
}

/* ---------------- lightbox ---------------- */
let LB_project = null;
let LB_index = 0;

function ensureLightboxMarkup(){
  if(document.getElementById("modalScrim")) return;
  const wrap = document.createElement("div");
  wrap.innerHTML = `
    <div class="modal-scrim" id="modalScrim">
      <div class="modal">
        <button class="modal-close" id="modalClose" aria-label="Close">✕</button>
        <div class="modal-visual" id="modalVisual">
          <button class="modal-nav modal-prev" id="modalPrev" aria-label="Previous">‹</button>
          <button class="modal-nav modal-next" id="modalNext" aria-label="Next">›</button>
          <div class="modal-dots" id="modalDots"></div>
        </div>
        <div class="modal-info">
          <div class="cat" id="modalCat"></div>
          <h3 id="modalTitle"></h3>
          <p id="modalBrief"></p>
        </div>
      </div>
    </div>`;
  document.body.appendChild(wrap.firstElementChild);

  document.getElementById("modalClose").addEventListener("click", closeLightbox);
  document.getElementById("modalScrim").addEventListener("click", (e) => { if(e.target.id === "modalScrim") closeLightbox(); });
  document.getElementById("modalNext").addEventListener("click", nextSlide);
  document.getElementById("modalPrev").addEventListener("click", prevSlide);
  document.addEventListener("keydown", (e) => {
    const scrim = document.getElementById("modalScrim");
    if(!scrim || !scrim.classList.contains("open")) return;
    if(e.key === "Escape") closeLightbox();
    if(e.key === "ArrowRight") nextSlide();
    if(e.key === "ArrowLeft") prevSlide();
  });
}

function openLightbox(project){
  ensureLightboxMarkup();
  LB_project = project;
  LB_index = 0;
  document.getElementById("modalCat").textContent = project.category;
  document.getElementById("modalTitle").textContent = project.title;
  document.getElementById("modalBrief").textContent = project.brief || "";
  renderSlide();
  document.getElementById("modalScrim").classList.add("open");
}

function closeLightbox(){
  const scrim = document.getElementById("modalScrim");
  if(scrim) scrim.classList.remove("open");
  const visual = document.getElementById("modalVisual");
  if(visual) visual.querySelectorAll("iframe").forEach(el => el.remove()); // stop playback
}

function renderSlide(dir){
  const slides = mediaSlides(LB_project);
  const visual = document.getElementById("modalVisual");
  visual.querySelectorAll(".slide-media, iframe").forEach(el => el.remove());
  const slide = slides[LB_index];

  let el;
  if(slide.type === "video"){
    el = document.createElement("iframe");
    el.src = slide.src;
    el.allow = "autoplay; fullscreen; picture-in-picture";
    el.allowFullscreen = true;
  } else {
    el = document.createElement("div");
    el.className = "slide-media";
    el.style.background = slide.type === "image" ? `url('${slide.src}') center/cover no-repeat` : slide.src;
  }
  el.style.setProperty("--dir", dir || 0);
  visual.insertBefore(el, visual.firstChild);

  const dots = document.getElementById("modalDots");
  dots.innerHTML = slides.map((_, i) => `<span class="${i === LB_index ? "active" : ""}"></span>`).join("");
}

function nextSlide(){ const s = mediaSlides(LB_project); LB_index = (LB_index + 1) % s.length; renderSlide(1); }
function prevSlide(){ const s = mediaSlides(LB_project); LB_index = (LB_index - 1 + s.length) % s.length; renderSlide(-1); }
