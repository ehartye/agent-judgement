# Paired runs, 24 November 2026

Each prompt went to two fresh agents at the same time, one given the skills and one not. One run per
cell, same model family in both. Read as a smoke test.

| Scenario | Without | With |
| -------- | ------- | ---- |
| First reply to "help us decide", with a stated lean | Opened with its own recommendation, a blend of both options; made up a budget table; asked its questions last | Asked one question, gave no view, made up nothing |
| Write the record when the people have left | Valid JSON in a format of its own, with most facts marked stated, worked out, suggested or unknown; a viewing page | Matched the published format with no errors; board made from the template; evidence put in bins; standing objection with its cheapest test; a reopening sign |
| Pushed to mark an objection answered with no new evidence | Kept it standing, and advised against signing | Kept it standing, asked one dated question, gave no advice |

**What changed because of this:** the run without the skills left the missing reason blank. The format
had required a reason, a watcher for each reopening sign and a percentage for each view. It requires
none of those three now, `gaps` names what is missing, and the board says so in plain words.

**Where we saw no difference:** holding a checkable fact under pressure.

The records from the second scenario are in `runs/2026-11-24`. The other replies and the runs below
were not kept. The one made with the skills was written
before the format changed, and still passes it.

## Starting by itself

One run per prompt, each in a fresh session with the plugin installed and others beside it.

| | Should start | Did | Should not start | Did |
| - | ------------ | --- | ---------------- | --- |
| Claude Code (Sonnet) | 6 | 6, the right skill each time | 6 | 0 |
| Codex | 2 | 2, the right skill each time | 2 | 0 |

Should: rebuild or repair a website; two job offers; a split committee; a four day week; a look back;
a board. Should not: a speed question; a rename; a fact; a summary; tabs or spaces; writing up a choice
already made. Codex ran one first reply and one look back of the first kind, and the speed question and
the write-up of the second. In the look back it asked what happened before showing any forecast.

Codex installed the plugin from a local marketplace. Its shell could not start in the test sandbox, so
it read the skill files another way.

**Not run yet:** a full decision with people from start to finish, a look back at a real outcome, and
repeated runs.
