const Service = require("../models/service-model")

const services = async (req, res) => {
    try {
        const response = await Service.find();
        if (!response) {
            //Handle the case when no services found
            res.status(404).json({msg: "No Services found"});
            return 
        }
        res.status(200).json({ msg: response })
    } catch (error) {
        console.log(`services: ${error}`)
    }
}

module.exports = services;