import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    email: {
        type: String,
        required: true,
    },
    stateId: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: true
    }
})

export default mongoose.model("users", userSchema);