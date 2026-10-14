/* Presentations use the documentary's actual markup and native player initializer. */
(() => {
  'use strict';
  const factory = document.querySelector('#player-ballet') || document.createElement('div');
  if (!window.initializePortfolioVideo || (!factory.children.length && !window.portfolioVideoControls)) return;
  if (!factory.children.length) factory.innerHTML = window.portfolioVideoControls;
  const english = document.documentElement.lang.startsWith('en');
  const label = (pt, en) => english ? en : pt;
  const formatTime = seconds => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;

  document.querySelectorAll('[data-presentation-load]').forEach(preview => {
    const id = preview.dataset.videoId;
    const source = window.portfolioVideoSources?.[id];
    const frame = preview.closest('.presentation-frame');
    const card = frame.closest('.presentation-card');
    const panel = document.createElement('div');
    panel.className = 'film-player-panel presentation-panel';
    if (card) { frame.before(panel); panel.append(frame); }

    // Until a delivery URL is configured, the original source remains a working link.
    if (!source?.src && !source?.sources?.length) {
      preview.setAttribute('aria-label', label('Assistir à apresentação no YouTube', 'Watch the presentation on YouTube'));
      return;
    }

    const media = document.createElement('div');
    media.className = 'presentation-media video-container paused';
    media.id = `player-${id}`;
    const video = document.createElement('video');
    if (source.sources?.length) {
      source.sources.forEach(item => {
        const candidate = document.createElement('source'); candidate.src = item.src; candidate.type = item.type;
        video.append(candidate);
      });
    } else video.src = source.src;
    video.poster = preview.querySelector('img').getAttribute('src');
    video.preload = 'none'; video.playsInline = true;
    video.setAttribute('aria-label', preview.dataset.videoTitle);
    (source.tracks || []).forEach(item => {
      const track = document.createElement('track');
      track.kind = 'subtitles'; track.label = item.label; track.srclang = item.lang; track.src = item.src;
      video.append(track);
    });
    media.append(video);
    ['.center-controls', '.volume-feedback', '.controls-wrapper'].forEach(selector => {
      media.append(factory.querySelector(selector).cloneNode(true));
    });
    media.querySelectorAll('[id]').forEach(element => {
      const old = element.id;
      element.id = `${old}-${id}`;
      media.querySelector(`[aria-controls="${old}"]`)?.setAttribute('aria-controls', element.id);
    });
    media.querySelectorAll('.show, .icon-pulse, .anim-rotate-left, .anim-rotate-right').forEach(element => {
      element.classList.remove('show', 'icon-pulse', 'anim-rotate-left', 'anim-rotate-right');
    });
    media.querySelector('.main-play i').className = 'fa-solid fa-play';
    media.querySelector('.play-pause-btn i').className = 'fa-solid fa-play';
    media.querySelector('.mute-btn i').className = 'fa-solid fa-volume-high';
    media.querySelector('.time-display').textContent = `0:00 / ${formatTime(source.duration || 0)}`;
    media.querySelector('.volume-fill').style.width = '100%';
    media.querySelectorAll('.progress-bar, .buffer-bar, .hover-bar').forEach(element => element.style.width = '0%');
    media.querySelectorAll('.control-btn').forEach(button => {
      button.classList.remove('active');
      if (button.hasAttribute('aria-pressed')) button.setAttribute('aria-pressed', 'false');
      if (button.hasAttribute('aria-expanded')) button.setAttribute('aria-expanded', 'false');
    });
    media.querySelector('.time-display').title = label('Clique para alternar o formato do tempo', 'Click to change the time format');
    media.querySelector('.speed-btn').setAttribute('aria-label', label('Velocidade de reprodução: normal', 'Playback speed: normal'));
    media.querySelector('.speed-btn').title = label('Velocidade: normal', 'Speed: normal');
    media.querySelector('.speed-menu').setAttribute('aria-label', label('Opções de velocidade', 'Speed options'));
    media.querySelector('.captions-menu').setAttribute('aria-label', label('Opções de legenda', 'Caption options'));
    const menu = media.querySelector('.captions-menu');
    menu.replaceChildren();
    [{ lang: 'off', label: label('Desativado', 'Off') }, ...(source.tracks || [])].forEach(item => {
      const button = document.createElement('button'); button.type = 'button'; button.className = 'caption-option';
      button.dataset.lang = item.lang; button.textContent = item.label;
      button.classList.toggle('active', item.lang === 'off');
      menu.append(button);
    });
    frame.replaceWith(media);
    window.initializePortfolioVideo(media);
    // Prepare only nearby media, without downloading every presentation on entry.
    const connection = navigator.connection;
    const constrained = connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType || '');
    let prepared = false;
    const prepare = () => {
      if (prepared || !video.paused || video.readyState > 0) return;
      prepared = true; video.preload = 'metadata'; video.load();
    };
    if (!constrained) {
      media.addEventListener('pointerenter', prepare, { once: true });
      media.addEventListener('focusin', prepare, { once: true });
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
          if (entries.some(entry => entry.isIntersecting)) { prepare(); observer.disconnect(); }
        }, { rootMargin: '300px 0px' });
        observer.observe(media);
      }
    }
    const stop = card?.querySelector('[data-presentation-close]');
    video.addEventListener('play', () => { if (stop) stop.hidden = false; });
    video.addEventListener('progress', () => {
      if (video.buffered.length && video.duration) media.querySelector('.buffer-bar').style.width = `${video.buffered.end(video.buffered.length - 1) / video.duration * 100}%`;
    });
    video.addEventListener('error', () => {
      video.pause(); media.classList.add('unavailable');
      if (media.querySelector('.presentation-error')) return;
      const notice = document.createElement('p'); notice.className = 'presentation-error'; notice.setAttribute('role', 'status');
      notice.textContent = label('O vídeo está indisponível no momento. Use o link do YouTube para assistir.', 'The video is currently unavailable. Use the YouTube link to watch it.');
      media.append(notice);
    });
    stop?.addEventListener('click', () => {
      video.pause(); video.currentTime = 0;
      media.classList.remove('has-played', 'user-inactive', 'mobile-controls-active');
      stop.hidden = true; media.querySelector('.main-play').focus();
    });
  });
})();
