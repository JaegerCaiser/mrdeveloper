#!/usr/bin/env node
/* eslint-env node */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

function logError(msg: string) {
  // red
  console.error(`\n\x1b[31m[ERROR]\x1b[0m ${msg}\n`);
}

function logInfo(msg: string) {
  // green
  console.warn(`\n\x1b[32m[OK]\x1b[0m ${msg}\n`);
}

try {
  const __filename = fileURLToPath(import.meta.url);
  const repoRoot = path.resolve(path.dirname(__filename), "..");
  const nvmrcPath = path.join(repoRoot, ".nvmrc");

  // Skip this check when running in CI environments — prebuild is intended for local dev only
  // Detect common CI environment variables (CI, GITHUB_ACTIONS, GITLAB_CI, AZURE_PIPELINES)
  if (
    process.env.CI ||
    process.env.GITHUB_ACTIONS ||
    process.env.GITLAB_CI ||
    process.env.AZURE_PIPELINES
  ) {
    logInfo(
      "CI environment detected — skipping local-only Node version check."
    );
    // exit 0 so CI builds are not blocked
    process.exit(0);
  }

  if (!fs.existsSync(nvmrcPath)) {
    // No .nvmrc - nothing to check
    process.exit(0);
  }

  const targetRaw = fs.readFileSync(nvmrcPath, "utf8").toString().trim();
  if (!targetRaw) process.exit(0);

  // Normalize versions (strip leading 'v')
  const target = targetRaw.replace(/^v/, "");
  const current = process.version.replace(/^v/, "");

  const normalize = (v: string) => {
    const parts = v.split(".");
    // keep only major.minor.patch (pad with zeros if needed)
    while (parts.length < 3) parts.push("0");
    return parts.slice(0, 3).join(".");
  };

  const t = normalize(target);
  const c = normalize(current);

  if (t !== c) {
    logError(
      `Versão do Node incompatível: o projeto pede ${target} (arquivo .nvmrc), mas você está usando ${current}.`
    );
    console.warn(
      "Por favor altere a versão do Node para a requerida e tente novamente. Exemplo:"
    );
    console.warn("  nvm install " + target);
    console.warn("  nvm use " + target + "\n");
    console.warn(
      "Se preferir apenas executar temporariamente com essa versão (sem mudar a padrão):"
    );
    console.warn("  nvm exec " + target + " pnpm build\n");
    process.exit(1);
  }

  logInfo(`Node version ${current} matches .nvmrc (${target}).`);
  process.exit(0);
} catch (err: unknown) {
  logError("Erro ao verificar .nvmrc: " + String(err));
  process.exit(1);
}
