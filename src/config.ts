import dotenv from 'dotenv';

dotenv.config();

const {
    PORT,
    NODE_ENV,
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_DB_TEST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    BCRYPT_PASSWORD,
    SALT_ROUNDS,
    TOKEN_SECRET,
    JWT_TOKEN
} = process.env;

export default {
    port: PORT,
    env: NODE_ENV,
    host: POSTGRES_HOST,
    db: POSTGRES_DB,
    db_test: POSTGRES_DB_TEST,
    db_user: POSTGRES_USER,
    db_password:POSTGRES_PASSWORD,
    pepper: BCRYPT_PASSWORD,
    salt_round: SALT_ROUNDS,
    token: TOKEN_SECRET,
    jwt: JWT_TOKEN
}