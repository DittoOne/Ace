require('dotenv').config();

const databaseURL = `postgresql://${encodeURIComponent(process.env.DB_USER)}:`+
`${encodeURIComponent(process.env.DB_PASSWORD)}@`+
`${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`; 

module.exports = {
    url: databaseURL,
};