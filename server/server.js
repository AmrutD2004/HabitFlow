import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config'

import { connectDB } from './database/database.js'
import router from './router/routes.js'

import notificationRouter from './router/notificationRoutes.js'
import { startReminder } from './config/reminderCron.js'

const app = express()
const PORT = process.env.PORT || 3000

const allOrigin = ['http://localhost:5173']

app.use(express.json())
app.use(cookieParser())
app.use(cors({origin : allOrigin, credentials : true}))
app.get('/', (req, res)=>{
    res.send('hello')
})

app.use('/user', router)
app.use('/habit', router)
app.use('/notification', notificationRouter)

connectDB().then(()=>{
    app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
    startReminder()
})
})