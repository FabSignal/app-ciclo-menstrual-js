/* ======================= SALUDO INICIAL ====================== */
// Se guarda el nombre de la usuaria(almacenado en localStorage) en la variable nombreUsuaria. Si no existe, se guarda null.
let nombreUsuaria = localStorage.getItem("nombre");
/* - Si no hay ningún nombre guardado, se muestra un prompt() para preguntarle a la usuaria su nombre
- Se guarda ese valor en la variable nombreIngresado*/
if (nombreUsuaria === null || nombreUsuaria.trim() === '') {
  const nombreIngresado = prompt("¡Hola! ¿Cómo te llamás?");

// -Si se ingresa un nombre (o algún caracter), el valor almacenado en la variable nombreUsuaria se guarda en localStorage con la key "nombre"
// -Se verifica que el valor ingresado no sea null ni vacío
  if (nombreIngresado && nombreIngresado.trim() !== "") {
    nombreUsuaria = nombreIngresado.trim(); // .trim(): limpia espacios
    localStorage.setItem("nombre", nombreUsuaria);
  } else {
    // Si no se ingresa un nombre válido (canceló o dejó vacío), se evita que aparezca null en el título, se asigna una cadena vacía a nombreUsuaria
    nombreUsuaria = ""; 
  }
}
// Saludo
const saludo = nombreUsuaria && nombreUsuaria.trim() !== ""
  ? `¡Hola ${nombreUsuaria}! ¿Cómo te sentís hoy?`
  : "¡Hola! ¿Cómo te sentís hoy?";

// Se modifica el título para que muestre el nombre de la usuaria, si lo ingSresa
const titulo = document.querySelector("header h1");
titulo.innerHTML = `<span class="icon"><img src="./assets/img/luna.png" alt="Luna" class="icon-img"></span> ${saludo}`;

// Para limpiar el valor guardado:
//localStorage.removeItem("nombre");

// ======= Simulación de base de datos con un array ================
// Array de objetos : ciclos . Si hay datos en localStorage, se usan. En caso contrario, se muestran los valores por defecto

let ciclos = JSON.parse(localStorage.getItem('ciclos')) || [
    {
        id: 1,
        fecha: "2025-01-01",
        duracion: 5,
        sintomas: "Dolor leve, Hinchazón"
    },
    {
        id: 2,
        fecha: "2025-01-28",
        duracion: 6,
        sintomas: "Dolor de cabeza"
    }
]

let ciclosPrecargados = true; // Indica si solo se están mostrando ciclos por defecto

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('form-ciclo');
  const formCards = document.querySelectorAll('.form-card');
  const nextButtons = document.querySelectorAll('.next-btn');
  const prevButtons = document.querySelectorAll('.prev-btn');
  const indicatorDots = document.querySelectorAll('.indicator-dot');
  const cycleList = document.getElementById('lista-ciclos');
  const emptyState = document.querySelector('.empty-state');

  // Cargar ciclos al iniciar
  mostrarCiclos();
  
  let currentStep = 0;
  
  // Función para actualizar el paso del formulario
  function updateStep(newStep) {
    // Ocultar tarjeta actual
    formCards[currentStep].classList.remove('active');
    indicatorDots[currentStep].classList.remove('active');
    
    // Mostrar nueva tarjeta
    currentStep = newStep;
    formCards[currentStep].classList.add('active');
    indicatorDots[currentStep].classList.add('active');
  }
  
  // Event listeners para botones Siguiente
  nextButtons.forEach(button => {
    button.addEventListener('click', function() {
      if (currentStep < formCards.length - 1) {
        updateStep(currentStep + 1);
      }
    });
  });
  
  // Event listeners para botones Anterior
  prevButtons.forEach(button => {
    button.addEventListener('click', function() {
      if (currentStep > 0) {
        updateStep(currentStep - 1);
      }
    });
  });
  
  // Envío del formulario
  form.addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que el formulario recargue la página
    
    // Se obtienen los valores ingresados por la usuaria
    const fecha = document.getElementById('fecha').value;
    const duracion = parseInt(document.getElementById('duracion').value);
    const sintomas = document.getElementById('sintomas').value;
    
    // Se crea un nuevo objeto con el nuevo ciclo ingresado
    const nuevoCiclo = {
    id: ciclos[ciclos.length - 1]?.id + 1 || 1, // ID autoincremental
    //id: ciclos.length + 1, // Se incrementa el id en 1 cuando hay un ingreso
    fecha,
    duracion,
    sintomas
    };

    // Crear nuevo elemento de ciclo
    /* const listItem = document.createElement('li');
    listItem.innerHTML = `
      <div>
        <div class="cycle-date">${formatDate(fecha)}</div>
        <div class="cycle-symptoms">${sintomas || 'Sin síntomas registrados'}</div>
      </div>
      <div class="cycle-duration">${duracion} días</div>
    `; */

    // Se agrega el nuevo ciclo al array
    ciclos.push(nuevoCiclo);

    // Se actualiza ciclosPrecargados para avisar que ya no están disponibles solo los ciclos de prueba
    ciclosPrecargados = false;
    
    // Eliminar estado vacío si existe
    if (emptyState && cycleList.contains(emptyState)) {
      cycleList.removeChild(emptyState);
    }
    
    //Mostrar los ciclos ordenados por fecha
    const ciclosOrdenados = [...ciclos].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

    // Cargar ciclos al iniciar
    mostrarCiclos();

    // Resetear formulario (Se vuelve al primer paso)
    form.reset();
    updateStep(0);
    
    // Mostrar animación de éxito
    showSuccessAnimation();
  });

    // Mostrar ciclos guardados como ejemplo
  function mostrarCiclos() {
    // Se limpia el contenido anterior de la lista (por si ya hay ciclos)
  cycleList.innerHTML = '';

  // Si no hay ciclos nuevos agregados por la usuaria (es decir, solo están los precargados)
  // se muestra el "estado vacío" como indicación visual. Esto se controla con la variable ciclosPrecargados.
  if (ciclos.length === 0 || ciclosPrecargados) {
    cycleList.appendChild(emptyState.cloneNode(true));
  }

  // Se ordena el array de ciclos por fecha (de más reciente a más antiguo)
  // Se usa el spread operator (...) para copiar el array original,
  // de modo que no se modifique directamente la variable ciclos
  const ciclosOrdenados = [...ciclos].sort((a, b) =>
    new Date(b.fecha) - new Date(a.fecha)
  );

  // Se recorre cada ciclo del array ordenado y lo inserta como lista en el HTML
  ciclosOrdenados.forEach(ciclo => {
    const listItem = document.createElement('li');

    // Se le agrega contenido HTML con los datos del ciclo, incluyendo la fecha formateada
    listItem.innerHTML = `
      <div>
        <div class="cycle-date">${formatDate(ciclo.fecha)}</div>
        <div class="cycle-symptoms">${ciclo.sintomas || 'Sin síntomas registrados'}</div>
      </div>
      <div class="cycle-duration">${ciclo.duracion} días</div>
    `;
    // Se inserta la lista en el DOM
    cycleList.appendChild(listItem);
  });
}
  
  // Función para formatear fechas
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  }
  
  // Mostrar animación de éxito
  function showSuccessAnimation() {
    const successMsg = document.createElement('div');
    successMsg.style.cssText = `
      position: fixed;
      top: 30px;
      right: 30px;
      background: var(--accent-mint);
      color: var(--dark-brown);
      padding: 1.2rem 2rem;
      border-radius: var(--element-radius);
      box-shadow: var(--shadow-hover);
      z-index: 1000;
      display: flex;
      align-items: center;
      gap: 1rem;
      font-weight: 600;
      font-size: 1rem;
      animation: slideIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), fadeOut 0.6s ease 3s forwards;
      border-radius: var(--card-radius);
      backdrop-filter: blur(4px);
      border: 1px solid rgba(255, 255, 255, 0.8);
    `;
    
    successMsg.innerHTML = `
      <i class="fas fa-check-circle" style="color: var(--accent-lavender); font-size: 1.6rem;"></i>
      <div>Ciclo registrado exitosamente</div>
    `;
    
    document.body.appendChild(successMsg);
    
    setTimeout(() => {
      if (successMsg.parentNode === document.body) {
        document.body.removeChild(successMsg);
      }
    }, 3600);
  }
  
  // Agregar estilos de animación dinámicamente
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%) translateY(20px); opacity: 0; }
      to { transform: translateX(0) translateY(0); opacity: 1; }
    }
    @keyframes fadeOut {
      from { opacity: 1; transform: translateY(0); }
      to { opacity: 0; transform: translateY(-20px); }
    }
  `;
  document.head.appendChild(style);
});