# Resoft
Tienda Online Resoft_SENA_2025.

# Resoft - Proyecto tienda (Evidencia GA7-220501096-AA5-EV03)
Aprendiz: Ivan APELLIDO
Evidencia: AA5_EV03

## Resumen
Proyecto de e-commerce (Resoft) con:
- Login de usuarios (bcrypt)
- Menú principal y vista con sesión iniciada (admin)
- Catálogo con consumo de API
- Agregar productos al carrito (incremento correcto 1 unidad por click)

## Requisitos
- Node.js v16+
- MySQL (base de datos `resoft_db`)

## Backend (src/)
1. Copiar `.env.example` -> `.env` y configurar DB.
2. `npm install`
3. `npm run dev`
(Siempre: confirmar que `PORT` en `.env` coincide con frontend fetch)

## Frontend (public/)
Abrir `http://localhost:4000/` (o la ruta que sirva Express)

## Endpoints principales
- POST /api/usuarios/login  -> Iniciar sesión
- POST /api/usuarios       -> Registrar usuario
- GET  /api/products       -> Obtener catálogo
- POST /api/cart           -> (opcional) administrar carrito

Ver `DOCUMENTACIÓN_API.md` para detalles de cada endpoint.

## Repositorio
<URL DEL REPO AQUI>

