import Users from "../models/userModel.js";

export const create = async (req, res) => {
    try {
        
        const newUser = new Users(req.body);
        const {email} = req.body;

        const usrExists = await Users.findOne({email});
        if(usrExists){
            return res.status(400).json({ message: "El usuario ya existe." })
        }

        const svdData = await newUser.save();
        res.status(200).json(svdData);

    } catch (err) {
        res.status(500).json({ errorMessage: err.message });
    }
}

export const getAllUsers = async(req, res) => {
    try {
        const usrData = await Users.find();
        if(!usrData || usrData.length === 0){
            return res.status(404).json({message: "User data not found."});
        }
        res.status(200).json(usrData);

    } catch (error){
        res.status(500).json({ errorMessage: error.message });
    }
}