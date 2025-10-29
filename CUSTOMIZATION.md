# 🎨 Quick Customization Guide

Replace the placeholder content with your own information:

## ✅ Essential Changes

### 1. **Header Logo** (`src/components/Header.tsx` - line 20)

```typescript
<a href="#hero" className="header__logo">
  YN {/* Replace "BS" with your initials */}
</a>
```

### 2. **Hero Section** (`src/sections/Hero.tsx` - lines 16-19)

```typescript
<h1 className="hero__title">
  Hello, I'm <span className="hero__name">Your Name</span>. {/* Your name */}
  <br />
  I'm a [your role/title]. {/* Your job title */}
</h1>
```

### 3. **Profile Photo**

Replace `src/assets/profile.png` with your photo (recommended: square image, 500x500px or larger)

### 4. **About Bio** (`src/sections/About.tsx` - lines 27-35)

Replace both paragraphs with your own bio.

### 5. **Skills** (`src/sections/About.tsx` - lines 6-15)

```typescript
const skills = [
  "YOUR_SKILL_1",
  "YOUR_SKILL_2",
  // ... add your technologies
];
```

### 6. **Experience** (`src/sections/Experience.tsx` - lines 11-24)

```typescript
const items: ExperienceItem[] = [
  {
    company: "Your Company Name",
    role: "Your Job Title",
    period: "Start Date — End Date (or Present)",
    description: "Brief description of what you did...",
  },
  // Add more items...
];
```

### 7. **Writing/Articles** (`src/sections/Writing.tsx` - lines 6-8)

```typescript
const posts: Post[] = [
  {
    title: "Your Article Title",
    url: "https://your-blog.com/article",
    date: "2025-01-15",
  },
  // Add more posts...
];
```

### 8. **Social Links** (`src/sections/Contact.tsx` - lines 43-51)

```typescript
<a href="https://github.com/your-username" ...>  {/* Your GitHub */}
<a href="mailto:your-email@example.com" ...>     {/* Your Email */}
```

### 9. **Footer Copyright** (`src/sections/Contact.tsx` - line 57)

```typescript
<p>YOUR NAME ©{new Date().getFullYear()}</p>
```

### 10. **Page Title** (`public/index.html` - line 8)

```html
<title>Your Name • Full Stack Developer</title>
```

---

## 🎨 Optional Styling Changes

### Change Colors (`src/styles/_variables.scss`)

```scss
$accent: #64ffda; // Change to your brand color
```

### Adjust Particle Count (`src/components/AnimatedBackground.tsx` - line 33)

```typescript
const particleCount = 80; // Increase/decrease for more/fewer particles
```

---

## 🔌 Integrate Contact Form

The form currently shows a demo alert. To make it functional:

**Option 1: Formspree**

1. Sign up at [formspree.io](https://formspree.io)
2. Update `src/sections/Contact.tsx`:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (response.ok) {
    alert("Message sent!");
    setFormData({ name: "", email: "", message: "" });
  }
};
```

**Option 2: EmailJS**

1. Sign up at [emailjs.com](https://www.emailjs.com)
2. Follow their React integration guide

---

## 🚀 Deploy Checklist

- [ ] Update all personal information
- [ ] Replace profile photo
- [ ] Test all navigation links
- [ ] Test contact form (if integrated)
- [ ] Update social media links
- [ ] Change page title and meta description
- [ ] Run `pnpm build` to verify no errors
- [ ] Choose deployment platform (Vercel, Netlify, etc.)

---

**Need help? Check the main [README.md](./README.md) for detailed documentation.**
