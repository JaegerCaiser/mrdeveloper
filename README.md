<div align="center">
  
# 🎨 Portfolio Website

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![CI/CD](https://img.shields.io/github/actions/workflow/status/JaegerCaiser/mrdeveloper/production.yml?branch=main&style=for-the-badge&label=production)](https://github.com/JaegerCaiser/mrdeveloper/actions)
[![CI/CD](https://img.shields.io/github/actions/workflow/status/JaegerCaiser/mrdeveloper/develop.yml?branch=develop&style=for-the-badge&label=develop)](https://github.com/JaegerCaiser/mrdeveloper/actions)

**A modern, animated portfolio website showcasing Matheus Caiser's work as a Full Stack Developer**

[🌐 Live Demo](#) • [📝 Documentation](#-features) • [🎨 Customization](#-customization-guide)

</div>

---

## ✨ Features

- � **Animated Background** - Canvas-based particle animation in the hero section
- 🎯 **Smooth Scrolling** - Anchor-based navigation with smooth scroll behavior
## ✨ Features

- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Dark Theme**: Modern dark color scheme with smooth transitions
- **Interactive Animations**: Canvas-based particle system and scroll animations
- **Clean Architecture**: Separation of concerns with services, hooks, and components layers
- **Type-Safe Contact Form**: Form validation and submission with TypeScript
- **SEO Optimized**: Meta tags and structured data for better search visibility
- **Performance Focused**: Optimized bundle size and lazy loading
- **Accessibility**: ARIA labels and keyboard navigation support
- ⚡ **Modern Stack** - React 18, TypeScript, SCSS, Vite
- 📧 **Contact Form** - Integrated form with validation, services layer, and email integration
- ♿ **Accessibility** - Semantic HTML and ARIA labels throughout
- � **Custom Theme** - Dark theme with accent colors
- 🏗️ **Clean Architecture** - Services, hooks, and components layered approach
- 🔧 **Easy Customization** - Well-structured and documented code

## 🛠️ Tech Stack

### Core
- **React 18.3.1** - UI library
- **TypeScript 5.9.3** - Type safety
- **SCSS** - Styling with variables
- **Vite 7.1.12** - Build tool and dev server
- **Lucide React 0.548.0** - Modern icons
- **React Helmet Async 2.0.5** - Document head management

### Development
- **ESLint 9.38.0** - Code linting
- **Prettier** - Code formatting
- **pnpm** - Fast, efficient package manager

## 🚀 Quick Start

### Prerequisites
```bash
Node.js >= 16.x
pnpm >= 8.x (recommended) or npm/yarn
```

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/JaegerCaiser/mrdeveloper.git
cd mrdeveloper
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Start development server**
```bash
pnpm dev
```

4. **Open in browser**
```
http://localhost:3000
```

## 📦 Available Scripts

| Command | Description |
|---------|-----------|
| `pnpm dev` | Start development server |
| `pnpm build` | Create production build |
| `pnpm preview` | Preview production build locally |
| `pnpm lint` | Lint code |
| `pnpm lint:fix` | Fix linting issues |

## 🚀 CI/CD - GitHub Actions

Este projeto utiliza **GitHub Actions** com infraestrutura completa de CI/CD seguindo o padrão **Gitflow**, proporcionando deploy automatizado e monitoramento contínuo.

### 🌟 Workflows Disponíveis

#### ✅ **Ambiente de Desenvolvimento** (`develop.yml`)
- **Trigger**: Push na branch `develop`
- **Recursos**:
  - 🧪 Testes automatizados (`pnpm run test:ci`)
  - 🔍 Linting (`pnpm run lint`)
  - 🏗️ Build de produção (`pnpm run build`)
  - 🚀 Deploy automático para Vercel (ambiente develop)
  - 📊 Rastreamento de deployments via GitHub Deployments API
  - 📋 Upload de logs de erro em caso de falha

#### ✅ **Ambiente de Preview** (`preview.yml`)
- **Trigger**: Pull Requests + Push em branches `release/*`
- **Recursos**:
  - 🧪 Testes e linting
  - 🚀 Deploy preview no Vercel (por PR)
  - 📋 Sistema de logs de erro inteligente
  - 💬 Comentários automáticos nos PRs com links de preview
  - 🛡️ **Dummy Pass Strategy**: Prevenção de loops infinitos em workflows de release
  - ⚡ Execução condicional baseada em mensagens de commit automatizadas

#### ✅ **Ambiente de Produção** (`production.yml`)
- **Trigger**: Push na branch `main`
- **Recursos**:
  - 🧪 Testes completos e linting
  - 🚀 Deploy automático para produção no Vercel
  - 🏷️ Versionamento automático com tags de release
  - 📋 Logs detalhados de erro
  - 🔒 Controle rigoroso de qualidade

#### ✅ **Validação de Release** (`check-release-branch.yml`)
- **Trigger**: PRs para `main`
- **Recursos**:
  - ✅ Validação de branches de release
  - 📋 Logs de auditoria

### ⚡ Otimizações de Performance

- **Cache Inteligente**: Redução de ~25-40% no tempo de execução
  - 📦 Cache de dependências pnpm
  - 🏗️ Cache de build artifacts (`.vite`, `node_modules/.cache`, `.eslintcache`)
  - 🚀 Cache do Vercel CLI
  - 🔍 Cache do ESLint

### 🔧 Configuração Necessária

#### Secrets do GitHub (Repository Settings > Secrets and variables > Actions)
```
VERCEL_TOKEN=your_vercel_token_here
VERCEL_ORG_ID=your_vercel_org_id_here
VERCEL_PROJECT_ID=your_vercel_project_id_here
```

#### Como obter os tokens do Vercel:
1. Acesse [Vercel Dashboard](https://vercel.com/dashboard)
2. Settings > Tokens → Crie um novo token
3. Para Org ID: Execute `vercel org ls` no terminal
4. Para Project ID: Execute `vercel project ls` no terminal

### 📊 Status dos Deploys

- **🏠 Produção**: [mrdeveloper.vercel.app](https://mrdeveloper.vercel.app) (deploy automático em push para `main`)
- **🧪 Desenvolvimento**: Deploy automático em push para `develop`
- **👀 Preview**: Deploy automático em PRs (comentários com links)

### 🔍 Monitoramento

- **📍 Local**: [GitHub Repository > Actions](https://github.com/JaegerCaiser/mrdeveloper/actions)
- **📋 Logs**: Artefatos de erro disponíveis em caso de falhas
- **🚨 Alertas**: Notificações automáticas em falhas de CI/CD

### 🎯 Fluxo de Desenvolvimento

#### Desenvolvimento Normal:
```bash
# Criar feature branch
git checkout -b feature/nova-funcionalidade

# Desenvolver e commitar
git add .
git commit -m "feat: adiciona nova funcionalidade"

# Push (executa CI automaticamente)
git push origin feature/nova-funcionalidade

# Criar PR para develop (deploy preview automático)
# Após merge, criar PR para main (deploy produção)
```

## 🚀 Recent Improvements

### v1.1.0 - Dummy Pass Strategy & Documentation Enhancement

#### 🛡️ **Dummy Pass Strategy**
- **Problema Resolvido**: Loop infinito em workflows de beta-release causado por commits automatizados
- **Solução**: Estratégia Dummy Pass com execução condicional baseada em mensagens de commit
- **Implementação**: Workflows inline com detecção de `contains(github.event.head_commit.message, 'beta-release')`
- **Resultado**: Prevenção de recursão infinita mantendo funcionalidade completa de CI/CD

#### 📚 **Documentação Aprimorada**
- **Suite Completa**: 4 novos arquivos de documentação em `.github/`
  - `README.md` - Índice central e guia de navegação
  - `WORKFLOW.md` - Documentação completa de CI/CD
  - `DUMMY_PASS_STRATEGY.md` - Explicação técnica da estratégia
  - `DUMMY_PASS_IMPLEMENTATION.md` - Checklist de implementação
- **Instruções do Copilot**: Melhoria nas diretrizes de execução de comandos GitHub CLI
- **Clareza**: Distinção clara entre comandos estruturados vs. interativos

#### 🔧 **Workflows Otimizados**
- **Execução Condicional**: Passos reais só executam para commits manuais
- **Dummy Steps**: ~5 segundos de execução para commits automatizados
- **Loop Prevention**: Proteção adicional contra recursão em jobs de tagging
- **Manutenibilidade**: Estrutura inline para controle granular de condições

## 🎨 Customization Guide

### 1. Personal Information

**Header** (`src/components/Header.tsx`)
- Change logo initials (currently "BS")
- Update navigation links

**Hero Section** (`src/sections/Hero.tsx`)
```typescript
<h1 className="hero__title">
  Hello, I'm <span>Matheus</span>.
  <br />
  I'm a full stack web developer.
</h1>
```

**About Section** (`src/sections/About.tsx`)
- Replace bio paragraphs with personal description
- Update skills array:
```typescript
const skills = [
  "HTML", "REACT", "EXPRESS.JS", "JAVASCRIPT", "CSS", "MONGODB", "GIT", "SASS", "NEXT.JS", "NODE.JS"
];
```
- Replace `src/assets/profile.png` with your photo

**Experience** (`src/sections/Experience.tsx`)
```typescript
const items: ExperienceItem[] = [
  {
    company: "DBC Company (Unicred)",
    role: "Front-end Developer",
    period: "January 2022 — Present",
    description: "Working as front-end developer building products for Unicred's internet banking cooperative...",
  },
  // Add other experiences from experienceData.tsx
];
```

**Contact** (`src/sections/Contact.tsx`)
- Update social media links in Footer component
- Integrate form service (Formspree, EmailJS, etc.)
- Change copyright name to "MATHEUS CAISER"

### 2. Colors & Theme

Edit `src/styles/_variables.scss`:

```scss
$bg: #0a192f;          // Main background
$bg-light: #112240;    // Card backgrounds
$text: #8892b0;        // Body text
$text-bright: #ccd6f6; // Headings
$accent: #64ffda;      // Accent color
```

### 3. Fonts

Update Google Fonts import in `src/index.scss` and variables in `src/styles/_variables.scss`.

### 4. Animated Background

Customize in `src/components/AnimatedBackground.tsx`:

```typescript
const particleCount = 80;           // Number of particles
const connectionDistance = 150;     // Connection distance
```

## 📁 Project Structure

```
src/
├── components/
│   ├── AnimatedBackground.tsx  # Canvas particle animation
│   ├── Header.tsx              # Fixed navigation
│   └── Footer.tsx              # Social links and copyright
├── sections/
│   ├── Hero.tsx               # Landing with animation
│   ├── About.tsx              # Bio + skills
│   ├── Experience.tsx         # Work history
│   └── Contact.tsx            # Contact form (UI only)
├── services/
│   ├── contactService.ts      # Contact form business logic
│   └── index.ts               # Service exports
├── hooks/
│   ├── useContactForm.ts      # Contact form state management
│   └── index.ts               # Hook exports
├── styles/
│   ├── _variables.scss        # Theme variables
│   └── layout.scss            # Main styles
├── assets/
│   └── profile.png            # Profile photo
├── App.tsx
└── main.tsx
```

## 🏗️ Architecture

This project follows **Clean Architecture** principles with clear separation of concerns:

### Services Layer (`src/services/`)
- **Business Logic**: API calls, data validation, and external integrations
- **contactService.ts**: Handles contact form submission to FormSubmit API
- **Error Handling**: Centralized error management and user feedback

### Hooks Layer (`src/hooks/`)
- **State Management**: Custom hooks for component logic
- **useContactForm.ts**: Manages form state, validation, and submission flow
- **Reusability**: Logic can be reused across multiple components

### Components Layer (`src/components/`, `src/sections/`)
- **UI Only**: Pure presentation components focused on rendering
- **Props Interface**: Clear data contracts with TypeScript interfaces
- **Separation**: No business logic, only JSX and styling

### CI/CD Architecture (`.github/workflows/`)
- **Dummy Pass Strategy**: Intelligent workflow execution preventing infinite loops
- **Conditional Logic**: Step-level control based on commit message detection
- **Branch Protection**: Status checks integration with automated beta-release handling
- **Documentation Suite**: Comprehensive CI/CD documentation in `.github/` directory

### Development Workflow
- **Gitflow**: Feature branches → develop → release → main
- **Automated Testing**: Comprehensive CI/CD with preview and production environments
- **Quality Gates**: Linting, building, and deployment validation at each stage

### Vercel
```bash
pnpm build
vercel --prod
```

### Netlify
```bash
pnpm build
netlify deploy --prod --dir=build
```

### GitHub Pages

1. Add to `package.json`:
```json
"homepage": "https://yourusername.github.io/repo-name"
```

2. Install gh-pages:
```bash
pnpm add -D gh-pages
```

3. Add scripts:
```json
"predeploy": "pnpm build",
"deploy": "gh-pages -d build"
```

4. Deploy:
```bash
pnpm deploy
```

## 🐳 Docker

### Build image
```bash
docker build -t portfolio .
```

### Run container
```bash
docker run -p 3000:3000 portfolio
```

### Docker Compose
```bash
docker-compose up
```

## 📋 Changelog

### v1.1.0 (2025-11-02)
- 🛡️ **Dummy Pass Strategy**: Implemented to prevent infinite loops in beta-release workflows
- 📚 **Documentation Suite**: Added comprehensive CI/CD documentation (4 new files in `.github/`)
- 🔧 **Workflow Optimization**: Converted to inline jobs with conditional execution
- 📖 **Copilot Instructions**: Improved GitHub CLI command execution guidelines
- ⚡ **Performance**: Enhanced workflow execution with intelligent caching

### v1.0.0 (2024-10-XX)
- 🚀 Initial release with complete portfolio functionality
- 🎨 Modern design with animated background
- 📧 Contact form with service layer integration
- 🏗️ Clean architecture implementation
- ⚡ Vite build system with TypeScript

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 🙏 Credits

- Design inspiration: [benscott.dev](https://benscott.dev/)
- Icons: [Lucide React](https://lucide.dev/)
- Fonts: [Google Fonts](https://fonts.google.com/)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add: amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Author

**Matheus Caiser**

- GitHub: [@JaegerCaiser](https://github.com/JaegerCaiser)
- Email: [matheus.caiser@gmail.com](mailto:matheus.caiser@gmail.com)

---

<div align="center">
  
Made with ❤️ using React + TypeScript + Vite

Portfolio of Matheus Caiser - Full Stack Developer

</div>


<div align="center">

**⭐ If this project helped you, leave a star!**

Made with ❤️ and ☕ by [Matheus Caiser](https://github.com/JaegerCaiser)

</div>
