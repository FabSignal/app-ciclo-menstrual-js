# 🌙 App de Registro de Ciclos Menstruales

Una aplicación web interactiva construida con HTML, CSS y JavaScript, pensada para acompañarte en el seguimiento de tu ciclo menstrual de forma simple, amigable y privada.

---

## 🩸 ¿Qué podés hacer con esta app?

- Ingresar la **fecha de inicio** de tu ciclo.
- Registrar la **duración del sangrado** (en días).
- Anotar los **síntomas** que experimentaste (dolores, molestias, etc.).
- Ver todos los ciclos registrados en orden del más reciente al más antiguo.
- Recibir una **notificación animada** al guardar un nuevo ciclo.
- Ver un saludo personalizado con tu nombre cada vez que abrís la app.

---

## 🎯 Tecnologías utilizadas

- ✅ HTML5 
- ✅ CSS3 
- ✅ JavaScript (sin frameworks)

## 📁 Estructura del proyecto

```
app-ciclo-menstrual-js/
├── index.html
├── README.md
└── assets/
    ├── img/   # Imágenes utilizadas
    ├── css/
    │   └── style.css
    └── js/
        └── app.js
```

## ⚙️ Funcionalidades técnicas destacadas

- **Simulación de una base de datos** con un array de objetos.
- **Formulario por pasos** dividido en tarjetas animadas con navegación entre ellas.
- **Uso de `localStorage`** para guardar el nombre de la usuaria y mostrar un saludo personalizado.
- **Notificación tipo "toast"** al registrar un nuevo ciclo.
- **Ciclos ordenados automáticamente** por fecha (del más nuevo al más viejo).
- **HTML dinámico** generado con JavaScript para visualizar los registros.

---

## 📅 Cómo usar 

1. **Primer uso**:  
   Ingresá tu nombre (se guarda automáticamente en tu navegador para futuras sesiones) 

2. **Registro de ciclo**:  
   Completá el formulario por pasos con:  
   - Fecha de inicio  
   - Duración del sangrado 
   - Síntomas (opcional)  

3. **Historial**:  
   Visualizarás todos tus ciclos ordenados por fecha   

---

## 🌱 Características en desarrollo

Esta versión inicial (MVP) está en crecimiento activo. Actualmente estamos trabajando en:

- **Persistencia de ciclos**  
  Los registros se mantienen solo durante la sesión actual  
  *Próximamente: Almacenamiento en `localStorage` para acceso histórico*

- **Gestión avanzada de registros**  
  Por ahora no es posible editar/eliminar ciclos  
  *Próximamente: Controles para modificar o quitar registros existentes*

- **Síntomas estructurados**  
  Campo actual: Texto libre  
  *Próximamente: Menú desplegable con opciones comunes + campo de texto libre*

- **Análisis de datos**  
  Estadísticas básicas aún no disponibles  
  *Próximamente: Visualización mensual de tus ciclos con indicadores claros y cálculo de promedios (duración de ciclo, días de sangrado, etc.)*

---

## 🔍 Cómo probarla

1. Cloná el repositorio:

```bash
git clone https://github.com/tu-usuario/salud-a-mano.git
```

2. Abrí el archivo `index.html` en tu navegador.

O visitá: 

 https://fabsignal.github.io/app-ciclo-menstrual-js/

## 🩷 Autoría

Proyecto realizado por:

- **Lucía Della Maddalena** - https://github.com/luciadmaddalena

- **Fabiana Fernández** - https://github.com/FabSignal

📚 Proyecto desarrollado en contexto académico y expandido como prototipo funcional, con foco en escalabilidad y buenas prácticas.

## ⚖️ Licencia

Este proyecto es de uso libre con fines educativos y personales.  
Podés adaptarlo, reusarlo o extenderlo.  
Si lo compartís, ¡mencionanos! 💜


