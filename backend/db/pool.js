import { Pool, types } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

//Prevent dates from being offset by timezone differences
types.setTypeParser(1082, val => val);

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
    family: 4,
});

export default pool;