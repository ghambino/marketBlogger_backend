const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        uniqueCaseInsensitive: true
    },
    name: {
        type: String,
        unique: true,
        required: true,
        uniqueCaseInsensitive: true
 
    },
    passwordHash: {
        type: String,
        required: true,
    
    },
    blogpost: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Bloglist'
        }
    ]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User