const User = require("../models/user-model")
const Contact = require("../models/contact-model")



const getAllUsers = async(req, res) =>{
    try {
        const users = await User.find({},{password : 0});
        console.log(users)
        if(!users || users.length === 0){
            res.status(404).json({message : "No Users Found"})
        }
            res.status(200).json(users)
    } catch (error) {
        next(error);
    }
}

const getAllContacts = async(req, res) => {
    try {
        const contact = await Contact.find({},{password : 0});
        console.log(contact)
        if(!contact || contact.length === 0){
            res.status(404).json({message : "No Users Found"})
        }
            res.status(200).json(contact)
    } catch (error) {
        next(error);
    }
}

module.exports = { getAllUsers, getAllContacts };