# 🎨 Componentes Reutilizáveis - MR.DEVELOPER

Este projeto foi refatorado para incluir componentes reutilizáveis que eliminam duplicação de código e mantêm consistência visual em todo o projeto.

## 📁 Estrutura dos Componentes

```
src/components/common/
├── Button.js + Button.css          # Botão reutilizável com múltiplas variações
├── Card.js + Card.css              # Card com efeito glassmorphism
├── Section.js + Section.css        # Container de seção com animações
├── SocialLinks.js + SocialLinks.css # Links de redes sociais
├── GradientText.js + GradientText.css # Texto com gradiente
├── motionVariants.js               # Variações de animação do Framer Motion
└── index.js                        # Exportações centralizadas
```

## 🔧 Como Usar os Componentes

### 1. **Button Component**

```jsx
import { Button } from './common';
import { Download } from 'lucide-react';

// Botão primário
<Button variant="primary" size="large" icon={<Download />}>
  Baixar CV
</Button>

// Botão secundário
<Button variant="secondary" onClick={handleClick}>
  Saiba Mais
</Button>

// Botão como link
<Button href="#projects" variant="ghost">
  Ver Projetos
</Button>
```

**Props:**

- `variant`: 'primary' | 'secondary' | 'ghost' | 'disabled'
- `size`: 'small' | 'medium' | 'large'
- `icon`: Componente React (ícone do Lucide)
- `href`: String (converte para link)
- `onClick`: Function

### 2. **Section Component**

```jsx
import { Section, GradientText } from "./common";

<Section
  id="about"
  title={
    <>
      Sobre <GradientText>Mim</GradientText>
    </>
  }
  subtitle="Desenvolvedor Full-Stack apaixonado por tecnologia"
  background="gradient"
>
  {/* Conteúdo da seção */}
</Section>;
```

**Props:**

- `id`: String (para navegação)
- `title`: String | React Element
- `subtitle`: String
- `background`: 'default' | 'dark' | 'gradient' | 'glass'

### 3. **Card Component**

```jsx
import { Card } from "./common";

<Card variant="glass" hover delay={0.2}>
  <h3>Título do Card</h3>
  <p>Conteúdo do card...</p>
</Card>;
```

**Props:**

- `variant`: 'glass' | 'solid' | 'gradient' | 'primary' | 'secondary'
- `hover`: Boolean (ativa animação de hover)
- `delay`: Number (atraso da animação)

### 4. **SocialLinks Component**

```jsx
import { SocialLinks } from "./common";

const links = [
  { type: "github", url: "https://github.com/user", label: "GitHub" },
  { type: "linkedin", url: "https://linkedin.com/in/user", label: "LinkedIn" },
  { type: "email", url: "mailto:user@email.com", label: "E-mail" },
];

<SocialLinks links={links} variant="filled" size="large" />;
```

**Props:**

- `links`: Array de objetos com type, url, label
- `variant`: 'default' | 'minimal' | 'filled'
- `size`: 'small' | 'medium' | 'large'

### 5. **GradientText Component**

```jsx
import { GradientText } from "./common";

<h1>
  Olá, eu sou <GradientText gradient="primary">Matheus</GradientText>
</h1>;
```

**Props:**

- `gradient`: 'primary' | 'secondary' | 'accent' | 'rainbow' | 'warm' | 'cool'
- `as`: String (tag HTML, padrão: 'span')

### 6. **Motion Variants**

```jsx
import { containerVariants, itemVariants, fadeInVariants } from "./common";
import { motion } from "framer-motion";

<motion.div variants={containerVariants} initial="hidden" whileInView="visible">
  <motion.div variants={itemVariants}>Conteúdo animado</motion.div>
</motion.div>;
```

**Variantes Disponíveis:**

- `containerVariants`: Container com stagger children
- `itemVariants`: Item com slide up
- `fadeInVariants`: Fade in simples
- `slideInVariants`: Slide horizontal
- `scaleInVariants`: Scale com bounce

## 🎯 Benefícios da Refatoração

### ✅ **Antes vs Depois:**

**❌ ANTES:**

```jsx
// Código duplicado em cada componente
const containerVariants = {
  /* mesmo código */
};
const itemVariants = {
  /* mesmo código */
};

<motion.button
  className="btn btn--primary"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Texto
</motion.button>;
```

**✅ DEPOIS:**

```jsx
// Reutilização simples e limpa
import { Button, containerVariants } from "./common";

<Button variant="primary">Texto</Button>;
```

### 📊 **Melhorias Alcançadas:**

1. **🔄 Reutilização**: Componentes usados em múltiplas páginas
2. **🧹 Código Limpo**: Eliminou ~200 linhas de código duplicado
3. **🎨 Consistência**: Design system unificado
4. **⚡ Manutenção**: Mudanças centralizadas nos componentes
5. **📱 Responsividade**: Breakpoints consistentes
6. **🎭 Animações**: Motion variants padronizados

## 🛠️ Próximos Passos para Aplicar

1. **Substitua gradualmente** os componentes existentes
2. **Use os motion variants** importados ao invés dos locais
3. **Aplique o Section** nas seções About, Projects, Contact
4. **Troque botões** pela versão reutilizável
5. **Unifique social links** em Header e Footer

## 💡 Exemplo de Migração

**Antes:**

```jsx
<motion.section className="about" variants={localVariants}>
  <div className="container">
    <h2>
      Sobre <span className="gradient-text">Mim</span>
    </h2>
    <div className="about__card glass">
      <p>Conteúdo...</p>
    </div>
  </div>
</motion.section>
```

**Depois:**

```jsx
<Section
  title={
    <>
      Sobre <GradientText>Mim</GradientText>
    </>
  }
  background="gradient"
>
  <Card variant="glass">
    <p>Conteúdo...</p>
  </Card>
</Section>
```

Essa refatoração torna o código muito mais limpo, maintível e consistente! 🎉
