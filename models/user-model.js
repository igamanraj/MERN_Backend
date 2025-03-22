const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        reuired: true
    },
    phone: {
        type: String,
        reuired: true
    },
    password: {
        type: String,
        reuired: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

// secure the password with the bcrypt
userSchema.pre('save', async function(next){
    // console.log()
    const user = this;
    if(!user.isModified('password')){
        next()
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password, saltRound)
        user.password = hashPassword;
    } catch (error) {
        next(error)
    }

})

// compare the password
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password )
}

// json web token 
userSchema.methods.generateToken = async function(){
    try {
        return jwt.sign({
            userId : this._id.toString(),
            email : this.email,
            isAdmin : this.isAdmin
        },process.env.JWT_SECRET_KEY,{
            expiresIn : "30d"
        })
    } catch (error) {
        console.error(error)
    }
};


const User = new mongoose.model("User", userSchema);
module.exports = User;