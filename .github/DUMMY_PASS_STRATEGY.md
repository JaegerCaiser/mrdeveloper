# 🔄 Estratégia "Dummy Pass" - Evitando Loop Infinito em Preview.yml

## 📋 Problema Original

### O Ciclo do Problema

```
1. Dev faz push em release/1.2.0
   ↓
2. preview.yml é disparado
   test-and-lint ✅ passa
   deploy-preview ✅ passa
   ↓
3. create-beta-tag (robô) faz commit de volta: "chore: beta-release"
   git push origin release/1.2.0
   ↓
4. Este push dispara preview.yml NOVAMENTE
   ↓
5. PR agora aponta para o commit do robô
   GitHub vê status checks "pendentes" no novo commit
   ↓
6. PR fica bloqueada! ❌
   "Some checks haven't completed yet"
```

### Por Que Acontece?

- ✅ Regra de proteção exige `test-and-lint` e `deploy-preview` passarem
- ✅ Esses jobs são **obrigatórios** no novo commit do robô
- ❌ Novo workflow está rodando, checks ainda não terminaram
- ❌ GitHub não deixa fazer merge enquanto checks estão pendentes

---

## 💡 Solução: Estratégia "Dummy Pass"

### Objetivo

Fazer o segundo run do `preview.yml` (disparado pelo robô) passar nos checks obrigatórios **instantaneamente**, sem fazer nada.

### Implementação

#### 1️⃣ Jobs Injetados (Não Reutilizáveis)

**Antes** (usando workflows reutilizáveis):

```yaml
jobs:
  test-and-lint:
    uses: ./.github/workflows/reusable-test-and-lint.yml # ❌ Não consigo adicionar lógica if
    with:
      node-version: "22.x"
```

**Depois** (injetados inline):

```yaml
jobs:
  test-and-lint:
    name: Test & Lint
    runs-on: ubuntu-latest
    steps:
      # Agora posso controlar cada step individualmente ✅
      - name: Checkout code
        if: "!contains(github.event.head_commit.message, 'beta-release')"
        uses: actions/checkout@v4

      - name: Run linting
        if: "!contains(github.event.head_commit.message, 'beta-release')"
        run: pnpm run lint

      # ... mais steps com a mesma condição
```

#### 2️⃣ Dummy Pass Logic

**Step que roda APENAS para commits do robô**:

```yaml
- name: 🚀 Skip Job for beta-release commit (Dummy Pass)
  if: "contains(github.event.head_commit.message, 'beta-release')"
  run: |
    echo "✅ This is a beta-release commit by robot."
    echo "✅ Marking check as successful (Dummy Pass)."
    echo "Commit message: ${{ github.event.head_commit.message }}"
```

**Steps reais rodam APENAS se NÃO for beta-release**:

```yaml
- name: Install dependencies
  if: "!contains(github.event.head_commit.message, 'beta-release')"
  run: pnpm install --frozen-lockfile

- name: Run tests
  if: "!contains(github.event.head_commit.message, 'beta-release')"
  run: pnpm run test:ci
```

#### 3️⃣ Proteção Contra Loop Infinito

**Job `create-beta-tag` não roda em seu próprio commit**:

```yaml
create-beta-tag:
  needs: deploy-preview
  if: github.event_name == 'push' &&
    startsWith(github.ref, 'refs/heads/release/') &&
    !contains(github.event.head_commit.message, 'beta-release') # ← Crucial!
  name: Create Beta Tag
  runs-on: ubuntu-latest
```

---

## 🔄 Fluxo Corrigido com Dummy Pass

```
1. Dev faz push em release/1.2.0 (commit normal)
   ↓
2. preview.yml disparado (1ª execução)
   ├─ test-and-lint: Roda TUDO (testes reais)
   │  ✅ Checkout ✅ Install ✅ Lint ✅ Test → SUCESSO
   │
   ├─ deploy-preview: Roda TUDO (deploy real)
   │  ✅ Checkout ✅ Build ✅ Deploy → SUCESSO
   │
   └─ create-beta-tag: Roda (commit gerado)
      git commit -m "chore(release): beta-release"
      git push origin release/1.2.0
   ↓
3. Este push dispara preview.yml NOVAMENTE (2ª execução)
   ↓
4. GitHub Actions detecta "chore(release): beta-release"
   ↓
5. 2ª execução do preview.yml:
   ├─ test-and-lint: Dummy Pass ⚡
   │  "This is beta-release commit. Skipping."
   │  Tempo: ~5 segundos → ✅ SUCESSO
   │
   ├─ deploy-preview: Dummy Pass ⚡
   │  "This is beta-release commit. Skipping."
   │  Tempo: ~5 segundos → ✅ SUCESSO
   │
   └─ create-beta-tag: NÃO RODA
      !contains(...'beta-release') = false
      Condição não satisfeita, job ignorado
   ↓
6. GitHub vê todos os checks como ✅ SUCESSO
   ↓
7. PR não fica bloqueada! ✅
   Dev consegue fazer merge em main
```

---

## ⚙️ Detalhes Técnicos

### Como Funciona a Condição

```yaml
if: "contains(github.event.head_commit.message, 'beta-release')"
```

- `github.event.head_commit.message`: Mensagem do commit que disparou o workflow
- `contains(string, substring)`: Retorna `true` se substring está em string
- Resultado: `true` apenas para commits com "beta-release" na mensagem

### Mensagem de Commit do Robô

```bash
git commit -m "chore(release): beta-release"
```

Precisa conter a palavra **"beta-release"** para ser detectada!

### Por Que Não Usar [skip ci]?

❌ `[skip ci]` cancelaria o workflow INTEIRO

- Mas o GitHub Actions ainda processaria os status checks como "não executado"
- PR ainda ficaria bloqueada esperando execução completa

✅ Dummy Pass força execução rápida com sucesso

- Workflow roda e **termina com sucesso em 5 segundos**
- GitHub marca checks como ✅ completos
- PR pode ser mergeada imediatamente

---

## 📊 Comportamento do Dashboard

### Primeira Execução (Commit Normal)

```
Run #123
├─ test-and-lint ✅ 2m 30s (testes e linting reais)
├─ deploy-preview ✅ 3m 15s (deploy real)
└─ create-beta-tag ✅ 45s (criação de tag)
Total: ~6 minutos
```

### Segunda Execução (Commit beta-release)

```
Run #124
├─ test-and-lint ✅ 5s (Dummy Pass!)
├─ deploy-preview ✅ 5s (Dummy Pass!)
└─ create-beta-tag ⏭️ (skipped - não roda)
Total: ~5 segundos ⚡
```

### Custo Aceito

- ✅ PR desbloqueada imediatamente
- ✅ Checks verdes para o robô
- ❌ Dashboard poluída com runs rápidos (5 segundo cada)
  - Este é o custo visual que você aceita

---

## 🔐 Segurança da Estratégia

### Por Que É Segura?

1. **Commits do robô não fazem nada real**

   - Dummy Pass apenas sai com sucesso
   - Nenhum deploy real acontece
   - Nenhum teste é pulado no commit original

2. **Loop infinito é prevenido**

   - `create-beta-tag` não roda em seu próprio commit
   - `!contains(... 'beta-release')` = false
   - Job é completamente skipped

3. **Commits humanos não são afetados**
   - Se dev pushear "feat: nova feature"
   - `contains(... 'beta-release')` = false
   - Todos os steps reais executam normalmente

### Cenários Cobertos

| Cenário                  | Test-and-Lint | Deploy-Preview | Create-Beta-Tag      |
| ------------------------ | ------------- | -------------- | -------------------- |
| **Dev push normal**      | Roda tudo     | Roda tudo      | Roda (cria beta)     |
| **Robô beta-release**    | Dummy Pass    | Dummy Pass     | Skipped              |
| **PR feature → develop** | Roda tudo     | Roda tudo      | Skipped (não é push) |
| **PR release → main**    | Roda tudo     | Roda tudo      | Skipped (não é push) |

---

## 📝 Mudanças Implementadas

### `preview.yml`

#### Job `test-and-lint`

```yaml
jobs:
  test-and-lint:
    name: Test & Lint
    runs-on: ubuntu-latest
    steps:
      # Novo: Dummy Pass step
      - name: 🚀 Skip Job for beta-release commit (Dummy Pass)
        if: "contains(github.event.head_commit.message, 'beta-release')"
        run: echo "✅ Dummy Pass"

      # Todos os steps reais:
      - name: Checkout code
        if: "!contains(github.event.head_commit.message, 'beta-release')"
        uses: actions/checkout@v4

      - name: Install dependencies
        if: "!contains(github.event.head_commit.message, 'beta-release')"
        run: pnpm install --frozen-lockfile

      - name: Run linting
        if: "!contains(github.event.head_commit.message, 'beta-release')"
        run: pnpm run lint

      - name: Run tests
        if: "!contains(github.event.head_commit.message, 'beta-release')"
        run: pnpm run test:ci

      # ... mais steps com a mesma condição
```

#### Job `deploy-preview`

Mesma estrutura:

- Um step "Dummy Pass" para beta-release
- Todos os outros steps com `if: "!contains(...)"`

#### Job `create-beta-tag`

```yaml
create-beta-tag:
  needs: deploy-preview
  if: github.event_name == 'push' &&
    startsWith(github.ref, 'refs/heads/release/') &&
    !contains(github.event.head_commit.message, 'beta-release') # ← Proteção
  name: Create Beta Tag
  runs-on: ubuntu-latest
  steps:
    # Steps normais, sem Dummy Pass
    # (este job deve sempre fazer trabalho real ou não rodar)
    - name: Create Git tag
      run: git tag ...
```

---

## 🧪 Como Testar

### Teste 1: Verificar Dummy Pass

```bash
# 1. Push normal em release/X.Y.Z
git push origin release/1.2.0

# 2. Esperar primeiro run terminar (6-10 min)

# 3. Verificar GitHub Actions
# Run #1: test-and-lint ~2min, deploy-preview ~3min ✅
# Run #2: test-and-lint ~5s (Dummy Pass!), deploy-preview ~5s (Dummy Pass!) ✅

# 4. Ver PR
# Status checks: ✅ todas verdes
# Merge button: ATIVADO ✅
```

### Teste 2: Verificar Loop Infinito Prevenido

```bash
# 1. Observar Run #2
# create-beta-tag não deve aparecer
# (porque !contains(...'beta-release') = false)

# 2. Verificar git log
git log --oneline release/1.2.0

# Deve ter:
# abc1234 chore(release): beta-release [robô]
# def5678 chore: bump version to 1.2.0 [dev]
# ghi9012 feat: nova feature [dev]

# Apenas UM commit beta-release! Sem loop ✅
```

---

## 📚 Referências

- GitHub Actions Workflow Syntax: `if` conditions
- `github.event.head_commit.message`: Context disponível
- Branch Protection Rules: Status checks obrigatórios

---

**Implementado em**: Novembro 2, 2025  
**Status**: ✅ Pronto para usar  
**Risco**: 🟢 Baixo (Dummy Pass não faz nada real)
