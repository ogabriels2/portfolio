/* Move once per element. Never fade already-painted photographs on scroll. */
(() => {
  'use strict';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!('IntersectionObserver' in window)) return;
  const animations = new Set();
  const selector = '.portfolio-intro > *, .portfolio-section-heading, .portfolio-project, .about-note, .hero-copy, .hero-visual, .section-heading, .fa-product, .page-header, .capability, .education-list li, .experience-list li, .contact-invitation, .contact-lead, .portfolio-contact-form';
  const targets = document.querySelectorAll(selector);
  const observer = new IntersectionObserver(entries => {
    let order = 0;
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      entry.target.dataset.motionSeen = 'true';
      if (reduced.matches || !Element.prototype.animate) continue;
      const animation = entry.target.animate([
        { translate: '0 18px' },
        { translate: '0 0' }
      ], { duration: 720, delay: Math.min(order++ * 55, 165), easing: 'cubic-bezier(.22,1,.36,1)' });
      animations.add(animation);
      animation.finished.then(() => animations.delete(animation)).catch(() => animations.delete(animation));
    }
  }, { threshold: .04 });
  targets.forEach(element => {
    // Nested entrants double the movement of a screenshot. Animate its outermost unit.
    if (!element.parentElement.closest(selector)) observer.observe(element);
  });
  reduced.addEventListener('change', event => {
    if (!event.matches) return;
    animations.forEach(animation => animation.cancel());
    animations.clear();
  });
  const chapters = [...document.querySelectorAll('.about-chapters a[href^="#"]')];
  if (!chapters.length) return;
  const visible = new Map();
  const sections = new IntersectionObserver(entries => {
    entries.forEach(entry => visible.set(entry.target.id, entry.isIntersecting));
    const active = chapters.find(link => visible.get(link.hash.slice(1)));
    chapters.forEach(link => active === link ? link.setAttribute('aria-current', 'location') : link.removeAttribute('aria-current'));
  }, { rootMargin: '-12% 0px -55% 0px', threshold: 0 });
  chapters.forEach(link => {
    const target = document.getElementById(link.hash.slice(1));
    if (target) sections.observe(target);
  });
})();
