import type { InfoDetail } from "./schema";
import { infoDetailSchema } from "./schema";

type Kind = "prestation" | "module";

const prestationModules = import.meta.glob("./prestations/*.ts");
const moduleModules = import.meta.glob("./modules/*.ts");

const cache = new Map<string, InfoDetail>();

function key(kind: Kind, id: string) {
  return `${kind}:${id}`;
}

export async function loadInfoDetail(kind: Kind, id: string): Promise<InfoDetail> {
  const cacheKey = key(kind, id);
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const map = kind === "prestation" ? prestationModules : moduleModules;
  const path = `./${kind}s/${id}.ts`;
  const importer = map[path];

  if (!importer) {
    throw new Error(`Missing info detail content for ${kind} '${id}' (expected ${path}).`);
  }

  // Vite returns a module namespace object
  const mod = (await importer()) as { default?: unknown };

  const parsed = infoDetailSchema.parse(mod.default);
  cache.set(cacheKey, parsed);
  return parsed;
}
