# 🌸 App Registro de Ciclo Menstrual

Aplicación web desarrollada con JavaScript puro para registrar, visualizar y predecir el ciclo menstrual de forma **privada, sin conexión y sin cuentas**. Todos los datos son almacenados en el navegador del usuario utilizando `localStorage`, ofreciendo una alternativa ética, ligera y accesible a las apps tradicionales de salud.

---

## 🎯 Objetivo

Brindar una herramienta funcional para el seguimiento del ciclo menstrual, enfocada en la **autonomía, privacidad y simplicidad de uso**, sin necesidad de conexión a internet, cuentas de usuario ni transferencia de datos personales.

---

## ⚙️ Funcionalidades técnicas

La aplicación fue desarrollada utilizando **JavaScript **, con un enfoque modular y sin frameworks, aprovechando el almacenamiento local del navegador para mantener la privacidad del usuario.

### 🧩 Funcionalidades clave implementadas:

- **Estructura de datos con arrays y objetos**  
  Cada ciclo menstrual se representa como un objeto con identificador, fecha de inicio, duración e información de síntomas. Los ciclos se almacenan en un array que actúa como base de datos local simulada.

- **Interfaz dinámica con manipulación del DOM**  
  La lista de ciclos registrados se actualiza en tiempo real al enviar el formulario, utilizando `createElement()` e `innerHTML` para renderizar el historial.

- **Formulario interactivo**  
  Permite al usuario ingresar información sobre su ciclo, con validaciones mínimas y eventos controlados mediante `addEventListener()` y `event.preventDefault()`.

- **Persistencia con localStorage**  
  La aplicación guarda tanto el historial de ciclos como el nombre del usuario usando `localStorage`, aplicando `JSON.stringify()` y `JSON.parse()` para mantener los datos entre sesiones.

- **Predicción del próximo ciclo**  
  Se calcula automáticamente la fecha estimada del próximo ciclo en base al promedio de intervalos anteriores, y se muestra de forma destacada. También se notifica si el último ciclo está atrasado.

---

## 🧪 Cómo usar la aplicación

1. Al ingresar, la usuaria es saludada por su nombre (si ya fue guardado anteriormente).
2. Se completa el formulario con:
   - Fecha de inicio del ciclo
   - Duración del sangrado (en días)
   - Síntomas (opcional)
3. Cada nuevo ciclo se guarda localmente y se visualiza en una lista ordenada por fecha.
4. La app estima la fecha del próximo ciclo y alerta si hay un retraso notable.

---

## 🩷 Autoría

Proyecto realizado por:

- **Lucía Della Madalena** - https://github.com/luciadmaddalena

- **Fabiana Fernández** - https://github.com/FabSignal




