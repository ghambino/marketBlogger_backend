const User = require('../models/user')
const userRouter = require('express').Router();
const bcrypt = require('bcrypt')

userRouter.post('/', async (request, response, next) => {
    const body = request.body
    if (body.password.length < 3){
        response.status(400).send({error: 'password is too short'})
    }
    
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })

    try {
        const savedUser = await user.save()
        response.json(savedUser)
    }
     catch(error){
         next(error)
     }
})

userRouter.get('/', async(request, response, next) => {
    try{
        const returned = await User.find({}).populate('blogpost', {title: 1, likes: 1})
        const processed = returned.map(user => user.toJSON())
        response.json(processed)
    } 
    catch (error){
        next(error)
    }
})

module.exports = userRouter