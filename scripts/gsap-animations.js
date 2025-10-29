/**
 * GSAP Advanced Animations for Portfolio
 * @author Jakub Růžička
 * @version 1.0.0
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
            console.error('GSAP library not loaded!');
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
        // Vytvoření progress bar elementu
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
        `;
        document.body.appendChild(progressBar);

        // Animace progress baru
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

        // Navbar show/hide na scroll
        ScrollTrigger.create({
            start: "top -100",
            end: 99999,
            toggleClass: {
                targets: navbar,
                className: "gsap-scrolled"
            }
        });

        // Navbar items stagger
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
    // 3. HERO ANIMATION - Komplexní Timeline
    // ============================================
    heroAnimation() {
        const tl = gsap.timeline({
            defaults: {
                ease: "power3.out"
            }
        });

        this.timelines.hero = tl;

        // Main title animation
        tl.from("#i4tkr", {
            y: 100,
            opacity: 0,
            scale: 0.9,
            duration: 1.2,
            ease: "back.out(1.7)"
        })
        // Image animation
        .from("#iv2wn", {
            scale: 0,
            rotation: -180,
            opacity: 0,
            duration: 1,
            ease: "elastic.out(1, 0.5)"
        }, "-=0.6")
        // Description text
        .from("#im13y", {
            y: 50,
            opacity: 0,
            duration: 1
        }, "-=0.4")
        // Email link
        .from("#ifjoh", {
            x: -50,
            opacity: 0,
            scale: 0.8,
            duration: 0.8
        }, "-=0.3")
        // Copy icon
        .from("#ih6oh", {
            scale: 0,
            rotation: 360,
            duration: 0.5
        }, "-=0.2");

        // Floating animation pro obrázek
        gsap.to("#iv2wn", {
            y: -20,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }

    // ============================================
    // 4. WORK CARDS - 3D Stagger Animation
    // ============================================
    workCardsAnimation() {
        const cards = [
            { id: "#ie33q", title: "#itt22", img: "#iqc0c" },
            { id: "#i5kiv", title: "#ib9zk", img: "#iqc0c-4" },
            { id: "#ieufj", title: "#ivdo7", img: "#iqc0c-5" },
            { id: "#iuqai", title: "#ihsfk", img: "#iqc0c-4-2" }
        ];

        // Section title animation
        gsap.from("#i1bcf", {
            scrollTrigger: {
                trigger: "#ijxck",
                start: "top 80%",
            },
            x: -100,
            opacity: 0,
            duration: 1
        });

        cards.forEach((card, index) => {
            const element = document.querySelector(card.id);
            if (!element) return;

            // Entry animation
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
            })
            // Image zoom in
            .from(card.img, {
                scale: 1.3,
                duration: 1.5,
                ease: "power2.out"
            }, "-=1")
            // Title slide
            .from(card.title, {
                x: -50,
                opacity: 0,
                duration: 0.8
            }, "-=0.8");

            // Hover animation - 3D tilt
            element.addEventListener("mouseenter", (e) => {
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

            // Image parallax on scroll
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
        });
    }

    // ============================================
    // 5. ABOUT SECTION - Split Text Reveal
    // ============================================
    aboutSectionAnimation() {
        // Title animation
        gsap.from("#i8uif", {
            scrollTrigger: {
                trigger: "#iawlf",
                start: "top 80%"
            },
            x: -100,
            opacity: 0,
            duration: 1
        });

        // Main description
        const aboutText = document.querySelector("#i2sah");
        if (aboutText) {
            gsap.from(aboutText, {
                scrollTrigger: {
                    trigger: aboutText,
                    start: "top 80%"
                },
                y: 50,
                opacity: 0,
                duration: 1
            });
        }

        // Image animation
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

        // Long description with word reveal
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
    // 6. TEXT REVEAL - Gradient Text Animation
    // ============================================
    textRevealAnimation() {
        const gradientText = document.querySelector("#iuuay");
        if (!gradientText) return;

        // Animated gradient background
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

        // Scale on scroll
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
        // Všechny obrázky - mírný parallax
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

        // Секce s jiným parallax speedem
        const sections = document.querySelectorAll(".gjs-section");
        sections.forEach((section, index) => {
            const speed = (index % 2 === 0) ? 50 : -50;
            
            gsap.to(section, {
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                },
                y: speed,
                ease: "none"
            });
        });
    }

    // ============================================
    // 8. MAGNETIC BUTTONS
    // ============================================
    magneticButtons() {
        const buttons = document.querySelectorAll("#iyeh2, .gjs-t-link, .navbar-menu-nav a");

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

        // Pin footer
        ScrollTrigger.create({
            trigger: footer,
            start: "top top",
            end: "+=300",
            pin: false,
            anticipatePin: 1
        });

        // Footer elements animation
        const footerTl = gsap.timeline({
            scrollTrigger: {
                trigger: footer,
                start: "top 80%"
            }
        });

        footerTl
            .from("#i2fjb", {
                y: -30,
                opacity: 0
            })
            .from("#iuuay", {
                scale: 0.9,
                opacity: 0
            }, "-=0.3")
            .from("#iyeh2", {
                scale: 0,
                rotation: 180,
                ease: "back.out(1.7)"
            }, "-=0.2")
            .from("#iaao4", {
                x: -50,
                opacity: 0
            }, "-=0.2")
            .from(["#i1xwm", "#i57k0v", "#i3lce", "#im1i8g"], {
                y: 30,
                opacity: 0,
                stagger: 0.1
            }, "-=0.3");

        // Pulsing dot animation
        gsap.to("#izf5a", {
            scale: 1.2,
            opacity: 0.5,
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }

    // ============================================
    // 10. MISC ANIMATIONS
    // ============================================
    miscAnimations() {
        // Smooth scroll reveal pro všechny flex columns
        ScrollTrigger.batch(".gjs-plg-flex-column", {
            onEnter: batch => gsap.from(batch, {
                opacity: 0,
                y: 50,
                stagger: 0.15,
                duration: 1,
                ease: "power2.out"
            }),
            start: "top 90%",
            once: true
        });

        // Logo pulse on load
        gsap.from("#iixa7u", {
            scale: 0,
            rotation: 360,
            duration: 1,
            ease: "elastic.out(1, 0.5)"
        });
    }

    // ============================================
    // EVENT LISTENERS
    // ============================================
    setupEventListeners() {
        // Refresh ScrollTrigger po načtení všech obrázků
        window.addEventListener("load", () => {
            ScrollTrigger.refresh();
        });

        // Debounced resize handler
        let resizeTimer;
        window.addEventListener("resize", () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                ScrollTrigger.refresh();
            }, 250);
        });

        // Page visibility - pause animace když tab není aktivní
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
    
    // Pause všech animací
    pauseAll() {
        gsap.globalTimeline.pause();
        console.log('⏸ All animations paused');
    }

    // Resume všech animací
    resumeAll() {
        gsap.globalTimeline.resume();
        console.log('▶️ All animations resumed');
    }

    // Kill všech animací
    destroy() {
        ScrollTrigger.getAll().forEach(st => st.kill());
        gsap.killTweensOf("*");
        this.timelines = {};
        console.log('💀 All animations destroyed');
    }

    // Refresh ScrollTrigger
    refresh() {
        ScrollTrigger.refresh();
        console.log('🔄 ScrollTrigger refreshed');
    }

    // Get timeline by name
    getTimeline(name) {
        return this.timelines[name];
    }
}

// ============================================
// INITIALIZATION
// ============================================

// Globální instance
let gsapAnimations;

// Inicializace po načtení GSAP
const initGSAP = () => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsapAnimations = new GSAPAnimations();
        
        // Expose to window for debugging
        window.gsapAnimations = gsapAnimations;
    } else {
        console.warn('⚠️ GSAP not loaded yet, retrying...');
        setTimeout(initGSAP, 100);
    }
};

// Start initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGSAP);
} else {
    initGSAP();
}

// Export pro případné použití jako modul
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GSAPAnimations;
}
