import React, { useEffect, useRef } from 'react';

interface ElectricalBackgroundEffectProps {
  className?: string;
  intensity?: 'subtle' | 'vibrant';
}

interface Node {
  x: number;
  y: number;
  baseRadius: number;
  pulseOffset: number;
  color: string;
  connections: number[];
}

interface Pulse {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  color: string;
  size: number;
}

export const ElectricalBackgroundEffect: React.FC<ElectricalBackgroundEffectProps> = ({
  className = '',
  intensity = 'subtle'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Color palette matching Neptune brand: Royal Blue, Sky Blue, Crimson Red
    const brandColors = [
      '#1D438A', // Neptune Royal Navy Blue
      '#258BD7', // Dynamic Sky Blue
      '#3DA4ED', // Electric Light Blue
      '#D7282F', // Neptune Crimson Red
      '#E63940', // Neon Scarlet Red
    ];

    // Build electrical PCB circuit grid
    const nodes: Node[] = [];
    const pulses: Pulse[] = [];
    const gridSize = 75; // Distance between circuit traces
    const cols = Math.ceil(width / gridSize) + 1;
    const rows = Math.ceil(height / gridSize) + 1;

    // Create circuit junction nodes on an electrical grid with organic variations
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Only generate nodes at circuit junctions (approx 45% probability for authentic PCB circuit layout)
        if ((r * 7 + c * 13) % 5 === 0 || (r + c) % 4 === 0) {
          const x = c * gridSize + ((r % 2 === 0) ? 0 : gridSize * 0.25);
          const y = r * gridSize;
          const color = brandColors[(r + c) % brandColors.length];

          nodes.push({
            x,
            y,
            baseRadius: 2.2 + ((r + c) % 3) * 0.8,
            pulseOffset: Math.random() * Math.PI * 2,
            color,
            connections: [],
          });
        }
      }
    }

    // Connect circuit nodes with orthogonal/45-degree electrical traces
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = Math.abs(nodes[i].x - nodes[j].x);
        const dy = Math.abs(nodes[i].y - nodes[j].y);
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Connect if close enough and roughly orthogonal or 45-degree aligned
        if (dist < gridSize * 1.7 && (dx < 10 || dy < 10 || Math.abs(dx - dy) < 15)) {
          if (nodes[i].connections.length < 3 && nodes[j].connections.length < 3) {
            nodes[i].connections.push(j);
          }
        }
      }
    }

    // Spawn electrical current pulses traveling along the circuit traces
    const maxPulses = Math.min(24, Math.max(10, Math.floor(nodes.length * 0.2)));
    for (let p = 0; p < maxPulses; p++) {
      const startNodeIdx = Math.floor(Math.random() * nodes.length);
      const node = nodes[startNodeIdx];
      if (node && node.connections.length > 0) {
        const targetNodeIdx = node.connections[Math.floor(Math.random() * node.connections.length)];
        pulses.push({
          fromNode: startNodeIdx,
          toNode: targetNodeIdx,
          progress: Math.random(),
          speed: 0.006 + Math.random() * 0.012,
          color: brandColors[Math.floor(Math.random() * brandColors.length)],
          size: 2.5 + Math.random() * 2,
        });
      }
    }

    // Handle mouse movement for interactive electrical conduction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Draw electrical arc between two points with realistic branching
    const drawElectricArc = (
      x1: number, 
      y1: number, 
      x2: number, 
      y2: number, 
      color: string, 
      displacement: number = 16
    ) => {
      const midX = (x1 + x2) / 2 + (Math.random() - 0.5) * displacement;
      const midY = (y1 + y2) / 2 + (Math.random() - 0.5) * displacement;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(midX, midY);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.6;
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0; // reset
    };

    // Animation Loop
    let time = 0;
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      const alphaBase = intensity === 'vibrant' ? 0.22 : 0.12;

      // 1. Draw Static Circuit Traces (PCB Lines)
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const from = nodes[i];
        for (let k = 0; k < from.connections.length; k++) {
          const to = nodes[from.connections[k]];
          if (!to) continue;

          ctx.beginPath();
          ctx.moveTo(from.x, from.y);
          ctx.lineTo(to.x, to.y);
          ctx.strokeStyle = `rgba(29, 67, 138, ${alphaBase})`; // subtle royal blue circuit line
          ctx.stroke();
        }
      }

      // 2. Draw Circuit Nodes (Junction Capacitors)
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const pulse = Math.sin(time * 2 + node.pulseOffset);
        const radius = node.baseRadius + pulse * 0.6;

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = 0.35 + pulse * 0.15;
        ctx.fill();

        // Subtle outer glow ring on key nodes
        if (i % 3 === 0) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius + 2.5, 0, Math.PI * 2);
          ctx.strokeStyle = node.color;
          ctx.globalAlpha = 0.18 + pulse * 0.1;
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;

      // 3. Draw Flowing Electrical Current Pulses
      for (let p = 0; p < pulses.length; p++) {
        const pulse = pulses[p];
        const from = nodes[pulse.fromNode];
        const to = nodes[pulse.toNode];

        if (!from || !to) continue;

        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) {
          // Pulse arrived at target node; redirect to next available connection
          pulse.progress = 0;
          pulse.fromNode = pulse.toNode;
          if (to.connections.length > 0) {
            pulse.toNode = to.connections[Math.floor(Math.random() * to.connections.length)];
          } else {
            pulse.toNode = Math.floor(Math.random() * nodes.length);
          }
        }

        // Calculate current position along circuit trace
        const currX = from.x + (to.x - from.x) * pulse.progress;
        const currY = from.y + (to.y - from.y) * pulse.progress;

        // Draw glowing electron/energy packet
        ctx.beginPath();
        ctx.arc(currX, currY, pulse.size, 0, Math.PI * 2);
        ctx.fillStyle = pulse.color;
        ctx.shadowColor = pulse.color;
        ctx.shadowBlur = 10;
        ctx.globalAlpha = 0.85;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        // Draw electric tail
        const tailX = from.x + (to.x - from.x) * Math.max(0, pulse.progress - 0.08);
        const tailY = from.y + (to.y - from.y) * Math.max(0, pulse.progress - 0.08);
        ctx.beginPath();
        ctx.moveTo(currX, currY);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = pulse.color;
        ctx.lineWidth = pulse.size * 0.8;
        ctx.globalAlpha = 0.45;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // 4. Interactive Mouse Conduction (Electric Arcs & Capacitance Probe)
      if (mouseRef.current.active) {
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;

        // Find nearest circuit nodes to the cursor
        const nearbyNodes: { node: Node; dist: number }[] = [];
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          const dist = Math.hypot(n.x - mx, n.y - my);
          if (dist < 170) {
            nearbyNodes.push({ node: n, dist });
          }
        }

        // Sort by distance and spark electric arcs to closest 3 nodes
        nearbyNodes.sort((a, b) => a.dist - b.dist);
        const arcTargets = nearbyNodes.slice(0, 3);

        for (let a = 0; a < arcTargets.length; a++) {
          const target = arcTargets[a];
          const sparkColor = a % 2 === 0 ? '#258BD7' : '#D7282F'; // Brand Sky Blue & Crimson Red arcs
          drawElectricArc(mx, my, target.node.x, target.node.y, sparkColor, 18);
        }

        // Glowing electrical halo around cursor
        const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, 60);
        gradient.addColorStop(0, 'rgba(37, 139, 215, 0.25)');
        gradient.addColorStop(0.5, 'rgba(215, 40, 47, 0.12)');
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(mx, my, 60, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [intensity]);

  return (
    <div 
      className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block opacity-85"
      />
    </div>
  );
};
