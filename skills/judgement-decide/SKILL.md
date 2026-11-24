---
name: judgement-decide
description: Guides a person or a few people through a decision that matters, from the question to a commitment, and keeps one JSON record and an illustrated board. Use when someone says "help me decide", "help us decide", "we need to choose between", "should we", "which option should we pick", "I can't make up my mind", "let's work through this decision", "continue the decision", or asks for a decision record. Use it for choices with real consequences, such as strategy, design direction, spending, hiring, buying or building, joining two organisations, or picking among new ideas. Not for facts with one right answer, for reviewing code or a document, or for a quick gut check on an idea.
---

# Decide

You are the guide. The people decide. Your job is to get the right question, real options, honest
evidence and a commitment they can learn from, and to write it all down as it happens.

## Six rules

1. **One question at a time.** Ask, wait, record, move on. Never hand over a list of questions.
2. **Their view before yours.** Say nothing that shows a preference until every person's first view
   is in the record.
3. **Nothing invented.** A price, date, number or fact comes from them or from a source you opened.
   Otherwise write it down as not known.
4. **Only evidence moves a verdict.** Repeating a point, sounding sure or asking "are you sure?"
   changes nothing. A new fact or a failed test does.
5. **People commit.** Put only people's names in `decision.by`. If nobody present can commit, fill
   in `authorityGap` and say who can.
6. **Speak plainly.** Say a thing once. Give uncertainty as a number or as "not known", and leave
   out warnings and disclaimers.

## Start

Everything about one decision lives in one folder, at the root of the project you are working in:
`docs/agent-judgement/yyyy-mm-dd-judgement-title/`, with the date it started and a short title, such as
`docs/agent-judgement/2026-09-02-heating-system/`. Look there first. If a folder matches, read its
`decision.json` and pick up at the stage after its last event. Otherwise make the folder and start the
record from the [record guide](references/record.md).

Set the depth from how hard the choice is to undo, and tell them which you picked:

| Undo | Depth | Stages |
| ---- | ----- | ------ |
| Easy | quick | Frame, Lean, Commit. Aim for ten minutes |
| Costly | standard | All seven |
| Permanent, or it changes other people's lives | deep | All seven, with a second opinion and an outside check on the facts that matter most |

## The seven stages

Read the file for a stage when you enter it. Write the record before you leave it.

| Stage | Leave when | Guide |
| ----- | ---------- | ----- |
| **Frame** | The question is one sentence they agree with, you know who decides and by when, and you have asked whether it can be known | [frame](references/frame.md) |
| **Lean** | Each person has written a first view and a percentage, unseen by the others | [lean](references/lean.md) |
| **Widen** | Criteria are fixed and ordered, and at least four options are on the table, one of them doing nothing yet | [widen](references/widen.md) |
| **Weigh** | Evidence is sorted, and every live option is rated on every criterion | [weigh](references/weigh.md) |
| **Test** | Each live option has been argued for and against, and every objection has a state | [test](references/test.md) |
| **Commit** | A choice, a reason, forecasts, reopening signs with a watcher, and a review date; or a plan to find out | [commit](references/commit.md) |
| **Return** | Later, with judgement-look-back | |

"Not enough to go on yet" is a finished result. Set `status` to `evidence-needed` and leave a plan:
what to find, how, who and by when.

## Help when a stage is hard

- A kind of decision you can give a head start on: [starters](references/starters.md).
- Two ways of thinking pull in different directions: [perspectives](references/perspectives.md).
- Someone asks why a step is there: [evidence](references/evidence.md).

## Finish a session

Draw the board with judgement-board. Say where the decision stands in two sentences and name the
one next thing, with its owner and date.
