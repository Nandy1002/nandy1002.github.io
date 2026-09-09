# Nabendu Das | Game Developer Portfolio

[![Live Demo](https://img.shields.io/badge/Live-nandy1002.github.io-FF7D4D?style=for-the-badge&logoColor=white)](https://nandy1002.github.io/)
[![Unity](https://img.shields.io/badge/Unity-6+-black?style=for-the-badge&logo=unity&logoColor=white)](https://unity.com/)
[![Unreal](https://img.shields.io/badge/Unreal_Engine-5-0E1128?style=for-the-badge&logo=unrealengine&logoColor=white)](https://www.unrealengine.com/)
[![C#](https://img.shields.io/badge/C%23-purple?style=for-the-badge&logo=csharp&logoColor=white)](https://learn.microsoft.com/en-us/dotnet/csharp/)

Gameplay-focused developer working across Unity and Unreal Engine 5. I build fast prototypes, tune the mechanics and feel, then iterate until they hold up in a playtest. Currently at **Zapplogics** (30+ mobile prototypes shipped) and building personal projects in my own time.

---

## 🚀 Featured Projects

### [Capture The Flag](https://nandy1002.github.io/project.html?id=capture-the-flag) — Unreal Engine 5
A multiplayer FPS prototype built in Unreal Engine 5. Two teams compete in fast-paced networked matches: infiltrate the enemy base, grab their flag, bring it home.
- **Key systems**: Replicated flag pickup/carry/return, team-based spawning, networked Game State scoring, UMG HUD synced across all clients, lobby + session flow.
- **Tech**: Unreal Engine 5, Blueprints, Unreal Networking, UMG, Online Subsystem.
- **Repo**: [Capture-The-Flag-Multiplayer-FPS---Unreal-](https://github.com/Nandy1002/Capture-The-Flag-Multiplayer-FPS---Unreal-)

### [TicTacTale](https://nandy1002.github.io/project.html?id=tictactale) — Unity 6 · In development
An original solo game that turns tic-tac-toe into a best-of-lives duel between two named fighters. Each round won drains one life from the loser; the match ends when a life bar empties.
- **Key systems**: Impact-frame pawn placement (DOTween), staggered win reveal, cross-scene match handoff via static record, coroutine-driven bot opponent.
- **Tech**: Unity 6, C#, DOTween, URP, TextMesh Pro.
- **Repo**: [TicTacTale-Game](https://github.com/Nandy1002/TicTacTale-Game)

### [The Cursed Chaos](https://nandy1002.github.io/project.html?id=cursed-chaos) — Unity 6
A first-person horror prototype — mountain-forest getaway gone wrong. Flashlight-led traversal, atmospheric level design, Timeline-driven story beats.
- **Key systems**: Interaction + inventory system, task/objective flow, NavMesh-driven pursuit, Cinemachine Timeline cutscenes.
- **Tech**: Unity 6, C#, URP, Cinemachine, Input System, ProBuilder, AI Navigation.
- **Repo**: [The-Cursed-Chaos-Horror-Game](https://github.com/Nandy1002/The-Cursed-Chaos-Horror-Game)

### [FPS Inventory System](https://nandy1002.github.io/project.html?id=fps-inventory-system) — Unity
A Unity prototype for a first-person shooter inventory and interaction system: weapon pickup, switching, and UI-based management.
- **Key systems**: Raycast-based interaction, weapon slot model, responsive inventory HUD, iterative feel tuning.
- **Tech**: Unity, C#, UI Toolkit, Input System.
- **Repo**: [Gun-Inventory-System-prototype-](https://github.com/Nandy1002/Gun-Inventory-System-prototype-)

### [Kitchen Chaos](https://nandy1002.github.io/project.html?id=kitchen-chaos) — Unity 6
A 3D cooking game built as a deliberate study in clean Unity architecture — polymorphic station hierarchy, interface-driven interaction, ScriptableObject-driven recipes.
- **Key systems**: `BaseCounter` polymorphic hierarchy, `IKitchenObjectParent` + `IHaveProgress` interfaces, event-driven game state, timer-based order system.
- **Tech**: Unity 6, C#, URP, Input System, Cinemachine, TextMesh Pro.
- **Repo**: [KitchenChaosGameProject](https://github.com/Nandy1002/KitchenChaosGameProject)

---

## 🛠️ Tech Stack & Skills

| Category | Tools |
|---|---|
| **Engines** | Unity 6, Unreal Engine 5 |
| **Languages** | C#, Blueprints, C++, JavaScript / HTML / CSS |
| **Unity tools** | URP, Cinemachine, Timeline, DOTween, Input System, ProBuilder, AI Navigation, TextMesh Pro |
| **Unreal tools** | Blueprints, UMG, Online Subsystem, Unreal Networking |
| **Specialties** | Gameplay Systems, Rapid Prototyping, Game Feel Tuning, Multiplayer Networking, FTUE Design |
| **Other** | Git / GitHub, Plastic SCM, Python |

---

## 🖥️ About This Portfolio

Built to stay out of the way of the work it shows.

- **Frontend**: Plain HTML5, vanilla JavaScript and a single hand-written stylesheet — no framework, no build step, no CDN scripts.
- **Design**: Neutral dark surfaces with one accent colour so screenshots and gameplay footage are the only colourful thing on the page.
- **Dynamic content**: Projects and skills load from JSON files — adding a project never means editing HTML.
- **Hosting**: GitHub Pages, deployed automatically via **GitHub Actions**.

### Project structure

```
index.html  projects.html  experience.html  project.html
css/style.css          all styling; design tokens live in :root at the top
js/nav.js              nav, active link, scroll reveal  (every page)
js/main.js             project grid + skills  (home & projects pages)
js/project.js          project detail page
data/projects.json     one entry per project
data/skills.json       skill groups rendered on the home page
assets/projects/<id>/  thumbnail.jpg + optional demo.mp4
```

### Adding a project

1. Add an entry to `data/projects.json`.
2. Drop a `thumbnail.jpg` (16:9) and an optional `demo.mp4` into `assets/projects/<id>/`, then set `thumbnail` / `demoVideo` to those paths.
3. Set `"featured": true` to surface it on the home page.

If a thumbnail is missing the card falls back to a placeholder rather than a broken image, and the detail page hides the media block entirely.

### Local development

A local server is required — the pages use `fetch()` to load JSON, which browsers block over `file://`.

```bash
git clone https://github.com/Nandy1002/nandy1002.github.io.git
cd nandy1002.github.io
python -m http.server 8000   # open http://localhost:8000
```

Or use the **Live Server** extension in VS Code.

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
    <img src="https://img.shields.io/badge/Contact_Form-4285F4?style=for-the-badge&logo=google-forms&logoColor=white" />
  </a>
</div>

---
*Made with 💙 by Nabendu Das.*
