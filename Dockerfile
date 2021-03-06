FROM node:14
WORKDIR /app
COPY . .
RUN yarn
RUN yarn build
CMD ["yarn", "start:prod"]
EXPOSE 8080