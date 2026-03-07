// ===== CONTADORES ANIMADOS =====
function animateNumbers() {
    const counters = document.querySelectorAll('.estadistica-numero');
    
    counters.forEach(counter => {
        const updateCount = () => {
            const target = parseInt(counter.getAttribute('data-target'));
            const count = parseInt(counter.innerText);
            
            if (count < target) {
                const increment = Math.ceil(target / 50);
                counter.innerText = Math.min(count + increment, target);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        
        updateCount();
    });
}

// ===== DETECTAR CUANDO LAS ESTADÍSTICAS SON VISIBLES =====
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

let numbersAnimated = false;

function checkStatsVisibility() {
    const statsSection = document.querySelector('.estadisticas');
    if (statsSection && isElementInViewport(statsSection) && !numbersAnimated) {
        animateNumbers();
        numbersAnimated = true;
    }
}

// ===== ANIMACIONES DE SCROLL =====
function animateOnScroll() {
    const elements = document.querySelectorAll('.servicio-card, .galeria-item, .contacto-card');
    
    elements.forEach(element => {
        const position = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if(position < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// ===== INICIALIZAR =====
document.addEventListener('DOMContentLoaded', () => {
    // Resetear contadores
    document.querySelectorAll('.estadistica-numero').forEach(el => {
        el.innerText = '0';
    });
    
    // Establecer estilos iniciales para animaciones
    document.querySelectorAll('.servicio-card, .galeria-item, .contacto-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.6s ease';
    });
    
    // Verificar visibilidad inicial
    checkStatsVisibility();
    animateOnScroll();
});

// ===== EVENTOS DE SCROLL =====
window.addEventListener('scroll', () => {
    checkStatsVisibility();
    animateOnScroll();
});

// ===== EFECTO DE TYPING EN EL HEADER (OPCIONAL) =====
const tagline = document.querySelector('.hero-tagline');
if(tagline) {
    const text = tagline.textContent;
    tagline.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if(i < text.length) {
            tagline.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    setTimeout(typeWriter, 1000);
}
