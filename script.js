/* ==================== NAVBAR TOGGLE ==================== */
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
  menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
  });
}

/* ==================== ACTIVE NAV LINK + STICKY HEADER ==================== */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

window.addEventListener('scroll', () => {
  const top = window.scrollY;

  sections.forEach(sec => {
    const offset = sec.offsetTop - 150;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`header nav a[href*="${id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });

  const header = document.querySelector('.header');
  if (header) header.classList.toggle('sticky', top > 100);

  // close nav on scroll (mobile)
  if (menuIcon) menuIcon.classList.remove('bx-x');
  if (navbar) navbar.classList.remove('active');
});

/* ==================== THEME TOGGLE ==================== */
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-toggle i');

function applyTheme(theme) {
  if (!themeIcon) return;

  if (theme === 'light') {
    document.body.classList.add('light-mode');
    themeIcon.classList.remove('bx-moon');
    themeIcon.classList.add('bx-sun');
  } else {
    document.body.classList.remove('light-mode');
    themeIcon.classList.remove('bx-sun');
    themeIcon.classList.add('bx-moon');
  }
}

if (themeToggle && themeIcon) {
  themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');

    if (isLight) themeIcon.classList.replace('bx-moon', 'bx-sun');
    else themeIcon.classList.replace('bx-sun', 'bx-moon');
  });
}

/* ==================== TABS (ABOUT SECTION) ==================== */
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  if (!tabBtns.length || !tabContents.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const target = document.getElementById(tabId);
      if (target) target.classList.add('active');
    });
  });

  // default open first tab
  tabBtns[0].click();
}

/* ==================== PORTFOLIO FILTER ==================== */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-box');

  if (!filterBtns.length || !portfolioItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.dataset.filter; // all, web, data

      portfolioItems.forEach(item => {
        const category = item.dataset.category;

        if (filterValue === 'all' || category === filterValue) {
          item.style.display = 'block';
          requestAnimationFrame(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          });
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // default click All
  const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
  (allBtn || filterBtns[0]).click();
}

/* ==================== MAKE ENTIRE PROJECT CARD CLICKABLE ==================== */
function initPortfolioCardClick() {
  const boxes = document.querySelectorAll('.portfolio-box');
  if (!boxes.length) return;

  boxes.forEach(box => {
    const link = box.dataset.link;

    if (link && link !== '#') {
      box.style.cursor = 'pointer';

      box.addEventListener('click', (e) => {
        if (e.target.closest('a')) return; // allow icon click
        window.open(link, '_blank', 'noopener');
      });
    }
  });
}

/* ==================== SCROLL REVEAL ==================== */
function initScrollReveal() {
  if (typeof ScrollReveal === 'undefined') return;

  ScrollReveal({
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
  });

  ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
  ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
  ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
  ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });
  ScrollReveal().reveal('.contact-info, .contact-map, .footer', { origin: 'bottom' });
}

/* ==================== TYPED JS ==================== */
function initTyped() {
  if (typeof Typed === 'undefined') return;
  const el = document.querySelector('.multiple-text');
  if (!el) return;

  new Typed('.multiple-text', {
    strings: ['Data Analyst', 'Data Science Candidate', 'BI & Reporting', 'Python Developer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
  });
}

/* ==================== NOTIFICATION STYLES (ONCE) ==================== */
function injectNotificationCSS() {
  if (document.getElementById('notification-styles')) return;

  const style = document.createElement('style');
  style.id = 'notification-styles';
  style.innerHTML = `
    .success-message, .error-message {
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 14px 18px;
      border-radius: 10px;
      color: #fff;
      font-size: 1.5rem;
      z-index: 2000;
      display: flex;
      align-items: center;
      gap: 10px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.25);
      animation: slideIn 0.4s forwards;
      opacity: 1;
      transition: opacity 0.4s;
    }
    .success-message { background: linear-gradient(145deg, #00b7c7, #008394); }
    .error-message { background: linear-gradient(145deg, #ff4d4d, #cc0000); }
    @keyframes slideIn {
      from { transform: translateX(80px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    .error {
      border: 1px solid #ff4d4d !important;
      box-shadow: 0 0 6px rgba(255, 77, 77, 0.55) !important;
    }
  `;
  document.head.appendChild(style);
}

/* ==================== CONTACT FORM (MAILTO SAFARI-SAFE) ==================== */
/* REQUIREMENT: <form id="contactForm"> ... */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Grab values safely (works with your placeholders)
    const name = form.querySelector('input[placeholder="Full Name"]')?.value.trim() || '';
    const email = form.querySelector('input[placeholder="Email Address"]')?.value.trim() || '';
    const phone = form.querySelector('input[placeholder="Phone Number"]')?.value.trim() || '';
    const subject = form.querySelector('input[placeholder="Subject"]')?.value.trim() || '';
    const message = form.querySelector('textarea')?.value.trim() || '';

    // Basic validation
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        isValid = false;
        field.classList.add('error');
      } else {
        field.classList.remove('error');
      }
    });

    injectNotificationCSS();

    const notify = document.createElement('div');
    notify.className = isValid ? 'success-message' : 'error-message';
    notify.innerHTML = isValid
      ? '<i class="fas fa-check-circle"></i> Opening your email client...'
      : '<i class="fas fa-exclamation-circle"></i> Please fill all required fields.';

    document.body.appendChild(notify);

    setTimeout(() => {
      notify.style.opacity = '0';
      setTimeout(() => notify.remove(), 400);
    }, 3500);

    if (!isValid) return;

    const body = `
Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}
`.trim();

    const mailto = `mailto:sagarshah2745@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Safari-safe
    window.location.href = mailto;

    form.reset();
  });
}

/* ==================== DOM READY INIT ==================== */
document.addEventListener('DOMContentLoaded', () => {
  // Restore saved theme
  applyTheme(localStorage.getItem('theme') || 'dark');

  initTabs();
  initPortfolioFilter();
  initPortfolioCardClick();
  initScrollReveal();
  initTyped();
  initContactForm();
});
