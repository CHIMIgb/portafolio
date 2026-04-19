# ROMs Vault 🎮 - Backend Architecture & Infrastructure

[![Docker](https://img.shields.io/badge/Docker-Enabled-blue?logo=docker)](https://www.docker.com/) [![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-316192?logo=postgresql)](https://www.postgresql.org/) [![PHP](https://img.shields.io/badge/Backend-PHP-777BB4?logo=php)](https://php.net/) [![Google Drive API](https://img.shields.io/badge/Integration-Google_Drive_API-1FA463?logo=googledrive)](https://developers.google.com/drive)

**ROMs Vault** is a comprehensive web platform designed to discover, download, and execute retro games directly within the browser without requiring local installations. 

While the frontend utilizes EmulatorJS for client-side rendering, **this repository heavily demonstrates backend engineering, API integration, and cloud storage streaming.**

## ⚙️ Core Architecture & Backend Highlights

As a Backend-focused engineer, the true complexity of this application resides under the hood:

### 1. Cloud-Streaming Architecture (Google Drive API)
Hosting full ISOs (PS1, PSP, N64) locally on a web server is expensive and inefficient. To solve this, I designed a backend service that hooks directly into the **Google Drive API**. The backend proxies authentication and streams large `.iso` and `.rom` blobs directly into the client's EmulatorJS instance in chunks, bypassing server bandwidth constraints.

### 2. Relational Database Design (PostgreSQL)
The application utilizes a highly structured **PostgreSQL** relational database to manage:
- Game metadata (Title, Console, Year, Cover hashes).
- User authentication logs.
- Save-State synchronization (allowing users to save their emulator state in the cloud via serialized BLOBs and resume on another machine).

### 3. Containerization (Docker)
The entire backend stack is containerized using **Docker** (`docker-compose`). This ensures that the PHP backend, the PostgreSQL instance, and the web server dependencies are identical across development, staging, and production environments, eliminating the *“it works on my machine”* problem.

### 4. RESTful API Endpoints
Built using modern **PHP**, the backend exposes a clean API separating data from presentation. 
- `GET /api/v1/games?console=N64` -> Retrieves dynamically filtered games.
- `POST /api/v1/save-state` -> Securely handles encoded EmulatorJS state payloads.

## 🛠️ Tech Stack
- **Backend Core**: PHP (REST Architecture)
- **Database**: PostgreSQL (Structured Relational Storage)
- **Infrastructure**: Docker & Docker Compose
- **Integrations**: Google Drive SDK / API (Data Streaming)
- **Frontend Layer**: JavaScript, CSS, EmulatorJS

## 🚀 Getting Started (Backend Devs)

To spin up the isolated backend environment:

```bash
# 1. Clone the repository
git clone https://github.com/CHIMIgb/ROMs-Vault.git

# 2. Setup your .env file
cp .env.example .env
# Important: Add your GOOGLE_DRIVE_API_KEY and DB_CREDENTIALS

# 3. Spin up the instances via Docker
docker-compose up -d --build

# 4. Run migrations
docker exec -it romsvault-php php run_migrations.php
```

> **Architecture Note:** This API is built to be completely decoupled. The current HTML/JS frontend could be entirely replaced with a React/Next.js client or a Desktop App without changing a single line of the PHP backend logic.
