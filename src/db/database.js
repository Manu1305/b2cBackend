const mongoose = require("mongoose")
const dotenv = require('dotenv').config()


const connectingLink = process.env.databaseurl

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`${connectingLink}`, {

        })
        console.log("mongodb connected ")

    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB;