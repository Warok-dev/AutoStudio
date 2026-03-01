import { copyFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..", "..", "..");

const clientId = process.env.CLIENT_ID || "pulsedesk";
const briefPath = path.join(repoRoot, "clients", clientId, "brief.md");
const clientSpecPath = path.join(repoRoot, "clients", clientId, "spec.json");
const webSpecPath = path.join(repoRoot, "apps", "web", "src", "data", "spec.json");

if (!existsSync(briefPath)) {
  console.error(`Brief not found for client "${clientId}": ${briefPath}`);
  process.exit(1);
}

const pythonArgs = ["backend/main.py", `clients/${clientId}/brief.md`, "--out", `clients/${clientId}/spec.json`];
const generation = spawnSync("python", pythonArgs, {
  cwd: repoRoot,
  stdio: "inherit",
});

if (generation.status !== 0) {
  process.exit(generation.status ?? 1);
}

if (!existsSync(clientSpecPath)) {
  console.error(`Generated spec not found for client "${clientId}": ${clientSpecPath}`);
  process.exit(1);
}

copyFileSync(clientSpecPath, webSpecPath);
console.log(`Copied ${clientSpecPath} -> ${webSpecPath}`);
