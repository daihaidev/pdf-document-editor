FROM node:12.16.1

ENV INSTALL_PATH /pdfco-documentparser
RUN mkdir -p $INSTALL_PATH
WORKDIR $INSTALL_PATH

ENV PATH $INSTALL_PATH/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . ./

# start app

# For development
CMD ["npm", "run", "dev"]

# For production
# CMD ["npm", "start"]
