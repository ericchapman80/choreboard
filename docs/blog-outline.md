# 🛠️ Choreboard Blog Series

> *AI-assisted, family-empowering, chore-gamifying magic — brought to life with Google Sheets, React, and DAKboard.*

---

## 🚀 Project Overview

Choreboard is an open-source, AI-assisted, gamified family chore dashboard built by [Eric Chapman](https://github.com/ericchapman80) with help from ChatGPT. It combines the simplicity of Google Sheets with a custom React frontend, DAKboard visualization, and smart automation via Apps Script.

> “We used ChatGPT to co-design every piece of this — from scripts and sheet logic to GitHub issues, dashboards, and user flows.”

---

## 🧩 What It Solves

Choreboard tackles a common household pain: tracking chores, motivating kids, and keeping parents sane. It introduces:

* Required & bounty chores with earnings and points
* Approval workflow for completed tasks
* A weekly summary dashboard
* Google Form-based interaction (early phase)
* Visual reward charts via DAKboard
* Google login (coming soon in React frontend)

---

## 🧠 AI Assistance

ChatGPT served as the co-architect and pair programmer across all phases:

* 🧱 Sheet design and tab structure
* 📜 Auto-generating recurring tasks
* 🔧 Apps Script automation
* 💬 GitHub issues with labels and definitions of done
* 📈 Pivot dashboards and Form processing logic
* 📦 Markdown docs, README, and roadmap

---

## 🔨 Development Timeline (Live Updates)

* ✅ Phase 1: Google Sheets + Apps Script backend
* ✅ Phase 2: GitHub issues, roadmap, and documentation
* 🔄 Phase 3: React frontend scaffolding
* 🧪 Phase 3.1: Add Jest and sample unit tests for React components
* 🔜 Phase 4: GitHub Actions CI to run tests on every build
* 🔜 Phase 5: Google Auth + live dashboard
* 🔜 Phase 6: DAKboard-ready display layouts

---

## ✍️ Blog Series (Coming Soon)

This will be a multipart series walking through:

1. **The Problem** – what inspired Choreboard?
2. **AI Collaboration** – building with ChatGPT as a pair dev
3. **Tech Stack Deep Dive** – how it all fits together
4. **Going Live** – real-world DAKboard display
5. **What’s Next** – roadmap and wishlist features

> Want to follow along? 🌟 Star the repo and [join the journey](https://github.com/ericchapman80/choreboard)!

---

## 🤝 Contributors

* **Eric Chapman** – project creator, full-stack engineer, parent of three, chore innovator
* **ChatGPT** – AI assistant and co-developer, code and docs support

---

## 💡 Inspiration

* “Let’s make chores visual, motivational, and rewarding — not a fight.”
* “If devs use dashboards and automations to ship software… why not to manage home life?”

---

## 📌 Repo

[https://github.com/ericchapman80/choreboard](https://github.com/ericchapman80/choreboard)

# Blog Series Outline

1. The Vision
2. Sheets & Forms
3. Apps Script
4. React Frontend
5. Launch + Lessons
6. **World-Class Bi-Directional Task/Issue Sync for AI-Driven Projects**
   - Why a single source of truth (`issues.txt`) supercharges both AI and human workflows
   - YAML/Markdown task format with unique IDs for safe round-trip sync
   - Shell scripts for push (repo → GitHub Issues) and pull (GitHub Issues → repo)
   - GitHub Actions for nightly and event-based automation
   - Auto-generating human-friendly `TASKS.md` from `issues.txt`
   - Example `issues.txt` entry:
     ```yaml
     id: chore-001
     title: chore: Auto-create Choreboard Google Sheet (Apps Script)
     labels: [chore, automation]
     state: open
     body: |
       Automate the creation of the Choreboard Google Sheet...
     ---
     ```
   - Example shell snippet to push issues:
     ```bash
     #!/bin/bash
     for f in issue_*.yml; do
       id=$(grep '^id:' "$f" | cut -d' ' -f2)
       title=$(grep '^title:' "$f" | cut -d' ' -f2-)
       body=$(awk '/^body: \|/{flag=1;next}/^---/{flag=0}flag' "$f")
       labels=$(grep '^labels:' "$f" | sed 's/labels: //')
       gh issue create --title "$title" --body "$body" --label "$labels"
     done
     ```
   - Best practices for conflict resolution, contributor workflow, and AI tool compatibility
   - How this system enables AI agents and humans to collaborate on open source at scale