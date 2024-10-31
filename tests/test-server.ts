import { AppRoutes } from "../src/frameworks&InterfaceAdapaters&Presentation/express/routes/index.routes";
import env from "../src/config/envs";
import { Server } from "../src/frameworks&InterfaceAdapaters&Presentation/express/server";

// Crear servidor de prueba
export const testserver = new Server({
    port:env.PORT,
    routes: AppRoutes.routes,
})
