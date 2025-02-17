# Sistema de Gestión de Turnos Médicos

## 🚀 Descripción
Este proyecto es una aplicación web moderna desarrollada como demostración de un sistema de gestión de turnos médicos. Implementa un conjunto completo de funcionalidades CRUD (Crear, Leer, Actualizar, Eliminar) con una interfaz de usuario intuitiva y responsive.

## ⚡ Características Principales
- Sistema de gestión de turnos con validaciones completas
- Búsqueda y filtrado de turnos por DNI
- Panel de administración con estadísticas y reportes
- Interfaz responsive adaptable a diferentes dispositivos
- Tema personalizado y modo oscuro
- Exportación de datos a CSV

## 🛠️ Tecnologías Utilizadas
- **Frontend:**
  - React + TypeScript
  - TanStack Query para manejo de estado y caché
  - Zustand para gestión de estado global
  - Tailwind CSS para estilos
  - Componentes accesibles con Radix UI
  - Wouter para enrutamiento

- **Backend:**
  - Node.js + Express
  - PostgreSQL con Drizzle ORM
  - Zod para validación de datos
  - API RESTful

## 📦 Instalación y Uso

1. Clonar el repositorio
```bash
git clone [url-del-repositorio]
```

2. Instalar dependencias
```bash
npm install
```

3. Configurar variables de entorno
```bash
cp .env.example .env
```

4. Iniciar el servidor de desarrollo
```bash
npm run dev
```

## 🎯 Objetivos del Proyecto
Este proyecto fue desarrollado con el objetivo de demostrar:
- Implementación de arquitectura frontend moderna con React
- Diseño de API RESTful con Express
- Gestión de estado y caché con TanStack Query
- Validaciones robustas con Zod
- Diseño responsivo y accesible
- Integración con base de datos PostgreSQL

## 📱 Capturas de Pantalla
[Aquí se incluirían capturas de pantalla de las principales funcionalidades]

## 🔍 Estructura del Proyecto
```
├── client/               # Frontend React
│   ├── src/
│   │   ├── components/   # Componentes reutilizables
│   │   ├── pages/       # Páginas de la aplicación
│   │   ├── hooks/       # Hooks personalizados
│   │   └── lib/         # Utilidades y configuración
├── server/              # Backend Express
│   ├── routes/         # Rutas de la API
│   └── db/             # Configuración de base de datos
└── shared/             # Código compartido
    └── schema.ts       # Esquemas de validación
```

## 🤝 Contribución
Este es un proyecto de portafolio desarrollado con fines demostrativos.

## 📄 Licencia
MIT
