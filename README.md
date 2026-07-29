# Nabendu Das | Unity Game Developer Portfolio

[![Live Demo](https://img.shields.io/badge/Live-Demo-FF7D4D?style=for-the-badge&logoColor=white)](https://nandy1002.github.io/)
[![Unity](https://img.shields.io/badge/Unity-2022.3+-black?style=for-the-badge&logo=unity&logoColor=white)](https://unity.com/)
[![C#](https://img.shields.io/badge/C%23-Programming-purple?style=for-the-badge&logo=csharp&logoColor=white)](https://learn.microsoft.com/en-us/dotnet/csharp/)

Welcome to my professional portfolio. I am a gameplay-focused Unity developer experienced in building fast, playable prototypes and high-quality game mechanics. My work emphasizes game feel tuning, core interaction systems, and performance optimization.

---

## 🚀 Featured Projects

### [FPS Inventory System](https://nandy1002.github.io/project.html?id=fps-inventory-system)
A Unity prototype for a first-person shooter inventory and interaction system.
- **Key Features**: Weapon pickup/switching, UI Toolkit HUD, raycast-based interactions.
- **Tech Stack**: Unity 2022.3, C#, Input System.

### [The Cursed Chaos](https://nandy1002.github.io/project.html?id=cursed-chaos)
A first-person horror prototype focused on atmosphere and exploration.
- **Key Features**: Flashlight-led traversal, inventory and resource management, environmental puzzles, NavMesh-driven pursuit.
- **Tech Stack**: Unity 6, C#, URP, Cinemachine, Input System, ProBuilder, AI Navigation.

### [Kitchen Chaos](https://nandy1002.github.io/project.html?id=kitchen-chaos)
A 3D cooking game built as a study in clean Unity architecture, following Code Monkey's course.
- **Key Features**: Polymorphic `BaseCounter` station hierarchy, interface-driven interaction (`IKitchenObjectParent`, `IHaveProgress`), ScriptableObject-driven recipes, event-based game state.
- **Tech Stack**: Unity 6, C#, URP, Input System, Cinemachine, TextMesh Pro.

---

## 🛠️ Tech Stack & Skills

- **Engines**: Unity, AR/VR (Samsung Prism Internship).
- **Languages**: C#, C++, JavaScript (HTML/CSS for this portfolio).
- **Tools**: Git/GitHub, UI Toolkit, ProBuilder, Post-Processing.
- **Specialties**: Gameplay Systems, Rapid Prototyping, Game Feel (Juice), Interaction Design.

---

## 🖥️ About This Portfolio

Built to stay out of the way of the work it shows.

- **Frontend**: Plain HTML5, vanilla JavaScript and a single hand-written stylesheet — no framework, no build step, no CDN scripts.
- **Design**: Neutral dark surfaces with one accent colour, so screenshots and gameplay footage are the only colourful thing on the page.
- **Dynamic content**: Projects and skills come from JSON files, so adding work never means editing HTML.
- **Hosting**: Deployed automatically via **GitHub Actions** to GitHub Pages.

### Project structure

```
index.html  projects.html  experience.html  project.html
css/style.css      all styling; design tokens live in :root at the top
js/nav.js          nav, active link, scroll reveal (every page)
js/main.js         project grid + skills (home & projects pages)
js/project.js      project detail page
data/projects.json data/skills.json
assets/projects/<project-id>/
```

### Adding a project

1. Add an entry to `data/projects.json`.
2. Drop `thumbnail.png` (16:9) and an optional `demo.mp4` into `assets/projects/<id>/`, then point `thumbnail` / `demoVideo` at them.
3. Set `"featured": true` to surface it on the home page.

If a thumbnail is missing the card falls back to a placeholder rather than a broken image, and the detail page hides its media block entirely.

### Local development

A local server is required — the pages `fetch()` the JSON data files, which browsers block over `file://`.

```bash
git clone https://github.com/Nandy1002/nandy1002.github.io.git
cd nandy1002.github.io
python -m http.server 8000   # then open http://localhost:8000
```

Or use the Live Server extension in VS Code.

---

## 📫 Get In Touch

**nabendudas2001@gmail.com** — open to gameplay programming roles.

<div align="left">
  <a href="https://www.linkedin.com/in/nabendu-das-1790a8202/" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" />
  </a>
  <a href="https://nandy1002.itch.io/" target="_blank">
    <img src="https://img.shields.io/badge/Itch.io-FA5C5C?style=for-the-badge&logo=itch.io&logoColor=white" />
  </a>
  <a href="https://forms.gle/zkxzp6RKNk1QjEyh6" target="_blank">
    <img src="https://img.shields.io/badge/Connect-Google_Forms-4285F4?style=for-the-badge&logo=google-forms&logoColor=white" />
  </a>
</div>

---
*Created with 💙 by Nabendu Das.*
