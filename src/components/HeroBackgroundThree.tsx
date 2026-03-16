import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useIsMobile } from "@/hooks/use-mobile";

function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

type Props = {
  className?: string;
};

const HeroBackgroundThree = ({ className }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Keep it decorative + lightweight. Skip on mobile or reduced-motion.
    if (isMobile || prefersReducedMotion()) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.set(0, 0, 8);

    const group = new THREE.Group();
    scene.add(group);

    // Soft “constellation” points
    const COUNT = 900;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);

    const c1 = new THREE.Color("#F4D06F"); // warm accent
    const c2 = new THREE.Color("#6EE7B7"); // mint accent

    for (let i = 0; i < COUNT; i++) {
      const ix = i * 3;
      // A shallow volume so it reads like depth, not a starfield.
      positions[ix + 0] = (Math.random() - 0.5) * 10;
      positions[ix + 1] = (Math.random() - 0.5) * 6;
      positions[ix + 2] = (Math.random() - 0.5) * 3;

      const t = Math.random();
      const col = c1.clone().lerp(c2, t);
      colors[ix + 0] = col.r;
      colors[ix + 1] = col.g;
      colors[ix + 2] = col.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.028,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    group.add(points);

    // A subtle wire “halo” ring
    const ringGeo = new THREE.TorusGeometry(3.2, 0.02, 12, 220);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xF4D06F,
      transparent: true,
      opacity: 0.18,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.6;
    ring.rotation.y = -0.4;
    group.add(ring);

    const onResize = () => {
      const parent = canvas.parentElement;
      const w = parent?.clientWidth ?? window.innerWidth;
      const h = parent?.clientHeight ?? 560;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    onResize();
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      group.rotation.y = t * 0.06;
      group.rotation.x = Math.sin(t * 0.12) * 0.06;
      ring.rotation.z = t * 0.18;
      renderer.render(scene, camera);
      rafRef.current = window.requestAnimationFrame(animate);
    };
    animate();

    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);

      ringGeo.dispose();
      ringMat.dispose();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
    />
  );
};

export default HeroBackgroundThree;

