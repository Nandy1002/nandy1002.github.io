document.addEventListener('DOMContentLoaded', () => {
    loadProjectDetails();
});

async function loadProjectDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    if (!projectId) {
        window.location.href = 'index.html';
        return;
    }

    try {
        const response = await fetch('data/projects.json');
        const projects = await response.json();
        
        const project = projects.find(p => p.id === projectId);
        
        if (!project) {
            document.getElementById('project-title-large').innerText = "PROJECT NOT FOUND";
            document.getElementById('project-short-desc').innerText = "Returning to database...";
            setTimeout(() => { window.location.href = 'index.html'; }, 2000);
            return;
        }

        // Apply title
        document.getElementById('project-title-large').innerText = project.title;
        document.title = project.title + " | Project Dossier";

        // Apply hero media — prefer video, fall back to image
        const heroVideo = document.getElementById('project-hero-video');
        const heroImage = document.getElementById('project-hero-image');

        if (project.demoVideo) {
            // Show video as hero background
            heroVideo.src = project.demoVideo;
            heroVideo.classList.remove('hidden');
            heroImage.classList.add('hidden');

            // Also populate the 04 // GAMEPLAY_DEMO full player section
            const videoSection = document.getElementById('project-video-section');
            const demoPlayer = document.getElementById('project-demo-player');
            if (videoSection && demoPlayer) {
                demoPlayer.src = project.demoVideo;
                videoSection.style.display = '';
            }
        } else if (project.heroImage || project.thumbnail) {
            // Fall back to static image
            heroImage.src = project.heroImage || project.thumbnail;
        }

        // Text content
        document.getElementById('project-short-desc').innerText = project.category;
        document.getElementById('project-description-full').innerText = project.description;
        document.getElementById('project-timeline').innerText = project.year;
        document.getElementById('project-role').innerText = project.role;

        // Populate Tech stack
        const techGrid = document.getElementById('project-tech-grid');
        let techHtml = '';
        const defaultIcons = ["code", "flare", "hub", "view_in_ar", "deployed_code", "memory"];
        project.technologies.forEach((tech, i) => {
            const icon = defaultIcons[i % defaultIcons.length];
            techHtml += `
            <div class="bg-surface-container-highest/30 p-4 rounded-lg border border-outline-variant/10 hover:border-primary/40 transition-all duration-300">
                <span class="material-symbols-outlined text-primary mb-2 text-3xl">${icon}</span>
                <div class="text-xs font-label text-white uppercase tracking-tighter">${tech}</div>
            </div>`;
        });
        techGrid.innerHTML = techHtml;

        // Links
        const btnPlay = document.getElementById('btn-play');
        const btnSource = document.getElementById('btn-source');

        if (project.webglLink && project.webglLink !== "#") {
            btnPlay.href = project.webglLink;
        } else {
            btnPlay.style.display = 'none';
        }

        if (project.codeLink && project.codeLink !== "#") {
            btnSource.href = project.codeLink;
        } else {
            btnSource.style.display = 'none';
        }

        // Mechanics blocks mapping
        const mechanicsContainer = document.getElementById('project-mechanics-container');
        let mechHtml = '';
        
        if (project.mechanics && project.mechanics.length > 0) {
            project.mechanics.forEach((mech, index) => {
                // Different layout based on index imitating the grid rules
                if (index === 0 && mech.image) {
                     mechHtml += `
                     <div class="md:col-span-4 lg:col-span-3 bg-surface-container-low rounded-xl overflow-hidden group hover:scale-[1.01] transition-transform duration-500">
                        <div class="h-64 relative overflow-hidden">
                            <img class="w-full h-full object-cover grayscale opacity-50 group-hover:scale-110 group-hover:grayscale-0 transition-all duration-700" src="${mech.image}">
                            <div class="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent"></div>
                        </div>
                        <div class="p-8 space-y-4">
                            <h4 class="text-2xl font-headline font-bold text-white uppercase">${mech.title}</h4>
                            <p class="text-on-surface-variant font-light text-sm leading-relaxed">${mech.description}</p>
                        </div>
                    </div>`;
                } else if (index === 1) {
                    mechHtml += `
                    <div class="md:col-span-4 lg:col-span-3 bg-surface-container-low rounded-xl p-8 flex flex-col justify-between border-t-2 border-primary/20">
                        <div class="space-y-4">
                            <span class="material-symbols-outlined text-primary text-5xl">${mech.icon || 'rocket_launch'}</span>
                            <h4 class="text-2xl font-headline font-bold text-white uppercase">${mech.title}</h4>
                            <p class="text-on-surface-variant font-light text-sm leading-relaxed">${mech.description}</p>
                        </div>
                    </div>`;
                } else {
                    let borderClass = index % 2 === 0 ? 'border-l-2 border-secondary/20' : 'border-r-2 border-primary/20';
                    let iconColor = index % 2 === 0 ? 'text-secondary' : 'text-primary-container';
                    mechHtml += `
                    <div class="md:col-span-2 lg:col-span-3 bg-surface-container-low rounded-xl p-8 space-y-4 ${borderClass}">
                        <span class="material-symbols-outlined ${iconColor} text-5xl">${mech.icon || 'light_mode'}</span>
                        <h4 class="text-xl font-headline font-bold text-white uppercase">${mech.title}</h4>
                        <p class="text-on-surface-variant font-light text-sm leading-relaxed">${mech.description}</p>
                    </div>`;
                }
            });
            mechanicsContainer.innerHTML = mechHtml;
        } else {
            document.querySelector('#project-mechanics-container').parentElement.style.display = 'none';
        }
        
        if (window.observeNewElements) window.observeNewElements();

    } catch (e) {
        console.error("Error loading project details", e);
    }
}
