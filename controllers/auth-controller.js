const User = require("../models/user-model")
const bcrypt = require("bcryptjs")
const home = async (req, res) => {
    try {
        res
            .status(200)
            .send("😍Welcome to Server")
    } catch (error) {
        console.log(error)
    }
}
// User Registration Logic
const register = async (req, res) => {
    try {
        // console.log(req.body)
        const { username, email, phone, password } = req.body;
        const userExist = await User.findOne({ email })
        if (userExist) {
            return res.status(400).json({ msg: "email already exist" })
        }
        // hash the password
        const userCreated = await User.create({
            username, email, phone, password

        })
        res.status(201).json({ msg: "registration successfull", token: await userCreated.generateToken(), userId: userCreated._id.toString(), })
    } catch (error) {
        res.status(500).json("Internal Server Error")
    }
}

// User Login Logic

const login = async (req, res) =>{
    try {
        const {email, password} = req.body;

        const userExist = await User.findOne({ email });
        console.log(userExist)
        if(!userExist){
            return res.status(400).json({message : "Invalid Credentials"})
        }
        const user = await userExist.comparePassword(password);
        if(user){
            res.status(200).json({
                msg : "Login successful",
                token : await userExist.generateToken(),
                userId : userExist._id.toString(),
            })
        }else{
            res.status(401).json({
                msg: "Invalid email or password"
            })
        }

    } catch (error) {
        res.status(500).json("Internal Server Error")
    }
}

module.exports = { home, register, login }