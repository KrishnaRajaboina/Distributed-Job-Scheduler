# 🚀 Distributed Job Scheduler

![Node.js](https://img.shields.io/badge/Node.js-20.x-green)
![Express.js](https://img.shields.io/badge/Express.js-Backend-black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)
![Swagger](https://img.shields.io/badge/Swagger-OpenAPI-success)

A production-inspired **Distributed Job Scheduler** built using **Node.js, Express.js, PostgreSQL, and Prisma ORM**. The application efficiently manages background jobs using multiple workers while supporting queue management, scheduling, retries, monitoring, authentication, and execution history.

---

# 📖 Table of Contents

- Project Overview
- Features
- Technology Stack
- System Architecture
- Project Structure
- Installation
- Environment Variables
- Database Setup
- Running the Application
- API Documentation
- Authentication
- API Endpoints
- Job Lifecycle
- Implemented Features
- Screenshots
- Future Enhancements
- License
- Author

---

# 📌 Project Overview

The Distributed Job Scheduler is designed to execute asynchronous background jobs reliably across multiple workers.

The scheduler supports:

- Immediate Jobs
- Delayed Jobs
- Scheduled Jobs
- Cron Jobs
- Batch Jobs

The system demonstrates production-inspired concepts including:

- Background Job Processing
- Queue Management
- Distributed Worker Architecture
- Retry Mechanisms
- Dead Letter Queue
- Job Scheduling
- Worker Monitoring
- Execution Logs
- Metrics Dashboard
- Secure REST APIs

---

# ✨ Features

## 🔐 Authentication

- JWT Authentication
- User Registration
- User Login
- Protected REST APIs

---

## 🏢 Organization Management

- Create Organization
- View Organizations
- Update Organization
- Delete Organization

---

## 📁 Project Management

- Create Project
- View Projects
- Update Project
- Delete Project

---

## 📦 Queue Management

- Create Queue
- Queue Priority
- Queue Concurrency
- Pause Queue
- Resume Queue
- Queue Statistics

---

## ⚙️ Job Management

Supports

- Immediate Jobs
- Delayed Jobs
- Scheduled Jobs
- Cron Jobs
- Batch Jobs

Each Job Supports

- Retry Count
- Retry Delay
- Retry Strategy
- Queue Assignment
- Execution History

---

## 🔁 Retry Strategies

### Fixed Delay

```
Retry 1 → 5 sec
Retry 2 → 5 sec
Retry 3 → 5 sec
```

### Linear Backoff

```
Retry 1 → 5 sec
Retry 2 → 10 sec
Retry 3 → 15 sec
```

### Exponential Backoff

```
Retry 1 → 5 sec
Retry 2 → 10 sec
Retry 3 → 20 sec
```

---

## ❌ Dead Letter Queue

Jobs exceeding the maximum retry count are automatically moved to the Dead Letter Queue for later inspection.

---

## 👷 Worker Management

Supports

- Worker Registration
- Heartbeats
- Graceful Shutdown
- Atomic Job Claiming

Worker States

- IDLE
- ACTIVE
- SHUTTING_DOWN

---

## 📊 Monitoring

- Execution History
- Job Logs
- Metrics API
- Queue Statistics
- Worker Monitoring

---

# 🛠 Technology Stack

## Backend

- Node.js
- Express.js

## Database

- PostgreSQL

## ORM

- Prisma ORM

## Authentication

- JWT

## Documentation

- Swagger (OpenAPI 3)

---

# 🏗 System Architecture

```
                  Client

                     │

                     ▼

           Express REST API

                     │

      ┌──────────────┼───────────────┐

      ▼              ▼               ▼

 Authentication   Dispatcher     Scheduler

                     │

              Worker Pool

        Worker-1 Worker-2 Worker-3

                     │

                     ▼

             PostgreSQL Database
```

---

# 📂 Project Structure

```
distributed-job-scheduler/

├── config/
├── controllers/
├── middlewares/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── routes/
├── services/
├── utils/
├── app.js
├── server.js
├── package.json
├── .env
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/<your-username>/distributed-job-scheduler.git

cd distributed-job-scheduler
```

---

## Install Dependencies

```bash
npm install
```

---

# 🔐 Environment Variables

Create a `.env` file.

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/job_scheduler"

JWT_SECRET=your_secret_key

PORT=5000
```

---

# 🗄 Database Setup

Generate Prisma Client

```bash
npx prisma generate
```

Run Database Migration

```bash
npx prisma migrate dev
```

Open Prisma Studio

```bash
npx prisma studio
```

---

# ▶️ Running the Application

Development

```bash
npm run dev
```

Production

```bash
npm start
```

Server URL

```
http://localhost:5000
```

---

# 📖 API Documentation

Swagger Documentation

```
http://localhost:5000/api-docs
```

---

# 🔐 Authentication

Login

```
POST /api/auth/login
```

Use the JWT token

```
Authorization

Bearer YOUR_TOKEN
```

---

# 📌 Main API Endpoints

## Authentication

```
POST /api/auth/register
POST /api/auth/login
```

---

## Organizations

```
POST /api/organizations
GET  /api/organizations
PUT  /api/organizations/:id
DELETE /api/organizations/:id
```

---

## Projects

```
POST /api/projects
GET  /api/projects
PUT  /api/projects/:id
DELETE /api/projects/:id
```

---

## Queues

```
POST /api/queues
GET  /api/queues
PUT  /api/queues/:id
DELETE /api/queues/:id
```

---

## Jobs

```
POST /api/jobs
GET  /api/jobs
PUT  /api/jobs/:id
DELETE /api/jobs/:id
```

---

## Workers

```
POST /api/workers
GET  /api/workers
PUT  /api/workers/:id/status
PUT  /api/workers/:id/heartbeat
PUT  /api/workers/:id/shutdown
```

---

## Scheduled Jobs

```
POST /api/scheduled-jobs
GET  /api/scheduled-jobs
```

---

## Cron Jobs

```
POST /api/cron-jobs
GET  /api/cron-jobs
```

---

## Batch Jobs

```
POST /api/batches
GET  /api/batches/:id/progress
```

---

## Metrics

```
GET /api/metrics
```

---

# 📈 Job Lifecycle

Successful Execution

```
Pending
   │
   ▼
Running
   │
   ▼
Completed
```

Retry Flow

```
Pending
   │
   ▼
Running
   │
   ▼
Retry
   │
   ▼
Pending
```

Maximum Retry Reached

```
Pending
   │
   ▼
Running
   │
   ▼
Failed
   │
   ▼
Dead Letter Queue
```

---

# 📊 Implemented Features

- ✅ JWT Authentication
- ✅ Organization Management
- ✅ Project Management
- ✅ Queue Management
- ✅ Queue Priority
- ✅ Queue Concurrency
- ✅ Queue Pause / Resume
- ✅ Worker Registration
- ✅ Heartbeats
- ✅ Graceful Shutdown
- ✅ Atomic Job Claiming
- ✅ Immediate Jobs
- ✅ Delayed Jobs
- ✅ Scheduled Jobs
- ✅ Cron Jobs
- ✅ Batch Jobs
- ✅ Fixed Retry
- ✅ Linear Retry
- ✅ Exponential Retry
- ✅ Dead Letter Queue
- ✅ Execution Logs
- ✅ Metrics API
- ✅ Pagination
- ✅ Filtering
- ✅ Swagger Documentation

---

# 📸 Screenshots

## Swagger Documentation

> Add a screenshot of `/api-docs` here.

---

## Prisma Studio

> Add a screenshot of Prisma Studio here.

---

## PostgreSQL Database

> Add a screenshot of your PostgreSQL tables here.

---

# 🚀 Future Enhancements

- Workflow Dependencies
- Distributed Locking
- Queue Sharding
- Rate Limiting
- WebSocket Dashboard
- Role-Based Access Control (RBAC)
- AI-based Failure Analysis

---

# 📄 License

This project was developed as part of a Backend Internship Assignment for educational purposes.

---

# 👨‍💻 Author

**KRISHNA RAJABOINA**

Backend Internship Assignment

Distributed Job Scheduler

2026