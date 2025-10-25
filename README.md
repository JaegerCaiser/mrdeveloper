<div align="center">
  
# 🎨 MR.DEVELOPER Portfolio

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

**Um portfólio moderno e interativo construído com React e TypeScript**

[🌐 Live Demo](https://mrdeveloper.vercel.app) • [📝 Documentação](#-features) • [🚀 Deploy](#-deploy)

</div>

---

## ✨ Features

- 🎭 **Animações Suaves** - Transições elegantes com Framer Motion
- 💎 **Design Glassmorphism** - Interface moderna com efeitos de vidro
- 📱 **Totalmente Responsivo** - Perfeito em qualquer dispositivo
- 🎨 **Gradientes Vibrantes** - Paleta de cores dinâmica e atraente
- ⚡ **Performance Otimizada** - Build otimizado e lazy loading
- 🔍 **SEO Friendly** - Meta tags e estrutura semântica
- 🎯 **TypeScript** - Type safety completo
- 🧪 **Testado** - Cobertura de testes com Jest e React Testing Library
- 🐳 **Docker Ready** - Containerização completa

## 🛠️ Tech Stack

### Core
- **React 18.3.1** - Biblioteca UI moderna
- **TypeScript 5.9.3** - Superset JavaScript tipado
- **Framer Motion 12.23.24** - Biblioteca de animações
- **Lucide React 0.548.0** - Ícones modernos e leves

### Desenvolvimento
- **React Scripts 5.0.1** - Ferramentas de build
- **Jest & Testing Library** - Framework de testes
- **pnpm** - Gerenciador de pacotes rápido

### DevOps
- **Docker** - Containerização
- **Vercel** - Deploy e hosting
- **GitHub Actions** - CI/CD

## 🚀 Quick Start

### Pré-requisitos
```bash
Node.js >= 16.x
pnpm >= 8.x (recomendado) ou npm/yarn
```

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/JaegerCaiser/mrdeveloper.git
cd mrdeveloper
```

2. **Instale as dependências**
```bash
pnpm install
# ou
npm install
```

3. **Inicie o servidor de desenvolvimento**
```bash
pnpm start
# ou
npm start
```

4. **Abra no navegador**
```
http://localhost:3000
```

## 📦 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `pnpm start` | Inicia o servidor de desenvolvimento |
| `pnpm build` | Cria build de produção |
| `pnpm test` | Executa os testes |
| `pnpm test:coverage` | Testes com cobertura |
| `pnpm eject` | Ejeta configuração do CRA (irreversível) |

## 🐳 Docker

### Build da imagem
```bash
docker build -t mrdeveloper .
```

### Executar container
```bash
docker run -p 3000:3000 mrdeveloper
```

### Docker Compose
```bash
docker-compose up
```

## 📁 Estrutura do Projeto

```
mrdeveloper/
├── public/                 # Arquivos estáticos
├── src/
│   ├── assets/            # Imagens e recursos
│   ├── components/        # Componentes React
│   │   ├── common/       # Componentes reutilizáveis
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── GradientText.tsx
│   │   │   ├── Section.tsx
│   │   │   ├── SocialLinks.tsx
│   │   │   └── MustacheIcon.tsx
│   │   ├── Header.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── styles/           # Arquivos CSS
│   ├── App.tsx           # Componente principal
│   ├── index.tsx         # Entry point
│   └── react-app-env.d.ts # Type declarations
├── tsconfig.json         # Configuração TypeScript
├── package.json
├── Dockerfile
└── docker-compose.yml
```

## 🎨 Componentes Reutilizáveis

O projeto utiliza uma arquitetura de componentes bem estruturada:

### Button
```tsx
import { Button } from './components/common';

<Button 
  variant="primary" 
  size="large"
  onClick={handleClick}
>
  Click Me
</Button>
```

### Card
```tsx
import { Card } from './components/common';

<Card variant="glass" hover delay={0.2}>
  <h3>Title</h3>
  <p>Content</p>
</Card>
```

### GradientText
```tsx
import { GradientText } from './components/common';

<GradientText gradient="primary">
  Highlighted Text
</GradientText>
```

> 📖 Veja mais exemplos em [`src/components/ExampleUsage.js`](./src/components/ExampleUsage.js)

## 🧪 Testes

```bash
# Executar todos os testes
pnpm test

# Testes com cobertura
pnpm test -- --coverage

# Modo watch
pnpm test -- --watch
```

## 🌐 Deploy

### Vercel (Recomendado)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/JaegerCaiser/mrdeveloper)

1. Conecte seu repositório no [Vercel](https://vercel.com)
2. Configure as variáveis de ambiente (se necessário)
3. Deploy automático a cada push na main

### Build Manual
```bash
pnpm build
# Arquivos estarão em ./build/
```

## 🎯 Roadmap

- [x] Migração para TypeScript
- [x] Testes unitários
- [x] Docker setup
- [ ] Adicionar modo escuro/claro
- [ ] Implementar i18n (EN/PT)
- [ ] Blog integrado
- [ ] Analytics dashboard
- [ ] Acessibilidade (WCAG AA)

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga os passos:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add: amazing feature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Matheus Caiser**

- GitHub: [@JaegerCaiser](https://github.com/JaegerCaiser)
- LinkedIn: [Matheus Caiser](https://linkedin.com/in/matheus-caiser)
- Portfolio: [mrdeveloper.vercel.app](https://mrdeveloper.vercel.app)

---

<div align="center">

**⭐ Se este projeto te ajudou, deixe uma estrela!**

Made with ❤️ and ☕ by [MR.DEVELOPER](https://github.com/JaegerCaiser)

</div>
