# GitHub Actions CI/CD - Gitflow Workflow

Este repositório usa GitHub Actions seguindo o padrão **Gitflow** para CI/CD automatizado.

## 📋 Branches e Workflows

### Branches Principais (Gitflow)
- **`main`** - Produção (deploy automático para produção)
- **`develop`** - Desenvolvimento (deploy para staging/preview)

### Branches de Feature/Release
- **`feature/*`** - Novas funcionalidades
- **`release/*`** - Preparação para release
- **`hotfix/*`** - Correções urgentes

## 🚀 Workflows Automáticos

### ✅ Sempre executado:
- **Push** para `main` ou `develop`
- **Pull Requests** para `main` ou `develop`

### 🔄 Jobs Executados:
1. **Test** - Build, lint e testes em todas as execuções
2. **Deploy Production** - Apenas em push direto para `main`

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

# Push para GitHub (executa CI)
git push origin feature/nova-funcionalidade

# Criar PR para develop (não executa deploy)
# Após merge para develop, criar PR para main
```

### Release para Produção:
```bash
# Quando develop estiver pronto para release
git checkout main
git pull origin main
git merge develop
git push origin main  # 🚀 Deploy automático para produção
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

# Merge para main (produção)
git checkout main
git merge hotfix/correcao-urgente
git push origin main  # 🚀 Deploy imediato para produção

# Também merge para develop
git checkout develop
git merge hotfix/correcao-urgente
git push origin develop
```

## 📊 Status dos Deploys

- **Produção**: https://mrdeveloper.vercel.app (deploy automático em push para main)
- **Staging/Preview**: Criar PR para develop ou usar Vercel preview deployments

## 🔍 Monitoramento

Os workflows podem ser monitorados em:
**GitHub Repository > Actions**

Cada push/PR irá executar automaticamente os testes de CI.