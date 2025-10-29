// Hlavní aplikace
class App {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupScrollEffects();
        this.setupAnimations();
        console.log('Aplikace úspěšně načtena!');
    }

    // Nastavení event listenerů
    setupEventListeners() {
        // Smooth scrolling pro navigační odkazy
        this.setupSmoothScrolling();

        // Form submission
        this.setupFormHandling();

        // Scroll to top button
        this.setupScrollToTop();

        // Mobile menu
        this.setupMobileMenu();
    }

    // Smooth scrolling
    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-links a');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');

                if (targetId.startsWith('#')) {
                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        const offsetTop = targetSection.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    // Form handling
    setupFormHandling() {
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(contactForm);
            });
        }

        // CTA button
        const ctaButton = document.querySelector('.hero .cta-button');
        if (ctaButton) {
            ctaButton.addEventListener('click', () => {
                this.showNotification('Děkujeme za váš zájem! Brzy se vám ozveme.', 'success');
            });
        }
    }

    // Form submission
    async handleFormSubmit(form) {
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;

        try {
            // Simulace odeslání
            submitButton.innerHTML = '<div class="loading"></div>';
            submitButton.disabled = true;

            await new Promise(resolve => setTimeout(resolve, 2000));

            this.showNotification('Zpráva úspěšně odeslána! Ozveme se vám co nejdříve.', 'success');
            form.reset();

        } catch (error) {
            this.showNotification('Chyba při odesílání zprávy. Zkuste to prosím znovu.', 'error');
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    }

    // Scroll effects
    setupScrollEffects() {
        const header = document.querySelector('.header');

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;

            // Header background
            if (scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'var(--white)';
                header.style.backdropFilter = 'none';
            }

            // Scroll to top button
            this.toggleScrollToTop(scrollY);

            // Animation on scroll
            this.handleScrollAnimations();
        });
    }

    // Scroll to top functionality
    setupScrollToTop() {
        // Create scroll to top button
        const scrollButton = document.createElement('button');
        scrollButton.className = 'scroll-top';
        scrollButton.innerHTML = '↑';
        scrollButton.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(scrollButton);

        scrollButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    toggleScrollToTop(scrollY) {
        const scrollButton = document.querySelector('.scroll-top');
        if (scrollButton) {
            if (scrollY > 300) {
                scrollButton.style.display = 'flex';
            } else {
                scrollButton.style.display = 'none';
            }
        }
    }

    // Animations
    setupAnimations() {
        // Intersection Observer pro animace při scrollování
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Pozorovatelné elementy
        const animatedElements = document.querySelectorAll('.feature-card, .service-card, .contact-info');
        animatedElements.forEach(el => observer.observe(el));
    }

    handleScrollAnimations() {
        const elements = document.querySelectorAll('.feature-card, .service-card');
        elements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }

    // Mobile menu
    setupMobileMenu() {
        const menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.innerHTML = '☰';
        menuToggle.setAttribute('aria-label', 'Toggle menu');

        const nav = document.querySelector('.nav');
        const navLinks = document.querySelector('.nav-links');

        // Přidáme toggle button do navigace
        if (nav && navLinks) {
            nav.appendChild(menuToggle);

            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                menuToggle.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
            });

            // Zavření menu po kliknutí na odkaz
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    menuToggle.innerHTML = '☰';
                });
            });
        }
    }

    // Notification system
    showNotification(message, type = 'info') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create new notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Styly pro notifikace
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'error' ? '#ff4757' : '#2ed573',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '5px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });

        document.body.appendChild(notification);

        // Animace vstupu
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Automatické odstranění
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    }
}

// Inicializace aplikace při načtení stránky
document.addEventListener('DOMContentLoaded', () => {
    new App();
});

// Přidání CSS pro inicializaci animací
const style = document.createElement('style');
style.textContent = `
    .feature-card,
    .service-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .notification {
        font-weight: 500;
    }function syncNavbarPadding() {
  const nav = document.querySelector('.navbar.navbar--fixed');
  if (!nav) return;
  const h = nav.offsetHeight;
  document.documentElement.style.setProperty('--navbar-height', h + 'px');
}
window.addEventListener('load', syncNavbarPadding);
window.addEventListener('resize', syncNavbarPadding);`;
document.head.appendChild(style);
