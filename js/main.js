/* ==============================================
   JServicios · MAIN.JS PROFESIONAL
   Versión 2.0 · Optimizado y mejorado
   ============================================== */

// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const header = document.getElementById('header');
const whatsappFloats = document.querySelectorAll('.whatsapp-float');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

// ==============================================
// 1. MOBILE MENU
// ==============================================
if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        
        const icon = menuToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            document.body.style.overflow = 'hidden';
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = '';
        }
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon?.classList.remove('fa-times');
            icon?.classList.add('fa-bars');
            document.body.style.overflow = '';
        });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon?.classList.remove('fa-times');
            icon?.classList.add('fa-bars');
            document.body.style.overflow = '';
        }
    });
}

// ==============================================
// 2. STICKY HEADER
// ==============================================
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('sticky');
        
        // Ocultar/mostrar header según dirección del scroll
        if (currentScroll > lastScroll && currentScroll > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
    } else {
        header.classList.remove('sticky');
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// ==============================================
// 3. ACTIVE LINK EN MENÚ (SCROLL)
// ==============================================
function highlightNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNav);
highlightNav(); // Ejecutar al cargar

// ==============================================
// 4. SMOOTH SCROLL PARA ANCLAS
// ==============================================
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ==============================================
// 5. ANIMACIÓN DE CONTADORES (ESTADÍSTICAS)
// ==============================================
function animateNumbers() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const suffix = stat.innerText.includes('%') ? '%' : '+';
        let current = 0;
        const increment = target / 50; // 50 pasos
        let animationFrame;
        
        const updateNumber = () => {
            if (current < target) {
                current += increment;
                stat.innerText = Math.ceil(current) + suffix;
                animationFrame = requestAnimationFrame(updateNumber);
            } else {
                stat.innerText = target + suffix;
                cancelAnimationFrame(animationFrame);
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
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.5,
        rootMargin: '0px'
    });
    
    observer.observe(statsSection);
}

// ==============================================
// 6. WHATSAPP MESSAGES PERSONALIZADOS
// ==============================================
function getWhatsAppMessage() {
    const hour = new Date().getHours();
    const isWeekend = [0, 6].includes(new Date().getDay());
    
    let message = "Hola! Me comunico desde la web de JServicios. Quisiera solicitar un presupuesto.";
    
    if (hour >= 20 || hour <= 8 || isWeekend) {
        message = "Hola! Me comunico fuera del horario de atención. Por favor contactarme cuando estén disponibles.";
    }
    
    return encodeURIComponent(message);
}

whatsappFloats.forEach((wa, index) => {
    wa.addEventListener('click', function(e) {
        const number = index === 0 ? '5491159085736' : '5491126866846';
        this.href = `https://wa.me/${number}?text=${getWhatsAppMessage()}`;
    });
});

// ==============================================
// 7. LAZY LOADING PARA IMÁGENES
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
// 8. ANIMACIÓN DE APARICIÓN AL HACER SCROLL
// ==============================================
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.servicio-card, .trabajo-card, .contacto-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px'
    });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
};

animateOnScroll();

// ==============================================
// 9. PREVENIR RE-ENVÍO DE FORMULARIO (si hubiera)
// ==============================================
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// ==============================================
// 10. DETECTAR ORIENTACIÓN DEL DISPOSITIVO
// ==============================================
const handleOrientation = () => {
    const isLandscape = window.innerWidth > window.innerHeight;
    
    if (isLandscape && window.innerWidth <= 768) {
        document.body.classList.add('landscape');
    } else {
        document.body.classList.remove('landscape');
    }
};

window.addEventListener('resize', handleOrientation);
handleOrientation();

// ==============================================
// 11. MOSTRAR AÑO ACTUAL EN EL FOOTER
// ==============================================
const yearElement = document.querySelector('.footer-bottom p');
if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.innerHTML = yearElement.innerHTML.replace('2026', currentYear);
}

// ==============================================
// 12. CONSOLA DE VERIFICACIÓN
// ==============================================
console.log('✅ JServicios · JS cargado correctamente');
console.log('📅 Versión 2.0 · Profesional');
console.log('📱 Modo responsive activado');

// Fin del archivo main.js
