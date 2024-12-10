

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
#RUN npm install --prod
RUN npm install --omit=dev --ignore-scripts
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

