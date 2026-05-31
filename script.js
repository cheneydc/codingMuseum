document.addEventListener('DOMContentLoaded', function() {
    const langToggleBtn = document.getElementById('lang-toggle');
    const STORAGE_KEY = 'museum-language';

    /**************************
     * Language Switching
     **************************/
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

    /**************************
     * Decade Nav Click Handlers
     **************************/
    const decadeLinks = document.querySelectorAll('.decade-nav a');
    decadeLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                history.pushState(null, null, '#' + targetId);
            }
        });
    });

    /**************************
     * IntersectionObserver for Active Nav Link
     **************************/
    const sections = document.querySelectorAll('.museum-stop');
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                decadeLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                });
            }
        });
    }, { rootMargin: '-50% 0px -50% 0px' });

    sections.forEach(section => navObserver.observe(section));

    /**************************
     * Scroll Reveal Animation
     **************************/
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    /**************************
     * Initial Hash Handling
     **************************/
    const hash = window.location.hash.slice(1);
    if (hash) {
        const target = document.getElementById(hash);
        if (target) {
            setTimeout(function() {
                target.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }
});
