# NABENDU DAS

**Software Development Engineer | Game Development (C#, Python, Unity)**

Email: nabendudas2001@gmail.com | Phone: +91-9475563268
Location: West Bengal, India — **open to relocation to Bangalore** (based there for MCA and two internships)
Portfolio: https://nandy1002.github.io | GitHub: github.com/Nandy1002 | LinkedIn: linkedin.com/in/nabendu-das-1790a8202

---

## Summary

Software engineer with 18 months of professional development experience, building **30+ mobile games and interactive
applications** in **C#** and Unity at Zapplogics. Strong **object-oriented design** and a solid grounding in **data
structures, algorithms and software engineering principles**, backed by an MCA (8.83 CGPA) and a Mathematics degree
(8.89 CGPA). Comfortable translating product requirements into **clean, modular, well-documented code**, implementing
**gameplay mechanics and user interfaces to design specification**, and debugging and optimising builds for release.
Also works in **Python** across backend and ML applications. Recently building an original **turn-based two-player
board game** with bot opponent logic — the same category as casual multiplayer titles. Fast learner, comfortable in
startup pace, and a daily user of modern AI-assisted development tooling.

---

## Technical Skills

**Programming Languages** — C#, Python

**Computer Science Fundamentals** — Data Structures, Algorithms, Object-Oriented Programming (OOP), Object-Oriented
Design, SOLID Principles, Software Design Patterns, Software Engineering Principles, Discrete Mathematics, Problem
Solving

**Game Development** — Unity3D, Unity 6, Gameplay Mechanics, Turn-Based Game Logic, Game State Machines, Bot / Opponent
Logic, UI Systems, Game Physics & Collisions, Animation & Tweening, First-Time User Experience (FTUE), Rapid
Prototyping, Mobile Game Development

**Unity Systems** — Scenes, Prefabs, ScriptableObjects, Input System, URP, Cinemachine, Timeline, AI Navigation,
DOTween, TextMesh Pro, Asset Pipeline, 2D and 3D

**Software Development Practices** — Version Control (Git, GitHub, Plastic SCM), Code Reviews, Testing & Debugging,
Profiling & Performance Optimisation, Modular Architecture, Clean and Well-Documented Code, Agile / Iterative
Development, Cross-Functional Collaboration

**Backend & Data** — Django, REST API Integration, Third-Party SDK Integration, NumPy, Pandas, Scikit-learn, JSON

**AI-Assisted Development** — Claude Code, GitHub Copilot, Antigravity

**Tools** — Unity Editor, Visual Studio, VS Code, Git, GitHub

---

## Professional Experience

### Unity Game Developer — Zapplogics Solution
**Feb 2025 – Present | Remote**

- Built **30+ mobile games, prototypes and live projects** in **C#** and Unity, taking each from requirement to a
  released, test-ready build.
- **Collaborated with designers, product stakeholders and other developers** to understand requirements and translate
  them into working code and shipped features.
- Implemented **gameplay mechanics, user interfaces and game features to design specification**, iterating on
  responsiveness and feel from playtest feedback.
- Wrote **clean, modular and documented C#** using **object-oriented design** — component-based architecture and
  data-driven configuration, so systems could be reused across projects rather than rewritten.
- **Tested, debugged and optimised builds** for performance and stability across a wide range of Android devices,
  working through issues to deliver bug-free releases.
- Worked in **short, iterative development cycles** in a fast-paced startup environment, enabling concepts to be
  validated or dropped quickly.
- Use **AI coding assistants (Claude Code, GitHub Copilot) daily in production work** to accelerate implementation and
  debugging, while owning architecture and design decisions directly.

### AR/VR Developer Intern — Samsung Prism
**Aug 2023 – Dec 2023 | Bangalore, India**

- Developed a **multi-user VR prototype** in Unity with **real-time avatar synchronisation** and dynamic positioning
  across connected clients.
- Implemented **interactive UI and user interaction systems**, iterating on responsiveness from team testing.
- Collaborated within a small engineering team to **debug issues and deliver stable, test-ready builds** to a fixed
  research deadline.

### Salesforce Support / Release Intern — Volvo Car
**Feb 2024 – Jul 2024 | Bangalore, India**

- Improved support workflow efficiency by **10%** through process optimisation on an enterprise platform.
- Managed access control and user profiles for **25+ accounts**, ensuring data security.
- **Collaborated with cross-functional teams** across engineering, support and product, following structured **release
  and QA workflows**.

---

## Projects

### TicTacTale — Turn-Based Two-Player Board Game (Unity 6, C#) | Solo Developer, in development
github.com/Nandy1002/TicTacTale-Game | Jul 2026 – Present

An original **turn-based board game** built solo and owned end to end. Designed a **best-of match structure with life
pools** — each round won drains a life from the opponent, who then starts the next round — implemented as a **state
machine** managing turn order, round resolution, life tracking and match-over conditions in a single authoritative
manager. Built **bot opponent logic** with a randomised decision delay, a generic **NxN board** with row, column and
diagonal win detection driven by serialised parameters rather than hard-coded values, and a full three-scene flow
(menu, character matching, battle) with match state passed between scenes through a static data record. Substantial
work on **UI, animation and game feel** using DOTween — impact frames, hitstop timing and a staggered win-line reveal.

### Kitchen Chaos — Object-Oriented Architecture Study (Unity 6, C#)
github.com/Nandy1002/KitchenChaosGameProject | 2024

A timed order-fulfilment game built as a deliberate study in **object-oriented design and clean architecture**. Seven
station types **inherit from a single base class**; shared **C# interfaces** let the player, stations and plates all
satisfy one contract; game content lives in **ScriptableObject data assets** instead of hard-coded values; and a
**C# event-driven** layer keeps visuals and audio subscribed to game state rather than coupled into it. Built following
Code Monkey's course as a structured study in extensible design.

### The Cursed Chaos — 3D Interactive Horror Game (Unity 6, C#)
github.com/Nandy1002/The-Cursed-Chaos-Horror-Game | Jan 2025 – Feb 2025

A first-person 3D game with a complete end-to-end loop. Built the **interaction and inventory systems**, a
**task/objective system** driving player progression, and environment design, with sequenced story beats staged in
**Timeline and Cinemachine**. Uses **URP**, **AI Navigation** and **ScriptableObject-driven data**. Character movement
builds on Unity's Starter Assets controller and avatars come from Ready Player Me; the systems layered on top are mine.

### FPS Inventory System — Modular Systems Prototype (Unity, C#)
github.com/Nandy1002/Gun-Inventory-System-prototype- | Aug 2024 – Nov 2024

A **modular inventory and interaction system**: raycast-based pickup, item switching, drop/cycle handling and a
UI-driven inventory HUD. **UI panels are separated from the underlying data models**, so slot behaviour and item
definitions change independently — 12 focused classes rather than one monolithic controller.

### Real Estate Price Prediction System — Python / Django Web Application
github.com/Nandy1002/House_Price_Prediction_Project | Dec 2024 – Feb 2025

ML-backed property price estimation served through a **Django** web interface — data preprocessing, model training and
real-time prediction using **NumPy, Pandas and Scikit-learn**, with the trained model exposed to the frontend as a live
prediction endpoint.

### Realistic Object Collision — Unity Physics Study (Unity, C#)
github.com/Nandy1002/Realistic-Object-Collision-in-Unity | Jan 2025

A focused study in **physics and collision behaviour** — tuning rigidbody interaction, colliders and impact response so
two objects meeting reads as physically believable rather than scripted.

### Wuthering Waves Discord Bot — Third-Party API Integration (Python)
github.com/Nandy1002/Wuwa-Discord-Bot | 2026

A Discord bot integrating a **third-party API and SDK**, handling command routing, external data retrieval and
structured response formatting.

---

## Education

**Master of Computer Applications (MCA)** — RV College of Engineering, Bangalore
Sep 2022 – Sep 2024 | **CGPA 8.83 / 10**

**B.Sc. Mathematics** — The University of Burdwan, West Bengal
Jul 2019 – Aug 2022 | **CGPA 8.89 / 10**

---

## Certification

**Soft Skills & Personality** — NPTEL
