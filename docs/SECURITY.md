# Security notes

- Browser sessions use an HTTP-only, same-site cookie; production cookies are secure-only.
- Passwords are hashed with bcrypt. Password hashes are excluded from regular user queries.
- Mystery access is scoped by both authenticated user ID and case ID.
- The canonical solution is excluded from normal mystery reads and only revealed after completion.
- Gemini credentials remain server-side. Provider errors and stack traces are not returned to clients.
- Requests are size-limited, validated, and rate-limited.

For production, set a strong session secret, serve only over HTTPS, configure exact allowed origins, and add CSRF protection if the deployment's browser/session topology requires it.
