import { config } from 'dotenv';
// Se debe de crear un ambiente de testing para probar el llamado del servidor
// Creando variables de entorno para testing (ENV.TEST)

// Con esta configuracion le estoy diciendo a dotenv que carge las variables de env.test
// Cuando importe el archivo de config/env.ts este toma las variables de env.test 
config({
    path: '.env.test'
})