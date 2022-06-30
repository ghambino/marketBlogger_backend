const logger = require('../bloglistBackend/utils/logger');
const app =  require('../bloglistBackend/app');
const http = require('http');
const config = require('../bloglistBackend/utils/config');


const server = http.createServer(app);

server.listen(config.PORT, () =>{
    logger.info(`server running on port ${config.PORT}`)
})