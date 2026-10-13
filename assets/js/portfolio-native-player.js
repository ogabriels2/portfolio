(() => {
  'use strict';
  const english = document.documentElement.lang.startsWith('en');
  const label = (pt, en) => english ? en : pt;
  window.portfolioVideoControls = "<div class=\"center-controls\">\n\n            <div class=\"center-btn skip-btn\" data-skip=\"-10\">\n\n              <i class=\"fa-solid fa-rotate-left\"></i>\n\n              <div class=\"skip-text-popup\">-10</div>\n\n            </div>\n\n            <div class=\"center-btn main-play\"><i class=\"fa-solid fa-play\"></i></div>\n\n            <div class=\"center-btn skip-btn\" data-skip=\"10\">\n\n              <i class=\"fa-solid fa-rotate-right\"></i>\n\n              <div class=\"skip-text-popup\">+10</div>\n\n            </div>\n\n          </div>\n\n          <div class=\"volume-feedback\">50%</div>\n\n          <div class=\"controls-wrapper\">\n\n            <div class=\"timeline-container\">\n\n              <div class=\"time-tooltip\">00:00</div>\n\n              <div class=\"timeline\">\n\n                <div class=\"buffer-bar\"></div>\n\n                <div class=\"hover-bar\"></div>\n\n                <div class=\"progress-bar\"><div class=\"scrubber-knob\"></div></div>\n\n              </div>\n\n            </div>\n\n            <div class=\"controls-row\">\n\n              <div class=\"controls-left\">\n\n                <button type=\"button\" class=\"control-btn play-pause-btn\" aria-label=\"Reprodução do vídeo\" aria-pressed=\"false\"><i class=\"fa-solid fa-play\"></i></button>\n\n                <div class=\"volume-container\">\n\n                  <button type=\"button\" class=\"control-btn mute-btn\" aria-label=\"Áudio do vídeo\" aria-pressed=\"false\"><i class=\"fa-solid fa-volume-high\"></i></button>\n\n                  <div class=\"volume-slider-container\">\n\n                    <div class=\"volume-tooltip\">100</div>\n\n                    <div class=\"volume-bg\">\n\n                      <div class=\"volume-fill\"><div class=\"volume-knob\"></div></div>\n\n                    </div>\n\n                  </div>\n\n                </div>\n\n                <button type=\"button\" class=\"time-display\" title=\"Clique para alternar o formato do tempo\">0:00 / 0:00</button>\n\n              </div>\n\n              <div class=\"controls-right\">\n\n                <div class=\"speed-container\">\n\n                  <button type=\"button\" class=\"control-btn speed-btn\" title=\"Velocidade: normal\" aria-label=\"Velocidade de reprodução: normal\" aria-expanded=\"false\" aria-controls=\"speedMenuOptions\"><i class=\"fa-solid fa-gauge-high\"></i></button>\n\n                  <div class=\"speed-menu\" id=\"speedMenuOptions\" role=\"group\" aria-label=\"Opções de velocidade\">\n\n                    <button class=\"caption-option\" data-speed=\"0.5\">0.5x</button>\n\n                    <button class=\"caption-option\" data-speed=\"0.75\">0.75x</button>\n\n                    <button class=\"caption-option active\" data-speed=\"1\">Normal</button>\n\n                    <button class=\"caption-option\" data-speed=\"1.25\">1.25x</button>\n\n                    <button class=\"caption-option\" data-speed=\"1.5\">1.5x</button>\n\n                    <button class=\"caption-option\" data-speed=\"2\">2x</button>\n\n                  </div>\n\n                </div>\n\n                <div class=\"captions-container\">\n\n                  <button type=\"button\" class=\"control-btn captions-btn\" aria-label=\"Legendas desativadas\" aria-pressed=\"false\" aria-expanded=\"false\" aria-controls=\"captionMenuOptions\"><i class=\"fa-regular fa-closed-captioning\"></i></button>\n\n                  <div class=\"captions-menu\" id=\"captionMenuOptions\" role=\"group\" aria-label=\"Opções de legenda\">\n\n                    <button class=\"caption-option active\" data-lang=\"off\">Desativado</button>\n\n                    <button class=\"caption-option\" data-lang=\"pt\">Português</button>\n\n                  </div>\n\n                </div>\n\n                <button type=\"button\" class=\"control-btn fullscreen-btn\" aria-label=\"Tela cheia\" aria-pressed=\"false\"><i class=\"fa-solid fa-expand\"></i></button>\n\n              </div>\n\n            </div>\n\n          </div>";
    // --- VIDEO PLAYER LOGIC (GOLD MASTER) ---
    let activePlayerContainer = null;
    window.initializePortfolioVideo = container => {
      const video = container.querySelector('video');
      if (!video || container.dataset.nativePlayerReady) return;
      container.dataset.nativePlayerReady = 'true';
      const centerControls = container.querySelector('.center-controls');
      const mainPlayBtn = centerControls?.querySelector('.main-play');
      const skipBtns = centerControls?.querySelectorAll('.skip-btn');
      centerControls?.querySelectorAll('.center-btn').forEach(button => {
        button.tabIndex = 0; button.setAttribute('role', 'button');
        button.setAttribute('aria-label', button.dataset.skip ? (Number(button.dataset.skip) < 0 ? label("Voltar 10 segundos", "Back 10 seconds") : label("Avançar 10 segundos", "Forward 10 seconds")) : label("Reproduzir vídeo", "Play video"));
        button.addEventListener('keydown', event => {
          if (event.key === ' ' || event.key === 'Enter') { event.preventDefault(); event.stopPropagation(); button.click(); }
        });
      });

      const playBtn = container.querySelector('.play-pause-btn');
      playBtn?.setAttribute('aria-label', label('Reprodução do vídeo', 'Video playback'));
      const icon = playBtn?.querySelector('i');
      function syncPlaybackButton() {
        const playing = !video.paused && !video.ended;
        container.classList.toggle('paused', !playing); container.classList.toggle('playing', playing);
        if (playing) container.classList.add('has-played');
        else container.classList.remove('user-inactive');
        if (icon) icon.className = playing ? 'fa-solid fa-pause' : 'fa-solid fa-play';
        if (mainPlayBtn) mainPlayBtn.querySelector('i').className = playing ? 'fa-solid fa-pause' : 'fa-solid fa-play';
        mainPlayBtn?.setAttribute('aria-label', playing ? label("Pausar vídeo", "Pause video") : label("Reproduzir vídeo", "Play video"));
        playBtn?.setAttribute('aria-pressed', String(playing));
        if (playBtn) playBtn.title = playing ? label("Pausar vídeo", "Pause video") : label("Reproduzir vídeo", "Play video");
      }
      video.addEventListener('play', syncPlaybackButton); video.addEventListener('pause', syncPlaybackButton); video.addEventListener('ended', syncPlaybackButton); syncPlaybackButton();
      const timelineContainer = container.querySelector('.timeline-container');
      const progressBar = container.querySelector('.progress-bar');
      const timeTooltip = container.querySelector('.time-tooltip');
      const timeDisplay = container.querySelector('.time-display');
      const muteBtn = container.querySelector('.mute-btn');
      const volumeSlider = container.querySelector('.volume-slider-container');
      const volumeFill = container.querySelector('.volume-fill');
      const volumeTooltip = container.querySelector('.volume-tooltip');
      const volumeFeedback = container.querySelector('.volume-feedback');
      const fullscreenBtn = container.querySelector('.fullscreen-btn'); function syncMuteButton() { const muted = video.muted; const title = muted ? label("Ativar áudio", "Unmute") : label("Desativar áudio", "Mute"); muteBtn?.setAttribute('aria-pressed', String(muted)); muteBtn?.setAttribute('aria-label', label("Áudio do vídeo", "Video audio")); if (muteBtn) muteBtn.title = title; } video.addEventListener('volumechange', syncMuteButton); syncMuteButton();
      const captionBtn = container.querySelector('.captions-btn');
      const captionMenu = container.querySelector('.captions-menu');
      const captionOptions = container.querySelectorAll('.captions-menu .caption-option');
      const speedBtn = container.querySelector('.speed-btn');
      const speedMenu = container.querySelector('.speed-menu');
      const speedOptions = container.querySelectorAll('.speed-menu .caption-option');
      captionBtn?.setAttribute('aria-label', label('Legendas desativadas', 'Captions off'));
      captionMenu?.setAttribute('aria-label', label('Opções de legenda', 'Caption options'));
      speedMenu?.setAttribute('aria-label', label('Opções de velocidade', 'Speed options'));

      let isScrubbing = false; let isDraggingVolume = false; let wasPausedBeforeScrubbing = true;
      let inactivityTimeout; let briefControlsTimeout; let volumeFeedbackTimeout;
      let timeDisplayMode = 0; let lastTapTime = 0;

      container.addEventListener('mouseenter', () => activePlayerContainer = container);
      container.addEventListener('focusin', () => activePlayerContainer = container);
      container.addEventListener('click', (e) => {
        if (e.target.closest('.controls-wrapper') || e.target.closest('.center-btn')) return;
        const isMobile = window.matchMedia('(pointer: coarse)').matches;
        const now = new Date().getTime(); const timeSinceLastTap = now - lastTapTime;
        if (isMobile) {
            if (timeSinceLastTap < 300 && timeSinceLastTap > 0) {
                const rect = container.getBoundingClientRect(); const x = e.clientX - rect.left; const width = rect.width;
                if (x < width * 0.35) container.skip(-10);
                else if (x > width * 0.65) container.skip(10);
                else { container.classList.toggle('mobile-controls-active'); if(container.classList.contains('mobile-controls-active')) resetInactivityTimer(); }
                lastTapTime = 0;
            } else {
                container.classList.toggle('mobile-controls-active');
                if(container.classList.contains('mobile-controls-active')) resetInactivityTimer();
                lastTapTime = now;
            }
        } else { activePlayerContainer = container; togglePlay(); }
      });

      container.addEventListener('dblclick', (e) => { if (!window.matchMedia('(pointer: coarse)').matches) { if (e.target.closest('.controls-wrapper') || e.target.closest('.center-btn')) return; toggleFS(); } });
      window.matchMedia("(orientation: landscape)").addEventListener("change", (e) => { const isMobile = window.matchMedia('(pointer: coarse)').matches; if (e.matches && isMobile && !video.paused) { const rect = container.getBoundingClientRect(); if (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) { container.requestFullscreen().catch(err => { console.log("Auto-FS blocked:", err); }); } } });

      function resetInactivityTimer() {
        if (container.classList.contains('show-controls-briefly')) return;
        container.classList.remove('user-inactive'); clearTimeout(inactivityTimeout);
        if (!video.paused) { inactivityTimeout = setTimeout(() => { if (!container.matches(':hover') || !container.querySelector('.controls-wrapper:hover')) { container.classList.add('user-inactive'); container.classList.remove('mobile-controls-active'); } }, 2500); }
      }
      container.addEventListener('mousemove', resetInactivityTimer); container.addEventListener('mousedown', resetInactivityTimer); container.addEventListener('touchstart', resetInactivityTimer);

      function showControlsBriefly() { clearTimeout(inactivityTimeout); clearTimeout(briefControlsTimeout); container.classList.remove('user-inactive'); container.classList.add('show-controls-briefly'); briefControlsTimeout = setTimeout(() => { container.classList.remove('show-controls-briefly'); resetInactivityTimer(); }, 2000); }

      function togglePlay() {
        if (video.paused) { document.querySelectorAll('video').forEach(v => { if(v !== video) v.pause() }); video.play().then(resetInactivityTimer).catch(syncPlaybackButton); }
        else { video.pause(); container.classList.add('paused'); container.classList.remove('playing'); container.classList.remove('user-inactive'); container.classList.add('mobile-controls-active'); if(icon) icon.className = 'fa-solid fa-play'; if(mainPlayBtn) mainPlayBtn.innerHTML = '<i class="fa-solid fa-play"></i>'; clearTimeout(inactivityTimeout); }
      }

      function handleTimelineUpdate(e) { if (!Number.isFinite(video.duration)) return; const rect = timelineContainer.getBoundingClientRect(); if (!rect.width) return; const percent = Math.min(Math.max(0, e.clientX - rect.left), rect.width) / rect.width; const hoverTime = percent * video.duration; if (isScrubbing) { if (e.cancelable) e.preventDefault(); progressBar.style.width = `${percent * 100}%`; video.currentTime = hoverTime; } const hoverBar = container.querySelector('.hover-bar'); if(hoverBar) hoverBar.style.width = `${percent * 100}%`; if (timeTooltip) { timeTooltip.style.left = `${percent * 100}%`; timeTooltip.textContent = formatTime(hoverTime); } }
      timelineContainer.addEventListener('pointerdown', (e) => { if (e.button !== 0 || !Number.isFinite(video.duration)) return; e.preventDefault(); timelineContainer.setPointerCapture(e.pointerId); isScrubbing = true; wasPausedBeforeScrubbing = video.paused; video.pause(); container.classList.add('scrubbing'); handleTimelineUpdate(e); });
      timelineContainer.addEventListener('pointermove', handleTimelineUpdate);

      function updateVolume(e) { const rect = volumeSlider.getBoundingClientRect(); const percent = Math.min(Math.max(0, e.clientX - rect.left), rect.width) / rect.width; if (isDraggingVolume) { video.volume = percent; video.muted = percent === 0; } const displayVol = isDraggingVolume ? percent : video.volume; volumeFill.style.width = `${displayVol * 100}%`; if (volumeTooltip) { volumeTooltip.textContent = Math.round(displayVol * 100); volumeTooltip.style.left = `${displayVol * 100}%`; } const vIcon = muteBtn.querySelector('i'); vIcon.className = video.muted || displayVol === 0 ? 'fa-solid fa-volume-xmark' : (displayVol < 0.5 ? 'fa-solid fa-volume-low' : 'fa-solid fa-volume-high'); }
      volumeSlider.addEventListener('mousemove', (e) => { if (!isDraggingVolume) { const rect = volumeSlider.getBoundingClientRect(); const percent = Math.min(Math.max(0, e.clientX - rect.left), rect.width) / rect.width; if (volumeTooltip) { volumeTooltip.textContent = Math.round(percent * 100); volumeTooltip.style.left = `${percent * 100}%`; } } });
      volumeSlider.addEventListener('pointerdown', (e) => { if (e.button !== 0) return; e.preventDefault(); volumeSlider.setPointerCapture(e.pointerId); isDraggingVolume = true; container.querySelector('.volume-container').classList.add('dragging'); updateVolume(e); triggerVolumeVisualFeedback(); });
      document.addEventListener('pointermove', (e) => { if (isScrubbing) handleTimelineUpdate(e); if (isDraggingVolume) updateVolume(e); });
      function finishPointerInteraction() { if (isScrubbing) { isScrubbing = false; container.classList.remove('scrubbing'); if (!wasPausedBeforeScrubbing) togglePlay(); } if (isDraggingVolume) { isDraggingVolume = false; container.querySelector('.volume-container').classList.remove('dragging'); } }
      document.addEventListener('pointerup', finishPointerInteraction);
      document.addEventListener('pointercancel', finishPointerInteraction);
      muteBtn?.addEventListener('click', (e) => { e.stopPropagation(); video.muted = !video.muted; const currentVol = video.muted ? 0 : video.volume; volumeFill.style.width = `${currentVol * 100}%`; muteBtn.querySelector('i').className = video.muted ? 'fa-solid fa-volume-xmark' : 'fa-solid fa-volume-high'; triggerVolumeVisualFeedback(); });

      function triggerVolumeVisualFeedback() { if (!volumeFeedback) return; const volPercent = video.muted ? 0 : Math.round(video.volume * 100); volumeFeedback.textContent = `${volPercent}%`; container.classList.add('changing-volume'); clearTimeout(volumeFeedbackTimeout); volumeFeedbackTimeout = setTimeout(() => { container.classList.remove('changing-volume'); }, 1000); }
      if (captionBtn) { captionOptions.forEach(opt => opt.setAttribute('aria-pressed', String(opt.classList.contains('active')))); captionBtn.addEventListener('click', (e) => { e.stopPropagation(); speedMenu?.classList.remove('show'); speedBtn?.setAttribute('aria-expanded', 'false'); const isOpen = captionMenu.classList.toggle('show'); captionBtn.setAttribute('aria-expanded', String(isOpen)); }); captionOptions.forEach(opt => { opt.addEventListener('click', (e) => { e.stopPropagation(); const lang = opt.dataset.lang; captionOptions.forEach(o => { const selected = o === opt; o.classList.toggle('active', selected); o.setAttribute('aria-pressed', String(selected)); }); captionMenu.classList.remove('show'); captionBtn.setAttribute('aria-expanded', 'false'); const enabled = lang !== 'off'; captionBtn.classList.toggle('active', enabled); captionBtn.setAttribute('aria-pressed', String(enabled)); const captionLabel = enabled ? label("Legendas: ", "Captions: ") + opt.textContent.trim() : label("Legendas desativadas", "Captions off"); captionBtn.setAttribute('aria-label', captionLabel); captionBtn.title = captionLabel; for (let i = 0; i < video.textTracks.length; i++) video.textTracks[i].mode = 'disabled'; if (lang !== 'off') { for (let i = 0; i < video.textTracks.length; i++) { if (video.textTracks[i].language === lang) video.textTracks[i].mode = 'showing'; } } }); }); }
      if (speedBtn) { speedOptions.forEach(opt => { const selected = opt.dataset.speed === "1"; opt.classList.toggle('active', selected); opt.setAttribute('aria-pressed', String(selected)); }); speedBtn.addEventListener('click', (e) => { e.stopPropagation(); captionMenu?.classList.remove('show'); captionBtn?.setAttribute('aria-expanded', 'false'); const isOpen = speedMenu.classList.toggle('show'); speedBtn.setAttribute('aria-expanded', String(isOpen)); }); speedOptions.forEach(opt => { opt.addEventListener('click', (e) => { e.stopPropagation(); video.playbackRate = parseFloat(opt.dataset.speed); speedOptions.forEach(o => { const selected = o === opt; o.classList.toggle('active', selected); o.setAttribute('aria-pressed', String(selected)); }); speedMenu.classList.remove('show'); speedBtn.setAttribute('aria-expanded', 'false'); const rate = opt.textContent.trim(); speedBtn.setAttribute('aria-label', label("Velocidade de reprodução: ", "Playback speed: ") + rate); speedBtn.title = label("Velocidade: ", "Speed: ") + rate; speedBtn.classList.toggle('active', opt.dataset.speed !== "1"); }); }); }
      function updateTimeDisplay() { if (isNaN(video.duration)) return; const cur = video.currentTime; const tot = video.duration; const rem = tot - cur; let text = ''; if (timeDisplayMode === 0) text = `${formatTime(cur)} / ${formatTime(tot)}`; else if (timeDisplayMode === 1) text = `-${formatTime(rem)} / ${formatTime(tot)}`; else text = `${formatTime(cur)} / -${formatTime(rem)}`; timeDisplay.textContent = text; }
      video.addEventListener('loadedmetadata', updateTimeDisplay);
      video.addEventListener('durationchange', updateTimeDisplay);
      updateTimeDisplay();
      video.addEventListener('timeupdate', () => { if (!isScrubbing) { const percent = (video.currentTime / video.duration) * 100; progressBar.style.width = `${percent}%`; updateTimeDisplay(); } });
      timeDisplay.addEventListener('click', (e) => { e.stopPropagation(); timeDisplayMode = (timeDisplayMode + 1) % 3; updateTimeDisplay(); });
      if(mainPlayBtn) mainPlayBtn.addEventListener('click', (e) => { e.stopPropagation(); togglePlay(); });
      if(playBtn) playBtn.addEventListener('click', (e) => { e.stopPropagation(); togglePlay(); });
      skipBtns?.forEach(btn => { btn.addEventListener('click', (e) => { e.stopPropagation(); const amount = parseFloat(btn.dataset.skip); skip(amount); triggerSkipVisuals(btn, amount > 0); }); });

      function skip(amount) { if (!Number.isFinite(video.duration)) return; video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + amount)); resetInactivityTimer(); }
      function triggerSkipVisuals(btnElement, isForward) { if(!btnElement) return; const textPopup = btnElement.querySelector('.skip-text-popup'); const animClass = isForward ? 'animate-forward' : 'animate-backward'; textPopup.classList.remove('animate-forward', 'animate-backward'); void textPopup.offsetWidth; textPopup.classList.add(animClass); const rotClass = isForward ? 'anim-rotate-right' : 'anim-rotate-left'; btnElement.classList.remove('anim-rotate-right', 'anim-rotate-left'); void btnElement.offsetWidth; btnElement.classList.add(rotClass); }
      if(fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFS);
      function toggleFS() { if (document.fullscreenElement) document.exitFullscreen(); else container.requestFullscreen(); }
      document.addEventListener('fullscreenchange', () => { const fullscreenActive = document.fullscreenElement === container; const fullscreenTitle = fullscreenActive ? label("Sair da tela cheia", "Exit fullscreen") : label("Entrar em tela cheia", "Enter fullscreen"); fullscreenBtn?.setAttribute('aria-pressed', String(fullscreenActive)); fullscreenBtn?.setAttribute('aria-label', label("Tela cheia", "Fullscreen")); if (fullscreenBtn) fullscreenBtn.title = fullscreenTitle; if (document.fullscreenElement === container || document.fullscreenElement === null) { const activeLang = Array.from(video.textTracks).find(t => t.mode === 'showing')?.language; if (activeLang) { for(let t of video.textTracks) t.mode = 'disabled'; setTimeout(() => { const track = Array.from(video.textTracks).find(t => t.language === activeLang); if(track) track.mode = 'showing'; }, 50); } } });
      document.addEventListener('click', () => { speedMenu?.classList.remove('show'); speedBtn?.setAttribute('aria-expanded', 'false'); captionMenu?.classList.remove('show'); captionBtn?.setAttribute('aria-expanded', 'false'); }); document.addEventListener('keydown', (e) => { if (e.key !== 'Escape') return; const speedOpen = speedMenu?.classList.contains('show'); const captionOpen = captionMenu?.classList.contains('show'); if (!speedOpen && !captionOpen) return; e.preventDefault(); if (speedOpen) { speedMenu.classList.remove('show'); speedBtn?.setAttribute('aria-expanded', 'false'); speedBtn?.focus(); } else { captionMenu.classList.remove('show'); captionBtn?.setAttribute('aria-expanded', 'false'); captionBtn?.focus(); } });
      function formatTime(s) { if (isNaN(s) || !isFinite(s)) return "0:00"; const m = Math.floor(s / 60); const sec = Math.floor(s % 60); return `${m}:${sec < 10 ? '0' : ''}${sec}`; }

      container.togglePlay = (fromShortcut) => { togglePlay(); if (fromShortcut) { const i = centerControls.querySelector('.main-play i'); i.classList.remove('icon-pulse'); void i.offsetWidth; i.classList.add('icon-pulse'); } };
      container.skip = (amount) => { skip(amount); const btn = amount > 0 ? container.querySelector('.skip-btn[data-skip="10"]') : container.querySelector('.skip-btn[data-skip="-10"]'); triggerSkipVisuals(btn, amount > 0); };
      container.jumpTo = (percent) => { if (!Number.isFinite(video.duration)) return; video.currentTime = video.duration * (percent / 100); showControlsBriefly(); };
      container.toggleMute = (fromShortcut) => { muteBtn.click(); };
      container.toggleFS = toggleFS;
      container.changeVolume = (delta) => { let newVol = video.volume + delta; if (newVol > 1) newVol = 1; if (newVol < 0) newVol = 0; video.volume = newVol; video.muted = false; volumeFill.style.width = `${newVol * 100}%`; triggerVolumeVisualFeedback(); showControlsBriefly(); };
    };
    document.querySelectorAll('.video-container').forEach(window.initializePortfolioVideo);

    document.addEventListener('keydown', (e) => {
      if (e.target.closest('button,[role="button"]') && (e.key === ' ' || e.key === 'Enter')) return;
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        if (e.target.closest('a,button,summary,[role="button"]') && !e.target.closest('.video-container')) return;
        if (!activePlayerContainer) activePlayerContainer = document.querySelector('.video-container');
        if (!activePlayerContainer) return;
        const playerBounds = activePlayerContainer.getBoundingClientRect();
        if (playerBounds.bottom <= 0 || playerBounds.top >= window.innerHeight) return;
        const key = e.key.toLowerCase();
        if (key >= '1' && key <= '9') { activePlayerContainer.jumpTo(parseInt(key) * 10); return; }
        switch(key) {
            case ' ': case 'k': e.preventDefault(); activePlayerContainer.togglePlay(true); break;
            case 'f': e.preventDefault(); activePlayerContainer.toggleFS(); break;
            case 'm': e.preventDefault(); activePlayerContainer.toggleMute(true); break;
            case 'arrowright': case 'l': e.preventDefault(); activePlayerContainer.skip(10); break;
            case 'arrowleft': case 'j': e.preventDefault(); activePlayerContainer.skip(-10); break;
            case 'arrowup': e.preventDefault(); activePlayerContainer.changeVolume(0.1); break;
            case 'arrowdown': e.preventDefault(); activePlayerContainer.changeVolume(-0.1); break;
        }
    });

})();
