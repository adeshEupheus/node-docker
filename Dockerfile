FROM node:18
WORKDIR /app
COPY package.json .
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "dev" ] ; then npm install ; else npm install --production ; fi
    # then npm install; \
    # else npm install --production; \
COPY . ./
ENV PORT=4000
EXPOSE ${PORT}
CMD [ "npm", "start" ]