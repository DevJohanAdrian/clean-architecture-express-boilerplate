import { AppRoutes } from '../src/presentation/express/routes/index.routes';
// import env from '../src/presentation/express/config/envs';
import { Server } from '../src/presentation/express/server';

// Crear servidor de prueba
export const testserver = new Server({
  port: 0, // Usar 0 elige un puerto dinámico.
  routes: AppRoutes.routes
});
