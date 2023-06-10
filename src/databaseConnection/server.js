const express = require('express')
const cors = require('cors');
const server = express();

server.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'department',
    password: 'shinlass3',
    port: 5432,
});

client.connect();

function getAll(name) {
    return new Promise((resolve, reject) => {
        client.query(`SELECT * FROM ${name}`, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res.rows);
            }
        });
    });
}

const tables = ['employee', 'producer', 'use', 'install', 'distributor', 'department', 'software', 'hardware'];

tables.forEach(table => {
    server.get(`/${table}`, async (request, response) => {
        let result = await getAll(table);
        response.send(result);
    });
});

server.listen(3001, 'localhost', () => {
    console.log("Server is running on port 3001")
});