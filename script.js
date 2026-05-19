// ===== PARTICLE SYSTEM =====
function createParticles(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let particles = [];
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 2;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.opacity -= 0.01;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = `rgba(255, 182, 193, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    function init() {
        particles = [];
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();
            
            if (particles[i].opacity <= 0) {
                particles.splice(i, 1);
            }
        }
        
        if (particles.length < 30) {
            particles.push(new Particle());
        }
        
        requestAnimationFrame(animate);
    }
    
    init();
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ===== CONFETTI EFFECT =====
function createConfetti() {
    const container = document.body;
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.backgroundColor = ['#ffb6c1', '#ffc0cb', '#ff69b4', '#ffd700', '#ffe4e1'][Math.floor(Math.random() * 5)];
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%';
        confetti.style.zIndex = '999';
        confetti.style.pointerEvents = 'none';
        
        container.appendChild(confetti);
        
        const duration = Math.random() * 2 + 2;
        const delay = Math.random() * 0.5;
        const rotation = Math.random() * 360;
        
        confetti.animate([
            {
                transform: `translateY(0) rotate(0deg)`,
                opacity: 1
            },
            {
                transform: `translateY(${window.innerHeight}px) rotate(${rotation}deg)`,
                opacity: 0
            }
        ], {
            duration: duration * 1000,
            delay: delay * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        setTimeout(() => confetti.remove(), (duration + delay) * 1000);
    }
}

// ===== SPARKLES EFFECT =====
function createSparkles(x, y, count = 30) {
    for (let i = 0; i < count; i++) {
        const sparkle = document.createElement('span');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.fontSize = Math.random() * 20 + 10 + 'px';
        sparkle.style.zIndex = '999';
        sparkle.style.pointerEvents = 'none';
        
        document.body.appendChild(sparkle);
        
        const angle = (Math.PI * 2 * i) / count;
        const velocity = Math.random() * 5 + 3;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let px = x;
        let py = y;
        let opacity = 1;
        
        const animate = () => {
            px += vx;
            py += vy;
            opacity -= 0.03;
            
            sparkle.style.left = px + 'px';
            sparkle.style.top = py + 'px';
            sparkle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                sparkle.remove();
            }
        };
        
        animate();
    }
}

// ===== NOTIFICATIONS =====
function showNotification(text) {
    const container = document.getElementById('notificationContainer');
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = text;
    
    container.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(50px)';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// ===== MAIN APP =====
document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('passwordInput');
    const loginBtn = document.getElementById('loginBtn');
    const loginScreen = document.getElementById('loginScreen');
    const mainContent = document.getElementById('mainContent');
    const envelope = document.getElementById('envelope');
    const letterModal = document.getElementById('letterModal');
    const letterClose = document.getElementById('letterClose');
    const giftBox = document.getElementById('giftBox');
    const giftMessage = document.getElementById('giftMessage');
    const candles = document.querySelectorAll('.candle');
    const surpriseBtn = document.getElementById('surpriseBtn');
    const surprisePopup = document.getElementById('surprisePopup');
    const finalBtn = document.getElementById('finalBtn');
    const outroSection = document.getElementById('outroSection');
    
    const correctPassword = 'love';
    
    // Login
    loginBtn.addEventListener('click', () => {
        if (passwordInput.value === correctPassword) {
            loginScreen.style.display = 'none';
            mainContent.style.display = 'block';
            setTimeout(() => {
                createParticles('particlesCanvas');
                startNotifications();
            }, 300);
        } else {
            passwordInput.style.animation = 'shake 0.5s';
            setTimeout(() => passwordInput.style.animation = '', 500);
        }
    });
    
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') loginBtn.click();
    });
    
    // Shake animation
    const style = document.createElement('style');
    style.innerHTML = `@keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-10px); } 75% { transform: translateX(10px); } }`;
    document.head.appendChild(style);
    
    // Envelope
    envelope.addEventListener('click', () => {
        envelope.classList.add('open');
        letterModal.style.display = 'flex';
        createSparkles(window.innerWidth / 2, window.innerHeight / 2, 50);
    });
    
    letterClose.addEventListener('click', () => {
        letterModal.style.display = 'none';
        envelope.classList.remove('open');
    });
    
    letterModal.querySelector('.letter-blur').addEventListener('click', () => {
        letterClose.click();
    });
    
    // Candles
    candles.forEach((candle) => {
        candle.addEventListener('click', () => {
            const flame = candle.querySelector('.flame');
            if (!flame.classList.contains('blown')) {
                flame.classList.add('blown');
                createConfetti();
                createSparkles(candle.getBoundingClientRect().left, candle.getBoundingClientRect().top, 20);
                
                const allBlown = Array.from(candles).every(c => c.querySelector('.flame').classList.contains('blown'));
                if (allBlown) {
                    setTimeout(() => showNotification('كل سنة وانتي أجمل بصمة في قلبي ❤️'), 500);
                }
            }
        });
    });
    
    // Gift Box
    giftBox.addEventListener('click', () => {
        if (!giftBox.classList.contains('opened')) {
            giftBox.classList.add('opened');
            createConfetti();
            createSparkles(giftBox.getBoundingClientRect().left + 100, giftBox.getBoundingClientRect().top + 100, 50);
            setTimeout(() => giftMessage.style.display = 'block', 500);
        }
    });
    
    // Surprise
    surpriseBtn.addEventListener('click', () => {
        surprisePopup.style.display = 'block';
        createConfetti();
        createSparkles(window.innerWidth / 2, window.innerHeight / 2, 40);
        setTimeout(() => surprisePopup.style.display = 'none', 3000);
    });
    
    // Final
    finalBtn.addEventListener('click', () => {
        outroSection.style.display = 'flex';
        createParticles('outroParticles');
        createConfetti();
        
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const heart = document.createElement('span');
                heart.innerHTML = '❤️';
                heart.style.position = 'fixed';
                heart.style.left = Math.random() * window.innerWidth + 'px';
                heart.style.top = window.innerHeight + 'px';
                heart.style.fontSize = Math.random() * 30 + 20 + 'px';
                heart.style.zIndex = '501';
                heart.style.pointerEvents = 'none';
                
                outroSection.appendChild(heart);
                
                heart.animate([
                    { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                    { transform: `translateY(-${window.innerHeight}px) rotate(360deg)`, opacity: 0 }
                ], {
                    duration: Math.random() * 3000 + 2000,
                    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                });
            }, i * 50);
        }
    });
    
    function startNotifications() {
        const notifications = [
            'انتي أجمل هدية حصلت في الدنيا ❤️',
            'كل سنة وانتي أميرة قلبي 👑',
            'وجودك حياة ❤️',
            'أنتِ نور حياتي ✨',
            'كل يوم معاك أحلى ❤️'
        ];
        
        setInterval(() => {
            const text = notifications[Math.floor(Math.random() * notifications.length)];
            showNotification(text);
        }, 15000);
    }
    
    // Typing effect
    document.querySelectorAll('.typing-text').forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        let index = 0;
        
        const typing = () => {
            if (index < text.length) {
                element.textContent += text.charAt(index++);
                setTimeout(typing, 30);
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && element.textContent === '') {
                typing();
                observer.unobserve(element);
            }
        });
        observer.observe(element);
    });
    
    // Heart cursor trail
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.98) {
            const heart = document.createElement('span');
            heart.innerHTML = '❤️';
            heart.style.position = 'fixed';
            heart.style.left = e.clientX + 'px';
            heart.style.top = e.clientY + 'px';
            heart.style.fontSize = Math.random() * 15 + 10 + 'px';
            heart.style.zIndex = '999';
            heart.style.pointerEvents = 'none';
            
            document.body.appendChild(heart);
            
            let y = e.clientY, opacity = 1;
            const animate = () => {
                y -= 2;
                opacity -= 0.05;
                heart.style.top = y + 'px';
                heart.style.opacity = opacity;
                opacity > 0 ? requestAnimationFrame(animate) : heart.remove();
            };
            animate();
        }
    });
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(a.getAttribute('href'));
            target?.scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Floating petals
    setInterval(() => {
        const petal = document.createElement('div');
        petal.innerHTML = '🌸';
        petal.style.position = 'fixed';
        petal.style.left = Math.random() * window.innerWidth + 'px';
        petal.style.top = '-50px';
        petal.style.fontSize = Math.random() * 20 + 15 + 'px';
        petal.style.zIndex = '2';
        petal.style.pointerEvents = 'none';
        petal.style.opacity = Math.random() * 0.5 + 0.3;
        
        document.body.appendChild(petal);
        
        let x = parseFloat(petal.style.left), y = -50, vx = Math.random() * 2 - 1, vy = Math.random() * 1 + 1;
        const animate = () => {
            x += vx;
            y += vy;
            vx += Math.random() * 0.2 - 0.1;
            petal.style.left = x + 'px';
            petal.style.top = y + 'px';
            y < window.innerHeight ? requestAnimationFrame(animate) : petal.remove();
        };
        animate();
    }, 1500);
});

// Resize handler
window.addEventListener('resize', () => {
    const canvas = document.getElementById('particlesCanvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});