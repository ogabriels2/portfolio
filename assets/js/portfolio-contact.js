/* One form, clear validation and a direct e-mail recovery path. */
(() => {
  'use strict';
  const form = document.getElementById('contactForm');
  if (!form) return;
  const english = document.documentElement.lang.startsWith('en');
  const status = document.getElementById('contactStatus');
  const button = form.querySelector('button[type="submit"]');
  const idleMarkup = button.innerHTML;
  const fields = [...form.querySelectorAll('[data-contact-field]')];
  const copyButton = document.querySelector('[data-copy-email]');
  const copyStatus = document.querySelector('[data-copy-status]');
  copyButton?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('contato@ogabriels.com');
      copyButton.dataset.copied = 'true';
      copyButton.innerHTML = '<i class="fa-solid fa-check" aria-hidden="true"></i>';
      copyStatus.textContent = english ? 'E-mail copied.' : 'E-mail copiado.';
    } catch (_) {
      copyStatus.textContent = english ? 'Copy the address above, or click it to open your e-mail app.' : 'Selecione o endereço acima para copiar, ou clique nele para abrir seu e-mail.';
    }
  });
  const intents = [...form.querySelectorAll('input[name="assunto"]')];
  const requested = new URLSearchParams(location.search).get('assunto');
  const hints = english ? {
    projeto: ['What would you like to create or improve?', 'If you can, include the scope, a reference or a deadline. A starting idea is enough.'],
    oportunidade: ['Tell me about the role and your team.', 'Location, working arrangement and the role help me understand the opportunity.'],
    outro: ['What would you like to talk about?', 'Tell me the context and how I can help.']
  } : {
    projeto: ['O que você quer criar ou melhorar?', 'Se puder, inclua o escopo, uma referência ou um prazo. Uma ideia inicial já basta.'],
    oportunidade: ['Conte sobre a vaga e a sua equipe.', 'Local, modelo de trabalho e área de atuação ajudam a entender a oportunidade.'],
    outro: ['Sobre o que você gostaria de conversar?', 'Conte o contexto e como posso ajudar.']
  };
  function syncIntent() {
    const selected = intents.find(input => input.checked)?.value;
    if (!hints[selected]) return;
    form.elements.message.placeholder = hints[selected][0];
    form.querySelector('[data-intent-hint]').textContent = hints[selected][1];
  }
  intents.forEach(input => {
    if (input.value === requested) input.checked = true;
    input.addEventListener('change', syncIntent);
  });
  syncIntent();
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
      syncIntent();
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
      button.innerHTML = idleMarkup;
      form.removeAttribute('aria-busy');
    }
  });
})();
