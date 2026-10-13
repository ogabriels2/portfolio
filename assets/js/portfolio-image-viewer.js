/* Project captures can be browsed without leaving the case study. */
(() => {
  'use strict';

  const sources = [...document.querySelectorAll('img[data-enlarge]')];
  if (!sources.length || !window.PortfolioShell) return;

  const en = document.documentElement.lang.startsWith('en');
  const text = en
    ? { close: 'Close image', fit: 'Fit to screen', original: 'Original size', previous: 'Previous image', next: 'Next image', images: 'Image navigation', show: 'Show image' }
    : { close: 'Fechar imagem', fit: 'Ajustar à tela', original: 'Tamanho original', previous: 'Imagem anterior', next: 'Próxima imagem', images: 'Navegação das imagens', show: 'Mostrar imagem' };
  const keyFor = value => {
    try { return new URL(value, document.baseURI).href; }
    catch { return value; }
  };

  const entries = [];
  const seen = new Set();
  sources.forEach(source => {
    const src = source.currentSrc || source.src;
    const key = keyFor(src);
    if (!src || seen.has(key)) return;
    seen.add(key);
    entries.push({ key, src, alt: source.alt || '', source });
  });

  const viewer = document.createElement('div');
  viewer.id = 'portfolioImageViewer';
  viewer.className = 'portfolio-image-viewer';
  viewer.dataset.portfolioDialog = '';
  viewer.setAttribute('aria-label', en ? 'Project image viewer' : 'Visualizador de imagens do projeto');
  viewer.hidden = true;
  viewer.innerHTML = `
    <div class="image-viewer-toolbar">
      <p id="imageViewerCaption"></p>
      <button type="button" class="image-viewer-zoom" aria-pressed="false"><i class="fa-solid fa-magnifying-glass-plus" aria-hidden="true"></i><span></span></button>
      <button type="button" class="js-popup-close" aria-label="${text.close}"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>
    </div>
    <div class="image-viewer-media">
      <div class="image-viewer-stage">
        <button type="button" class="image-viewer-arrow image-viewer-previous" aria-label="${text.previous}"><i class="fa-solid fa-chevron-left" aria-hidden="true"></i></button>
        <img alt="">
        <button type="button" class="image-viewer-arrow image-viewer-next" aria-label="${text.next}"><i class="fa-solid fa-chevron-right" aria-hidden="true"></i></button>
      </div>
      <nav class="image-viewer-rail" aria-label="${text.images}">
        <span class="image-viewer-counter" aria-live="polite" aria-atomic="true"></span>
        <div class="image-viewer-thumbnails"></div>
      </nav>
    </div>`;
  document.body.append(viewer);

  const image = viewer.querySelector('.image-viewer-stage img');
  const caption = viewer.querySelector('#imageViewerCaption');
  const zoom = viewer.querySelector('.image-viewer-zoom');
  const media = viewer.querySelector('.image-viewer-media');
  const stage = viewer.querySelector('.image-viewer-stage');
  const counter = viewer.querySelector('.image-viewer-counter');
  const rail = viewer.querySelector('.image-viewer-rail');
  const thumbnails = viewer.querySelector('.image-viewer-thumbnails');
  const previous = viewer.querySelector('.image-viewer-previous');
  const next = viewer.querySelector('.image-viewer-next');
  let currentIndex = 0;
  let touchStart = null;

  function syncZoom(original) {
    viewer.classList.toggle('original-size', original);
    zoom.setAttribute('aria-pressed', String(original));
    const label = original ? text.fit : text.original;
    zoom.querySelector('i').className = `fa-solid fa-magnifying-glass-${original ? 'minus' : 'plus'}`;
    zoom.querySelector('span').textContent = label;
    zoom.setAttribute('aria-label', label);
    zoom.title = label;
  }

  function fit() {
    syncZoom(false);
    media.scrollTop = 0;
    media.scrollLeft = 0;
  }

  function renderThumbnails() {
    thumbnails.replaceChildren();
    entries.forEach((entry, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'image-viewer-thumb';
      button.setAttribute('aria-label', `${text.show} ${index + 1}: ${entry.alt || entry.src}`);
      button.setAttribute('aria-current', 'false');
      const thumb = document.createElement('img');
      thumb.src = entry.src;
      thumb.alt = '';
      thumb.loading = 'lazy';
      thumb.decoding = 'async';
      button.append(thumb);
      button.addEventListener('click', () => show(index));
      thumbnails.append(button);
    });
    const showNavigation = entries.length > 1;
    rail.hidden = !showNavigation;
    previous.hidden = !showNavigation;
    next.hidden = !showNavigation;
  }

  function show(index) {
    if (!entries.length) return;
    currentIndex = (index + entries.length) % entries.length;
    const entry = entries[currentIndex];
    image.src = entry.src;
    image.alt = entry.alt;
    caption.textContent = entry.alt;
    fit();
    if (entries.length > 1) {
      counter.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(entries.length).padStart(2, '0')}`;
      [...thumbnails.children].forEach((button, buttonIndex) => {
        const active = buttonIndex === currentIndex;
        button.setAttribute('aria-current', String(active));
        if (active) {
          const center = button.offsetLeft + button.offsetWidth / 2;
          thumbnails.scrollTo({ left: center - thumbnails.clientWidth / 2, behavior: 'smooth' });
        }
      });
    }
  }

  function open(source) {
    const src = source.currentSrc || source.src;
    let index = entries.findIndex(entry => entry.key === keyFor(src));
    if (index < 0) {
      const key = keyFor(src);
      entries.push({ key, src, alt: source.alt || '', source });
      index = entries.length - 1;
      renderThumbnails();
    }
    renderThumbnails();
    show(index);
    window.PortfolioShell.openDialog(viewer, source);
  }

  zoom.addEventListener('click', () => syncZoom(!viewer.classList.contains('original-size')));
  previous.addEventListener('click', () => show(currentIndex - 1));
  next.addEventListener('click', () => show(currentIndex + 1));

  viewer.addEventListener('keydown', event => {
    if (viewer.hidden || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowLeft' && entries.length > 1) { event.preventDefault(); show(currentIndex - 1); }
    if (event.key === 'ArrowRight' && entries.length > 1) { event.preventDefault(); show(currentIndex + 1); }
  });

  stage.addEventListener('pointerdown', event => {
    if (event.pointerType === 'touch') touchStart = [event.clientX, event.clientY];
  });
  stage.addEventListener('pointerup', event => {
    if (!touchStart || event.pointerType !== 'touch') return;
    const [startX, startY] = touchStart;
    touchStart = null;
    const dx = event.clientX - startX;
    const dy = event.clientY - startY;
    if (entries.length > 1 && Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.25) show(currentIndex + (dx < 0 ? 1 : -1));
  });
  stage.addEventListener('pointercancel', () => { touchStart = null; });

  renderThumbnails();
  syncZoom(false);
  sources.forEach(source => {
    source.tabIndex = 0;
    source.setAttribute('role', 'button');
    source.setAttribute('aria-haspopup', 'dialog');
    source.setAttribute('aria-controls', viewer.id);
    source.setAttribute('aria-label', `${source.alt || text.show}. ${en ? 'Open image viewer' : 'Abrir visualizador de imagens'}`);
    source.addEventListener('click', () => open(source));
    source.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(source); }
    });
  });

  window.PortfolioShell.init();
})();
