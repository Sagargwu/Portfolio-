/*==================== toggle icon navbar ============*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
  menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
  };
}

/*==================== scroll sections active link + sticky header ============*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.addEventListener('scroll', () => {
  let top = window.scrollY;

  sections.forEach(sec => {
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`header nav a[href*="${id}"]`);
      if (active) active.classList.add('active');
    }
  });

  /* sticky navbar */
  let header = document.querySelector('.header');
  if (header) header.classList.toggle('sticky', top > 100);

  /* close navbar on scroll */
  if (menuIcon) menuIcon.classList.remove('bx-x');
  if (navbar) navbar.classList.remove('active');
});

/*==================== theme toggle ============*/
let themeIcon = document.querySelector('.theme-toggle i');
let themeToggle = document.querySelector('.theme-toggle');

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
    const theme = isLight ? 'light' : 'dark';
    localStorage.setItem('theme', theme);

    if (isLight) {
      themeIcon.classList.replace('bx-moon', 'bx-sun');
    } else {
      themeIcon.classList.replace('bx-sun', 'bx-moon');
    }
  });
}

/*==================== DOMContentLoaded init ============*/
document.addEventListener('DOMContentLoaded', () => {
  /* restore theme */
  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme);

  /* Init tabs - click first tab automatically */
  const firstTab = document.querySelector('.tab-btn');
  if (firstTab) firstTab.click();

  /* Init portfolio filter - click All by default */
  const allBtn = document.querySelector('.filter-btn[data-filter="all"]') || document.querySelector('.filter-btn');
  if (allBtn) allBtn.click();

  /* prevent purple/blue link styling in portfolio (safe override) */
  if (!document.getElementById('portfolio-link-style-fix')) {
    const style = document.createElement('style');
    style.id = 'portfolio-link-style-fix';
    style.innerHTML = `
      .portfolio-box,
      .portfolio-box:visited,
      .portfolio-box:hover,
      .portfolio-box:active {
        color: #fff;
        text-decoration: none;
      }
      .portfolio-box h4,
      .portfolio-box p {
        color: #fff;
        text-decoration: none;
      }
    `;
    document.head.appendChild(style);
  }
});

/*==================== tab switching ============*/
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

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

/*==================== portfolio filter (All / Web / Data) ============*/
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-box'); // <a> elements too

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filterValue = btn.dataset.filter; // all, web, data

    portfolioItems.forEach(item => {
      const category = item.dataset.category;

      if (filterValue === 'all' || category === filterValue) {
        item.style.display = 'block';
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        }, 50);
      } else {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        setTimeout(() => {
          item.style.display = 'none';
        }, 250);
      }
    });
  });
});

/*==================== scroll reveal ============*/
if (typeof ScrollReveal !== 'undefined') {
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

/*==================== typed js ============*/
if (typeof Typed !== 'undefined' && document.querySelector('.multiple-text')) {
  new Typed('.multiple-text', {
    strings: ['Data Science Engineer', 'Information Technology Engineer', 'Data Analyst', 'Python Developer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
  });
}

/*==================== form handling ============*/
const contactForm = document.querySelector('.contact form');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formElements = this.elements;
    let isValid = true;

    for (let i = 0; i < formElements.length; i++) {
      if (formElements[i].required && !formElements[i].value.trim()) {
        isValid = false;
        formElements[i].classList.add('error', 'shake');
        setTimeout(() => formElements[i].classList.remove('shake'), 500);
      } else if (formElements[i].required) {
        formElements[i].classList.remove('error');
      }
    }

    const parent = document.querySelector('.contact') || document.body;

    const notification = document.createElement('div');
    notification.className = isValid ? 'success-message' : 'error-message';
    notification.innerHTML = isValid
      ? '<i class="fas fa-check-circle"></i> Thank you for your message! I will get back to you soon.'
      : '<i class="fas fa-exclamation-circle"></i> Please fill all required fields.';

    parent.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => notification.remove(), 500);
    }, 5000);

    if (isValid) this.reset();
  });
}

/*==================== add CSS for notifications (only once) ============*/
document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.innerHTML = `
      .success-message, .error-message {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: #fff;
        font-size: 1.6rem;
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.25);
        animation: slideIn 0.5s forwards;
        opacity: 1;
        transition: opacity 0.5s;
      }
      .success-message {
        background: linear-gradient(145deg, #00b7c7, #008394);
      }
      .error-message {
        background: linear-gradient(145deg, #ff4d4d, #cc0000);
      }
      @keyframes slideIn {
        from { transform: translateX(100px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      .shake { animation: shake 0.5s; }
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
      }
      .error {
        border: 1px solid #ff4d4d !important;
        box-shadow: 0 0 6px rgba(255, 77, 77, 0.55) !important;
      }
    `;
    document.head.appendChild(style);
  }
});
