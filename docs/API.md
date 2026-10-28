# API overview

Success responses use `{ "success": true, "data": ..., "message": ... }`. Errors use `{ "success": false, "error": { "code": ..., "message": ..., "details": [] } }`.

Routes include authentication (`/auth/register`, `/auth/login`, `/auth/logout`, `/auth/me`), case creation and listing (`/mysteries`), case details and deletion, generation status (`/generation-jobs/:id`), evidence and suspects, timeline, progress, accusations, solution reveal, and `/health`. Private routes require the MongoDB-backed session cookie. Refer to `spec.md` for the full contract.
