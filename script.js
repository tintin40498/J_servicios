// Animaciones al hacer scroll
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.servicio-card, .proyecto-card, .contacto-card');
    elements.forEach(element => {
        const position = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        if(position < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// Inicializar estilos para animación
document.querySelectorAll('.servicio-card, .proyecto-card, .contacto-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
});
