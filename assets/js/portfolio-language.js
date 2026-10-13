/* Keep the language links native, with an elastic drag for pointer and touch. */
(function () {
  'use strict';

  function init() {
    document.querySelectorAll('.lang-switcher-container').forEach(function (container) {
      if (container.dataset.languageEnhanced) return;
      var links = Array.from(container.querySelectorAll('a.lang-item[href]'));
      var pill = container.querySelector('.gliding-pill');
      if (links.length !== 2 || !pill) return;
      container.dataset.languageEnhanced = 'true';

      var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      var gesture = null;
      var suppressClick = false;
      var suppressTimer = 0;
      var animationFrame = 0;
      var springSequence = 0;

      function language(link) {
        return (link.dataset.lang || link.getAttribute('lang') || '').split('-')[0];
      }

      function activeIndex() {
        var selected = links.findIndex(function (link) {
          return language(link) === container.dataset.active;
        });
        if (selected >= 0) return selected;
        return Math.max(0, links.findIndex(function (link) {
          return link.classList.contains('active');
        }));
      }

      function setActive(index) {
        container.dataset.active = language(links[index]);
        links.forEach(function (link, itemIndex) {
          var active = itemIndex === index;
          link.classList.toggle('active', active);
          if (active) link.setAttribute('aria-current', 'page');
          else link.removeAttribute('aria-current');
        });
      }

      function modified(event) {
        return event.ctrlKey || event.metaKey || event.shiftKey || event.altKey;
      }

      function clearSuppression() {
        window.clearTimeout(suppressTimer);
        suppressClick = false;
      }

      function clean() {
        var previous = gesture;
        gesture = null;
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', end);
        window.removeEventListener('pointercancel', cancel);
        window.removeEventListener('blur', cancel);
        window.removeEventListener('resize', cancel);
        window.removeEventListener('keydown', escape);
        document.removeEventListener('visibilitychange', visibility);
        container.classList.remove('is-dragging');
        container.classList.remove('is-pressed');
        container.removeAttribute('data-pointer-type');
        if (previous && container.hasPointerCapture(previous.id)) {
          try { container.releasePointerCapture(previous.id); } catch (error) { /* Pointer already released. */ }
        }
        return previous;
      }

      function updateVisualActive(index) {
        links.forEach(function (link, itemIndex) {
          link.classList.toggle('active', itemIndex === index);
        });
      }

      function paint(x, speed, travel) {
        var stretch = reducedMotion.matches ? 0 : Math.min(.085, Math.abs(speed) / 1600);
        var baseScale = reducedMotion.matches ? 1 : 1.04;
        var skew = reducedMotion.matches ? 0 : Math.max(-8, Math.min(8, -speed / 480));
        pill.style.transform = 'translate3d(' + x + 'px,0,0) scale(' +
          (baseScale + stretch) + ',' + (baseScale - stretch * .45) + ') skewX(' + skew + 'deg)';
        var progress = Math.max(0, Math.min(1, x / (travel || pill.offsetWidth)));
        updateVisualActive(progress >= .5 ? 1 : 0);
      }

      function restore(index) {
        setActive(index);
        pill.style.removeProperty('transform');
        pill.style.removeProperty('transition');
      }

      function springTo(targetIndex, initialVelocity, onSettle, startX) {
        springSequence += 1;
        var sequence = springSequence;
        if (animationFrame) window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
        var target = targetIndex * pill.offsetWidth;
        var x = Number.isFinite(startX) ? startX : target;
        var velocity = Math.max(-1800, Math.min(1800, initialVelocity || 0));
        container.classList.add('is-settling');

        if (reducedMotion.matches || Math.abs(x - target) < .5 && Math.abs(velocity) < 12) {
          restore(targetIndex);
          container.classList.remove('is-settling');
          if (onSettle) onSettle();
          return;
        }

        pill.style.transition = 'none';
        var previousTime = performance.now();
        function frame(now) {
          if (sequence !== springSequence) return;
          var seconds = Math.min(.032, Math.max(.001, (now - previousTime) / 1000));
          previousTime = now;
          var acceleration = -420 * (x - target) - 24 * velocity;
          velocity += acceleration * seconds;
          x += velocity * seconds;
          paint(x, velocity, pill.offsetWidth);

          if (Math.abs(x - target) < .45 && Math.abs(velocity) < 14) {
            restore(targetIndex);
            animationFrame = window.requestAnimationFrame(function () {
              if (sequence !== springSequence) return;
              animationFrame = 0;
              container.classList.remove('is-settling');
              if (onSettle) onSettle();
            });
            return;
          }
          animationFrame = window.requestAnimationFrame(frame);
        }
        animationFrame = window.requestAnimationFrame(frame);
      }

      function position(event) {
        return Math.max(0, Math.min(gesture.travel, gesture.start + event.clientX - gesture.pointerX));
      }

      function elastic(raw) {
        if (raw < 0) return -18 * (1 - Math.exp(raw / 28));
        if (raw > gesture.travel) return gesture.travel + 18 * (1 - Math.exp(-(raw - gesture.travel) / 28));
        return raw;
      }

      function move(event) {
        if (!gesture || event.pointerId !== gesture.id) return;
        var dx = event.clientX - gesture.pointerX;
        var dy = event.clientY - gesture.pointerY;
        if (!gesture.dragging) {
          if (Math.abs(dy) > 6 && Math.abs(dy) >= Math.abs(dx)) {
            clean();
            return;
          }
          if (Math.abs(dx) <= 6 || Math.abs(dx) <= Math.abs(dy) * 1.25) return;
          gesture.dragging = true;
          container.classList.remove('is-pressed');
          container.classList.add('is-dragging');
          pill.style.transition = 'none';
          try { container.setPointerCapture(event.pointerId); } catch (error) { cancel(); return; }
        }

        if (event.cancelable) event.preventDefault();
        var now = performance.now();
        var delta = event.clientX - gesture.lastX;
        var elapsed = Math.max(1, now - gesture.lastTime);
        gesture.velocity = gesture.velocity * .68 + (delta / elapsed) * 1000 * .32;
        gesture.lastX = event.clientX;
        gesture.lastTime = now;
        gesture.x = elastic(gesture.start + dx);
        paint(gesture.x, gesture.velocity);
      }

      function finish(targetIndex, velocity, navigate) {
        var targetHref = navigate ? links[targetIndex].href : null;
        var startX = gesture ? gesture.x : activeIndex() * pill.offsetWidth;
        clean();
        springTo(targetIndex, velocity, function () {
          if (targetHref) window.location.assign(targetHref);
        }, startX);
      }

      function end(event) {
        if (!gesture || event.pointerId !== gesture.id) return;
        var previous = gesture;
        if (!previous.dragging) {
          var bounds = container.getBoundingClientRect();
          var releasedInside = event.clientX >= bounds.left && event.clientX <= bounds.right &&
            event.clientY >= bounds.top && event.clientY <= bounds.bottom;
          if (!releasedInside) {
            finish(previous.index, 0, false);
            return;
          }
          var targetIndex = event.clientX >= bounds.left + bounds.width / 2 ? 1 : 0;
          suppressClick = true;
          window.clearTimeout(suppressTimer);
          suppressTimer = window.setTimeout(clearSuppression, 500);
          finish(targetIndex, 0, targetIndex !== previous.index);
          return;
        }
        if (event.cancelable) event.preventDefault();
        var bounded = position(event);
        var flick = previous.velocity > 480 ? 1 : previous.velocity < -480 ? 0 : null;
        var targetIndex = flick === null ? (bounded > previous.travel / 2 ? 1 : 0) : flick;
        var navigate = targetIndex !== previous.index;
        suppressClick = true;
        window.clearTimeout(suppressTimer);
        suppressTimer = window.setTimeout(clearSuppression, 500);
        finish(targetIndex, previous.velocity, navigate);
      }

      function cancel(event) {
        if (!gesture || event && 'pointerId' in event && event.pointerId !== gesture.id) return;
        var previous = gesture;
        if (previous.dragging) {
          suppressClick = true;
          window.clearTimeout(suppressTimer);
          suppressTimer = window.setTimeout(clearSuppression, 500);
        }
        finish(previous.index, 0, false);
      }

      function escape(event) {
        if (event.key === 'Escape') cancel();
      }

      function visibility() {
        if (document.hidden) cancel();
      }

      container.addEventListener('pointerdown', function (event) {
        clearSuppression();
        if (gesture || !event.isPrimary || event.button !== 0 || modified(event)) return;
        var travel = pill.offsetWidth;
        if (!travel) return;
        var index = activeIndex();
        var now = performance.now();
        gesture = {
          id: event.pointerId,
          pointerX: event.clientX,
          pointerY: event.clientY,
          lastX: event.clientX,
          lastTime: now,
          velocity: 0,
          index: index,
          start: index * travel,
          x: index * travel,
          travel: travel,
          dragging: false
        };
        container.classList.add('is-pressed');
        container.dataset.pointerType = event.pointerType || 'mouse';
        window.addEventListener('pointermove', move, { passive: false });
        window.addEventListener('pointerup', end);
        window.addEventListener('pointercancel', cancel);
        window.addEventListener('blur', cancel);
        window.addEventListener('resize', cancel);
        window.addEventListener('keydown', escape);
        document.addEventListener('visibilitychange', visibility);
      });

      container.addEventListener('lostpointercapture', function (event) {
        if (gesture && event.pointerId === gesture.id) cancel();
      });
      container.addEventListener('dragstart', function (event) {
        if (gesture) event.preventDefault();
      });
      container.addEventListener('click', function (event) {
        if (event.button !== 0 || modified(event)) return;
        if (suppressClick) {
          clearSuppression();
          event.preventDefault();
          event.stopImmediatePropagation();
          return;
        }

        var clickedLink = event.target.closest && event.target.closest('a.lang-item');
        var targetIndex;
        if (event.detail === 0 && clickedLink) {
          targetIndex = links.indexOf(clickedLink);
        } else {
          var bounds = container.getBoundingClientRect();
          targetIndex = event.clientX >= bounds.left + bounds.width / 2 ? 1 : 0;
        }
        if (targetIndex < 0) return;

        event.preventDefault();
        event.stopImmediatePropagation();
        var shouldNavigate = targetIndex !== activeIndex();
        springTo(targetIndex, 0, function () {
          if (shouldNavigate) window.location.assign(links[targetIndex].href);
        }, activeIndex() * pill.offsetWidth);
      }, true);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
}());
