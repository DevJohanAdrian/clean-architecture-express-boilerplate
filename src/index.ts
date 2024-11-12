import env from "@presentation/express/config/envs";
import { logger, Server } from "@presentation/express/server";
import { AppRoutes } from "@presentation/express/routes/index.routes";




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