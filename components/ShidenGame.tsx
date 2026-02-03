import React, { useState, useEffect, useRef } from 'react';
import { X, Fingerprint, MousePointer2 } from 'lucide-react';

interface Props {
  onExit?: () => void;
}

// Configuration
const PARTICLE_COUNT = 800;
const TEXT_OPTS = ["CHAOS", "FRICTION", "NOISE", "LAG", "CHURN", "DOUBT"];
const RESOLUTION_OPTS = ["CLARITY", "VELOCITY", "IMPACT", "SCALE", "GROWTH", "FLOW"];

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  size: number;
  color: string;
  angle: number;
  radius: number;
  speed: number;

  constructor(w: number, h: number) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;
    this.baseX = this.x;
    this.baseY = this.y;
    this.size = Math.random() * 2 + 1;
    this.color = '#FF3B30'; // Default Red
    
    // Orbit properties for Order mode
    this.angle = Math.random() * Math.PI * 2;
    this.radius = Math.random() * 200 + 100;
    this.speed = Math.random() * 0.02 + 0.01;
  }

  update(ctx: CanvasRenderingContext2D, w: number, h: number, isOrdered: boolean, mouseX: number, mouseY: number) {
    if (isOrdered) {
        // --- ORDERED MODE (Fluid Orbit) ---
        const centerX = w / 2;
        const centerY = h / 2;
        
        // Move angle
        this.angle += this.speed;
        
        // Calculate target position in a 3D-ish sphere/ring
        const targetX = centerX + Math.cos(this.angle) * this.radius;
        const targetY = centerY + Math.sin(this.angle) * (this.radius * 0.6); // Flattened y for 3D effect

        // Easing towards target
        this.x += (targetX - this.x) * 0.05;
        this.y += (targetY - this.y) * 0.05;
        
        // Mouse Repulsion (gentle interaction in ordered mode)
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 100) {
            const angle = Math.atan2(dy, dx);
            this.x -= Math.cos(angle) * 5;
            this.y -= Math.sin(angle) * 5;
        }

        this.color = '#0055FF'; // Blue
    } else {
        // --- CHAOS MODE (Jitter & Brownion Motion) ---
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off walls
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;

        // Mouse Disruption (Mouse creates chaos)
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 150) {
             this.x += (Math.random() - 0.5) * 20;
             this.y += (Math.random() - 0.5) * 20;
        }

        // Random jitter
        this.x += (Math.random() - 0.5) * 2;
        this.y += (Math.random() - 0.5) * 2;
        
        this.color = Math.random() > 0.9 ? '#FFFFFF' : '#FF3B30'; // Mostly red, some white sparks
    }
  }

  draw(ctx: CanvasRenderingContext2D, isOrdered: boolean) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    
    if (isOrdered) {
        // Glowing smooth dots
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    } else {
        // Sharp squares/glitches
        ctx.shadowBlur = 0;
        ctx.rect(this.x, this.y, this.size * 1.5, this.size * 1.5);
    }
    
    ctx.fill();
    ctx.shadowBlur = 0; // Reset
  }
}

export const ShidenGame: React.FC<Props> = ({ onExit }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isOrdered, setIsOrdered] = useState(false);
    
    // Mouse State
    const mouse = useRef({ x: -1000, y: -1000 });
    const particles = useRef<Particle[]>([]);
    const frameId = useRef(0);

    // Initial Setup
    useEffect(() => {
        const init = () => {
            if (!containerRef.current) return;
            const { width, height } = containerRef.current.getBoundingClientRect();
            particles.current = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.current.push(new Particle(width, height));
            }
        };
        
        init();
        window.addEventListener('resize', init);
        return () => window.removeEventListener('resize', init);
    }, []);

    // Animation Loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        const loop = () => {
            if (!containerRef.current) return;
            const { width, height } = containerRef.current.getBoundingClientRect();
            
            // Handle high DPI
            if (canvas.width !== width) canvas.width = width;
            if (canvas.height !== height) canvas.height = height;

            // Background
            ctx.fillStyle = '#050505';
            // Trail effect in chaos mode vs clear in ordered mode
            ctx.fillStyle = isOrdered ? 'rgba(5, 5, 5, 0.3)' : 'rgba(5, 5, 5, 0.1)'; 
            ctx.fillRect(0, 0, width, height);

            // Draw connecting lines in Order mode
            if (isOrdered) {
                ctx.strokeStyle = 'rgba(0, 85, 255, 0.1)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                for (let i = 0; i < 100; i++) { // Only connect some to save perf
                    const p1 = particles.current[i];
                    const p2 = particles.current[(i + 1) % 100];
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                }
                ctx.stroke();
            }

            // Update & Draw Particles
            particles.current.forEach(p => {
                p.update(ctx, width, height, isOrdered, mouse.current.x, mouse.current.y);
                p.draw(ctx, isOrdered);
            });

            // Draw Text Overlay in Canvas for performance sync
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            if (!isOrdered) {
                // Chaotic Text
                ctx.font = 'bold 80px "Space Grotesk"';
                ctx.fillStyle = 'rgba(255, 59, 48, 0.05)';
                ctx.save();
                ctx.translate(width/2, height/2);
                ctx.rotate((Math.random() - 0.5) * 0.1);
                ctx.fillText("ENTROPY", 0, 0);
                ctx.restore();

                // Floating words
                ctx.font = 'bold 20px "Space Grotesk"';
                ctx.fillStyle = 'rgba(255, 59, 48, 0.4)';
                TEXT_OPTS.forEach((text, i) => {
                    // Simple floating positions
                    const x = (width * 0.2) + (i * 150) % (width * 0.6);
                    const y = (height * 0.3) + (Math.sin(Date.now() * 0.002 + i) * 50);
                    ctx.fillText(text, x, y);
                });
            } else {
                // Ordered Text
                ctx.font = 'bold 80px "Space Grotesk"';
                ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
                ctx.fillText("STRUCTURE", width/2, height/2);

                // Resolution words
                 ctx.font = 'bold 20px "Space Grotesk"';
                ctx.fillStyle = 'rgba(0, 85, 255, 0.8)';
                RESOLUTION_OPTS.forEach((text, i) => {
                     const angle = (i / RESOLUTION_OPTS.length) * Math.PI * 2;
                     const r = 250;
                     const x = (width/2) + Math.cos(angle + Date.now()*0.001) * r;
                     const y = (height/2) + Math.sin(angle + Date.now()*0.001) * r;
                     ctx.fillText(text, x, y);
                });
            }

            frameId.current = requestAnimationFrame(loop);
        };

        frameId.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(frameId.current);
    }, [isOrdered]);

    // Handlers
    const handleMove = (x: number, y: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouse.current = { x: x - rect.left, y: y - rect.top };
    };

    return (
        <div className="relative w-full h-full bg-[#050505] overflow-hidden select-none">
            {/* Header */}
            <div className="absolute top-0 left-0 w-full p-8 z-20 flex justify-between pointer-events-none mix-blend-difference text-white">
                <div>
                    <h2 className="text-xl md:text-2xl font-bold font-display tracking-widest">
                        {isOrdered ? "SYSTEM: OPTIMIZED" : "SYSTEM: CRITICAL"}
                    </h2>
                    <p className="font-mono text-sm opacity-60">
                        {isOrdered ? "Flow State Achieved" : "High Entropy Detected"}
                    </p>
                </div>
                <div className="text-right">
                    <p className="font-mono text-sm">PARTICLES: {PARTICLE_COUNT}</p>
                </div>
            </div>

            {/* Close Button */}
            <button 
                onClick={onExit}
                className="absolute top-6 right-6 z-30 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
                <X />
            </button>

            {/* Canvas */}
            <div 
                ref={containerRef}
                className="w-full h-full cursor-none touch-none"
                onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
                onTouchMove={(e) => handleMove(e.touches[0].clientX, e.touches[0].clientY)}
                onMouseDown={() => setIsOrdered(true)}
                onMouseUp={() => setIsOrdered(false)}
                onTouchStart={() => setIsOrdered(true)}
                onTouchEnd={() => setIsOrdered(false)}
            >
                <canvas ref={canvasRef} className="block" />
            </div>

            {/* Instructions / CTA Overlay */}
            <div className="absolute bottom-20 left-0 w-full flex flex-col items-center justify-center z-20 pointer-events-none">
                <div className={`
                    flex flex-col items-center gap-4 transition-all duration-500
                    ${isOrdered ? 'opacity-20 scale-90' : 'opacity-100 scale-100'}
                `}>
                    <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center animate-pulse">
                        <Fingerprint className="text-white w-8 h-8" />
                    </div>
                    <p className="text-white text-lg font-display tracking-widest font-bold">
                        HOLD TO ALIGN
                    </p>
                </div>
            </div>

            {/* Custom Cursor */}
            <div 
                className="pointer-events-none fixed w-8 h-8 rounded-full border border-white/50 -translate-x-1/2 -translate-y-1/2 z-50 hidden md:block mix-blend-difference"
                style={{ 
                    left: 0, 
                    top: 0,
                    transform: `translate(${mouse.current.x}px, ${mouse.current.y}px)` // This won't work reactively, using simple css hover for now or just hide cursor
                }} 
            />
            <style>{`
                canvas { cursor: crosshair; }
            `}</style>
        </div>
    );
};