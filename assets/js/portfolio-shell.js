/* Shared navigation and dialog behavior. Product demos stay in tech-cases.js. */
(() => {
  'use strict';
  if (window.PortfolioShell) {
    window.PortfolioShell.init();
    return;
  }

  const dialogs = new Map();
  const boundTriggers = new WeakSet();
  const focusSelector = 'a[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),summary,[tabindex]:not([tabindex="-1"])';
  const mobileQuery = window.matchMedia('(max-width: 968px)');
  const english = document.documentElement.lang.toLowerCase().startsWith('en');
  let activeDialog = null;
  let menu = null;
  let menuButton = null;
  let pendingOrigin = null;
  let pendingOverflow = null;
  let initialized = false;
  let bodyObserver = null;

  function focus(element, preventScroll = true) {
    if (!element?.isConnected || typeof element.focus !== 'function') return;
    try { element.focus({ preventScroll }); } catch (_) { element.focus(); }
  }

  function focusables(element) {
    return [...element.querySelectorAll(focusSelector)].filter(item =>
      !item.closest('[hidden],[inert],[aria-hidden="true"]') &&
      item.getAttribute('tabindex') !== '-1' && item.getClientRects().length > 0 &&
      getComputedStyle(item).visibility !== 'hidden'
    );
  }

  function blockBackground(element) {
    const blocked = [];
    let branch = element;
    while (branch && branch !== document.body) {
      const parent = branch.parentElement;
      if (!parent) break;
      for (const sibling of parent.children) {
        if (sibling === branch || /^(SCRIPT|STYLE|LINK)$/.test(sibling.tagName)) continue;
        blocked.push({ element: sibling, wasInert: sibling.hasAttribute('inert') });
        sibling.inert = true;
      }
      branch = parent;
    }
    return blocked;
  }

  function syncMenuButton(open) {
    if (!menuButton) return;
    menuButton.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', english ? (open ? 'Close menu' : 'Open menu') : (open ? 'Fechar menu' : 'Abrir menu'));
    document.body.classList.toggle('menu-open', open);
  }

  function firstFocus(controller) {
    const target = controller.element.querySelector('[data-dialog-initial-focus],.portfolio-menu-close,.js-popup-close,.modal-close,#lbClose,#lb-close') || focusables(controller.element)[0] || controller.element;
    focus(target);
  }

  function open(controller, origin, observed = false) {
    if (!controller || controller.open) return Boolean(controller);
    if (activeDialog) requestClose(activeDialog, false);
    const element = controller.element;
    controller.origin = origin?.isConnected ? origin : pendingOrigin?.isConnected ? pendingOrigin : document.activeElement;
    controller.overflow = observed && pendingOverflow ? pendingOverflow : {
      body: observed ? '' : document.body.style.overflow,
      root: document.documentElement.style.overflow
    };
    pendingOrigin = null;
    pendingOverflow = null;
    controller.open = true;
    element.hidden = false;
    element.inert = false;
    element.setAttribute('aria-hidden', 'false');
    element.classList.add('active');
    activeDialog = controller;
    if (element === menu) syncMenuButton(true);
    document.body.classList.add('portfolio-dialog-open');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    // Move focus before making the opener's subtree inert.
    firstFocus(controller);
    controller.blocked = blockBackground(element);
    requestAnimationFrame(() => { if (controller.open) firstFocus(controller); });
    return true;
  }

  function close(controller, restoreFocus = true) {
    if (!controller || !controller.open) return;
    controller.open = false;
    controller.element.classList.remove('active');
    controller.element.hidden = true;
    controller.element.inert = true;
    controller.element.setAttribute('aria-hidden', 'true');
    for (const item of controller.blocked || []) {
      if (item.element.isConnected) item.element.inert = item.wasInert;
    }
    controller.blocked = [];
    if (activeDialog === controller) activeDialog = null;
    if (controller.element === menu) syncMenuButton(false);
    document.body.classList.remove('portfolio-dialog-open');
    document.body.style.overflow = controller.overflow?.body || '';
    document.documentElement.style.overflow = controller.overflow?.root || '';
    if (restoreFocus) focus(controller.origin);
    controller.origin = null;
  }

  function requestClose(controller, restoreFocus = true) {
    if (!controller) return;
    // Let the existing lightbox release zoom and pan timers before closing it.
    if (controller.external) controller.element.querySelector('#lbClose,#lb-close')?.click();
    close(controller, restoreFocus);
  }

  function enhanceLegacyLightbox(element) {
    if (element.dataset.glassGalleryControls === 'true') return;
    const image = element.querySelector('.lb-img,#lbImage');
    const container = element.querySelector('.lb-container,#lbContainer');
    const previous = element.querySelector('.lb-prev,#lbPrev');
    const next = element.querySelector('.lb-next,#lbNext');
    if (!image || !container || !previous || !next) return;
    element.dataset.glassGalleryControls = 'true';

    const sources = [...document.querySelectorAll('.lightbox-trigger')];
    const counter = document.createElement('span');
    counter.className = 'lb-gallery-counter';
    counter.setAttribute('role', 'status');
    counter.setAttribute('aria-live', 'polite');
    counter.setAttribute('aria-atomic', 'true');
    const zoomControl = element.querySelector('.lb-zoom-control');
    if (zoomControl) zoomControl.prepend(counter);
    else { counter.classList.add('lb-gallery-counter--floating'); container.append(counter); }

    if (sources.length < 2) {
      previous.hidden = true;
      next.hidden = true;
      counter.hidden = true;
      return;
    }

    const keyFor = value => {
      try { return new URL(value, document.baseURI).href; }
      catch { return value; }
    };
    let frame = 0;
    const update = () => {
      frame = 0;
      const imageKey = keyFor(image.currentSrc || image.src);
      const index = sources.findIndex(source => keyFor(source.dataset.src || source.currentSrc || source.src) === imageKey);
      counter.textContent = `${String(Math.max(0, index) + 1).padStart(2, '0')} / ${String(sources.length).padStart(2, '0')}`;

      if (!element.classList.contains('active')) return;
      const bounds = container.getBoundingClientRect();
      const imageBounds = image.getBoundingClientRect();
      const buttonWidth = previous.getBoundingClientRect().width || 50;
      const buttonHeight = previous.getBoundingClientRect().height || 50;
      const maxX = Math.max(8, bounds.width - buttonWidth - 8);
      const maxY = Math.max(buttonHeight / 2 + 8, bounds.height - buttonHeight / 2 - 8);
      const left = Math.min(maxX, Math.max(8, imageBounds.left - bounds.left + 8));
      const right = Math.min(maxX, Math.max(8, bounds.right - imageBounds.right + 8));
      const top = Math.min(maxY, Math.max(buttonHeight / 2 + 8, imageBounds.top - bounds.top + imageBounds.height / 2));
      previous.style.setProperty('left', `${left}px`, 'important');
      previous.style.setProperty('right', 'auto', 'important');
      previous.style.setProperty('top', `${top}px`, 'important');
      next.style.setProperty('left', 'auto', 'important');
      next.style.setProperty('right', `${right}px`, 'important');
      next.style.setProperty('top', `${top}px`, 'important');
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    image.addEventListener('load', schedule);
    window.addEventListener('resize', schedule, { passive: true });
    const mutations = [new MutationObserver(schedule), new MutationObserver(schedule)];
    mutations[0].observe(image, { attributes: true, attributeFilter: ['src', 'class', 'style'] });
    mutations[1].observe(element, { attributes: true, attributeFilter: ['class'] });
    element._portfolioGalleryMutations = mutations;
    if ('ResizeObserver' in window) {
      element._portfolioGalleryResize = new ResizeObserver(schedule);
      element._portfolioGalleryResize.observe(image);
    }
    schedule();
  }

  function registerDialog(element, options = {}) {
    if (element.matches('.lightbox-overlay,#lightboxOverlay')) enhanceLegacyLightbox(element);
    if (dialogs.has(element)) return dialogs.get(element);
    const initiallyOpen = element.classList.contains('active');
    const controller = { element, open: false, external: options.external || false, blocked: [] };
    dialogs.set(element, controller);
    element.dataset.portfolioDialog = '';
    element.setAttribute('role', 'dialog');
    element.setAttribute('aria-modal', 'true');
    if (!element.hasAttribute('tabindex')) element.tabIndex = -1;
    if (!element.hasAttribute('aria-label') && !element.hasAttribute('aria-labelledby')) {
      const heading = element.querySelector('h1,h2,h3');
      if (heading) {
        if (!heading.id) heading.id = `${element.id || 'portfolio-dialog'}-title`;
        element.setAttribute('aria-labelledby', heading.id);
      } else element.setAttribute('aria-label', english ? 'Details' : 'Detalhes');
    }
    element.hidden = !initiallyOpen;
    element.inert = !initiallyOpen;
    element.setAttribute('aria-hidden', String(!initiallyOpen));
    if (!controller.external) {
      element.querySelectorAll('[data-dialog-close],.js-popup-close,.modal-close').forEach(button => {
        button.addEventListener('click', () => close(controller));
      });
      element.addEventListener('click', event => {
        if (event.target === element) close(controller);
      });
    }
    const observer = new MutationObserver(() => {
      const visible = element.classList.contains('active');
      if (visible && !controller.open) open(controller, null, true);
      else if (!visible && controller.open) close(controller);
    });
    observer.observe(element, { attributes: true, attributeFilter: ['class'] });
    controller.observer = observer;
    if (initiallyOpen) open(controller, null, true);
    return controller;
  }

  function prepareMenu() {
    const element = document.getElementById('mobileMenu');
    const button = document.querySelector('.mobile-menu-btn');
    if (!element || !button || menu === element) return;
    menu = element;
    menuButton = button;
    if (button.tagName === 'BUTTON') button.type = 'button';
    button.setAttribute('aria-controls', element.id);
    let closeButton = element.querySelector('.portfolio-menu-close');
    if (!closeButton) {
      closeButton = document.createElement('button');
      closeButton.type = 'button';
      closeButton.className = 'portfolio-menu-close';
      closeButton.setAttribute('data-dialog-close', '');
      closeButton.setAttribute('aria-label', english ? 'Close menu' : 'Fechar menu');
      closeButton.innerHTML = '<i class="fa-solid fa-xmark" aria-hidden="true"></i>';
      element.prepend(closeButton);
    }
    const controller = registerDialog(element);
    if (!boundTriggers.has(button)) {
      boundTriggers.add(button);
      button.addEventListener('click', () => controller.open ? close(controller) : open(controller, button));
    }
    element.querySelectorAll('a[href]').forEach(link => {
      if (boundTriggers.has(link)) return;
      boundTriggers.add(link);
      link.addEventListener('click', () => close(controller, false));
    });
    syncMenuButton(controller.open);
  }

  function prepareTriggers(root) {
    root.querySelectorAll('[data-popup],[data-dialog-target]').forEach(trigger => {
      if (boundTriggers.has(trigger)) return;
      boundTriggers.add(trigger);
      const native = /^(BUTTON|A|INPUT|SUMMARY)$/.test(trigger.tagName);
      if (!native) {
        trigger.setAttribute('role', 'button');
        if (!trigger.hasAttribute('tabindex')) trigger.tabIndex = 0;
      }
      const id = trigger.dataset.popup || trigger.dataset.dialogTarget;
      trigger.setAttribute('aria-haspopup', 'dialog');
      trigger.setAttribute('aria-controls', id);
      const activate = event => {
        if (event?.type === 'click' && trigger.tagName === 'A') event.preventDefault();
        const target = document.getElementById(id);
        if (target) open(dialogs.get(target) || registerDialog(target), trigger);
      };
      trigger.addEventListener('click', activate);
      if (!native) trigger.addEventListener('keydown', event => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        activate(event);
      });
    });
  }

  function rememberSidebarPosition(list) {
    if (list.dataset.scrollMemoryReady) return;
    list.dataset.scrollMemoryReady = 'true';
    const key = 'portfolio.sidebar.scroll.v1';
    let saved = null;
    try {
      const raw = sessionStorage.getItem(key);
      const value = raw === null ? NaN : Number(raw);
      if (Number.isFinite(value) && value >= 0) saved = value;
    } catch { /* Navigation still works when storage is unavailable. */ }
    let internalNavigation = false;
    try { internalNavigation = new URL(document.referrer).origin === location.origin; } catch {}
    const navigationType = performance.getEntriesByType('navigation')[0]?.type;
    const restoreSaved = saved !== null && (internalNavigation || navigationType === 'reload' || navigationType === 'back_forward');
    let userMoved = false;
    const persist = () => {
      if (!window.matchMedia('(min-width: 969px)').matches) return;
      try { sessionStorage.setItem(key, String(list.scrollTop)); } catch {}
    };
    const restore = () => {
      if (userMoved || !window.matchMedia('(min-width: 969px)').matches) return;
      const previousBehavior = list.style.scrollBehavior;
      list.style.scrollBehavior = 'auto';
      if (restoreSaved) list.scrollTop = saved;
      else {
        const current = list.querySelector('.nav-link[aria-current="page"], .nav-link.active');
        if (current) {
          const bounds = list.getBoundingClientRect();
          const item = current.getBoundingClientRect();
          if (item.bottom > bounds.bottom) list.scrollTop += item.bottom - bounds.bottom + 8;
          else if (item.top < bounds.top) list.scrollTop += item.top - bounds.top - 8;
        }
      }
      list.style.scrollBehavior = previousBehavior;
    };
    ['wheel', 'touchstart', 'pointerdown', 'keydown'].forEach(event => {
      list.addEventListener(event, () => { userMoved = true; }, { passive: true });
    });
    if (!list.dataset.scrollRestoredEarly) restore();
    list.addEventListener('scroll', persist, { passive: true });
    document.addEventListener('click', persist, true);
    window.addEventListener('pagehide', persist);
    window.addEventListener('pageshow', event => { if (event.persisted) persist(); });
  }

  function prepareSidebar() {
    document.querySelectorAll('body > aside').forEach(sidebar => {
      if (sidebar.querySelector('.sidebar-scaler')) sidebar.classList.add('portfolio-sidebar');
    });
    document.querySelectorAll('.project-scroll-container').forEach(list => {
      list.closest('.nav-group')?.classList.add('portfolio-project-group');
      rememberSidebarPosition(list);
    });
    document.querySelectorAll('.sidebar-scaler').forEach(scaler => {
      scaler.style.removeProperty('transform');
      scaler.style.removeProperty('width');
      scaler.style.removeProperty('height');
      scaler.classList.remove('compact-mode');
    });
  }

  function init(root = document) {
    prepareMenu();
    root.querySelectorAll('.popup-overlay,.info-modal,.lightbox-overlay,#lightbox,[data-portfolio-dialog]').forEach(element => {
      if (element !== menu) registerDialog(element, { external: element.classList.contains('lightbox-overlay') || element.id === 'lightbox' });
    });
    prepareTriggers(root);
    root.querySelectorAll('.lightbox-trigger').forEach(trigger => {
      if (boundTriggers.has(trigger)) return;
      boundTriggers.add(trigger);
      const native = /^(BUTTON|A)$/.test(trigger.tagName);
      if (!native) { trigger.tabIndex = 0; trigger.setAttribute('role', 'button'); }
      const description = trigger.getAttribute('alt') || '';
      if (!trigger.hasAttribute('aria-label')) trigger.setAttribute('aria-label', `${description}${description ? '. ' : ''}${english ? 'Enlarge image' : 'Ampliar imagem'}`);
      trigger.setAttribute('aria-haspopup', 'dialog');
      if (!native) trigger.addEventListener('keydown', event => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        trigger.click();
      });
    });
    prepareSidebar();
    root.querySelectorAll('[data-reveal],.reveal').forEach(element => element.classList.add('is-visible', 'active'));
    document.documentElement.classList.add('portfolio-shell-ready');
    if (initialized) return;
    initialized = true;
    document.addEventListener('click', event => {
      if (activeDialog) return;
      pendingOrigin = event.target instanceof Element ? event.target.closest('button,a,[tabindex],.lightbox-trigger') || event.target : document.activeElement;
      pendingOverflow = { body: document.body.style.overflow, root: document.documentElement.style.overflow };
    }, true);
    document.addEventListener('keydown', event => {
      if (!activeDialog) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopImmediatePropagation();
        requestClose(activeDialog);
      } else if (event.key === 'Tab') {
        event.preventDefault();
        event.stopImmediatePropagation();
        const items = focusables(activeDialog.element);
        if (!items.length) { focus(activeDialog.element); return; }
        const current = items.indexOf(document.activeElement);
        const next = current < 0 ? (event.shiftKey ? items.length - 1 : 0) : (current + (event.shiftKey ? -1 : 1) + items.length) % items.length;
        focus(items[next], false);
      }
    }, true);
    document.addEventListener('focusin', event => {
      if (activeDialog && !activeDialog.element.contains(event.target)) firstFocus(activeDialog);
    });
    mobileQuery.addEventListener('change', event => {
      const controller = menu && dialogs.get(menu);
      if (!event.matches && controller?.open) {
        requestClose(controller, false);
        // The mobile opener is now hidden; return to the equivalent desktop navigation.
        focus(document.querySelector('.portfolio-sidebar .nav-link[aria-current="page"],.portfolio-sidebar .nav-link.active') || document.querySelector('.portfolio-sidebar .profile-link'));
      }
    });
    // A legacy gallery can inject its lightbox after this script initializes.
    bodyObserver = new MutationObserver(records => {
      if (records.some(record => [...record.addedNodes].some(node => node instanceof Element && (node.matches('.lightbox-overlay,[data-portfolio-dialog]') || node.querySelector('.lightbox-overlay,[data-portfolio-dialog]'))))) init();
    });
    bodyObserver.observe(document.body, { childList: true, subtree: true });
  }

  window.PortfolioShell = Object.freeze({
    init,
    openDialog(id, trigger) {
      const element = typeof id === 'string' ? document.getElementById(id) : id;
      return element instanceof Element ? open(dialogs.get(element) || registerDialog(element), trigger) : false;
    },
    closeDialog(id) {
      const element = typeof id === 'string' ? document.getElementById(id) : id;
      requestClose(element ? dialogs.get(element) : activeDialog);
    }
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init(), { once: true });
  else init();
})();
