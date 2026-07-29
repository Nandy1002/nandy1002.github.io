/* Renders the project grid (home + projects page) and the skills list. */

document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    loadSkills();
});

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
            ${project.demoVideo ? '<span class="badge">Demo video</span>' : ''}
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
        const tags = (p.tags || []).map(t => `<span class="chip">${esc(t)}</span>`).join('');
        const thumb = p.thumbnail
            ? `<img src="${esc(p.thumbnail)}" alt="${esc(p.title)} screenshot" loading="lazy" onerror="thumbFallback(this)">`
            : '';

        const badge = p.demoVideo ? '<span class="badge">Demo video</span>' : '';

        return `
        <a class="card card--link project-card reveal" href="project.html?id=${encodeURIComponent(p.id)}">
            <div class="thumb${thumb ? '' : ' thumb--empty'}" data-label="${esc(p.title)}">${thumb}${badge}</div>
            <div class="card-body">
                <h3>${esc(p.title)}</h3>
                <p class="meta-line">${esc(p.role)} · ${esc(p.year)}</p>
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

    const tags = [...new Set(projects.flatMap(p => p.tags || []))].sort();
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
