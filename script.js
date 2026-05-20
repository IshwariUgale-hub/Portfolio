
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let mouse = { x: window.innerWidth/2, y: window.innerHeight/2 };
let particles = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.onresize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

document.addEventListener('mousemove', e => {
  mouse.x = e.clientX; 
  mouse.y = e.clientY;

  for(let i=0; i<2; i++) {
    particles.push({
      x: mouse.x,
      y: mouse.y,
      vx: (Math.random()-0.5)*1.5,
      vy: (Math.random()-0.5)*1.5 - 0.5,
      life: 1,
      r: Math.random()*2+1
    });
  }
});

function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  const g = ctx.createRadialGradient(mouse.x,mouse.y,0,mouse.x,mouse.y,220);
  g.addColorStop(0,'rgba(187,158,253,0.08)');
  g.addColorStop(1,'transparent');

  ctx.fillStyle = g;
  ctx.fillRect(0,0,canvas.width,canvas.height);

  particles = particles.filter(p => p.life > 0);

  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI*2);
    ctx.fillStyle = `rgba(187,158,253,${p.life*0.6})`;
    ctx.fill();

    p.x += p.vx;
    p.y += p.vy;
    p.life -= 0.025;
  });

  requestAnimationFrame(draw);
}

draw();



// About section scroll-reveal

document.addEventListener('DOMContentLoaded', () => {
 
  /* ── Scroll-reveal: About cards + timeline items ── */
  const revealEls = document.querySelectorAll('.timeline-item, .about-card');
 
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
 
  revealEls.forEach(el => observer.observe(el));
 
  /* ── Timeline click → active state (for mobile tap) ── */
  document.querySelectorAll('.timeline-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.timeline-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });
 
});