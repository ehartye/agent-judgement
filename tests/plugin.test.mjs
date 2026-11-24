// Development checks. The plugin itself runs nothing.
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { validate } from './mini-schema.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');
const SKIP = new Set(['.git', '.claude', 'node_modules']);

function walk(dir = root, out = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out); else out.push(p);
  }
  return out;
}
const rel = (p) => relative(root, p).replaceAll('\\', '/');
const shipped = walk().filter((p) => !rel(p).startsWith('tests/'));
const texts = shipped.filter((p) => /\.(md|json|html|svg)$|NOTICE$/.test(p));
const skills = readdirSync(join(root, 'skills'));
const examples = readdirSync(join(root, 'examples'));
const schema = JSON.parse(read('schema/decision.schema.json'));

test('the two manifests agree', () => {
  const a = JSON.parse(read('.claude-plugin/plugin.json')), b = JSON.parse(read('.codex-plugin/plugin.json'));
  for (const k of ['name', 'version', 'description', 'license', 'repository']) assert.deepEqual(a[k], b[k], k);
  assert.equal(b.skills, './skills/');
});

test('skills are portable: name matches folder, only name and description, description under 1024', () => {
  for (const s of skills) {
    const text = read(`skills/${s}/SKILL.md`);
    const m = text.match(/^---\n([\s\S]*?)\n---\n/);
    assert.ok(m, s);
    const fields = Object.fromEntries(m[1].split('\n').map((l) => [l.slice(0, l.indexOf(':')), l.slice(l.indexOf(':') + 1).trim()]));
    assert.deepEqual(Object.keys(fields), ['name', 'description'], s);
    assert.equal(fields.name, s);
    assert.ok(fields.description.length <= 1024, `${s}: ${fields.description.length}`);
    assert.match(fields.description, /Use when/);
    assert.ok(text.split('\n').length < 500);
    assert.doesNotMatch(text, /[$](\d|ARG)/, `${s} holds an argument placeholder`);
  }
});

test('everything shipped stands alone: no private knowledge base, machine or audience', () => {
  const banned = [/\bwikis?\b/i, /\bvaults?\b/i, /obsidian/i, /[A-Z]:[\\/]Users/i, /\/home\/|\/Users\//, /\bFRC\b/, /\bstudents?\b/i, /\brobots?\b/i, /\bteachers?\b/i];
  for (const p of texts) for (const re of banned) assert.doesNotMatch(readFileSync(p, 'utf8'), re, `${rel(p)} matches ${re}`);
});

test('every skill keeps its work in the one agreed folder', () => {
  for (const p of texts.filter((f) => f.endsWith('.md'))) assert.ok(!readFileSync(p, 'utf8').includes('`decisions/'), rel(p));
  for (const s of skills) assert.ok(read(`skills/${s}/SKILL.md`).includes('docs/agent-judgement/'), s);
});

test('the seller argument appears once, labelled', () => {
  const where = texts.filter((p) => /crucible/i.test(readFileSync(p, 'utf8'))).map(rel);
  assert.deepEqual(where, ['skills/judgement-decide/references/perspectives.md']);
  const t = read(where[0]);
  assert.equal((t.match(/seller's argument/g) || []).length, 1);
});

test('links inside the repository resolve, and anchors exist', () => {
  const slug = (h) => h.toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, '').trim().replace(/\s+/g, '-');
  for (const p of shipped.filter((f) => f.endsWith('.md'))) {
    for (const [, href] of readFileSync(p, 'utf8').matchAll(/\]\(([^)\s]+)\)/g)) {
      if (/^https?:/.test(href)) continue;
      const [path, anchor] = href.split('#');
      const target = path ? resolve(dirname(p), path) : p;
      assert.ok(existsSync(target), `${rel(p)} -> ${href}`);
      if (anchor) {
        const heads = [...readFileSync(target, 'utf8').matchAll(/^#+ (.+)$/gm)].map((m) => slug(m[1]));
        assert.ok(heads.includes(anchor), `${rel(p)} -> #${anchor}`);
      }
    }
  }
});

test('every row of evidence cites a public address', () => {
  for (const line of read('skills/judgement-decide/references/evidence.md').split('\n')) {
    if (!line.startsWith('|') || /^\| (Step|What) |^\| -/.test(line)) continue;
    assert.match(line, /\]\(https:\/\//, line.slice(0, 80));
  }
});

test('examples match the published format and refer to ids that exist', () => {
  for (const e of examples) {
    const d = JSON.parse(read(`examples/${e}/decision.json`));
    assert.deepEqual(validate(schema, d), [], e);
    assert.equal(d.id, e);
    const opts = new Set(d.options.map((o) => o.id)), crit = new Set(d.criteria.map((c) => c.id));
    for (const r of d.ratings || []) { assert.ok(opts.has(r.option)); assert.ok(crit.has(r.criterion)); }
    for (const v of d.evidence || []) for (const b of v.bears || []) assert.ok(opts.has(b.option));
    for (const o of d.objections || []) if (o.against) assert.ok(opts.has(o.against));
    for (const t of d.tensions || []) for (const c of t.between) assert.ok(crit.has(c));
    if (d.decision) {
      assert.ok(opts.has(d.decision.choice));
      const people = d.frame.deciders.map((x) => x.name);
      for (const b of d.decision.by) assert.ok(people.includes(b), `${b} is not a named person`);
      assert.equal(d.options.filter((o) => o.state === 'chosen').length, 1);
    }
    const firstPerson = d.takes.filter((t) => t.actor === 'person' && t.when === 'first').map((t) => t.at).sort().at(-1);
    for (const t of d.takes.filter((x) => x.actor === 'model')) assert.ok(t.at > firstPerson, 'the model spoke after every first view');
    const times = d.events.map((v) => v.at);
    assert.deepEqual(times, [...times].sort(), 'events are in order');
  }
});

test('the format catches a broken record', () => {
  const d = JSON.parse(read('examples/heating-system/decision.json'));
  assert.ok(validate(schema, { ...d, status: 'finished' }).length);
  assert.ok(validate(schema, { ...d, extra: 1 }).length);
  assert.ok(validate(schema, { ...d, takes: [{ ...d.takes[0], probability: 1 }] }).length);
  const { frame, ...noFrame } = d;
  assert.ok(validate(schema, noFrame).length);
});

test('the board needs nothing from outside and never writes markup from a record', () => {
  const b = read('assets/board.html');
  assert.doesNotMatch(b, /innerHTML|outerHTML|insertAdjacentHTML|document\.write|eval\(/);
  assert.doesNotMatch(b, /<link|@import|src\s*=|url\(/);
  assert.doesNotMatch(b.replaceAll('http://www.w3.org/2000/svg', ''), /https?:\/\//);
  assert.equal((b.match(/<script type="application\/json" id="record">null<\/script>/g) || []).length, 1);
});

test('each example board holds exactly its record, safely', () => {
  for (const e of examples) {
    const m = read(`examples/${e}/board.html`).match(/<script type="application\/json" id="record">([\s\S]*?)<\/script>/);
    assert.doesNotMatch(m[1], /</);
    assert.deepEqual(JSON.parse(m[1]), JSON.parse(read(`examples/${e}/decision.json`)));
    const bare = read(`examples/${e}/board.html`).replace(m[0], '<script type="application/json" id="record">null</script>');
    assert.equal(bare, read('assets/board.html'), 'the example uses the current template');
  }
});

// A record that says only what people said, plus one that is filled in where wording is joined together.
const sparse = {
  schemaVersion: '1.0', id: 'sparse', title: 'Sparse record', status: 'decided', created: '2026-01-05',
  frame: { question: 'Which?', deciders: [{ name: 'A', part: 'decides' }], undo: { class: 'costly' }, depth: 'standard' },
  takes: [{ who: 'A', actor: 'person', at: '2026-01-05T10:00:00Z', leaning: 'one' }],
  criteria: [], events: [{ at: '2026-01-05T10:00:00Z', stage: 'commit', actor: 'person', what: 'Chose' }],
  options: [{ id: 'one', name: 'One', from: 'person', state: 'chosen' }, { id: 'two', name: 'Two', from: 'person', state: 'set-aside' }],
  decision: { choice: 'one', by: ['A'], at: '2026-01-05T10:00:00Z' },
  reopenIf: [{ sign: 'A sign' }],
  gaps: ['Nobody gave a reason', 'Nobody is watching the sign'],
};

// Just enough of a page to run the board's own script and read what it wrote.
function drawn(record) {
  class Node {
    constructor(tag) { this.tag = tag; this.kids = []; this.attrs = {}; this.style = { setProperty() {} }; }
    append(...k) { this.kids.push(...k); }
    replaceChildren(...k) { this.kids = k; }
    setAttribute(k, v) { this.attrs[k] = String(v); }
    addEventListener() {}
    set textContent(v) { this.kids = [v]; }
    get textContent() { return this.kids.map((k) => (k instanceof Node ? k.textContent : String(k))).join(' '); }
    all() { return [...Object.values(this.attrs), ...this.kids.flatMap((k) => (k instanceof Node ? k.all() : [String(k)]))]; }
  }
  const app = new Node('main'), rec = new Node('script');
  rec.textContent = JSON.stringify(record);
  const document = {
    title: '', getElementById: (id) => (id === 'app' ? app : id === 'record' ? rec : null),
    createElement: (t) => new Node(t), createElementNS: (_, t) => new Node(t),
    createTextNode: (t) => { const n = new Node('#text'); n.kids = [t]; return n; },
  };
  const script = read('assets/board.html').match(/<script>\n([\s\S]*?)<\/script>/)[1];
  new Function('document', 'Node', 'addEventListener', 'window', script)(document, Node, () => {}, {});
  return app.all().join('\n');
}

test('a record with nothing filled in by guesswork is valid', () => {
  assert.deepEqual(validate(schema, sparse), []);
});

test('the board draws what is missing in plain words', () => {
  const outside = { ...sparse, outsideView: { whatHappened: 'It went well.' } };
  for (const r of [sparse, outside, JSON.parse(read('examples/heating-system/decision.json'))]) {
    assert.doesNotMatch(drawn(r), /undefined|NaN|\bnull\b|\[object/);
  }
  const text = drawn(sparse);
  for (const t of ['No reason was recorded.', 'Nobody is watching for this yet', 'Nobody gave a reason']) assert.ok(text.includes(t), t);
});

test('the infographic names every stage in order and loads nothing', () => {
  const s = read('assets/workflow.svg');
  const at = ['Frame', 'Lean', 'Widen', 'Weigh', 'Test', 'Commit', 'Return'].map((n) => s.indexOf(`>${n}</text>`));
  assert.ok(at.every((x, i) => x > 0 && (i === 0 || x > at[i - 1])));
  assert.doesNotMatch(s, /href|<image|@import|url\(/);
  assert.match(read('README.md'), /!\[[^\]]{80,}\]\(assets\/workflow\.svg\)/);
});
