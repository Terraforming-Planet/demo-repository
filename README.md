

<!--
  Terraforming-Planet / Organization README
  Tip: this file works best in .github/profile/README.md
-->

<div align="center">

# 🌍 Terraforming-Planet image-gen
### An image generation platform for visual learning and experimentation in terrain formation, self-sustaining photovoltaic vehicles, and planetary engineering


# “Visualize first engineer wisely ,every planet is a system. Every system can be understood.”
<img width="1536" height="1024" alt="19882" src="https://github.com/user-attachments/assets/372c80f7-5259-4ccf-a6c4-24b877348c98" />

**Solution technology for the Planet**

<img width="124" height="124" alt="19791" src="https://github.com/user-attachments/assets/24d1f223-852c-4f6a-868f-bf507ce9528c" />
<img width="124" height="124" alt="19753" src="https://github.com/user-attachments/assets/77e31b7e-9d0a-4408-a189-7dd23e004d1c" />
<img width="124" height="124" alt="19750" src="https://github.com/user-attachments/assets/40d5627d-26da-4f84-ae41-eec668a51391" />
<img width="124" height="124" alt="19873" src="https://github.com/user-attachments/assets/584e17e1-e84d-4d4f-98cd-ffe69c85f452" />
<img width="124" height="124" alt="19754" src="https://github.com/user-attachments/assets/e048681b-222c-43de-8eb6-4678d195bed1" />


Terraforming-Planet is an educational project focused on terrain formation, water retention, and photovoltaic vehicles.  
We combine science with visualization to support land restoration, environmental protection, and energy transition.


 **Try the test image generation at this link**
# 👉 **[Click here and test the image generation model](https://terraformingplanet.terraforming-planet.workers.dev/)**

Below is a screenshot from image generator tests:
<img width="800" height="1460" alt="20080" src="https://github.com/user-attachments/assets/6b974130-beb9-42e3-8582-d1e2d34d81f9" />


---
“AI is not the answer. It’s the tool we use to ask better questions.”
![19015](https://github.com/user-attachments/assets/3fedf0de-4cd0-4a0e-8027-e0040766d161)

“Technology serves best when it teaches before it transforms.” 

![19016](https://github.com/user-attachments/assets/15987542-6909-4c09-817d-4072d132d423)

“Learning planetary engineering through visualization.”

# 🌍 Terraforming Planet — Image Generation Lab

> **Experimental AI image generation laboratory**  
> An educational and engineering project demonstrating how **GPT Image + Codex + Cloudflare Workers**
> can be used to learn terraformating, terrain shaping, and future-oriented technology design.

---

## ✨ Project Idea

**Terraforming Planet** is a hands-on experiment showing the complete process of building
an AI image generator — from concept, through code architecture, to a working web application.

The project does not focus solely on image aesthetics.
Its goal is to **understand processes**:
- planetary terraforming,
- terrain shaping (mountains, valleys, deserts, oceans),
- energy utilization (e.g. photovoltaic machines),
- and using AI as an engineering and educational tool.

---

## 🧠 How was the generator built?

1. **Concept**  
   Terraforming visualization as a learning and analysis tool.

2. **Codex**  
   Iterative design of repository structure and code refinement.

3. **GPT Image API**  
   Generation of realistic images (returned as base64).

4. **Cloudflare Workers**  
   Secure API — the OpenAI key never reaches the frontend.

5. **Vite + Vanilla JS**  
   Lightweight, fast frontend without heavy frameworks.

6. **GitHub Actions**  
   Automated build and deployment.

The repository documents the **entire creation journey**, not just the final result.

---

## 🧱 Repository Structure


/apps
 ├─ web/              → Frontend (Vite + Vanilla JS)
 │   ├─ src/
 │   │   ├─ styles/   → main UI styles
 │   │   └─ assets/   → SVGs, icons, backgrounds
 │   └─ dist/         → production build
 │
 └─ worker/           → Image generation API
     └─ Cloudflare Workers + OpenAI


---

🎨 What does the app offer?

🧪 Image laboratory
✍️ Prompt editor (style, format, size)
🖼️ AI image generation
📋 Prompt copying and result analysis
⚡ Rendering via data_url (no temporary links)


---

🚀 Local Setup

Frontend

cd apps/web
npm install
npm run dev

Address:

http://localhost:5173


---

Worker (Cloudflare)

cd apps/worker
npm install
npx wrangler deploy

In Cloudflare Dashboard → Worker → Settings → Variables
Add Secret:

OPENAI_API_KEY

Tests:

GET  /health
POST /generate

Body:

{
  "prompt": "a solar excavator terraforming desert",
  "size": "1024x1024"
}

> GPT Image models return base64 — the worker maps it to data_url.




---

🌐 Web ↔ Worker Configuration

.env file in apps/web:

VITE_API_BASE=https://your-worker.workers.dev
VITE_WORKER_URL=https://your-worker.workers.dev


---

📦 Deployment (GitHub Pages)

Workflow:

.github/workflows/pages.yml

Automatically:

builds apps/web,

publishes apps/web/dist,

sets environment variables.


Requirements:

1. Correct base in vite.config.js


2. GitHub Pages → Source: GitHub Actions


3. Push to main




---

☁️ Deployment (Cloudflare Pages – optional)

cd apps/web
npm install
npm run build

Settings:

Build command: npm run build

Output: apps/web/dist

Root directory: apps/web



---

🔑 Environment Variables

Variable	Description

OPENAI_API_KEY	API key (worker only)
VITE_API_BASE	Worker API address
VITE_WORKER_URL	Worker URL alias



---

❓ FAQ

I don’t see an image after clicking “Generate”.
Check the worker and VITE_API_BASE.

“Missing OPENAI_API_KEY” error.
Check the Secret in Cloudflare Worker.

The page does not start.
Run npm install in apps/web.


---

🌱 Why this project?

AI as an engineering tool, not magic

Learning through visualization

Real architecture: frontend + worker + API

Ready to fork and extend



---

🤝 Community & OpenAI

Created as part of the Community Dev Challenge
and open for further experimentation.

👉 Online generator:
🔗 https://terraformingplanet.terraforming-planet.workers.dev/


---

Made with ☀️ AI, ⚙️ engineering, and 🌍 future-focused thinking


---

This is ONE FILE.
If anything changes — we edit THIS, not add new ones.


---

The project serves education and the common good.
We encourage collaboration and knowledge sharing.

<h2>Image generation model</h2>Terraforming Planet • Cloudflare Worker
Image Generator (OpenAI)
example screen

<img width="1536" height="1024" alt="19658" src="https://github.com/user-attachments/assets/0fd1baa3-cbf8-4b52-ba76-5d617a1b7b6c"/>

https://github.com/user-attachments/assets/2056e93e-3a26-46dd-bf37-fd376d03bc29

https://github.com/user-attachments/assets/ac951fc0-bcb3-4261-8d82-3ef418f17b65

We create open demos and tools
that turn terraforming ideas into images, concepts, and educational processes.
From valleys and mountain ranges to megastructures — explored through image generators and well-designed prompts.

<br/><!-- Quick navigation -->🌐 Home • 🧪 Demos • 🎯 Mission • 🧠 How generators help learning • 🤝 Collaboration • ⚖️ Responsibility

<br/><img alt="Status" src="https://img.shields.io/badge/status-active-brightgreen" />
<img alt="Goal" src="https://img.shields.io/badge/goal-education%20%26%20prototypes-blue" />
<img alt="Open Source" src="https://img.shields.io/badge/open%20source-community-orange" /></div>
---

🚀 What is this project?

Terraforming-Planet is an organization focused on learning, prototyping, and storytelling around:

terrain formation (mountains, valleys, deltas, basins),

futuristic construction and photovoltaic machines,

planetary-scale engineering — presented visually.


Main idea:
image generators + good prompts = fast exploration of engineering concepts
without building heavy simulations or 3D pipelines.


---

🎯 Mission

We aim to:

Teach how terrain is shaped (geology + engineering thinking),

Prototype landscape-forming machines (e.g. PV excavators, autonomous builders),

Visualize “what-if” scenarios for planets and ecosystems,

Connect people: artists, developers, and engineers working for the common good.


> Why it matters: images simplify complex systems and make them easier to understand, analyze, and develop.




---

🧠 How image generators help learning terraforming

Generative graphics can act as an educational laboratory:

1) Rapid hypothesis testing

Instant variations:

stronger / weaker gravity,

different planetary crust materials,

erosion intensity,

water cycles and river deltas,

construction strategies (terraces, canals, dams).


2) Concept iteration and communication

A single “4-in-1” image can show:

initial state → intervention → intermediate stage → final result
perfect for documentation, learning, and discussion.


3) Designing machines together with the environment

Machines evolve alongside the landscape they create:

PV excavators carving valleys,

autonomous vehicles stabilizing terrain,

modular systems building mountains and flood barriers.


4) Prompt-based scientific thinking

Good prompts enforce:

constraints,

measurable effects,

process stages,

coherent framing and perspective.
---

## 💬 Community Feedback & Comments

This project is open to discussion, ideas, and constructive feedback.

👉 **Leave a comment or start a discussion here:**  
🔗 https://github.com/Terraforming-Planet/Terraforming-Planet/issues

You can:
- ask questions
- share ideas
- report issues
- propose improvements
- discuss scientific or engineering concepts

Every voice helps improve the project 🌍


<details>
<summary><b>Example graphic drawn in GIMP used to train an educational OpenAI AI model (copy)</b></summary>xxx.

![19007](https://github.com/user-attachments/assets/28d6deba-f528-4308-8ec9-332c3dbd22b8)


</details>




