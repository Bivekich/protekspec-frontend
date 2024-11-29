module.exports = [
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "http:", "https:"],
          "img-src": ["'self'", "data:", "blob:", "http:", "https:"],
          "media-src": ["'self'", "data:", "blob:", "http:", "https:"],
        },
      },
      cors: {
        enabled: true,
        origin: ["http://localhost:5173"], // Your frontend URL
      },
    },
  },
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
