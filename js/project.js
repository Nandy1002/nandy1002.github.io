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

    renderStatus(project);
    renderLinks(project);
    renderMedia(project);
    renderControls(project);
    renderTech(project);
    renderFeatures(project);
    renderGallery(project);
    renderCodeHighlights(project);

    if (window.observeNewElements) window.observeNewElements();

    // "#play" links (e.g. from the home page) land on the game, which only exists once rendered.
    if (window.location.hash === '#play') {
        document.getElementById('project-media-section')?.scrollIntoView();
    }
}

/* Released games get a "Shipped" chip plus platform / team / jam in the meta row. */
function renderStatus(project) {
    const status = document.getElementById('project-status');
    if (status && project.shipped) {
        const where = project.itchLink ? ' on itch.io' : '';
        status.innerHTML = `<span class="chip chip--accent">Shipped${where}</span>`
            + (project.jam ? `<span class="chip">Game jam entry</span>` : '');
        status.hidden = false;
    }

    const show = (id, value) => {
        const row = document.getElementById(id);
        if (row && value) row.hidden = false;
    };
    setText('project-platform', project.platform);
    show('meta-platform', project.platform);
    setText('project-team', project.team);
    show('meta-team', project.team);

    const jam = document.getElementById('project-jam');
    if (jam && project.jam) {
        const href = project.jam.entryUrl || project.jam.url;
        jam.innerHTML = href
            ? `<a href="${esc(href)}" target="_blank" rel="noopener">${esc(project.jam.name)}</a>`
            : esc(project.jam.name);
        show('meta-jam', project.jam.name);
    }
}

function renderLinks(project) {
    const playLink = project.webglLink || project.itchLink || project.prototypeLink;
    const play = document.getElementById('btn-play');
    const itch = document.getElementById('btn-itch');
    const source = document.getElementById('btn-source');

    if (play && project.embedUrl) {
        // Playable right here: the button scrolls to the frame and boots the build.
        play.textContent = 'Play in browser';
        play.href = '#play';
        play.removeAttribute('target');
        play.addEventListener('click', e => {
            e.preventDefault();
            document.getElementById('project-media-section')?.scrollIntoView({ behavior: 'smooth' });
            startEmbed(project);
        });
        play.hidden = false;
        if (itch && project.itchLink) {
            itch.href = project.itchLink;
            itch.hidden = false;
        }
    } else if (play && playLink && playLink !== '#') {
        if (project.itchLink && playLink === project.itchLink && project.platform) {
            play.textContent = `Download for ${project.platform} on itch.io`;
        }
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

    // Browser builds load on click: a Unity WebGL download shouldn't start for every visitor.
    if (project.embedUrl) {
        const { width = 960, height = 540 } = project.embedSize || {};
        frame.classList.add('media-frame--game');
        frame.style.setProperty('--game-w', `${width}px`);
        frame.style.setProperty('--game-ratio', `${width} / ${height}`);
        const cover = project.heroImage || project.thumbnail;
        frame.innerHTML = `
            <button type="button" class="game-start${project.pixelArt ? ' pixelated' : ''}" id="game-start">
                ${cover ? `<img src="${esc(cover)}" alt="">` : ''}
                <span class="game-start-label">
                    <span class="btn btn--primary">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                        Play in browser
                    </span>
                    <span class="small">Loads the WebGL build · keyboard required</span>
                </span>
            </button>`;
        frame.querySelector('#game-start').addEventListener('click', () => startEmbed(project));
        section.hidden = false;
        return;
    }

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

/* Swaps the poster for the live itch.io embed and hands it keyboard focus. */
function startEmbed(project) {
    const frame = document.getElementById('project-media');
    if (!frame || frame.querySelector('iframe')) return;

    const { width = 960, height = 540 } = project.embedSize || {};
    frame.innerHTML = `
        <iframe src="${esc(project.embedUrl)}" width="${width}" height="${height}"
            title="${esc(project.title)} — playable build" frameborder="0"
            allow="autoplay; fullscreen; gamepad" allowfullscreen></iframe>`;
    const iframe = frame.querySelector('iframe');
    iframe.addEventListener('load', () => iframe.focus());
    iframe.focus();
}

function renderControls(project) {
    const list = document.getElementById('project-controls');
    const controls = project.controls || [];
    if (!list || !controls.length) return;

    list.innerHTML = controls.map(c => `
        <div>
            <dt>${esc(c.action)}</dt>
            <dd><kbd>${esc(c.keys)}</kbd></dd>
        </div>`).join('');
    list.hidden = false;

    // The controls sit under the media frame, so they need it to be showing.
    document.getElementById('project-media-section')?.removeAttribute('hidden');
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

    // Team jam games describe the shipped game rather than claiming each system as solo work.
    if (project.mechanicsEyebrow) setText('project-features-eyebrow', project.mechanicsEyebrow);
    if (project.mechanicsTitle) setText('project-features-title', project.mechanicsTitle);

    grid.innerHTML = mechanics.map((m, i) => `
        <div class="card feature reveal">
            <span class="num">${String(i + 1).padStart(2, '0')}</span>
            <h3>${esc(m.title)}</h3>
            <p>${esc(m.description)}</p>
        </div>`).join('');

    section.hidden = false;
}

function renderGallery(project) {
    const section = document.getElementById('project-gallery-section');
    const grid = document.getElementById('project-gallery');
    if (!section || !grid) return;

    const shots = project.gallery || [];
    if (!shots.length) return;

    grid.classList.toggle('pixelated', Boolean(project.pixelArt));
    grid.innerHTML = shots.map(shot => `
        <a class="gallery-item reveal" href="${esc(shot.src)}" target="_blank" rel="noopener">
            <img src="${esc(shot.src)}" alt="${esc(shot.alt || project.title + ' screenshot')}" loading="lazy">
        </a>`).join('');

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
