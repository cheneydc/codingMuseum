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

        updateMobileLangBtn(lang);

        localStorage.setItem(STORAGE_KEY, lang);
        document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

        // Toggle footer language
        const footerZh = document.querySelector('.footer-zh');
        const footerEn = document.querySelector('.footer-en');
        if (footerZh && footerEn) {
            footerZh.style.display = lang === 'zh' ? 'inline' : 'none';
            footerEn.style.display = lang === 'en' ? 'inline' : 'none';
        }

        // Update mobile dropdown option text
        const mobileOptions = document.querySelectorAll('.mobile-timeline-item[data-zh], .mobile-nav-label[data-zh]');
        mobileOptions.forEach(opt => {
            const zhText = opt.getAttribute('data-zh');
            const enText = opt.getAttribute('data-en');
            if (lang === 'zh' && zhText) {
                opt.textContent = zhText;
            } else if (lang === 'en' && enText) {
                opt.textContent = enText;
            }
        });
    }

    const savedLang = localStorage.getItem(STORAGE_KEY) || 'zh';

    const mobileLangBtn = document.querySelector('.mobile-lang-toggle');

    switchLanguage(savedLang);

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', function() {
            toggleLang();
        });
    }

    if (mobileLangBtn) {
        mobileLangBtn.addEventListener('click', function() {
            toggleLang();
        });
    }

    function toggleLang() {
        const currentLang = localStorage.getItem(STORAGE_KEY) || 'zh';
        const newLang = currentLang === 'zh' ? 'en' : 'zh';
        switchLanguage(newLang);
    }

    function updateMobileLangBtn(lang) {
        if (mobileLangBtn) {
            mobileLangBtn.textContent = lang === 'zh' ? 'EN' : '中';
        }
    }

    /**************************
     * Decade Nav Click Handlers
     **************************/
    const decadeLinks = document.querySelectorAll('.decade-nav a');
    const mobileItems = document.querySelectorAll('.mobile-timeline-item');

    // Shared scroll handler for desktop and mobile nav
    function scrollToSection(targetId) {
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            history.pushState(null, null, '#' + targetId);
        }
    }

    decadeLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection(this.getAttribute('href').slice(1));
        });
    });

    // Mobile timeline
    const mobileTimeline = document.querySelector('.mobile-timeline');
    const mobileTrigger = document.querySelector('.mobile-nav-trigger');
    const mobileLabel = document.querySelector('.mobile-nav-label');
    const mobileArrow = document.querySelector('.mobile-nav-arrow');

    function openMobileTimeline() {
        if (mobileTimeline) mobileTimeline.classList.add('open');
        // Scroll active item into center view
        const activeItem = document.querySelector('.mobile-timeline-item.active');
        if (activeItem && mobileTimeline) {
            setTimeout(function() {
                const scrollPos = activeItem.offsetTop - mobileTimeline.offsetTop - mobileTimeline.clientHeight / 2 + activeItem.clientHeight / 2;
                mobileTimeline.scrollTop = Math.max(0, scrollPos);
            }, 50);
        }
    }

    function closeMobileTimeline() {
        if (mobileTimeline) mobileTimeline.classList.remove('open');
    }

    function toggleMobileTimeline() {
        if (mobileTimeline && mobileTimeline.classList.contains('open')) {
            closeMobileTimeline();
        } else {
            openMobileTimeline();
        }
    }

    // Trigger click toggles
    if (mobileTrigger) {
        mobileTrigger.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMobileTimeline();
        });
    }

    // Item click navigates and closes
    mobileItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection(this.getAttribute('href').slice(1));
            closeMobileTimeline();
        });
    });

    // Close when tapping outside
    document.addEventListener('click', function(e) {
        const wrap = document.querySelector('.mobile-nav-wrap');
        if (wrap && !wrap.contains(e.target)) {
            closeMobileTimeline();
        }
    });

    /**************************
     * IntersectionObserver for Active Nav Link
     **************************/
    const sections = document.querySelectorAll('.museum-stop');

    function updateActiveSection(id) {
        // Update desktop nav
        decadeLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
        // Update mobile timeline items
        mobileItems.forEach(item => {
            item.classList.toggle('active', item.getAttribute('href') === '#' + id);
        });
        // Update trigger label
        if (mobileLabel) {
            const activeItem = document.querySelector('.mobile-timeline-item.active');
            if (activeItem) {
                mobileLabel.textContent = activeItem.textContent;
            }
        }
    }

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateActiveSection(entry.target.id);
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
