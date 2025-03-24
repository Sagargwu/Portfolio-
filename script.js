/*==================== toggle icon navbar ============*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

/*==================== scroll sections active link ============*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        
        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
            });
            document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
        }
    });

    /*==================== sticky navbar ============*/
    let header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 100);

    /*==================== remove toggle icon and navbar when click navbar link (scroll) ============*/
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

/*==================== theme toggle - improved ============*/
let themeIcon = document.querySelector('.theme-toggle i');
document.querySelector('.theme-toggle').onclick = () => {
    document.body.classList.toggle('light-mode');
    if(document.body.classList.contains('light-mode')) {
        themeIcon.classList.replace('bx-moon', 'bx-sun');
        localStorage.setItem('theme', 'light');
    } else {
        themeIcon.classList.replace('bx-sun', 'bx-moon');
        localStorage.setItem('theme', 'dark');
    }
};

// Check for saved theme preference
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeIcon.classList.replace('bx-moon', 'bx-sun');
    }
    
    // Initialize tabs - select first tab by default
    if(document.querySelector('.tab-btn')) {
        document.querySelector('.tab-btn').click();
    }
    
    // Initialize portfolio filter - select 'all' by default
    if(document.querySelector('.filter-btn')) {
        document.querySelector('.filter-btn').click();
    }
});

/*==================== tab switching ============*/
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;
        
        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        btn.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

/*==================== portfolio filter ============*/
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-box');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(btn => btn.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.dataset.filter;
        
        portfolioItems.forEach(item => {
            if(filterValue === 'all' || item.dataset.category === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

/*==================== scroll reveal ============*/
// Check if ScrollReveal is available
if(typeof ScrollReveal !== 'undefined') {
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
// Check if Typed is available
if(typeof Typed !== 'undefined' && document.querySelector('.multiple-text')) {
    const typed = new Typed('.multiple-text', {
        strings: ['Data Science Engineer', 'Information Technology Engineer', 'Data Analyst', 'Python Developer'],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });
}

/*==================== form handling ============*/
// Initialize form handling with improved feedback
const contactForm = document.querySelector('.contact form');
if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form validation
        const formElements = this.elements;
        let isValid = true;
        
        for(let i = 0; i < formElements.length; i++) {
            if(formElements[i].required && !formElements[i].value) {
                isValid = false;
                formElements[i].classList.add('error');
                // Add shake animation
                formElements[i].classList.add('shake');
                setTimeout(() => {
                    formElements[i].classList.remove('shake');
                }, 500);
            } else if(formElements[i].required) {
                formElements[i].classList.remove('error');
            }
        }
        
        if(isValid) {
            // Create success notification
            const notification = document.createElement('div');
            notification.className = 'success-message';
            notification.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for your message! I will get back to you soon.';
            document.querySelector('.contact').appendChild(notification);
            
            // Remove notification after 5 seconds
            setTimeout(() => {
                notification.style.opacity = '0';
                setTimeout(() => {
                    notification.remove();
                }, 500);
            }, 5000);
            
            this.reset();
        } else {
            // Create error notification
            const notification = document.createElement('div');
            notification.className = 'error-message';
            notification.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please fill all required fields.';
            document.querySelector('.contact').appendChild(notification);
            
            // Remove notification after 5 seconds
            setTimeout(() => {
                notification.style.opacity = '0';
                setTimeout(() => {
                    notification.remove();
                }, 500);
            }, 5000);
        }
    });
}

/*==================== add CSS for notifications ============*/
// Add CSS for notifications if not present
document.addEventListener('DOMContentLoaded', () => {
    if(!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.innerHTML = `
            .success-message, .error-message {
                position: fixed;
                bottom: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 5px;
                color: #fff;
                font-size: 1.6rem;
                z-index: 1000;
                display: flex;
                align-items: center;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
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
            .success-message i, .error-message i {
                margin-right: 10px;
                font-size: 2rem;
            }
            @keyframes slideIn {
                from {transform: translateX(100px); opacity: 0;}
                to {transform: translateX(0); opacity: 1;}
            }
            .shake {
                animation: shake 0.5s;
            }
            @keyframes shake {
                0%, 100% {transform: translateX(0);}
                10%, 30%, 50%, 70%, 90% {transform: translateX(-5px);}
                20%, 40%, 60%, 80% {transform: translateX(5px);}
            }
            .error {
                border: 1px solid #ff4d4d !important;
                box-shadow: 0 0 5px rgba(255, 77, 77, 0.5) !important;
            }
        `;
        document.head.appendChild(style);
    }
});