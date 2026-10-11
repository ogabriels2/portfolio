/* One form, clear validation and a direct e-mail recovery path. */
(() => {
  'use strict';
  const form = document.getElementById('contactForm');
  if (!form) return;
  const english = document.documentElement.lang.startsWith('en');
  const status = document.getElementById('contactStatus');
  const button = form.querySelector('button[type="submit"]');
  const idleText = button.textContent;
  const fields = [...form.querySelectorAll('[data-contact-field]')];
  const messages = english ? {
    name: 'Please enter your name (at least 2 characters).',
    email: 'Please enter a valid e-mail address.',
    message: 'Please write a message with at least 10 characters.',
    phone: 'Please check the phone number, including the area or country code.'
  } : {
    name: 'Informe seu nome (pelo menos 2 caracteres).',
    email: 'Informe um endereço de e-mail válido.',
    message: 'Escreva uma mensagem com pelo menos 10 caracteres.',
    phone: 'Confira o telefone, incluindo DDD ou código do país.'
  };
  form.noValidate = true;
  function validate(field) {
    const value = field.value.trim();
    let valid = field.validity.valid;
    if (field.name === 'name') valid = value.length >= 2;
    if (field.name === 'message') valid = value.length >= 10;
    if (field.name === 'phone') valid = !value || value.replace(/\D/g, '').length >= 8;
    field.setAttribute('aria-invalid', String(!valid));
    document.getElementById(field.getAttribute('aria-describedby')).textContent = valid ? '' : messages[field.name];
    return valid;
  }
  fields.forEach(field => {
    field.addEventListener('blur', () => validate(field));
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') validate(field);
    });
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (button.disabled) return;
    const results = fields.map(field => validate(field));
    if (results.some(valid => !valid)) {
      fields[results.indexOf(false)].focus();
      status.dataset.state = 'error';
      status.textContent = english ? 'Please review the highlighted fields.' : 'Confira os campos destacados antes de enviar.';
      return;
    }
    button.disabled = true;
    button.textContent = english ? 'Sending…' : 'Enviando…';
    form.setAttribute('aria-busy', 'true');
    status.dataset.state = 'sending';
    status.textContent = english ? 'Sending your message.' : 'Enviando sua mensagem.';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const data = new FormData(form);
      if (window.grecaptcha?.ready && window.grecaptcha?.execute && form.dataset.recaptchaKey) {
        try {
          const token = await Promise.race([
            new Promise((resolve, reject) => window.grecaptcha.ready(() => window.grecaptcha.execute(form.dataset.recaptchaKey, { action: 'submit' }).then(resolve, reject))),
            new Promise((_, reject) => setTimeout(() => reject(new Error('captcha timeout')), 6000))
          ]);
          data.append('g-recaptcha-response', token);
        } catch (_) { /* The form provider can continue its own verification flow. */ }
      }
      const response = await fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' }, signal: controller.signal });
      if (!response.ok) throw new Error('Message was not accepted');
      form.reset();
      fields.forEach(field => {
        field.setAttribute('aria-invalid', 'false');
        document.getElementById(field.getAttribute('aria-describedby')).textContent = '';
      });
      status.dataset.state = 'success';
      status.textContent = english ? 'Message sent. I’ll reply to the e-mail you provided.' : 'Mensagem enviada. Responderei pelo e-mail que você informou.';
    } catch (_) {
      status.dataset.state = 'error';
      status.textContent = english ? 'Your message could not be confirmed. Your text is preserved; try again or e-mail contato@ogabriels.com directly.' : 'Não foi possível confirmar o envio. Seu texto foi preservado; tente novamente ou escreva diretamente para contato@ogabriels.com.';
    } finally {
      clearTimeout(timeout);
      button.disabled = false;
      button.textContent = idleText;
      form.removeAttribute('aria-busy');
    }
  });
})();
