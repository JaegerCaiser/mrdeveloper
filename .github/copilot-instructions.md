---
applyTo: "**"
---

Provide project context and coding guidelines that AI should follow when generating code, answering questions, or reviewing changes.

# 🤖 GitHub Copilot - Guia de Interação

## ⭐ Princípio Fundamental: Verificar, Depois Agir

**NUNCA confie na memória ou no contexto da conversa. SEMPRE verifique o estado atual do repositório antes de executar qualquer ação.**

- **Antes de Commitar:** Use `git status --porcelain` para confirmar os arquivos a serem commitados.
- **Antes de Fazer Push:** Use `git log --left-right` para comparar a branch local com a remota se houver risco de divergência.
- **Antes de Criar um PR de Release:** Use `git log main..HEAD` para gerar a lista de mudanças a partir da fonte da verdade (o Git), não da memória.
- **Antes de Editar um Arquivo:** Releia o arquivo se houver qualquer dúvida sobre seu estado atual.

Este princípio é a base para evitar retrabalho e garantir que todas as ações sejam deliberadas e baseadas em fatos.

## 📋 Sobre Esta Documentação

Este arquivo serve como guia de referência para futuras interações com o GitHub Copilot no desenvolvimento deste projeto.

## ⚠️ IMPORTANTE: Workflow de Desenvolvimento

### 🌱 Ponto de Partida para Novas Branches

**SEMPRE crie novas branches a partir da base correta!**

- **Para `feature`, `chore`, `fix`, `refactor`:**
  - ✅ Sempre comece a partir da branch `develop` (`git checkout develop && git pull`).
- **Para `hotfix`:**
  - ✅ Sempre comece a partir da branch `main` (`git checkout main && git pull`).
- ❌ **NUNCA** crie uma nova branch a partir de outra branch de trabalho (ex: uma `feature` a partir de outra `feature`). Isso evita a contaminação de históricos de commits entre Pull Requests.

### 🚫 Git Operations

**NUNCA faça operações git automaticamente!**

- ✅ Aguarde o usuário testar as mudanças primeiro
- ✅ Só faça commit/push quando explicitamente solicitado pelo usuário (ver palavras-chave autorizadas abaixo)
- ✅ Permita que o usuário valide as alterações antes de versionar
- ✅ **Explique detalhadamente o que foi feito e quais comandos você pretende executar antes de qualquer ação que modifique o repositório**

Observação importante: esta regra é uma política de segurança — o assistente NÃO executa operações que alterem o repositório sem autorização explícita do usuário. Em outras palavras: "NUNCA faça operações git automaticamente" é a regra por padrão; exceções são permitidas somente quando o usuário dá autorização clara (por exemplo, dizendo exatamente: `pode commitar`, `pode criar uma release`, `criar uma branch`, ou outra frase previamente acordada).

**🔧 Esta restrição aplica-se também a operações que afetam o repositório remoto ou o GitHub:**

- Operações git que modificam histórico (commit, push, reset, rebase, tag)
- Ações do GitHub CLI (`gh`) que criam/editar/remover recursos (PRs, releases, issues)
- Qualquer operação que publique credenciais ou modifique o estado do repositório remoto

Antes de realizar qualquer ação autorizada, o assistente deve executar os checks pré-ação listados na seção "Preconditions" abaixo.

### Preconditions (verificações obrigatórias antes de qualquer ação automática)

- Verificar que o cliente `gh` está instalado: `gh --version`
- Verificar que o usuário está autenticado com `gh`: `gh auth status` (se não autenticado, solicitar ao usuário que autentique manualmente)
- Verificar a branch base esperada (`develop`/`main`) existe remotamente: `git fetch origin && git branch -r | grep origin/develop`
- Confirmar que o working tree local está num estado esperado: `git status --porcelain` (não prosseguir se houver conflitos ou mudanças desconhecidas)
- Verificar permissões de push/tag/PR via `gh` quando aplicável (ou pedir confirmação ao usuário)

Se qualquer pré-condição falhar, não executar a ação; informe o usuário e forneça os comandos que ele pode rodar localmente para habilitar/autorizar a ação.

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
- **⚠️ IMPORTANTE:** Para alguns comandos como `gh pr checks`, use `--json campos | cat` em vez de redirecionar para arquivo, pois podem não mostrar output quando redirecionados
- **Para `gh pr view`**: Sempre use `--json campos | cat` para garantir que o output seja exibido corretamente
- Exemplos: `gh pr list`, `gh pr view --json`, `gh pr checks --json name,state | cat`, `gh issue list`, `gh repo list`

#### 💬 Para comandos interativos ou de ação:

- Execute diretamente no terminal
- Exemplos: `gh pr create`, `gh pr edit`, `gh pr merge`, `gh repo clone`
- **Para TODAS as PRs**: Crie temporariamente um arquivo `.md` com a descrição completa e use `--body-file arquivo.md` para `gh pr create` ou `gh pr edit`
- **Como criar arquivos temporários**: Use a ferramenta `create_file` diretamente ao invés de comandos no terminal com `EOF` para manter o terminal limpo
- **Exemplo**: Crie `pr_description.md` usando `create_file`, depois use `--body-file pr_description.md`

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

1. **Verificar PRs abertas**: `gh pr list --state open --base main --json number,headRefName,title | cat` - verificar se já existe PR de branch `release/*`
2. **Se existir PR release aberta**: Informar ao usuário e perguntar se quer continuar ou mergear a existente primeiro
3. **Ir para develop**: `git checkout develop`
4. **Atualizar develop**: `git pull origin develop`
5. **Criar branch release**: `git checkout -b release/nome-descritivo` (usar nome descritivo baseado no conventional commits, ex: `release/new-authentication-system`, `release/ui-improvements`, `release/bug-fixes`)
6. **Push da branch**: `git push -u origin release/nome-descritivo` (enviar branch para repositório remoto)
7. **Criar PR para main**: Usar `gh pr create` com título "Release: Nome Descritivo" e descrição detalhando todas as mudanças desde a última release. **Analisar profundamente:**
   - Ver commits com `git log main..HEAD`
   - Examinar conteúdo alterado em cada arquivo
   - Entender o contexto e impacto das mudanças
   - **Se não entender o contexto, perguntar ao usuário antes de prosseguir**
   - Comparar com `main` para garantir descrição precisa
8. **Aguardar aprovação**: Não fazer merge automático, aguardar revisão
9. **Merge**: Após aprovação, fazer merge via interface do GitHub (semantic-release criará tag automaticamente)

**IMPORTANTE: Nomenclatura da Release Branch**

- ✅ Use `release/nome-descritivo` (ex: `release/new-authentication-system`)
- ✅ Baseie o nome no conventional commits das mudanças incluídas
- ✅ Exemplos:
  - `release/new-user-dashboard` (para novas features de UI)
  - `release/security-fixes` (para correções de segurança)
  - `release/performance-improvements` (para otimizações)
  - `release/bug-fixes` (para correções gerais)

**Descrição da PR deve incluir:**

- Lista completa de features implementadas
- Correções de bugs
- Melhorias técnicas
- Comparativo com a versão anterior em `main`
- Notas de migração se necessário

### 🛡️ Branch Protection

**A branch \`develop\` está protegida contra commits diretos!**

- ❌ **NUNCA** faça commit direto na \`develop\`
- ✅ **SEMPRE** crie uma branch \`feature/nome-da-feature\` para mudanças
- ✅ Faça PR da feature branch para \`develop\`
- ✅ Só faça merge após revisão e aprovação

**A branch \`main\` está protegida e só aceita merges de:**
- Branches \`release/*\`
- Branches \`hotfix/*\`

### 📝 Documentação

**SEMPRE atualize a documentação após mudanças significativas!**

- ✅ README.md deve refletir estado atual do projeto
- ✅ Arquitetura e features devem estar documentadas
- ✅ Estrutura do projeto deve estar atualizada
- ✅ Scripts e comandos devem estar corretos

## 🏗️ Arquitetura do Projeto

### Visão Geral

**Portfolio React SPA** - Site de portfólio moderno com animações, construído com React 19 + TypeScript + Vite.

**Arquitetura Principal:**

- `src/App.tsx` - Componente raiz que orquestra todas as seções
- **Seções** (`src/sections/`): Hero, About, Experience, Contact - cada uma é uma página independente
- **Componentes** (`src/components/`): Header, Footer, AnimatedBackground - reutilizáveis
- **Serviços** (`src/services/`): contactService.ts - lógica de negócio isolada
- **Hooks** (`src/hooks/`): useContactForm.ts - estado e efeitos encapsulados
- **Estilos** (`src/styles/`): Sistema SCSS centralizado com variáveis e animações

### Padrões de Componentes

```tsx
// ❌ EVITE: Componentes monolíticos com lógica inline
const BadComponent = () => {
  const [data, setData] = useState([]);
  // ... 50 linhas de lógica aqui ...
  return <div>...</div>;
};

// ✅ FAÇA: Separe responsabilidades
// src/services/dataService.ts
export class DataService {
  async fetchData() {
    /* ... */
  }
}

// src/hooks/useData.ts
export const useData = () => {
  const [data, setData] = useState([]);
  // lógica do hook
  return { data, loading, error };
};

// src/components/DataComponent.tsx
const DataComponent = () => {
  const { data, loading } = useData();
  return (
    <div>
      {loading ? "Loading..." : data.map((item) => <Item key={item.id} />)}
    </div>
  );
};
```

### Padrão Service Layer

**Exemplo: `src/services/contactService.ts`**

- Classes singleton para serviços externos
- Interface clara para tipos de dados
- Validação centralizada no serviço
- Tratamento de erros consistente
- Separação entre API calls e validação

### Sistema de Formulários

**Hook Pattern: `src/hooks/useContactForm.ts`**

- Estado unificado do formulário
- Validação em tempo real com limpeza de erros
- Estados de loading e mensagens de status
- Fallback para mailto quando API falha
- Reset automático após sucesso

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

### Ambiente de Desenvolvimento

**⚠️ IMPORTANTE: Sessões de Terminal e Comandos de Ambiente**

- **Sessões Isoladas:** Cada comando que executo no terminal pode iniciar uma nova sessão. Isso significa que comandos que modificam o ambiente (como `nvm use`, `export VAR=valor`, `source .env`) podem não persistir entre diferentes execuções.
- **Solução:** Para garantir que o ambiente esteja configurado corretamente, sempre executarei comandos de setup e os comandos que dependem deles de forma encadeada.
  - **Exemplo 1 (Node.js):** `nvm use && pnpm dev`
  - **Exemplo 2 (Variáveis de Ambiente):** `export API_KEY=123 && npm start`
- **Instrução ao Usuário:** Se eu encontrar um problema relacionado ao ambiente (versão de ferramenta, variável faltando, etc.), vou solicitar a execução do comando encadeado para garantir a consistência.

### Build System Específico

**Vite + TypeScript + Node Version Check:**

- `prebuild` script valida versão do Node antes do build
- Build output vai para `build/` (não `dist/`)
- TypeScript compilation obrigatória antes do Vite
- ESLint com zero warnings permitidos

### CI/CD Workflows

**GitHub Actions Reutilizáveis:**

- `reusable-test-and-lint.yml`: Testes + linting com cache inteligente
- `reusable-deploy-vercel.yml`: Deploy para Vercel com preview/production
- `reusable-release.yml`: Semantic release automation
- Cache de build artifacts (`.vite`, `node_modules/.cache`, `.eslintcache`)

### Workflow Preview - Otimizações Recentes

**Implementado em novembro de 2025 - Resolução de duplicação e status checks quebrados:**

**Problema Resolvido:**

- Workflows `preview.yml` executavam duas vezes (push + PR simultâneos)
- Execuções canceladas apareciam como "failed" nos status checks
- Bloqueava merges mesmo com execução bem-sucedida posterior

**Solução Implementada:**

- **Job `check-duplicate-run`**: Detecta quando há PR aberto para branch release
- **Lógica Condicional**: Jobs downstream só executam se `should_skip != 'true'`
- **Semantic-release**: Só roda em push direto para `release/*` sem PR aberto
- **Status Checks**: Permanecem limpos (jobs pulados não falham)

**Comportamento Atual:**

- ✅ PRs: Executam testes, lint, deploy (semantic-release pula)
- ✅ Push em `release/*`: Executam tudo + semantic-release (se sem PR)
- ✅ Status checks: Sempre limpos, sem "failed" de duplicatas
- ✅ Recursos: Economia de Actions minutes por evitar duplicação

## 📝 Padrões de Commit

**IMPORTANTE: As mensagens de commit controlam o versionamento automático com `semantic-release`. Siga estas regras rigorosamente.**

### Formato

```
tipo(escopo opcional): descrição clara e objetiva

[corpo opcional explicando as mudanças]

[rodapé opcional, ex: BREAKING CHANGE ou referência de issue]
```

### Tipos e Impacto na Versão

- `feat`: **(Minor Release)** Adiciona uma nova funcionalidade. Ex: `feat: adicionar login com Google`.
- `fix`: **(Patch Release)** Corrige um bug. Ex: `fix: corrigir erro no cálculo de impostos`.
- `docs`: Apenas documentação. **Não gera release.**
- `style`: Mudanças de formatação, sem impacto no código. **Não gera release.**
- `refactor`: Refatoração de código sem mudança de comportamento. **Não gera release.**
- `test`: Adição ou correção de testes. **Não gera release.**
- `chore`: Manutenção, build, etc. **Não gera release.**

### Revertendo Commits

- **`revert`**: Para desfazer um commit anterior, **SEMPRE** use o tipo `revert`.
  - **Como usar:** `git revert <hash-do-commit>`
  - **Mensagem:** `revert: feat: adicionar login com Google`
  - **Impacto:** O `semantic-release` irá anular o commit original. Se um `feat` for revertido, ele não gerará mais uma release `minor`.

### Breaking Changes (Major Release)

- Para uma mudança que quebra a compatibilidade (major release), adicione `BREAKING CHANGE:` no rodapé do commit.
- **Exemplo:**

  ```
  feat: refatorar sistema de autenticação

  BREAKING CHANGE: O endpoint de login foi alterado de `/login` para `/auth/login`.
  ```

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

## 🎨 Sistema de Design

### Variáveis SCSS (`src/styles/_variables.scss`)

```scss
// Typography
$font-stack: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
  "Helvetica Neue", Arial, sans-serif;
$font-secondary: "Raleway", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
  "Helvetica Neue", Arial, sans-serif;

// Colors - benscott.dev theme (exact match)
$color-text: #fafafa;
$color-red: #ff4d5a;
$color-background: rgb(26, 26, 26);
$color-background-light: rgb(40, 40, 40);
$color-blue: rgb(81, 162, 233);
$color-blue-dark: rgb(50, 22, 187);

// Layout
$max-width: 1300px;
$section-padding: 100px;
$mobile-padding: 60px;

// Transitions
$transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
```

### Animações

- Canvas-based particle system (`src/utils/Particle.ts`)
- CSS animations centralizadas (`src/styles/animations.scss`)
- Smooth scroll navigation com Intersection Observer

## 🔗 Integrações Externas

### FormSubmit (`src/services/contactService.ts`)

- Endpoint: `https://formsubmit.co/ajax/[hash]`
- Fallback para `mailto:` quando API falha
- Validação client-side + server-side

### Vercel Analytics

- `<Analytics />` component no App.tsx
- Rastreamento automático de page views

### Semantic Release

- Versionamento automático baseado em conventional commits
- Changelog generation
- GitHub releases automáticas

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

_Atualizado em: 6 de novembro de 2025_
_Próxima revisão: Quando necessário_
