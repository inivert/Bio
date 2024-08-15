document.addEventListener('DOMContentLoaded', () => {
    // This creates a cool particle animation in the background
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 30; // You can adjust this to change the number of particles

    class Particle {
        constructor() {
            // These properties determine how the particles look and move
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 4 + 1;
            this.speedX = Math.random() * 0.2 - 0.1;
            this.speedY = Math.random() * 0.2 - 0.1;
            this.opacity = Math.random() * 0.3 + 0.7;
            // This creates a mix of white and gold particles
            this.color = Math.random() < 0.5 ? 'rgba(255, 255, 255,' : 'rgba(255, 215, 0,';
        }

        update() {
            // This makes the particles move and fade out over time
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.size > 0.2) this.size -= 0.01;
            if (this.opacity > 0) this.opacity -= 0.001;

            // This makes the particles bounce off the edges of the screen
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            // This draws each particle on the canvas
            ctx.fillStyle = this.color + this.opacity + ')';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        // This creates the initial set of particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        // This function runs the animation
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((particle, index) => {
            particle.update();
            particle.draw();

            // This replaces particles that have faded out
            if (particle.size <= 0.2 || particle.opacity <= 0) {
                particles.splice(index, 1);
                particles.push(new Particle());
            }
        });
        requestAnimationFrame(animate);
    }

    init();
    animate();

    // This makes sure the canvas resizes if the window size changes
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});
