# GitHub Actions CI/CD - Gitflow Workflow

Este repositório usa GitHub Actions seguindo o padrão **Gitflow** para CI/CD automatizado.

## 📋 Branches e Workflows

### Branches Principais
- **`main`** - Produção (deploy automático)
- **`develop`** - Desenvolvimento (deploy para staging)

### Branches de Feature
- **`feature/*`** - Novas funcionalidades
- **`release/*`** - Preparação para release
- **`hotfix/*`** - Correções urgentes

## 🚀 Workflows Automáticos

### ✅ Sempre executado:
- **Push** para `main` ou `develop`
- **Pull Requests** para `main` ou `develop`

### 🔄 Jobs Executados:
1. **Test** - Build, lint e testes
2. **Deploy Production** - Apenas em push para `main`
3. **Deploy Staging** - Apenas em push para `develop`

## 🔧 Configuração Necessária

### Secrets do GitHub (Repository Settings > Secrets and variables > Actions)

Adicione estes secrets:

```
VERCEL_TOKEN=your_vercel_token_here
VERCEL_ORG_ID=your_vercel_org_id_here
VERCEL_PROJECT_ID=your_vercel_project_id_here
```

### Como obter os tokens do Vercel:

1. Acesse [Vercel Dashboard](https://vercel.com/dashboard)
2. Settings > Tokens
3. Crie um novo token
4. Para Org ID: `vercel org ls` no terminal
5. Para Project ID: `vercel project ls` no terminal

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
# Criar feature branch
git checkout -b feature/nova-funcionalidade

# Desenvolver e commitar
git add .
git commit -m "feat: adiciona nova funcionalidade"

# Push para GitHub (executa CI)
git push origin feature/nova-funcionalidade

# Criar PR para develop
# Após merge, develop é deployado para staging
```

### Release:
```bash
# Criar release branch
git checkout -b release/v1.0.0

# Merge para main (produção)
git checkout main
git merge release/v1.0.0
git push origin main  # Deploy automático para produção
```

### Hotfix:
```bash
# Criar hotfix branch
git checkout -b hotfix/correcao-urgente

# Após correção, merge para main e develop
git checkout main
git merge hotfix/correcao-urgente
git push origin main

git checkout develop
git merge hotfix/correcao-urgente
git push origin develop
```

## 📊 Status dos Deploys

- **Produção**: https://mrdeveloper.vercel.app
- **Staging**: Verificar no Vercel Dashboard após push para develop

## 🔍 Monitoramento

Os workflows podem ser monitorados em:
**GitHub Repository > Actions**

Cada push/PR irá executar automaticamente os testes de CI.