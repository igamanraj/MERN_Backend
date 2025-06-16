const Contact = require("../models/contact-model");

const contactForm = async (req, res) => {
    try {
        const response = req.body
        await Contact.create(response);
        return res.status(200).json({ message: "😍message send successfully" });
    } catch (error) {
        return res.status(500).json({ message: "message not delivered" })
    }
}


// get all contacts data

// const getAllContacts = async(req, res) =>{
//     try {
//         const contact = await Contact.find();
//         console.log(contact)
//         if(!contact || contact.length === 0){
//             res.status(404).json({message : "No Contacts found"})
//         }
//         res.status(200).json(contact)
//     } catch (error) {
//         next(error);
//     }
// }





module.exports = contactForm;