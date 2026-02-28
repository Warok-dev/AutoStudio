import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Spec } from "@/src/types/spec";

const SPEC_PATH = path.resolve(process.cwd(), "src/lib/../../../../specs/generated_spec_1.json");

export async function loadSpec(): Promise<Spec> {
  const raw = await readFile(SPEC_PATH, "utf8");
  return JSON.parse(raw) as Spec;
}
