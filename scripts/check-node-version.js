#!/usr/bin/env node
/* eslint-env node */
/* eslint-disable import/no-commonjs */
const fs = require("fs");
const path = require("path");

function logError(msg) {
  console.error("\n\x1b[31m[ERROR]\x1b[0m " + msg + "\n");
}

function logInfo(msg) {
  console.log("\n\x1b[32m[OK]\x1b[0m " + msg + "\n");
}

try {
  const repoRoot = path.resolve(__dirname, "..");
  const nvmrcPath = path.join(repoRoot, ".nvmrc");

  if (!fs.existsSync(nvmrcPath)) {
    // No .nvmrc - nothing to check
    process.exit(0);
  }

  const targetRaw = fs.readFileSync(nvmrcPath, "utf8").toString().trim();
  if (!targetRaw) process.exit(0);

  // Normalize versions (strip leading 'v')
  const target = targetRaw.replace(/^v/, "");
  const current = process.version.replace(/^v/, "");

  const normalize = (v) => {
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
    console.log(
      "Por favor altere a versão do Node para a requerida e tente novamente. Exemplo:"
    );
    console.log("  nvm install " + target);
    console.log("  nvm use " + target + "\n");
    console.log(
      "Se preferir apenas executar temporariamente com essa versão (sem mudar a padrão):"
    );
    console.log("  nvm exec " + target + " pnpm build\n");
    process.exit(1);
  }

  logInfo(`Node version ${current} matches .nvmrc (${target}).`);
  process.exit(0);
} catch (err) {
  logError("Erro ao verificar .nvmrc: " + String(err));
  process.exit(1);
}
