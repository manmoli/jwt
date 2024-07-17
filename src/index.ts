import express, { Request, Response } from 'express'
import { SERVER_PORT } from './config'
import { authenticateToken, login } from './auth'
import { initializeDatabase } from './db'

const app = express()

initializeDatabase().then(() => {
    app.listen(SERVER_PORT, () => {
        console.log('server listen  in port')
    })
})

app.use(express.json())
app.use(express.urlencoded())

app.post('/login', login)

app.post('/', authenticateToken, (request: Request, response: Response) => {
    response.send('Hello world')
})