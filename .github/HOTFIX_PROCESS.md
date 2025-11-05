# A Regra de Ouro do Hotfix: O Processo Completo

Este documento detalha o fluxo de trabalho padrão da indústria para gerenciar **hotfixes** — correções de emergência para bugs críticos em produção. Seguir este processo garante velocidade, segurança e, acima de tudo, a integridade do código base.

## O que é um Hotfix?

Um **hotfix** é uma correção urgente aplicada a um ambiente de produção para resolver um bug crítico. O objetivo é restaurar a funcionalidade com o **mínimo de risco e o mais rápido possível**, sem introduzir novas funcionalidades que ainda estão em desenvolvimento.

---

## O Fluxo de Hotfix Detalhado

### Passo 1: Criar a Branch de Hotfix a partir da `main`

Este é o passo mais fundamental. A branch de hotfix **SEMPRE** deve ser criada a partir da `main` (ou `master`), pois ela representa o estado exato do que está em produção.

1.  **Sincronizar a `main` local:**

    ```bash
    git checkout main
    git pull origin main
    ```

2.  **Criar a branch de hotfix:** A nomenclatura é crucial para a rastreabilidade.
    ```bash
    # Padrão: hotfix/TICKET-ID-descricao-curta
    git checkout -b hotfix/PROD-452-corrige-falha-login
    ```

**Por que da `main`?** Porque a branch `develop` contém funcionalidades novas e instáveis que não podem ir para produção em uma correção de emergência. O hotfix precisa ser uma alteração cirúrgica no código que já está no ar.

### Passo 2: A Correção Cirúrgica

1.  **Implementação**: O desenvolvedor implementa a correção focada **exclusivamente no bug**.
2.  **Regra de Ouro**: Nada de refatoração ou melhorias de código adjacente. O objetivo é reduzir o risco de introduzir novos problemas.
3.  **Commit**: O commit deve seguir o padrão de **Conventional Commits** para acionar o versionamento automático.
    ```bash
    # O tipo "fix" vai gerar um PATCH release (ex: 1.2.2 -> 1.2.3)
    git commit -m "fix(auth): corrige erro de login para usuários com caracteres especiais"
    ```

### Passo 3: Validação Acelerada

1.  **Push e PR**: A branch de hotfix é enviada para o repositório e uma Pull Request é aberta para a `main`.
2.  **CI/CD e Code Review Prioritário**: A PR dispara testes rigorosos e entra na fila de revisão com prioridade máxima.

### Passo 4: Merge na `main` e Deploy em Produção

1.  **Merge**: Após a aprovação e com o CI verde, a PR é mergida na `main`.
2.  **Workflow de Produção**: O merge na `main` dispara o workflow de produção.
3.  **Versioning Automático**: Ferramentas como o `semantic-release` fazem o bump da versão (ex: `v1.2.2` -> `v1.2.3`), criam a tag no Git e atualizam o `CHANGELOG.md`.
4.  **Deploy**: O workflow faz o deploy da nova versão para produção.

### Passo 5: Sincronização com a `develop` (O Passo Crítico)

Este é o passo que garante a consistência do projeto. A correção **precisa** ser incorporada na `develop` para que o bug não seja reintroduzido no próximo ciclo de release.

**A ordem é estritamente esta:**

1.  **Checkout na `develop` e sincronização:**
    ```bash
    git checkout develop
    git pull origin develop
    ```
2.  **Merge da `main` na `develop`:**
    ```bash
    git merge main
    ```

**Por que esta ordem é inegociável?**

- **Fonte da Verdade**: Você está trazendo para a `develop` o código que foi **validado, aprovado, mergido e deployado**, não uma "tentativa de correção".
- **Commit de Release**: O merge traz também o commit de versionamento (ex: `chore(release): 1.2.3`), mantendo o histórico de versões alinhado entre `main` e `develop`.
- **Prevenção de Divergência**: Evita o cenário perigoso onde a `develop` contém uma correção que, por algum motivo, foi revertida ou falhou no deploy em produção.

### Passo 6: Limpeza

Após o merge bem-sucedido em `main` e `develop`, a branch de hotfix pode ser removida.

```bash
git push origin --delete hotfix/PROD-452-corrige-falha-login
```

---

## Fontes e Leitura Adicional

Este fluxo é uma implementação do padrão **Gitflow**, adaptado para ambientes de CI/CD modernos.

- **A Successful Git Branching Model (O Post Original do Gitflow)** - Vincent Driessen: [https://nvie.com/posts/a-successful-git-branching-model/](https://nvie.com/posts/a-successful-git-branching-model/)
- **Gitflow Workflow - Atlassian Git Tutorial**: [https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
- **Understanding the GitHub Flow**: [https://guides.github.com/introduction/flow/](https://guides.github.com/introduction/flow/) (Nota: O GitHub Flow é mais simples e não tem o conceito de `develop`, mas os princípios de branches de curta duração são relevantes).
