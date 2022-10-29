const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'avito_ru',
    password: 'bekzodbek01',
    port: 5432,
});

client.connect((err) => {
    if (err) {
        console.log(`This is hato : ${err}`);
        throw err;
    };
    
    console.log(`Connected...`);
})


module.exports = client;



