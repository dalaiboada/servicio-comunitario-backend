# Documentación de la API de Autenticación

Esta documentación detalla los endpoints disponibles para la autenticación de usuarios (Coordinadores) en el sistema.

**Prefijo de Ruta Base:** `/api/auth`

---

## 1. Registrar Usuario

Registra un nuevo coordinador en el sistema.

- **URL:** `/register`
- **Método:** `POST`
- **Autenticación:** No requerida (por ahora)

### Cuerpo de la Solicitud (JSON)

**Ejemplo de solicitud:**
```json
{
  "name": "Juan",
  "lastName": "Pérez",
  "username": "jperez",
  "password": "micontraseña123"
}
```

| Campo        | Tipo   | Requerido | Descripción             |
| :----------- | :----- | :-------- | :----------------------- |
| `name`     | String | Sí       | Nombre del coordinador   |
| `lastName` | String | Sí       | Apellido del coordinador |
| `username` | String | Sí       | Nombre de usuario único  |
| `password` | String | Sí       | Contraseña del usuario   |

### Respuestas

#### Exitoso (201 Created)

Se establece una cookie `token` automáticamente.

```json
{
  "message": "Usuario registrado exitosamente",
  "user": {
    "id": "6751b...",
    "username": "usuario123",
    "name": "Juan",
    "lastName": "Pérez"
  }
}
```

#### Error - Datos Faltantes (400 Bad Request)

```json
{
  "message": "Faltan credenciales"
}
```

#### Error - Usuario Existente (409 Conflict)

```json
{
  "message": "El nombre de usuario ya existe"
}
```

#### Error de Servidor (500 Internal Server Error)

```json
{
  "message": "Error al registrar usuario",
  "error": "Mensaje detallado del error (solo en desarrollo)"
}
```

---

## 2. Iniciar Sesión

Autentica a un usuario existente y establece una sesión.

- **URL:** `/login`
- **Método:** `POST`
- **Autenticación:** No requerida

### Cuerpo de la Solicitud (JSON)

**Ejemplo de solicitud:**
```json
{
  "username": "jperez",
  "password": "micontraseña123"
}
```

| Campo        | Tipo   | Requerido | Descripción            |
| :----------- | :----- | :-------- | :---------------------- |
| `username` | String | Sí       | Nombre de usuario       |
| `password` | String | Sí       | Contraseña del usuario |

### Respuestas

#### Exitoso (200 OK)

Se establece una cookie `token` automáticamente.

```json
{
  "message": "Inicio de sesión exitoso",
  "user": {
    "id": "6751b...",
    "username": "usuario123",
    "name": "Juan",
    "lastName": "Pérez"
  }
}
```

#### Error - Datos Faltantes (400 Bad Request)

```json
{
  "message": "Faltan credenciales"
}
```

#### Error - Credenciales Inválidas (401 Unauthorized)

```json
{
  "message": "Credenciales inválidas"
}
```

#### Error de Servidor (500 Internal Server Error)

```json
{
  "message": "Error al iniciar sesión",
  "error": "Mensaje detallado del error (solo en desarrollo)"
}
```

---

## 3. Cerrar Sesión

Cierra la sesión del usuario actual invalidando la cookie de autenticación.

- **URL:** `/logout`
- **Método:** `POST`
- **Autenticación:** No requerida explícitamente, pero asume una sesión activa.

### Cuerpo de la Solicitud

No requiere cuerpo.

### Respuestas

#### Exitoso (200 OK)

Se elimina la cookie `token`.

```json
{
  "message": "Cierre de sesión exitoso"
}
```

#### Error de Servidor (500 Internal Server Error)

```json
{
  "message": "Error al cerrar sesión",
  "error": "Mensaje detallado del error (solo en desarrollo)"
}
```
