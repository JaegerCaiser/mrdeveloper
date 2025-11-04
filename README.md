<div align="center">
  
# 🎨 Portfolio Website

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![CI/CD](https://img.shields.io/github/actions/workflow/status/JaegerCaiser/mrdeveloper/production.yml?branch=main&style=for-the-badge&label=production)](https://github.com/JaegerCaiser/mrdeveloper/actions)
[![CI/CD](https://img.shields.io/github/actions/workflow/status/JaegerCaiser/mrdeveloper/preview.yml?branch=release%2Fsemantic-release-and-workflow-fixes&style=for-the-badge&label=preview)](https://github.com/JaegerCaiser/mrdeveloper/actions)
[![CI/CD](https://img.shields.io/github/actions/workflow/status/JaegerCaiser/mrdeveloper/develop.yml?branch=develop&style=for-the-badge&label=develop)](https://github.com/JaegerCaiser/mrdeveloper/actions)

**A modern, animated portfolio website showcasing Matheus Caiser's work as a Full Stack Developer**

[🌐 Live Demo](https://www.mrdeveloper.com.br/) • [📝 Documentation](#features) • [🎨 Customization](#customization-guide)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [📦 Available Scripts](#-available-scripts)
- [🚀 CI/CD - GitHub Actions](#-cicd---github-actions)
  - [🌟 Workflows Disponíveis](#-workflows-disponíveis)
  - [⚡ Otimizações de Performance](#-otimizações-de-performance)
  - [🔧 Configuração Necessária](#-configuração-necessária)
  - [🎯 Fluxo de Desenvolvimento](#-fluxo-de-desenvolvimento)
- [🚀 Recent Improvements](#-recent-improvements)
- [🎨 Customization Guide](#-customization-guide)
- [📁 Project Structure](#-project-structure)
- [🏗️ Architecture](#️-architecture)
- [🚀 Deployment](#-deployment)
- [🐳 Docker](#-docker)
- [📋 Changelog](#-changelog)
- [📄 License](#-license)
- [🙏 Credits](#-credits)
- [🤝 Contributing](#-contributing)
- [👨‍💻 Author](#-author)

---

## 📜 A Regra de Ouro do Hotfix

Para garantir a estabilidade do projeto, seguimos um processo rigoroso e bem definido para correções de emergência em produção. Este fluxo de trabalho é a nossa "Regra de Ouro" para lidar com bugs críticos de forma rápida e segura.

**[➡️ Leia o Guia Completo do Processo de Hotfix](./.github/HOTFIX_PROCESS.md)**

---

## ✨ Features

- **🎨 Modern Portfolio Design** - Clean, responsive portfolio with dark theme
- **⚡ Animated Background** - Canvas-based particle animation system
- **📱 Responsive Design** - Mobile-first approach with adaptive layouts
- **🎯 Smooth Scrolling Navigation** - Anchor-based navigation with smooth scroll behavior
- **📧 Contact Form** - Integrated form with validation and email integration via FormSubmit
- **🏗️ Clean Architecture** - Services, hooks, and components layered approach
- **🔧 Type-Safe Development** - Full TypeScript implementation with strict typing
- **⚡ Performance Optimized** - Vite build system with optimized bundle size
- **♿ Accessibility** - Semantic HTML, ARIA labels, and keyboard navigation
- **🎨 SCSS Styling** - Centralized design system with variables and animations
- **🚀 CI/CD Integration** - GitHub Actions with automated testing and deployment

<a id="tech-stack"></a>

## 🛠️ Tech Stack

### Core

- **React 18.3.1** - UI library with modern hooks and concurrent features
- **TypeScript 5.9.3** - Type safety and enhanced developer experience
- **SCSS 1.93.2** - Advanced CSS preprocessing with variables and mixins
- **Vite 7.1.12** - Fast build tool and development server
- **Lucide React 0.548.0** - Beautiful, customizable icons
- **React Helmet Async 2.0.5** - Document head management for SEO
- **Vercel Analytics 1.5.0** - Privacy-focused web analytics

### Development & Quality

- **ESLint 9.38.0** - Code linting with React and TypeScript rules
- **pnpm 10.20.0** - Fast, efficient package manager (via corepack)
- **Semantic Release 25.0.1** - Automated versioning and changelog generation
- **Vercel CLI 34.2.0** - Deployment and project management

<a id="quick-start"></a>

## 🚀 Quick Start

### Prerequisites

- **Node.js**: A versão exata está definida no arquivo `.nvmrc`. Se você usa `nvm`, apenas rode `nvm use` na raiz do projeto.
- **pnpm**: Versão `10.20.0` ou superior (instalado via `corepack`).

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

<a id="available-scripts"></a>

## 📦 Available Scripts

| Command          | Description                      |
| ---------------- | -------------------------------- |
| `pnpm dev`       | Start development server         |
| `pnpm build`     | Create production build          |
| `pnpm preview`   | Preview production build locally |
| `pnpm lint`      | Lint code with ESLint            |
| `pnpm lint:fix`  | Fix linting issues automatically |
| `pnpm lint:yaml` | Lint YAML files in workflows     |
| `pnpm test:ci`   | Run CI tests (placeholder)       |

<a id="cicd-github-actions"></a>

## 🚀 CI/CD - GitHub Actions

Este projeto utiliza **GitHub Actions** com infraestrutura completa de CI/CD seguindo o padrão **Gitflow**, proporcionando deploy automatizado e monitoramento contínuo.

<a id="workflows-disponíveis"></a>

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

- **Trigger**: Pull Requests para `main` + Push em branches `release/*`
- **Recursos**:
  - 🧪 Testes e linting
  - 🚀 Deploy preview no Vercel (por PR)
  -  Comentários automáticos nos PRs com links de preview
  - 🛡️ **Semantic Release**: Geração de versões beta automáticas em push para `release/*` (quando não há PR aberto).
  - ⚡ **Otimização de Workflow**:
    - **Detecção de Duplicatas**: Um job `check-duplicate-run` verifica se já existe uma execução para o PR, evitando que o workflow de `push` rode desnecessariamente.
    - **Status Checks Limpos**: Jobs são pulados (`skipped`) ao invés de cancelados (`cancelled`), mantendo os status checks do PR sempre corretos e evitando bloqueios de merge.
    - **Economia de Recursos**: Evita o desperdício de *Actions minutes* com execuções duplicadas.

#### ✅ **Ambiente de Produção** (`production.yml`)

- **Trigger**: Push na branch `main`
- **Recursos**:
  - 🧪 Testes completos e linting
  - 🚀 Deploy automático para produção no Vercel
  - 🏷️ Versionamento automático com tags de release
  - 📋 Logs detalhados de erro
  - 🔒 Controle rigoroso de qualidade

<a id="otimizações-de-performance"></a>

### ⚡ Otimizações de Performance

- **Cache Inteligente**: Redução de ~25-40% no tempo de execução
  - 📦 Cache de dependências pnpm
  - 🏗️ Cache de build artifacts (`.vite`, `node_modules/.cache`, `.eslintcache`)
  - 🚀 Cache do Vercel CLI
  - 🔍 Cache do ESLint

<a id="configuração-necessária"></a>

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

- **🏠 Produção**: [www.mrdeveloper.com.br](https://www.mrdeveloper.com.br) (deploy automático em push para `main`)
- **🧪 Desenvolvimento**: Deploy automático em push para `develop`
- **👀 Preview**: Deploy automático em PRs (comentários com links)

### 🔍 Monitoramento

- **📍 Local**: [GitHub Repository > Actions](https://github.com/JaegerCaiser/mrdeveloper/actions)
- **📋 Logs**: Artefatos de erro disponíveis em caso de falhas (veja [Workflows Disponíveis](#workflows-disponíveis))
- **🚨 Alertas**: Notificações automáticas em falhas de CI/CD

<a id="fluxo-de-desenvolvimento"></a>

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

<a id="recent-improvements"></a>

## 🚀 Recent Improvements

### v1.1.0 - Performance Optimization & Corepack Integration

#### ⚡ **Corepack pnpm Integration**

- **Problema Resolvido**: Slow Vercel builds due to `npx pnpm` downloads (~21s overhead)
- **Solução**: Native pnpm support via Node.js corepack integration
- **Implementação**: Added `packageManager: "pnpm@10.20.0"` field and updated `vercel.json` with `corepack pnpm` commands
- **Resultado**: ~55% faster builds (9-13 seconds improvement) with consistent package manager across environments

#### � **CI/CD Workflow Optimization**

- **Problema Resolvido**: ERR_PNPM_BAD_PM_VERSION conflicts between workflow configs and package.json
- **Solução**: Removed version specifications from `pnpm/action-setup@v4` across all workflows
- **Implementação**: Consistent pnpm@10.20.0 usage via packageManager field in all environments
- **Resultado**: Eliminated version conflicts and improved CI/CD reliability

#### � **Semantic Release Migration** (v1.1.x)

- **Problema Resolvido**: Complex manual versioning and changelog management
- **Solução**: Automated semantic versioning based on conventional commits
- **Implementação**: Industry-standard semantic-release with GitHub integration
- **Resultado**: Automatic PATCH/MINOR/MAJOR versioning with generated changelogs

#### 📚 **Streamlined Documentation**

- **2 Core Documentation Files** in `.github/` directory:
  - [`WORKFLOW.md`](../.github/WORKFLOW.md) - Complete CI/CD documentation
  - [`copilot-instructions.md`](../.github/copilot-instructions.md) - AI assistant guidelines
- **Enhanced Copilot Instructions**: Improved GitHub CLI command execution guidelines
- **Clean Structure**: Removed redundant and outdated documentation files

<a id="customization-guide"></a>

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
  "HTML",
  "REACT",
  "EXPRESS.JS",
  "JAVASCRIPT",
  "CSS",
  "MONGODB",
  "GIT",
  "SASS",
  "NEXT.JS",
  "NODE.JS",
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
    description:
      "Working as front-end developer building products for Unicred's internet banking cooperative...",
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
$bg: #0a192f; // Main background
$bg-light: #112240; // Card backgrounds
$text: #8892b0; // Body text
$text-bright: #ccd6f6; // Headings
$accent: #64ffda; // Accent color
```

### 3. Fonts

Update Google Fonts import in `src/index.scss` and variables in `src/styles/_variables.scss`.

### 4. Animated Background

Customize in `src/components/AnimatedBackground.tsx`:

```typescript
const particleCount = 80; // Number of particles
const connectionDistance = 150; // Connection distance
```

<a id="project-structure"></a>

## 📁 Project Structure

```
src/
├── components/
│   ├── AnimatedBackground.tsx    # Canvas particle animation system
│   ├── Header.tsx & Header.scss  # Fixed navigation header
│   ├── Footer.tsx & Footer.scss  # Social links and copyright
│   └── SkillItem.tsx             # Reusable skill item component
├── sections/
│   ├── Hero.tsx & Hero.scss      # Landing section with animations
│   ├── About.tsx & About.scss    # Bio and skills section
│   ├── Experience.tsx & Experience.scss  # Work history
│   ├── Contact.tsx & Contact.scss        # Contact form (UI only)
│   └── experienceData.tsx        # Experience data configuration
├── services/
│   ├── contactService.ts         # Contact form business logic & API
│   ├── index.ts                  # Service exports
│   └── __tests__/                # Service unit tests
├── hooks/
│   ├── useContactForm.ts         # Contact form state management
│   └── index.ts                  # Hook exports
├── styles/
│   ├── _variables.scss           # Theme variables and design tokens
│   ├── animations.scss           # CSS animations and keyframes
│   └── layout.scss               # Main layout and responsive styles
├── utils/
│   └── Particle.ts               # Particle animation utilities
├── assets/
│   ├── profile.png               # Profile photo
│   ├── logo.svg                  # Logo assets
│   └── mustache.svg              # Icon assets
├── App.tsx & App.scss           # Main app component and styles
├── main.tsx                     # App entry point
├── index.scss                   # Global styles
└── react-app-env.d.ts           # TypeScript declarations
```

<a id="architecture"></a>

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

- **Semantic Release**: Automated versioning and changelog generation
- **Conventional Commits**: Intelligent version bumping based on commit types
- **Branch Protection**: Status checks integration with automated release handling
- **Documentation Suite**: Streamlined CI/CD documentation in `.github/` directory

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
"homepage": "https://www.mrdeveloper.com.br/"
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

<a id="docker"></a>

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

<a id="changelog"></a>

## 📋 Changelog

### v1.1.0-beta.1 (2025-11-03)

- ⚡ **Corepack pnpm Integration**: ~55% faster builds with native pnpm support via Node.js corepack
- 🔧 **CI/CD Optimization**: Resolved ERR_PNPM_BAD_PM_VERSION conflicts across all workflows
- 📦 **Package Manager**: Added `packageManager: "pnpm@10.20.0"` field for consistent versioning
- 🚀 **Vercel Performance**: Eliminated npx overhead, reducing build times by 9-13 seconds
- 🛡️ **Semantic Release Migration**: Automated versioning replacing manual release process
- 📚 **Documentation Cleanup**: Streamlined documentation (removed 5 outdated files)
- 🌐 **Custom Domain Setup**: Added homepage field and CNAME file for GitHub Pages custom domain support
- 📖 **README Updates**: Updated project structure, features, and deployment instructions

### v1.0.0 (2024-10-XX)

- 🚀 Initial release with complete portfolio functionality
- 🎨 Modern design with animated background
- 📧 Contact form with service layer integration
- 🏗️ Clean architecture implementation
- ⚡ Vite build system with TypeScript

<a id="license"></a>

## 📄 License

MIT License - feel free to use this template for your own portfolio!

<a id="credits"></a>

## 🙏 Credits

- Design inspiration: [benscott.dev](https://benscott.dev/)
- Icons: [Lucide React](https://lucide.dev/)
- Fonts: [Google Fonts](https://fonts.google.com/)

<a id="contributing"></a>

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add: amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<a id="author"></a>

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
