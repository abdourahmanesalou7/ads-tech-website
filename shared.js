// ── NAV SCROLL ──────────────────────────────────────────────────────
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav?.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ── MOBILE MENU ─────────────────────────────────────────────────────
function toggleMenu() {
  document.getElementById('navMobile')?.classList.toggle('open');
}

// ── INTERSECTION OBSERVER — staggered reveals ────────────────────────
const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      e.target.style.animationDelay = (i * 0.08) + 's';
      e.target.classList.add('revealed');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

// ── SMOOTH COUNTER ───────────────────────────────────────────────────
function animateCounter(el) {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const duration = 1600;
  const start = performance.now();
  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = (Number.isInteger(target) ? Math.round(target * ease) : (target * ease).toFixed(1)) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const counterIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterIO.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => counterIO.observe(el));

// ── CURSOR GLOW (desktop only) ───────────────────────────────────────
if (window.innerWidth > 1024) {
  const glow = document.createElement('div');
  glow.style.cssText = 'position:fixed;width:400px;height:400px;border-radius:50%;pointer-events:none;z-index:0;transform:translate(-50%,-50%);background:radial-gradient(circle,rgba(201,168,76,.07) 0%,transparent 65%);transition:opacity .4s;opacity:0;';
  document.body.appendChild(glow);
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
    glow.style.opacity = '1';
  }, { passive: true });
  document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
}
