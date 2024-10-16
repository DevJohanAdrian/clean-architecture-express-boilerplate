import env  from "./config/envs";
import { logger, Server } from "./frameworks&InterfaceAdapaters&Presentation/express/server";
import { AppRoutes } from "./frameworks&InterfaceAdapaters&Presentation/express/routes/index.routes";




// funcion auntoinvocada
(async()=>{
main();
})();

function main(){
  const server= new Server({
    port: env.PORT,
    // public_path:env.PUBLIC_PATH,
    routes: AppRoutes.routes,
  })
  
  server.start()

}