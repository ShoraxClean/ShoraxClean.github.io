function toggleDiscover(e) {
  e.preventDefault();
  var s = document.getElementById('discover');
  var b = e.currentTarget;
  var willOpen = s.hidden;
  s.hidden = !willOpen;
  b.textContent = willOpen ? 'Hide ShoraX' : 'Discover ShoraX';
  if (willOpen) { s.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
}
window.addEventListener('scroll', function () {
  var s = document.getElementById('discover');
  if (!s || s.hidden) return;
  if (s.getBoundingClientRect().bottom < 80) {
    s.hidden = true;
    var b = document.querySelector('a[onclick="toggleDiscover(event)"]');
    if (b) { b.textContent = 'Discover ShoraX'; }
  }
}, { passive: true });

(function () {
  document.querySelectorAll('.flip').forEach(function (flip) {
    var vid = flip.querySelector('video');
    if (!vid) return;
    function playDemo() {
      if (flip.classList.contains('is-flipped')) return;
      flip.classList.add('is-flipped');
      vid.currentTime = 0;
      var p = vid.play();
      if (p && p.catch) { p.catch(function () { flip.classList.remove('is-flipped'); }); }
    }
    function endDemo() { flip.classList.remove('is-flipped'); }
    flip.addEventListener('mouseenter', playDemo);
    if (flip.hasAttribute('data-reset-on-leave')) {
      flip.addEventListener('mouseleave', function () {
        vid.pause();
        vid.currentTime = 0;
        endDemo();
      });
    }
    flip.addEventListener('touchstart', playDemo, { passive: true });
    flip.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); playDemo(); }
    });
    vid.addEventListener('ended', endDemo);
    vid.addEventListener('error', endDemo);
  });
})();
