FROM node:18-alpine
WORKDIR /api_server/app
# ホストのpackage.jsonとpackage-lock.jsonを
# コンテナの/appにコピー
COPY ./package*.json ./

CMD sh -c "npm install && npm install -g @nestjs/cli && npm run start:dev"
