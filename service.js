// "others services" links — fire-and-forget hover animation.
// On pointer enter, add .on and hold it for the full 400ms cycle so a quick
// mouse sweep across all links still plays each animation to completion,
// matching the original (Tilda) behaviour where the animation doesn't reverse
// the instant the cursor leaves.
(function () {
  var DUR = 400;
  function init() {
    var links = document.querySelectorAll('.so-links a');
    links.forEach(function (a) {
      var timer = null;
      a.addEventListener('mouseenter', function () {
        a.classList.add('on');
        if (timer) clearTimeout(timer);
        timer = setTimeout(function () {
          timer = null;
          // in-cycle complete: if the cursor already left, reverse now
          if (!a.matches(':hover')) a.classList.remove('on');
        }, DUR);
      });
      a.addEventListener('mouseleave', function () {
        // cycle already finished → reverse immediately (like the original);
        // otherwise the pending timer reverses right when the cycle ends
        if (!timer) a.classList.remove('on');
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
