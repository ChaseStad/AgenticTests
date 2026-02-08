# This is the only handwritten line in this, I was just testing the chatgpt free agentic AI

# React + Django Todo List

This repo contains a Django REST API backend and a React frontend for a full to-do list experience.

## Backend (Django)

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

The API is available at `http://localhost:8000/api/todos/`.

## Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

The React app runs at `http://localhost:5173` and proxies API calls to the backend during development.

## Optional environment configuration

You can set `VITE_API_URL` to point the frontend at a different API host.
