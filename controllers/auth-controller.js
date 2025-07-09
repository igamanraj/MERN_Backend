
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
        const { username, email, phone, password, profilePicture } = req.body;
        const userExist = await User.findOne({ email })
        const usernameExist = await User.findOne({ username })
        if (userExist) {
            return res.status(400).json({ message: "email already exist" })
        }
        if (usernameExist) {
            return res.status(400).json({ message: "username already exist" })
        }
        // hash the password
        const userCreated = await User.create({
            username, email, phone, password, profilePicture :generateAvatar(), 

        })
        console.log("profilePicture: ", req.body.profilePicture);
        console.log("userCreated.profilePicture: ", userCreated.profilePicture);
        res.status(201).json({ msg: "registration successfull", token: await userCreated.generateToken(), userId: userCreated._id.toString()})
    } catch (error) {
        res.status(500).json("Internal Server Error")
    }
}

// User Login Logic
// to send user data - User Logic 

const user = async(req, res)=>{
    try {
        const userData = req.user;
        // console.log(userData)
        // res.status(200).json({msg : "hi user"});
        return res.status(200).json({userData})
    } catch (error) {
        console.log(`Error from the user route ${error}`)
    }
}

const login = async (req, res) =>{
    try {
        const {email, password} = req.body;

        const userExist = await User.findOne({ email });
        // console.log(userExist)
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




const googleSignIn = async (req, res) => {
    try {
        const { displayName, email, photoURL, uid , phone } = req.body;
        console.log("Request Body:", req.body);
        // Check if user already exists
        let user = await User.findOne({                     
            email: email
        }); 
        if (!user) {
            // If user does not exist, create a new user
            user = await User.create({
                username: displayName || email.split('@')[0], // Use displayName or email prefix as username
                email: email,
                phone: phone || "Not Provided",
                password: "",
                profilePicture: photoURL,
                uid: uid
            });
        }

        // Generate a token for the user
        const token = await user.generateToken();
        res.status(200).json(
            { 
                msg: "Google Sign-In successful", 
                token, 
                userId: user._id.toString(),
            });
    } catch (error) {
        console.error("Google Sign-In Error:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};
function generateAvatar() {
  const avatars = ["user1", "user2", "user3", "user4"];
  const randomIndex = Math.floor(Math.random() * avatars.length);
  return avatars[randomIndex];
}


module.exports = { home, register, login, user, googleSignIn }