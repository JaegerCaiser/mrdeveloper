# ESLint Configuration

Este projeto usa ESLint para manter a qualidade e consistência do código.

## 📋 Configuração

- **ESLint**: v9.38.0
- **Formato**: ESM (eslint.config.mjs)
- **Plugins**:
  - `eslint-plugin-react` - Regras específicas do React
  - `eslint-plugin-react-hooks` - Validação dos Hooks do React
  - `eslint-plugin-jsx-a11y` - Acessibilidade JSX

## 🚀 Scripts Disponíveis

```bash
# Verificar problemas no código
pnpm lint

# Corrigir problemas automaticamente
pnpm lint:fix
```

## ⚙️ Regras Principais

- ✅ **react/react-in-jsx-scope**: OFF - Não precisa importar React no React 17+
- ⚠️ **react/prop-types**: OFF - PropTypes desabilitado (use TypeScript/JSDoc se necessário)
- ❌ **react-hooks/rules-of-hooks**: ERROR - Hooks devem seguir as regras
- ⚠️ **react-hooks/exhaustive-deps**: WARN - Avisa sobre dependências faltantes
- ⚠️ **no-unused-vars**: WARN - Variáveis não utilizadas (permite padrão `_variavel`)
- ⚠️ **no-console**: WARN - Permite `console.warn` e `console.error`
- ⚠️ **prefer-const**: WARN - Prefira const quando a variável não é reatribuída

## 📁 Arquivos Ignorados

- `node_modules/`
- `build/`
- `dist/`
- `.history/`
- `coverage/`
- `*.config.js`

## 💡 Dicas

### Ignorar warnings de variável não utilizada

Se você tem uma variável que não será usada mas precisa existir (ex: destructuring):

```javascript
// Use underscore como prefixo
const { data, _error } = useQuery();
```

### Console.log em desenvolvimento

Para usar `console.log` temporariamente:

```javascript
// eslint-disable-next-line no-console
console.log("Debug:", value);
```

Ou use `console.warn` ou `console.error` que são permitidos:

```javascript
console.warn("Aviso:", message);
console.error("Erro:", error);
```

## 🔧 Integração com VSCode

Para ver os erros do ESLint diretamente no editor, instale a extensão:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## 📚 Mais Informações

- [ESLint Docs](https://eslint.org/docs/latest/)
- [React ESLint Plugin](https://github.com/jsx-eslint/eslint-plugin-react)
- [React Hooks ESLint Plugin](https://www.npmjs.com/package/eslint-plugin-react-hooks)
