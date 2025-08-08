import express from "express"

import { createUsr, getAllUsrs, getUsrById, updateUsr, deleteUsr, userLogin } from "../controllers/UserController.js"

const route = express.Router();

route.post("/createUsr", createUsr);
route.post("/login", userLogin);
route.get("/getAllUsrs", getAllUsrs);
route.get("/getUsrById/:id", getUsrById);
route.put("/updateUsr/:id", updateUsr);
route.delete("/deleteUsr/:id", deleteUsr);

export default route;