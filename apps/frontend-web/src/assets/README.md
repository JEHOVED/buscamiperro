# Assets de la Aplicación

## Iconos PWA

Para generar los iconos de la PWA, necesitas crear los siguientes archivos en `src/assets/icons/`:

- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

### Herramientas recomendadas:

1. **PWA Asset Generator**: https://github.com/onderceylan/pwa-asset-generator
2. **Favicon Generator**: https://realfavicongenerator.net/
3. **PWA Builder**: https://www.pwabuilder.com/

### Comando para generar iconos automáticamente:

```bash
npx pwa-asset-generator logo.svg src/assets/icons --manifest src/manifest.json
```

## Imágenes

- Coloca las imágenes de la aplicación en `src/assets/images/`
- Usa formatos optimizados (WebP cuando sea posible)
- Mantén tamaños razonables para web

## Screenshots

Para la PWA, agrega screenshots en `src/assets/screenshots/`:
- desktop-1.png (1280x720)
- mobile-1.png (375x667)

## Favicon

Coloca el favicon.ico en `src/favicon.ico`