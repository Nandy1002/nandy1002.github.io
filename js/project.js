/* Fills project.html from data/projects.json using the ?id= query parameter. */

document.addEventListener('DOMContentLoaded', loadProject);

function esc(value) {
    return String(value ?? '').replace(/[&<>"']/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
}

function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value ?? '—';
}

async function loadProject() {
    const id = new URLSearchParams(window.location.search).get('id');
    if (!id) {
        showNotFound();
        return;
    }

    let projects;
    try {
        const response = await fetch('data/projects.json');
        if (!response.ok) throw new Error(response.status);
        projects = await response.json();
    } catch (error) {
        console.error('Failed to load project', error);
        showNotFound('Project data could not be loaded.');
        return;
    }

    const project = projects.find(p => p.id === id);
    if (!project) {
        showNotFound();
        return;
    }

    document.title = `${project.title} — Nabendu Das`;

    setText('project-category', project.subtitle || project.category);
    setText('project-title', project.title);
    setText('project-year', project.year);
    setText('project-role', project.role);
    setText('project-type', project.category);
    setText('project-description', project.description);

    renderLinks(project);
    renderMedia(project);
    renderTech(project);
    renderFeatures(project);
    renderCodeHighlights(project);

    if (window.observeNewElements) window.observeNewElements();
}

function renderLinks(project) {
    const playLink = project.webglLink || project.itchLink || project.prototypeLink;
    const play = document.getElementById('btn-play');
    const source = document.getElementById('btn-source');

    if (play && playLink && playLink !== '#') {
        play.href = playLink;
        play.hidden = false;
    }
    if (source && project.codeLink && project.codeLink !== '#') {
        source.href = project.codeLink;
        source.hidden = false;
    }
}

function renderMedia(project) {
    const section = document.getElementById('project-media-section');
    const frame = document.getElementById('project-media');
    if (!section || !frame) return;

    const poster = project.thumbnail || project.heroImage;

    if (project.demoVideo) {
        // preload="none" keeps a large demo file off the wire until the visitor asks for it.
        frame.innerHTML = `
            <video controls preload="none"${poster ? ` poster="${esc(poster)}"` : ''}>
                <source src="${esc(project.demoVideo)}" type="video/mp4">
                Your browser cannot play this video.
            </video>`;
        frame.querySelector('video').addEventListener('error', () => { section.hidden = true; }, true);
        section.hidden = false;
        return;
    }

    const image = project.heroImage || project.thumbnail;
    if (image) {
        frame.innerHTML = `<img src="${esc(image)}" alt="${esc(project.title)} screenshot">`;
        frame.querySelector('img').addEventListener('error', () => { section.hidden = true; });
        section.hidden = false;
    }
}

function renderTech(project) {
    const list = document.getElementById('project-tech');
    if (!list) return;
    list.innerHTML = (project.technologies || [])
        .map(tech => `<span class="chip">${esc(tech)}</span>`)
        .join('');
}

function renderFeatures(project) {
    const section = document.getElementById('project-features-section');
    const grid = document.getElementById('project-features');
    if (!section || !grid) return;

    const mechanics = project.mechanics || [];
    if (!mechanics.length) return;

    grid.innerHTML = mechanics.map((m, i) => `
        <div class="card feature reveal">
            <span class="num">${String(i + 1).padStart(2, '0')}</span>
            <h3>${esc(m.title)}</h3>
            <p>${esc(m.description)}</p>
        </div>`).join('');

    section.hidden = false;
}

/* Deep links into the repo, so a reviewer lands on real code rather than a repo root. */
function renderCodeHighlights(project) {
    const section = document.getElementById('project-code-section');
    const list = document.getElementById('project-code');
    if (!section || !list) return;

    const items = project.codeHighlights || [];
    if (!items.length) return;

    list.innerHTML = items.map(item => `
        <a class="code-item" href="${esc(item.url)}" target="_blank" rel="noopener">
            <code>${esc(item.label)}</code>
            <span>${esc(item.note)}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <path d="M7 17L17 7M9 7h8v8" />
            </svg>
        </a>`).join('');

    section.hidden = false;
}

function showNotFound(message) {
    setText('project-category', 'Not found');
    setText('project-title', 'This project does not exist');
    setText('project-description', message || 'The link may be out of date. Head back to the projects page to see everything that is available.');
    document.querySelector('.meta-row')?.remove();
}
