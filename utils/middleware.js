const logger = require('./logger');

const errorHandler = (error, request, response, next) =>{
    logger.error(error.message);

    if(error.name === "CastError"){
        response.status(404).send({error: "malformatted id"})
    }
    else if (error.name === "ValidationError"){
        response.status(404).send({error: "unvalidated content"})
    }else if (error.name === "JsonWebTokenError"){
        response.status(401).json({error: 'invalid token'})
    }

    next(error)
}

const requestlogger = (request, response, next) =>{
    logger.info("Method:", request.method)
    logger.info("Body:", request.body)
    logger.info("Path:", request.path)
    logger.info("---")
    next()
}
const unknownEndpoint = (request, response) =>{
    response.status(404).send({error: 'unknown endpoint'})
}

const tokenExtractor = (request, response, next) => {
    const authbody = request.headers['authorization']
    if (authbody){
        const bearer = authbody.split(' ')
        let token = bearer[1]
        request.token = token
        next()

    }else {
        response.status(401).send('Unauthorised request')
    }
}

module.exports = {
    errorHandler,
    requestlogger,
    unknownEndpoint,
    tokenExtractor
} 
