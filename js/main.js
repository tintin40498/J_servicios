/* ==============================================
   JServicios · MAIN.JS PROFESIONAL
   Versión 3.0 · Optimizado para logos dinámicos
   ============================================== */

// ==============================================
// 0. CONFIGURACIÓN GLOBAL
// ==============================================
const CONFIG = {
    whatsappNumbers: {
        general: '5491159085736',
        presupuestos: '5491126866846'
    },
    whatsappMessages: {
        general: 'Hola! Me comunico desde la web de JServicios. Quisiera solicitar información.',
        presupuestos: 'Hola! Me comunico desde la web de JServicios para solicitar un presupuesto.'
    },
    animationDelay: 100,
    scrollOffset: 80
};

// ==============================================
// 1. DOM ELEMENTS
// ==============================================
const DOM = {
    menuToggle: document.getElementById('menuToggle'),
    navMenu: document.getElementById('navMenu'),
    header: document.getElementById('header'),
    whatsappFloats: document.querySelectorAll('.whatsapp-float'),
    navLinks: document.querySelectorAll('.nav-link'),
    sections: document.querySelectorAll('section[id]'),
    statsNumbers: document.querySelectorAll('.stat-number'),
    yearElement: document.querySelector('.footer-bottom p'),
    lazyImages: document.querySelectorAll('img[loading="lazy"]')
};

// ==============================================
// 2. MOBILE MENU MEJORADO
// ==============================================
class MobileMenu {
    constructor() {
        this.menuToggle = DOM.menuToggle;
        this.navMenu = DOM.navMenu;
        this.navLinks = DOM.navLinks;
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        if (!this.menuToggle || !this.navMenu) return;
        
        this.menuToggle.addEventListener('click', (e) => this.toggleMenu(e));
        this.navLinks.forEach(link => link.addEventListener('click', () => this.closeMenu()));
        document.addEventListener('click', (e) => this.handleClickOutside(e));
        window.addEventListener('resize', () => this.handleResize());
    }
    
    toggleMenu(e) {
        e.stopPropagation();
        this.isOpen = !this.isOpen;
        
        this.navMenu.classList.toggle('active', this.isOpen);
        
        const icon = this.menuToggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars', !this.isOpen);
            icon.classList.toggle('fa-times', this.isOpen);
        }
        
        document.body.style.overflow = this.isOpen ? 'hidden' : '';
    }
    
    closeMenu() {
        if (!this.isOpen) return;
        
        this.isOpen = false;
        this.navMenu.classList.remove('active');
        
        const icon = this.menuToggle?.querySelector('i');
        if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
        
        document.body.style.overflow = '';
    }
    
    handleClickOutside(e) {
        if (!this.navMenu || !this.menuToggle) return;
        
        const clickedOutside = !this.navMenu.contains(e.target) && 
                               !this.menuToggle.contains(e.target);
        
        if (clickedOutside && this.isOpen) {
            this.closeMenu();
        }
    }
    
    handleResize() {
        if (window.innerWidth > 768 && this.isOpen) {
            this.closeMenu();
        }
    }
}

// Inicializar menú móvil
const mobileMenu = new MobileMenu();
// ==============================================
// 3. STICKY HEADER CON OPTIMIZACIÓN
// ==============================================
class StickyHeader {
    constructor() {
        this.header = DOM.header;
        this.lastScroll = 0;
        this.ticking = false;
        
        this.init();
    }
    
    init() {
        if (!this.header) return;
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    }
    
    handleScroll() {
        if (!this.ticking) {
            window.requestAnimationFrame(() => {
                this.updateHeader();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }
    
    updateHeader() {
        const currentScroll = window.pageYOffset;
        const headerHeight = this.header.offsetHeight;
        
        if (currentScroll > 100) {
            this.header.classList.add('sticky');
            
            // Ocultar al bajar, mostrar al subir (después de 200px)
            if (currentScroll > this.lastScroll && currentScroll > 200) {
                this.header.style.transform = `translateY(-${headerHeight}px)`;
            } else {
                this.header.style.transform = 'translateY(0)';
            }
        } else {
            this.header.classList.remove('sticky');
            this.header.style.transform = 'translateY(0)';
        }
        
        this.lastScroll = currentScroll;
    }
}

// Inicializar
const stickyHeader = new StickyHeader();

// ==============================================
// 4. ACTIVE LINK EN MENÚ (SCROLL) - OPTIMIZADO
// ==============================================
class NavHighlighter {
    constructor() {
        this.sections = DOM.sections;
        this.navLinks = DOM.navLinks;
        this.offset = CONFIG.scrollOffset;
        this.ticking = false;
        
        this.init();
    }
    
    init() {
        if (!this.sections.length || !this.navLinks.length) return;
        
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
        this.highlight(); // Ejecutar al inicio
    }
    
    handleScroll() {
        if (!this.ticking) {
            window.requestAnimationFrame(() => {
                this.highlight();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }
    
    highlight() {
        const scrollY = window.pageYOffset;
        
        this.sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - this.offset;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }
}

// Inicializar
const navHighlighter = new NavHighlighter();

// ==============================================
// 5. SMOOTH SCROLL PARA ANCLAS (OPTIMIZADO)
// ==============================================
class SmoothScroll {
    constructor() {
        this.links = DOM.navLinks;
        this.offset = CONFIG.scrollOffset;
        
        this.init();
    }
    
    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => this.handleClick(e, link));
        });
    }
    
    handleClick(e, link) {
        const href = link.getAttribute('href');
        
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const targetPosition = target.offsetTop - this.offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Actualizar URL sin recargar
                history.pushState(null, null, href);
            }
        }
    }
}

// Inicializar
const smoothScroll = new SmoothScroll();
// ==============================================
// 6. ANIMACIÓN DE CONTADORES (ESTADÍSTICAS) MEJORADA
// ==============================================
class StatsCounter {
    constructor() {
        this.stats = DOM.statsNumbers;
        this.animated = false;
        this.observer = null;
        
        this.init();
    }
    
    init() {
        if (!this.stats.length) return;
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated) {
                    this.animateAll();
                    this.animated = true;
                    this.observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.5,
            rootMargin: '50px'
        });
        
        // Observar la sección de estadísticas
        const statsSection = document.querySelector('.stats');
        if (statsSection) {
            this.observer.observe(statsSection);
        }
    }
    
    animateAll() {
        this.stats.forEach(stat => this.animateNumber(stat));
    }
    
    animateNumber(stat) {
        const target = parseInt(stat.getAttribute('data-target')) || 
                       parseInt(stat.innerText) || 0;
        const suffix = stat.innerText.includes('%') ? '%' : '+';
        let current = 0;
        const increment = target / 60; // 60fps * 1 segundo
        let startTime = null;
        
        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            
            if (progress < 1000) { // 1 segundo de animación
                current = Math.min(target * (progress / 1000), target);
                stat.innerText = Math.floor(current) + suffix;
                requestAnimationFrame(animate);
            } else {
                stat.innerText = target + suffix;
            }
        };
        
        requestAnimationFrame(animate);
    }
}

// Inicializar contadores
const statsCounter = new StatsCounter();

// ==============================================
// 7. WHATSAPP MESSAGES PERSONALIZADOS (MEJORADO)
// ==============================================
class WhatsAppManager {
    constructor() {
        this.buttons = DOM.whatsappFloats;
        this.init();
    }
    
    init() {
        if (!this.buttons.length) return;
        
        this.buttons.forEach((button, index) => {
            button.addEventListener('click', (e) => this.handleClick(e, button, index));
        });
    }
    
    getMessage(type) {
        const hour = new Date().getHours();
        const day = new Date().getDay();
        const isWeekend = day === 0 || day === 6;
        const isLate = hour >= 20 || hour <= 8;
        
        let baseMessage = type === 0 ? CONFIG.whatsappMessages.general : CONFIG.whatsappMessages.presupuestos;
        
        if (isWeekend || isLate) {
            baseMessage = "Hola! Me comunico fuera del horario de atención. Por favor contactarme cuando estén disponibles. " + baseMessage;
        }
        
        return encodeURIComponent(baseMessage);
    }
    
    handleClick(e, button, index) {
        e.preventDefault();
        
        const number = index === 0 ? CONFIG.whatsappNumbers.general : CONFIG.whatsappNumbers.presupuestos;
        const message = this.getMessage(index);
        const url = `https://wa.me/${number}?text=${message}`;
        
        window.open(url, '_blank');
    }
}

// Inicializar WhatsApp
const whatsappManager = new WhatsAppManager();

// ==============================================
// 8. LAZY LOADING MEJORADO
// ==============================================
class LazyLoader {
    constructor() {
        this.images = DOM.lazyImages;
        this.init();
    }
    
    init() {
        if (!this.images.length) return;
        
        if ('loading' in HTMLImageElement.prototype) {
            // Navegador soporta lazy loading nativo
            this.images.forEach(img => {
                img.loading = 'lazy';
            });
        } else {
            // Fallback para navegadores antiguos
            this.loadPolyfill();
        }
        
        // Observar cambios en imágenes dinámicas (desde admin)
        this.observeDynamicImages();
    }
    
    loadPolyfill() {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        script.async = true;
        document.body.appendChild(script);
    }
    
    observeDynamicImages() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeName === 'IMG' && node.getAttribute('loading') === 'lazy') {
                        node.loading = 'lazy';
                    }
                });
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
}

// Inicializar lazy loading
const lazyLoader = new LazyLoader();

// ==============================================
// 9. ANIMACIÓN DE APARICIÓN AL HACER SCROLL (MEJORADA)
// ==============================================
class ScrollAnimator {
    constructor() {
        this.elements = [
            ...document.querySelectorAll('.servicio-card'),
            ...document.querySelectorAll('.trabajo-card'),
            ...document.querySelectorAll('.contacto-card'),
            ...document.querySelectorAll('.galeria-item')
        ];
        this.observer = null;
        
        this.init();
    }
    
    init() {
        if (!this.elements.length) return;
        
        // Resetear estilos
        this.elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    this.observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '50px'
        });
        
        this.elements.forEach(el => this.observer.observe(el));
    }
}

// Inicializar animaciones
const scrollAnimator = new ScrollAnimator();
// ==============================================
// 10. PREVENIR RE-ENVÍO DE FORMULARIO
// ==============================================
class FormHandler {
    constructor() {
        this.init();
    }
    
    init() {
        if (window.history.replaceState) {
            window.history.replaceState(null, null, window.location.href);
        }
    }
}

// Inicializar
const formHandler = new FormHandler();

// ==============================================
// 11. DETECTAR ORIENTACIÓN DEL DISPOSITIVO
// ==============================================
class DeviceOrientation {
    constructor() {
        this.init();
    }
    
    init() {
        this.handleOrientation();
        window.addEventListener('resize', () => this.handleOrientation());
        window.addEventListener('orientationchange', () => this.handleOrientation());
    }
    
    handleOrientation() {
        const isLandscape = window.innerWidth > window.innerHeight;
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile && isLandscape) {
            document.body.classList.add('landscape');
        } else {
            document.body.classList.remove('landscape');
        }
        
        // Actualizar variable CSS para altura dinámica en móviles
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
}

// Inicializar
const deviceOrientation = new DeviceOrientation();

// ==============================================
// 12. MOSTRAR AÑO ACTUAL EN EL FOOTER (DINÁMICO)
// ==============================================
class YearUpdater {
    constructor() {
        this.yearElement = DOM.yearElement;
        this.init();
    }
    
    init() {
        if (!this.yearElement) return;
        
        const currentYear = new Date().getFullYear();
        const originalText = this.yearElement.innerHTML;
        
        // Reemplazar 2024, 2025, 2026, etc. por el año actual
        this.yearElement.innerHTML = originalText.replace(/\d{4}/g, currentYear);
    }
}

// Inicializar
const yearUpdater = new YearUpdater();

// ==============================================
// 13. DETECTAR Y CARGAR LOGOS DINÁMICOS (INTEGRACIÓN CON ADMIN)
// ==============================================
class DynamicLogoLoader {
    constructor() {
        this.logoPrincipal = document.getElementById('logo-principal');
        this.logoSecundario = document.getElementById('logo-secundario');
        this.favicon = document.getElementById('favicon');
        
        this.init();
    }
    
    init() {
        // Los logos ya se cargan desde JSONBin en el HTML
        // Esta función solo verifica que existan
        this.checkLogos();
    }
    
    checkLogos() {
        if (this.logoPrincipal && !this.logoPrincipal.src) {
            console.log('⏳ Esperando logo principal...');
        }
        
        if (this.logoSecundario && !this.logoSecundario.src) {
            console.log('⏳ Esperando logo secundario...');
        }
    }
}

// Inicializar
const dynamicLogoLoader = new DynamicLogoLoader();

// ==============================================
// 14. TOUCH OPTIMIZATIONS (para móviles)
// ==============================================
class TouchOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        if ('ontouchstart' in window) {
            document.body.classList.add('touch-device');
            
            // Prevenir doble tap zoom en botones
            const buttons = document.querySelectorAll('.btn, .nav-link, .whatsapp-float');
            buttons.forEach(button => {
                button.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                }, { passive: false });
            });
        }
    }
}

// Inicializar
const touchOptimizer = new TouchOptimizer();

// ==============================================
// 15. VERIFICACIÓN DE CONEXIÓN
// ==============================================
class ConnectionChecker {
    constructor() {
        this.init();
    }
    
    init() {
        if (!navigator.onLine) {
            this.showOfflineWarning();
        }
        
        window.addEventListener('online', () => this.hideOfflineWarning());
        window.addEventListener('offline', () => this.showOfflineWarning());
    }
    
    showOfflineWarning() {
        const warning = document.createElement('div');
        warning.id = 'offline-warning';
        warning.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background: #dc2626;
            color: white;
            text-align: center;
            padding: 10px;
            z-index: 10000;
            font-weight: 600;
        `;
        warning.textContent = '⚠️ Sin conexión a internet. Algunas funciones pueden no estar disponibles.';
        
        if (!document.getElementById('offline-warning')) {
            document.body.prepend(warning);
        }
    }
    
    hideOfflineWarning() {
        const warning = document.getElementById('offline-warning');
        if (warning) {
            warning.remove();
        }
    }
}

// Inicializar
const connectionChecker = new ConnectionChecker();

// ==============================================
// 16. CONSOLA DE VERIFICACIÓN (VERSIÓN 3.0)
// ==============================================
class ConsoleLogger {
    constructor() {
        this.logVersion();
        this.logFeatures();
    }
    
    logVersion() {
        const styles = [
            'background: #5D3A1A',
            'color: #B68B40',
            'padding: 8px 15px',
            'border-radius: 30px',
            'font-weight: bold',
            'font-size: 14px'
        ].join(';');
        
        console.log('%c🛠️ JServicios · JS v3.0 Profesional', styles);
    }
    
    logFeatures() {
        console.log('📦 Módulos cargados:');
        console.log('   ✅ Mobile Menu');
        console.log('   ✅ Sticky Header');
        console.log('   ✅ Smooth Scroll');
        console.log('   ✅ Stats Counter');
        console.log('   ✅ WhatsApp Manager');
        console.log('   ✅ Lazy Loader');
        console.log('   ✅ Scroll Animator');
        console.log('   ✅ Device Optimizer');
        console.log('   ✅ Dynamic Logo Ready');
        
        console.log('📱 Modo responsive activado');
        console.log('🖼️ Esperando logos desde admin...');
        
        // Mostrar hora actual
        const now = new Date();
        console.log(`⏰ Cargado: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`);
    }
}

// Inicializar consola
const consoleLogger = new ConsoleLogger();

// ==============================================
// 17. EXPORTAR FUNCIONES PARA USO GLOBAL (si es necesario)
// ==============================================
window.JServicios = {
    version: '3.0.0',
    config: CONFIG,
    utils: {
        mobileMenu,
        stickyHeader,
        navHighlighter,
        smoothScroll,
        statsCounter,
        whatsappManager,
        lazyLoader,
        scrollAnimator,
        deviceOrientation,
        yearUpdater
    },
    reloadLogos: () => {
        window.location.reload();
    }
};

// ==============================================
// 18. CLEANUP AL DESMONTAR
// ==============================================
window.addEventListener('beforeunload', () => {
    // Limpiar observadores si es necesario
    if (scrollAnimator.observer) {
        scrollAnimator.observer.disconnect();
    }
});

/* ==============================================
   FIN DEL ARCHIVO main.js
   ============================================== */
