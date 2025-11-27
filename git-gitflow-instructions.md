# 📋 Instruções Git e Gitflow - Extraídas das Diretrizes

## ⭐ Princípio Fundamental: Verificar, Depois Agir

**NUNCA confie na memória ou no contexto da conversa. SEMPRE verifique o estado atual do repositório antes de executar qualquer ação.**

- **Antes de Commitar:** Use `git status --porcelain` para confirmar os arquivos a serem commitados.
- **Antes de Fazer Push:** Use `git log --left-right` para comparar a branch local com a remota se houver risco de divergência.
- **Antes de Criar um PR de Release:** Use `git log main..HEAD` para gerar a lista de mudanças a partir da fonte da verdade (o Git), não da memória.
- **Antes de Editar um Arquivo:** Releia o arquivo se houver qualquer dúvida sobre seu estado atual.

Este princípio é a base para evitar retrabalho e garantir que todas as ações sejam deliberadas e baseadas em fatos.

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

**🔧 Esta restrição aplica-se também a operações que afetam o repositório remoto:**

- Operações git que modificam histórico (commit, push, reset, rebase, tag)
- Ações que criam/editar/remover recursos (PRs, releases, issues)
- Qualquer operação que publique credenciais ou modifique o estado do repositório remoto

### Preconditions (verificações obrigatórias antes de qualquer ação automática)

- Verificar que o cliente git está configurado corretamente
- Verificar que o usuário tem acesso ao repositório remoto
- Verificar a branch base esperada (`develop`/`main`) existe remotamente: `git fetch origin && git branch -r | grep origin/develop`
- Confirmar que o working tree local está num estado esperado: `git status --porcelain` (não prosseguir se houver conflitos ou mudanças desconhecidas)
- Verificar permissões de push/tag/PR quando aplicável (ou pedir confirmação ao usuário)

Se qualquer pré-condição falhar, não executar a ação; informe o usuário e forneça os comandos que ele pode rodar localmente para habilitar/autorizar a ação.

### ✅ Comando "Pode Comitar"

**Quando o usuário disser "pode commitar", execute o fluxo de Gitflow apropriado:**

**Cenário 1: Branch feature existente com PR aberta:**

1. **Verificar status**: `git status` para ver mudanças pendentes
2. **Verificar PR**: Verificar se a PR ainda está aberta na interface web
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
# Verificar na interface web do repositório

# Só então prosseguir se PR estiver aberta
git add .
git commit -m "feat: descrição da funcionalidade"
git push -u origin feature/nome-da-feature
# Em seguida, criar PR via interface web
```

### ✅ Comando "Pode Criar uma Release"

**Quando o usuário disser "pode criar uma release", execute o fluxo de Release:**

1. **Verificar PRs abertas**: Verificar se já existe PR de branch `release/*` na interface web
2. **Se existir PR release aberta**: Informar ao usuário e perguntar se quer continuar ou mergear a existente primeiro
3. **Ir para develop**: `git checkout develop`
4. **Atualizar develop**: `git pull origin develop`
5. **Criar branch release**: `git checkout -b release/nome-descritivo` (usar nome descritivo baseado no conventional commits, ex: `release/new-authentication-system`, `release/ui-improvements`, `release/bug-fixes`)
6. **Push da branch**: `git push -u origin release/nome-descritivo` (enviar branch para repositório remoto)
7. **Criar PR para main**: Criar PR com título "Release: Nome Descritivo" e descrição detalhando todas as mudanças desde a última release. **Analisar profundamente:**
   - Ver commits com `git log main..HEAD`
   - Examinar conteúdo alterado em cada arquivo
   - Entender o contexto e impacto das mudanças
   - **Se não entender o contexto, perguntar ao usuário antes de prosseguir**
   - Comparar com `main` para garantir descrição precisa
8. **Aguardar aprovação**: Não fazer merge automático, aguardar revisão
9. **Merge**: Após aprovação, fazer merge via interface web (semantic-release criará tag automaticamente)

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

- Branches \`release/\*\`
- Branches \`hotfix/\*\`

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

---

_Extraído e adaptado das diretrizes do projeto em 7 de novembro de 2025 - Compatível com GitHub e Azure DevOps_</content>
<parameter name="filePath">/home/matheus/Desenvolvimento/personal/mrdeveloper/git-gitflow-instructions.md
