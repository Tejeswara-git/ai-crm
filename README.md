# AI CRM – Healthcare Professional Module

## Overview

This project is an AI-powered CRM system for pharmaceutical sales representatives. It enables users to log doctor interactions, generate AI-powered summaries, schedule follow-ups, and manage interaction history.

---

## Features

### Structured Interaction Form
- Log doctor interactions
- AI-generated summary using Groq LLM

### AI Chat
- Enter interactions in natural language
- Automatically extracts:
  - Doctor
  - Hospital
  - Notes
  - Follow-up
- Generates an AI summary

### Interaction History
- View all logged interactions
- Update interaction notes
- Delete interactions

### Follow-up Scheduler
- Schedule future doctor visits
- View upcoming follow-ups

### AI Insights
- Generate recommendations for the next meeting based on previous interactions

---

## Tech Stack

### Frontend
- React
- Redux Toolkit
- Axios
- Vite

### Backend
- FastAPI
- LangGraph
- Groq API
- SQLAlchemy
- SQLite

---

## Project Structure

```
AI-CRM
├── Backend
└── Frontend
```

---

## Installation

### Backend

```bash
cd Backend

python -m venv venv

# Windows
.\venv\Scripts\Activate.ps1

pip install -r requirements.txt

uvicorn main:app --reload
```

---

### Frontend

```bash
cd Frontend/AI-crm-react

npm install

npm run dev
```

---

## Environment Variables

Backend (.env)

```
GROQ_API_KEY=your_groq_api_key
```

Frontend (.env)

```
VITE_API_URL=http://127.0.0.1:8000
```

For deployment:

```
VITE_API_URL=https://your-render-url.onrender.com
```

---

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /log-interaction | Log interaction |
| POST | /chat | AI chat extraction |
| GET | /history | View interactions |
| PUT | /edit-interaction | Update interaction |
| DELETE | /delete/{id} | Delete interaction |
| POST | /followup | Schedule follow-up |
| GET | /followups | View follow-ups |
| GET | /insights | Generate AI insights |

---

## Deployment

Frontend: Vercel

Backend: Render

---

## Author

Tejeswara Rao
