const homeRouter = require('express').Router();


homeRouter.get("/", (request, response) => {
    response.status(200).send(
        "welcome to the market blogger API, here you will get informations and relevant data concerning market gist, price of commidity and seller information"
    )
})

module.exports = homeRouter