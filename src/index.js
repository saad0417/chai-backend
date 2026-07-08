// require('dotenv').config({path: "./env"})

import connectDB from "./db/index.js";
import dotenv from 'dotenv'

dotenv.config({path: './env'})


connectDB();










/*
import express from 'express'

const app = express()

// IFFE
;( async () => {
    try 
    {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`)    
        app.on("error", (error) => {
            console.log("ERRR", error);
            throw error;
        })

        app.listen(process.env.PORT, () => {
            console.log(`app is listening on port ${process.env.PORT}`);
        })
    } 
    catch (error) 
    {
        console.error("Error", error);
        throw error;
    }
})()  */