/* Public videos load when requested; original covers also link to YouTube without JS. */
(() => {
  'use strict';
  const allowed = new Set(['zP2FtC3UwZY', 'mcEqvz35Fjw', 'BpA8mLzkT_E']);
  const covers = new Map();
  function restorePlayers(except) {
    covers.forEach((cover, host) => {
      if (host === except || !host.querySelector('iframe')) return;
      // Removing the previous player reliably stops audio; its original cover returns.
      const restored = cover.cloneNode(true);
      host.replaceChildren(restored);
      bind(restored);
    });
  }
  function bind(preview) {
    const host = preview.closest('.presentation-frame');
    if (!host) return;
    if (!covers.has(host)) covers.set(host, preview.cloneNode(true));
    preview.addEventListener('click', event => {
      const id = preview.dataset.videoId;
      if (!allowed.has(id)) return;
      event.preventDefault();
      restorePlayers(host);
      document.querySelectorAll('.video-container').forEach(container => {
        const video = container.querySelector('video');
        if (!video || video.paused) return;
        if (typeof container.togglePlay === 'function') container.togglePlay(false);
        else video.pause();
      });
      const frame = document.createElement('iframe');
      frame.src = `https://www.youtube-nocookie.com/embed/${id}?rel=0&autoplay=1`;
      frame.title = preview.dataset.videoTitle;
      frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      frame.allowFullscreen = true;
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      frame.tabIndex = 0;
      host.replaceChildren(frame);
      frame.focus();
    });
  }
  document.querySelectorAll('[data-presentation-load]').forEach(bind);
  document.querySelectorAll('.video-container video').forEach(video => {
    video.addEventListener('play', () => restorePlayers(null));
  });
})();
