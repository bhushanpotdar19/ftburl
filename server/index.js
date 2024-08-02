import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import { getSlugRedirect, postLink } from './controllers/link.js'
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

//Mongo_DB_connection
const dbConnection = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URL)

    if (conn) {
        console.log(`MongoDB Connected 🎉`)
    }
    else {
        console.log(`MongoDB Not Connected ❌`)
    }
}
dbConnection();


app.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "server is running"
    })
})

app.post("/link", postLink)

app.get("/:slug", getSlugRedirect)


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`server is running on port:${PORT}`)
})