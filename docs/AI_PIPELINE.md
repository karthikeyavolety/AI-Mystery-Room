# AI generation pipeline

The server sends the scenario and bounded generation options to the configured Gemini model. Gemini must return JSON. Zod validates the required case, suspect, timeline, evidence, and solution shape. Deterministic checks verify that the culprit exists, every referenced suspect exists, and all decisive evidence IDs point to generated evidence. The case is marked `READY` only after these checks pass.

Generation failures leave the case unplayable and persist a safe status message. API keys and provider response details are never returned to the browser. The canonical solution is written to the server-only field and does not appear in standard case responses.

The initial version performs structure and reference checks; comprehensive AI consistency review, item-specific regeneration, media-provider integrations, cost controls, and durable queue operations remain release work.
