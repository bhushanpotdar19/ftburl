import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import { getSlugRedirect, postLink, getLinks } from './controllers/link.js'
import { postLogin, postSignUp } from './controllers/user.js'
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
app.get("/links", getLinks)
app.post("/link", postLink)

app.get("/:slug", getSlugRedirect)
app.post("/user",postSignUp)
app.post("/login",postLogin)





const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`server is running on port:${PORT}`)
})