# 📚 Sistema de Gestión de Estudiantes

Aplicación web para la gestión de estudiantes, que permite crear, editar, listar y eliminar registros, asociándolos a distintos cursos.

Este proyecto fue desarrollado como práctica de **frontend + backend** con foco en la correcta comunicación entre capas, manejo de estado y estructura del código.

---

## 🚀 Funcionalidades

- 📄 Listado de estudiantes
- ➕ Alta de estudiantes
- ✏️ Edición de estudiantes
- 🗑️ Eliminación de estudiantes
- 📚 Asociación de estudiantes a múltiples cursos
- 📊 Gestión de promedio y edad

---

## 🛠️ Tecnologías utilizadas

### Frontend
- React Native (Expo)
- TypeScript
- Axios
- Componentes controlados y manejo de estado

### Backend
- Node.js (JavaScript)
- Express
- JSON Server (API REST simulada para desarrollo)

---

## 🧠 Decisiones técnicas

- Se utilizó **JSON Server** para simular una API REST y enfocarse en la lógica de frontend y consumo de endpoints.
- El proyecto prioriza **estabilidad, claridad del código y estructura**.
- Arquitectura modular separando componentes, hooks y servicios para facilitar escalabilidad y mantenimiento.
---

## 📂 Estructura del proyecto

```bash
├── backend
│   ├── db.json
│   ├── server.js
│
├── frontend
│   ├── components
│   ├── hooks
│   ├── services
│   ├── screens
│   └── types

📱 Diseñado con enfoque mobile-first y probado en dispositivos reales.

## 📱 Capturas (vista mobile)

![Home](https://raw.githubusercontent.com/Agustina-Flores/Portal-Estudiantes/main/capturas/home.png)

![Estudiantes](https://raw.githubusercontent.com/Agustina-Flores/Portal-Estudiantes/main/capturas/estudiantes.png)

![Cursos](https://raw.githubusercontent.com/Agustina-Flores/Portal-Estudiantes/main/capturas/cursos.png)
