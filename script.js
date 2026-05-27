// Coding Museum - Programming Language History Website
// Bilingual: Chinese/English support
// Theme: Retro newspaper/magazine style museum

// Wait for DOM to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const langToggleBtn = document.getElementById('lang-toggle');
    const STORAGE_KEY = 'museum-language';

    function switchLanguage(lang) {
        const elements = document.querySelectorAll('[data-zh]');

        elements.forEach(element => {
            const zhText = element.getAttribute('data-zh');
            const enText = element.getAttribute('data-en');

            if (lang === 'zh' && zhText) {
                element.textContent = zhText;
            } else if (lang === 'en' && enText) {
                element.textContent = enText;
            }
        });

        if (langToggleBtn) {
            langToggleBtn.textContent = lang === 'zh' ? 'English' : '中文';
        }

        localStorage.setItem(STORAGE_KEY, lang);
        document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    }

    const savedLang = localStorage.getItem(STORAGE_KEY) || 'zh';
    switchLanguage(savedLang);

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', function() {
            const currentLang = localStorage.getItem(STORAGE_KEY) || 'zh';
            const newLang = currentLang === 'zh' ? 'en' : 'zh';
            switchLanguage(newLang);
        });
    }

    // Intersection Observer for active navigation highlighting
    const sections = document.querySelectorAll('main > section');
    const navLinks = document.querySelectorAll('.nav-links li a[href^="#"]');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Hamburger menu toggle functionality
    const hamburgerToggle = document.getElementById('hamburger-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    if (hamburgerToggle && navLinksContainer) {
        hamburgerToggle.addEventListener('click', function() {
            const isOpen = navLinksContainer.classList.contains('open');
            navLinksContainer.classList.toggle('open');
            hamburgerToggle.classList.toggle('open');
            hamburgerToggle.setAttribute('aria-expanded', !isOpen);
        });

        // Close menu when clicking a navigation link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navLinksContainer.classList.remove('open');
                hamburgerToggle.classList.remove('open');
                hamburgerToggle.setAttribute('aria-expanded', false);
            });
        });
    }

    console.log('Coding Museum initialized successfully');
});

// Future: Language data structure for 10 programming languages
// const programmingLanguages = [
//     { name: 'Fortran', year: 1957, description: '...' },
//     { name: 'Lisp', year: 1958, description: '...' },
//     // ... more languages
// ];

// Future: Functions for interactive features
// function scrollToDecade(decade) { ... }
// function showExhibit(languageId) { ... }