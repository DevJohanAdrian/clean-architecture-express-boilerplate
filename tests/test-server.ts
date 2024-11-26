import { AppRoutes } from '../src/Presentation/express/routes/index.routes';
// import env from '../src/presentation/express/config/envs';
import { Server } from '../src/Presentation/express/server';

// Crear servidor de prueba
export const testserver = new Server({
  port: 0, // Usar 0 elige un puerto dinámico.
  routes: AppRoutes.routes
});
