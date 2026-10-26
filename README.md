# Parcial Mi Tienda

App móvil de inventario con Expo, TypeScript, Expo Router, SQLite/Drizzle y Supabase.

**Estudiante:** [Escribe tu nombre completo]  
**Código:** [Escribe tu código]

## Configuración

1. Instala Node.js y ejecuta `npm install`.
2. Copia `.env.example` como `.env` y completa `EXPO_PUBLIC_SUPABASE_URL` y `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY` desde tu proyecto. No publiques `.env`; en la app usa solo la publishable key.
3. En el SQL Editor de Supabase ejecuta el contenido de [`supabase.sql`](supabase.sql).
4. En Supabase Authentication, desactiva la confirmación por correo del proveedor Email para que el alta inicie sesión inmediatamente.
5. Ejecuta `npx expo start` y abre el proyecto con Expo Go en un dispositivo compatible.

La base local se prepara con Drizzle al iniciar la app. Para regenerar migraciones luego de cambiar el esquema: `npx drizzle-kit generate`.

## Funciones implementadas

- Registro e inicio de sesión con correo y contraseña, persistencia en SecureStore y rutas protegidas.
- Alta, edición y eliminación local de productos; la lista se actualiza con Live Queries de SQLite.
- Sincronización manual: descarga productos remotos que falten y sube los cambios locales pendientes.
- Resumen de unidades, valor, número de productos y estado de sincronización.

La eliminación es local y no se propaga a Supabase; el parcial excluye los borrados sincronizados. La sincronización disponible aplica el flujo sencillo solicitado y no resuelve conflictos de edición simultánea de un mismo producto.

## Capturas

Guarda las capturas reales del emulador o teléfono en `capturas/` con estos nombres. No se incluyen imágenes inventadas; agrégalas antes de entregar.

![Login](capturas/01-login.png)
![Registro](capturas/02-registro.png)
![Principal](capturas/03-principal.png)
![Formulario](capturas/04-formulario.png)
![Sin conexión](capturas/05-sin-conexion.png)
![Sincronizado](capturas/06-sincronizado.png)
![Supabase](capturas/07-supabase.png)
