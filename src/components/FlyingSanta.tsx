/* eslint-disable react/no-unknown-property */
import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Group } from "three";

// Cores
const COLORS = {
  red: "#D42426",
  white: "#F2F2F2",
  skin: "#FFCCAA",
  black: "#1A1A1A",
  gold: "#FFD700",
};

const SantaModel = () => {
  const group = useRef<Group>(null!);
  const rightArmRef = useRef<Group>(null!);
  const leftArmRef = useRef<Group>(null!);
  const rightLegRef = useRef<Group>(null!);
  const leftLegRef = useRef<Group>(null!);
  const headRef = useRef<Group>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Animação de "Tchau" (Braço Direito)
    if (rightArmRef.current) {
      // Levanta o braço e acena
      rightArmRef.current.rotation.z = Math.PI * 0.7; // Levanta
      rightArmRef.current.rotation.x = Math.sin(t * 8) * 0.3; // Acena rápido
    }

    // Animação de Voo (Braço Esquerdo - Superman style ou relaxado)
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = -Math.PI * 0.2;
      leftArmRef.current.rotation.x = Math.sin(t * 2) * 0.1;
    }

    // Pernas balançando suavemente
    if (rightLegRef.current && leftLegRef.current) {
      rightLegRef.current.rotation.x = Math.sin(t * 3) * 0.2;
      leftLegRef.current.rotation.x = Math.cos(t * 3) * 0.2;
    }

    // Cabeça virando levemente
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 1) * 0.2;
    }

    // Corpo flutuando (bobbing)
    if (group.current) {
      group.current.position.y = Math.sin(t * 2) * 0.1;
      // Leve inclinação para frente (voo)
      group.current.rotation.x = 0.2;
    }
  });

  return (
    <group ref={group}>
      {/* Tronco */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1.2, 0.8]} />
        <meshStandardMaterial color={COLORS.red} />
      </mesh>

      {/* Cinto */}
      <mesh position={[0, -0.2, 0]} scale={[1.05, 1, 1.05]}>
        <boxGeometry args={[1, 0.2, 0.8]} />
        <meshStandardMaterial color={COLORS.black} />
      </mesh>
      <mesh position={[0, -0.2, 0.45]}>
        <boxGeometry args={[0.3, 0.25, 0.1]} />
        <meshStandardMaterial color={COLORS.gold} />
      </mesh>

      {/* Botões */}
      <mesh position={[0, 0.2, 0.41]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color={COLORS.white} />
      </mesh>
      <mesh position={[0, 0.4, 0.41]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color={COLORS.white} />
      </mesh>

      {/* Cabeça Group */}
      <group ref={headRef} position={[0, 0.9, 0]}>
        {/* Rosto */}
        <mesh>
          <boxGeometry args={[0.7, 0.7, 0.7]} />
          <meshStandardMaterial color={COLORS.skin} />
        </mesh>
        {/* Barba */}
        <mesh position={[0, -0.2, 0.36]}>
          <boxGeometry args={[0.72, 0.4, 0.1]} />
          <meshStandardMaterial color={COLORS.white} />
        </mesh>
        <mesh position={[0, -0.4, 0.25]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.5, 0.4, 0.3]} />
          <meshStandardMaterial color={COLORS.white} />
        </mesh>
        {/* Olhos */}
        <mesh position={[-0.15, 0.1, 0.36]}>
          <sphereGeometry args={[0.05]} />
          <meshStandardMaterial color={COLORS.black} />
        </mesh>
        <mesh position={[0.15, 0.1, 0.36]}>
          <sphereGeometry args={[0.05]} />
          <meshStandardMaterial color={COLORS.black} />
        </mesh>
        {/* Nariz */}
        <mesh position={[0, 0, 0.36]}>
          <sphereGeometry args={[0.07]} />
          <meshStandardMaterial color={COLORS.skin} />
        </mesh>

        {/* Gorro */}
        <group position={[0, 0.35, 0]}>
          <mesh position={[0, 0.1, 0]}>
            <boxGeometry args={[0.8, 0.2, 0.8]} />
            <meshStandardMaterial color={COLORS.white} />
          </mesh>
          <mesh position={[0, 0.5, 0]}>
            <coneGeometry args={[0.35, 0.8, 4]} />
            <meshStandardMaterial color={COLORS.red} />
          </mesh>
          <mesh position={[0, 0.9, 0]}>
            <sphereGeometry args={[0.12]} />
            <meshStandardMaterial color={COLORS.white} />
          </mesh>
        </group>
      </group>

      {/* Braço Direito (Acenando) */}
      <group ref={rightArmRef} position={[0.6, 0.4, 0]}>
        <mesh position={[0.1, -0.3, 0]}>
          <boxGeometry args={[0.3, 0.8, 0.3]} />
          <meshStandardMaterial color={COLORS.red} />
        </mesh>
        <mesh position={[0.1, -0.8, 0]}>
          <boxGeometry args={[0.32, 0.2, 0.32]} />
          <meshStandardMaterial color={COLORS.white} />
        </mesh>
        <mesh position={[0.1, -0.95, 0]}>
          <sphereGeometry args={[0.15]} />
          <meshStandardMaterial color={COLORS.skin} />
        </mesh>
      </group>

      {/* Braço Esquerdo */}
      <group ref={leftArmRef} position={[-0.6, 0.4, 0]}>
        <mesh position={[-0.1, -0.3, 0]}>
          <boxGeometry args={[0.3, 0.8, 0.3]} />
          <meshStandardMaterial color={COLORS.red} />
        </mesh>
        <mesh position={[-0.1, -0.8, 0]}>
          <boxGeometry args={[0.32, 0.2, 0.32]} />
          <meshStandardMaterial color={COLORS.white} />
        </mesh>
        <mesh position={[-0.1, -0.95, 0]}>
          <sphereGeometry args={[0.15]} />
          <meshStandardMaterial color={COLORS.skin} />
        </mesh>
      </group>

      {/* Perna Direita */}
      <group ref={rightLegRef} position={[0.25, -0.6, 0]}>
        <mesh position={[0, -0.3, 0]}>
          <boxGeometry args={[0.35, 0.6, 0.35]} />
          <meshStandardMaterial color={COLORS.red} />
        </mesh>
        <mesh position={[0, -0.7, 0]}>
          <boxGeometry args={[0.38, 0.3, 0.4]} />
          <meshStandardMaterial color={COLORS.black} />
        </mesh>
      </group>

      {/* Perna Esquerda */}
      <group ref={leftLegRef} position={[-0.25, -0.6, 0]}>
        <mesh position={[0, -0.3, 0]}>
          <boxGeometry args={[0.35, 0.6, 0.35]} />
          <meshStandardMaterial color={COLORS.red} />
        </mesh>
        <mesh position={[0, -0.7, 0]}>
          <boxGeometry args={[0.38, 0.3, 0.4]} />
          <meshStandardMaterial color={COLORS.black} />
        </mesh>
      </group>
    </group>
  );
};

const FlyingPath = () => {
  const groupRef = useRef<Group>(null!);

  // Estado para controlar a trajetória
  const offsetRef = useRef(0);

  useEffect(() => {
    offsetRef.current = Math.random() * 100;
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const t = clock.getElapsedTime();
    const offset = offsetRef.current;

    // Movimento no eixo X (da direita para esquerda)
    // Começa em 15 (fora da tela direita) e vai até -15 (fora da tela esquerda)
    // O ciclo total leva cerca de 20 segundos

    const cycleDuration = 20; // segundos
    const progress = (t + offset) % cycleDuration;

    let xPos = 15;

    if (progress < 12) {
      // Fase de voo (12 segundos para cruzar)
      // De 15 até -15
      xPos = 15 - (progress / 12) * 30;
    } else {
      // Fase de espera (fora da tela)
      xPos = -20;
    }

    // Movimento Y (Senoide para subir e descer)
    const yPos = Math.sin(t * 0.5 + offset) * 2 + 1; // Oscila entre -1 e 3

    // Movimento Z (Profundidade)
    // Aproxima e afasta
    const zPos = Math.sin(t * 0.3 + offset) * 3 - 2; // Oscila entre -5 e 1

    groupRef.current.position.set(xPos, yPos, zPos);

    // Rotação para olhar levemente para a direção do movimento e para a câmera
    // Quando xPos está diminuindo (voando para esquerda), ele olha para esquerda/frente
    // Ajustado para ficar mais de frente (-Math.PI / 4 = 45 graus)
    groupRef.current.rotation.y = -Math.PI / 4;

    // Inclinação dinâmica baseada na altura (sobe = empina, desce = mergulha)
    groupRef.current.rotation.z = Math.cos(t * 0.5 + offset) * 0.1;
  });

  return (
    <group ref={groupRef}>
      <SantaModel />
    </group>
  );
};

const FlyingSanta = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ pointerEvents: "none" }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 10]} intensity={2} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <FlyingPath />
      </Canvas>
    </div>
  );
};

export default FlyingSanta;
