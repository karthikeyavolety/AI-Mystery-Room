# Data model

## User

Email is unique and normalized to lowercase. Password hashes use bcrypt and are excluded from normal queries. The session stores only the authenticated user ID.

## Mystery

Each mystery is scoped to one owner and stores its public case, suspect profiles, timeline, evidence, progress, status, and completion state. The canonical solution is a separate `select: false` field and must be explicitly requested by the accusation/reveal paths. Suspect and evidence IDs are stable strings so generated references remain stable across persistence and client requests.

## Generation job

Jobs record their owner, mystery, lifecycle stage, progress, safe user-facing failure message, and timestamps. The current job runner is in-process; production should move this work to a durable queue and add concurrency and retry policies.
