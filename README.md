# 📝 Tasks PoC - Express + TypeScript

Prueba de concepto (PoC) para comparar **Express.js** y **NestJS** en el desarrollo de una API REST de gestión de tareas con autenticación JWT.  
Este repositorio contiene la **implementación base en Express.js**, usando TypeScript y una arquitectura modular inspirada en NestJS, para facilitar la comparación justa entre ambos frameworks.

---

## 📂 Estructura del proyecto

```
express-poc/
├─ package.json
├─ tsconfig.json
├─ prisma/
│  ├─ schema.prisma
│  └─ migrations/
├─ src/
│  ├─ middleware/
│  │  └─ logger.middleware.ts
│  ├─ modules/
│  │  ├─ users/
│  │  │  ├─ user.controller.ts
│  │  │  ├─ user.entity.ts
│  │  │  └─ user.routes.ts
│  │  └─ tasks/
│  │     ├─ task.controller.ts
│  │     ├─ task.entity.ts
│  │     └─ task.routes.ts
│  ├─ app.ts

Esta organización permite que el equipo que trabaja con Express siga un patrón de trabajo similar al que emplea el equipo de NestJS, pero aplicando las herramientas y utilidades del framework Express.

---

## 🚀 Instalación

Clonar el repositorio:
```

git clone https://github.com/Lau-prog/PoC-Express
cd express-poc

```
Instalar dependencias:
```

pnpm install

```
Configurar variables de entorno:
```

cp .env.example .env

```
Editar .env con tus valores:
```

PORT=4000
JWT_SECRET=tu_secreto_super_seguro

```
Ejecutar en modo desarrollo:
```

pnpm run start:dev

```
Build para producción:
```

pnpm build
pnpm start

```
📌 Endpoints esperados en la PoC

Auth
```

POST /api/auth/register → Registro de usuario
POST /api/auth/login → Login y obtención de JWT

```
Tasks (requiere autenticación)
```

POST /api/tasks → Crear tarea
GET /api/tasks → Listar tareas del usuario autenticado
GET /api/tasks/:id → Obtener tarea por ID
PUT /api/tasks/:id → Editar tarea (no permite editar si está completada)
DELETE /api/tasks/:id → Eliminar tarea

```
🧪 Testing

Para igualar condiciones con NestJS, se recomienda:
    - Usar Jest y supertest para pruebas de integración.
    - Cubrir los mismos casos de prueba en ambos repositorios.
    - Mantener la misma nomenclatura y estructura de carpetas para test.

🔍 Objetivo de la PoC

El objetivo de esta prueba de concepto es comparar Express.js y NestJS evaluando:
    - Arquitectura y modularidad
    - Escalabilidad
    - Mantenibilidad
    - Facilidad de desarrollo
    - Curva de aprendizaje
    - Integración con Prisma, JWT y validación de datos

Para garantizar una comparación justa, se han establecido las siguientes consideraciones:
    - Ambos en TypeScript
    - Similar estructura modular
    - Validación de datos con Express-Validator (equivalente a DTOs de Nest)
    - Middleware en Express equivalentes a Guards de Nest
    - Uso de la misma base de datos y librerías auxiliares
    - Tests con Jest en ambos

## 📄 Licencia

Este proyecto se distribuye bajo la licencia MIT.
Podés usarlo, modificarlo y distribuirlo libremente, siempre incluyendo el aviso de licencia original.
```
