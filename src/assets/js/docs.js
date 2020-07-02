import SwaggerUI from 'swagger-ui';

window.onload = () => {
  // Begin Swagger UI call region
  const ui = SwaggerUI({
    url: '/docs/openapi.json',
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUI.presets.apis,
      SwaggerUI.SwaggerUIStandalonePreset,
    ],
    plugins: [
      SwaggerUI.plugins.DownloadUrl,
    ],
    layout: 'BaseLayout',
  });

  window.ui = ui;
};
