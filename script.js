document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust for fixed navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Scroll Animations (Intersection Observer) ---
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animating in to keep it visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // --- Counter Animation ---
    const counters = document.querySelectorAll('.counter');
    let hasAnimated = false;

    const counterObserver = new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // ms
                const step = target / (duration / 16); // 60fps
                
                let current = 0;
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        // format with 'k' or '+' based on target
                        let displayValue = Math.ceil(current);
                        if(target >= 1000) {
                            displayValue = (displayValue / 1000).toFixed(0) + 'K+';
                        } else {
                            displayValue = displayValue + '+';
                        }
                        counter.innerText = displayValue;
                        requestAnimationFrame(updateCounter);
                    } else {
                        if(target >= 1000) {
                            counter.innerText = (target / 1000) + 'K+';
                        } else {
                            counter.innerText = target + '+';
                        }
                    }
                };
                updateCounter();
            });
        }
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        counterObserver.observe(statsSection);
    }

    // --- Form Validations and Submissions (Frontend Only) ---
    
    // Planner Form
    const plannerForm = document.getElementById('plannerForm');
    const plannerMessage = document.getElementById('plannerMessage');
    
    if (plannerForm) {
        plannerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            plannerForm.classList.add('hidden');
            plannerMessage.classList.remove('hidden');
            
            // Reset form after a few seconds
            setTimeout(() => {
                plannerForm.reset();
                plannerForm.classList.remove('hidden');
                plannerMessage.classList.add('hidden');
            }, 5000);
        });
    }

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterMessage = document.getElementById('newsletterMessage');
    const newsletterEmail = document.getElementById('newsletterEmail');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (newsletterEmail.value) {
                newsletterForm.classList.add('hidden');
                newsletterMessage.classList.remove('hidden');
                
                setTimeout(() => {
                    newsletterForm.reset();
                    newsletterForm.classList.remove('hidden');
                    newsletterMessage.classList.add('hidden');
                }, 4000);
            }
        });
    }

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    const contactMessageSuccess = document.getElementById('contactMessageSuccess');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            contactForm.classList.add('hidden');
            contactMessageSuccess.classList.remove('hidden');
            
            setTimeout(() => {
                contactForm.reset();
                contactForm.classList.remove('hidden');
                contactMessageSuccess.classList.add('hidden');
            }, 5000);
        });
    }
});
