// Datos de proyectos (simulados sin imágenes)
const proyectos = [
    {
        titulo: "Remodelación Integral",
        descripcion: "Departamento completo en Palermo",
        servicios: ["Plomería", "Electricidad", "Pintura"],
        icono: "fa-solid fa-rotate"
    },
    {
        titulo: "Estructura Metálica",
        descripcion: "Galpón industrial 200m²",
        servicios: ["Herrería", "Construcción"],
        icono: "fa-solid fa-wrench"
    },
    {
        titulo: "Baño de Lujo",
        descripcion: "Instalación completa sanitaria",
        servicios: ["Plomería", "Durlock", "Pintura"],
        icono: "fa-solid fa-shower"
    },
    {
        titulo: "Oficina Moderna",
        descripcion: "Divisorios y cielorrasos",
        servicios: ["Durlock", "Electricidad"],
        icono: "fa-solid fa-building"
    }
];

function cargarProyectos() {
    const contenedor = document.getElementById('proyectos-lista');
    if(!contenedor) return;
    
    proyectos.forEach(proyecto => {
        const card = document.createElement('div');
        card.className = 'proyecto-card';
        
        card.innerHTML = `
            <div class="proyecto-icon">
                <i class="fas ${proyecto.icono}"></i>
            </div>
            <div class="proyecto-content">
                <h3>${proyecto.titulo}</h3>
                <p>${proyecto.descripcion}</p>
                <div class="proyecto-tags">
                    ${proyecto.servicios.map(s => `<span>${s}</span>`).join('')}
                </div>
            </div>
        `;
        
        contenedor.appendChild(card);
    });
}

// Cargar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', cargarProyectos);
