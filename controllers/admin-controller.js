const User = require("../models/user-model")
const Contact = require("../models/contact-model")


// get all users logic
const getAllUsers = async(req, res) =>{
    try {
        const users = await User.find({},{password : 0});
        // console.log(users)
        if(!users || users.length === 0){
            res.status(404).json({message : "No Users Found"})
        }
            res.status(200).json(users)
    } catch (error) {
        next(error);
    }
}

// get all contacts logic
const getAllContacts = async(req, res) => {
    try {
        const contact = await Contact.find({},{password : 0});
        // console.log(contact)
        if(!contact || contact.length === 0){
            res.status(404).json({message : "No Users Found"})
        }
            res.status(200).json(contact)
    } catch (error) {
        next(error);
    }
}

//delete users logic
const deleteUserById = async(req, res) => {
    try {
        const id = req.params.id;
        await User.deleteOne({_id : id})
        res.status(200).json({message : "User Deleted Successfully"})
    } catch (error) {
        next(error);
    }
}

//get single user for updation
const getUserById = async(req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findOne({_id : id}, { password : 0 })
        res.status(200).json(data)
    } catch (error) {
        next(error);
    }
}

//get update user logic
const updateUserById = async(req, res) => {
     try {
        const id = req.params.id;
        const updatedUserData = req.body;

        const updatedData = await User.updateOne({_id:id},{
            $set: updatedUserData
        })
        return res.status(200).json(updatedData)
     } catch (error) {
        next(error)
     }
}

module.exports = { getAllUsers, getAllContacts, deleteUserById, getUserById, updateUserById };