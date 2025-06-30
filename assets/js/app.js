/* ======================= SALUDO INICIAL ====================== */
/* 
- Se solicita el nombre de la usuaria si no hay ninguno guardado
- El nombre se guarda en localStorage para persistencia
- Se muestra un saludo personalizado con su nombre si está disponible
 */

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

// Para limpiar el valor guardado desde la consola:
//localStorage.clear();

/*  ============= Simulación de base de datos con un array ================ */
/* 
-Se define un array con objetos de ejemplo representando ciclos
-Se usa la variable ciclosPrecargados para distinguir si se están mostrando estos datos de ejemplo 
*/

let ciclos = [
    {
        id: 1,
        fecha: "2025-01-01",
        duracion: 5,
        sintomas: "Dolor abdominal, Hinchazón, Fatiga"
    },
    {
        id: 2,
        fecha: "2025-01-28",
        duracion: 6,
        sintomas: "Dolor de cabeza, Cólicos, Dolor de espalda"
    }
]

let ciclosPrecargados = true; // Indica si solo se están mostrando ciclos por defecto

document.addEventListener('DOMContentLoaded', function() {
  // Elementos del DOM relacionados al formulario por pasos
  const form = document.getElementById('form-ciclo');
  const formCards = document.querySelectorAll('.form-card'); // Tarjetas del form
  const nextButtons = document.querySelectorAll('.next-btn'); // Botones siguiente
  const prevButtons = document.querySelectorAll('.prev-btn'); // Botones Anterior
  const indicatorDots = document.querySelectorAll('.indicator-dot'); // Puntos para pasar de tarjeta
  const cycleList = document.getElementById('lista-ciclos'); // Lista donde se muestran los ciclos
  const emptyState = document.querySelector('.empty-state'); // Tarjeta que indica que no se han ingresado ciclos ( de estado vacío)

  // Se cargan los ciclos existentes al iniciar la página
  mostrarCiclos();
  
  let currentStep = 0; // Paso actual del formulario
  
  // Función para cambiar de tarjeta en el formulario por pasos
  function updateStep(newStep) {
    // Se oculta tarjeta actual
    formCards[currentStep].classList.remove('active');
    indicatorDots[currentStep].classList.remove('active');
    
    // Se muestra una tarjeta nueva 
    currentStep = newStep;
    formCards[currentStep].classList.add('active');
    indicatorDots[currentStep].classList.add('active');
  }
  
  // Event listeners para cambiar de tarjeta al hacer click en botones Siguiente
  nextButtons.forEach(button => {
    button.addEventListener('click', function() {
      if (currentStep < formCards.length - 1) {
        updateStep(currentStep + 1);
      }
    });
  });
  
  // Event listeners para volver atrás al hacer click en botones Anterior
  prevButtons.forEach(button => {
    button.addEventListener('click', function() {
      if (currentStep > 0) {
        updateStep(currentStep - 1);
      }
    });
  });
  
/* ========== Registro de datos ingresados mediante el formulario ========== */
/* 
// Se obtiene la información ingresada (fecha, duración, síntomas)
// Se crea un nuevo objeto y se agrega al array ciclos
// Se eliminan los ciclos de de ejemplo y se actualiza la lista con los nuevos datos
*/

  // Envío del formulario
  form.addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que se recargue la página
    
    // Se obtienen los valores ingresados por la usuaria en el formulario
    const fecha = document.getElementById('fecha').value;
    const duracion = parseInt(document.getElementById('duracion').value);
    const sintomas = document.getElementById('sintomas').value;
    
    // Se eliminan los ciclos de muestra al agregar el primer ciclo real
    if (ciclosPrecargados) {
    ciclos = []; // Se eliminan todos los ciclos actuales (los de ejemplo)
    ciclosPrecargados = false; // Evita que esto vuelva a ejecutarse
  }

    // Se crea un nuevo objeto con los nuevos datos ingresados del ciclo 
    const nuevoCiclo = {
    id: ciclos[ciclos.length - 1]?.id + 1 || 1, // ID autoincremental
    fecha,
    duracion,
    sintomas
    };

    // Se agrega el nuevo ciclo al array
    ciclos.push(nuevoCiclo);

    // Se actualiza ciclosPrecargados para avisar que ya no deben mostrarse solo los ciclos de prueba
    ciclosPrecargados = false;
    
    // Si la tarjeta de estado vacío está visible, se remueve
    if (emptyState && cycleList.contains(emptyState)) {
      cycleList.removeChild(emptyState);
    }

    // Se vuelve a mostrar la lista actualizada
    mostrarCiclos();

    // Se resetea el formulario y se vuelve al primer paso
    form.reset();
    updateStep(0);
    
    // Se muestra animación de éxito de carga de datos
    showSuccessAnimation();
  });

    // Función para ordenar ciclos por fecha (más reciente primero)
    function ordenarCiclosPorFechaDesc(array) {
    return [...array].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  }

  /* ========== Mostrar ciclos dinámicamente en el DOM ========== */
  /* 
  - Se limpia la lista previa y se agregan los ciclos ordenados por fecha
  - Se usa una función para formatear fechas en español
  */

  // Función para mostrar los datos de los ciclos en pantalla
  function mostrarCiclos() {
    // Se limpia el contenido anterior de la lista (por si ya hay ciclos)
    cycleList.innerHTML = '';

  // Si no hay ciclos nuevos agregados por la usuaria (es decir, solo están los precargados)
  // se muestra el estado vacío como indicación visual. Esto se controla con la variable ciclosPrecargados.
    if (ciclos.length === 0 || ciclosPrecargados) {
      cycleList.appendChild(emptyState.cloneNode(true));
    }

  // Se ordena el array de ciclos por fecha usando la función ordenarCiclosPorFechaDesc y se guarda en ciclosOrdenados
    const ciclosOrdenados = ordenarCiclosPorFechaDesc(ciclos);


  // Se recorre cada ciclo del array ordenado y cada uno se inserta como lista en el HTML
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
  
  // Función para mostrar fechas en español 
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  }
  
  /* ========== Mostrar notificación animada al guardar un ciclo ========== */
  /* 
  - Se crea una notificación (toast) con estilos
  - Se elimina automáticamente después de unos segundos  */

  // Se muestra animación cuando se guarda un ciclo con éxito
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
    
    // Se remueve animación después de 3.6 segundos
    setTimeout(() => {
      if (successMsg.parentNode === document.body) {
        document.body.removeChild(successMsg);
      }
    }, 3600);
  }
  
  // Se agregan estilos de animación para el mensaje de éxito de carga de de ciclo
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