"use client";
import { useState, useRef, useEffect } from "react";
import {
  CreditCard,
  Zap,
  Package,
  Calendar,
  TrendingUp,
  Smartphone,
  Star,
  Users,
  Activity,
  Sparkles,
  ArrowRight,
  BarChart3,
  Wifi,
} from "lucide-react";
import * as THREE from "three";

// Advanced 3D Canvas Component
type Advanced3DCanvasProps = {
  scene?: "billing" | "charging" | "catalog" | "events";
};

function Advanced3DCanvas({ scene = "billing" }: Advanced3DCanvasProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    // Scene setup
    const threeScene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      containerWidth / containerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });

    renderer.setSize(containerWidth, containerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    container.appendChild(renderer.domElement);

    sceneRef.current = threeScene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    // Enhanced Lighting Setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
    threeScene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    threeScene.add(directionalLight);

    // Scene-specific colored lights
    const getSceneLights = () => {
      switch (scene) {
        case "billing":
          return [
            { color: 0x00ff88, position: [8, 8, 8] },
            { color: 0x8800ff, position: [-8, -8, 8] }
          ];
        case "charging":
          return [
            { color: 0xffff00, position: [10, 0, 10] },
            { color: 0x00ffff, position: [-10, 0, 10] }
          ];
        case "catalog":
          return [
            { color: 0xff6b6b, position: [0, 10, 10] },
            { color: 0x6b6bff, position: [0, -10, 10] }
          ];
        case "events":
          return [
            { color: 0x4ecdc4, position: [10, 5, 10] },
            { color: 0xc44ecd, position: [-10, 5, 10] }
          ];
        default:
          return [];
      }
    };

    const sceneLights = getSceneLights();
    const pointLights: THREE.PointLight[] = [];
    
    sceneLights.forEach(({ color, position }) => {
      const pointLight = new THREE.PointLight(color, 1, 50);
      pointLight.position.set(position[0], position[1], position[2]);
      pointLights.push(pointLight);
      threeScene.add(pointLight);
    });

    // Create scene-specific geometries
    let meshes: THREE.Mesh[] = [];
    const createSceneObjects = () => {
      if (scene === "billing") {
        // Floating geometric shapes for billing
        const shapes = [
          new THREE.BoxGeometry(0.8, 0.8, 0.8),
          new THREE.CylinderGeometry(0.5, 0.5, 1, 8),
          new THREE.OctahedronGeometry(0.6),
          new THREE.TetrahedronGeometry(0.7)
        ];
        
        for (let i = 0; i < 6; i++) {
          const geometry = shapes[i % shapes.length];
          const material = new THREE.MeshLambertMaterial({
            color: new THREE.Color().setHSL((i / 6) * 0.8 + 0.1, 0.9, 0.6),
            transparent: true,
            opacity: 0.85,
          });
          const mesh = new THREE.Mesh(geometry, material);
          mesh.position.set(
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 4
          );
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          meshes.push(mesh);
          threeScene.add(mesh);
        }
      } else if (scene === "charging") {
        // Animated torus with particles
        const torusGeometry = new THREE.TorusGeometry(1.5, 0.4, 16, 100);
        const torusMaterial = new THREE.MeshPhongMaterial({
          color: 0x00ff88,
          transparent: true,
          opacity: 0.9,
          emissive: 0x003322,
        });
        const torus = new THREE.Mesh(torusGeometry, torusMaterial);
        torus.castShadow = true;
        meshes.push(torus);
        threeScene.add(torus);

        // Add inner glowing sphere
        const sphereGeometry = new THREE.SphereGeometry(0.6, 32, 32);
        const sphereMaterial = new THREE.MeshPhongMaterial({
          color: 0xffff00,
          transparent: true,
          opacity: 0.6,
          emissive: 0x444400,
        });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        meshes.push(sphere);
        threeScene.add(sphere);
      } else if (scene === "catalog") {
        // Wireframe icosahedron with inner solid
        const icosaGeometry = new THREE.IcosahedronGeometry(1.5, 1);
        const wireframeMaterial = new THREE.MeshBasicMaterial({
          color: 0xff6b6b,
          wireframe: true,
          transparent: true,
          opacity: 0.8,
        });
        const wireframe = new THREE.Mesh(icosaGeometry, wireframeMaterial);
        meshes.push(wireframe);
        threeScene.add(wireframe);

        // Inner solid icosahedron
        const solidMaterial = new THREE.MeshLambertMaterial({
          color: 0x6b6bff,
          transparent: true,
          opacity: 0.3,
        });
        const solid = new THREE.Mesh(icosaGeometry.clone(), solidMaterial);
        solid.scale.set(0.7, 0.7, 0.7);
        meshes.push(solid);
        threeScene.add(solid);
      } else if (scene === "events") {
        // Sphere with orbiting smaller spheres
        const mainSphereGeometry = new THREE.SphereGeometry(1.2, 32, 32);
        const mainSphereMaterial = new THREE.MeshPhongMaterial({
          color: 0x4ecdc4,
          transparent: true,
          opacity: 0.8,
          emissive: 0x001122,
        });
        const mainSphere = new THREE.Mesh(mainSphereGeometry, mainSphereMaterial);
        mainSphere.castShadow = true;
        meshes.push(mainSphere);
        threeScene.add(mainSphere);

        // Orbiting spheres
        for (let i = 0; i < 4; i++) {
          const orbitGeometry = new THREE.SphereGeometry(0.2, 16, 16);
          const orbitMaterial = new THREE.MeshLambertMaterial({
            color: new THREE.Color().setHSL(i / 4, 0.8, 0.7),
          });
          const orbitSphere = new THREE.Mesh(orbitGeometry, orbitMaterial);
          orbitSphere.position.set(
            Math.cos((i / 4) * Math.PI * 2) * 2.5,
            Math.sin((i / 4) * Math.PI * 2) * 2.5,
            0
          );
          meshes.push(orbitSphere);
          threeScene.add(orbitSphere);
        }
      }
    };

    createSceneObjects();
    camera.position.set(0, 0, 6);

    // Animation loop
    const animate = () => {
      if (!rendererRef.current || !sceneRef.current || !cameraRef.current) {
        return;
      }

      animationRef.current = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

      meshes.forEach((mesh, index) => {
        if (scene === "billing") {
          mesh.rotation.x = time + index * 0.5;
          mesh.rotation.y = time * 0.7 + index * 0.3;
          mesh.position.y = Math.sin(time * 2 + index) * 0.8;
        } else if (scene === "charging") {
          if (index === 0) { // Torus
            mesh.rotation.x = time * 0.5;
            mesh.rotation.z = time * 0.3;
          } else { // Inner sphere
            mesh.rotation.y = time * 2;
          }
        } else if (scene === "catalog") {
          mesh.rotation.x = time * 0.3;
          mesh.rotation.y = time * 0.5;
          mesh.rotation.z = time * 0.1;
        } else if (scene === "events") {
          if (index === 0) { // Main sphere
            mesh.rotation.y = time * 0.2;
          } else { // Orbiting spheres
            const orbitTime = time + (index - 1) * 1.5;
            mesh.position.x = Math.cos(orbitTime * 0.8) * 2.8;
            mesh.position.z = Math.sin(orbitTime * 0.8) * 2.8;
            mesh.position.y = Math.sin(orbitTime * 1.2) * 1.5;
          }
        }
      });

      // Smooth camera movement
      cameraRef.current.position.x = Math.sin(time * 0.2) * 1.5;
      cameraRef.current.position.y = Math.cos(time * 0.15) * 1;
      cameraRef.current.lookAt(0, 0, 0);

      // Animate lights
      pointLights.forEach((light, index) => {
        light.intensity = 1 + Math.sin(time * 2 + index * 2) * 0.3;
      });

      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    animate();
    setIsLoaded(true);

    // Handle resize
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      
      const newWidth = container.offsetWidth;
      const newHeight = container.offsetHeight;
      
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      
      // Clean up geometries and materials
      meshes.forEach(mesh => {
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach(mat => mat.dispose());
          } else {
            mesh.material.dispose();
          }
        }
      });
    };
  }, [scene]);

  return (
    <div className="w-full h-full relative">
      <div ref={mountRef} className="w-full h-full" />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}

// Enhanced Glassmorphism Card
type GlassmorphismCardProps = {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  variant?: "default" | "elevated" | "subtle";
};

function GlassmorphismCard({
  children,
  className = "",
  hoverEffect = true,
  variant = "default",
}: GlassmorphismCardProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case "elevated":
        return "backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl shadow-purple-500/20";
      case "subtle":
        return "backdrop-blur-md bg-white/5 border border-white/5 shadow-lg shadow-black/10";
      default:
        return "backdrop-blur-xl bg-white/8 border border-white/15 shadow-xl shadow-purple-500/15";
    }
  };

  return (
    <div
      className={`
        relative rounded-3xl overflow-hidden
        ${getVariantClasses()}
        ${
          hoverEffect
            ? "hover:bg-white/15 hover:border-white/25 hover:shadow-purple-500/25 hover:scale-[1.02] hover:-translate-y-1"
            : ""
        }
        transition-all duration-700 ease-out
        ${className}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 rounded-3xl" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent rounded-3xl" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// Enhanced Animated Counter
type AnimatedCounterProps = {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
};

function AnimatedCounter({ 
  value, 
  duration = 2000, 
  prefix = "", 
  suffix = "",
  decimals = 0
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const startValue = 0;
    const endValue = value;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      const currentValue = startValue + (endValue - startValue) * easeOutQuart(progress);
      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

  const formatValue = (val: number) => {
    return decimals > 0 ? val.toFixed(decimals) : Math.floor(val).toLocaleString();
  };

  return (
    <span>
      {prefix}{formatValue(displayValue)}{suffix}
    </span>
  );
}

// Enhanced Floating Particles
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className={`absolute rounded-full animate-pulse ${
            i % 3 === 0 ? 'bg-cyan-400/20 w-1 h-1' :
            i % 3 === 1 ? 'bg-purple-400/20 w-1.5 h-1.5' :
            'bg-pink-400/20 w-0.5 h-0.5'
          }`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${2 + Math.random() * 4}s`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
}

function TabbedSection() {
  const [activeTab, setActiveTab] = useState("BILLING");

  const tabs = [
    {
      id: "BILLING",
      label: "Billing",
      icon: <CreditCard size={20} />,
      color: "from-emerald-500 to-teal-500",
      description: "Revenue & Analytics"
    },
    {
      id: "CHARGING",
      label: "Charging",
      icon: <Zap size={20} />,
      color: "from-yellow-500 to-orange-500",
      description: "Power Management"
    },
    {
      id: "CATALOG",
      label: "Catalog",
      icon: <Package size={20} />,
      color: "from-pink-500 to-rose-500",
      description: "Product Showcase"
    },
    {
      id: "EVENTS",
      label: "Events",
      icon: <Calendar size={20} />,
      color: "from-blue-500 to-indigo-500",
      description: "Live Activities"
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "BILLING":
        return (
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <GlassmorphismCard className="p-8" variant="elevated">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-lg">
                    <TrendingUp className="text-white" size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      Revenue Growth
                    </h3>
                    <p className="text-emerald-400 font-medium">This Quarter</p>
                  </div>
                </div>
                <div className="text-6xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-4">
                  +<AnimatedCounter value={247} />%
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Sparkles size={16} className="text-emerald-400" />
                  <p className="font-medium">Compared to last quarter</p>
                </div>
              </GlassmorphismCard>

              <GlassmorphismCard className="p-8" variant="elevated">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      Monthly Recurring Revenue
                    </h3>
                    <p className="text-purple-400 font-medium">Growing steadily</p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                    <BarChart3 className="text-white" size={24} />
                  </div>
                </div>
                <div className="text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
                  $<AnimatedCounter value={127450} />
                </div>
                <div className="relative">
                  <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden shadow-inner">
                    <div
                      className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 h-full rounded-full transition-all duration-[3000ms] ease-out shadow-lg"
                      style={{ width: "78%" }}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-sm text-white/60 font-medium">Progress</span>
                    <span className="text-sm text-purple-400 font-bold">78% of target</span>
                  </div>
                </div>
              </GlassmorphismCard>
            </div>

            <div className="h-96 lg:h-[500px]">
              <GlassmorphismCard className="h-full p-6" hoverEffect={false} variant="subtle">
                <div className="text-center mb-4">
                  <h4 className="text-lg font-bold text-white/90">Revenue Visualization</h4>
                </div>
                <Advanced3DCanvas scene="billing" />
              </GlassmorphismCard>
            </div>
          </div>
        );

      case "CHARGING":
        return (
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="max-w-md mx-auto lg:mx-0">
              <GlassmorphismCard className="p-8" variant="elevated">
                <div className="bg-black/30 rounded-3xl p-8 mb-8 backdrop-blur-sm border border-white/10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg">
                        <Smartphone className="text-white" size={28} />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">Device Status</h4>
                        <p className="text-green-400 text-sm font-medium">Fast Charging</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black text-green-400">85%</div>
                      <div className="text-white/60 text-sm">Battery</div>
                    </div>
                  </div>
                  
                  <div className="relative w-full bg-gray-800/50 rounded-full h-6 mb-6 overflow-hidden shadow-inner">
                    <div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 rounded-full transition-all duration-[4000ms] ease-out shadow-lg"
                      style={{ width: "85%" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full animate-pulse opacity-60" />
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Activity size={16} className="text-green-400" />
                      <span className="text-white/90 font-medium">Ultra-fast charging</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wifi size={16} className="text-blue-400" />
                      <span className="text-white/90 font-medium">Connected</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <button className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3">
                    <Zap size={24} />
                    Start Charging Session
                    <ArrowRight size={20} />
                  </button>
                  <button className="w-full border-2 border-white/20 text-white py-4 rounded-2xl font-semibold backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all duration-300">
                    Schedule Charging
                  </button>
                </div>
              </GlassmorphismCard>
            </div>

            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <h3 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Charging Analytics
                </h3>
                <p className="text-white/70 text-lg">Real-time performance metrics</p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <GlassmorphismCard className="p-6 text-center">
                  <div className="text-4xl font-black text-blue-400 mb-2">
                    <AnimatedCounter value={2.5} decimals={1} />h
                  </div>
                  <p className="text-white/70 font-medium">Avg. Charge Time</p>
                </GlassmorphismCard>
                <GlassmorphismCard className="p-6 text-center">
                  <div className="text-4xl font-black text-green-400 mb-2">
                    <AnimatedCounter value={98} />%
                  </div>
                  <p className="text-white/70 font-medium">Efficiency Rate</p>
                </GlassmorphismCard>
                <GlassmorphismCard className="p-6 text-center">
                  <div className="text-4xl font-black text-yellow-400 mb-2">
                    <AnimatedCounter value={45} />W
                  </div>
                  <p className="text-white/70 font-medium">Current Power</p>
                </GlassmorphismCard>
                <GlassmorphismCard className="p-6 text-center">
                  <div className="text-4xl font-black text-purple-400 mb-2">
                    <AnimatedCounter value={23} />°C
                  </div>
                  <p className="text-white/70 font-medium">Temperature</p>
                </GlassmorphismCard>
              </div>

              <div className="h-80">
                <GlassmorphismCard className="h-full p-6" hoverEffect={false} variant="subtle">
                  <div className="text-center mb-4">
                    <h4 className="text-lg font-bold text-white/90">Power Flow Visualization</h4>
                  </div>
                  <Advanced3DCanvas scene="charging" />
                </GlassmorphismCard>
              </div>
            </div>
          </div>
        );

      case "CATALOG":
        return (
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <GlassmorphismCard
                  key={item}
                  className="p-6 group cursor-pointer"
                  variant="elevated"
                >
                  <div className="aspect-square bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 rounded-2xl mb-6 relative overflow-hidden shadow-lg">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Package size={48} className="text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-500" />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                    Premium Product {item}
                  </h4>
                  <p className="text-white/70 text-sm mb-6 group-hover:text-white/90 transition-colors duration-300 leading-relaxed">
                    Next-generation innovation with cutting-edge features and premium quality materials
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      ${99 + item * 10}
                    </span>
                    <button className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-xl font-bold text-sm hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 flex items-center gap-2">
                      Add to Cart
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </GlassmorphismCard>
              ))}
            </div>
            
            <div className="h-96">
              <GlassmorphismCard className="h-full p-6" hoverEffect={false} variant="subtle">
                <div className="text-center mb-4">
                  <h4 className="text-lg font-bold text-white/90">Product Showcase</h4>
                </div>
                <Advanced3DCanvas scene="catalog" />
              </GlassmorphismCard>
            </div>
          </div>
        );

      case "EVENTS":
        const events = [
          {
            title: "Tech Conference 2024",
            status: "live",
            date: "2024-07-15",
            attendees: 320,
            description: "Join industry leaders for cutting-edge tech discussions",
          },
          {
            title: "Product Launch Event",
            status: "upcoming",
            date: "2024-08-01",
            attendees: 120,
            description: "Discover our latest innovations and breakthrough products",
          },
          {
            title: "Developer Meetup",
            status: "live",
            date: "2024-07-20",
            attendees: 210,
            description: "Connect with fellow developers and share knowledge",
          },
        ];

        return (
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              {events.map((event, index) => (
                <GlassmorphismCard key={event.title} className="p-6 group" variant="elevated">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300 mb-2">
                        {event.title}
                      </h4>
                      <p className="text-white/70 text-sm mb-3 group-hover:text-white/90 transition-colors duration-300">
                        {event.description}
                      </p>
                    </div>
                    {event.status === "live" && (
                      <div className="flex items-center gap-2 bg-red-500/20 px-3 py-2 rounded-full border border-red-500/30 backdrop-blur-sm">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-red-400 text-xs font-bold">LIVE</span>
                      </div>
                    )}
                    {event.status === "upcoming" && (
                      <div className="flex items-center gap-2 bg-blue-500/20 px-3 py-2 rounded-full border border-blue-500/30 backdrop-blur-sm">
                        <Calendar size={12} className="text-blue-400" />
                        <span className="text-blue-400 text-xs font-bold">UPCOMING</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-white/70 group-hover:text-white/90 transition-colors duration-300">
                      <span className="font-semibold">{event.date}</span>
                      <div className="flex items-center gap-2">
                        <Users size={16} />
                        <span>
                          <AnimatedCounter value={event.attendees} /> attendees
                        </span>
                      </div>
                    </div>
                    <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:scale-105 transition-all duration-300 flex items-center gap-2">
                      Join Event
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </GlassmorphismCard>
              ))}
            </div>
            
            <div className="h-96 lg:h-[500px]">
              <GlassmorphismCard className="h-full p-6" hoverEffect={false} variant="subtle">
                <div className="text-center mb-4">
                  <h4 className="text-lg font-bold text-white/90">Event Network</h4>
                </div>
                <Advanced3DCanvas scene="events" />
              </GlassmorphismCard>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <FloatingParticles />

      {/* Enhanced background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Enhanced section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-6">
            <Sparkles size={20} className="text-cyan-400" />
            <span className="text-white/90 font-medium">Premium Services</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 leading-tight">
            Our Services
          </h2>
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Explore our comprehensive suite of cutting-edge solutions designed to transform your business experience
          </p>
        </div>

        {/* Enhanced Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative px-8 py-5 rounded-2xl font-bold text-lg transition-all duration-700 ease-out
                flex flex-col sm:flex-row items-center gap-3 group backdrop-blur-md border min-w-[140px] sm:min-w-0
                ${
                  activeTab === tab.id
                    ? `bg-gradient-to-r ${tab.color} text-white border-white/30 shadow-2xl scale-105 shadow-purple-500/25`
                    : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-white hover:scale-105"
                }
              `}
            >
              <div
                className={`transition-transform duration-300 ${
                  activeTab === tab.id ? "scale-110" : "group-hover:scale-110"
                }`}
              >
                {tab.icon}
              </div>
              <div className="text-center sm:text-left">
                <span className="block font-bold">{tab.label}</span>
                <span className="text-xs opacity-80 font-medium">{tab.description}</span>
              </div>

              {/* Enhanced active indicator */}
              {activeTab === tab.id && (
                <>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full" />
                </>
              )}
            </button>
          ))}
        </div>

        {/* Enhanced Tab Content */}
        <div className="relative">
          <div className="min-h-[600px] transition-all duration-700 ease-out">
            {renderTabContent()}
          </div>
        </div>
      </div>

      {/* Additional decorative elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
    </section>
  );
}

export default TabbedSection;