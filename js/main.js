/* Renders the project grid (home + projects page) and the skills list. */

document.addEventListener('DOMContentLoaded', () => {
    updateTenure();
    loadProjects();
    loadSkills();
});

/* Keeps a "N yrs" figure honest without anyone remembering to edit it.
   data-since is "YYYY-MM" of the start date. */
function updateTenure() {
    document.querySelectorAll('[data-since]').forEach(el => {
        const [year, month] = el.dataset.since.split('-').map(Number);
        if (!year || !month) return;

        const now = new Date();
        const months = (now.getFullYear() - year) * 12 + (now.getMonth() + 1 - month);
        if (months < 1) return;

        // Exact years + months: rounding to a half-year turned 1 yr 8 mos into "1.5 yrs".
        const y = Math.floor(months / 12);
        const m = months % 12;
        const parts = [];
        if (y) parts.push(y === 1 ? '1 yr' : `${y} yrs`);
        if (m) parts.push(m === 1 ? '1 mo' : `${m} mos`);
        el.textContent = parts.join(' ');
    });
}

/* --- Helpers ------------------------------------------------------------ */
function esc(value) {
    return String(value ?? '').replace(/[&<>"']/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
}

function truncate(text, max) {
    if (!text || text.length <= max) return text || '';
    const cut = text.slice(0, max);
    // Trim trailing punctuation so we never render "worse.…" as "worse...."
    return cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s.,;:—-]+$/, '') + '…';
}

/* Overlay labels on a thumbnail. "Shipped" and "Play in browser" go first — a recruiter
   scanning the grid should spot released, playable work without opening anything. */
function badges(p) {
    const items = [];
    if (p.shipped) items.push('<span class="badge badge--accent">Shipped</span>');
    if (p.embedUrl) items.push('<span class="badge">Play in browser</span>');
    else if (p.shipped && p.platform) items.push(`<span class="badge">${esc(p.platform)}</span>`);
    if (p.demoVideo) items.push('<span class="badge">Demo video</span>');
    return items.length ? `<div class="badges">${items.join('')}</div>` : '';
}

/* Swaps a missing thumbnail for a striped placeholder instead of a broken image. */
window.thumbFallback = function (img) {
    const holder = img.parentElement;
    if (holder) holder.classList.add('thumb--empty');
    img.remove();
};

/* --- Projects ----------------------------------------------------------- */
async function loadProjects() {
    const featuredGrid = document.getElementById('featured-projects-grid');
    const allGrid = document.getElementById('projects-grid');
    const grid = featuredGrid || allGrid;
    if (!grid) return;

    let projects;
    try {
        const response = await fetch('data/projects.json');
        if (!response.ok) throw new Error(response.status);
        projects = await response.json();
    } catch (error) {
        console.error('Failed to load projects', error);
        grid.innerHTML = '<p class="dim">Projects could not be loaded right now.</p>';
        return;
    }

    const visible = featuredGrid ? projects.filter(p => p.featured) : projects;
    render(grid, visible);

    if (allGrid) setupFilters(allGrid, visible);
    if (featuredGrid) renderHeroFeature(visible);
}

/* Puts real gameplay above the fold — a recruiter sees work before they read a word.
   Set "spotlight": true on whichever project has the strongest screenshot. */
function renderHeroFeature(projects) {
    const el = document.getElementById('hero-featured');
    const project = projects.find(p => p.spotlight) || projects[0];
    if (!el || !project) return;

    el.href = `project.html?id=${encodeURIComponent(project.id)}`;
    el.innerHTML = `
        <div class="thumb${project.thumbnail ? '' : ' thumb--empty'}" data-label="${esc(project.title)}">
            ${project.thumbnail
            ? `<img src="${esc(project.thumbnail)}" alt="${esc(project.title)} screenshot" onerror="thumbFallback(this)">`
            : ''}
            ${badges(project)}
        </div>
        <div class="hero-feature-meta">
            <span class="eyebrow">Featured project</span>
            <strong>${esc(project.title)}</strong>
            <span class="small dim">${esc(project.category)}</span>
        </div>`;
}

function render(grid, projects) {
    if (!projects.length) {
        grid.innerHTML = '<p class="dim">Nothing here yet.</p>';
        return;
    }

    grid.innerHTML = projects.map(p => {
        // "Shipped" already shows as a thumbnail badge; it stays a tag only for the filter bar.
        const tags = (p.tags || []).filter(t => !(p.shipped && t === 'Shipped'))
            .map(t => `<span class="chip">${esc(t)}</span>`).join('');
        const thumb = p.thumbnail
            ? `<img src="${esc(p.thumbnail)}" alt="${esc(p.title)} screenshot" loading="lazy" onerror="thumbFallback(this)">`
            : '';

        const meta = [p.role, p.jam?.name, p.year].filter(Boolean).map(esc).join(' · ');

        return `
        <a class="card card--link project-card reveal" href="project.html?id=${encodeURIComponent(p.id)}">
            <div class="thumb${thumb ? '' : ' thumb--empty'}" data-label="${esc(p.title)}">${thumb}${badges(p)}</div>
            <div class="card-body">
                <h3>${esc(p.title)}</h3>
                <p class="meta-line">${meta}</p>
                <p class="desc">${esc(truncate(p.description, 130))}</p>
                <div class="chips">${tags}</div>
                <span class="btn btn--quiet">
                    View project
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                </span>
            </div>
        </a>`;
    }).join('');

    if (window.observeNewElements) window.observeNewElements();
}

/* Tag filters — only worth showing once there are enough projects to sort through. */
function setupFilters(grid, projects) {
    const bar = document.getElementById('project-filters');
    if (!bar || projects.length < 4) return;

    // Released work is the first thing a reviewer filters for, so those tags lead the bar.
    const pinned = ['Shipped', 'Game Jam'];
    const all = new Set(projects.flatMap(p => p.tags || []));
    const tags = [...pinned.filter(t => all.has(t)), ...[...all].filter(t => !pinned.includes(t)).sort()];
    if (!tags.length) return;

    bar.hidden = false;
    bar.innerHTML = ['All', ...tags]
        .map((tag, i) => `<button type="button" data-tag="${esc(tag)}" aria-pressed="${i === 0}">${esc(tag)}</button>`)
        .join('');

    bar.addEventListener('click', e => {
        const button = e.target.closest('button');
        if (!button) return;

        bar.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b === button)));

        const tag = button.dataset.tag;
        render(grid, tag === 'All' ? projects : projects.filter(p => (p.tags || []).includes(tag)));
    });
}

/* --- Skills ------------------------------------------------------------- */
async function loadSkills() {
    const grid = document.getElementById('skills-grid');
    if (!grid) return;

    try {
        const response = await fetch('data/skills.json');
        if (!response.ok) throw new Error(response.status);
        const skills = await response.json();

        grid.innerHTML = skills.map(group => `
            <div class="skill-group reveal">
                <h3>${esc(group.category)}</h3>
                <div class="chips">
                    ${(group.items || []).map(item => `<span class="chip">${esc(item)}</span>`).join('')}
                </div>
            </div>`).join('');

        if (window.observeNewElements) window.observeNewElements();
    } catch (error) {
        console.error('Failed to load skills', error);
        grid.innerHTML = '<p class="dim">Skills could not be loaded right now.</p>';
    }
}
