# BioHarvest AI

**Generative AI for Climate-Resilient Crops: Design, Predict, Impact.**

---

## Table of Contents

- 1. [Introduction](#1-introduction)
- 2. [Vision & Problem Solved](#2-vision--problem-solved)
- 3. [Features](#3-features)
- 4. [Architecture Overview](#4-architecture-overview)
- 5. [Getting Started (Frontend)](#5-getting-started-frontend)  
  - 5.1 [Prerequisites](#51-prerequisites)  
  - 5.2 [Installation](#52-installation)  
  - 5.3 [Configuration](#53-configuration)  
  - 5.4 [Running the Application](#54-running-the-application)  
- 6. [Usage](#6-usage)
- 7. [Related Projects (Backend)](#7-related-projects-backend)
- 8. [Technologies Used](#8-technologies-used)
- 9. [Contributing](#9-contributing)
- 10. [License](#10-license)
- 11. [Contact](#11-contact)
- 12. [Team](#12-team)

---

## 1. Introduction

BioHarvest AI is a groundbreaking Generative AI platform designed to revolutionize sustainable agriculture. We empower plant scientists and breeders to combat climate change by accelerating the creation of resilient and resource-efficient crop varieties.

This repository contains the **main frontend application and orchestration logic** for BioHarvest AI.  
The core AI processing and backend services are hosted in a separate repository.

---

## 2. Vision & Problem Solved

**Our Vision:**  
To be the world's leading Generative AI Platform for Sustainable Crop Design, transforming traditional agriculture into a rapid, proactive, and scientifically guided engineering discipline.

**Problems BioHarvest AI Solves:**

1. **Climate Crisis Impact:** Rapid climate shifts (droughts, floods, heat, new pests) devastate global crop yields, leading to food insecurity and environmental degradation.  
2. **Slow Adaptation:** Traditional crop breeding takes 10–15+ years, critically insufficient for rapid climate adaptation.  
3. **Fragmented Genetic Design:** Existing tools are disconnected, relying on guesswork rather than integrated, AI-driven solutions for proactive mutation design and validation.  

BioHarvest AI addresses these by providing an integrated, AI-driven solution that accelerates genetic adaptation, ensuring stable food supplies and a healthier environment for all.

📌 *Caption:* BioHarvest AI's integrated **'Gene-to-Lab' workflow**:  
**Discover → Design → Predict → Validate → Plan Experiment**

---

## 3. Features

- **Generative Mutation Optimization:** AI proactively designs novel, optimal genetic mutations for specific climate-resilience traits.  
- **Holistic Multi-Trait Impact Analysis:** Predicts complex effects and crucial trade-offs across multiple sustainability metrics (e.g., drought tolerance, water use efficiency, carbon sequestration).  
- **Cognitive Explanation (XAI Core):** Provides mechanistic reasoning for AI predictions, linked to scientific principles and literature for enhanced trust.  
- **Interactive Bio-Visualizers:** Real-time sequence highlighting, dynamic 3D protein structure visualization, and pathway mapping.  
- **Cross-Species Transfer Predictor:** Estimates the likelihood of beneficial mutations being effective in other crop species.  
- **(Future) In-Silico Lab Assistant:** AI-guided CRISPR design, automated experimental protocols, and resource optimization.  
- **Intuitive "Cognitive Bio-Interface":** A user-friendly web dashboard for seamless interaction with complex genetic data and AI.  

---

## 4. Architecture Overview

BioHarvest AI operates on a **modular, distributed architecture**. This repository primarily houses the **Frontend/Client-side application**.

**System Components:**

1. **Frontend (This Repository):** Interactive web dashboard and client-side logic built with Next.js, React, TypeScript.  
2. **Backend AI & Services (Separate Repo):** Python-based FastAPI server hosting core AI models (LLMs), processing genetic data, and providing API endpoints.  
3. **External Data Sources (Optional):** Public biological databases (UniProt, NCBI, PDB) and potentially real-time sensor data (future scope).  

📌 *Caption:* High-level overview of BioHarvest AI's **distributed architecture**, powered by **LLMs + GPU compute**.

---

## 5. Getting Started (Frontend)

These instructions will help you set up and run the **BioHarvest AI frontend** on your local machine.  
You must also have the **backend services running** (see BioHarvest AI Backend repo).

### 5.1 Prerequisites

- Node.js (LTS: 18.x or 20.x)  
- npm (comes with Node.js) or yarn  
- Git  
- Running BioHarvest AI Backend services  

### 5.2 Installation

```bash
# Clone the repository
git clone https://github.com/deevXO/BioHarvestAI.git
cd BioHarvestAI

# Install dependencies
npm install
# or
yarn install
````

### 5.3 Configuration

The frontend needs to know where your backend services are running.

1. Create a `.env.local` file in the root directory:

```bash
# .env.local
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:8000/api
# Or your deployed backend URL, e.g. https://api.bioharvest.ai/api
```

Make sure `NEXT_PUBLIC_BACKEND_API_URL` points to the backend service.

### 5.4 Running the Application

```bash
# Start the frontend dev server
npm run dev
# or
yarn dev
```

Then open: **[http://localhost:3000](http://localhost:3000)**

---

## 6. Usage

Once connected to the backend, you can:

* 🔍 **Explore Crop Genes:** Search and filter a gene library for climate resilience.
* 🧬 **Design Mutations:** Input or auto-generate optimal mutation candidates.
* 📊 **Predict Impact:** Get AI-powered predictions across sustainability traits.
* 📖 **Validate Insights:** Review mechanistic explanations, compare variants, assess cross-species transferability.
* 🧪 **(Future) Plan Experiments:** Generate AI-guided CRISPR designs and experimental protocols.

---

## 7. Related Projects (Backend)

This project relies on the **BioHarvest AI Backend**:

* **Repository:** [BioHarvest AI Backend](https://github.com/deevXO/bioharvest-ai-backend)
* **Description:** Python-based AI processing logic (Protein LLMs, FastAPI endpoints, GPU deployment).
* **Setup:** See backend README for instructions.

---

## 8. Technologies Used

### Frontend

* Next.js, React, TypeScript
* Tailwind CSS, Shadcn UI
* D3.js / Recharts (data visualizations)
* Zustand, React Query

### Backend (separate repo)

* Python, FastAPI
* PyTorch / TensorFlow (LLM inference)
* Biopython (sequence handling)

### AI Models

* ESM-2 / Evo2 (Protein LLMs)

### Deployment

* **Frontend:** Vercel
* **Backend:** Modal.com (NVIDIA H100/A100 GPUs)

### Tools

* Git

---

## 9. Contributing

We welcome contributions!

* **Frontend contributions:** See `CONTRIBUTING.md` in this repo.
* **Backend contributions:** See `CONTRIBUTING.md` in the backend repo.

Follow our coding standards and commit guidelines.

---

## 10. License

This project is licensed under the **MIT License** – see the [LICENSE](./LICENSE) file.

---

## 11. Contact

📩 **Deevanshu Kapoor**

* Email: [deevanshukapoor010206@gmail.com](mailto:deevanshukapoor010206@gmail.com)
* GitHub: [@deevXO](https://github.com/deevXO)
* Org/User: [deevXO GitHub](https://github.com/deevXO)

---

## 12. Team

* **Siya Chopra** – Team Lead
* **Deevanshu Kapoor** – Frontend Engineer
* **Mihika** – AI/Backend Architect
* **Manas Arora** – Bioinformatics & Data Strategist
* **Suhail Khan** – Project Coordinator

---

## Final Checklist

* ✅ Repo name: `deevXO/BioHarvestAI`
* ✅ Backend repo: `deevXO/bioharvest-ai-backend`
* ✅ Add assets:

  * `assets/bioharvest_workflow.png`
  * `assets/architecture_diagram.png`
  * `assets/bioharvest_dashboard.png` (screenshot recommended)
* ✅ LICENSE file included

🚀 **This README is now polished, repo-ready, and presentation-grade.**
