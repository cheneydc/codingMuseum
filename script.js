// Coding Museum - Programming Language History Website
// Horizontal Timeline Navigation Implementation

document.addEventListener('DOMContentLoaded', function() {
    const langToggleBtn = document.getElementById('lang-toggle');
    const STORAGE_KEY = 'museum-language';
    const museumTrack = document.querySelector('.museum-track');
    const museumStops = document.querySelectorAll('.museum-stop');
    const timelineDots = document.querySelectorAll('.timeline-dot');
    const navPrevBtn = document.querySelector('.nav-prev');
    const navNextBtn = document.querySelector('.nav-next');
    let currentStopIndex = 0;

    /**************************
     * Language Switching (Keep existing functionality)
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
     * New Horizontal Timeline Navigation Implementation
     **************************/

    // Scroll to specific stop by index
    function scrollToStop(index) {
        if (index < 0 || index >= museumStops.length) return;
        
        const targetStop = museumStops[index];
        targetStop.scrollIntoView({
            behavior: 'smooth',
            inline: 'start',
            block: 'nearest'
        });
        
        currentStopIndex = index;
        updateActiveDot(index);
        updateUrlHash(targetStop.id);
    }

    // Update active timeline dot
    function updateActiveDot(activeIndex) {
        timelineDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
    }

    // Update URL hash with current stop ID
    function updateUrlHash(stopId) {
        history.replaceState(null, null, `#${stopId}`);
    }

    // Get current visible stop index using Intersection Observer
    const observerOptions = {
        root: museumTrack,
        rootMargin: '0px',
        threshold: 0.6 // Trigger when 60% of the stop is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stopId = entry.target.id;
                currentStopIndex = Array.from(museumStops).findIndex(stop => stop.id === stopId);
                updateActiveDot(currentStopIndex);
                updateUrlHash(stopId);
            }
        });
    }, observerOptions);

    museumStops.forEach(stop => {
        observer.observe(stop);
    });

    /**************************
     * Navigation Event Handlers
     **************************/

    // Timeline dot click handler
    timelineDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            scrollToStop(index);
        });
    });

    // Previous button click handler
    navPrevBtn.addEventListener('click', () => {
        scrollToStop(currentStopIndex - 1);
    });

    // Next button click handler
    navNextBtn.addEventListener('click', () => {
        scrollToStop(currentStopIndex + 1);
    });

    // Keyboard navigation (Arrow Left/Right)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            scrollToStop(currentStopIndex - 1);
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            scrollToStop(currentStopIndex + 1);
        }
    });

    // Mouse wheel to horizontal scroll conversion
    museumTrack.addEventListener('wheel', (e) => {
        e.preventDefault();
        // Adjust scroll speed as needed
        museumTrack.scrollBy({
            left: e.deltaY * 2, // Multiply for faster scroll
            behavior: 'smooth'
        });
    }, { passive: false });

    /**************************
     * Mobile Touch Swipe Detection
     **************************/
    let touchStartX = 0;
    let touchEndX = 0;

    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance for swipe
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left → go to next stop
                scrollToStop(currentStopIndex + 1);
            } else {
                // Swipe right → go to previous stop
                scrollToStop(currentStopIndex - 1);
            }
        }
    }

    museumTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    museumTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    /**************************
     * Initial Load Handling
     **************************/
    // Handle initial hash in URL to jump to correct stop
    function handleInitialHash() {
        const hash = window.location.hash.slice(1); // Remove # character
        if (!hash) return;

        const targetIndex = Array.from(museumStops).findIndex(stop => stop.id === hash);
        if (targetIndex !== -1) {
            // Scroll immediately without animation on page load
            museumStops[targetIndex].scrollIntoView({
                behavior: 'instant',
                inline: 'start',
                block: 'nearest'
            });
            currentStopIndex = targetIndex;
            updateActiveDot(targetIndex);
        }
    }

    // Initialize on page load
    handleInitialHash();

    console.log('Coding Museum Horizontal Timeline initialized successfully');
});
