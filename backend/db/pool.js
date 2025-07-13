import { Pool, types } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

//Prevent dates from being offset by timezone differences
types.setTypeParser(1082, val => val);

const pool = new Pool({
    host: process.env.HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE,
    password: process.env.DATABASE_PASSWORD,
    port: Number(process.env.DATABASE_PORT)
});

export default pool;