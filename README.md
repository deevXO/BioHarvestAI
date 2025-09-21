# 🌾 BoHarvest AI

**AI-Powered Precision Harvesting: Smart, Efficient, Sustainable.**

---

## 📑 Table of Contents

1. [Introduction](#-introduction)  
2. [Features](#-features)  
3. [Architecture Overview](#-architecture-overview)  
4. [Getting Started](#-getting-started)  
   - [Prerequisites](#41-prerequisites)  
   - [Installation](#42-installation)  
   - [Configuration](#43-configuration)  
   - [Running the Application](#44-running-the-application)  
5. [Usage](#-usage)  
6. [Related Projects](#-related-projects)  
7. [Technologies Used](#-technologies-used)  
8. [Contributing](#-contributing)  
9. [License](#-license)  
10. [Contact](#-contact)  

---

## 🚀 Introduction

**BoHarvest AI** is an advanced Artificial Intelligence system designed to revolutionize agricultural harvesting. It leverages **computer vision, machine learning, and sensor fusion** to provide:

- Precision harvesting guidance  
- Real-time yield prediction  
- Optimized resource management  

Our mission is simple: **increase harvest efficiency, reduce crop waste, and empower farmers with data-driven insights** for a more sustainable and productive future.

This repository contains the **main frontend application** and orchestration logic for BoHarvest AI.  
👉 The **core AI backend services** are maintained in a [separate repository](#-related-projects).

![Dashboard Preview](assets/boharvest_dashboard.png)

---

## ✨ Features

- 🌱 **Intelligent Crop Monitoring** – Automated crop health, ripeness, and density detection.  
- 🛠️ **Precision Harvest Guidance** – Optimized paths for manual or robotic harvesting.  
- 📊 **Real-time Yield Prediction** – Forecast harvest volumes with environmental awareness.  
- ⚡ **Resource Optimization** – Efficient allocation of labor, machinery, and time.  
- 📈 **Intuitive Web Dashboard** – Monitor progress, view analytics, and adjust parameters.  
- 🔗 **Scalable Architecture** – Works with different farm sizes and crop types.  

---

## 🏗 Architecture Overview

BoHarvest AI follows a **modular, distributed architecture** with three core layers:

1. **Frontend (This Repository):**  
   Interactive web dashboard + client-side logic.  
   
2. **Backend AI & Services (Separate Repository):**  
   Python-based server hosting AI models (CV, yield prediction), APIs, and data processing.  

3. **Edge Devices/Sensors (Optional):**  
   Drones, sensors, or robotic harvesters feeding real-time data to the backend.  

![System Architecture](assets/architecture_diagram.png)

---

## ⚙️ Getting Started

Follow these steps to set up the **frontend application** locally.

### 4.1 Prerequisites

- [Node.js](https://nodejs.org/) (LTS v18.x or v20.x recommended)  
- npm (comes with Node.js) or yarn  
- Git  
- Running **BoHarvest AI Backend** services ([see here](#-related-projects))  

### 4.2 Installation

```bash
# Clone the repository
git clone https://github.com/deevXO/boharvest-ai-frontend.git
cd boharvest-ai-frontend

# Install dependencies
npm install
# or
yarn install
````

### 4.3 Configuration

Create a `.env.local` file in the root directory:

```env
# .env.local
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:8000/api
# Or deployed backend URL, e.g.:
# NEXT_PUBLIC_BACKEND_API_URL=https://api.boharvest.ai/api
```

### 4.4 Running the Application

```bash
# Start the dev server
npm run dev
# or
yarn dev
```

Open: **[http://localhost:3000](http://localhost:3000)**

---

## 📊 Usage

Once running, you can:

* **Monitor Fields:** View real-time data on crop health, ripeness, and yield.
* **Harvest Recommendations:** Get AI-driven harvesting time & route suggestions.
* **Predict Yields:** Access forecasts for better planning.
* **Review Analytics:** Analyze historical and real-time performance data.

---

## 🔗 Related Projects

* **BoHarvest AI Backend**
  Repo: [deevXO/boharvest-ai-backend](https://github.com/deevXO/boharvest-ai-backend)

  * Core Python-based AI models (CV, ML, prediction).
  * FastAPI endpoints for frontend communication.
  * Setup instructions in its README.

---

## 🛠 Technologies Used

### Frontend

* [Next.js](https://nextjs.org/) (React Framework)
* [React.js](https://react.dev/)
* [TypeScript](https://www.typescriptlang.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Chart.js](https://www.chartjs.org/) / [D3.js](https://d3js.org/)

### Backend (separate project)

* [Python](https://www.python.org/)
* [FastAPI](https://fastapi.tiangolo.com/)
* [PyTorch](https://pytorch.org/) / [TensorFlow](https://www.tensorflow.org/)
* [OpenCV](https://opencv.org/)

### Deployment

* [Vercel](https://vercel.com/) (frontend hosting)
* Docker / Kubernetes (backend orchestration, optional Modal.com)

---

## 🤝 Contributing

We welcome contributions! 🚀

* Frontend contributions → See `CONTRIBUTING.md` in this repo.
* Backend contributions → See `CONTRIBUTING.md` in [boharvest-ai-backend](https://github.com/deevXO/boharvest-ai-backend).

Please follow our coding standards and commit guidelines.

---

## 📜 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---

## 📬 Contact

* **Name:** Deevanshu Kapoor
* **Email:** [deevanshukapoor010206@gmail.com](mailto:deevanshukapoor010206@gmail.com)
* **GitHub:** [@deevXO](https://github.com/deevXO)
* **Project Org/User:** [github.com/deevXO](https://github.com/deevXO)

---
