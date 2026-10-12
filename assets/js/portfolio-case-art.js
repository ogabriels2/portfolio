(() => {
  'use strict';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('[data-art-panels]').forEach(root => {
    const controls = [...root.querySelectorAll('[data-art-select]')];
    const panels = [...root.querySelectorAll('[data-art-panel]')];
    // With scripts disabled, all evidence is readable in document order.
    root.classList.add('art-enhanced');
    const select = key => {
      controls.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.artSelect === key)));
      panels.forEach(panel => { panel.hidden = panel.dataset.artPanel !== key; });
    };
    controls.forEach(button => button.addEventListener('click', () => select(button.dataset.artSelect)));
    select(root.dataset.artInitial || controls[0]?.dataset.artSelect);
  });
  document.querySelectorAll('[data-brand-study]').forEach(root => {
    const image = root.querySelector('[data-brand-image]');
    const stage = root.querySelector('[data-brand-stage]');
    const buttons = [...root.querySelectorAll('[data-brand-source]')];
    buttons.forEach(button => button.addEventListener('click', () => {
      image.src = button.dataset.brandSource;
      image.alt = button.dataset.brandAlt;
      stage.dataset.brandSurface = button.dataset.brandSurface;
      buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    }));
  });
  document.querySelectorAll('[data-thumbnail-study]').forEach(root => {
    const stage = root.querySelector('[data-thumbnail-stage]');
    const buttons = [...root.querySelectorAll('[data-thumbnail-size]')];
    buttons.forEach(button => button.addEventListener('click', () => {
      stage.style.setProperty('--study-width', `${button.dataset.thumbnailSize}px`);
      buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    }));
  });
  document.querySelectorAll('[data-banner-study]').forEach(root => {
    const view = root.querySelector('[data-banner-window]');
    const buttons = [...root.querySelectorAll('[data-banner-crop]')];
    buttons.forEach(button => button.addEventListener('click', () => {
      view.dataset.crop = button.dataset.bannerCrop;
      buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    }));
  });
  document.querySelectorAll('[data-preset-demo]').forEach(root => {
    let animation;
    root.querySelectorAll('[data-preset]').forEach(button => button.addEventListener('click', () => {
      if (reduced.matches) return;
      cancelAnimationFrame(animation);
      const list = root.querySelector('[data-preset-ranking]');
      list.classList.remove('is-reordering');
      animation = requestAnimationFrame(() => {
        // tech-cases.js has already updated the genuine preset order.
        list.classList.add('is-reordering');
      });
    }));
  });
})();
