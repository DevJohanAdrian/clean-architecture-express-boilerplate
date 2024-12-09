
# FROM --platform=$BUILDPLATFORM node:22.11.0-alpine3.20

# # Create app directory
# WORKDIR /usr/src/app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install app dependencies
# RUN npm ci 

# # Bundle app source
# COPY . .

# # Install prisma client 
# RUN npm run prisma-postinstall

# # Run test
# RUN npm run test

# # Delete test and node modules modules 
# RUN rm -rf tests && rm -rf setupTest.ts

# # # Delete test and node modules modules 
# # RUN rm -rf node_modules && rm -rf tests 

# # Build the TypeScript files (Porque es una dependecia de desarrollo)
# RUN npm run build

# # Install app prod dependecies (Soluccion 1) Error con husky 
# #RUN npm install --prod

# # Evitar que los scripts se ejecuten durante la instalación en producción (Soluccion 2)
# # RUN npm install --prod --ignore-scripts

# # Instalar las dependencias completas antes de limpiar (elimina las dependencias de desarrollo sin borrar toda la carpeta node_modules.)
# RUN npm install --omit=dev --ignore-scripts


# # # Expose port 3000
# # EXPOSE 3000

# # Start the app
# # CMD npm run dev
# CMD [ "npm", "run", "start" ]





# . ./ HACEN LO MISMO COPIAN DENTRO DEL WORKDIR
# EL COPY COPIA TODO LO QUE NO ESTE IGNORADO EN EL DOKERFILE

# multi stage

# Stage para solo ser usado en desarrollo, se necesita para el dockercompose
FROM node:22.12.0-alpine3.20 AS dev
WORKDIR /app
COPY package.json ./
RUN npm install
# Tambien se puede hacer desde el docker compose
CMD [ "npm", "run", "dev" ] 

#############################################################


# Todas las Dependecias
FROM node:22.12.0-alpine3.20 AS alldependecies
WORKDIR /app
COPY package.json ./
RUN npm install

#############################################################

# Dependecias de produccion
FROM node:22.12.0-alpine3.20 AS dependecies
WORKDIR /app
#Copia mi package.json dentro del WORKDIR
COPY package.json ./
RUN npm install --prod
#############################################################


# Building y testing
FROM node:22.12.0-alpine3.20 AS build
WORKDIR /app
# copio del stage dependencies todo lo de nodemodules
COPY --from=alldependecies /app/node_modules ./node_modules
COPY . .
RUN npm run test
RUN npm run build

#############################################################


# Ejecucion de aplicacion
FROM node:22.12.0-alpine3.20 AS runner
EXPOSE 3000
WORKDIR /app
ENV NOMBRE_VARIABLE=${NOMBRE_VARIABLE}
COPY --from=dependecies /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
CMD ["npm", "run", "start"]
# Comandos de prisma para inicializar la migracion y el seed dist
# env en dist





# # Ejecutar la APP
# FROM node:19.2-alpine3.16 as runner
# WORKDIR /app
# COPY --from=prod-deps /app/node_modules ./node_modules
# COPY app.js ./
# COPY tasks/ ./tasks
# CMD [ "node", "app.js" ]