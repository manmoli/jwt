import { NextFunction, Request, Response } from 'express'
import jwt  from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from './interfaces'
import { findUserByEmail } from './services'
import { JWT_SECRET } from './config'

export async function login(request: Request<{ email: string, password: string }>, response: Response) {
    const { email, password } = request.body

    const user: User | null = await findUserByEmail(email)

    if (user && bcrypt.compareSync(password, user.password)) {
        const token: string = jwt.sign({ userId: user.id }, String(JWT_SECRET), { expiresIn: '1h' })

        response.status(200).json({ token })
    } else {

        response.status(401).send('Invalid Credentials')
    }
}

export async function authenticateToken(request: Request<any>, response: Response, next: NextFunction) {
    const token: string | undefined = request.headers.authorization;

    if (!token) {
        response.sendStatus(403)
    }

    try {

        const decoded = jwt.verify(token!, JWT_SECRET)
        request.user = decoded

        next()
    } catch (error) {
        response.sendStatus(401)
    }

}
