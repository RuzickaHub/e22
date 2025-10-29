/**
 * GSAP Advanced Animations for Portfolio
 * @author Jakub Růžička
 * @version 2.0.0
 * FULLY FIXED - All Issues Resolved
 */

class GSAPAnimations {
    constructor() {
        this.isInitialized = false;
        this.timelines = {};
        this.scrollTriggers = [];
        this.animations = [];
        this.init();
    }

    init() {
        // Kontrola GSAP
        if (typeof gsap === 'undefined') {
            console.error('❌ GSAP library not loaded!');
            return;
        }

        try {
            // Registrace pluginů s error handling
            if (typeof ScrollTrigger !== 'undefined') {
                gsap.registerPlugin(ScrollTrigger);
            }
            if (typeof TextPlugin !== 'undefined') {
                gsap.registerPlugin(TextPlugin);
            }
            
            // Default nastavení
            gsap.defaults({
                ease: "power3.out",
                duration: 1
            });

            // Inicializace
            this.setupAnimations();
            this.setupEventListeners();
            
            this.isInitialized = true;
            console.log('✨ GSAP Animations initialized successfully!');
        } catch (error) {
            console.error('❌ GSAP initialization error:', error);
        }
    }

    setupAnimations() {
        // Počkáme na kompletní načtení DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => this.runAllAnimations(), 100);
            });
        } else {
            setTimeout(() => this.runAllAnimations(), 100);
        }
    }

    runAllAnimations() {
        try {
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
        } catch (error) {
            console.error('Animation error:', error);
        }
    }

    // ============================================
    // 1. PROGRESS BAR - FIXED
    // ============================================
    createProgressBar() {
        try {
            // Kontrola, jestli už progress bar neexistuje
            if (document.querySelector('.gsap-progress-bar')) return;

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
        } catch (error) {
            console.warn('Progress bar error:', error);
        }
    }

    // ============================================
    // 2. NAVBAR - FIXED
    // ============================================
    navbarAnimation() {
        try {
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
                    delay: 0.5,
                    clearProps: "all" // Vyčistí props po animaci
                });
            }
        } catch (error) {
            console.warn('Navbar animation error:', error);
        }
    }

    // ============================================
    // 3. HERO - FIXED
    // ============================================
    heroAnimation() {
        try {
            const tl = gsap.timeline({
                defaults: {
                    ease: "power3.out"
                }
            });

            this.timelines.hero = tl;

            // Title
            const title = document.querySelector("#i4tkr");
            if (title) {
                tl.from(title, {
                    y: 100,
                    opacity: 0,
                    scale: 0.9,
                    duration: 1.2,
                    ease: "back.out(1.7)"
                });
            }

            // Image
            const img = document.querySelector("#iv2wn");
            if (img) {
                tl.from(img, {
                    scale: 0,
                    rotation: -180,
                    opacity: 0,
                    duration: 1,
                    ease: "elastic.out(1, 0.5)"
                }, "-=0.6");

                // Floating - uložíme do pole pro cleanup
                this.animations.push(
                    gsap.to(img, {
                        y: -20,
                        duration: 2,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut"
                    })
                );
            }

            // Description
            const desc = document.querySelector("#im13y");
            if (desc) {
                tl.from(desc, {
                    y: 50,
                    opacity: 0,
                    duration: 1
                }, "-=0.4");
            }

            // Email link
            const email = document.querySelector("#ifjoh");
            if (email) {
                tl.from(email, {
                    x: -50,
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.8
                }, "-=0.3");
            }

            // Icon
            const icon = document.querySelector("#ih6oh");
            if (icon) {
                tl.from(icon, {
                    scale: 0,
                    rotation: 360,
                    duration: 0.5
                }, "-=0.2");
            }
        } catch (error) {
            console.warn('Hero animation error:', error);
        }
    }

    // ============================================
    // 4. WORK CARDS - SIMPLIFIED & UNIQUE
    // ============================================
    workCardsAnimation() {
        try {
            // Section title
            const sectionTitle = document.querySelector("#i1bcf");
            if (sectionTitle) {
                gsap.from(sectionTitle, {
                    scrollTrigger: {
                        trigger: "#ijxck",
                        start: "top 80%",
                    },
                    x: -100,
                    opacity: 0,
                    duration: 1
                });
            }

            // Card 1 - Dreamscapes - Z LEVA
            const card1 = document.querySelector("#ie33q");
            if (card1) {
                gsap.from(card1, {
                    scrollTrigger: {
                        trigger: card1,
                        start: "top 85%",
                    },
                    x: -200,
                    opacity: 0,
                    duration: 1.2,
                    ease: "power3.out"
                });

                // Hover
                card1.addEventListener("mouseenter", () => {
                    gsap.to(card1, {
                        x: 10,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });
                card1.addEventListener("mouseleave", () => {
                    gsap.to(card1, {
                        x: 0,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });
            }

            // Card 2 - Pulse Motion - Z PRAVA
            const card2 = document.querySelector("#i5kiv");
            if (card2) {
                gsap.from(card2, {
                    scrollTrigger: {
                        trigger: card2,
                        start: "top 85%",
                    },
                    x: 200,
                    opacity: 0,
                    duration: 1.2,
                    ease: "power3.out"
                });

                // Hover
                card2.addEventListener("mouseenter", () => {
                    gsap.to(card2, {
                        x: -10,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });
                card2.addEventListener("mouseleave", () => {
                    gsap.to(card2, {
                        x: 0,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });
            }

            // Card 3 - Flow Studio - MACRO ZOOM IN
            const card3 = document.querySelector("#ieufj");
            if (card3) {
                gsap.from(card3, {
                    scrollTrigger: {
                        trigger: card3,
                        start: "top 85%",
                    },
                    scale: 0.3,
                    opacity: 0,
                    duration: 1.2,
                    ease: "back.out(1.7)"
                });

                // Hover - Scale up
                card3.addEventListener("mouseenter", () => {
                    gsap.to(card3, {
                        scale: 1.05,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });
                card3.addEventListener("mouseleave", () => {
                    gsap.to(card3, {
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });
            }

            // Card 4 - GreenMark - ROTATION FROM MINI
            const card4 = document.querySelector("#iuqai");
            if (card4) {
                gsap.from(card4, {
                    scrollTrigger: {
                        trigger: card4,
                        start: "top 85%",
                    },
                    scale: 0.2,
                    rotation: 360,
                    opacity: 0,
                    duration: 1.5,
                    ease: "power3.out"
                });

                // Hover - Rotation
                card4.addEventListener("mouseenter", () => {
                    gsap.to(card4, {
                        rotation: 5,
                        scale: 1.05,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });
                card4.addEventListener("mouseleave", () => {
                    gsap.to(card4, {
                        rotation: 0,
                        scale: 1,
                        duration: 0.5,
                        ease: "elastic.out(1, 0.5)"
                    });
                });
            }

        } catch (error) {
            console.warn('Work cards animation error:', error);
        }
    }

    // ============================================
    // 5. ABOUT SECTION - FIXED
    // ============================================
    aboutSectionAnimation() {
        try {
            // Title
            const title = document.querySelector("#i8uif");
            if (title) {
                gsap.from(title, {
                    scrollTrigger: {
                        trigger: "#iawlf",
                        start: "top 80%"
                    },
                    x: -100,
                    opacity: 0,
                    duration: 1
                });
            }

            // Short description
            const desc = document.querySelector("#i2sah");
            if (desc) {
                gsap.from(desc, {
                    scrollTrigger: {
                        trigger: desc,
                        start: "top 80%"
                    },
                    y: 50,
                    opacity: 0,
                    duration: 1
                });
            }

            // Image
            const img = document.querySelector("#i4q0l");
            if (img) {
                gsap.from(img, {
                    scrollTrigger: {
                        trigger: img,
                        start: "top 80%"
                    },
                    scale: 0.8,
                    opacity: 0,
                    rotation: -5,
                    duration: 1.2,
                    ease: "back.out(1.7)"
                });
            }

            // Word reveal - s fallback
            const longText = document.querySelector("#ijnrc");
            if (longText && longText.textContent) {
                const originalText = longText.textContent;
                const words = originalText.split(" ");
                
                // Zkontroluj, že máme slova
                if (words.length > 0) {
                    longText.innerHTML = words.map(word => 
                        `<span class="gsap-word" style="display: inline-block; opacity: 0.2; margin-right: 0.3em;">${word}</span>`
                    ).join("");

                    const wordElements = longText.querySelectorAll('.gsap-word');
                    if (wordElements.length) {
                        gsap.to(wordElements, {
                            scrollTrigger: {
                                trigger: longText,
                                start: "top 80%",
                                end: "bottom 60%",
                                scrub: 1
                            },
                            opacity: 1,
                            stagger: 0.05,
                            ease: "none"
                        });
                    }
                }
            }
        } catch (error) {
            console.warn('About section animation error:', error);
        }
    }

    // ============================================
    // 6. TEXT REVEAL - FIXED
    // ============================================
    textRevealAnimation() {
        try {
            const gradientText = document.querySelector("#iuuay");
            if (!gradientText) return;

            // Animace gradient pozice
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

            // Entry animace
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
        } catch (error) {
            console.warn('Text reveal animation error:', error);
        }
    }

    // ============================================
    // 7. PARALLAX - FIXED & OPTIMIZED
    // ============================================
    parallaxEffects() {
        try {
            const images = document.querySelectorAll("img");
            images.forEach(img => {
                // Skip obrázky, které jsou v kartách (už mají vlastní parallax)
                if (img.closest('.gjs-plg-flex-column[id*="ie33q"], .gjs-plg-flex-column[id*="i5kiv"], .gjs-plg-flex-column[id*="ieufj"], .gjs-plg-flex-column[id*="iuqai"]')) {
                    return;
                }

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
        } catch (error) {
            console.warn('Parallax animation error:', error);
        }
    }

    // ============================================
    // 8. MAGNETIC BUTTONS - FIXED
    // ============================================
    magneticButtons() {
        try {
            const buttons = document.querySelectorAll("#iyeh2, .navbar-menu-nav a");

            buttons.forEach(button => {
                if (!button) return;

                button.style.position = 'relative';
                
                button.addEventListener("mouseenter", () => {
                    gsap.to(button, {
                        scale: 1.1,
                        duration: 0.3,
                        ease: "power2.out",
                        overwrite: true
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
                        ease: "power2.out",
                        overwrite: 'auto'
                    });
                });

                button.addEventListener("mouseleave", () => {
                    gsap.to(button, {
                        x: 0,
                        y: 0,
                        scale: 1,
                        duration: 0.5,
                        ease: "elastic.out(1, 0.3)",
                        overwrite: true
                    });
                });
            });
        } catch (error) {
            console.warn('Magnetic buttons error:', error);
        }
    }

    // ============================================
    // 9. FOOTER - FIXED
    // ============================================
    footerAnimation() {
        try {
            const footer = document.querySelector("#i4bac");
            if (!footer) return;

            const footerTl = gsap.timeline({
                scrollTrigger: {
                    trigger: footer,
                    start: "top 80%"
                }
            });

            const elements = [
                "#i2fjb", "#iuuay", "#iyeh2", "#iaao4",
                "#i1xwm", "#i57k0v", "#i3lce", "#im1i8g"
            ];

            elements.forEach((selector, index) => {
                const el = document.querySelector(selector);
                if (el) {
                    footerTl.from(el, {
                        y: 30,
                        opacity: 0,
                        duration: 0.6
                    }, index * 0.1);
                }
            });

            // Pulsing dot
            const dot = document.querySelector("#izf5a");
            if (dot) {
                this.animations.push(
                    gsap.to(dot, {
                        scale: 1.2,
                        opacity: 0.5,
                        duration: 1,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut"
                    })
                );
            }
        } catch (error) {
            console.warn('Footer animation error:', error);
        }
    }

    // ============================================
    // 10. MISC - FIXED
    // ============================================
    miscAnimations() {
        try {
            // Batch animace pro flex columns
            const flexColumns = gsap.utils.toArray(".gjs-plg-flex-column");
            
            if (flexColumns.length) {
                ScrollTrigger.batch(flexColumns, {
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
            }

            // Logo animation
            const logo = document.querySelector("#iixa7u");
            if (logo) {
                gsap.from(logo, {
                    scale: 0,
                    rotation: 360,
                    duration: 1,
                    ease: "elastic.out(1, 0.5)"
                });
            }
        } catch (error) {
            console.warn('Misc animations error:', error);
        }
    }

    // ============================================
    // EVENT LISTENERS - FIXED
    // ============================================
    setupEventListeners() {
        // Load event
        window.addEventListener("load", () => {
            ScrollTrigger.refresh();
        });

        // Debounced resize
        let resizeTimer;
        window.addEventListener("resize", () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                ScrollTrigger.refresh();
            }, 250);
        });

        // Visibility API
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
        // Kill ScrollTriggers
        ScrollTrigger.getAll().forEach(st => st.kill());
        
        // Kill všechny tweeny
        gsap.killTweensOf("*");
        
        // Kill uložené animace
        this.animations.forEach(anim => anim.kill());
        
        // Clear data
        this.timelines = {};
        this.animations = [];
        
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
// INITIALIZATION - FIXED
// ============================================

let gsapAnimations;

const initGSAP = () => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        try {
            gsapAnimations = new GSAPAnimations();
            window.gsapAnimations = gsapAnimations;
            console.log('✅ GSAP initialized and ready');
        } catch (error) {
            console.error('❌ Failed to initialize GSAP:', error);
        }
    } else {
        console.warn('⚠️ GSAP not loaded yet, retrying...');
        setTimeout(initGSAP, 100);
    }
};

// Wait for DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGSAP);
} else {
    initGSAP();
}

// Module export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GSAPAnimations;
}
