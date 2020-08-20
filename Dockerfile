FROM registry.cn-hangzhou.aliyuncs.com/aliyun-node/alinode:v5.16.0-alpine

RUN mkdir /app
WORKDIR /app

ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV}
ENV LANG C.UTF-8

COPY . /app
RUN node -v
RUN npm install -g yarn
RUN yarn

EXPOSE 3000

CMD ["yarn pro"]
