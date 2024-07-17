import dotenv from 'dotenv'
dotenv.config()

export const SERVER_PORT: number = process.env.PORT ? +process.env.PORT : 3000
export const JWT_SECRET: string = process.env.JWT_SECRET ?? ''
export const TEST_USER_PASSWORD: string = process.env.TEST_USER_PASSWORD ?? 'password'
export const DB_HOST: string = process.env.DB_HOST ?? 'localhost'
export const DB_PORT: number = process.env.DB_PORT ? +process.env.DB_PORT : 5432
export const DB_USER: string = process.env.DB_USER ?? 'root'
export const DB_PASS: string = process.env.DB_PASS ?? 'root'
export const DB_NAME: string = process.env.DB_NAME ?? 'authentication_example'