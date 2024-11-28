
FROM node:22.11.0-alpine3.20

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm ci 

# Bundle app source
COPY . .

# Install prisma client 
RUN npm run prisma-postinstall

# Run test
RUN npm run test

# Delete test and node modules modules 
RUN rm -rf tests && rm -rf setupTest.ts

# # Delete test and node modules modules 
# RUN rm -rf node_modules && rm -rf tests 

# Build the TypeScript files (Porque es una dependecia de desarrollo)
RUN npm run build

# Install app prod dependecies (Soluccion 1) Error con husky 
#RUN npm install --prod

# Evitar que los scripts se ejecuten durante la instalación en producción (Soluccion 2)
# RUN npm install --prod --ignore-scripts

# Instalar las dependencias completas antes de limpiar (elimina las dependencias de desarrollo sin borrar toda la carpeta node_modules.)
RUN npm install --omit=dev --ignore-scripts


# # Expose port 3000
# EXPOSE 3000

# Start the app
# CMD npm run dev
CMD [ "npm", "run", "start" ]