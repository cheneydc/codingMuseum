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