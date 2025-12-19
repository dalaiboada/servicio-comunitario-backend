# Servicio Comunitario UGMA - Backend

API RESTful desarrollada con **Node.js**, **Express** y **MongoDB** para la gestión del sistema de Servicio Comunitario de la UGMA. Este backend maneja la autenticación de coordinadores, gestión de proyectos y recursos, incluyendo la carga de archivos.

## 🚀 Tecnologías

- **Node.js** - Entorno de ejecución para JavaScript.
- **Express.js** - Framework web para Node.js.
- **MongoDB** - Base de datos NoSQL (usando Mongoose).
- **JWT (JSON Web Tokens)** - Gestión de sesiones y autenticación segura con Cookies.
- **Bcrypt** - Hashing de contraseñas.
- **Multer** - Middleware para la carga de archivos (imágenes y documentos).

## 📂 Estructura del Proyecto

```
backend/
├── config/         # Configuraciones (DB, etc.)
├── controllers/    # Lógica de los controladores
├── docs/           # Documentación de la API
├── middlewares/    # Middlewares (auth, upload, etc.)
├── models/         # Modelos de Mongoose (Schemas)
├── public/         # Archivos estáticos y uploads
├── routes/         # Definición de rutas de la API
└── server.js       # Punto de entrada de la aplicación
```

## ⚙️ Instalación y Configuración

1.  **Clonar el repositorio**

    ```bash
    git clone https://github.com/dalaiboada/Servicio_comunitario_UGMA.git
    cd Servicio_comunitario_UGMA/backend
    ```

2.  **Instalar dependencias**

    ```bash
    npm install
    ```

3.  **Configurar variables de entorno**

    Crea un archivo `.env` en la raíz del directorio `backend` con las siguientes variables:

    ```env
    PORT=4000
    NODE_ENV=development
    MONGO_URI=tu_cadena_de_conexion_mongodb
    FRONTEND_URL=http://localhost:5173
    JWT_SECRET=tu_secreto_super_seguro
    JWT_EXPIRES_IN=24h
    SALT_ROUNDS=10
    ```

4.  **Iniciar el servidor**

    Modo desarrollo (con reinicio automático si usas nodemon o script dev):
    ```bash
    npm run dev
    ```

    Modo producción:
    ```bash
    npm start
    ```

## 📖 Documentación de la API

La documentación detallada de los endpoints se encuentra en la carpeta `docs/`.

- [Autenticación (Auth API)](docs/auth-api.md) - Registro, Login, Logout.

## 🔗 Endpoints Principales

- `POST /api/auth/register` - Registrar nuevo coordinador.
- `POST /api/auth/login` - Iniciar sesión.
- `POST /api/auth/logout` - Cerrar sesión.
- `GET /` - Verificar estado de la API.

---
Desarrollado para el Servicio Comunitario de la UGMA.
