# 🚀 Documentação Completa do Workflow CI/CD

## 📑 Índice

1. [Arquitetura Geral](#arquitetura-geral)
2. [Workflows Principais](#workflows-principais)
3. [Workflows Reutilizáveis](#workflows-reutilizáveis)
4. [Fluxos de Execução](#fluxos-de-execução)
5. [Segurança e Proteções](#segurança-e-proteções)
6. [Guia de Troubleshooting](#guia-de-troubleshooting)

---

## 🏗️ Arquitetura Geral

### Visão Geral do Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                    CI/CD Workflow                            │
└─────────────────────────────────────────────────────────────┘

feature/*     ──→ PR ──→ preview.yml ──→ Preview URL
   ↓
develop       ──→ develop.yml ──→ Deploy DEV
   ↓
release/*     ──→ PR ──→ preview.yml ──→ Preview + Beta Tag
   ↓
main          ──→ production.yml ──→ Deploy PROD + Release Tag
```

### Ambientes

| Ambiente            | Branch          | Trigger             | URL             | Deploy |
| ------------------- | --------------- | ------------------- | --------------- | ------ |
| **Development**     | develop         | Push                | vercel-develop  | ✅     |
| **Preview/Staging** | PR / release/\* | PR / Push           | vercel-preview  | ✅     |
| **Production**      | main            | Merge de release/\* | seu-dominio.com | ✅     |

---

## 🔄 Workflows Principais

### 1. `develop.yml` - Ambiente de Desenvolvimento

**Arquivo**: `.github/workflows/develop.yml`

#### ⏱️ Quando Executa?

```yaml
on:
  push:
    branches:
      - develop
```

- Sempre que há **push na branch `develop`**
- Ideal para testar mudanças finalizadas antes de release

#### 📊 Jobs Executados

```
┌──────────────────┐
│  test-and-lint   │  ← Testa e faz lint do código
└────────┬─────────┘
         │ (se passar)
┌────────▼──────────┐
│ deploy-develop    │  ← Deploy no Vercel (ambiente develop)
└───────────────────┘
         │
         ▼
    ✅ Live em https://seu-app-develop.vercel.app
```

#### 🔍 Detalhes Técnicos

```yaml
env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
```

- Define **credenciais do Vercel** como variáveis globais
- Usadas por ambos os jobs

#### Job 1: `test-and-lint`

```yaml
test-and-lint:
  uses: ./.github/workflows/reusable-test-and-lint.yml
  with:
    node-version: "22.x"
```

- Chama **workflow reutilizável**
- Node.js versão 22.x
- Executa:
  - `pnpm install --frozen-lockfile` - Instala dependências
  - `pnpm run lint` - Verifica code style
  - `pnpm run test:ci` - Roda testes

**Se falhar aqui**: ❌ Workflow para e nada mais é executado

#### Job 2: `deploy-develop`

```yaml
deploy-develop:
  needs: test-and-lint # Depende do job anterior
  uses: ./.github/workflows/reusable-deploy-vercel.yml
  with:
    environment: develop # Nome do ambiente
    ref: ${{ github.ref }} # Branch atual
    prebuilt: true # Usa build já feito
  secrets:
    vercel-token: ${{ secrets.VERCEL_TOKEN }}
    github-token: ${{ secrets.GITHUB_TOKEN }}
```

- **Só executa** se `test-and-lint` passar
- Deploy para ambiente `develop`
- Compartilha secrets de forma segura

---

### 2. `preview.yml` - Ambiente de Preview/Staging

**Arquivo**: `.github/workflows/preview.yml`

#### ⏱️ Quando Executa?

```yaml
on:
  pull_request:
    types: [opened, synchronize, reopened] # PR criada/atualizada
  push:
    branches:
      - release/** # Push em release/X.Y.Z
  workflow_dispatch: # Manual (botão na UI)
```

- **Pull Requests**: Qualquer PR (feature, bugfix, etc)
- **Release branches**: Push em `release/*`
- **Manual**: Botão "Run workflow" no GitHub

#### 📊 Jobs Executados

```
┌──────────────────┐
│  test-and-lint   │  ← Testa e faz lint
└────────┬─────────┘
         │ (se passar)
         ├─────────────────────────┬──────────────────────┐
         │                         │                      │
    ┌────▼──────────┐    ┌─────────▼─────────┐   ┌───────▼─────────┐
    │deploy-preview │    │validate-release-  │   │update-pr-comment│
    │               │    │branch (se PR→main)│   │(se PR)          │
    └────┬──────────┘    └───────────────────┘   └────────┬────────┘
         │                                                 │
         │ (se push em release/*)                         │
    ┌────▼──────────┐                                ┌────▼────────┐
    │create-beta-tag│                                │ Comentário  │
    └───────────────┘                                │  no PR      │
         │                                            └─────────────┘
         ▼
    ✅ Preview disponível
```

#### Job 1: `test-and-lint`

Idêntico ao `develop.yml` - Testa e faz linting

#### Job 2: `deploy-preview`

```yaml
deploy-preview:
  needs: test-and-lint
  uses: ./.github/workflows/reusable-deploy-vercel.yml
  with:
    environment: preview
    ref: ${{ github.event_name == 'pull_request' && github.event.pull_request.head.sha || github.sha }}
    prebuilt: true
```

- Deploy para ambiente **preview**
- **ref inteligente**:
  - Se for PR → usa commit do head da PR
  - Se for push → usa commit do push
- Gera URL temporária e única para preview

**Exemplo URLs geradas**:

```
Pull Request #123:  https://seu-app-pr-123.vercel.app
Release push:       https://seu-app-release.vercel.app
```

#### Job 3: `validate-release-branch` ⭐ (CRÍTICO)

```yaml
validate-release-branch:
  if: github.event_name == 'pull_request' && github.base_ref == 'main'
  runs-on: ubuntu-latest
  permissions:
    contents: read
    pull-requests: write
```

**Executa APENAS se**:

- Evento é um **Pull Request** (`github.event_name == 'pull_request'`)
- **Para a branch main** (`github.base_ref == 'main'`)

##### Step 1: Validar Padrão de Branch

```bash
SOURCE_BRANCH="${{ github.head_ref }}"

if [[ "$SOURCE_BRANCH" != release/* ]]; then
  echo "::error::PR from '$SOURCE_BRANCH' cannot merge to main"
  exit 1
fi
```

**O que faz**: Garante que **APENAS branches `release/*` podem mergear em `main`**

| Branch          | Result       |
| --------------- | ------------ |
| `release/1.0.0` | ✅ Permitida |
| `feature/xyz`   | ❌ Bloqueada |
| `bugfix/abc`    | ❌ Bloqueada |
| `develop`       | ❌ Bloqueada |

**Proteção de Gitflow**: Força uso correto do workflow

##### Step 2: Validar Formato de Versão

```bash
SOURCE_BRANCH="${{ github.head_ref }}"
VERSION=$(echo "$SOURCE_BRANCH" | sed 's|^release/||')

if ! [[ "$VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "::warning::Branch does not follow semantic versioning"
fi
```

**Valida Semantic Versioning** (X.Y.Z):

| Branch           | Status    |
| ---------------- | --------- |
| `release/1.0.0`  | ✅ Válida |
| `release/1.0`    | ⚠️ Aviso  |
| `release/v1.0.0` | ⚠️ Aviso  |
| `release/1`      | ⚠️ Aviso  |

**Padronização**: Garante versões consistentes

##### Step 3: Verificar Match entre Branch e package.json

```bash
SOURCE_BRANCH="${{ github.head_ref }}"
BRANCH_VERSION=$(echo "$SOURCE_BRANCH" | sed 's|^release/||')
PACKAGE_VERSION=$(node -p "require('./package.json').version")

if [ "$BRANCH_VERSION" != "$PACKAGE_VERSION" ]; then
  echo "::warning::Version mismatch!"
  echo "Branch:      $BRANCH_VERSION"
  echo "package.json: $PACKAGE_VERSION"
fi
```

**O que faz**: Verifica consistência de versões

| Cenário                                 | Status   |
| --------------------------------------- | -------- |
| `release/1.0.0` + `package.json: 1.0.0` | ✅ OK    |
| `release/1.0.0` + `package.json: 1.0.1` | ⚠️ Aviso |
| `release/1.0.0` + `package.json: 0.9.9` | ⚠️ Aviso |

**Previne**: Deploy com versão inconsistente

##### Step 4: Comentário de Validação no PR

```yaml
Add validation comment to PR
```

Adiciona comentário automático no PR:

```markdown
### 🔍 Release Branch Validation

Source Branch: release/1.0.0
Target Branch: main
Status: ✅ Valid

- ✅ Branch name pattern valid
- ✅ Version format valid (1.0.0)
- ✅ Version matches package.json
```

**Benefício**: Feedback imediato no PR sobre validações

#### Job 4: `update-pr-comment`

```yaml
update-pr-comment:
  if: github.event_name == 'pull_request'
  name: Update PR Comment
  needs: deploy-preview
```

- Executa **APENAS** em Pull Requests
- Depende de `deploy-preview` estar pronto
- Procura comentário anterior com "🚀 Vercel Preview Deployment"
- **Atualiza** o comentário com nova URL

**Comentário gerado no PR**:

```markdown
### 🚀 Vercel Preview Deployment

A pré-visualização para este PR foi atualizada.

| Recurso               | Link                                                          |
| --------------------- | ------------------------------------------------------------- |
| **🔗 URL de Preview** | [Clique aqui](https://seu-app-pr-456.vercel.app)              |
| **📜 Logs do Deploy** | [Ver logs da Action](https://github.com/.../actions/runs/789) |

---

_Commit: `abc123def456...`_
```

**Vantagens**:

- ✅ Reviewer vê URL preview direto no PR
- ✅ Comentário sempre atualizado
- ✅ Não polui o chat do PR

#### Job 5: `create-beta-tag`

```yaml
create-beta-tag:
  needs: deploy-preview
  if: github.event_name == 'push' && startsWith(github.ref, 'refs/heads/release/')
  uses: ./.github/workflows/reusable-create-tag.yml
  with:
    tag-type: beta
    version: ${{ github.ref_name }}
    commit-sha: ${{ github.sha }}
    create-version-commit: false
```

**Executa APENAS se**:

- Evento é um **push** (não PR)
- **Branch é `release/*`**

**O que faz**: Cria tag beta automática

| Evento                  | Tag Criada              |
| ----------------------- | ----------------------- |
| Push em `release/1.0.0` | `v1.0.0-beta.123456789` |
| PR de `release/1.0.0`   | `v1.0.0-beta.987654321` |

**Exemplo fluxo**:

```
$ git push origin release/1.0.0
    ↓
[preview.yml] create-beta-tag job dispara
    ↓
Tag criada: v1.0.0-beta.123456789
    ↓
git tag v1.0.0-beta.123456789 "Beta Release v1.0.0-beta.123456789"
git push origin v1.0.0-beta.123456789
    ↓
✅ Tag aparece em "Releases" no GitHub
```

---

### 3. `production.yml` - Ambiente de Produção

**Arquivo**: `.github/workflows/production.yml`

#### ⏱️ Quando Executa?

```yaml
on:
  push:
    branches:
      - main
```

- **APENAS** quando há push na branch `main`
- Geralmente acontece via **merge de um PR `release/*`**

#### 📊 Jobs Executados

```
┌────────────────────┐
│validate-production │  ← Valida versão e conflitos
└────────┬───────────┘
         │ (se passar)
┌────────▼──────────┐
│  test-and-lint    │  ← Testa e faz lint
└────────┬──────────┘
         │ (se passar)
┌────────▼────────────────┐
│deploy-production        │  ← Deploy em produção
└────────┬────────────────┘
         │ (depois)
┌────────▼──────────┐
│  get-version      │  ← Extrai versão do package.json
└────────┬──────────┘
         │ (paralelo com outros)
┌────────▼────────────┐
│  tag-release        │  ← Cria tag de release
└─────────────────────┘
         │
         ▼
    ✅ Prod ao vivo + Tag v1.0.0 criada
```

#### Job 1: `validate-production` ⭐ (NOVO)

```yaml
validate-production:
  name: Validate Production Deploy
  runs-on: ubuntu-latest
  permissions:
    contents: read
```

**Primeira defesa**: Validações antes de qualquer deploy

##### Step 1: Validar Formato de Versão

```bash
VERSION=$(node -p "require('./package.json').version")

if ! [[ "$VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "::error::Invalid version format in package.json: $VERSION"
  exit 1  # BLOQUEIA TUDO
fi

echo "✅ Version format is valid: $VERSION"
```

**O que faz**: Garante `package.json` tem versão válida

**Comportamento**:

- Versão `1.0.0` → ✅ Continua
- Versão `1.0` → ❌ PARA AQUI
- Versão `abc` → ❌ PARA AQUI

**Impacto**: Se falhar, **deployment inteiro é cancelado** ✋

##### Step 2: Verificar Conflito de Tags

```bash
VERSION=$(node -p "require('./package.json').version")
git fetch --tags

if git rev-parse "refs/tags/v$VERSION" >/dev/null 2>&1; then
  echo "::warning::Tag v$VERSION already exists"
  echo "::warning::This may indicate a version bump is needed"
else
  echo "✅ No tag conflict detected for v$VERSION"
fi
```

**O que faz**: Avisa se tag dessa versão já existe

| Situação   | Ação                            |
| ---------- | ------------------------------- |
| Tag existe | ⚠️ Aviso (continua mesmo assim) |
| Tag nova   | ✅ OK                           |

**Indica**: Você **esqueceu de atualizar a versão** antes de fazer merge

#### Job 2: `test-and-lint`

```yaml
test-and-lint:
  needs: validate-production
  uses: ./.github/workflows/reusable-test-and-lint.yml
  with:
    node-version: "22.x"
```

- Depende de `validate-production` passar
- Mesmo workflow que em `develop` e `preview`
- **Bloqueador**: Se falhar, deploy não acontece

#### Job 3: `deploy-production`

```yaml
deploy-production:
  needs: test-and-lint
  uses: ./.github/workflows/reusable-deploy-vercel.yml
  with:
    environment: production
    ref: ${{ github.ref }}
    prebuilt: true
    prod: true # 🔑 Ativa otimizações de produção
  secrets:
    vercel-token: ${{ secrets.VERCEL_TOKEN }}
    github-token: ${{ secrets.GITHUB_TOKEN }}
```

- **prod: true** = Deploy otimizado para produção
- Deployment na URL principal (seu domínio)
- Tudo que seu usuário final vê!

#### Job 4: `get-version`

```yaml
get-version:
  needs: validate-production
  runs-on: ubuntu-latest
  outputs:
    version: ${{ steps.get_version.outputs.version }}
  steps:
    - name: Get version from package.json
      id: get_version
      run: |
        VERSION=$(node -p "require('./package.json').version")
        echo "version=$VERSION" >> $GITHUB_OUTPUT
```

**O que faz**:

1. Lê `package.json`
2. Extrai versão (ex: `1.0.0`)
3. **Compartilha com outros jobs** via output
4. Job `tag-release` usa essa versão

**Exemplo**:

```
package.json: { "version": "1.0.0" }
get-version output: version=1.0.0
tag-release recebe: version=1.0.0
```

#### Job 5: `tag-release` ⭐

```yaml
tag-release:
  needs: [deploy-production, get-version]
  uses: ./.github/workflows/reusable-create-tag.yml
  with:
    tag-type: release
    version: ${{ needs.get-version.outputs.version }}
    commit-sha: ${{ github.sha }}
    create-version-commit: false
  secrets: inherit
  permissions:
    contents: write
```

**Depende de**:

- `deploy-production` estar pronto (deploy ok)
- `get-version` ter a versão

**O que faz**: Cria tag de release automática

| Evento        | Tag Criada |
| ------------- | ---------- |
| Merge em main | `v1.0.0`   |

**Fluxo completo**:

```
1. PR de release/1.0.0 é criada
   ↓
2. Validações passam (preview.yml)
   ↓
3. PR é merged em main
   ↓
4. Push em main dispara production.yml
   ↓
5. validate-production: ✅ Versão válida
   ↓
6. test-and-lint: ✅ Testes passam
   ↓
7. deploy-production: ✅ Deploy em produção
   ↓
8. get-version: Extrai version 1.0.0
   ↓
9. tag-release: Cria tag v1.0.0
   ↓
✅ Produção live + Tag versionada + Release no GitHub
```

---

## 🔧 Workflows Reutilizáveis

### `reusable-test-and-lint.yml`

**Arquivo**: `.github/workflows/reusable-test-and-lint.yml`

**Propósito**: Centralizar lógica de testes e linting (DRY principle)

#### Definição

```yaml
on:
  workflow_call:
    inputs:
      node-version:
        required: true
        type: string
```

- Pode ser **chamado por outros workflows**
- Recebe `node-version` como input (ex: "22.x")

#### Steps Detalhados

##### 1️⃣ Checkout Code

```yaml
- name: Checkout code
  uses: actions/checkout@v4
```

- Baixa seu código no servidor do GitHub Actions
- Prepara tudo para próximos steps

##### 2️⃣ Setup pnpm

```yaml
- name: Setup pnpm
  uses: pnpm/action-setup@v4
  with:
    version: 10
```

- Instala `pnpm` (gerenciador de pacotes)
- Versão 10 específica

**Por que pnpm?**

- ✅ Mais rápido que npm
- ✅ Usa menos disco
- ✅ Determinístico (pnpm-lock.yaml)

##### 3️⃣ Setup Node.js

```yaml
- name: Setup Node.js ${{ inputs.node-version }}
  uses: actions/setup-node@v4
  with:
    node-version: ${{ inputs.node-version }} # 22.x
    cache: "pnpm"
```

- Instala Node.js versão especificada
- **cache: pnpm** = Usa cache do pnpm
  - Próxima vez que rodar com mesmas dependências
  - Instala **muito mais rápido** (poupan 1-2 minutos)

##### 4️⃣ Instalar Dependências

```yaml
- name: Install dependencies
  run: pnpm install --frozen-lockfile
```

```bash
$ pnpm install --frozen-lockfile
```

- Instala **exatamente** o que está em `pnpm-lock.yaml`
- `--frozen-lockfile` = Não altera o lock file
- Garante **reprodutibilidade** (mesmo build sempre)

##### 5️⃣ Criar Diretórios de Cache

```yaml
- name: Ensure build cache directories exist
  run: mkdir -p .vite node_modules/.cache && touch .eslintcache
```

```bash
mkdir -p .vite node_modules/.cache && touch .eslintcache
```

- Cria pastas que o cache vai usar
- **Evita erro**: Se pasta não existe, cache falha
- Preparação preventiva

##### 6️⃣ Cache Build Artifacts ⭐ (IMPORTANTE)

```yaml
- name: Cache build artifacts
  uses: actions/cache@v4
  with:
    path: |
      .vite
      node_modules/.cache
      .eslintcache
    key: build-${{ runner.os }}-node-${{ inputs.node-version }}-${{ hashFiles('**/pnpm-lock.yaml') }}-${{ hashFiles('src/**/*.{ts,tsx,js,jsx}', 'vite.config.ts', 'tsconfig.json', 'eslint.config.mjs') }}
    restore-keys: |
      build-${{ runner.os }}-node-${{ inputs.node-version }}-${{ hashFiles('**/pnpm-lock.yaml') }}-
      build-${{ runner.os }}-node-${{ inputs.node-version }}-
```

**O que faz**: Guarda artifacts do build entre execuções

**Cache Key explicada**:

```
build-
  linux-                                    # Sistema operacional
  node-22.x-                               # Versão do Node
  abc123def456.pnpm-lock-                  # Hash do pnpm-lock.yaml
  def456abc123.src.config                  # Hash dos arquivos de código
```

**Invalidação**:

- Se qualquer uma das partes da key mudar → cache é invalidado
- Se `pnpm-lock.yaml` mudar → novo hash → cache novo
- Se arquivo em `src/` mudar → novo hash → cache novo

**Restore Keys** (fallback):

```
build-linux-node-22.x-abc123def456.pnpm-lock-  ← Exato match
build-linux-node-22.x-abc123def456.pnpm-lock-  ← Ou algo próximo
build-linux-node-22.x-                         ← Ou qualquer build
```

**Ganho de performance**: **2-3 minutos** economizados por build! ⚡

##### 7️⃣ Executar Linting

```yaml
- name: Run linting
  run: pnpm run lint
  env:
    ESLINT_CACHE: .eslintcache
```

```bash
$ pnpm run lint
```

Executa ESLint. Procura por:

- ❌ Erros de sintaxe
- ❌ Variáveis não usadas
- ❌ Imports não utilizados
- ❌ Código com estilo inconsistente
- ❌ Problemas de TypeScript

**Script definido em `package.json`**:

```json
{
  "scripts": {
    "lint": "eslint . --ext ts,tsx --ignore-pattern scripts/** --report-unused-disable-directives --max-warnings 0"
  }
}
```

**max-warnings: 0** = Nenhum aviso permitido!

##### 8️⃣ Executar Testes

```yaml
- name: Run tests
  run: pnpm run test:ci
```

```bash
$ pnpm run test:ci
```

Roda testes em modo CI (sem watch, sem interativo)

**Script em `package.json`**:

```json
{
  "scripts": {
    "test:ci": "vitest run"
  }
}
```

**Tipos de testes**:

- ✅ Testes unitários
- ✅ Testes de integração
- ✅ Snapshot tests

##### 9️⃣ Upload Debug Logs (se falhar)

```yaml
- name: Upload debug logs on failure
  if: failure()
  uses: actions/upload-artifact@v4
  with:
    name: test-and-lint-debug-logs-${{ github.run_number }}
    path: |
      ~/.npm/_logs/
      ~/.pnpm-debug.log
      ~/.pnpm/
      .eslintcache
      /tmp/node-*
      /tmp/npm-*
      /tmp/pnpm-*
```

**Executa APENAS** se algum step falhou (`if: failure()`)

**O que faz**: Salva logs para debugging

- Logs do npm
- Logs do pnpm
- Cache de ESLint
- Arquivos temporários

**Como usar**:

1. Vá em "Actions" → run falhado
2. Seção "Artifacts" → Download logs
3. Analise o que deu errado

---

### `reusable-deploy-vercel.yml`

**Arquivo**: `.github/workflows/reusable-deploy-vercel.yml`

**Propósito**: Centralizar lógica de deploy no Vercel

#### Definição

```yaml
on:
  workflow_call:
    inputs:
      environment:
        required: true
        type: string # "develop", "preview", "production"
      ref:
        required: true
        type: string # Branch ou commit para deploy
      prebuilt:
        required: false
        type: boolean
        default: false
      prod:
        required: false
        type: boolean
        default: false # Deploy em produção?
    secrets:
      vercel-token:
        required: true
      github-token:
        required: true
    outputs:
      deployment_url:
        value: ${{ jobs.deploy.outputs.deployment_url }}
        description: "URL do deployment"
```

#### Steps Detalhados

##### 1️⃣ Create GitHub Deployment

```yaml
- name: Create GitHub Deployment
  id: deployment
  uses: bobheadxi/deployments@v1.5.0
  with:
    step: start
    token: ${{ secrets.github-token }}
    env: ${{ inputs.environment }}
    ref: ${{ inputs.ref }}
```

**O que faz**: Marca no GitHub que um deployment **começou**

**Resultado no GitHub**:

```
Deployments
├── production
│   └── ✅ Successful (1 hour ago)
│   └── ⏳ In progress
│   └── ❌ Failed
├── develop
│   └── ✅ Successful (30 minutes ago)
└── preview
    └── ✅ Successful (2 minutes ago)
```

##### 2️⃣ Checkout Code

```yaml
- name: Checkout code
  uses: actions/checkout@v4
```

Baixa seu código

##### 3️⃣ Install Vercel CLI

```yaml
- name: Install Vercel CLI
  run: npm install --global vercel@latest
```

Instala ferramenta de linha de comando do Vercel

##### 4️⃣ Pull Vercel Environment

```yaml
- name: Pull Vercel Environment Information
  run: |
    vercel pull --yes --environment=${{ inputs.environment }} --token=${{ secrets.vercel-token }}
```

**O que faz**: Baixa configuração do Vercel

- Arquivo `.vercel/project.json` com metadados
- Environment variables
- Configurações do projeto

##### 5️⃣ Cache Vercel CLI

```yaml
- name: Cache Vercel CLI
  uses: actions/cache@v4
  with:
    path: ~/.vercel
    key: vercel-cli-${{ runner.os }}
    restore-keys: |
      vercel-cli-${{ runner.os }}
```

**O que faz**: Guarda cache do Vercel CLI

- Próxima execução carrega do cache
- Economiza tempo de download

##### 6️⃣ Build Project Artifacts

```yaml
- name: Build Project Artifacts
  run: vercel build ${{ inputs.prod && '--prod' || '' }} --token=${{ secrets.vercel-token }}
```

```bash
vercel build --prod --token=...
# ou
vercel build --token=...
```

**O que faz**: Faz build da aplicação

- Compila TypeScript → JavaScript
- Minifica código
- Otimiza assets
- Cria pasta `.vercel/output` com tudo pronto

**--prod flag**:

- Se `prod: true` → Otimizações extras para produção
- Se `prod: false` → Build normal

**Resultado**:

```
.vercel/output/
├── config.json
├── functions/
├── static/
└── ...
```

##### 7️⃣ Deploy to Vercel ⭐

```yaml
- name: Deploy to Vercel
  id: deploy_step
  run: |
    DEPLOY_COMMAND="vercel deploy ${{ inputs.prebuilt && '--prebuilt' || '' }} ${{ inputs.prod && '--prod' || '' }} --token=${{ secrets.vercel-token }}"

    if DEPLOY_URL=$($DEPLOY_COMMAND); then
      echo "Deployment successful."
      echo "deployment_url=$DEPLOY_URL" >> $GITHUB_OUTPUT
    else
      DEPLOY_STATUS=$?
      echo "Error: Vercel deploy failed with exit code $DEPLOY_STATUS."
      exit $DEPLOY_STATUS
    fi
```

**O que faz**: Envia build para Vercel

**Flags**:

- `--prebuilt` = Usa build do step anterior (já feito)
- `--prod` = Deploy na URL principal (produção)

**URLs geradas**:

| Cenário    | URL                                  |
| ---------- | ------------------------------------ |
| Production | `https://seu-app.com` (seu domínio)  |
| Develop    | `https://seu-app-develop.vercel.app` |
| Preview    | `https://seu-app-pr-123.vercel.app`  |

**Compartilha URL**: `deployment_url` output para outros jobs

##### 8️⃣ Upload Debug Logs (se falhar)

```yaml
- name: Upload debug logs on failure
  if: failure()
  uses: actions/upload-artifact@v4
  with:
    name: deploy-${{ inputs.environment }}-debug-logs-${{ github.run_number }}
    path: |
      ~/.vercel/
      ~/.npm/_logs/
      /tmp/vercel-*
```

Se deployment falhar, salva logs para debug

##### 9️⃣ Update GitHub Deployment Status

```yaml
- name: Update GitHub Deployment Status
  if: always()
  uses: bobheadxi/deployments@v1.5.0
  with:
    step: finish
    token: ${{ secrets.github-token }}
    env: ${{ inputs.environment }}
    status: ${{ job.status }}
    deployment_id: ${{ steps.deployment.outputs.deployment_id }}
    env_url: ${{ steps.deploy_step.outputs.deployment_url }}
```

**O que faz**: Marca no GitHub que deployment **terminou**

**Resultado**:

```
✅ Production deployment successful
   Environment: https://seu-app.com
   Completed 30 seconds ago
```

---

### `reusable-create-tag.yml`

**Arquivo**: `.github/workflows/reusable-create-tag.yml`

**Propósito**: Centralizar lógica de criação de tags (DRY principle)

#### Definição

```yaml
on:
  workflow_call:
    inputs:
      tag-type:
        required: true
        type: string # "release" ou "beta"
      version:
        required: true
        type: string # "1.0.0"
      commit-sha:
        required: true
        type: string # SHA do commit a taguer
      create-version-commit:
        required: false
        type: boolean
        default: false # Criar commit de version bump?
    outputs:
      tag-name:
        value: ${{ jobs.create-tag.outputs.tag_name }}
        description: "Nome da tag criada"
      tag-created:
        value: ${{ jobs.create-tag.outputs.tag_created }}
        description: "Se tag foi criada"
```

#### Steps Detalhados

##### 1️⃣ Checkout Code

```yaml
- name: Checkout code
  uses: actions/checkout@v4
  with:
    ref: ${{ inputs.commit-sha }}
    fetch-depth: 0
```

- Faz checkout no commit específico
- `fetch-depth: 0` = Baixa todo histórico (necessário para tags)

##### 2️⃣ Validate Inputs

```yaml
- name: Validate inputs
  run: |
    VERSION="${{ inputs.version }}"
    TAG_TYPE="${{ inputs.tag-type }}"

    if [[ "$TAG_TYPE" != "release" && "$TAG_TYPE" != "beta" ]]; then
      echo "::error::Invalid tag type: $TAG_TYPE"
      exit 1
    fi

    if [[ -z "$VERSION" ]]; then
      echo "::error::Version cannot be empty"
      exit 1
    fi

    echo "✅ Input validation passed"
```

**O que faz**: Valida os inputs

| Input      | Validação                    |
| ---------- | ---------------------------- |
| `tag-type` | Deve ser "release" ou "beta" |
| `version`  | Não pode ser vazio           |

##### 3️⃣ Prepare Tag Information

```yaml
- name: Prepare tag information
  id: prepare_tag
  run: |
    VERSION="${{ inputs.version }}"
    TAG_TYPE="${{ inputs.tag-type }}"

    # Remove prefixo release/ se existir
    VERSION=$(echo "$VERSION" | sed 's|^release/||')

    if [ "$TAG_TYPE" = "beta" ]; then
      TAG_NAME="v${VERSION}-beta.${{ github.run_id }}"
      TAG_MESSAGE="Beta Release ${TAG_NAME}"
    else
      TAG_NAME="v${VERSION}"
      TAG_MESSAGE="Release ${TAG_NAME}"
    fi

    echo "TAG_NAME=$TAG_NAME" >> $GITHUB_ENV
    echo "TAG_MESSAGE=$TAG_MESSAGE" >> $GITHUB_ENV
    echo "tag_name=$TAG_NAME" >> $GITHUB_OUTPUT
```

**O que faz**: Prepara nome e mensagem da tag

| Type    | Format                   | Exemplo            |
| ------- | ------------------------ | ------------------ |
| release | v{VERSION}               | v1.0.0             |
| beta    | v{VERSION}-beta.{RUN_ID} | v1.0.0-beta.123456 |

**Run ID**: ID único da execução (cada beta tag é única)

##### 4️⃣ Check if Tag Already Exists

```yaml
- name: Check if tag already exists
  id: check_tag
  run: |
    git fetch --tags
    if git rev-parse "refs/tags/${{ env.TAG_NAME }}" >/dev/null 2>&1; then
      echo "::warning::Tag already exists"
      echo "tag_exists=true" >> $GITHUB_OUTPUT
      echo "tag_created=false" >> $GITHUB_OUTPUT
    else
      echo "Tag does not exist. Proceeding."
      echo "tag_exists=false" >> $GITHUB_OUTPUT
      echo "tag_created=true" >> $GITHUB_OUTPUT
    fi
```

**O que faz**: Verifica se tag já existe

- Se existe → Pula criação (evita duplicação)
- Se não existe → Cria

**Resultado**: Output `tag_exists` e `tag_created`

##### 5️⃣ Create Git Tag

```yaml
- name: Create Git tag
  if: steps.check_tag.outputs.tag_exists == 'false'
  run: |
    git config --global user.name "github-actions[bot]"
    git config --global user.email "github-actions[bot]@users.noreply.github.com"

    git tag "${{ env.TAG_NAME }}" -m "${{ env.TAG_MESSAGE }}"
    git push origin "${{ env.TAG_NAME }}"

    echo "✅ Tag created successfully!"
```

**O que faz**: Cria e faz push da tag

```bash
git tag v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

**Resultado no GitHub**:

- Tag aparece em "Releases"
- Disponível para download
- Histórico versionado

##### 6️⃣ Summary

```yaml
- name: Summary
  if: always()
  run: |
    if [ "${{ steps.check_tag.outputs.tag_exists }}" = "true" ]; then
      echo "ℹ️ Tag already exists. No action taken." >> $GITHUB_STEP_SUMMARY
    else
      echo "✅ Tag created successfully!" >> $GITHUB_STEP_SUMMARY
      echo "**Tag Details:**" >> $GITHUB_STEP_SUMMARY
      echo "- Name: \`${{ env.TAG_NAME }}\`" >> $GITHUB_STEP_SUMMARY
      echo "- Type: \`${{ inputs.tag-type }}\`" >> $GITHUB_STEP_SUMMARY
      echo "- Commit: \`${{ inputs.commit-sha }}\`" >> $GITHUB_STEP_SUMMARY
    fi
```

**O que faz**: Cria resumo da execução no GitHub

**Resultado na UI do GitHub**:

```markdown
✅ Tag created successfully!

Tag Details:

- Name: v1.0.0
- Type: release
- Commit: abc123def456...
```

---

## 🔄 Fluxos de Execução

### Fluxo 1: Feature Development (Feature → PR → Merge em Develop)

```
┌─────────────────────────────────────────────────────────────┐
│                      FEATURE DEVELOPMENT                     │
└─────────────────────────────────────────────────────────────┘

1. Criar feature branch
   $ git checkout -b feature/nova-funcionalidade

2. Fazer commits
   $ git add .
   $ git commit -m "feat: implementar nova feature"
   $ git push origin feature/nova-funcionalidade

3. Abrir PR para develop
   GitHub UI → Create Pull Request
   base: develop ← compare: feature/nova-funcionalidade

4. preview.yml é disparado automaticamente:
   ✅ test-and-lint
   ✅ deploy-preview
   ✅ update-pr-comment
   ⏭️ validate-release-branch (skip - não é PR para main)
   ⏭️ create-beta-tag (skip - não é push em release/*)

5. Comentário no PR:
   🚀 Vercel Preview Deployment
   https://seu-app-pr-456.vercel.app

6. Revisor testa em preview
   ✅ Funcionalidade OK
   ✅ Sem bugs
   ✅ UI/UX ok

7. Fazer merge em develop
   GitHub UI → Merge Pull Request

8. develop.yml é disparado automaticamente:
   ✅ test-and-lint
   ✅ deploy-develop

9. ✅ Aplicação ao vivo em ambiente development
```

### Fluxo 2: Release Preparation (Release Branch → Preview → Main)

```
┌─────────────────────────────────────────────────────────────┐
│                     RELEASE PREPARATION                      │
└─────────────────────────────────────────────────────────────┘

1. Criar release branch de develop
   $ git checkout -b release/1.1.0 develop

2. Atualizar versão em package.json
   $ pnpm version 1.1.0

3. Fazer commit
   $ git add package.json pnpm-lock.yaml
   $ git commit -m "chore: bump version to 1.1.0"
   $ git push origin release/1.1.0

4. preview.yml é disparado:
   ✅ test-and-lint
   ✅ deploy-preview (URL preview)
   ⏭️ validate-release-branch (skip - é push, não PR)
   ✅ create-beta-tag → v1.1.0-beta.123456

5. Testar em preview
   URL: https://seu-app-release.vercel.app

6. Abrir PR release/1.1.0 → main
   GitHub UI → Create Pull Request
   base: main ← compare: release/1.1.0

7. preview.yml é disparado:
   ✅ test-and-lint
   ✅ deploy-preview (mesma URL de antes)
   ✅ validate-release-branch:
      - ✅ Branch é release/*
      - ✅ Versão semântica válida (1.1.0)
      - ✅ package.json = release branch version
   ✅ update-pr-comment (URL preview no PR)
   ✅ create-beta-tag → v1.1.0-beta.987654

8. Comentário de validação no PR:
   ✅ Release Branch Validation
   ✅ Branch name pattern valid
   ✅ Version format valid (1.1.0)
   ✅ Version matches package.json

9. Revisor aprova PR
   ✅ Código OK
   ✅ Testes passam
   ✅ Versão está correta

10. Fazer merge em main
    GitHub UI → Merge Pull Request

11. production.yml é disparado:
    ✅ validate-production:
       - ✅ Versão semântica válida
       - ✅ Sem conflito de tags
    ✅ test-and-lint
    ✅ deploy-production (URL principal)
    ✅ get-version → extrai 1.1.0
    ✅ tag-release → cria v1.1.0

12. ✅ Produção live em seu domínio
    ✅ Tag v1.1.0 criada no GitHub
    ✅ Release v1.1.0 aparece em "Releases"
```

### Fluxo 3: Hotfix (Hotfix Branch → Develop → Release → Produção)

```
┌─────────────────────────────────────────────────────────────┐
│                    HOTFIX PARA PRODUÇÃO                      │
└─────────────────────────────────────────────────────────────┘

1. Criar hotfix de main
   $ git checkout -b hotfix/bug-critico main

2. Fixar bug
   $ git add .
   $ git commit -m "fix: resolver bug crítico em produção"
   $ git push origin hotfix/bug-critico

3. Abrir PR para develop
   (mesma preview.yml)
   ✅ Testes com fix
   ✅ Preview do fix

4. Testar e mergear em develop
   ✅ Fix está funcionando

5. Criar release branch para hotfix
   $ git checkout -b release/1.0.1 develop
   $ pnpm version 1.0.1
   $ git push origin release/1.0.1

6. Abrir PR release/1.0.1 → main
   (mesma validação de release)
   ✅ Tudo validado

7. Mergear em main
   ✅ production.yml
   ✅ Deploy rápido
   ✅ v1.0.1 tagueado

8. ✅ Hotfix em produção
```

---

## 🔐 Segurança e Proteções

### Branch Protection Rules

#### Main Branch (`main`)

```
┌─────────────────────────────────────────┐
│          PROTEÇÃO DA BRANCH MAIN         │
└─────────────────────────────────────────┘

✅ Require pull request reviews before merging
   (Pelo menos 1 aprovação)

✅ Require status checks to pass before merging
   - test-and-lint deve passar
   - deploy-preview deve passar

✅ Require branches to be up to date before merging
   (Evita conflitos)

❌ Permissão de push direto
   (Obriga uso de PR)

❌ PRs de qualquer branch
   (APENAS release/* via validação)
```

#### Develop Branch (`develop`)

```
✅ Require pull request reviews before merging

✅ Require status checks to pass before merging
   - test-and-lint
   - deploy-preview

❌ Permissão de push direto
```

### Secrets Configurados

No GitHub (Settings → Secrets and variables → Actions):

| Secret              | Uso                            | Sensibilidade |
| ------------------- | ------------------------------ | ------------- |
| `VERCEL_ORG_ID`     | Identificar organização Vercel | 🟡 Média      |
| `VERCEL_PROJECT_ID` | Identificar projeto Vercel     | 🟡 Média      |
| `VERCEL_TOKEN`      | Autenticação no Vercel         | 🔴 ALTA       |
| `GITHUB_TOKEN`      | Autenticação no GitHub         | 🔴 ALTA       |

**Proteções**:

- ✅ Nunca aparecem em logs
- ✅ Nunca commitados no código
- ✅ Mascarados com `***` em outputs
- ✅ Apenas lidos por workflows autorizados

### Validações Automáticas

#### Em Preview (PRs release → main)

```
1. ✅ Branch pattern validation
   └─ Apenas release/* pode mergear em main

2. ✅ Version format validation
   └─ Deve ser X.Y.Z (semantic versioning)

3. ✅ Version match validation
   └─ Branch version = package.json version

4. ✅ Comment validation
   └─ Feedback visual no PR
```

#### Em Production (Push em main)

```
1. ✅ Version format validation
   └─ package.json deve ter X.Y.Z

2. ✅ Tag conflict detection
   └─ Avisa se versão já foi deployada

3. ✅ Test execution
   └─ Testes bloqueadores (pass/fail)

4. ✅ Lint execution
   └─ Code style obrigatório
```

### Fluxo de Confiança

```
┌──────────────────────────────────────────────────┐
│                SECURITY CHAIN                     │
└──────────────────────────────────────────────────┘

Code Push
   ↓
test-and-lint ✅ (ou falha)
   ↓
deploy-preview ✅ (ou falha)
   ↓
Humano revisa em preview
   ↓
Humano aprova PR
   ↓
Merge em develop/main
   ↓
production.yml com validações extras
   ↓
Deploy em produção ✅

Toda mudança passa por:
1. Testes automáticos
2. Code review humano
3. Validações extras em prod
4. Deployment seguro
```

---

## 🐛 Guia de Troubleshooting

### Problema 1: Linting Falha

**Sintoma**: `❌ Run linting` falha em test-and-lint

**Causas Comuns**:

1. Variável não usada
2. Importação não usada
3. Código com estilo inconsistente
4. Erro de TypeScript

**Solução**:

```bash
# 1. Ver erros localmente
pnpm run lint

# 2. Tentar auto-fix
pnpm run lint:fix

# 3. Fixar manualmente se necessário
# Ver error message e corrigir

# 4. Fazer commit e push
git add .
git commit -m "fix: lint errors"
git push
```

### Problema 2: Testes Falham

**Sintoma**: `❌ Run tests` falha em test-and-lint

**Causas Comuns**:

1. Teste quebrado pelo código novo
2. Dependência em mock não funcionando
3. Timeout de teste

**Solução**:

```bash
# 1. Rodar testes localmente
pnpm run test:ci

# 2. Ver qual teste falhou
# Mensagem mostra exatamente qual

# 3. Fixar o teste ou o código
# Analisar a falha e corrigir

# 4. Rodar novamente
pnpm run test:ci

# 5. Fazer commit
git add .
git commit -m "fix: test failures"
git push
```

### Problema 3: Deploy Falha

**Sintoma**: `❌ Deploy to Vercel` falha

**Causas Comuns**:

1. Build errou
2. Erro em environment variables
3. Problema com API keys

**Solução**:

```bash
# 1. Ver logs no GitHub Actions
# Actions tab → workflow falhado → deploy-preview/deploy-production
# Ver output do step falhado

# 2. Tentar build localmente
pnpm run build

# 3. Se build local falha
# Fixar o problema e fazer push novamente

# 4. Verificar Vercel settings
# vercel.json está correto?
# Environment variables estão setadas?

# 5. Fazer push novamente
git push
```

### Problema 4: Tag Não Criada

**Sintoma**: Workflow passou mas tag não aparece em "Releases"

**Causas Comuns**:

1. Tag já existia
2. Permissão insuficiente
3. Erro no git config

**Solução**:

```bash
# 1. Verificar tags existentes
git tag -l | grep "v1.0"

# 2. Se tag já existe
# Usar nova versão e fazer push novamente

# 3. Se permissão insuficiente
# Verificar se GITHUB_TOKEN tem permissão de write em contents
# Settings → Actions → General → Permissions

# 4. Ver logs do workflow
# create-beta-tag ou tag-release job
```

### Problema 5: PR Bloqueada na Validação

**Sintoma**: PR em `release/1.0.0` → `main` mostra erro

**Causas Possíveis**:

| Erro                   | Causa                    | Solução                                      |
| ---------------------- | ------------------------ | -------------------------------------------- |
| Branch pattern invalid | Branch não é `release/*` | Recriar branch com padrão correto            |
| Version format invalid | Não é X.Y.Z              | Renomear branch para `release/X.Y.Z`         |
| Version mismatch       | Branch ≠ package.json    | Atualizar `package.json` para versão correta |

**Solução**:

```bash
# Exemplo: PR de feature/xyz para main

# ❌ Erro: Branch pattern invalid

# Solução:
# 1. Fechar PR
# 2. Criar nova branch: release/1.0.0
git checkout -b release/1.0.0

# 3. Cherry-pick commits se necessário
# Ou merge das mudanças

# 4. Abrir nova PR de release/1.0.0 para main
# GitHub UI → Create Pull Request
```

### Problema 6: Cache Não Funciona

**Sintoma**: Build demora muito, cache não funciona

**Causas Comuns**:

1. pnpm-lock.yaml mudou
2. Arquivos de código mudaram
3. Node version diferente

**Solução**:

```bash
# Cache é automático, mas pode invalidar:

# 1. Fazer commit do pnpm-lock.yaml
git add pnpm-lock.yaml
git commit -m "chore: update dependencies"
git push

# 2. Nova execução usa cache da lock file

# 3. Se mesmo assim lento, verificar:
# - Node version consistente (22.x?)
# - pnpm version consistente?
```

---

## 📚 Referências Úteis

### Arquivos Importantes

- `.github/workflows/develop.yml` - Deploy dev
- `.github/workflows/preview.yml` - Deploy preview + validações
- `.github/workflows/production.yml` - Deploy prod + tags
- `.github/workflows/reusable-test-and-lint.yml` - Testes e lint
- `.github/workflows/reusable-deploy-vercel.yml` - Deploy Vercel
- `.github/workflows/reusable-create-tag.yml` - Criação de tags
- `package.json` - Scripts e versão do projeto
- `vercel.json` - Configuração Vercel
- `.eslintrc.cjs` ou `eslint.config.mjs` - Configuração linting

### Comandos Úteis

```bash
# Rodar testes e lint localmente
pnpm run lint
pnpm run test:ci

# Fazer build
pnpm run build

# Desenvolver (com hot reload)
pnpm run dev

# Ver versão atual
node -p "require('./package.json').version"

# Atualizar versão
pnpm version minor  # 1.0.0 → 1.1.0
pnpm version patch  # 1.0.0 → 1.0.1
pnpm version major  # 1.0.0 → 2.0.0
```

### Links

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Deployment Documentation](https://vercel.com/docs)
- [Semantic Versioning](https://semver.org/)
- [pnpm Documentation](https://pnpm.io/)
- [ESLint Documentation](https://eslint.org/docs/rules/)

---

**Última atualização**: Novembro 2, 2025
**Versão**: 1.0.0
**Manutenedor**: GitHub Copilot
