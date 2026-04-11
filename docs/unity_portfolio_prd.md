# Product Requirements Document (PRD)

## 1. Project Overview
Create a professional personal portfolio website for a Unity/Game Developer. The website will showcase experience, featured projects, technical skills, and contact information, with a downloadable resume attached. It will be hosted as a static site on GitHub Pages and built using plain HTML, CSS, and JavaScript, with project data stored in a JSON file.

The website should feel clean, modern, and credible to recruiters, hiring managers, and potential clients.

## 2. Project Goals
- Present the developer as a strong Unity/Game Developer.
- Showcase projects in a clear, visually engaging way.
- Provide quick access to playable prototypes, videos, and code or prototype pages.
- Highlight skills and technologies in a structured, professional way.
- Make contact and resume access simple.
- Keep the site lightweight and easy to maintain on GitHub Pages.

## 3. Success Metrics
- Visitors can understand the developer’s role and skill level within 10 seconds.
- Each project is accessible within 2 clicks from the homepage.
- Resume download is visible and easy to find.
- The site works well on mobile, tablet, and desktop.
- The portfolio is easy to update by editing the JSON data file.

## 4. Target Audience
### Primary
- Recruiters
- Game studios
- Hiring managers
- Technical leads

### Secondary
- Potential freelance clients
- Students or peers reviewing work
- Community members exploring projects

## 5. Core Content Sections
### 5.1 Hero / Intro
- Developer name
- Short professional title, such as Unity Developer / Game Developer
- Short summary statement
- Primary call-to-action buttons:
  - View Projects
  - Download Resume
  - Contact Me

### 5.2 About / Experience
- Brief professional introduction
- Years of experience
- Key domains worked on
- Past roles or important experience points
- Optional career highlights or achievements

### 5.3 Projects
A dynamic project gallery loaded from JSON.
Each project card should show:
- Title
- Thumbnail image
- Short description
- Main technologies used
- Demo video link or embedded playable demo link
- Prototype / code page link
- Optional live WebGL build link

Each project detail view should include:
- Full title
- Larger preview media
- Video demo
- Description
- Role and contributions
- Technologies used
- Links to prototype, code, or build
- Optional challenge/solution notes

### 5.4 Skills and Technologies
A section that clearly shows what the developer is good at.
This should include grouped categories such as:
- Game Engines
- Programming Languages
- Tools and IDEs
- Systems / Features
- Art / Pipeline tools if relevant

The section should be visually scannable and not overloaded.

### 5.5 Contact
- Email link
- LinkedIn link
- GitHub link
- Other relevant links such as itch.io, ArtStation, Behance, or portfolio social links
- Optional contact form if desired later, though static hosting means external form handling would be needed

### 5.6 Resume
- Direct downloadable resume file
- Optional inline preview section or button

## 6. Functional Requirements
### 6.1 Site Structure
The site should support a single-page portfolio flow or a simple multi-section landing page with smooth scrolling.

### 6.2 Project Data from JSON
The portfolio must read project content from a JSON database.
Each project entry should support:
- id
- title
- thumbnail
- demoVideo
- prototypeLink
- codeLink
- webglLink
- description
- tags
- featured flag
- category
- technologies
- role
- year

### 6.3 Project Interaction
- Clicking a project card should open a detailed view, modal, or dedicated section.
- The detail view should allow viewing the demo video or playable prototype.
- If a WebGL build exists, it should be linked or embedded where practical.

### 6.4 Resume Download
- The resume should be accessible from the homepage and contact area.
- Clicking it should open or download the PDF version.

### 6.5 Responsive Behavior
- Fully responsive layout for mobile, tablet, laptop, and desktop.
- Media and cards should scale gracefully.

### 6.6 Navigation
- Sticky or prominent navigation with links to:
  - Home
  - About
  - Projects
  - Skills
  - Contact

## 7. Non-Functional Requirements
- Fast loading on static hosting.
- Lightweight and optimized images/videos.
- Clean semantic HTML structure.
- Accessible contrast and readable typography.
- Works reliably on GitHub Pages.
- Easy to update without rebuilding a complex backend.

## 8. Design Requirements
### Visual Style
- Professional
- Minimal but polished
- Strong use of whitespace
- Clear hierarchy
- Modern dark or light theme, depending on branding

### UI Components
- Hero banner
- Project cards/grid
- Skill badges or categorized chips
- Timeline or cards for experience
- Contact icons/buttons
- Resume call-to-action

### Interaction Style
- Smooth scroll navigation
- Hover states on cards and buttons
- Modal or expanded project detail panel
- Optional animation for section reveal, kept subtle

## 9. Suggested Technical Stack
Since the site will be hosted on GitHub Pages:
- HTML5
- CSS3
- Vanilla JavaScript
- JSON for data storage
- Optional lightweight libraries only if needed

Recommended folder structure:
- index.html
- assets/
  - images/
  - videos/
  - resume/
- data/
  - projects.json
- css/
  - style.css
- js/
  - main.js

## 10. Content Data Model
### Project JSON Example Fields
```json
{
  "id": "project-001",
  "title": "Game Title",
  "thumbnail": "assets/images/project-thumb.jpg",
  "demoVideo": "assets/videos/project-demo.mp4",
  "prototypeLink": "https://example.com/prototype",
  "codeLink": "https://github.com/username/repo",
  "webglLink": "https://username.github.io/project-webgl/",
  "description": "Short project summary.",
  "category": "Action / RPG",
  "technologies": ["Unity", "C#", "WebGL"],
  "tags": ["Multiplayer", "Combat", "UI Systems"],
  "role": "Gameplay Programmer",
  "year": 2026,
  "featured": true
}
```

### Skill Data Example Fields
```json
{
  "category": "Game Engine",
  "items": ["Unity", "Unreal"],
  "level": "Advanced"
}
```

## 11. Page / Section Flow
Recommended flow:
1. Hero
2. About / Experience
3. Featured Projects
4. Skills and Technologies
5. Additional Projects or Timeline
6. Contact
7. Resume download footer

## 12. Accessibility Requirements
- Alt text for images
- Keyboard accessible navigation
- Visible focus states
- Good color contrast
- Captions or labels for videos where possible

## 13. SEO Requirements
- Proper page title and meta description
- Open Graph tags for sharing
- Semantic headings
- Descriptive project titles and summaries

## 14. Analytics / Tracking
Optional but useful:
- Track project card clicks
- Track resume downloads
- Track contact link clicks
- Track most viewed featured project

## 15. Risks and Constraints
- Static hosting limits advanced backend features.
- Large video files may slow down loading.
- WebGL builds can be heavy and need optimization.
- Too many projects on the homepage can make the page feel cluttered.

## 16. MVP Scope
The first version should include:
- Hero section
- About / Experience
- JSON-driven project showcase
- Skills section
- Contact section
- Resume download
- Responsive design

## 17. Future Enhancements
- Dedicated blog or devlog section
- Filterable project categories
- Search within projects
- Dark/light theme toggle
- Embedded Unity WebGL player
- Contact form with email service integration
- Testimonials or recommendations

## 18. Definition of Done
The project is complete when:
- The website is visually polished and responsive.
- All sections are implemented.
- Project data loads from JSON.
- Clicking a project opens the correct detailed content.
- Resume download works.
- Contact links work.
- The site deploys successfully on GitHub Pages.

