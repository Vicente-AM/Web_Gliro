// Widget de chat — consultor de Gliro (WordPress)
// Flujo: 1) formulario obligatorio (nombre + email o telefono) crea un Lead
// via /wp-json/gliro-chat/v1/register. 2) recien ahi se habilita el chat,
// que habla con /wp-json/gliro-chat/v1/message (DeepSeek vive solo en el
// servidor, la clave nunca viaja al navegador).

(function () {
  var config = window.gliroChatConfig || {};
  if (!config.registerEndpoint || !config.messageEndpoint) return;

  var toggle = document.getElementById('chat-toggle');
  var panel = document.getElementById('chat-panel');
  var closeBtn = document.getElementById('chat-close');
  var registerWrap = document.getElementById('chat-register');
  var registerForm = document.getElementById('chat-register-form');
  var registerError = document.getElementById('chat-register-error');
  var messagesEl = document.getElementById('chat-messages');
  var chatForm = document.getElementById('chat-form');
  var input = document.getElementById('chat-input');

  if (!toggle || !panel || !closeBtn || !registerWrap || !registerForm || !messagesEl || !chatForm || !input) return;

  var history = [];
  var sending = false;
  var registering = false;
  var leadId = null;
  var leadNombre = '';

  try {
    var savedId = sessionStorage.getItem('gliro_lead_id');
    var savedNombre = sessionStorage.getItem('gliro_lead_nombre');
    if (savedId) {
      leadId = savedId;
      leadNombre = savedNombre || '';
    }
  } catch (e) {
    /* sessionStorage no disponible, seguimos sin recordar entre recargas */
  }

  function showChat() {
    registerWrap.hidden = true;
    messagesEl.hidden = false;
    chatForm.hidden = false;
    if (!messagesEl.childElementCount) {
      addBubble(
        'assistant',
        (leadNombre ? 'Hola ' + leadNombre + ', ' : 'Hola, ') +
          'soy el asistente de Gliro. Cuéntame en qué proyecto estás pensando y te ayudo a ver qué solución te conviene.'
      );
    }
  }

  function addBubble(role, text) {
    var bubble = document.createElement('div');
    bubble.className = 'chat-bubble chat-bubble-' + role;
    bubble.textContent = text;
    messagesEl.appendChild(bubble);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return bubble;
  }

  function addNote(text) {
    var note = document.createElement('div');
    note.className = 'chat-note';
    note.textContent = text;
    messagesEl.appendChild(note);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function addTyping() {
    var bubble = document.createElement('div');
    bubble.className = 'chat-bubble chat-bubble-assistant chat-typing';
    bubble.innerHTML = '<span></span><span></span><span></span>';
    messagesEl.appendChild(bubble);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return bubble;
  }

  function openPanel() {
    panel.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    if (leadId) {
      showChat();
      input.focus();
    } else {
      document.getElementById('reg-nombre').focus();
    }
  }

  function closePanel() {
    panel.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', function () {
    if (panel.classList.contains('is-open')) closePanel();
    else openPanel();
  });

  closeBtn.addEventListener('click', closePanel);

  registerForm.addEventListener('submit', function (event) {
    event.preventDefault();
    if (registering) return;

    var nombre = document.getElementById('reg-nombre').value.trim();
    var email = document.getElementById('reg-email').value.trim();
    var telefono = document.getElementById('reg-telefono').value.trim();
    var empresa = document.getElementById('reg-empresa').value.trim();

    registerError.hidden = true;

    if (!nombre) {
      registerError.textContent = 'Ingresa tu nombre.';
      registerError.hidden = false;
      return;
    }
    if (!email && !telefono) {
      registerError.textContent = 'Déjanos al menos un email o un teléfono.';
      registerError.hidden = false;
      return;
    }

    registering = true;
    var submitBtn = registerForm.querySelector('.btn-register');
    if (submitBtn) submitBtn.disabled = true;

    fetch(config.registerEndpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ nombre: nombre, email: email, telefono: telefono, empresa: empresa }),
    })
      .then(function (res) {
        return res.json().then(function (data) {
          return { ok: res.ok, data: data };
        });
      })
      .then(function (result) {
        if (!result.ok) {
          registerError.textContent = (result.data && result.data.error) || 'No pudimos guardar tus datos. Intenta de nuevo.';
          registerError.hidden = false;
          return;
        }
        leadId = result.data.lead_id;
        leadNombre = result.data.nombre || nombre;
        try {
          sessionStorage.setItem('gliro_lead_id', String(leadId));
          sessionStorage.setItem('gliro_lead_nombre', leadNombre);
        } catch (e) {
          /* sin sessionStorage, no pasa nada grave */
        }
        showChat();
        input.focus();
      })
      .catch(function () {
        registerError.textContent = 'No pudimos conectarnos. Revisa tu conexión e intenta de nuevo.';
        registerError.hidden = false;
      })
      .finally(function () {
        registering = false;
        if (submitBtn) submitBtn.disabled = false;
      });
  });

  chatForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var text = input.value.trim();
    if (!text || sending || !leadId) return;

    addBubble('user', text);
    history.push({ role: 'user', content: text });
    input.value = '';
    sending = true;

    var typingBubble = addTyping();

    fetch(config.messageEndpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ lead_id: leadId, messages: history }),
    })
      .then(function (res) {
        return res.json().then(function (data) {
          return { ok: res.ok, data: data };
        });
      })
      .then(function (result) {
        typingBubble.remove();
        var data = result.data;
        if (!result.ok) {
          addBubble('assistant', (data && data.error) || 'Hubo un problema. Intenta de nuevo en un momento.');
        } else if (data && data.reply) {
          addBubble('assistant', data.reply);
          history.push({ role: 'assistant', content: data.reply });
          if (data.leadUpdated) {
            addNote('Un consultor de Gliro va a contactarte pronto.');
          }
        } else {
          addBubble('assistant', 'No pude generar una respuesta. Intenta de nuevo.');
        }
      })
      .catch(function () {
        typingBubble.remove();
        addBubble('assistant', 'No pude conectarme. Revisa tu conexión o escríbenos por WhatsApp mientras tanto.');
      })
      .finally(function () {
        sending = false;
        input.focus();
      });
  });
})();
