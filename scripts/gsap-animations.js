/**
 * GSAP Advanced Animations for Portfolio
 * @author Jakub Růžička
 * @version 1.0.0
 * FIXED VERSION - Production Ready
 */

class GSAPAnimations {
    constructor() {
        this.isInitialized = false;
        this.timelines = {};
        this.scrollTriggers = [];
        this.init();
    }

    init() {
        // Kontrola, zda je GSAP načteno
        if (typeof gsap === 'undefined') {
            console.error('❌ GSAP library not loaded!');
            return;
        }

        // Registrace pluginů
        gsap.registerPlugin(ScrollTrigger, TextPlugin);
        
        // Set default easing
        gsap.defaults({
            ease: "power3.out",
            duration: 1
        });

        // Inicializace všech animací
        this.setupAnimations();
        
        // Setup event listeners
        this.setupEventListeners();
        
        this.isInitialized = true;
        console.log('✨ GSAP Animations initialized successfully!');
    }

    setupAnimations() {
        // Počkáme na načtení DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.runAllAnimations();
            });
        } else {
            this.runAllAnimations();
        }
    }

    runAllAnimations() {
        this.createProgressBar();
        this.heroAnimation();
        this.navbarAnimation();
        this.workCardsAnimation();
        this.aboutSectionAnimation();
        this.textRevealAnimation();
        this.parallaxEffects();
        this.magneticButtons();
        this.footerAnimation();
        this.miscAnimations();
    }

    // ============================================
    // 1. PROGRESS BAR
    // ============================================
    createProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.className = 'gsap-progress-bar';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
            transform-origin: left;
            transform: scaleX(0);
            z-index: 10000;
            pointer-events: none;
        `;
        document.body.appendChild(progressBar);

        gsap.to('.gsap-progress-bar', {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
                start: "top top",
                end: "max",
                scrub: 0.3
            }
        });
    }

    // ============================================
    // 2. NAVBAR ANIMATION
    // ============================================
    navbarAnimation() {
        const navbar = document.querySelector('#iq615l');
        if (!navbar) return;

        ScrollTrigger.create({
            start: "top -100",
            end: 99999,
            toggleClass: {
                targets: navbar,
                className: "gsap-scrolled"
            }
        });

        const navItems = document.querySelectorAll('.navbar-menu-nav a');
        if (navItems.length) {
            gsap.from(navItems, {
                y: -30,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                delay: 0.5
            });
        }
    }

    // ============================================
    // 3. HERO ANIMATION
    // ============================================
    heroAnimation() {
        const tl = gsap.timeline({
            defaults: {
                ease: "power3.out"
            }
        });

        this.timelines.hero = tl;

        // Check if elements exist
        if (document.querySelector("#i4tkr")) {
            tl.from("#i4tkr", {
                y: 100,
                opacity: 0,
                scale: 0.9,
                duration: 1.2,
                ease: "back.out(1.7)"
            });
        }

        if (document.querySelector("#iv2wn")) {
            tl.from("#iv2wn", {
                scale: 0,
                rotation: -180,
                opacity: 0,
                duration: 1,
                ease: "elastic.out(1, 0.5)"
            }, "-=0.6");

            // Floating animation
            gsap.to("#iv2wn", {
                y: -20,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }

        if (document.querySelector("#im13y")) {
            tl.from("#im13y", {
                y: 50,
                opacity: 0,
                duration: 1
            }, "-=0.4");
        }

        if (document.querySelector("#ifjoh")) {
            tl.from("#ifjoh", {
                x: -50,
                opacity: 0,
                scale: 0.8,
                duration: 0.8
            }, "-=0.3");
        }

        if (document.querySelector("#ih6oh")) {
            tl.from("#ih6oh", {
                scale: 0,
                rotation: 360,
                duration: 0.5
            }, "-=0.2");
        }
    }

    // ============================================
    // 4. WORK CARDS
    // ============================================
    workCardsAnimation() {
        const cards = [
            { id: "#ie33q", title: "#itt22", img: "#iqc0c" },
            { id: "#i5kiv", title: "#ib9zk", img: "#iqc0c-4" },
            { id: "#ieufj", title: "#ivdo7", img: "#iqc0c-5" },
            { id: "#iuqai", title: "#ihsfk", img: "#iqc0c-4-2" }
        ];

        // Section title
        if (document.querySelector("#i1bcf")) {
            gsap.from("#i1bcf", {
                scrollTrigger: {
                    trigger: "#ijxck",
                    start: "top 80%",
                },
                x: -100,
                opacity: 0,
                duration: 1
            });
        }

        cards.forEach((card, index) => {
            const element = document.querySelector(card.id);
            if (!element) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: card.id,
                    start: "top 85%",
                    end: "top 30%",
                    toggleActions: "play none none reverse",
                }
            });

            // Card reveal
            tl.from(card.id, {
                y: 100,
                opacity: 0,
                rotationX: -15,
                transformPerspective: 1000,
                duration: 1,
                ease: "power3.out"
            });

            // Image zoom
            if (document.querySelector(card.img)) {
                tl.from(card.img, {
                    scale: 1.3,
                    duration: 1.5,
                    ease: "power2.out"
                }, "-=1");
            }

            // Title slide
            if (document.querySelector(card.title)) {
                tl.from(card.title, {
                    x: -50,
                    opacity: 0,
                    duration: 0.8
                }, "-=0.8");
            }

            // 3D Hover effect
            element.addEventListener("mouseenter", () => {
                gsap.to(element, {
                    scale: 1.05,
                    rotationY: 5,
                    z: 50,
                    duration: 0.4,
                    ease: "power2.out"
                });
            });

            element.addEventListener("mousemove", (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                gsap.to(element, {
                    rotationX: rotateX,
                    rotationY: rotateY,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            element.addEventListener("mouseleave", () => {
                gsap.to(element, {
                    scale: 1,
                    rotationX: 0,
                    rotationY: 0,
                    z: 0,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.3)"
                });
            });

            // Image parallax
            if (document.querySelector(card.img)) {
                gsap.to(card.img, {
                    scrollTrigger: {
                        trigger: card.id,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1
                    },
                    y: -30,
                    ease: "none"
                });
            }
        });
    }

    // ============================================
    // 5. ABOUT SECTION
    // ============================================
    aboutSectionAnimation() {
        if (document.querySelector("#i8uif")) {
            gsap.from("#i8uif", {
                scrollTrigger: {
                    trigger: "#iawlf",
                    start: "top 80%"
                },
                x: -100,
                opacity: 0,
                duration: 1
            });
        }

        if (document.querySelector("#i2sah")) {
            gsap.from("#i2sah", {
                scrollTrigger: {
                    trigger: "#i2sah",
                    start: "top 80%"
                },
                y: 50,
                opacity: 0,
                duration: 1
            });
        }

        if (document.querySelector("#i4q0l")) {
            gsap.from("#i4q0l", {
                scrollTrigger: {
                    trigger: "#i4q0l",
                    start: "top 80%"
                },
                scale: 0.8,
                opacity: 0,
                rotation: -5,
                duration: 1.2,
                ease: "back.out(1.7)"
            });
        }

        // Word reveal animation
        const longText = document.querySelector("#ijnrc");
        if (longText) {
            const words = longText.textContent.split(" ");
            longText.innerHTML = words.map(word => 
                `<span class="gsap-word" style="display: inline-block; opacity: 0.2;">${word}</span>`
            ).join(" ");

            gsap.to(".gsap-word", {
                scrollTrigger: {
                    trigger: longText,
                    start: "top 80%",
                    end: "bottom 60%",
                    scrub: 1
                },
                opacity: 1,
                y: 0,
                stagger: 0.1,
                ease: "none"
            });
        }
    }

    // ============================================
    // 6. TEXT REVEAL
    // ============================================
    textRevealAnimation() {
        const gradientText = document.querySelector("#iuuay");
        if (!gradientText) return;

        gsap.to(gradientText, {
            scrollTrigger: {
                trigger: gradientText,
                start: "top 80%",
                end: "bottom 20%",
                scrub: 1
            },
            backgroundPosition: "200% center",
            ease: "none"
        });

        gsap.from(gradientText, {
            scrollTrigger: {
                trigger: gradientText,
                start: "top 80%"
            },
            scale: 0.9,
            opacity: 0,
            duration: 1.5,
            ease: "power2.out"
        });
    }

    // ============================================
    // 7. PARALLAX EFFECTS
    // ============================================
    parallaxEffects() {
        const images = document.querySelectorAll("img");
        images.forEach(img => {
            gsap.to(img, {
                scrollTrigger: {
                    trigger: img,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                },
                yPercent: -10,
                ease: "none"
            });
        });
    }

    // ============================================
    // 8. MAGNETIC BUTTONS
    // ============================================
    magneticButtons() {
        const buttons = document.querySelectorAll("#iyeh2, .navbar-menu-nav a");

        buttons.forEach(button => {
            button.style.position = 'relative';
            
            button.addEventListener("mouseenter", () => {
                gsap.to(button, {
                    scale: 1.1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            button.addEventListener("mousemove", (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                gsap.to(button, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            button.addEventListener("mouseleave", () => {
                gsap.to(button, {
                    x: 0,
                    y: 0,
                    scale: 1,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.3)"
                });
            });
        });
    }

    // ============================================
    // 9. FOOTER ANIMATION
    // ============================================
    footerAnimation() {
        const footer = document.querySelector("#i4bac");
        if (!footer) return;

        const footerTl = gsap.timeline({
            scrollTrigger: {
                trigger: footer,
                start: "top 80%"
            }
        });

        const elements = [
            "#i2fjb",
            "#iuuay", 
            "#iyeh2",
            "#iaao4",
            "#i1xwm",
            "#i57k0v",
            "#i3lce",
            "#im1i8g"
        ];

        elements.forEach((selector, index) => {
            if (document.querySelector(selector)) {
                footerTl.from(selector, {
                    y: 30,
                    opacity: 0,
                    duration: 0.6
                }, index * 0.1);
            }
        });

        // Pulsing dot
        if (document.querySelector("#izf5a")) {
            gsap.to("#izf5a", {
                scale: 1.2,
                opacity: 0.5,
                duration: 1,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }
    }

    // ============================================
    // 10. MISC ANIMATIONS
    // ============================================
    miscAnimations() {
        ScrollTrigger.batch(".gjs-plg-flex-column", {
            onEnter: batch => gsap.from(batch, {
                opacity: 0,
                y: 50,
                stagger: 0.15,
                duration: 1,
                ease: "power2.out",
                overwrite: 'auto'
            }),
            start: "top 90%",
            once: true
        });

        if (document.querySelector("#iixa7u")) {
            gsap.from("#iixa7u", {
                scale: 0,
                rotation: 360,
                duration: 1,
                ease: "elastic.out(1, 0.5)"
            });
        }
    }

    // ============================================
    // EVENT LISTENERS
    // ============================================
    setupEventListeners() {
        window.addEventListener("load", () => {
            ScrollTrigger.refresh();
        });

        let resizeTimer;
        window.addEventListener("resize", () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                ScrollTrigger.refresh();
            }, 250);
        });

        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                gsap.globalTimeline.pause();
            } else {
                gsap.globalTimeline.resume();
            }
        });
    }

    // ============================================
    // PUBLIC METHODS
    // ============================================
    
    pauseAll() {
        gsap.globalTimeline.pause();
        console.log('⏸ All animations paused');
    }

    resumeAll() {
        gsap.globalTimeline.resume();
        console.log('▶️ All animations resumed');
    }

    destroy() {
        ScrollTrigger.getAll().forEach(st => st.kill());
        gsap.killTweensOf("*");
        this.timelines = {};
        console.log('💀 All animations destroyed');
    }

    refresh() {
        ScrollTrigger.refresh();
        console.log('🔄 ScrollTrigger refreshed');
    }

    getTimeline(name) {
        return this.timelines[name];
    }
}

// ============================================
// INITIALIZATION
// ============================================

let gsapAnimations;

const initGSAP = () => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsapAnimations = new GSAPAnimations();
        window.gsapAnimations = gsapAnimations;
    } else {
        console.warn('⚠️ GSAP not loaded yet, retrying...');
        setTimeout(initGSAP, 100);
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGSAP);
} else {
    initGSAP();
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = GSAPAnimations;
}
