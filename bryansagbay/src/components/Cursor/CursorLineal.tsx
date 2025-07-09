import React, { useEffect } from 'react';
import './CursorLineal.css';


const CursorLineal: React.FC = () => {
    useEffect(() => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
    
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '1';
    
        document.body.appendChild(canvas);
    
        const path: { x: number; y: number; alpha: number }[] = [];
    
        const handleMouseMove = (e: MouseEvent) => {
          path.push({
            x: e.clientX,
            y: e.clientY,
            alpha: 1,
          });
        };
    
        const animate = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
    
          ctx.lineJoin = 'round';
          ctx.lineCap = 'round';
          ctx.lineWidth = 4;
    
          for (let i = 1; i < path.length; i++) {
            const p1 = path[i - 1];
            const p2 = path[i];
    
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(100, 242, 255, ${p2.alpha})`;
            ctx.shadowColor = '#64f2ff';
            ctx.shadowBlur = 12;
            ctx.stroke();
    
            // Fade out
            p1.alpha -= 0.01;
            if (p1.alpha <= 0) {
              path.splice(i - 1, 1);
              i--;
            }
          }
    
          requestAnimationFrame(animate);
        };
    
        animate();
        window.addEventListener('mousemove', handleMouseMove);
    
        return () => {
          window.removeEventListener('mousemove', handleMouseMove);
          canvas.remove();
        };
      }, []);
    
      return null;
    };
    
export default CursorLineal;