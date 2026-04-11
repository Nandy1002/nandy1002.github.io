document.addEventListener('DOMContentLoaded', async () => {
    await Promise.all([loadProjects(), loadSkills()]);
    handleHashNavigation();
});

function handleHashNavigation() {
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            // Short delay to ensure browser layout has settled after reveal animations
            setTimeout(() => {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }
}

async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');
        const projects = await response.json();
        
        const featuredGrid = document.getElementById('featured-projects-grid');
        const allGrid = document.getElementById('projects-grid');
        const container = featuredGrid || allGrid;
        
        if (!container) return;
        
        const isFeaturedOnly = !!featuredGrid;
        const displayProjects = isFeaturedOnly ? projects.filter(p => p.featured) : projects;
        
        let html = '';
        displayProjects.forEach(p => {
            // Pick color style based on category/index
            let chipColorClass = (p.id === 'project-002') ? 'bg-secondary text-on-secondary' 
                                : (p.id === 'project-003') ? 'bg-primary-container text-on-primary-container' 
                                : 'bg-primary text-on-primary';
            
            let hoverShadowClass = (p.id === 'project-002') ? 'hover:shadow-[0_0_40px_rgba(208,91,255,0.1)]'
                                  : 'hover:shadow-[0_0_40px_rgba(0,229,255,0.1)]';
                                  
            let actionColorClass = (p.id === 'project-002') ? 'text-secondary-fixed-dim' : 'text-primary-fixed-dim';
            
            let actionText = (p.id === 'project-002') ? 'Play Demo' : (p.id === 'project-003') ? 'Watch Trailer' : 'View Project';
            let actionIcon = (p.id === 'project-002') ? 'play_circle' : (p.id === 'project-003') ? 'visibility' : 'arrow_forward';

            let tagsHtml = p.tags.map(t => `<span class="px-3 py-1 bg-surface-container-highest text-on-surface-variant font-label text-[10px] uppercase tracking-widest rounded-sm border border-white/5">${t}</span>`).join('');

            html += `
            <div class="group bg-surface-container-low rounded-xl overflow-hidden ghost-border aaa-card-hover border-transparent transition-all duration-500 cursor-pointer ${hoverShadowClass} reveal-up delay-100" onclick="window.location.href='project.html?id=${p.id}'">
                <div class="aspect-video relative overflow-hidden">
                    <img alt="${p.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="${p.thumbnail}"/>
                    <div class="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent opacity-60"></div>
                    <div class="absolute top-4 left-4">
                        <span class="px-3 py-1 ${chipColorClass} font-label text-[10px] uppercase tracking-widest rounded-sm font-bold">${p.primaryTag}</span>
                    </div>
                </div>
                <div class="p-8">
                    <h3 class="font-headline text-2xl font-bold text-on-surface mb-3 uppercase tracking-tight">${p.title}</h3>
                    <p class="font-body text-sm text-on-surface-variant mb-6">${p.description.substring(0, 100)}...</p>
                    <div class="flex flex-wrap gap-2 mb-6">
                        ${tagsHtml}
                    </div>
                    <a class="${actionColorClass} font-headline text-sm uppercase tracking-widest flex items-center gap-2 group/link hover:text-white transition-colors" href="project.html?id=${p.id}">
                        ${actionText} 
                        <span class="material-symbols-outlined text-lg transition-transform group-hover/link:translate-x-1">${actionIcon}</span>
                    </a>
                </div>
            </div>`;
        });
        container.innerHTML = html;
        if(window.observeNewElements) window.observeNewElements();
        
    } catch (error) {
        console.error("Failed to load projects", error);
    }
}

async function loadSkills() {
    try {
        const response = await fetch('data/skills.json');
        const skills = await response.json();
        const grid = document.getElementById('skills-grid');
        
        let html = '';
        skills.forEach(category => {
            let itemsHtml = category.items.map(item => `
                <span class="px-4 py-2 bg-surface-container-highest text-on-surface font-label text-xs uppercase tracking-widest rounded-sm transition-all hover:bg-primary-container hover:text-on-primary-container hover:scale-105 border border-white/5">${item}</span>
            `).join('');

            html += `
            <div class="glass-panel p-8 rounded-xl ghost-border aaa-card-hover border-transparent transition-all duration-300 reveal-up delay-200">
                <div class="flex items-center gap-4 mb-8">
                    <span class="material-symbols-outlined text-3xl ${category.color}" style="font-variation-settings: 'FILL' 1;">${category.icon}</span>
                    <h3 class="font-headline text-xl font-bold text-on-surface uppercase tracking-wider">${category.category}</h3>
                </div>
                <div class="flex flex-wrap gap-3">
                    ${itemsHtml}
                </div>
            </div>`;
        });
        grid.innerHTML = html;
        if(window.observeNewElements) window.observeNewElements();

    } catch (error) {
        console.error("Failed to load skills", error);
    }
}
