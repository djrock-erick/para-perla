/* jshint esversion: 6, browser: true */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Partículas sutiles de fondo
  const particlesContainer = document.getElementById('particles');
  const particleCount = 7;

  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    
    const size = Math.floor(Math.random() * 8) + 5;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = (Math.random() * 100) + 'vw';
    p.style.opacity = (Math.random() * 0.2 + 0.15).toFixed(2);
    
    const duration = Math.random() * 12 + 14;
    p.style.animationDuration = duration + 's';
    p.style.animationDelay = (Math.random() * 4) + 's';
    
    particlesContainer.appendChild(p);
  }

  // 2. Control de botones interactivos
  const btnYes = document.getElementById('btn-yes');
  const btnNo = document.getElementById('btn-no');
  const heroView = document.getElementById('hero-view');
  const successView = document.getElementById('success-view');
  const funHint = document.getElementById('fun-hint');

  const funnyTexts = [
    "Esta vez no podrás seleccionar las dos. 😜",
    "Hmm... esa opción parece sospechosamente difícil de tocar. 😂",
    "¿Segura, Perla? Piénsalo dos veces... 😏",
    "¡El botón de 'Sí' tiene muchísima mejor vibra! ✨",
    "Esa opción está temporalmente fuera de servicio 😜"
  ];
  let clickCount = 0;

  // Efecto escurridizo
  btnNo.addEventListener('click', (e) => {
    e.preventDefault();
    const randomX = (Math.random() - 0.5) * 60;
    const randomY = (Math.random() - 0.5) * 30;
    btnNo.style.transform = 'translate(' + randomX + 'px, ' + randomY + 'px)';
    
    funHint.textContent = funnyTexts[clickCount % funnyTexts.length];
    clickCount++;
  });

  // Al aceptar la cita
  btnYes.addEventListener('click', (e) => {
    createHeartExplosion(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2);

    setTimeout(() => {
      heroView.classList.remove('view-active');
      heroView.style.display = 'none';

      successView.classList.remove('view-hidden');
      successView.classList.add('view-active');
    }, 450);
  });

  // Lluvia / Explosión de corazones y destellos
  function createHeartExplosion(x, y) {
    const emojis = ['💕', '💖', '✨', '🥰', '🌸'];
    for (let i = 0; i < 10; i++) {
      const heart = document.createElement('div');
      heart.classList.add('flying-heart');
      heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      
      const offsetX = (Math.random() - 0.5) * 140;
      heart.style.left = (x + offsetX) + 'px';
      heart.style.top = y + 'px';
      
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 1600);
    }
  }

  // 3. Envío asíncrono con Formspree
  const form = document.getElementById('date-form');
  const statusMsg = document.getElementById('submit-status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    statusMsg.textContent = "Guardando respuesta... 💌";
    statusMsg.style.color = "#FFD166";

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        statusMsg.textContent = "¡Listo! Ya me llegó tu respuesta al correo 🥰✨";
        statusMsg.style.color = "#86efac";
        form.reset();
      } else {
        statusMsg.textContent = "Hubo un pequeño detalle de envío, pero el 'Sí' ya quedó guardado 😉";
        statusMsg.style.color = "#FF9DBB";
      }
    } catch (err) {
      statusMsg.textContent = "¡La cita ya es un hecho! 💕 Nos vemos pronto.";
      statusMsg.style.color = "#FF9DBB";
    }
  });
});