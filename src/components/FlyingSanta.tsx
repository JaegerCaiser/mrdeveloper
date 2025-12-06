/* eslint-disable react/no-unknown-property */
import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { Group, Vector3, MathUtils, Raycaster, Intersection } from "three";

// --- Máquina de Estados (Roteiro Final) ---
type SantaState =
  | { status: "hidden"; nextAppearance: number }
  | { status: "walking-in"; direction: 1 | -1; position: Vector3 }
  | {
      status: "idling";
      direction: 1 | -1;
      position: Vector3;
      idleEndTime: number;
    }
  | {
      status: "waving";
      direction: 1 | -1;
      position: Vector3;
      waveEndTime: number;
    }
  | { status: "walking-out"; direction: 1 | -1; position: Vector3 };

// --- Componente V6.1 (Código Limpo e Estável) ---
const SantaModel = () => {
  const group = useRef<Group>(null!);
  const { scene, animations } = useGLTF("/models/new-santa/santa-final.glb");
  const { actions } = useAnimations(animations, group);

  const [animation, setAnimation] = useState("Idle");
  const [state, setState] = useState<SantaState>(() => ({
    // Inicialização pura
    status: "hidden",
    nextAppearance: 3 + Math.random() * 7,
  }));

  useEffect(() => {
    Object.values(actions).forEach((action) => action?.fadeOut(0.3));
    actions[animation]?.reset().fadeIn(0.3).play();
  }, [animation, actions]);

  useFrame(({ clock, viewport }, delta) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    const walkSpeed = 1.8;
    const screenEdge = viewport.width / 2;

    // A lógica de atualização agora retorna um novo estado (imutabilidade)
    setState((currentState) => {
      switch (currentState.status) {
        case "hidden": {
          if (animation !== "Idle") setAnimation("Idle");
          if (t > currentState.nextAppearance) {
            const direction = Math.random() > 0.5 ? 1 : -1;
            return {
              status: "walking-in",
              direction,
              position: new Vector3(
                -screenEdge * direction,
                -viewport.height / 2 + 0.5,
                0
              ),
            };
          }
          return currentState;
        }

        case "walking-in": {
          if (animation !== "Walking") setAnimation("Walking");
          const newPosition = currentState.position
            .clone()
            .add(new Vector3(currentState.direction * walkSpeed * delta, 0, 0));
          group.current.position.copy(newPosition);
          group.current.rotation.y = MathUtils.lerp(
            group.current.rotation.y,
            (Math.PI / 2) * currentState.direction,
            0.1
          );

          if (Math.abs(newPosition.x) < 1.5) {
            return {
              ...currentState,
              status: "idling",
              position: newPosition,
              idleEndTime: t + 2,
            };
          }
          return { ...currentState, position: newPosition };
        }

        case "idling": {
          if (animation !== "Idle") setAnimation("Idle");
          group.current.position.copy(currentState.position);
          group.current.rotation.y = MathUtils.lerp(
            group.current.rotation.y,
            0,
            0.1
          );

          if (t > currentState.idleEndTime) {
            return { ...currentState, status: "waving", waveEndTime: t + 4 };
          }
          return currentState;
        }

        case "waving": {
          if (animation !== "Waving") setAnimation("Waving");
          group.current.position.copy(currentState.position);

          if (t > currentState.waveEndTime) {
            return { ...currentState, status: "walking-out" };
          }
          return currentState;
        }

        case "walking-out": {
          if (animation !== "Walking") setAnimation("Walking");
          const newPosition = currentState.position
            .clone()
            .add(new Vector3(currentState.direction * walkSpeed * delta, 0, 0));
          group.current.position.copy(newPosition);
          group.current.rotation.y = MathUtils.lerp(
            group.current.rotation.y,
            (Math.PI / 2) * currentState.direction,
            0.1
          );

          if (Math.abs(newPosition.x) > screenEdge + 1) {
            return {
              status: "hidden",
              nextAppearance: t + 10 + Math.random() * 20,
            };
          }
          return { ...currentState, position: newPosition };
        }
        default:
          return currentState;
      }
    });
  });

  return (
    <primitive
      ref={group}
      object={scene}
      scale={0.015}
      visible={state.status !== "hidden"}
      // Ensure the model does not handle raycast events so the DOM behind the canvas receives pointer events
      raycast={(_raycaster: Raycaster, _intersects: Intersection[]) => {
        /* no-op */
      }}
    />
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
        zIndex: 1000,
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        shadows
        style={{ pointerEvents: "none" }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 10]} intensity={3} castShadow />
        <Suspense fallback={null}>
          <SantaModel />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default FlyingSanta;