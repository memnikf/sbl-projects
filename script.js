// Scale the fixed 1600px canvas to fit any viewport, keeping exact proportions.
(function () {
  var STAGE_W = 1600;
  var STAGE_H = 1782 + 320; // main board + footer board
  var stage = document.getElementById('stage');
  var viewport = document.getElementById('viewport');

  function fit() {
    var w = window.innerWidth;
    var scale = w < STAGE_W ? w / STAGE_W : 1;
    stage.style.transform = 'translateX(-800px) scale(' + scale + ')';
    viewport.style.height = STAGE_H * scale + 'px';
  }

  window.addEventListener('resize', fit, { passive: true });
  window.addEventListener('load', fit);
  fit();

  // Fade the page in once ready (Tilda-style appearance).
  requestAnimationFrame(function () { stage.classList.add('ready'); });
})();
