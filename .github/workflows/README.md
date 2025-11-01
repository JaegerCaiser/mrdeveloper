# GitHub Actions CI/CD - Infraestrutura Completa

Este repositório utiliza **GitHub Actions** com infraestrutura completa de CI/CD seguindo o padrão **Gitflow**, proporcionando deploy automatizado, monitoramento contínuo e sistema avançado de logs de erro.

## 📋 Branches e Workflows

### Branches Principais (Gitflow)
- **`main`** - Produção (deploy automático para produção)
- **`develop`** - Desenvolvimento (deploy automático para ambiente develop)

### Branches de Feature/Release
- **`feature/*`** - Novas funcionalidades (deploy preview em PRs)
- **`release/*`** - Preparação para release (deploy preview)
- **`hotfix/*`** - Correções urgentes

## 🚀 Workflows Automáticos

### ✅ Sempre executado:
- **Push** para qualquer branch
- **Pull Requests** para branches principais

### 🔄 Jobs Executados:

#### 1. **Ambiente de Desenvolvimento** (`develop.yml`)
- **Trigger**: Push para `develop`
- **Jobs**: Testes + Linting + Build + Deploy Develop
- **Deploy**: Vercel (ambiente develop)
- **Logs**: Upload automático em caso de falha

#### 2. **Ambiente de Preview** (`preview.yml`)
- **Trigger**: PRs + Push para `release/*`
- **Jobs**: Testes + Linting + Deploy Preview
- **Deploy**: Vercel preview deployments
- **Comentários**: Links automáticos nos PRs
- **Logs**: Sistema inteligente de logs de erro

#### 3. **Ambiente de Produção** (`production.yml`)
- **Trigger**: Push direto para `main`
- **Jobs**: Testes + Linting + Build + Deploy + Versionamento
- **Deploy**: Vercel produção + Tags automáticas
- **Logs**: Logs detalhados de auditoria

#### 4. **Validação de Release** (`check-release-branch.yml`)
- **Trigger**: PRs para `main`
- **Jobs**: Validação de branch naming
- **Logs**: Auditoria de releases

## ⚡ Otimizações de Performance

### Cache Inteligente (Redução de ~25-40% no tempo)
- **📦 Dependências pnpm**: Cache baseado em `pnpm-lock.yaml`
- **🏗️ Build Artifacts**: `.vite`, `node_modules/.cache`, `.eslintcache`
- **🚀 Vercel CLI**: Cache do executável do Vercel
- **🔍 ESLint**: Cache de linting com variável `ESLINT_CACHE`

## 🔧 Configuração Necessária

### Secrets do GitHub (Repository Settings > Secrets and variables > Actions)

Adicione estes secrets para deploy no Vercel:

```
VERCEL_TOKEN=your_vercel_token_here
VERCEL_ORG_ID=your_vercel_org_id_here
VERCEL_PROJECT_ID=your_vercel_project_id_here
```

### Como obter os tokens do Vercel:

1. Acesse [Vercel Dashboard](https://vercel.com/dashboard)
2. Settings > Tokens
3. Crie um novo token
4. Para Org ID: Execute `vercel org ls` no terminal
5. Para Project ID: Execute `vercel project ls` no terminal

## 📝 Scripts do Package.json

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "preview": "vite preview",
    "test:ci": "echo 'No tests configured yet - add tests to this script'"
  }
}
```

## 🎯 Fluxo de Trabalho Gitflow

### Desenvolvimento Normal:
```bash
# Criar feature branch a partir de develop
git checkout develop
git pull origin develop
git checkout -b feature/nova-funcionalidade

# Desenvolver e commitar
git add .
git commit -m "feat: adiciona nova funcionalidade"

# Push para GitHub (executa CI automaticamente)
git push origin feature/nova-funcionalidade

# Criar PR para develop
# 🚀 Deploy preview automático gerado
# 🧪 CI executa testes e linting
# 📋 Comentários automáticos com links de preview

# Após aprovação e merge para develop
# 🚀 Deploy automático para ambiente de desenvolvimento

# Quando develop estiver pronto para produção
# Criar PR de develop para main
# 🧪 CI completa (testes + lint + build)
# 🏷️ Versionamento automático
# 🚀 Deploy para produção após merge
```

### Release Estruturado:
```bash
# Preparar release a partir de develop
git checkout develop
git pull origin develop
git checkout -b release/1.2.0

# Testes finais e ajustes
git add .
git commit -m "chore: prepare release 1.2.0"

# Push (executa CI com deploy preview)
git push origin release/1.2.0

# Criar PR de release/1.2.0 para main
# 🧪 CI completa executada
# 🚀 Deploy preview gerado para testes finais

# Após testes e aprovação
# Merge PR → Deploy automático para produção
# 🏷️ Tag 1.2.0 criada automaticamente
```

### Hotfix Urgente:
```bash
# Criar hotfix a partir de main
git checkout main
git pull origin main
git checkout -b hotfix/correcao-urgente

# Corrigir e commitar
git add .
git commit -m "fix: correcao urgente"

# Push (CI executa apenas testes, sem deploy automático)
git push origin hotfix/correcao-urgente

# Criar PR para main
# 🧪 CI completa executada
# 🚀 Após merge: Deploy imediato para produção
# 🏷️ Tag de hotfix criada automaticamente

# Sincronizar com develop
git checkout develop
git merge main  # ou cherry-pick do commit
git push origin develop
```

### 📋 Resumo dos Deploys por Branch:

| Branch | CI/CD | Deploy | Ambiente |
|--------|-------|--------|----------|
| `feature/*` | ✅ Testes + Lint | 👀 Preview (PR) | Vercel Preview |
| `develop` | ✅ Testes + Lint + Build | 🚀 Automático | Vercel Develop |
| `release/*` | ✅ Testes + Lint + Build | 👀 Preview (PR) | Vercel Preview |
| `main` | ✅ Testes + Lint + Build | 🚀 Automático | Vercel Production |
| `hotfix/*` | ✅ Testes + Lint | 👀 Preview (PR) | Vercel Preview |

# Merge para main (produção)
git checkout main
git merge hotfix/correcao-urgente
git push origin main  # 🚀 Deploy imediato para produção

# Sincronizar com develop
git checkout develop
git merge main
git push origin develop
```

---

**📖 Para documentação completa, consulte o [README principal](../../README.md#🚀-cicd---github-actions)**
```

## 📊 Status dos Deploys

- **🏠 Produção**: [mrdeveloper.vercel.app](https://mrdeveloper.vercel.app) (deploy automático em push para `main`)
- **🧪 Desenvolvimento**: Deploy automático em push para `develop`
- **👀 Preview**: Deploy automático em PRs e branches `release/*` (comentários automáticos com links)

## 🔍 Monitoramento

### GitHub Actions
**📍 [Repository > Actions](https://github.com/JaegerCaiser/mrdeveloper/actions)**

Cada push/PR executa automaticamente:
- ✅ Testes de CI (build, lint, testes)
- ✅ Deploy para ambiente apropriado
- 📋 Upload de logs em caso de falha

### Sistema de Logs de Erro
- **📊 Artefatos**: Disponíveis em caso de falhas nos workflows
- **🔍 Detalhes**: Informações completas sobre ambiente, jobs e erros
- **📋 Condições**: Upload automático quando jobs dependentes falham

### Deployments API
- **📊 Rastreamento**: Todos os deploys registrados no GitHub
- **🔗 Links**: Conexão direta com ambientes Vercel
- **📈 Histórico**: Histórico completo de deployments