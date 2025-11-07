# Tutorial: Schema do GitHub Actions - Entendendo Workflows

## 🎯 Introdução

Este tutorial explica como funciona o **schema do GitHub Actions**, com foco em erros comuns e melhores práticas. Baseado em experiências reais de debugging.

## 📋 O que é o Schema do GitHub Actions?

O schema define **regras específicas** para escrever workflows YAML. Diferente do YAML comum, o GitHub Actions tem **sintaxe própria** para certas funcionalidades.

### ❌ Erro Comum: YAML válido ≠ Workflow válido

```yaml
# ❌ YAML válido, mas ERRO no GitHub Actions
if: "always() && !contains(github.event.head_commit.message, 'chore(release)')"

# ✅ Correto no GitHub Actions
if: always() && !contains(github.event.head_commit.message, 'chore(release)')
```

## 🔧 Condições `if` - A Armadilha Mais Comum

### Regras Fundamentais

1. **Não use aspas** em expressões com funções
2. **Aspas só** para strings literais
3. **Funções** como `always()`, `contains()`, `startsWith()` não precisam de aspas

### Exemplos Práticos

#### ✅ Correto

```yaml
# Funções sem aspas
if: always()
if: contains(github.event.head_commit.message, 'fix')
if: startsWith(github.event.ref, 'refs/tags/')

# Combinações
if: always() && !contains(github.event.head_commit.message, 'chore(release)')
if: github.event_name == 'pull_request' && github.event.action == 'opened'

# Com variáveis
if: needs.test-job.outputs.success == 'true'
```

#### ❌ Errado

```yaml
# Aspas desnecessárias
if: "always()"
if: "contains(github.event.head_commit.message, 'fix')"

# Aspas em combinações (QUEBRAM tudo)
if: "always() && !contains(github.event.head_commit.message, 'chore(release)')"
```

### Por que isso acontece?

- GitHub Actions trata aspas como **strings literais**
- `"always()"` vira uma string, não uma função
- O parser espera uma **expressão booleana**, não uma string

## 🏗️ Estrutura de um Workflow

### Jobs e Dependências

```yaml
jobs:
  job-a:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Job A"

  job-b:
    needs: job-a # ✅ Correto: referência simples
    if: needs.job-a.result == 'success' # ✅ Correto: expressão
    runs-on: ubuntu-latest
```

### Outputs entre Jobs

```yaml
jobs:
  test:
    outputs:
      code-changed: ${{ steps.filter.outputs.code }}
    steps:
      - id: filter
        run: echo "code=true" >> $GITHUB_OUTPUT

  deploy:
    needs: test
    if: needs.test.outputs.code-changed == 'true' # ✅ Correto
    runs-on: ubuntu-latest
```

## 🎭 Contextos e Variáveis

### Contextos Disponíveis

- `github.*` - Informações do evento
- `env.*` - Variáveis de ambiente
- `vars.*` - Variáveis do repositório
- `secrets.*` - Segredos
- `needs.*` - Outputs de jobs
- `steps.*` - Outputs de steps

### Exemplos de Uso

```yaml
# Contexto github
if: github.event_name == 'pull_request'
if: github.base_ref == 'main'

# Contexto needs
if: needs.build.result == 'success'

# Contexto env
if: env.NODE_ENV == 'production'
```

## 🔄 Estratégias de Debugging

### Checklist Sistemático

1. **Sintaxe YAML básica**

   ```bash
   pnpm lint:yaml
   ```

2. **Validação de estrutura**

   ```bash
   python3 -c "import yaml; yaml.safe_load(open('workflow.yml'))"
   ```

3. **Teste de expressões**

   - Verifique condições `if` sem aspas
   - Teste funções uma por vez
   - Use `always()` para debug

4. **Validação no GitHub**
   - Push e veja se workflow roda
   - Verifique logs de erro específicos

### Erros Comuns e Soluções

| Erro                                 | Causa                  | Solução                    |
| ------------------------------------ | ---------------------- | -------------------------- |
| `Unexpected symbol: '"always'`       | Aspas em funções       | Remova aspas               |
| `needs.job-a.outputs is not defined` | Job não tem outputs    | Defina outputs no job      |
| `contains is not defined`            | Função não reconhecida | Use `contains()` sem aspas |
| Workflow não dispara                 | Problema no `on:`      | Verifique triggers         |

## 🚀 Melhores Práticas

### 1. Teste Incremental

```yaml
# Comece simples
if: always()

# Adicione complexidade gradualmente
if: always() && github.event_name == 'push'

# Teste final
if: always() && !contains(github.event.head_commit.message, 'skip')
```

### 2. Use IDs em Steps

```yaml
steps:
  - id: test
    run: echo "success=true" >> $GITHUB_OUTPUT

  - name: Deploy
    if: steps.test.outputs.success == 'true'
    run: echo "Deploying..."
```

### 3. Valide Sempre

- Use `pnpm lint:yaml` antes de commitar
- Teste workflows em branches separadas
- Leia logs de erro com atenção

### 4. Documente Lógica Complexa

```yaml
# ❌ Sem comentário
if: always() && !contains(github.event.head_commit.message, 'chore(release)')

# ✅ Com explicação
# Sempre rode, mas pule se for commit de release automático
if: always() && !contains(github.event.head_commit.message, 'chore(release)')
```

## 🎯 Conclusão

O schema do GitHub Actions é **poderoso mas rigoroso**. Os erros mais comuns vêm de:

1. **Aspas desnecessárias** em condições `if`
2. **Sintaxe incorreta** de funções
3. **Referências erradas** a contextos

**Lembre-se:** Debugging sistemático > Tentativa e erro!

---

_Baseado em experiências reais de debugging de workflows complexos._
