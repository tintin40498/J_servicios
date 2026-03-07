// ===== CONTADORES ANIMADOS (VERSIÓN FINAL) =====
function animateNumbers() {
    const counters = document.querySelectorAll('.estadistica-numero');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let count = 0;
        const increment = Math.ceil(target / 50);
        const updateCount = () => {
            if (count < target) {
                count = Math.min(count + increment, target);
                counter.innerText = count;
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
}

// Detectar visibilidad y activar una sola vez
let numbersAnimated = false;
function checkStatsVisibility() {
    const statsSection = document.querySelector('.estadisticas');
    if (statsSection && !numbersAnimated) {
        const rect = statsSection.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight * 0.8 && rect.bottom >= 0;
        if (isVisible) {
            animateNumbers();
            numbersAnimated = true;
        }
    }
}

// Animaciones de entrada al hacer scroll
function animateOnScroll() {
    document.querySelectorAll('.servicio-card, .galeria-item, .contacto-card').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    // Reset y estilos iniciales
    document.querySelectorAll('.estadistica-numero').forEach(el => el.innerText = '0');
    document.querySelectorAll('.servicio-card, .galeria-item, .contacto-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.6s ease';
    });
    
    // Activar si ya son visibles
    checkStatsVisibility();
    animateOnScroll();
});

window.addEventListener('scroll', () => {
    checkStatsVisibility();
    animateOnScroll();
});
