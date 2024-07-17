import { pool } from './db'
import { User } from './interfaces'

export async function findUserByEmail(email: string): Promise<User | null> {
    try {
        const client = await pool.connect()
        const user: User = (await client.query(`SELECT * FROM users WHERE email = '${email}' LIMIT 1;`)).rows[0]

        return user;
    } catch (error: any) {
        console.log(error.code)
        console.log('Error getting the user: ', error.message)
        return null
    }
}