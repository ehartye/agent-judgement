---
name: judgement-board
description: Draws an illustrated, self-contained HTML board from a decision record, with a route map of the options, the ratings, evidence, objections, forecasts and review. Use when someone says "show me the board", "draw the decision", "make the decision page", "update the board", "print the decision", or after a decision record changes. Works offline in any browser. Not for charts of other data.
---

# Board

Turn a `decision.json` in `docs/agent-judgement/yyyy-mm-dd-judgement-title/` into a `board.html` beside
it, one file that opens anywhere.

1. Read the record. Fix anything that does not match
   [the format](../../schema/decision.schema.json), such as a reference to an id that does not exist,
   and say what you fixed. Never change what people said.
2. Copy [board.html](../../assets/board.html) into the same folder as `board.html`.
3. In the copy, replace `null` in
   `<script type="application/json" id="record">null</script>` with the whole record.
   Write every `<` inside the record as `\u003c`. Change nothing else in the file.
4. Tell them the path and that it opens with a double click. Offer to open it.

Make the copy with a file command and the insertion with an edit, so the template's own text is never
retyped.

The blank template also works alone: open `assets/board.html` and drop a `decision.json` on it.

Someone who wants a page to read in a chat or a document gets a short Markdown summary instead:
question, choice and reason, what was given up, standing objections, forecasts with dates, and what
would reopen it.
