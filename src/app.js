import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser'


const app = express();

// app.use() is used to add middleware or to do configrations that runs for every request (or for a specific path).
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"})) // to accept json...

// express.urlencoded is used to parse(read) the Encoded URL. (name=Saad%20Akhtar&city=Lahore)
app.use(express.urlencoded({extended: true, limit: "16kb"})) 

/* With express.static we can make a public folder like to store photos, videos, logos which anyone can access
express.static() is a built-in Express middleware that serves static files directly to clients.
http://localhost:3000/images/logo.png
http://localhost:3000/videos/intro.mp4  */
app.use(express.static("public"))

// cookie-parser is Express middleware used to read (parse) cookies sent by the client's browser.
// It makes the cookies available in req.cookies.
app.use(cookieParser())


// Routes Import 
import userRouter from './routes/user.routes.js'


// Routes Declaration
app.use("/api/v1/users", userRouter)

// http://localhost:8000/api/v1/users/register

export { app }