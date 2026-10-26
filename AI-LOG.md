# Registro de uso de IA

- **Prompt:** “necesito realizar este parcial”, con el enunciado de Mi Tienda adjunto.
- **Uso:** se creó una base de proyecto Expo y se implementaron los flujos de autenticación, inventario local y sincronización descritos en el enunciado.
- **Revisión/correcciones:** se usa SecureStore para la sesión, se agregó validación del formulario y la clave de Supabase se lee desde variables públicas de ejemplo. Revisa y entiende cada archivo antes de entregar.
- **Verificación local:** `npx tsc --noEmit` pasó y Metro generó el bundle Android con `npx expo export --platform android --no-bytecode`. Sin `--no-bytecode`, Windows negó permiso para ejecutar `hermesc`. `drizzle-kit generate` falla en este entorno con `uv_os_get_passwd returned ENOMEM`; por eso no se pudo regenerar la migración aquí. La instalación terminó, pero `expo install --check` no pudo consultar el registro.
- **Alucinaciones detectadas:** no se detectaron durante la escritura. Falta ejecutar la app en un dispositivo y comprobar autenticación/sincronización con credenciales reales de Supabase.
