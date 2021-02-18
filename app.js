const express = require('express')
const app = express()
const port = process.env.PORT || 80

const { Pool, Client } = require('pg')
const pool = new Pool({
    user: 'rmnqaevuviknpb',
    host: 'ec2-54-72-155-238.eu-west-1.compute.amazonaws.com',
    database: 'd31knv4ujdglor',
    password: '80c26307d9a840b7a7cecd4faa43a585a6265e5e10fcf4d31f3863c9eedfbb70',
    port: 5432,
    ssl: {
        rejectUnauthorized: false,

    },
})


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/lijst', (req, res) => {

    pool.query('SELECT * FROM LIJST', (err, res2) => {
        console.log(res2);
        res.send(JSON.stringify(res2.rows));
 })
})

app.listen(port, () => {
    console.log(`App Server luistert op poort ${port}`)
})