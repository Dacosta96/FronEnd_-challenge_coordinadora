# Gestión de Envíos y Rutas Logísticas

Este es un proyecto basado en React y Vite que utiliza Tailwind CSS para el diseño y varias bibliotecas populares para la gestión de estado, visualización de datos y experiencia de usuario.

El proyecto posee un login para validar credenciales de usuario por medio de la biblioteca clerk-react. Existen dos interfaces:

Usuario:

Puede registrar un envío validando que la dirección sea correcta.

Puede realizar el seguimiento de este envío en todas las fases hasta su entrega.

Durante todo el proceso, se notificará al usuario el estado del envío por medio de correo electrónico.

Admin:

Posee una interfaz inicial donde podrá asignar las rutas a los envíos que se encuentren en estado pendiente.

Podrá marcar los envíos como entregados, revisar rutas disponibles y verificar todos los envíos generados.

Existe una sección de reportes donde se podrán consultar algunos indicadores y gráficas.

## 🚀 Características
- **Vite** como bundler para un desarrollo rápido y eficiente.
- **React 18** con soporte para React Router y Hooks.
- **Material UI** y **Tailwind CSS** para una interfaz moderna y flexible.
- **TanStack React Query** para la gestión eficiente de datos asincrónicos.
- **ApexCharts** para la visualización de datos.
- **ESLint** y **TypeScript** para un código limpio y mantenible.

## 📦 Instalación

1. Clona el repositorio:
   ```sh
   git clone https://github.com/usuario/tailadmin-react.git
   cd tailadmin-react
   ```

2. Instala las dependencias:
   ```sh
   npm install
   ```

## 🛠️ Scripts disponibles

En el archivo `package.json` se definen los siguientes scripts:

- `npm run dev`: Inicia el servidor de desarrollo con Vite.
- `npm run build`: Compila el proyecto con TypeScript y genera una versión optimizada.
- `npm run lint`: Ejecuta ESLint para verificar errores en el código.
- `npm run preview`: Muestra una vista previa de la compilación de producción.

## 🏗️ Tecnologías utilizadas

### 📌 Dependencias principales
- **React & React DOM** (`^18.3.1`): Librería principal y renderizador.
- **React Router** (`^7.1.5`): Enrutamiento dinámico.
- **@mui/material & @mui/icons-material** (`^6.4.8`): Componentes y estilos de Material UI.
- **Tailwind CSS** (`^4.0.8`) & **@tailwindcss/forms** (`^0.5.10`): Diseño responsivo y formularios estilizados.
- **@tanstack/react-query** (`^5.69.0`): Gestión de datos asincrónicos.
- **ApexCharts & react-apexcharts** (`^4.1.0` & `^1.7.0`): Gráficos interactivos.
- **Axios** (`^1.8.4`): Cliente HTTP para llamadas a APIs.
- **React Toastify** (`^11.0.5`): Notificaciones amigables para el usuario.

### 🔧 Dependencias de desarrollo
- **TypeScript** (`~5.7.2`): Tipado estático para el código.
- **ESLint** (`^9.19.0`) & **typescript-eslint** (`^8.22.0`): Linter para mejorar la calidad del código.
- **Vite** (`^6.1.0`) & **@vitejs/plugin-react** (`^4.3.4`): Configuración optimizada para React.
- **PostCSS & TailwindCSS PostCSS** (`^8.5.2` & `^4.0.8`): Procesador CSS.

## 📜 Licencia
Este proyecto es privado y no está bajo ninguna licencia de código abierto.

## 📧 Contacto
Para más información, contacta a diego.ac9614@gmail.com.

