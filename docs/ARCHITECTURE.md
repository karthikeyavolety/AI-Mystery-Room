# Architecture

The repository is a two-workspace JavaScript monorepo. `client/` owns presentation, routing, and API calls. `server/` owns session authentication, persistence, authorization, generation, progress, accusation evaluation, and solution reveal.

Every API route uses `/api/v1`. Express controllers validate request bodies and scope mystery access to the authenticated owner. Mongoose models persist users, cases, and generation jobs. The `canonicalSolution` field is excluded from normal queries and explicitly selected only by accusation and solution services.

Generation is started asynchronously after the job and case are persisted. The current implementation uses an in-process task; production deployments should replace this with a durable queue so work survives process restarts and can be concurrency limited.
