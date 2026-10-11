/* Progressive motion: content remains readable if this enhancement never loads. */
(() => {
  'use strict';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduced.matches || !('IntersectionObserver' in window) || !Element.prototype.animate) return;
  const animations = new Set();
  const targets = document.querySelectorAll('.portfolio-intro > *, .portfolio-section-heading, .portfolio-project, .about-note, .hero-copy, .hero-visual, .section-heading, .fa-product, .page-header');
  const observer = new IntersectionObserver(entries => {
    let order = 0;
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      const animation = entry.target.animate([
        { opacity: .25, translate: '0 14px' },
        { opacity: 1, translate: '0 0' }
      ], { duration: 620, delay: Math.min(order++ * 45, 135), easing: 'cubic-bezier(.2,.8,.2,1)' });
      animations.add(animation);
      animation.finished.then(() => animations.delete(animation)).catch(() => animations.delete(animation));
    }
  }, { threshold: .08 });
  targets.forEach(element => observer.observe(element));
  reduced.addEventListener('change', event => {
    if (!event.matches) return;
    observer.disconnect();
    animations.forEach(animation => animation.cancel());
    animations.clear();
  });
})();
