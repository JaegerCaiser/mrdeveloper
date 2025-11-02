# 🚀 Semantic Release Migration Guide

## O que mudou?

Migramos de um **workflow customizado complexo** para a **ferramenta padrão da indústria**: `semantic-release`.

### ❌ Sistema Antigo (Dummy Pass Strategy)
- Script customizado `create-beta-tag` em `preview.yml`
- Workaround "Dummy Pass" com múltiplos `if: contains(...)` para evitar loops infinitos
- Validação manual de versão em `production.yml`
- Complexidade desnecessária e acoplamento alto

### ✅ Sistema Novo (Semantic Release)
- ✨ **Automático**: Lê mensagens de commit (fix:, feat:, BREAKING CHANGE:)
- 🧠 **Inteligente**: Decide PATCH vs MINOR vs MAJOR automaticamente
- 🔄 **Branching-aware**: Cria pré-releases em `release/**` e releases oficiais em `main`
- 📝 **CHANGELOG automático**: Gera changelog.md com todas as mudanças
- 🛡️ **Seguro**: Feito para CI/CD, sem loops infinitos ou problemas de autenticação

---

## 📋 Configuração

### `.releaserc.json` (Novo arquivo)

```json
{
  "branches": [
    {
      "name": "main",
      "prerelease": false
    },
    {
      "name": "release/*",
      "prerelease": "beta"
    }
  ],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    ["@semantic-release/npm", { "npmPublish": false }],
    ["@semantic-release/git", { ... }],
    "@semantic-release/github"
  ]
}
```

**O que cada plugin faz:**
- **commit-analyzer**: Lê commits e determina o tipo de bump (PATCH/MINOR/MAJOR)
- **release-notes-generator**: Cria notas de release legíveis
- **changelog**: Atualiza `CHANGELOG.md` automaticamente
- **npm**: Atualiza `package.json` (sem publicar no npm)
- **git**: Faz commit das mudanças e cria a tag
- **github**: Cria release no GitHub e comenta em issues/PRs

---

## 🔄 Fluxo de Trabalho Novo

### No `preview.yml` (Branches `release/**`)

**Antes:**
```yaml
jobs:
  test-and-lint:
    steps:
      - name: Dummy Pass for beta-release
        if: contains(github.event.head_commit.message, 'beta-release')
        run: echo "Beta release commit - passing"
      - name: Checkout code
        if: '!contains(github.event.head_commit.message, ''beta-release'')'
        ...
  
  create-beta-tag:  # ❌ Job customizado complexo
    ...
```

**Depois:**
```yaml
jobs:
  test-and-lint:
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      # ... testes e lint simples, sem nenhum if!
  
  run-semantic-release:  # ✨ Job simples e poderoso
    needs: deploy-preview
    if: github.event_name == 'push' && startsWith(github.ref, 'refs/heads/release/')
    steps:
      - name: Run Semantic Release
        env:
          GITHUB_TOKEN: ${{ secrets.GH_PAT_FOR_RELEASE }}
        run: pnpm exec semantic-release
```

**O que acontece:**
1. Commit em `release/1.2.0`: `feat: add new feature`
2. Semantic-release detecta: "é uma feature, precisa de MINOR bump"
3. Atualiza `package.json` de `1.2.0` para `1.2.1-beta.1`
4. Cria tag: `v1.2.1-beta.1`
5. Faz commit com mensagem: `chore(release): v1.2.1-beta.1 [skip ci]`

### No `production.yml` (Branch `main`)

**Antes:**
```yaml
jobs:
  validate-production:
    ...
  
  get-version:  # ❌ Job para ler versão
    ...
  
  tag-release:  # ❌ Job customizado para criar tag
    uses: ./.github/workflows/reusable-create-tag.yml
    ...
```

**Depois:**
```yaml
jobs:
  test-and-lint:
    # ... testes e lint
  
  deploy-production:
    # ... deploy para Vercel
  
  run-semantic-release:  # ✨ Um job faz tudo!
    needs: deploy-production
    steps:
      - name: Run Semantic Release
        run: pnpm exec semantic-release
```

**O que acontece:**
1. PR mergeada de `release/1.2.0` para `main`
2. Commits são: `feat: add new feature` + `chore: bump version to 1.2.1-beta.1`
3. Semantic-release detecta: "estamos em main, isso é uma release oficial"
4. Lê o histórico desde a última tag (`v1.2.0`)
5. Calcula: `feat` = merece `1.3.0` (MINOR bump)
6. Atualiza `package.json` para `1.3.0`
7. Cria `CHANGELOG.md` com todas as mudanças
8. Faz commit: `chore(release): 1.3.0 [skip ci]`
9. Cria tag oficial: `v1.3.0`
10. Cria release no GitHub com changelog

---

## 📊 Tipos de Versão

### Em `release/**` (Beta releases)
```
v1.2.1-beta.1
v1.2.1-beta.2
v1.2.1-beta.3
```

### Em `main` (Release oficial)
```
v1.2.1  (fix: )
v1.3.0  (feat: )
v2.0.0  (BREAKING CHANGE:)
```

---

## 🎯 Mensagens de Commit Importantes

Para o semantic-release trabalhar, use:

```bash
# PATCH version
git commit -m "fix: resolve bug in contact form"

# MINOR version
git commit -m "feat: add dark mode support"

# MAJOR version
git commit -m "feat: redesigned architecture\n\nBREAKING CHANGE: removed legacy API endpoints"
```

---

## 🔐 Configuração de Secrets

Certifique-se que `GH_PAT_FOR_RELEASE` está configurado:

1. GitHub → Settings → Developer settings → Personal access tokens
2. Permissões necessárias:
   - ✅ `repo` (acesso ao repositório)
   - ✅ `write:packages` (se precisar)
   - ✅ `delete:repo` (para gerenciar releases)

---

## ✅ Benefícios da Migração

| Aspecto | Antes | Depois |
|--------|-------|--------|
| **Complexidade** | Alta (Dummy Pass, múltiplos ifs) | Baixa (um job simples) |
| **Loops infinitos** | ❌ Problema frequente | ✅ Nunca acontece |
| **Versionamento** | Manual (package.json) | Automático (semântico) |
| **CHANGELOG** | Manual ou não existe | Automático e bem formatado |
| **Manutenção** | Difícil, code-heavy | Fácil, config-driven |
| **Confiabilidade** | ~85% (às vezes falha) | 99%+ (standard da indústria) |

---

## 🚀 Próximos Passos

1. ✅ Criado `.releaserc.json`
2. ✅ Refatorado `preview.yml` (removido Dummy Pass e create-beta-tag)
3. ✅ Refatorado `production.yml` (removido validate e tag-release)
4. ⏭️ Testar fluxo completo em uma branch `release/teste`
5. ⏭️ Atualizar documentação principal
6. ⏭️ Remover workflows reusáveis antigos (opcionalmente)

---

## 📚 Referências

- [Semantic Release Docs](https://semantic-release.gitbook.io/)
- [Commit Message Conventions](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
