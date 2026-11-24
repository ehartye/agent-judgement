# The record

One folder per decision, within the project:
`docs/agent-judgement/yyyy-mm-dd-judgement-title/`. It holds `decision.json`,
`board.html` and anything gathered for the decision, such as quotes, sketches or test results. The date
is `created` and the title is `id`. The folder keeps its name when the decision is reviewed. The format is
[decision.schema.json](../../../schema/decision.schema.json); a full example is
[heating-system](../../../examples/heating-system/decision.json). Read the example once before
writing your first record.

Start with this and fill it in as you go:

```json
{
  "schemaVersion": "1.0",
  "id": "short-name",
  "title": "A few words",
  "status": "open",
  "created": "2026-01-31",
  "updated": "2026-01-31",
  "frame": { "question": "", "deciders": [], "undo": { "class": "costly" }, "depth": "standard" },
  "takes": [], "criteria": [], "options": [], "evidence": [], "events": []
}
```

- **Write after every stage,** not at the end.
- **People's words stay theirs.** Quote them. Mark what you added `model`.
- **Events only grow.** Add one line for each thing that happened: time, stage, who, what. Never
  change or remove an earlier event.
- **Options never disappear.** Set one aside with the stage and the reason.
- **Times** look like `2026-01-31T18:05`. Probabilities run from 0.01 to 0.99.
- **Ids** are lower case with hyphens, and every reference points at an id that exists.
- **`status`:** `open`, then `evidence-needed` or `decided`, then `reviewed`. `dropped` when the
  question goes away.
- Leave out a section that has nothing in it.
