import { Pool } from 'pg'
import bcrypt from 'bcrypt'
import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER, TEST_USER_PASSWORD } from './config'
console.log(DB_USER)
console.log(DB_NAME)
console.log(DB_PASS)
console.log(DB_PORT)
console.log(DB_HOST)
export const pool = new Pool({
    user: DB_USER,
    database: DB_NAME,
    password: DB_PASS,
    port: DB_PORT,
    host: DB_HOST,
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

export async function initializeDatabase(): Promise<void> {
    const client = await pool.connect()
    try {
        await client.query(createTableQuery)
    } catch (error: any) {
        if (error.code === '42P07') {
            console.log('Table already exists')
        } else {
            client.release()
            throw error
        }
    }

    try {
        await client.query(insertTestUser)
    } catch (error: any) {
        if (error.code === '23505') {
            console.log('User already exists')
        } else {
            client.release()
            throw error
        }
    }
}



