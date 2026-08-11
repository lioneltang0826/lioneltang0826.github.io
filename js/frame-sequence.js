/*
  frame-sequence.js
  ------------------------------------------------------------
  Turns a div into a looping, autoplay "fake video" by cycling
  a sequence of still images as its background — no video file
  needed.

  Usage:
    <div class="service-hero frame-sequence"
         data-frames='["images/home-page/event-design-seq/frame01.jpg", "..."]'
         data-fps="12"
         style="background: <fallback gradient>;"></div>

  - data-frames: JSON array of image paths, in play order.
  - data-fps: playback speed (frames per second). Optional, defaults to 12.
  - If data-frames is empty or missing, the element is left alone —
    its existing inline background (gradient placeholder) just stays.
  - Frames are preloaded before playback starts, so there's no flicker.
  - Loops forever, forward only.
*/

function initFrameSequences(){
  document.querySelectorAll('.frame-sequence').forEach(el => {
    if(el.dataset.sequenceInit) return; // avoid double-init
    let frames = [];
    try{ frames = JSON.parse(el.dataset.frames || "[]"); }catch(e){ frames = []; }
    if(!frames.length) return; // no frames yet — keep placeholder gradient

    el.dataset.sequenceInit = "true";
    const fps = parseFloat(el.dataset.fps) || 12;
    const interval = 1000 / fps;

    // preload
    Promise.all(frames.map(src => new Promise(resolve => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = resolve;
      img.src = src;
    }))).then(() => {
      let i = 0;
      el.style.backgroundImage = `url('${frames[0]}')`;
      setInterval(() => {
        i = (i + 1) % frames.length;
        el.style.backgroundImage = `url('${frames[i]}')`;
      }, interval);
    });
  });
}

document.addEventListener('DOMContentLoaded', initFrameSequences);
