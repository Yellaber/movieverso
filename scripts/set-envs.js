(() => {
  require('dotenv').config();

  const APP_NAME = 'MovieVerso';
  const API_URL_TMDB = process.env.API_URL_TMDB;
  const API_KEY_TMDB = process.env.API_KEY_TMDB;
  const API_URL_IMAGE_TMDB = process.env.API_URL_IMAGE_TMDB;
  const API_URL_IPGEOLOCATION = process.env.API_URL_IPGEOLOCATION;
  const API_KEY_IPGEOLOCATION = process.env.API_KEY_IPGEOLOCATION;

  if(!API_URL_TMDB || !API_KEY_TMDB || !API_URL_IMAGE_TMDB) {
    throw new Error('API TMDB environment variables not found.');
  }

  if(!API_URL_IPGEOLOCATION || !API_KEY_IPGEOLOCATION) {
    throw new Error('API IPGEOLOCATION environment variables not found.');
  }

  const { writeFileSync, mkdirSync } = require('fs');
  const baseDir = './src/environments';
  const targetPath = `${baseDir}/environment.ts`;
  const targetPathDev = `${baseDir}/environment.development.ts`;
  const fileContent = `
    export const environment = {
      production: false,
      appName: '${APP_NAME}',
      tmdbApiKey: '${API_KEY_TMDB}',
      tmdbApiUrl: '${API_URL_TMDB}',
      imageUrl: '${API_URL_IMAGE_TMDB}',
      ipGeolocationApiKey: '${API_KEY_IPGEOLOCATION}',
      ipGeolocationApiUrl: '${API_URL_IPGEOLOCATION}'
    };
  `.trim();
  mkdirSync(baseDir, { recursive: true });
  writeFileSync(targetPathDev, fileContent);
  writeFileSync(targetPath, fileContent.replace('production: false', 'production: true'));
  console.log('environment.ts and environment.development.ts files generated.');
})();
