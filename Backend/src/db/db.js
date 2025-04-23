import mongoose from "mongoose"
import config from "../config/config.js"




function connectToDb() {
    mongoose.connect(config.MONGO_URI).then(() => {
        console.log("Connected to MongoDB")
    })
        .catch((err) => {
            console.log("Error connecting to MongoDB", err)
        })
}

export default connectToDb;