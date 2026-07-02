"use client";
import { useEffect, useRef } from 'react';
import { cn } from '@/utils/cn';

export default function ShaderBackground({ className }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Sync the WebGL drawing-buffer size with the CSS-driven layout size.
    function syncSize() {
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }
    
    if (typeof ResizeObserver !== 'undefined') {
      new ResizeObserver(syncSize).observe(canvas);
    }
    syncSize();
    window.addEventListener('resize', syncSize);

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

    const fs = `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
    vec2 m = u_mouse / u_resolution;
    
    float t = u_time * 0.1;
    
    // Create base nebula colors
    vec3 color1 = vec3(0.02, 0.05, 0.2); // Deep Blue
    vec3 color2 = vec3(0.1, 0.02, 0.15); // Deep Purple
    vec3 color3 = vec3(0.0, 0.1, 0.1);   // Deep Cyan
    
    float noise = 0.0;
    vec2 uv2 = uv * 0.8;
    for(float i = 1.0; i < 5.0; i++) {
        uv2 += vec2(0.2 * sin(i * uv2.y + t), 0.3 * cos(i * uv2.x + t));
        noise += abs(fract(sin(dot(uv2, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) / i;
    }
    
    vec3 finalColor = mix(color1, color2, 0.5 + 0.5 * sin(uv.x + t));
    finalColor = mix(finalColor, color3, 0.5 + 0.5 * cos(uv.y - t));
    
    // Add atmospheric glow
    float dist = length(uv - (m * 2.0 - 1.0));
    finalColor += vec3(0.1, 0.05, 0.2) * (1.0 / (dist * 5.0 + 1.0));
    
    // Subtle star field
    float stars = pow(abs(sin(uv.x * 100.0) * cos(uv.y * 100.0)), 20.0);
    finalColor += vec3(stars * 0.5);
    
    gl_FragColor = vec4(finalColor * 0.4, 1.0);
}`;

    function createShader(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }

    const prog = gl.createProgram();
    gl.attachShader(prog, createShader(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, createShader(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');

    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    const onMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width;
        const ny = 1.0 - (event.clientY - rect.top) / rect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    };
    window.addEventListener('mousemove', onMouseMove);

    let animationId;
    function render(t) {
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationId = requestAnimationFrame(render);
    }
    render(0);

    return () => {
      window.removeEventListener('resize', syncSize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className={cn("fixed inset-0 z-[-1] opacity-40 pointer-events-none", className)}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
