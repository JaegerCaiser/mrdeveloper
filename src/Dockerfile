# Use a imagem oficial do Node.js como base
FROM node:14-alpine

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante do código do projeto para o diretório de trabalho
COPY . .

# Construa o aplicativo para produção
RUN npm run build

# Use uma imagem do Nginx para servir o aplicativo
FROM nginx:alpine

# Copie os arquivos de build do React para o diretório padrão do Nginx
COPY --from=0 /app/build /usr/share/nginx/html

# Exponha a porta 80 para o Nginx
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]