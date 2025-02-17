git clone https://github.com/catriel458/medical-appointments.git
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

## 🏗️ Arquitectura

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