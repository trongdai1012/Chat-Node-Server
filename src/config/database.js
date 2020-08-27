require('dotenv').config();
module.exports={
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || '3306',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'daitt@12345',
    database: process.env.DB_DATABASE || 'node-start',
    dialect: 'mysql',
    logging: true,
    logging: console.log,
    pool: {max: 10, min: 0, idle: 1000}
}