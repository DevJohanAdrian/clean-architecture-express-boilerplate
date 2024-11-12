import env from "@presentation/express/config/envs";
import errorHandler from "@presentation/express/common/middleware/errorHandler";
import rateLimiter from "@presentation/express/common/middleware/rateLimiter";
import requestLogger from "@presentation/express/common/middleware/requestLogger";
import { openAPIRouter } from "@presentation/express/api-docs/openAPIRouter";
import cors from "cors";
import helmet from "helmet";
import { pino } from "pino";
import express, { Router, type Express } from 'express';
import compression from 'compression';

import path from 'path';
import { createServer, Server as HttpServer } from 'http'; // Para crear el servidor HTTP


const logger = pino({ name: "server start" });

interface Options {
  port: number;
  routes: Router;
  public_path?: string;
}


 class Server {

  public readonly app: Express = express(); // se cambio a public para hacer uso de el en pruebas
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;
  private server!: HttpServer; // Tipo HttpServer para tener acceso a .close()

  constructor(options: Options) {
    const { port, routes, public_path = 'public' } = options;
    this.port = port;
    this.publicPath = public_path;
    this.routes = routes;
  }

  
  
  async start() {
    //* Set the application to trust the reverse proxy
    this.app.set("trust proxy", true);

    //* Middlewares
    this.app.use( express.json() ); // raw
    this.app.use( express.urlencoded({ extended: true }) ); // x-www-form-urlencoded
    this.app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
    this.app.use(helmet());
    this.app.use(rateLimiter);
    this.app.use(compression())

    //* Request logging
    this.app.use(requestLogger);

    //* Public Folder
    this.app.use( express.static( this.publicPath ) );


    //* Routes
    this.app.use('/v1/api', this.routes );

    // Swagger UI
    this.app.use(openAPIRouter);


    //* SPA
    // this.app.get('*', (req, res) => {
    //   const indexPath = path.join( __dirname + `../../../${ this.publicPath }/index.html` );
    //   res.sendFile(indexPath);
    // });

    // Error handlers
    this.app.use(errorHandler());
    
    // Crear servidor HTTP
    this.server = createServer(this.app);

    this.server.listen(this.port, () => {
      const { NODE_ENV, HOST, PORT } = env;
      console.log(`Server running on port ${ this.port }`);
      logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
    });

    

  }

  private handleShutdown() {
    const onCloseSignal = () => {
      console.log("SIGINT or SIGTERM received, shutting down...");
      
      // Cerrar el servidor de manera controlada
      this.server.close(() => {
        console.log("Server closed");
        process.exit(0); // Salida exitosa
      });

      // Forzar cierre después de 10 segundos si no ha cerrado completamente
      setTimeout(() => process.exit(1), 10000).unref(); 
    };

    // Escuchar las señales SIGINT y SIGTERM
    process.on("SIGINT", onCloseSignal);
    process.on("SIGTERM", onCloseSignal);
  }

}

export {logger, Server}