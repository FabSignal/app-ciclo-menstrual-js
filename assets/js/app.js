document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('form-ciclo');
  const formCards = document.querySelectorAll('.form-card');
  const nextButtons = document.querySelectorAll('.next-btn');
  const prevButtons = document.querySelectorAll('.prev-btn');
  const indicatorDots = document.querySelectorAll('.indicator-dot');
  const cycleList = document.getElementById('lista-ciclos');
  const emptyState = document.querySelector('.empty-state');
  
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
  
  // Manejar envío del formulario
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const startDate = document.getElementById('fecha').value;
    const duration = document.getElementById('duracion').value;
    const symptoms = document.getElementById('sintomas').value;
    
    // Crear nuevo elemento de ciclo
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <div>
        <div class="cycle-date">${formatDate(startDate)}</div>
        <div class="cycle-symptoms">${symptoms || 'Sin síntomas registrados'}</div>
      </div>
      <div class="cycle-duration">${duration} días</div>
    `;
    
    // Eliminar estado vacío si existe
    if (emptyState && cycleList.contains(emptyState)) {
      cycleList.removeChild(emptyState);
    }
    
    // Agregar nuevo ciclo a la lista
    cycleList.insertBefore(listItem, cycleList.firstChild);
    
    // Resetear formulario
    form.reset();
    updateStep(0);
    
    // Mostrar animación de éxito
    showSuccessAnimation();
  });
  
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