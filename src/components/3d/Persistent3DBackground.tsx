'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

interface Persistent3DCanvasProps {
  scrollProgress?: number; // Optional external scroll progress (0 to 1)
  useSketchfabEmbed?: boolean;
}

export function Persistent3DBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollRatio, setScrollRatio] = useState(0);

  // Monitor document-level scroll ratio
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const current = window.scrollY / totalScroll;
        setScrollRatio(Math.min(Math.max(current, 0), 1));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Three.js Scene Setup with Books & Floating Pages
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    // Soft subtle fog for depth
    scene.fog = new THREE.FogExp2(0x0a0b10, 0.022);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.8, 7.2);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    container.appendChild(renderer.domElement);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    // Cyan key light
    const cyanLight = new THREE.DirectionalLight(0x00f2fe, 3.5);
    cyanLight.position.set(5, 8, 6);
    scene.add(cyanLight);

    // Pink / Magenta rim light
    const pinkLight = new THREE.PointLight(0xe20476, 4.5, 25);
    pinkLight.position.set(-6, -1, 5);
    scene.add(pinkLight);

    // Warm reading spotlight
    const warmLight = new THREE.PointLight(0xffecd2, 3.0, 20);
    warmLight.position.set(0, 4, 4);
    scene.add(warmLight);

    // --- 3D Materials ---
    // Leather Cover Material (Rich deep navy leather with neon edge)
    const leatherCoverMat = new THREE.MeshStandardMaterial({
      color: 0x182238,
      roughness: 0.3,
      metalness: 0.35,
    });

    // Cyber Cyan Accent Trim
    const goldTrimMat = new THREE.MeshStandardMaterial({
      color: 0x00f2fe,
      roughness: 0.15,
      metalness: 0.9,
      emissive: 0x00f2fe,
      emissiveIntensity: 0.45,
    });

    // Pages Material (Bright Warm White / Glowing Paper)
    const pagePaperMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.5,
      metalness: 0.05,
      emissive: 0xf6f3ea,
      emissiveIntensity: 0.15,
    });

    // Spine Material
    const spineMat = new THREE.MeshStandardMaterial({
      color: 0x24324f,
      roughness: 0.3,
    });

    // --- Main Open Book Assembly ---
    const mainBookGroup = new THREE.Group();
    scene.add(mainBookGroup);

    // Dimensions
    const coverWidth = 2.4;
    const coverHeight = 3.2;
    const coverThickness = 0.08;

    // Left Cover
    const leftCoverGeo = new THREE.BoxGeometry(coverWidth, coverHeight, coverThickness);
    const leftCover = new THREE.Mesh(leftCoverGeo, leatherCoverMat);
    leftCover.position.set(-coverWidth / 2, 0, 0);

    const leftCoverPivot = new THREE.Group();
    leftCoverPivot.add(leftCover);
    leftCoverPivot.position.set(-0.1, 0, 0);
    mainBookGroup.add(leftCoverPivot);

    // Right Cover
    const rightCoverGeo = new THREE.BoxGeometry(coverWidth, coverHeight, coverThickness);
    const rightCover = new THREE.Mesh(rightCoverGeo, leatherCoverMat);
    rightCover.position.set(coverWidth / 2, 0, 0);

    const rightCoverPivot = new THREE.Group();
    rightCoverPivot.add(rightCover);
    rightCoverPivot.position.set(0.1, 0, 0);
    mainBookGroup.add(rightCoverPivot);

    // Spine
    const spineGeo = new THREE.CylinderGeometry(0.25, 0.25, coverHeight, 16, 1, false, 0, Math.PI);
    const spine = new THREE.Mesh(spineGeo, spineMat);
    spine.rotation.z = 0;
    spine.rotation.y = Math.PI / 2;
    spine.position.set(0, 0, -0.15);
    mainBookGroup.add(spine);

    // Left Page Block (Thick stacked pages)
    const pageBlockGeo = new THREE.BoxGeometry(coverWidth * 0.94, coverHeight * 0.92, 0.22);
    const leftPageBlock = new THREE.Mesh(pageBlockGeo, pagePaperMat);
    leftPageBlock.position.set(-coverWidth * 0.47, 0, 0.12);
    leftCoverPivot.add(leftPageBlock);

    // Right Page Block
    const rightPageBlock = new THREE.Mesh(pageBlockGeo, pagePaperMat);
    rightPageBlock.position.set(coverWidth * 0.47, 0, 0.12);
    rightCoverPivot.add(rightPageBlock);

    // Cyan Glowing Bookmark Ribbon
    const ribbonGeo = new THREE.BoxGeometry(0.12, coverHeight * 1.25, 0.02);
    const ribbonMat = new THREE.MeshStandardMaterial({
      color: 0x00f2fe,
      emissive: 0x00f2fe,
      emissiveIntensity: 0.6,
      roughness: 0.3,
    });
    const ribbon = new THREE.Mesh(ribbonGeo, ribbonMat);
    ribbon.position.set(0.2, -0.4, 0.3);
    ribbon.rotation.z = -0.15;
    mainBookGroup.add(ribbon);

    // Animated Turning Pages (Curved thin leaves)
    const turningPages: THREE.Mesh[] = [];
    const turningPageGeo = new THREE.PlaneGeometry(coverWidth * 0.9, coverHeight * 0.9, 12, 1);
    
    // Slight curve to page geometry
    const posAttr = turningPageGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      // Curve along X
      posAttr.setZ(i, Math.sin((x / (coverWidth * 0.9)) * Math.PI) * 0.15);
    }
    turningPageGeo.computeVertexNormals();

    const turningPageMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.6,
      side: THREE.DoubleSide,
    });

    for (let i = 0; i < 4; i++) {
      const pageMesh = new THREE.Mesh(turningPageGeo, turningPageMat);
      pageMesh.position.set(0, 0, 0.15 + i * 0.02);
      mainBookGroup.add(pageMesh);
      turningPages.push(pageMesh);
    }

    // --- Ambient Secondary Books (Book stack & shelf in background) ---
    const backgroundBooksGroup = new THREE.Group();
    scene.add(backgroundBooksGroup);

    const colors = [0x1a2238, 0x2d1838, 0x0f2c38, 0x221828];
    for (let i = 0; i < 7; i++) {
      const bMat = new THREE.MeshStandardMaterial({
        color: colors[i % colors.length],
        roughness: 0.4,
      });
      const bGeo = new THREE.BoxGeometry(1.6, 2.2 + (i % 3) * 0.3, 0.3 + (i % 2) * 0.15);
      const bMesh = new THREE.Mesh(bGeo, bMat);
      bMesh.position.set(-6 + i * 1.8, -4 + (i % 2) * 0.4, -4 - i * 0.5);
      bMesh.rotation.y = 0.2 + i * 0.1;
      bMesh.rotation.z = 0.05 * (i % 2 === 0 ? 1 : -1);
      backgroundBooksGroup.add(bMesh);
    }

    // --- Floating Glowing Knowledge Particles & Flying Pages ---
    const particlesCount = 75;
    const particlesGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particlesCount * 3);
    const particleScales = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 16;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      particleScales[i] = Math.random();
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // Glowing Particle Points
    const particleMat = new THREE.PointsMaterial({
      color: 0x00f2fe,
      size: 0.06,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particlesGeo, particleMat);
    scene.add(particleSystem);

    // Initial Book Angle
    leftCoverPivot.rotation.y = THREE.MathUtils.degToRad(-15);
    rightCoverPivot.rotation.y = THREE.MathUtils.degToRad(15);
    mainBookGroup.position.set(0, 0, 0);
    mainBookGroup.rotation.x = THREE.MathUtils.degToRad(-15);
    mainBookGroup.rotation.y = THREE.MathUtils.degToRad(-10);

    // Handle Window Resize
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // --- Animation Loop ---
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = (performance.now() - startTime) / 1000;

      // Read current scroll progress ref or window directly for maximum smoothness
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = totalScroll > 0 ? Math.min(Math.max(window.scrollY / totalScroll, 0), 1) : 0;

      // 1. HERO SECTION (scroll 0.0 -> 0.22)
      // Large, front and center, welcoming open book with gentle hover
      // 2. HOW IT WORKS SECTION (scroll 0.22 -> 0.52)
      // Shifts smoothly to the right side, tilted slightly towards left text
      // 3. FEATURES & UPLOAD (scroll 0.52 -> 0.82)
      // Floats to the left, slightly reduced scale so forms and dropzone shine
      // 4. WORKFLOW / FINAL RECALL CTA (scroll 0.82 -> 1.0)
      // Returns prominently to center stage with a triumphant rotation

      let targetX = 0;
      let targetY = 0;
      let targetZ = 0;
      let targetRotX = THREE.MathUtils.degToRad(-15);
      let targetRotY = THREE.MathUtils.degToRad(-10);
      let targetRotZ = 0;
      let targetScale = 1.0;
      let targetOpenAngle = 25; // Book open angle

      if (scrollProgress < 0.25) {
        // Hero: Center, prominent
        const t = scrollProgress / 0.25;
        targetX = THREE.MathUtils.lerp(0, 1.8, t);
        targetY = THREE.MathUtils.lerp(0.2, 0.4, t);
        targetZ = THREE.MathUtils.lerp(0, -0.5, t);
        targetRotX = THREE.MathUtils.lerp(THREE.MathUtils.degToRad(-15), THREE.MathUtils.degToRad(-8), t);
        targetRotY = THREE.MathUtils.lerp(THREE.MathUtils.degToRad(-10), THREE.MathUtils.degToRad(-35), t);
        targetScale = THREE.MathUtils.lerp(1.1, 0.95, t);
        targetOpenAngle = THREE.MathUtils.lerp(28, 38, t);
      } else if (scrollProgress < 0.55) {
        // How It Works: Drift to the right side of the screen
        const t = (scrollProgress - 0.25) / 0.3;
        targetX = THREE.MathUtils.lerp(1.8, 2.4, t);
        targetY = THREE.MathUtils.lerp(0.4, -0.2, t);
        targetZ = THREE.MathUtils.lerp(-0.5, -1.2, t);
        targetRotX = THREE.MathUtils.lerp(THREE.MathUtils.degToRad(-8), THREE.MathUtils.degToRad(12), t);
        targetRotY = THREE.MathUtils.lerp(THREE.MathUtils.degToRad(-35), THREE.MathUtils.degToRad(-55), t);
        targetRotZ = THREE.MathUtils.lerp(0, THREE.MathUtils.degToRad(-5), t);
        targetScale = THREE.MathUtils.lerp(0.95, 0.85, t);
        targetOpenAngle = THREE.MathUtils.lerp(38, 45, t);
      } else if (scrollProgress < 0.82) {
        // Upload & Personalization: Drift gracefully to the left side
        const t = (scrollProgress - 0.55) / 0.27;
        targetX = THREE.MathUtils.lerp(2.4, -2.2, t);
        targetY = THREE.MathUtils.lerp(-0.2, 0.1, t);
        targetZ = THREE.MathUtils.lerp(-1.2, -0.8, t);
        targetRotX = THREE.MathUtils.lerp(THREE.MathUtils.degToRad(12), THREE.MathUtils.degToRad(-10), t);
        targetRotY = THREE.MathUtils.lerp(THREE.MathUtils.degToRad(-55), THREE.MathUtils.degToRad(35), t);
        targetRotZ = THREE.MathUtils.lerp(THREE.MathUtils.degToRad(-5), THREE.MathUtils.degToRad(4), t);
        targetScale = THREE.MathUtils.lerp(0.85, 0.9, t);
        targetOpenAngle = THREE.MathUtils.lerp(45, 32, t);
      } else {
        // Final Conclusion / CTA: Return to center, inspiring and prominent
        const t = (scrollProgress - 0.82) / 0.18;
        targetX = THREE.MathUtils.lerp(-2.2, 0, t);
        targetY = THREE.MathUtils.lerp(0.1, 0.3, t);
        targetZ = THREE.MathUtils.lerp(-0.8, 0.2, t);
        targetRotX = THREE.MathUtils.lerp(THREE.MathUtils.degToRad(-10), THREE.MathUtils.degToRad(-12), t);
        targetRotY = THREE.MathUtils.lerp(THREE.MathUtils.degToRad(35), THREE.MathUtils.degToRad(-5), t);
        targetRotZ = THREE.MathUtils.lerp(THREE.MathUtils.degToRad(4), 0, t);
        targetScale = THREE.MathUtils.lerp(0.9, 1.15, t);
        targetOpenAngle = THREE.MathUtils.lerp(32, 26, t);
      }

      // Smooth Gentle Idle Float (Breathing Effect)
      const idleFloatY = Math.sin(elapsedTime * 1.2) * 0.12;
      const idleRotate = Math.sin(elapsedTime * 0.8) * 0.04;

      // Dampened Spring Interpolation for cinematic, non-jittery motion
      mainBookGroup.position.x += (targetX - mainBookGroup.position.x) * 0.08;
      mainBookGroup.position.y += (targetY + idleFloatY - mainBookGroup.position.y) * 0.08;
      mainBookGroup.position.z += (targetZ - mainBookGroup.position.z) * 0.08;

      mainBookGroup.rotation.x += (targetRotX - mainBookGroup.rotation.x) * 0.08;
      mainBookGroup.rotation.y += (targetRotY + idleRotate - mainBookGroup.rotation.y) * 0.08;
      mainBookGroup.rotation.z += (targetRotZ - mainBookGroup.rotation.z) * 0.08;

      const curScale = mainBookGroup.scale.x;
      const nextScale = curScale + (targetScale - curScale) * 0.08;
      mainBookGroup.scale.set(nextScale, nextScale, nextScale);

      // Book cover opening angle adjustment based on scroll
      const radOpen = THREE.MathUtils.degToRad(targetOpenAngle);
      leftCoverPivot.rotation.y += (-radOpen - leftCoverPivot.rotation.y) * 0.08;
      rightCoverPivot.rotation.y += (radOpen - rightCoverPivot.rotation.y) * 0.08;

      // Animate turning pages continuously with subtle wave
      turningPages.forEach((p, idx) => {
        const pagePhase = elapsedTime * 2.2 + idx * 0.9;
        const pageAngle = Math.sin(pagePhase) * 0.4 + (idx - 1.5) * 0.15;
        p.rotation.y = pageAngle;
      });

      // Slowly rotate particle field
      particleSystem.rotation.y = elapsedTime * 0.04;
      particleSystem.rotation.x = Math.sin(elapsedTime * 0.03) * 0.1;

      // Background books subtle drift
      backgroundBooksGroup.position.y = -Math.sin(elapsedTime * 0.6) * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 3D WebGL Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />

      {/* Subtle vignette and contrast gradient that lets 3D models shine through clearly */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0b10]/40 via-transparent to-[#0a0b10]/60 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,11,16,0.6)_100%)] pointer-events-none" />
    </div>
  );
}

export default Persistent3DBackground;
