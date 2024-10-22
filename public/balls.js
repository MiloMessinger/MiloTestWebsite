// Mouse position
let mouse = {
    x: undefined,
    y: undefined
};

// Track mouse movement
canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Set canvas size to window size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Dot class
class Dot {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.radius = 5;
        this.baseSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        this.maxSpeed = this.baseSpeed * 5;
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fill();
    }
    
    update() {
        if (mouse.x !== undefined && mouse.y !== undefined) {
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const angle = Math.atan2(dy, dx);
                const force = (100 - distance) / 100;
                
                this.vx += Math.cos(angle) * force * 0.5;
                this.vy += Math.sin(angle) * force * 0.5;
            }
        }
        
        const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (currentSpeed > this.maxSpeed) {
            const scale = this.maxSpeed / currentSpeed;
            this.vx *= scale;
            this.vy *= scale;
        }
        
        if (currentSpeed > this.baseSpeed) {
            const dampening = 0.98;
            this.vx *= dampening;
            this.vy *= dampening;
        }
        
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        
        this.x += this.vx;
        this.y += this.vy;
    }
}

// Create dots
const dots = [];
const numDots = 75;
for (let i = 0; i < numDots; i++) {
    dots.push(new Dot());
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    dots.forEach(dot => {
        dot.update();
        dot.draw();
    });
    
    const maxDistance = 150;
    for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
            const dx = dots[i].x - dots[j].x;
            const dy = dots[i].y - dots[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < maxDistance) {
                ctx.beginPath();
                ctx.moveTo(dots[i].x, dots[i].y);
                ctx.lineTo(dots[j].x, dots[j].y);
                const opacity = (maxDistance - distance) / maxDistance;
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
                ctx.stroke();
            }
        }
    }
    
    requestAnimationFrame(animate);
}

animate();