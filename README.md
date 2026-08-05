# Regalo de cumpleaños · Nuestra historia

Una experiencia romántica e interactiva construida como una Single Page Application. Comienza con una clave decorativa, continúa con una serenata y recorre una línea de tiempo, una galería Polaroid, razones de amor, una carta y una sorpresa final.

El diseño es **mobile-first**: funciona desde 320 px, respeta las áreas seguras de iPhone/Android y se adapta a tabletas y computadoras con composiciones específicas para cada tamaño.

> Las imágenes incluidas son recursos originales de demostración generados para este proyecto. Reemplázalas por sus fotografías personales antes de publicar.

## Vista previa

Agrega aquí tus capturas cuando personalices el proyecto:

```text
docs/screenshots/mobile.webp
docs/screenshots/desktop.webp
```

## Tecnologías

- React + TypeScript + Vite.
- Tailwind CSS 4 mediante su plugin oficial para Vite.
- Motion for React.
- `useReducer` + Context para las escenas globales.
- `HTMLAudioElement` para voz y serenata.
- GitHub Actions y GitHub Pages.

## Instalación y ejecución local

Requiere Node.js 22 (también funciona con versiones LTS compatibles con Vite 7).

```bash
npm install
npm run dev
```

Vite mostrará la URL local en la terminal. La clave inicial de demostración es `daniela`; cámbiala antes de publicar.

Comprobaciones de calidad:

```bash
npm run typecheck
npm run lint
npm run build
npm run preview
```

## Personalización rápida

La configuración principal está en `src/config/experience.config.ts`. Desde allí puedes cambiar:

- `girlfriendName`: nombre que aparece en la serenata y el final.
- `birthdayMessage` y `romanticSubtitle`.
- Rutas de portada, audio y video.
- Título y descripción del regalo final.
- `repositoryName` como referencia del repositorio.

Los textos y recuerdos están separados de la interfaz:

| Contenido | Archivo |
| --- | --- |
| Línea de tiempo | `src/data/memories.ts` |
| Galería | `src/data/photos.ts` |
| Razones | `src/data/reasons.ts` |
| Carta | `src/data/letter.ts` |

### Cambiar la clave

Genera un hash SHA-256 sin guardar la clave en el código:

```bash
node scripts/generate-hash.mjs "nuestra-clave-secreta"
```

Copia el resultado en `accessKeyHash` dentro de `src/config/experience.config.ts`.

**Importante:** esta clave es solo un recurso decorativo. Toda la aplicación se descarga al navegador y una persona con conocimientos técnicos puede inspeccionarla o evitar esta pantalla. No es autenticación segura y no debe proteger información sensible.

### Agregar fotografías

1. Convierte las imágenes a WebP.
2. Colócalas en `public/images/gallery/` o `public/images/timeline/`.
3. Añade sus rutas relativas —sin `/` inicial— en `src/data/photos.ts` y `src/data/memories.ts`.
4. Escribe un texto alternativo real y descriptivo en cada fotografía.

Ejemplo correcto:

```ts
image: "images/timeline/primer-viaje.webp"
```

Todas las rutas públicas pasan por `src/utils/publicAsset.ts`, por lo que funcionan bajo el subdirectorio de GitHub Pages.

### Agregar la serenata y la voz

Coloca archivos autorizados en:

```text
public/audio/serenata.mp3
public/audio/introduccion-voz.mp3
```

La voz es opcional. Si un archivo no existe o el navegador bloquea la reproducción automática, la aplicación muestra un control manual y continúa funcionando.

No se incluye música comercial. Verifica que tengas los derechos o la autorización necesarios antes de publicar audio en internet.

### Agregar el video final

Coloca el archivo en:

```text
public/video/sorpresa-final.mp4
```

Recomendación: MP4 con video H.264, 1080p o menor, optimizado para web. El componente del video se carga dinámicamente solo cuando la persona decide verlo.

## Publicar en GitHub Pages

1. Crea un repositorio llamado `regalo-cumple`.
2. Sube el proyecto a la rama `main`.
3. En GitHub abre **Settings → Pages**.
4. En **Build and deployment → Source**, selecciona **GitHub Actions**.
5. Haz push a `main`; `.github/workflows/deploy.yml` ejecutará TypeScript, ESLint y el build antes de publicar `dist`.

Comandos habituales:

```bash
git init
git add .
git commit -m "Crea regalo de cumpleaños"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/regalo-cumple.git
git push -u origin main
```

La URL final será:

```text
https://TU-USUARIO.github.io/regalo-cumple/
```

### Usar otro nombre de repositorio

Si el repositorio no se llama `regalo-cumple`:

1. Cambia `base` en `vite.config.ts` a `"/NUEVO-NOMBRE/"`.
2. Cambia `repositoryName` en `src/config/experience.config.ts`.
3. Ejecuta `npm run build` para verificar.

## Rutas y errores frecuentes en GitHub Pages

- No escribas rutas absolutas como `/images/foto.webp`; GitHub buscaría el archivo en la raíz del dominio.
- Usa rutas relativas en los datos. `publicAsset()` agrega automáticamente `import.meta.env.BASE_URL`.
- Si la pantalla aparece en blanco, confirma que `base` coincida exactamente con el nombre del repositorio, incluyendo mayúsculas y guiones.
- Si falla el workflow, ejecuta localmente `npm ci`, `npm run typecheck`, `npm run lint` y `npm run build`.
- Los nombres de archivo distinguen mayúsculas y minúsculas al publicarse en Linux.

## Privacidad

GitHub Pages es público salvo que tu plan y configuración indiquen lo contrario. Evita publicar direcciones, documentos, ubicaciones precisas, números de teléfono o cualquier recuerdo que no quieran compartir. Comprime las fotografías y elimina metadatos EXIF antes de subirlas.

## Accesibilidad y rendimiento

- Navegación por teclado, foco visible y modal controlable con Escape/flechas.
- Botones táctiles amplios y layouts desde 320 px hasta escritorio.
- Compatibilidad con `prefers-reduced-motion` y control para detener efectos decorativos.
- Imágenes WebP con carga diferida; solo portada y audio se precargan.
- Pocas partículas CSS en móviles y video cargado bajo demanda.
- Mensajes de respaldo si faltan medios opcionales.

## Licencia y uso

El código puede adaptarse para este regalo personal. Las fotografías, audios y videos que agregues conservan los derechos de sus respectivos autores y protagonistas.
