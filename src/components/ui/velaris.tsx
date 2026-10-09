"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const vertexShaderGLSL = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShaderGLSL = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
varying vec2 vUv;

uniform vec2  u_resolution;
uniform float u_time;
uniform float u_grain;
uniform vec3  u_colors[4];
uniform vec3  u_bg;
uniform vec2  u_mouse;     // posição do cursor em UV (0..1), y já invertido
uniform float u_hover;     // 0..1, suavizado: quanto o cursor está "presente"
uniform float u_strength;  // intensidade da interação

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;
  float ratio = u_resolution.x / u_resolution.y;
  vec2 p = uv - 0.5;
  p.x *= ratio;

  // Interação: o cursor puxa e gira o fluxo ao redor dele (efeito de lente)
  vec2 m = u_mouse - 0.5;
  m.x *= ratio;
  vec2 d = p - m;
  float md2 = dot(d, d);
  float influence = exp(-md2 * 7.0) * u_hover * u_strength;
  p -= d * influence * 0.30;
  p += vec2(-d.y, d.x) * influence * 0.55;

  float t = u_time * 0.1;

  float n1 = snoise(p * 0.4 + vec2(t * 0.2, -t * 0.3));
  float n2 = snoise(p * 0.55 + vec2(-t * 0.15, t * 0.25) + n1 * 0.25);
  float n3 = snoise(p * 0.75 + vec2(t * 0.1, -t * 0.2) + n2 * 0.2);

  vec3 col = u_bg;
  
  float dist = length(p) * 1.5;
  float vignette = 1.0 - smoothstep(0.3, 1.2, dist);
  
  col = mix(col, u_colors[0], smoothstep(-0.2, 0.5, n1) * 0.85);
  col = mix(col, u_colors[1], smoothstep(-0.1, 0.6, n2) * 0.7);
  col = mix(col, u_colors[2], smoothstep(-0.3, 0.4, n3) * 0.6);
  col = mix(col, u_colors[3], smoothstep(0.0, 0.7, n1 * n2) * 0.5);

  float glow = smoothstep(0.8, 0.0, dist) * 0.3;
  col += u_colors[1] * glow;

  col = mix(col * 0.2, col, vignette);

  // Brilho que acompanha o cursor, nas cores da paleta
  col += u_colors[1] * influence * 0.20;
  col += u_colors[0] * exp(-md2 * 26.0) * u_hover * u_strength * 0.25;

  float grain = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453 + u_time);
  col += (grain - 0.5) * u_grain * 0.1;

  gl_FragColor = vec4(col, 1.0);
}
`;

export interface VelarisProps {
  bg?: string;
  colors?: string[];
  speed?: number;
  grain?: number;
  /** Reage ao mouse (e ao toque no celular). Padrão: true */
  interactive?: boolean;
  /** Intensidade da reação ao cursor. Padrão: 1 */
  interactionStrength?: number;
  height?: string;
  className?: string;
  children?: React.ReactNode;
}

const DEFAULT_COLORS = ["#86efac", "#4ade80", "#059669", "#000000"];

const hexToRgb = (hex: string): [number, number, number] => {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ];
};

const Velaris = ({
  bg = "#000000",
  colors = DEFAULT_COLORS,
  speed = 2.0,
  grain = 0.3,
  interactive = true,
  interactionStrength = 1,
  height = "100vh",
  className,
  children,
}: VelarisProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Chave estável: evita recriar o contexto WebGL se o pai passar um array novo a cada render.
  const colorsKey = colors.slice(0, 4).join(",");

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const gl = canvas.getContext("webgl", { antialias: false, powerPreference: "low-power" });
    if (!gl) return;

    const createShader = (type: number, src: string) => {
      const s = gl.createShader(type);
      if (!s) throw new Error("[Velaris] não foi possível criar o shader (contexto WebGL indisponível)");
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error("[Velaris] shader:", gl.getShaderInfoLog(s));
      }
      return s;
    };

    if (gl.isContextLost()) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, createShader(gl.VERTEX_SHADER, vertexShaderGLSL));
    gl.attachShader(
      program,
      createShader(gl.FRAGMENT_SHADER, fragmentShaderGLSL),
    );
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("[Velaris] link:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const pos = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const locs = {
      res: gl.getUniformLocation(program, "u_resolution"),
      time: gl.getUniformLocation(program, "u_time"),
      grain: gl.getUniformLocation(program, "u_grain"),
      colors: gl.getUniformLocation(program, "u_colors"),
      bg: gl.getUniformLocation(program, "u_bg"),
      mouse: gl.getUniformLocation(program, "u_mouse"),
      hover: gl.getUniformLocation(program, "u_hover"),
      strength: gl.getUniformLocation(program, "u_strength"),
    };

    // Uniformes estáticos: calculados uma vez, não a cada frame.
    gl.uniform1f(locs.grain, grain);
    gl.uniform1f(locs.strength, interactionStrength);
    gl.uniform2f(locs.mouse, 0.5, 0.5);
    gl.uniform1f(locs.hover, 0);
    gl.uniform3f(locs.bg, ...hexToRgb(bg));
    gl.uniform3fv(
      locs.colors,
      new Float32Array(colorsKey.split(",").flatMap(hexToRgb)),
    );

    // No celular, limita a resolução: o fundo é difuso e o custo cai bastante.
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const maxDpr = coarse ? 1.25 : 2;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      canvas.width = Math.max(1, Math.round(container.clientWidth * dpr));
      canvas.height = Math.max(1, Math.round(container.clientHeight * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const onLost = (e: Event) => e.preventDefault();
    canvas.addEventListener("webglcontextlost", onLost);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let raf = 0;
    let visible = true;

    // Interação com o ponteiro: alvo (target) e valor suavizado (cur)
    const target = { x: 0.5, y: 0.5, hover: 0 };
    const cur = { x: 0.5, y: 0.5, hover: 0 };
    let lastT = 0;

    let lastPtr: { x: number; y: number } | null = null;

    const setTargetFromXY = (clientX: number, clientY: number) => {
      const r = container.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      const x = (clientX - r.left) / r.width;
      const y = (clientY - r.top) / r.height;
      const inside = x >= 0 && x <= 1 && y >= 0 && y <= 1;
      target.hover = inside ? 1 : 0;
      if (inside) {
        target.x = x;
        target.y = 1 - y; // UV do WebGL tem y para cima
        // Primeira vez: já nasce na posição do cursor, sem "voar" do centro
        if (cur.hover < 0.01) {
          cur.x = target.x;
          cur.y = target.y;
        }
      }
    };
    const onPointerMove = (e: PointerEvent) => {
      lastPtr = { x: e.clientX, y: e.clientY };
      setTargetFromXY(e.clientX, e.clientY);
    };
    const onPointerEnd = () => {
      lastPtr = null;
      target.hover = 0;
    };
    // Mouse parado + página rolando: o hero se mexe sob o cursor, então reavalia a posição
    const onScroll = () => {
      if (lastPtr) setTargetFromXY(lastPtr.x, lastPtr.y);
    };

    const draw = (t: number) => {
      // Suavização independente da taxa de quadros
      const dt = lastT ? Math.min((t - lastT) / 1000, 0.1) : 0.016;
      lastT = t;
      const kPos = 1 - Math.exp(-dt * 9);
      const kHover = 1 - Math.exp(-dt * (target.hover > cur.hover ? 6 : 2.5));
      cur.x += (target.x - cur.x) * kPos;
      cur.y += (target.y - cur.y) * kPos;
      cur.hover += (target.hover - cur.hover) * kHover;

      gl.uniform2f(locs.res, canvas.width, canvas.height);
      gl.uniform1f(locs.time, t * 0.001 * speed);
      gl.uniform2f(locs.mouse, cur.x, cur.y);
      gl.uniform1f(locs.hover, cur.hover);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const loop = (t: number) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (raf || reduceMotion) return;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    // Quem prefere menos movimento recebe um quadro estático.
    if (reduceMotion) draw(8000);
    else start();

    // Pausa o shader quando o hero sai da tela (economiza bateria no celular).
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !document.hidden) start();
      else stop();
    });
    io.observe(container);

    // Ouve na janela: o canvas fica atrás do conteúdo (pointer-events: none) e o texto
    // do hero cobre quase tudo, então eventos direto no canvas nunca chegariam.
    const listen = interactive && !reduceMotion;
    if (listen) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerdown", onPointerMove, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("pointerup", onPointerEnd, { passive: true });
      window.addEventListener("pointercancel", onPointerEnd, { passive: true });
      document.documentElement.addEventListener("pointerleave", onPointerEnd);
    }

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (visible) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onLost);
      if (listen) {
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerdown", onPointerMove);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("pointerup", onPointerEnd);
        window.removeEventListener("pointercancel", onPointerEnd);
        document.documentElement.removeEventListener("pointerleave", onPointerEnd);
      }
      // NÃO chamar loseContext() aqui: o StrictMode (dev) remonta o efeito no MESMO canvas,
      // e um contexto perdido não pode ser reaproveitado. Só liberamos o que criamos.
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, [bg, colorsKey, speed, grain, interactive, interactionStrength]);

  return (
    <div
      ref={containerRef}
      style={{ height }}
      className={cn("relative w-full overflow-hidden", className)}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
};

export default Velaris;
