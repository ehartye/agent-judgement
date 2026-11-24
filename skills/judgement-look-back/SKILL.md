---
name: judgement-look-back
description: Returns to an earlier decision to mark its forecasts, check the signs that would reopen it, and record what happened and what to keep, without changing the original. Use when someone says "look back at that decision", "how did that decision turn out", "check our forecasts", "is it time to revisit", "did we decide well", "which decisions are due for review", or when a review date in docs/agent-judgement has passed. Not for making a new choice; use judgement-decide for that.
---

# Look back

A decision teaches only when someone returns to it. Keep the original as it was. Add what happened.

## Find it

List `docs/agent-judgement/*/decision.json` whose `review.on` or any `forecasts.checkOn` has passed, or that
they name. If several are due, take the oldest first and say how many remain.

## Mark it

Ask one thing at a time. **Ask what happened before showing what they predicted.** Memory bends
towards the answer.

1. **What happened?** In their words, with something they can point at.
2. **Forecasts.** For each one due, use its own test to mark `cameTrue` true or false, and note the
   evidence. If it cannot be marked yet, leave it null and say when. Never reword a forecast.
3. **Reopening signs.** For each, ask its watcher. Record what was `seen`.
4. **Score.** For the marked forecasts, average (probability − outcome)², with outcome 1 for true and
   0 for false. Write it as `review.brier`. 0 is perfect and 0.25 is a coin flip. With fewer than ten
   marked across all their decisions, report it as a start.

## Learn from it

5. **Was it decided well, given what could be known then?** Judge the process from the record: did
   first views differ, was the outside view right, did a standing objection come true? Write
   `review.process`.
6. **Luck.** What went their way, or against them, that no one controlled? Write `review.luck`. A good
   decision can end badly, and the reverse.
7. **Keep one thing.** One lesson that changes what they do next time: `review.lesson`.
8. Set `review.doneAt` and `status: "reviewed"`, and add an event.

Write only to `forecasts[].cameTrue` and `note`, `reopenIf[].seen`, `review`, `status`, `updated` and
new `events`. Leave every other field as it was.

## Then

If a reopening sign has been seen, ask whether to reopen. If yes, start a new decision with
judgement-decide whose `whyNow` is that sign. Refresh the board with judgement-board.

With three or more reviewed decisions, offer to compare them: average score, whether they run too
sure or not sure enough, and the objection that most often came true.
