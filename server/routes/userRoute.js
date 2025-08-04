import express from "express"

import { create } from "../controllers/UserController.js"

const route = express.Router();

route.post("/Users", create);

export default route;