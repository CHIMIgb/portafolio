# Desarrollo Urbano 3D 🏙️ - Backend & Spatial Data Architecture

[![Docker](https://img.shields.io/badge/Docker-Enabled-blue?logo=docker)](https://www.docker.com/) [![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL/PostGIS-316192?logo=postgresql)](https://www.postgresql.org/) [![Node.js](https://img.shields.io/badge/Backend-Node.js/Express-339933?logo=nodedotjs)](https://nodejs.org/) [![CI/CD](https://img.shields.io/badge/Infrastructure-CI/CD-FF4F8B?logo=githubactions)](#)

**Desarrollo Urbano** is an interactive urban planning platform that visualizes city data and lot management in a dynamic 3D environment. 

While the frontend employs MapLibre GL for its impressive 3D spatial rendering, **this repository showcases an advanced Backend architecture designed to handle complex geospatial data, continuous integration, and containerized deployments.**

## ⚙️ Core Architecture & Backend Highlights

This platform is powered by a robust, secure, and highly scalable backend infrastructure:

### 1. Geospatial Database Architecture (PostGIS / PostgreSQL)
Standard relational data isn't enough for mapping city lots. The database leverages **PostGIS** within PostgreSQL (via Supabase) to query, index, and calculate spatial metrics mathematically. 
- *Dynamic Geometric Calculations:* The backend computes total areas, bounding boxes, and adjacency relationships directly via SQL queries, heavily optimizing the frontend performance.

### 2. Node.js & Express REST API
A fully decoupled backend system built on Node.js and Express. It follows a strict MVC (Model-View-Controller) pattern, ensuring clean separation of concerns.
- **Middleware:** Robust JWT authentication, input validation, and coordinate-bounds checking.
- **Services:** Dedicated geospatial manipulation services that format complex Polygons and MultiPolygons into clean GeoJSON responses.

### 3. CI/CD & Automated Deployments
To ensure production stability, the repository is equipped with a **Continuous Integration and Continuous Deployment (CI/CD)** pipeline.
- Automated testing triggers on every `Push` to `main`.
- Successful builds are automatically containerized and deployed to cloud instances, reducing manual deployment errors to zero.

### 4. Dockerization
The entire stack is containerized. This allows developers to spin up the Node.js API, the Postgres/PostGIS spatial database, and pgAdmin locally with a single `docker-compose up` command, matching the exact server environment.

## 🛠️ Tech Stack
- **Backend Framework**: Node.js & Express
- **Spatial Database**: PostgreSQL + PostGIS (Supabase)
- **Infrastructure**: Docker, GitHub Actions (CI/CD)
- **Frontend Layer**: MapLibre GL, JavaScript, HTML5 Canvas

## 🚀 Getting Started (Backend Initialization)

To run the spatial API locally:

```bash
# 1. Clone the repository
git clone https://github.com/CHIMIgb/Desarrollo-Urbano.git

# 2. Setup your .env file
cp .env.example .env
# Important: Ensure your DATABASE_URL points to a PostGIS enabled instance.

# 3. Spin up the instances via Docker
docker-compose up -d --build

# 4. Access the API
# The backend will be available at http://localhost:5000/api/v1/...
```

> **Architecture Note:** The backend is designed as an agnostic RESTful service. The 3D MapLibre frontend is completely separated, demonstrating my ability to build modular APIs that can be consumed by multiple distinct client applications (Web, Mobile, GIS Software) seamlessly.
