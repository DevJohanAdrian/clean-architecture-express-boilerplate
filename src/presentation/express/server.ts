// Importa el router para la documentación OpenAPI/Swagger
import { openAPIRouter } from '@presentation/express/api-docs/openAPIRouter';
// Importa el middleware para manejar errores en la aplicación
import errorHandler from '@presentation/express/common/middleware/errorHandler';
// Importa el middleware para limitar la tasa de solicitudes (previene ataques de fuerza bruta)
import rateLimiter from '@presentation/express/common/middleware/rateLimiter';
// Importa el middleware para registrar las solicitudes HTTP
import requestLogger from '@presentation/express/common/middleware/requestLogger';
// Importa las variables de entorno configuradas
import env from '@/presentation/express/config/envs';
// Importa el middleware de compresión para reducir el tamaño de las respuestas
import compression from 'compression';
// Importa el middleware CORS para permitir solicitudes de diferentes orígenes
import cors from 'cors';
// Importa Express y sus tipos para TypeScript
import express, { type Router, type Express } from 'express';
// Importa Helmet para añadir cabeceras HTTP relacionadas con seguridad
import helmet from 'helmet';
// Importa Pino para logging estructurado
import { pino } from 'pino';

// Importa tipos y funciones para crear un servidor HTTP nativo de Node.js
import { type Server as HttpServer, createServer } from 'node:http'; // Para crear el servidor HTTP
// import path from 'node:path'; // Comentado: Se usaría para manejar rutas de archivos en SPA

// Inicializa el logger con un nombre descriptivo
const logger = pino({ name: 'server start' });

// Define la interfaz para las opciones de configuración del servidor
interface Options {
  port: number; // Puerto en el que escuchará el servidor
  routes: Router; // Router de Express con las rutas de la API
  public_path?: string; // Ruta opcional a la carpeta de archivos estáticos
}

/**
 * Clase Server que encapsula la configuración y gestión del servidor Express
 * Implementa un patrón de diseño para abstraer la lógica del servidor
 */
class Server {
  public readonly app: Express = express(); // Instancia de Express, pública para permitir su uso en pruebas
  private readonly port: number; // Puerto en el que escuchará el servidor
  private readonly publicPath: string; // Ruta a la carpeta de archivos estáticos
  private readonly routes: Router; // Router con las rutas de la API
  private server!: HttpServer; // Servidor HTTP nativo de Node.js (! indica inicialización posterior)

  /**
   * Constructor que inicializa las propiedades del servidor
   * @param options Opciones de configuración del servidor
   */
  constructor(options: Options) {
    const { port, routes, public_path = 'public' } = options; // Desestructura las opciones con valor por defecto para public_path
    this.port = port; // Asigna el puerto
    this.publicPath = public_path; // Asigna la ruta de archivos públicos
    this.routes = routes; // Asigna las rutas de la API
  }

  /**
   * Método asíncrono que inicia el servidor con toda su configuración
   * Configura middlewares, rutas y opciones del servidor
   */
  async start() {
    //* Set the application to trust the reverse proxy
    this.app.set('trust proxy', true); // Permite que Express confíe en los encabezados de proxy inverso (importante para obtener IP real del cliente)

    //* Middlewares
    this.app.use(express.json()); // Middleware para parsear cuerpos de solicitud en formato JSON
    this.app.use(express.urlencoded({ extended: true })); // Middleware para parsear datos de formularios URL-encoded
    this.app.use(cors({ origin: env.CORS_ORIGIN, credentials: true })); // Configura CORS con origen permitido desde variables de entorno
    this.app.use(helmet()); // Añade cabeceras HTTP de seguridad
    this.app.use(rateLimiter); // Aplica límites de tasa para prevenir ataques
    this.app.use(compression()); // Comprime respuestas para mejorar rendimiento

    //* Request logging
    this.app.use(requestLogger); // Registra información sobre cada solicitud HTTP

    //* Routes
    this.app.use('/v1/api', this.routes); // Monta todas las rutas de la API bajo el prefijo /v1/api

    //* Swagger UI
    this.app.use('/docs', openAPIRouter); // Monta la documentación Swagger/OpenAPI en /docs

    //* Public Folder
    this.app.use(express.static(this.publicPath)); // Sirve archivos estáticos desde la carpeta pública

    // //* SPA - Código comentado para servir una Single Page Application
    // this.app.get('*', (req, res) => {
    //   const indexPath = path.join(`${__dirname}../../../${this.publicPath}/index.html`);
    //   res.sendFile(indexPath);
    // });

    //* Error handlers
    this.app.use(...errorHandler()); // Aplica middleware de manejo de errores (spread operator para múltiples middlewares)

    //* Crear servidor HTTP
    this.server = createServer(this.app); // Crea un servidor HTTP nativo de Node.js usando la app Express

    // Inicia el servidor en el puerto configurado
    this.server.listen(this.port, () => {
      const { NODE_ENV, HOST, PORT } = env; // Obtiene variables de entorno
      // console.log(`Server running on port ${this.port}`); // Log comentado
      logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`); // Registra información del servidor iniciado
      logger.info(`Swagger docs (${NODE_ENV}) running on port http://localhost:${PORT}/docs/`); // Registra URL de documentación
    });

    //* keep alive - Configuración para conexiones persistentes
    // Establece el tiempo en milisegundos que el servidor mantendrá una conexión abierta sin actividad
    this.server.keepAliveTimeout = 60 * 1000 + 1000; // 61 segundos - Tiempo de espera para conexiones inactivas
    // Establece el tiempo máximo para recibir todos los encabezados antes de cerrar la conexión
    this.server.headersTimeout = 60 * 1000 + 2000; // 62 segundos - Debe ser mayor que keepAliveTimeout
  }

  /**
   * Método público que verifica si el servidor está en ejecución
   * @returns boolean - true si el servidor está ejecutándose, false en caso contrario
   */
  public isRunning(): boolean {
    return this.server && this.server.listening; // Verifica que el servidor exista y esté escuchando
  }

  /**
   * Método público para cerrar el servidor de forma controlada
   * Útil para pruebas y para apagar el servidor correctamente
   */
  public close() {
    // Código comentado: Manejador de señales para cierre controlado del servidor
    // const onCloseSignal = () => {
    //   logger.info('SIGINT or SIGTERM received, shutting down...');
    //   // console.log('SIGINT or SIGTERM received, shutting down...');
    //   // Cerrar el servidor de manera controlada
    //   this.server.close(() => {
    //     logger.info('Server closed');
    //     // console.log('Server closed');
    //     process.exit(0); // Salida exitosa
    //   });
    //   // Forzar cierre después de 10 segundos si no ha cerrado completamente
    //   setTimeout(() => process.exit(1), 10000).unref();
    // };
    // // Escuchar las señales SIGINT y SIGTERM
    // process.on('SIGINT', onCloseSignal);
    // process.on('SIGTERM', onCloseSignal);

    // Verifica que el servidor exista antes de intentar cerrarlo
    if (this.server) {
      this.server.close(err => {
        if (err) {
          logger.error('Error closing server:', err); // Registra error si ocurre durante el cierre
        } else {
          logger.info('Server closed'); // Registra cierre exitoso
        }
      });
    }
  }
}

// Exporta la clase Server para su uso en otros módulos
export { Server };
