# nodejs-hw

Express server for working with a notes collection (homework 01-express).

## Scripts

- `npm run dev` — start the server with nodemon
- `npm start` — start the server

## Environment variables

Create a `.env` file in the project root:

```
PORT=3000
```

## Routes

| Method | Route            | Description              |
| ------ | ---------------- | ------------------------ |
| GET    | `/notes`         | Get all notes (stub)     |
| GET    | `/notes/:noteId` | Get one note by ID (stub) |
| GET    | `/test-error`    | Simulate a 500 error     |
