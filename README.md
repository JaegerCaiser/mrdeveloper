<div align="center">
  
# 🎨 Portfolio Website

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

**A modern, animated portfolio website inspired by [benscott.dev](https://benscott.dev/)**

[🌐 Live Demo](#) • [📝 Documentation](#-features) • [🎨 Customization](#-customization-guide)

</div>

---

## ✨ Features

- � **Animated Background** - Canvas-based particle animation in the hero section
- 🎯 **Smooth Scrolling** - Anchor-based navigation with smooth scroll behavior
- 📱 **Responsive Design** - Mobile-first approach with optimized layouts
- ⚡ **Modern Stack** - React 18, TypeScript, SCSS, Framer Motion
- 📧 **Contact Form** - Integrated form with validation
- ♿ **Accessibility** - Semantic HTML and ARIA labels throughout
- � **Custom Theme** - Dark theme with accent colors
- 🔧 **Easy Customization** - Well-structured and documented code

## 🛠️ Tech Stack

### Core
- **React 18.3.1** - UI library
- **TypeScript 5.9.3** - Type safety
- **SCSS** - Styling with variables
- **Framer Motion 12.23.24** - Animations
- **Lucide React 0.548.0** - Modern icons

### Development
- **Create React App 5.0.1** - Build tooling
- **Jest & Testing Library** - Testing framework
- **pnpm** - Fast, efficient package manager

## 🚀 Quick Start

### Prerequisites
```bash
Node.js >= 16.x
pnpm >= 8.x (recomendado) ou npm/yarn
```


```bash
node >= 16.x
pnpm >= 8.x
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
pnpm start
```

4. **Open in browser**
```
http://localhost:3000
```

## 📦 Available Scripts

| Command | Description |
|---------|-----------|
| `pnpm start` | Start development server |
| `pnpm build` | Create production build |
| `pnpm test` | Run tests |
| `pnpm lint` | Lint code |
| `pnpm lint:fix` | Fix linting issues |

## 🎨 Customization Guide

### 1. Personal Information

**Header** (`src/components/Header.tsx`)
- Change logo initials (currently "BS")
- Update navigation links

**Hero Section** (`src/sections/Hero.tsx`)
```typescript
<h1 className="hero__title">
  Hello, I'm <span className="hero__name">Your Name</span>.
  <br />
  I'm a full stack web developer.
</h1>
```

**About Section** (`src/sections/About.tsx`)
- Replace bio paragraphs
- Update skills array:
```typescript
const skills = [
  "HTML", "REACT", "JAVASCRIPT", // your skills
];
```
- Replace `src/assets/profile.png` with your photo

**Experience** (`src/sections/Experience.tsx`)
```typescript
const items: ExperienceItem[] = [
  {
    company: "Your Company",
    role: "Your Role",
    period: "2023 — Present",
    description: "What you did...",
  },
];
```

**Writing** (`src/sections/Writing.tsx`)
```typescript
const posts: Post[] = [
  { title: "Your Article", url: "https://...", date: "2025-01-15" },
];
```

**Contact** (`src/sections/Contact.tsx`)
- Update social media links
- Integrate form service (Formspree, EmailJS, etc.)
- Change copyright name

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
│   └── Header.tsx              # Fixed navigation
├── sections/
│   ├── Hero.tsx               # Landing with animation
│   ├── About.tsx              # Bio + skills
│   ├── Experience.tsx         # Work history
│   ├── Writing.tsx            # Articles
│   └── Contact.tsx            # Contact form
├── styles/
│   ├── _variables.scss        # Theme variables
│   └── layout.scss            # Main styles
├── assets/
│   └── profile.png            # Profile photo
├── App.tsx
└── index.tsx
```

## 🌐 Deployment

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

## � License

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

**Your Name**

- GitHub: [@JaegerCaiser](https://github.com/JaegerCaiser)
- Portfolio: [Your Portfolio URL](#)

---

<div align="center">
  
Made with ❤️ using React + TypeScript

Inspired by [benscott.dev](https://benscott.dev/)

</div>


<div align="center">

**⭐ Se este projeto te ajudou, deixe uma estrela!**

Made with ❤️ and ☕ by [MR.DEVELOPER](https://github.com/JaegerCaiser)

</div>
