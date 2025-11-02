---
applyTo: "**"
---

Provide project context and coding guidelines that AI should follow when generating code, answering questions, or reviewing changes.

# 🤖 GitHub Copilot - Guia de Interação

## 📋 Sobre Esta Documentação

Este arquivo serve como guia de referência para futuras interações com o GitHub Copilot no desenvolvimento deste projeto.

## ⚠️ IMPORTANTE: Workflow de Desenvolvimento

### 🚫 Git Operations

**NUNCA faça operações git automaticamente!**

- ✅ Aguarde o usuário testar as mudanças primeiro
- ✅ Só faça commit/push quando explicitamente solicitado
- ✅ Permita que o usuário valide as alterações antes de versionar
- ✅ **EM VEZ DE FAZER OPERAÇÕES GIT, EXPLIQUE O QUE FOI FEITO**

**📝 Esta restrição se aplica em TODOS os casos onde o usuário vai testar, validar e possivelmente pedir para alterar algo.**

**🔧 Esta restrição também se aplica a operações que afetam o repositório, incluindo:**

- Operações git (commit, push, pull, etc.)
- GitHub CLI (`gh`) para criação/edição de PRs, issues, etc.
- Qualquer operação que modifique o estado do repositório ou GitHub

### ✅ GitHub CLI (gh)

**SEMPRE use o GitHub CLI (`gh`) para interações com o GitHub!**

- ✅ Use `gh pr create` para criar Pull Requests
- ✅ Use `gh pr edit` para atualizar descrições de PRs
- ✅ Use `gh pr view` para visualizar PRs
- ✅ Mantenha o `gh` atualizado para evitar problemas de compatibilidade
- ✅ Prefira CLI sobre interface web quando possível para automação

### 🖥️ Execução de comandos gh

**Sempre execute comandos `gh` de modo que o output seja exibido diretamente no terminal.**

#### 📊 Para comandos que retornam dados estruturados:
- **SEMPRE** redirecione para arquivo temporário
- Use: `gh command ... > temp.json && cat temp.json && rm temp.json`
- Exemplos: `gh pr list`, `gh pr view --json`, `gh issue list`, `gh repo list`

#### 💬 Para comandos interativos ou de ação:
- Execute diretamente no terminal
- Exemplos: `gh pr create`, `gh pr edit`, `gh pr merge`, `gh repo clone`

#### 🧹 Limpeza:
- **SEMPRE** remova arquivos temporários após uso
- **NUNCA** use visualizadores interativos ou pagers

**Exemplo de fluxo recomendado:**

```bash
gh pr list --state open --base main --json number,headRefName,title > prs.json
cat prs.json
rm prs.json
```

**Observação:** Arquivos criados para capturar output de comandos `gh` devem ser tratados como temporários e não versionados.

### ✅ Comando "Pode Comitar"

**Quando o usuário disser "pode commitar", execute o fluxo de Gitflow apropriado:**

**Cenário 1: Branch feature existente com PR aberta:**

1. **Verificar status**: `git status` para ver mudanças pendentes
2. **Verificar PR**: `gh pr view {pr-number}` para confirmar que a PR ainda está aberta
3. **Adicionar arquivos**: `git add .` ou arquivos específicos
4. **Commit**: `git commit -m "tipo: descrição clara"` seguindo padrões de commit
5. **Push**: `git push -u origin nome-da-branch` para enviar para repositório remoto

**Cenário 2: Nova branch feature (primeiro commit):**

1. **Verificar status**: `git status` para ver mudanças pendentes
2. **Adicionar arquivos**: `git add .` ou arquivos específicos
3. **Commit**: `git commit -m "tipo: descrição clara"` seguindo padrões de commit
4. **Push**: `git push -u origin nome-da-branch` para enviar para repositório remoto
5. **Criar PR**: Abrir Pull Request da feature branch para `develop`

**IMPORTANTE: Se a PR já foi mergeada/fechada, NÃO faça mais commits na branch!**

**Fluxo completo:**

```bash
# Primeiro verificar se há mudanças pendentes
git status

# ANTES de qualquer commit, verificar se PR ainda está aberta
gh pr view 64  # substitua pelo número da PR atual

# Só então prosseguir se PR estiver aberta
git add .
git commit -m "feat: descrição da funcionalidade"
git push -u origin feature/nome-da-feature
# Em seguida, criar PR via GitHub interface
```

### ✅ Comando "Pode Criar uma Release"

**Quando o usuário disser "pode criar uma release", execute o fluxo de Release:**

1. **Ir para develop**: `git checkout develop`
2. **Atualizar develop**: `git pull origin develop`
3. **Criar branch release**: `git checkout -b release/X.Y.Z` (onde X.Y.Z é a versão indicada pelo usuário)
4. **Criar PR para main**: Usar `gh pr create` com título "Release vX.Y.Z" e descrição detalhando todas as mudanças desde a última release, comparando com `main`
5. **Aguardar aprovação**: Não fazer merge automático, aguardar revisão
6. **Merge**: Após aprovação, fazer merge via interface do GitHub

**Descrição da PR deve incluir:**

- Lista completa de features implementadas
- Correções de bugs
- Melhorias técnicas
- Comparativo com a versão anterior em `main`
- Notas de migração se necessário

### 🛡️ Branch Protection

**A branch `develop` está protegida contra commits diretos!**

- ❌ **NUNCA** faça commit direto na `develop`
- ✅ **SEMPRE** crie uma branch `feature/nome-da-feature` para mudanças
- ✅ Faça PR da feature branch para `develop`
- ✅ Só faça merge após revisão e aprovação

### 📝 Documentação

**SEMPRE atualize a documentação após mudanças significativas!**

- ✅ README.md deve refletir estado atual do projeto
- ✅ Arquitetura e features devem estar documentadas
- ✅ Estrutura do projeto deve estar atualizada
- ✅ Scripts e comandos devem estar corretos

## 🎯 Padrões de Desenvolvimento

### Estrutura do Projeto

```
src/
├── components/     # Componentes React reutilizáveis
├── hooks/         # Hooks customizados
├── services/      # Serviços e APIs
├── sections/      # Seções da página
├── styles/        # Estilos SCSS
└── utils/         # Utilitários
```

### Convenções de Código

- **TypeScript**: Sempre usar tipagem forte
- **React**: Functional components com hooks
- **Estilos**: SCSS com BEM-like naming
- **Imports**: Agrupar por tipo (React, bibliotecas, locais)

## 🔄 Processo de Refatoração

### Passos Seguidos Recentemente:

1. **Identificar problema**: Código duplicado/misturado
2. **Criar services**: Separar lógica de negócio
3. **Criar hooks**: Encapsular estado e efeitos
4. **Limpar componentes**: Focar apenas na UI
5. **Validar**: Lint + Build + Testes

### Benefícios Alcançados:

- ✅ Separação de responsabilidades
- ✅ Reutilização de código
- ✅ Testabilidade
- ✅ Manutenibilidade

## 🛠️ Ferramentas e Comandos

### Desenvolvimento

```bash
pnpm dev          # Servidor de desenvolvimento
pnpm build        # Build de produção
pnpm lint         # Verificação de código
pnpm lint:fix     # Correção automática
```

### Git Workflow

```bash
git checkout -b feature/nome-da-feature
git add .
git commit -m "tipo: descrição clara"
git push -u origin feature/nome-da-feature
```

## 📝 Padrões de Commit

### Formato

```
tipo: descrição clara e objetiva

[Corpo opcional explicando mudanças]
```

### Tipos

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação/código
- `refactor:` Refatoração
- `test:` Testes
- `chore:` Manutenção

## 🎨 Padrões de UI/UX

### Formulários

- Validação em tempo real
- Mensagens de erro claras
- Estados de loading
- Feedback visual consistente

### Responsividade

- Mobile-first approach
- Breakpoints consistentes
- Teste em múltiplos dispositivos

## 🔧 Configurações Técnicas

### TypeScript

- Strict mode habilitado
- Interfaces para todos os tipos
- Generics quando apropriado

### ESLint

- Regras do React habilitadas
- TypeScript integration
- Formatação consistente

### Vite

- Build otimizado
- HMR para desenvolvimento
- Source maps em desenvolvimento

## 📚 Lições Aprendidas

### Refatoração de Formulários

- Services para lógica de API
- Hooks para estado complexo
- Componentes focados na UI
- Validação centralizada

### Manutenção de Estado

- useState para estado local
- useCallback para otimizações
- useMemo quando necessário
- Evitar prop drilling

## 🚀 Melhorias Futuras

### Possíveis Refatorações

- [ ] Criar hook useLocalStorage
- [ ] Implementar testes unitários
- [ ] Adicionar storybook
- [x] Configurar CI/CD completo

### Performance

- [ ] Code splitting
- [ ] Lazy loading
- [ ] Bundle analysis
- [ ] Service worker

---

_Atualizado em: 2 de novembro de 2025_
_Próxima revisão: Quando necessário_
