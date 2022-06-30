const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')


 loginRouter.post('/', async (request, response, next) => {
     const body = request.body

     const loginUser = await User.findOne({username: body.username})
     

     const correctPassword = !loginUser ? false : await bcrypt.compare(body.password, loginUser.passwordHash);

    if (!loginUser || !correctPassword){
        response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const authorisedUser = {
        username: loginUser.username,
        id: loginUser.id
    }

    const token = jwt.sign(authorisedUser, process.env.SECRET)
try{
    response
    .status(200)
    .send({token, username: loginUser.username, name: loginUser.name})
}
catch(error){
    console.log(error.message)
}
    

 })

 module.exports = loginRouter