// Efecto de escritura en el header
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
    
    setTimeout(typeWriter, 500);
}

// Contador de experiencia
function crearContador(elemento, numero) {
    let contador = 0;
    const incremento = numero / 50;
    
    const intervalo = setInterval(() => {
        contador += incremento;
        if(contador >= numero) {
            elemento.textContent = numero + '+';
            clearInterval(intervalo);
        } else {
            elemento.textContent = Math.floor(contador) + '+';
        }
    }, 30);
}

// Añadir estadísticas (opcional)
const estadisticasHTML = `
<div style="display: flex; justify-content: center; gap: 50px; margin-top: 50px; flex-wrap: wrap;">
    <div style="text-align: center;">
        <div class="contador" id="contador-obras" style="font-size: 3rem; color: var(--gold);">0</div>
        <p>Obras Completadas</p>
    </div>
    <div style="text-align: center;">
        <div class="contador" id="contador-clientes" style="font-size: 3rem; color: var(--gold);">0</div>
        <p>Clientes Satisfechos</p>
    </div>
    <div style="text-align: center;">
        <div class="contador" id="contador-anios" style="font-size: 3rem; color: var(--gold);">0</div>
        <p>Años de Experiencia</p>
    </div>
</div>
`;

// Insertar después de servicios
const serviciosSection = document.querySelector('.servicios');
if(serviciosSection) {
    const div = document.createElement('div');
    div.innerHTML = estadisticasHTML;
    serviciosSection.appendChild(div);
    
    setTimeout(() => {
        crearContador(document.getElementById('contador-obras'), 150);
        crearContador(document.getElementById('contador-clientes'), 200);
        crearContador(document.getElementById('contador-anios'), 10);
    }, 1000);
}
