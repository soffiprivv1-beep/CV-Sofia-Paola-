// ==========================================
// CONFIGURACIÓN INICIAL Y VARIABLES GLOBALES
// ==========================================

const loader = document.getElementById('loader');
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const menuToggle = document.getElementById('menuToggle');
const scrollToTop = document.getElementById('scrollToTop');
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
const particles = document.getElementById('particles');
const contactForm = document.getElementById('contactForm');

// ==========================================
// LOADER
// ==========================================

window.addEventListener('load', () => {
    setTimeout(() => {
        loader.style.display = 'none';
    }, 2000);
});

// ==========================================
// CURSOR ELEGANTE
// ==========================================

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    // Cursor outer ring
    cursor.style.left = (x - 15) + 'px';
    cursor.style.top = (y - 15) + 'px';
    
    // Cursor dot
    cursorDot.style.left = (x - 4) + 'px';
    cursorDot.style.top = (y - 4) + 'px';
});

document.addEventListener('mousedown', () => {
    cursor.style.transform = 'scale(0.7)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'scale(1)';
});

// Ocultar cursor cuando está fuera de pantalla
document.addEventListener('mouseleave', () => {
    cursor.style.display = 'none';
    cursorDot.style.display = 'none';
});

document.addEventListener('mouseenter', () => {
    cursor.style.display = 'block';
    cursorDot.style.display = 'block';
});

// ==========================================
// PARTÍCULAS FLOTANTES
// ==========================================

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 3 + 1;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    const startX = Math.random() * window.innerWidth;
    const startY = window.innerHeight + 10;
    
    particle.style.left = startX + 'px';
    particle.style.top = startY + 'px';
    
    const duration = Math.random() * 10 + 15;
    particle.style.animationDuration = duration + 's';
    
    const delay = Math.random() * 5;
    particle.style.animationDelay = delay + 's';
    
    const opacity = Math.random() * 0.5 + 0.2;
    particle.style.background = `rgba(37, 99, 235, ${opacity})`;
    
    particles.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, (duration + delay) * 1000);
}

// Crear partículas continuamente
setInterval(createParticle, 500);

// ==========================================
// NAVBAR - SCROLL Y MOBILE MENU
// ==========================================

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Mostrar botón scroll-to-top
    if (window.scrollY > 300) {
        scrollToTop.classList.add('show');
    } else {
        scrollToTop.classList.remove('show');
    }
});

// Toggle menu móvil
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menu cuando se hace click en un link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ==========================================
// SCROLL TO TOP
// ==========================================

scrollToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==========================================
// ANIMACIONES AL HACER SCROLL (INTERSECTION OBSERVER)
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('scroll-animation');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos
document.querySelectorAll('.skill-item, .vocational-card, .interest-card, .cert-card, .timeline-item, .goal-item').forEach(el => {
    observer.observe(el);
});

// ==========================================
// ANIMACIÓN DE BARRAS DE HABILIDADES
// ==========================================

const skillsSection = document.querySelector('.skills');
let skillsAnimated = false;

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
            animateSkillBars();
            skillsAnimated = true;
        }
    });
}, { threshold: 0.5 });

if (skillsSection) {
    skillObserver.observe(skillsSection);
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.animation = 'none';
            setTimeout(() => {
                bar.style.animation = '';
                bar.style.width = width;
            }, 10);
        }, 10);
    });
}

// ==========================================
// CONTADOR ANIMADO PARA ESTADÍSTICAS
// ==========================================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('%') ? '%' : (element.textContent.includes('+') ? '+' : ''));
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('%') ? '%' : (element.textContent.includes('+') ? '+' : ''));
        }
    }, 16);
}

const statsSection = document.querySelector('.about');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const value = parseInt(stat.textContent);
                animateCounter(stat, value);
            });
            statsAnimated = true;
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// ==========================================
// VALIDACIÓN Y ENVÍO DE FORMULARIO
// ==========================================

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validación básica
        if (!name || !email || !message) {
            showNotification('Por favor completa todos los campos', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Por favor ingresa un correo válido', 'error');
            return;
        }
        
        if (message.length < 10) {
            showNotification('El mensaje debe tener al menos 10 caracteres', 'error');
            return;
        }
        
        // Simular envío (en producción, usar backend)
        const button = contactForm.querySelector('button');
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        button.disabled = true;
        
        setTimeout(() => {
            showNotification('¡Mensaje enviado exitosamente! Gracias por contactarme.', 'success');
            contactForm.reset();
            button.innerHTML = originalText;
            button.disabled = false;
        }, 2000);
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 12px;
        background: ${type === 'success' ? 'rgba(37, 99, 235, 0.9)' : 'rgba(236, 72, 153, 0.9)'};
        color: white;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease forwards;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Estilos de notificación
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(400px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(400px);
        }
    }
`;
document.head.appendChild(style);

// ==========================================
// EFECTO PARALLAX EN HERO
// ==========================================

const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY < window.innerHeight) {
            const parallaxElements = hero.querySelectorAll('.hero-profile, .hero-text');
            parallaxElements.forEach(el => {
                el.style.transform = `translateY(${scrollY * 0.5}px)`;
            });
        }
    });
}

// ==========================================
// EFECTOS DE GALERÍA
// ==========================================

const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        createLightbox(item.querySelector('img').src);
    });
});

function createLightbox(imageSrc) {
    const lightbox = document.createElement('div');
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10001;
        animation: fadeIn 0.3s ease;
    `;
    
    const img = document.createElement('img');
    img.src = imageSrc;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 12px;
        animation: zoomIn 0.3s ease;
    `;
    
    lightbox.appendChild(img);
    document.body.appendChild(lightbox);
    
    lightbox.addEventListener('click', () => {
        lightbox.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => lightbox.remove(), 300);
    });
}

// Agregar keyframes para lightbox
const lightboxStyle = document.createElement('style');
lightboxStyle.textContent = `
    @keyframes zoomIn {
        from {
            opacity: 0;
            transform: scale(0.5);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes fadeOut {
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(lightboxStyle);

// ==========================================
// SMOOTH SCROLL PARA NAVEGACIÓN INTERNA
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================
// MODO OSCURO PROFESIONAL (Verificar preferencias)
// ==========================================

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    // Forzar modo oscuro incluso si el sistema prefiere claro
    document.documentElement.setAttribute('data-theme', 'dark');
}

// ==========================================
// ATAJOS DE TECLADO
// ==========================================

document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K para abrir contacto
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }
    
    // Escape para cerrar menú móvil
    if (e.key === 'Escape') {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ==========================================
// INICIALIZACIÓN
// ==========================================

console.log('🚀 Portal Profesional de Sofía Paola iniciado correctamente');
console.log('✨ Diseño futurista, elegante y profesional');
console.log('💼 Listo para destacar en el mundo laboral');