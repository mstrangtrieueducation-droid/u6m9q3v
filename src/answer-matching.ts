const SPELLING_GROUPS = [
  ["analyse", "analyze"], ["analysed", "analyzed"], ["analysing", "analyzing"],
  ["apologise", "apologize"], ["apologised", "apologized"], ["apologising", "apologizing"],
  ["behaviour", "behavior"], ["behaviours", "behaviors"],
  ["cancelled", "canceled"], ["cancelling", "canceling"],
  ["centre", "center"], ["centres", "centers"],
  ["colour", "color"], ["colours", "colors"], ["coloured", "colored"], ["colouring", "coloring"],
  ["cosy", "cozy"], ["criticise", "criticize"], ["criticised", "criticized"], ["criticising", "criticizing"],
  ["defence", "defense"], ["favourite", "favorite"], ["favourites", "favorites"],
  ["fulfil", "fulfill"],
  ["grey", "gray"], ["honour", "honor"], ["honours", "honors"],
  ["jewellery", "jewelry"], ["labelled", "labeled"], ["labelling", "labeling"],
  ["labour", "labor"], ["licence", "license"],
  ["modelled", "modeled"], ["modelling", "modeling"],
  ["neighbour", "neighbor"], ["neighbours", "neighbors"],
  ["offence", "offense"], ["organise", "organize"], ["organised", "organized"], ["organising", "organizing"],
  ["practise", "practice"], ["practised", "practiced"], ["practising", "practicing"],
  ["programme", "program"], ["programmes", "programs"],
  ["realise", "realize"], ["realised", "realized"], ["realising", "realizing"],
  ["recognise", "recognize"], ["recognised", "recognized"], ["recognising", "recognizing"],
  ["skilful", "skillful"], ["theatre", "theater"], ["theatres", "theaters"],
  ["travelled", "traveled"], ["travelling", "traveling"], ["traveller", "traveler"], ["travellers", "travelers"],
  ["tyre", "tire"], ["tyres", "tires"],
] as const;

const SPELLING_CANONICAL = new Map<string, string>(
  SPELLING_GROUPS.flatMap((group) => group.map((word) => [word, group[0]])),
);

function normalizeSurface(value: string) {
  return String(value ?? "")
    .normalize("NFKC")
    .trim()
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[‐‑‒–—]/g, "-")
    .replace(/\s+/g, " ")
    .replace(/^"+|"+$/g, "")
    .replace(/[.,!?;:]+$/g, "")
    .trim();
}

function canonicalizeSpelling(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[a-z]+/g, (word) => SPELLING_CANONICAL.get(word) ?? word);
}

function contractionForms(value: string) {
  const forms = new Set([value]);
  const fixed = value
    .replace(/\bwon't\b/g, "will not")
    .replace(/\bcan't\b/g, "cannot")
    .replace(/\bshan't\b/g, "shall not")
    .replace(/\bcan not\b/g, "cannot");
  forms.add(fixed);

  const expanded = fixed.replace(/\b([a-z]+)n't\b/g, "$1 not");
  forms.add(expanded);
  forms.add(expanded.replace(/\b([a-z]+)'ll\b/g, "$1 will"));
  forms.add(expanded.replace(/\b([a-z]+)'re\b/g, "$1 are"));
  forms.add(expanded.replace(/\b([a-z]+)'ve\b/g, "$1 have"));
  forms.add(expanded.replace(/\b([a-z]+)'m\b/g, "$1 am"));

  for (const auxiliary of ["is", "has"]) {
    forms.add(expanded.replace(/\b([a-z]+)'s\b/g, `$1 ${auxiliary}`));
  }
  for (const auxiliary of ["had", "would"]) {
    forms.add(expanded.replace(/\b([a-z]+)'d\b/g, `$1 ${auxiliary}`));
  }
  return forms;
}

function optionalSegmentForms(value: string): Set<string> {
  const match = value.match(/^(.*?)\s*\(([a-z][a-z' -]*)\)(.*)$/);
  if (!match) return new Set([value]);

  const [, before, optional, after] = match;
  const forms = new Set<string>();
  for (const form of optionalSegmentForms(`${before} ${optional}${after}`.replace(/\s+/g, " ").trim())) {
    forms.add(form);
  }
  for (const form of optionalSegmentForms(`${before}${after}`.replace(/\s+/g, " ").trim())) {
    forms.add(form);
  }
  return forms;
}

export function equivalentAnswerForms(value: string) {
  const normalized = normalizeSurface(value);
  const forms = new Set<string>();
  for (const optionalForm of optionalSegmentForms(normalized)) {
    for (const contractionForm of contractionForms(optionalForm)) {
      forms.add(canonicalizeSpelling(contractionForm));
    }
  }
  return forms;
}

export function answersMatch(actual: string, accepted: string | string[]) {
  const actualForms = equivalentAnswerForms(actual);
  const candidates = Array.isArray(accepted) ? accepted : accepted.split("|");
  return candidates.some((candidate) => {
    const candidateForms = equivalentAnswerForms(candidate);
    return [...candidateForms].some((form) => actualForms.has(form));
  });
}
