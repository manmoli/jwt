import { Pool } from 'pg'
import bcrypt from 'bcrypt'
import { TEST_USER_PASSWORD } from './config'
 
export const pool = new Pool({
    user: 'root',
    database: 'authentication_example',
    password: 'root',
    port: 5434,
    host: 'localhost',
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
})

const createTableQuery = `
    CREATE TABLE users (
        id SERIAL PRIMARY KEY ,
        firstName VARCHAR(255),
        lastName VARCHAR(255),
        password VARCHAR(255),
        email VARCHAR(255)
    );
`

const insertTestUser = `
    INSERT INTO users(
        firstName,
        lastName,
        password,
        email) values (
        'manuel',
        'molina',
        '${bcrypt.hashSync(TEST_USER_PASSWORD, 1)}',
        'manuel.molina@somethingByTheWay.com'
        )
`

export async function initializeDatabase (): Promise<void> {
    const client = await pool.connect()
    try {
        await client.query(createTableQuery)
    } catch (error: any) {
        if(error.code === '42P07') {
            console.log('Table already exists')
        } else {
            client.release()
            throw error
        }
    }

    try {
        await client.query(insertTestUser)
    } catch (error: any) {
        if(error.code === '23505') {
            console.log('User already exists')
        } else {
            client.release()
            throw error
        }
    }
}



