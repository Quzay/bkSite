const { Client } = require('pg');  
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'sitedb',  
  password: 'Maksym2008',  
  port: 5432,
});

client.connect()
  .then(() => console.log('Connected to database'))
  .catch(err => console.error('Connection error', err.stack));

module.exports = client;