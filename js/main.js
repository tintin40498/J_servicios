// ==============================================
// MAIN.JS - JServicios
// ==============================================

// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const header = document.querySelector('.header');
const whatsappFloat = document.querySelector('.whatsapp-float');

// ==============================================
// MOBILE MENU
// ==============================================
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Cambiar ícono
        const icon = menuToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            // Bloquear scroll del body
            document.body.style.overflow = 'hidden';
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = '';
        }
    });
}

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = menuToggle?.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
        document.body.style.overflow = '';
    });
});

// ==============================================
// STICKY HEADER
// ==============================================
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

// ==============================================
// SMOOTH SCROLL PARA ANCLAS
// ==============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ==============================================
// ACTIVE LINK EN MENÚ (SCROLL)
// ==============================================
const sections = document.querySelectorAll('section[id]');

function highlightNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNav);

// ==============================================
// ANIMACIÓN DE CONTADORES (ESTADÍSTICAS)
// ==============================================
function animateNumbers() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50; // 50 pasos
        
        const updateNumber = () => {
            if (current < target) {
                current += increment;
                stat.innerText = Math.ceil(current) + (target === 100 ? '%' : '+');
                requestAnimationFrame(updateNumber);
            } else {
                stat.innerText = target + (target === 100 ? '%' : '+');
            }
        };
        
        updateNumber();
    });
}

// Detectar cuando la sección de stats es visible
const statsSection = document.querySelector('.stats');
let animated = false;

if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animateNumbers();
                animated = true;
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
}

// ==============================================
// WHATSAPP MESSAGES PERSONALIZADOS
// ==============================================
if (whatsappFloat) {
    whatsappFloat.addEventListener('click', function(e) {
        // Puedes cambiar el mensaje según la hora del día
        const hour = new Date().getHours();
        let message = "Hola! Me comunico desde la web de JServicios. Quisiera solicitar un presupuesto.";
        
        if (hour >= 20 || hour <= 8) {
            message = "Hola! Me comunico fuera del horario de atención. Por favor contactarme cuando estén disponibles.";
        }
        
        this.href = `https://wa.me/5491159085736?text=${encodeURIComponent(message)}`;
    });
}

// ==============================================
// LAZY LOADING PARA IMÁGENES (FALLBACK)
// ==============================================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.loading = 'lazy';
    });
} else {
    // Fallback para navegadores antiguos
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ==============================================
// PREVENIR RE-ENVÍO DE FORMULARIO (si lo hubiera)
// ==============================================
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

console.log('✅ JServicios - JS cargado correctamente');
