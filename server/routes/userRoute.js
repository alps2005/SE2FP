import express from "express"

import { create, getAllUsers } from "../controllers/UserController.js"

const route = express.Router();

route.post("/User", create);
route.get("/Users", getAllUsers);

export default route;