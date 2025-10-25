// Exemplo de como usar os componentes reutilizáveis no projeto
// Este arquivo contém exemplos de uso e pode ser removido em produção

import React from 'react';
import { Code, Zap, Heart } from 'lucide-react';
import { 
  Section, 
  Card, 
  Button, 
  GradientText, 
  SocialLinks
} from './common';

// Exemplo de como refatorar uma seção usando os componentes comuns
function ExampleSection(): React.ReactElement {
  const socialLinks = [
    { type: 'github' as const, url: 'https://github.com/JaegerCaiser', label: 'GitHub' },
    { type: 'linkedin' as const, url: 'https://linkedin.com/in/matheus-caiser', label: 'LinkedIn' },
    { type: 'email' as const, url: 'mailto:matheus@example.com', label: 'E-mail' }
  ];

  return (
    <Section
      id="example"
      title={<>Sobre <GradientText>Mim</GradientText></>}
      subtitle="Desenvolvedor apaixonado por criar experiências digitais incríveis"
      background="gradient"
    >
      <div className="grid grid-3">
        <Card variant="glass" hover>
          <div className="card-icon">
            <Code />
          </div>
          <h3><GradientText gradient="primary">Código Limpo</GradientText></h3>
          <p>Escrevo código maintível e seguindo as melhores práticas.</p>
        </Card>

        <Card variant="glass" hover delay={0.2}>
          <div className="card-icon">
            <Zap />
          </div>
          <h3><GradientText gradient="secondary">Performance</GradientText></h3>
          <p>Foco em otimização para experiências rápidas e fluidas.</p>
        </Card>

        <Card variant="glass" hover delay={0.4}>
          <div className="card-icon">
            <Heart />
          </div>
          <h3><GradientText gradient="warm">Paixão</GradientText></h3>
          <p>Amor pelo que faço e dedicação em cada projeto.</p>
        </Card>
      </div>

      <div className="section-actions">
        <Button variant="primary" size="large">
          Ver Projetos
        </Button>
        
        <Button variant="secondary" size="large">
          Baixar CV
        </Button>
      </div>

      <SocialLinks 
        links={socialLinks}
        variant="filled"
        size="large"
      />
    </Section>
  );
}

export default ExampleSection;
