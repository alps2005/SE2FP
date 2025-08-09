import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export const createUsr = async (req, res) => {
    try {
        const { email, password, ...otherData } = req.body;

        const usrExists = await User.findOne({email});
        if(usrExists){
            return res.status(400).json({ message: "El usuario ya existe." })
        }

        // Hash the password before saving
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            ...otherData,
            email,
            password: hashedPassword
        });

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

        if (req.body.password) {
            const saltRounds = 10;
            req.body.password = await bcrypt.hash(req.body.password, saltRounds);
        }

        const updatedUsr = await User.findByIdAndUpdate(idReq, req.body, {
            new: true
        });

        res.status(200).json({message: `Usuario actualizado correctamente!`});

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
        res.status(200).json({ message: `Usuario ${usrFound.name} eliminado exitosamente.`})

    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const userLogin = async(req, res) => {
    try {
        console.log('Login request received');
        console.log('Request body:', req.body);
        
        const { email, password } = req.body;

        if (!email || !password) {
            console.log('Missing email or password');
            return res.status(400).json({ 
                message: "Email y contraseña son requeridos.",
                details: {
                    email: !email ? "Email es requerido" : null,
                    password: !password ? "Contraseña es requerida" : null
                }
            });
        }

        const trimmedEmail = email.trim().toLowerCase();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedEmail)) {
            return res.status(400).json({ 
                message: "Formato de email inválido." 
            });
        }

        console.log('Looking for user with email:', trimmedEmail);
        const user = await User.findOne({ email: trimmedEmail });

        if (!user) {
            console.log('User not found');
            return res.status(401).json({ 
                message: "Credenciales inválidas.",
                hint: "Verifique su correo electrónico y contraseña."
            });
        }

        console.log('User found, checking password');
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            console.log('Password invalid');
            return res.status(401).json({ 
                message: "Credenciales inválidas.",
                hint: "Verifique su correo electrónico y contraseña."
            });
        }

        console.log('Login successful for user:', user.name);
        res.status(200).json({ 
            message: "Login exitoso.",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            errorMessage: "Error interno del servidor. Intente más tarde.",
            details: error.message 
        });
    }
}