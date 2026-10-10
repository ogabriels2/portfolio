(() => {
  const menu = document.getElementById('mobileMenu');
  const menuButton = document.querySelector('.mobile-menu-btn');

  const closeMenu = () => {
    if (!menu || !menuButton) return;
    menu.classList.remove('active');
    menu.setAttribute('aria-hidden', 'true');
    menu.inert = true;
    menuButton.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  };

  if (menu && menuButton) {
    menuButton.addEventListener('click', () => {
      const open = !menu.classList.contains('active');
      menu.classList.toggle('active', open);
      menu.setAttribute('aria-hidden', String(!open));
      menu.inert = !open;
      menuButton.classList.toggle('is-open', open);
      menuButton.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('menu-open', open);
    });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menu.classList.contains('active')) {
        closeMenu();
        menuButton.focus();
      }
    });
  }

  const revealItems = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  document.querySelectorAll('[data-gallery-control]').forEach(button => {
    button.addEventListener('click', () => {
      const gallery = button.closest('[data-gallery]');
      const image = gallery?.querySelector('[data-gallery-image]');
      const caption = gallery?.querySelector('[data-gallery-caption]');
      if (!gallery || !image) return;
      image.src = button.dataset.src;
      image.alt = button.dataset.alt || '';
      if (caption) caption.textContent = button.dataset.caption || '';
      gallery.querySelectorAll('[data-gallery-control]').forEach(control => {
        control.setAttribute('aria-pressed', String(control === button));
      });
    });
  });

  document.querySelectorAll('[data-flow-step]').forEach(button => {
    button.addEventListener('click', () => {
      const layout = button.closest('[data-flow-layout]');
      if (!layout) return;
      const title = layout.querySelector('[data-flow-detail-title]');
      const copy = layout.querySelector('[data-flow-detail-copy]');
      const icon = layout.querySelector('[data-flow-detail-icon]');
      layout.querySelectorAll('[data-flow-step]').forEach(step => {
        step.setAttribute('aria-pressed', String(step === button));
      });
      if (title) title.textContent = button.dataset.title || '';
      if (copy) copy.textContent = button.dataset.copy || '';
      if (icon && button.dataset.icon) icon.className = 'fa-solid ' + button.dataset.icon;
    });
  });

  document.querySelectorAll('[data-preset-demo]').forEach(demo => {
    const copy = demo.querySelector('[data-preset-copy]');
    const ranking = demo.querySelector('[data-preset-ranking]');
    const buttons = [...demo.querySelectorAll('[data-preset]')];
    const presets = {
      quality: {
        copy: 'Busca a maior resolução disponível, preservando HDR quando há essa opção.',
        order: ['Resolução', 'HDR', 'FPS', 'Bitrate', 'Codec']
      },
      compatibility: {
        copy: 'Começa pelo codec reproduzível e favorece SDR para reduzir surpresas de compatibilidade.',
        order: ['Codec compatível', 'SDR', 'Resolução', 'FPS', 'Bitrate']
      },
      smaller: {
        copy: 'Define uma altura mínima aceitável e depois considera tamanho e eficiência do codec.',
        order: ['Altura mínima', 'Tamanho', 'Codec eficiente']
      }
    };
    const english = document.documentElement.lang.toLowerCase().startsWith('en');
    const translations = {
      quality: {
        copy: 'Looks for the highest available resolution and preserves HDR when that option exists.',
        order: ['Resolution', 'HDR', 'FPS', 'Bitrate', 'Codec']
      },
      compatibility: {
        copy: 'Starts with a playable codec and favors SDR to reduce compatibility surprises.',
        order: ['Compatible codec', 'SDR', 'Resolution', 'FPS', 'Bitrate']
      },
      smaller: {
        copy: 'Sets an acceptable minimum height, then considers size and codec efficiency.',
        order: ['Minimum height', 'Size', 'Efficient codec']
      }
    };
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const preset = presets[button.dataset.preset];
        const translated = translations[button.dataset.preset];
        const selected = english ? translated : preset;
        if (!selected || !ranking) return;
        buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
        if (copy) copy.textContent = selected.copy;
        ranking.replaceChildren(...selected.order.map((label, index) => {
          const item = document.createElement('li');
          const number = document.createElement('b');
          const name = document.createElement('span');
          number.textContent = String(index + 1).padStart(2, '0');
          name.textContent = label;
          item.append(number, name);
          return item;
        }));
      });
    });
  });

  const chat = document.querySelector('[data-hyro-chat]');
  if (!chat) return;

  const isEnglish = document.documentElement.lang.toLowerCase().startsWith('en');
  const translations = {
    'Olá! 👋 Em que posso ajudá-lo hoje?': 'Hello! 👋 How can I help you today?',
    'Conta / Saldo / Extrato': 'Account / Balance / Statement',
    'Pagamentos / Transferências': 'Payments / Transfers',
    'Cartão (bloqueio, limite)': 'Card (block, limit)',
    'Empréstimo / Crédito': 'Loan / Credit',
    'Outros (perfil, segurança)': 'Other (profile, security)',
    'Certo! O que você precisa sobre sua conta?': 'Sure. What do you need help with on your account?',
    'Ver meu saldo': 'Check my balance',
    'Extrato detalhado': 'Detailed statement',
    'Ok! O que você deseja fazer?': 'Okay. What would you like to do?',
    'Fazer uma transferência': 'Make a transfer',
    'Pagar boleto / fatura': 'Pay a bill / statement',
    'Entendido! Como posso ajudar com seu cartão?': 'Understood. How can I help with your card?',
    'Bloquear meu cartão': 'Block my card',
    'Aumentar meu limite': 'Increase my limit',
    'Ótimo! O que você quer fazer?': 'Great. What would you like to do?',
    'Simular um empréstimo': 'Simulate a loan',
    'Solicitar um empréstimo': 'Apply for a loan',
    'Certo! O que você precisa?': 'Sure. What do you need help with?',
    'Trocar senha / Segurança': 'Change password / Security',
    'Vou transferir você para um atendente que pode visualizar seu saldo em tempo real.': 'I will connect you with an agent who can check your current balance.',
    'Vou transferir você para um atendente que pode enviar seu extrato detalhado.': 'I will connect you with an agent who can send your detailed statement.',
    'Vou transferir você para um atendente que pode ajudá-lo com a transferência.': 'I will connect you with an agent who can help with your transfer.',
    'Vou transferir você para um atendente que pode processar seu pagamento.': 'I will connect you with an agent who can process your payment.',
    'Vou transferir você para um atendente que pode bloquear seu cartão imediatamente.': 'I will connect you with an agent who can block your card right away.',
    'Vou transferir você para um atendente que pode analisar seu pedido de aumento de limite.': 'I will connect you with an agent to review your credit limit request.',
    'Vou transferir você para um atendente que pode simular as melhores opções de empréstimo.': 'I will connect you with an agent to review loan options with you.',
    'Vou transferir você para um atendente que pode processar sua solicitação de empréstimo.': 'I will connect you with an agent who can process your loan request.',
    'Vou transferir você para um atendente que pode ajudá-lo com segurança e alteração de senha.': 'I will connect you with an agent who can help with account security or a password change.',
    'Ir para WhatsApp': 'Continue to WhatsApp',
    'Obrigado por entrar em contato! Se precisar de mais algo, é só chamar. 😊': 'Thanks for getting in touch. We are here if you need anything else. 😊',
    'Voltar ao início': 'Back to the start',
    'Olá, eu gostaria de ver meu saldo rápido. Podem me ajudar?': 'Hi, I would like to check my balance. Can you help me?',
    'Olá, eu preciso do meu extrato detalhado. Podem enviar para mim?': 'Hi, I need my detailed statement. Can you send it to me?',
    'Oi, eu gostaria de fazer uma transferência. Podem me ajudar?': 'Hi, I would like to make a transfer. Can you help me?',
    'Olá, eu preciso pagar um boleto/fatura. Podem me ajudar?': 'Hi, I need to pay a bill. Can you help me?',
    'Oi, eu preciso bloquear meu cartão urgentemente! Podem fazer isso para mim?': 'Hi, I need to block my card urgently. Can you help?',
    'Olá, eu gostaria de solicitar um aumento de limite no meu cartão. Como faço?': 'Hi, I would like to request a higher card limit. How can I do that?',
    'Oi, eu gostaria de simular um empréstimo. Podem me mostrar as opções?': 'Hi, I would like to review loan options. Can you help me?',
    'Olá, eu gostaria de solicitar um empréstimo. Podem me ajudar?': 'Hi, I would like to apply for a loan. Can you help me?',
    'Oi, eu preciso trocar minha senha ou falar sobre segurança da minha conta. Podem me ajudar?': 'Hi, I need to change my password or discuss account security. Can you help?'
  };
  const translate = text => isEnglish ? (translations[text] || text) : text;
  const nodes = {
    A_A1: {
      message: 'Olá! 👋 Em que posso ajudá-lo hoje?',
      options: [
        ['Conta / Saldo / Extrato', 'B_B1'],
        ['Pagamentos / Transferências', 'B_B2'],
        ['Cartão (bloqueio, limite)', 'B_B3'],
        ['Empréstimo / Crédito', 'B_B4'],
        ['Outros (perfil, segurança)', 'B_B5']
      ]
    },
    B_B1: { message: 'Certo! O que você precisa sobre sua conta?', options: [['Ver meu saldo', 'C_C1'], ['Extrato detalhado', 'C_C2']] },
    B_B2: { message: 'Ok! O que você deseja fazer?', options: [['Fazer uma transferência', 'C_C3'], ['Pagar boleto / fatura', 'C_C4']] },
    B_B3: { message: 'Entendido! Como posso ajudar com seu cartão?', options: [['Bloquear meu cartão', 'C_C5'], ['Aumentar meu limite', 'C_C6']] },
    B_B4: { message: 'Ótimo! O que você quer fazer?', options: [['Simular um empréstimo', 'C_C7'], ['Solicitar um empréstimo', 'C_C8']] },
    B_B5: { message: 'Certo! O que você precisa?', options: [['Trocar senha / Segurança', 'C_C9']] },
    C_C1: { message: 'Vou transferir você para um atendente que pode visualizar seu saldo em tempo real.', whatsapp: 'Olá, eu gostaria de ver meu saldo rápido. Podem me ajudar?' },
    C_C2: { message: 'Vou transferir você para um atendente que pode enviar seu extrato detalhado.', whatsapp: 'Olá, eu preciso do meu extrato detalhado. Podem enviar para mim?' },
    C_C3: { message: 'Vou transferir você para um atendente que pode ajudá-lo com a transferência.', whatsapp: 'Oi, eu gostaria de fazer uma transferência. Podem me ajudar?' },
    C_C4: { message: 'Vou transferir você para um atendente que pode processar seu pagamento.', whatsapp: 'Olá, eu preciso pagar um boleto/fatura. Podem me ajudar?' },
    C_C5: { message: 'Vou transferir você para um atendente que pode bloquear seu cartão imediatamente.', whatsapp: 'Oi, eu preciso bloquear meu cartão urgentemente! Podem fazer isso para mim?' },
    C_C6: { message: 'Vou transferir você para um atendente que pode analisar seu pedido de aumento de limite.', whatsapp: 'Olá, eu gostaria de solicitar um aumento de limite no meu cartão. Como faço?' },
    C_C7: { message: 'Vou transferir você para um atendente que pode simular as melhores opções de empréstimo.', whatsapp: 'Oi, eu gostaria de simular um empréstimo. Podem me mostrar as opções?' },
    C_C8: { message: 'Vou transferir você para um atendente que pode processar sua solicitação de empréstimo.', whatsapp: 'Olá, eu gostaria de solicitar um empréstimo. Podem me ajudar?' },
    C_C9: { message: 'Vou transferir você para um atendente que pode ajudá-lo com segurança e alteração de senha.', whatsapp: 'Oi, eu preciso trocar minha senha ou falar sobre segurança da minha conta. Podem me ajudar?' },
    D_D4: { message: 'Obrigado por entrar em contato! Se precisar de mais algo, é só chamar. 😊', options: [['Voltar ao início', 'A_A1']] }
  };

  const messageList = chat.querySelector('[data-chat-messages]');
  const optionsList = chat.querySelector('[data-chat-options]');
  const status = chat.querySelector('[data-chat-state]');
  const feedback = chat.querySelector('[data-feedback-demo]');
  const reset = chat.querySelector('[data-chat-reset]');
  const back = chat.querySelector('[data-chat-back]');
  const rating = chat.querySelector('[data-feedback-rating]');
  const ratingValue = chat.querySelector('[data-feedback-value]');
  const feedbackStatus = chat.querySelector('[data-feedback-status]');

  const initialState = () => ({
    current: 'A_A1',
    messages: [{ role: 'bot', text: nodes.A_A1.message }],
    whatsapp: ''
  });
  let states = [initialState()];
  let currentState = states[0];

  const render = () => {
    const node = nodes[currentState.current];
    messageList.replaceChildren();
    currentState.messages.forEach(message => {
      const bubble = document.createElement('div');
      bubble.className = `chat-bubble ${message.role}`;
      bubble.textContent = translate(message.text);
      messageList.appendChild(bubble);
    });
    if (currentState.whatsapp) {
      const handoff = document.createElement('div');
      handoff.className = 'chat-bubble system';
      handoff.textContent = isEnglish ? `Prepared message for the support team:` + String.fromCharCode(10) + `“${translate(currentState.whatsapp)}”` : `Mensagem preparada para o atendimento humano:` + String.fromCharCode(10) + `“${currentState.whatsapp}”`;
      messageList.appendChild(handoff);
    }
    messageList.scrollTop = messageList.scrollHeight;
    optionsList.replaceChildren();
    (node.options || []).forEach(([label, target]) => {
      const choice = document.createElement('button');
      choice.type = 'button';
      choice.className = 'chat-choice';
      choice.textContent = translate(label);
      choice.addEventListener('click', () => choose(label, target));
      optionsList.appendChild(choice);
    });
    status.textContent = currentState.current === 'D_D4' ? (isEnglish ? 'rating' : 'avaliação') : `${states.length - 1} ${isEnglish ? (states.length === 2 ? 'step' : 'steps') : (states.length === 2 ? 'etapa' : 'etapas')}`;
    feedback.hidden = currentState.current !== 'D_D4';
    back.disabled = states.length <= 1;
  };

  const choose = (label, target) => {
    if (currentState.current === 'D_D4' && target === 'A_A1') {
      states = [initialState()];
      currentState = states[0];
      feedbackStatus.textContent = '';
      render();
      return;
    }
    const next = { current: target, messages: [...currentState.messages, { role: 'user', text: label }], whatsapp: currentState.whatsapp };
    const targetNode = nodes[target];
    if (targetNode.whatsapp) next.whatsapp = targetNode.whatsapp;
    next.messages.push({ role: 'bot', text: nodes[target].message });
    states = [...states, next];
    currentState = next;
    feedbackStatus.textContent = '';
    render();
  };

  reset?.addEventListener('click', () => {
    states = [initialState()];
    currentState = states[0];
    feedbackStatus.textContent = '';
    render();
  });
  back?.addEventListener('click', () => {
    if (states.length <= 1) return;
    states = states.slice(0, -1);
    currentState = states[states.length - 1];
    feedbackStatus.textContent = '';
    render();
  });
  if (rating && ratingValue) {
    rating.addEventListener('input', () => { ratingValue.textContent = rating.value; });
  }
  chat.querySelector('[data-feedback-submit]')?.addEventListener('click', () => {
    feedbackStatus.textContent = isEnglish ? 'This rating is simulated here. In the project, the score and conversation path are stored in PostgreSQL.' : 'Avaliação simulada nesta página. No projeto, a nota e o caminho percorrido são gravados no PostgreSQL.';
  });
  render();
})();


(function fitTechSidebar(){
  const fit = () => {
    const scaler = document.querySelector('.sidebar-scaler');
    if (!scaler) return;
    if (window.matchMedia('(max-width: 968px)').matches) {
      scaler.style.transform = '';
      scaler.style.width = '';
      scaler.style.height = '';
      scaler.classList.remove('compact-mode');
      return;
    }
    scaler.style.transform = 'scale(1)';
    scaler.style.width = '100%';
    scaler.style.height = 'auto';
    scaler.classList.remove('compact-mode');
    void scaler.offsetHeight;
    const viewportHeight = window.innerHeight;
    const contentHeight = scaler.scrollHeight;
    if (contentHeight <= viewportHeight) {
      scaler.style.transform = 'none';
      return;
    }
    let scale = viewportHeight / contentHeight;
    if (scale < 0.85) {
      scaler.classList.add('compact-mode');
      void scaler.offsetHeight;
      scale = Math.max(viewportHeight / Math.max(scaler.scrollHeight, 1), 0.85);
    }
    scaler.style.height = `${viewportHeight / scale}px`;
    scaler.style.transform = `scale(${scale})`;
    scaler.style.width = `${100 / scale}%`;
  };
  fit();
  window.addEventListener('load', fit);
  window.addEventListener('resize', fit);
})();
