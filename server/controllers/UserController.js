import User from "../models/userModel.js";

export const createUsr = async (req, res) => {
    try {

        const newUser = new User(req.body);
        const {email} = req.body;

        const usrExists = await User.findOne({email});
        if(usrExists){
            return res.status(400).json({ message: "El usuario ya existe." })
        }

        const svdData = await newUser.save();
        res.status(200).json({message: `El usuario ${svdData.name} fue creado exitosamente!`});

    } catch (err) {
        res.status(500).json({ errorMessage: err.message });
    }
}

export const getAllUsrs = async(req, res) => {
    try {

        const usrData = await User.find();

        if(!usrData || usrData.length === 0){
            return res.status(404).json({message: "No existen datos de usuarios."});
        }

        res.status(200).json(usrData);
    
    } catch (error){
        res.status(500).json({ errorMessage: error.message });
    }
}

export const getUsrById = async(req, res) => {
    try {

        const idReq = req.params.id;
        const usrFound = await User.findById(idReq);

        if (!usrFound) {
            return res.status(404).json({message: "Usuario no existente."});
        }

        res.status(200).json(usrFound);

    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const updateUsr = async(req, res) => {
    try {

        const idReq = req.params.id;
        const usrFound = await User.findById(idReq);

        if (!usrFound) {
            return res.status(404).json({message: "Usuario no existente."});
        }

        const updatedUsr = await User.findByIdAndUpdate(idReq, req.body, {
            new:true
        })

        //res.status(200).json(updatedUsr);
        res.status(200).json({message: `Usuario actualizado correctamente!`});
        // El usuario ${usrFound.name} fue actualizado a ${updatedUsr.name}. 
        //     El correo del usuario ${usrFound.name} fue actualizado a ${updatedUsr.email}. 
        //     La dirección del usuario ${usrFound.name} fue actualizada a ${updatedUsr.address}.

    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const deleteUsr = async(req, res) => {
    try {

        const idReq = req.params.id;
        const usrFound = await User.findById(idReq);

        if (!usrFound) {
            return res.status(404).json({message: "Usuario no existente."});
        }

        await User.findByIdAndDelete(idReq);
        res.status(200).json({ message: `Usuario ${usrFound.name} elminado exitosamente.`})

    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}