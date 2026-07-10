// Ported from github.com/egorshest/webgl-ascii-hero (MIT License, see
// LICENSE). Renders /models/friendly_robot_assistant.glb as an ambient
// ASCII mascot that turns to track the cursor.

import { Suspense, useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { EffectComposer } from "@react-three/postprocessing"
import { Environment, useGLTF } from "@react-three/drei"
import { MeshStandardMaterial, Vector2 } from "three"
import { AsciiEffect } from "./AsciiEffect"

const MODEL_PATH = "/models/friendly_robot_assistant.glb"
const CAMERA_Z = 3.4

function RobotSubject(props) {
  const { scene } = useGLTF(MODEL_PATH)

  const material = useMemo(
    () => new MeshStandardMaterial({ color: "#00ff9d", roughness: 0.12, metalness: 0 }),
    []
  )

  useEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.material?.dispose?.()
        obj.material = material
      }
    })
    return () => material.dispose()
  }, [scene, material])

  return <primitive object={scene} {...props} />
}

useGLTF.preload(MODEL_PATH)

// The model's 3 mesh chunks are generically named (Object_4/5/6) with near-
// identical bounding boxes - a vertex-count split, not a body/eyes split, so
// there's no separate eyes mesh to aim independently. The whole mascot turns
// toward the cursor instead, clamped to a small angle so it reads as
// "watching" rather than spinning.
const MAX_YAW = 0.45
const MAX_PITCH = 0.2
const TRACK_SMOOTHING = 0.08

function AttentiveRobot() {
  const groupRef = useRef(null)
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = (e.clientY / window.innerHeight) * 2 - 1
      target.current = { x: -ny * MAX_PITCH, y: nx * MAX_YAW }
    }
    window.addEventListener("mousemove", onMouseMove)
    return () => window.removeEventListener("mousemove", onMouseMove)
  }, [])

  useFrame((state) => {
    const group = groupRef.current
    if (!group) return
    group.rotation.x += (target.current.x - group.rotation.x) * TRACK_SMOOTHING
    group.rotation.y += (target.current.y - group.rotation.y) * TRACK_SMOOTHING
    // Tiny idle bob so it still feels alive when the cursor is far away.
    group.position.y = Math.sin(state.clock.elapsedTime * 1.4) * 0.03
  })

  return (
    <group ref={groupRef}>
      <RobotSubject scale={1} />
    </group>
  )
}

/** Mounts EffectComposer only after the first few frames so the WebGL context exists. */
function Scene({ resolution }) {
  const { gl } = useThree()
  const [composerReady, setComposerReady] = useState(false)
  const frameCount = useRef(0)

  useFrame(() => {
    frameCount.current++
    if (frameCount.current === 3 && !composerReady) {
      setTimeout(() => {
        if (!gl.getContext()?.isContextLost?.()) setComposerReady(true)
      }, 100)
    }
  })

  return (
    <>
      <Environment preset="studio" background={false} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[2, 3.5, 6]} intensity={2.2} />
      <directionalLight position={[-2, 1.5, 4]} intensity={0.9} />
      <Suspense fallback={null}>
        <AttentiveRobot />
      </Suspense>
      {composerReady && (
        <EffectComposer>
          <AsciiEffect
            cellSize={4}
            invert
            color
            characterSet="terminal"
            volumeShading
            tintColor="#00ff9d"
            resolution={resolution}
            postfx={{ contrastAdjust: 1.1, brightnessAdjust: 0.05 }}
          />
        </EffectComposer>
      )}
    </>
  )
}

export function EffectScene() {
  const containerRef = useRef(null)
  const [resolution] = useState(() => new Vector2(1920, 1080))

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateResolution = () => {
      const rect = container.getBoundingClientRect()
      resolution.set(rect.width || 1920, rect.height || 1080)
    }

    updateResolution()
    const ro = new ResizeObserver(updateResolution)
    ro.observe(container)
    return () => ro.disconnect()
  }, [resolution])

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <Canvas
        dpr={Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 2)}
        camera={{ position: [0, 0, CAMERA_Z], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true }}
        onCreated={({ gl }) => {
          gl.toneMappingExposure = 0.6
          gl.domElement.addEventListener("webglcontextlost", (e) => e.preventDefault())
        }}
      >
        <Scene resolution={resolution} />
      </Canvas>
    </div>
  )
}
