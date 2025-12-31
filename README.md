# Pastebin‑Lite

A small Pastebin‑like web application where users can create text pastes and share a link to view them.
Pastes can optionally expire based on time (TTL) or number of views.

This project was built as a take‑home assignment.

---

## Features

- Create a paste with arbitrary text
- Get a shareable URL to view the paste
- Optional time‑based expiry (TTL)
- Optional maximum view count
- Pastes become unavailable (404) once constraints are triggered
- Serverless‑safe persistence

---

## Tech Stack

- Next.js (Pages Router)
- Node.js
- Vercel KV (Redis) for persistence
- Deployed on Vercel

---

## API Routes

### Health Check
