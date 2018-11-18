

const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');


let Schema = mongoose.Schema;
let rolesValid = {
    values: ["ADMIN_ROLE","USE_ROLE"],
    message: '{VALUE} NO ES VALIDO'
};


let userSchema = new Schema({
    nombre: {
        type: String,
        required: [true,'El nombre es requerido']
    },
    email:{
        type: String,
        unique: true,
        required: [true,'El correo es requerido']
    },
    password:{
        type: String,
        required: [true,'El password es requerido']
    },
    img:{
        type: String,
        required: false
    },
    role:{
        type: String,
        default: 'USER_ROLE',
        enum: rolesValid
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
});

//userSchema.plugin(uniqueValidator,'{PATH} debe ser único.');
//userSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' });

userSchema.methods.toJSON = function(){

    let userThis = this;

    let userObject = userThis.toObject();
    delete userObject.password;

    return userObject;
    
}

userSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

module.exports = mongoose.model('User',userSchema);