import Users from "../models/userModel.js";

export const create = async (req, res) => {
    try {
        const newUser = new Users(req.body);
        const {email} = req.body;

        const userExists = await Users.findOne({email});
        if(userExists){
            return res.status(400).json({ message: "El usuario ya existe." })
        }

        const savedData = await newUser.save();
        res.status(200).json(savedData);

    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}
