/* Navigation, active-link state and scroll reveal. Shared by every page. */

document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    setupActiveLink();
    setupReveal();
});

/* --- Mobile menu -------------------------------------------------------- */
function setupMobileMenu() {
    const toggle = document.getElementById('nav-toggle');
    const close = document.getElementById('nav-close');
    const menu = document.getElementById('mobile-nav');
    if (!toggle || !close || !menu) return;

    const setOpen = (open) => {
        menu.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', String(open));
        document.body.style.overflow = open ? 'hidden' : '';
    };

    toggle.addEventListener('click', () => setOpen(true));
    close.addEventListener('click', () => setOpen(false));
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') setOpen(false);
    });
}

/* --- Active link -------------------------------------------------------- */
function setupActiveLink() {
    const apply = () => {
        const path = window.location.pathname;
        const file = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

        let current = 'home';
        if (file.startsWith('project')) current = 'projects';
        else if (file.startsWith('experience')) current = 'experience';
        else if (window.location.hash === '#contact') current = 'contact';

        document.querySelectorAll('[data-nav]').forEach(link => {
            link.classList.toggle('active', link.dataset.nav === current);
        });
    };

    apply();
    window.addEventListener('hashchange', apply);
}

/* --- Scroll reveal ------------------------------------------------------ */
function setupReveal() {
    if (!('IntersectionObserver' in window)) {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
        });
    }, { threshold: 0.1 });

    // Called again after JS renders cards into the page.
    window.observeNewElements = () => {
        document.querySelectorAll('.reveal:not(.is-visible)').forEach(el => observer.observe(el));
    };

    window.observeNewElements();
}
