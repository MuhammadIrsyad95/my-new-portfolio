// Typed.js (headline rotator)
window.addEventListener('DOMContentLoaded', () => {
  if (window.Typed) {
    new Typed(".multiple-text", {
      strings: ["Full Stack Developer", ".NET Developer", "React/Next.js Developer"],
      typeSpeed: 80,
      backSpeed: 70,
      backDelay: 900,
      loop: true,
    });
  }
});

// Header scroll effect (with rAF untuk smooth)
(() => {
  const header = document.querySelector('.header');
  let ticking = false;

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        header.classList.toggle('scrolled', window.scrollY > 80);
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// Mobile menu toggle (aksesibel + body lock)
(() => {
  const toggleBtn = document.getElementById('menu-toggle');
  const nav = document.getElementById('site-nav');

  if (!toggleBtn || !nav) return;

  const closeMenu = () => {
    nav.classList.remove('active');
    document.body.classList.remove('mobile-menu-open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.innerHTML = '<i class="bx bx-menu"></i>';
  };

  const openMenu = () => {
    nav.classList.add('active');
    document.body.classList.add('mobile-menu-open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    toggleBtn.innerHTML = '<i class="bx bx-x"></i>';
  };

  toggleBtn.addEventListener('click', () => {
    if (nav.classList.contains('active')) closeMenu();
    else openMenu();
  });

  // Tutup saat klik link
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => closeMenu());
  });

  // Tutup saat ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
})();

// Smooth scroll untuk anchor (mengandalkan CSS scroll-margin-top)
(() => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

// Contact form (dummy submit)
(() => {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    console.log('Contact form submitted:', data);
    alert('Thank you for your message! I will get back to you soon.');
    form.reset();
  });
})();

// Animate on scroll (fade-in) – ringan & aman mobile
(() => {
  const elements = document.querySelectorAll('.timeline-item, .project-card, .skill-category, .contact-item');
  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.style.animation = 'fadeIn .7s ease forwards');
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeIn .7s ease forwards';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(el => observer.observe(el));
})();
