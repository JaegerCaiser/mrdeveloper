# Use a imagem oficial do Node.js como base
FROM node:22-alpine

# Instale pnpm
RUN npm install -g pnpm

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie o package.json e o pnpm-lock.yaml para o diretório de trabalho
COPY package*.json pnpm-lock.yaml ./

# Instale as dependências do projeto
RUN pnpm install --ignore-scripts

# Copie o restante do código do projeto para o diretório de trabalho
COPY . .

# Construa o aplicativo para produção
RUN pnpm run build

# Use uma imagem do Nginx para servir o aplicativo
FROM nginx:alpine

# Copie os arquivos de build do Vite para o diretório padrão do Nginx
COPY --from=0 /app/build /usr/share/nginx/html

# Garante que o conteúdo estático (ex: public/models/*.glb) também seja copiado
# Isso instrui o Docker a copiar qualquer arquivo que esteja em `/app/public/models`
# caso o build não tenha incluído esses binários diretamente em `/app/build`.
COPY --from=0 /app/public/models /usr/share/nginx/html/models

# Exponha a porta 80 para o Nginx
EXPOSE 80

# Adiciona mapeamento de MIME para .glb (model/gltf-binary) para garantir que o
# Nginx entregue corretamente os modelos GLTF binários.
RUN printf 'types {\n  model/gltf-binary glb;\n}\n' > /etc/nginx/conf.d/glb-mime.conf

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]