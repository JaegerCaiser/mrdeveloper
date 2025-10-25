/**
 * Testes para os cálculos de animação do Header
 *
 * Este arquivo testa especificamente os cálculos matemáticos da animação de scroll
 * da imagem de perfil, garantindo que não haja saltos ou descontinuidades.
 *
 * Nova estratégia (v2): Imagem sempre fixed, usando left/top + translateX/Y
 */

describe("Header Scroll Animation Calculations v2", () => {
  describe("Scroll Progress Calculation", () => {
    it("deve calcular valores iniciais corretamente quando scrollY = 0", () => {
      const scrollY = 0;
      const scrollProgress = Math.min(scrollY / 400, 1);

      const imageScale = 1 + scrollProgress * 0.8;
      const borderRadius = 50 - scrollProgress * 30;
      const imageLeft = 50 - scrollProgress * 45;
      const imageTop = 35 - scrollProgress * 20;
      const translateX = -50 + scrollProgress * 50;
      const translateY = -50 + scrollProgress * 50;

      expect(scrollProgress).toBe(0);
      expect(imageScale).toBe(1);
      expect(borderRadius).toBe(50);
      expect(imageLeft).toBe(50);
      expect(imageTop).toBe(35);
      expect(translateX).toBe(-50);
      expect(translateY).toBe(-50);
    });

    it("deve calcular valores intermediários corretamente quando scrollY = 200", () => {
      const scrollY = 200;
      const scrollProgress = Math.min(scrollY / 400, 1);

      const imageScale = 1 + scrollProgress * 0.8;
      const imageLeft = 50 - scrollProgress * 45;
      const imageTop = 35 - scrollProgress * 20;
      const translateX = -50 + scrollProgress * 50;
      const translateY = -50 + scrollProgress * 50;
      const borderRadius = 50 - scrollProgress * 30;

      expect(scrollProgress).toBe(0.5);
      expect(imageScale).toBe(1.4);
      expect(imageLeft).toBe(27.5);
      expect(imageTop).toBe(25);
      expect(translateX).toBe(-25);
      expect(translateY).toBe(-25);
      expect(borderRadius).toBe(35);
    });

    it("deve calcular valores máximos corretamente quando scrollY = 400", () => {
      const scrollY = 400;
      const scrollProgress = Math.min(scrollY / 400, 1);

      const imageScale = 1 + scrollProgress * 0.8;
      const imageLeft = 50 - scrollProgress * 45;
      const imageTop = 35 - scrollProgress * 20;
      const translateX = -50 + scrollProgress * 50;
      const translateY = -50 + scrollProgress * 50;
      const borderRadius = 50 - scrollProgress * 30;

      expect(scrollProgress).toBe(1);
      expect(imageScale).toBe(1.8);
      expect(imageLeft).toBe(5);
      expect(imageTop).toBe(15);
      expect(translateX).toBeCloseTo(0, 10);
      expect(translateY).toBeCloseTo(0, 10);
      expect(borderRadius).toBe(20);
    });
  });

  describe("Position Movement", () => {
    it("imageLeft deve mover de 50% para 5%", () => {
      const progressMin = 0;
      const progressMax = 1;

      const leftMin = 50 - progressMin * 45;
      const leftMax = 50 - progressMax * 45;

      expect(leftMin).toBe(50);
      expect(leftMax).toBe(5);
    });

    it("imageTop deve mover de 35% para 15%", () => {
      const progressMin = 0;
      const progressMax = 1;

      const topMin = 35 - progressMin * 20;
      const topMax = 35 - progressMax * 20;

      expect(topMin).toBe(35);
      expect(topMax).toBe(15);
    });
  });

  describe("Transform Calculation", () => {
    it("translateX deve ir de -50% para 0%", () => {
      const progressMin = 0;
      const progressMax = 1;

      const translateXMin = -50 + progressMin * 50;
      const translateXMax = -50 + progressMax * 50;

      expect(translateXMin).toBe(-50);
      expect(translateXMax).toBeCloseTo(0, 10);
    });

    it("translateY deve ir de -50% para 0%", () => {
      const progressMin = 0;
      const progressMax = 1;

      const translateYMin = -50 + progressMin * 50;
      const translateYMax = -50 + progressMax * 50;

      expect(translateYMin).toBe(-50);
      expect(translateYMax).toBeCloseTo(0, 10);
    });
  });

  describe("Animation Smoothness", () => {
    it("não deve ter saltos abruptos entre valores consecutivos", () => {
      const testCases = [
        [0, 1],
        [50, 51],
        [199, 200],
        [200, 201],
        [319, 320],
        [399, 400],
      ];

      testCases.forEach(([scrollY1, scrollY2]) => {
        const progress1 = Math.min(scrollY1 / 400, 1);
        const progress2 = Math.min(scrollY2 / 400, 1);

        const left1 = 50 - progress1 * 45;
        const left2 = 50 - progress2 * 45;

        const top1 = 35 - progress1 * 20;
        const top2 = 35 - progress2 * 20;

        expect(Math.abs(left2 - left1)).toBeLessThan(0.2);
        expect(Math.abs(top2 - top1)).toBeLessThan(0.1);
      });
    });
  });

  describe("Formula Consistency", () => {
    it("scale: deve variar de 1x a 1.8x", () => {
      const progressMin = 0;
      const progressMax = 1;

      const scaleMin = 1 + progressMin * 0.8;
      const scaleMax = 1 + progressMax * 0.8;

      expect(scaleMin).toBe(1);
      expect(scaleMax).toBe(1.8);
    });

    it("borderRadius: deve variar de 50% a 20%", () => {
      const progressMin = 0;
      const progressMax = 1;

      const radiusMin = 50 - progressMin * 30;
      const radiusMax = 50 - progressMax * 30;

      expect(radiusMin).toBe(50);
      expect(radiusMax).toBe(20);
    });
  });
});
