// The small part of JSON Schema 2020-12 that decision.schema.json uses. Throws on a keyword it does not know.
const KNOWN = new Set(['$schema', '$id', '$ref', '$defs', 'title', 'description', 'default', 'type', 'required', 'additionalProperties',
  'properties', 'items', 'enum', 'const', 'pattern', 'minLength', 'minItems', 'maxItems', 'minimum', 'maximum']);

const typeOf = (v) => v === null ? 'null' : Array.isArray(v) ? 'array' : Number.isInteger(v) ? 'integer' : typeof v;

export function validate(root, value) {
  const errors = [];
  const visit = (s, v, at) => {
    for (const k of Object.keys(s)) if (!KNOWN.has(k)) throw new Error(`keyword ${k} is not supported`);
    if (s.$ref) return visit(s.$ref.slice(2).split('/').reduce((n, k) => n[k], root), v, at);
    const fail = (m) => errors.push(`${at || '/'} ${m}`);
    if (s.type) {
      const t = typeOf(v), want = [].concat(s.type);
      if (!want.includes(t) && !(t === 'integer' && want.includes('number'))) return fail(`is ${t}, not ${want}`);
    }
    if ('const' in s && v !== s.const) fail(`is not ${s.const}`);
    if (s.enum && !s.enum.includes(v)) fail(`${v} is not one of ${s.enum}`);
    if (typeof v === 'string') {
      if (s.pattern && !new RegExp(s.pattern).test(v)) fail(`${v} does not match ${s.pattern}`);
      if (s.minLength && v.length < s.minLength) fail('is too short');
    }
    if (typeof v === 'number') {
      if (s.minimum != null && v < s.minimum) fail(`is under ${s.minimum}`);
      if (s.maximum != null && v > s.maximum) fail(`is over ${s.maximum}`);
    }
    if (Array.isArray(v)) {
      if (s.minItems && v.length < s.minItems) fail('has too few items');
      if (s.maxItems && v.length > s.maxItems) fail('has too many items');
      if (s.items) v.forEach((x, i) => visit(s.items, x, `${at}/${i}`));
    } else if (v && typeof v === 'object') {
      for (const k of s.required || []) if (!(k in v)) fail(`is missing ${k}`);
      for (const [k, x] of Object.entries(v)) {
        if (s.properties && k in s.properties) visit(s.properties[k], x, `${at}/${k}`);
        else if (s.additionalProperties === false) fail(`has an unknown field ${k}`);
      }
    }
  };
  visit(root, value, '');
  return errors;
}
