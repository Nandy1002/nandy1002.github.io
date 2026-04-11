document.addEventListener('DOMContentLoaded', () => {
    // ---- Mobile Menu Logic ----
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMenuButton = document.getElementById('close-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const toggleMenu = (open) => {
        if (!mobileMenu) return;
        if (open) {
            mobileMenu.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.add('translate-x-full');
            document.body.style.overflow = '';
        }
    };

    if (mobileMenuButton && closeMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => toggleMenu(true));
        closeMenuButton.addEventListener('click', () => toggleMenu(false));
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => toggleMenu(false));
        });
    }

    // ---- Active Link Highlighting (Scroll Spy) ----
    const desktopLinks = document.querySelectorAll('nav .hidden.md\\:flex a');
    const sections = document.querySelectorAll('section[id]');

    function updateActivePath() {
        let currentTarget = '';
        const pathname = window.location.pathname;
        const isHomePage = pathname.endsWith('index.html') || pathname.endsWith('/') || pathname === '';

        // Determine current target based on URL or Scroll Position
        if (!isHomePage) {
            if (pathname.includes('experience.html')) {
                currentTarget = 'about';
            } else if (pathname.includes('projects.html') || pathname.includes('project.html')) {
                currentTarget = 'projects';
            }
        } else {
            // We are on index.html, calculate from scroll position
            let scrollY = window.scrollY;
            const scrollOffset = 250; // Offset for better detection

            sections.forEach(sec => {
                const sectionTop = sec.offsetTop - scrollOffset;
                const sectionHeight = sec.offsetHeight;
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    const id = sec.getAttribute('id');
                    // Grouping teaser sections under 'Home' highlight
                    if (id === 'home' || id === 'about' || id === 'projects') {
                        currentTarget = 'home';
                    } else {
                        currentTarget = id;
                    }
                }
            });

            // Special case: Contact at the very bottom
            if ((window.innerHeight + scrollY) >= document.body.offsetHeight - 100) {
                currentTarget = 'contact';
            }
        }

        // Apply visual updates
        desktopLinks.forEach(link => {
            const target = link.getAttribute('data-nav-target');
            const isActive = target === currentTarget || (!currentTarget && isHomePage && target === 'home');

            // Reset classes
            link.className = 'font-headline uppercase tracking-[0.05em] text-sm font-medium transition-colors';

            if (isActive) {
                link.classList.add('text-cyan-400', 'border-b-2', 'border-cyan-400', 'pb-1');
            } else {
                link.classList.add('text-neutral-400', 'hover:text-white');
            }
        });

        // Update mobile links
        if (mobileLinks) {
            mobileLinks.forEach(link => {
                const target = link.getAttribute('data-nav-target');
                const isActive = target === currentTarget || (!currentTarget && isHomePage && target === 'home');

                link.className = 'font-headline uppercase tracking-[0.2em] text-2xl font-medium transition-colors mobile-link';

                if (isActive) {
                    link.classList.add('text-cyan-400');
                } else {
                    link.classList.add('text-white', 'hover:text-cyan-400');
                }
            });
        }
    }

    // Bind scroll listener for highlight tracking
    window.addEventListener('scroll', updateActivePath);
    // Bind hashchange for deep links
    window.addEventListener('hashchange', updateActivePath);
    // Trigger on load
    updateActivePath();

    // ---- Scroll Reveal Animations ----
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    window.observeNewElements = () => {
        document.querySelectorAll('.reveal-up:not(.is-visible)').forEach(el => {
            revealObserver.observe(el);
        });
    };

    // Initial observe
    window.observeNewElements();
});
