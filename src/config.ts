import dotenv from 'dotenv'
dotenv.config()

export const SERVER_PORT: number = process.env.PORT ? +process.env.PORT : 3000
export const JWT_SECRET: string = process.env.JWT_SECRET ?? ''
export const TEST_USER_PASSWORD: string = process.env.TEST_USER_PASSWORD ?? 'password'
