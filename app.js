const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var cors = require('cors');
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

app.use(cors())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.get('/lijst', (req, res) => {

    pool.query('SELECT * FROM LIJST', (err, res2) => {
        console.log(res2);
        res.send(JSON.stringify(res2.rows));
 })
})

app.get('/frituursnacks', (req, res) => {

    pool.query('SELECT * FROM frituursnacks', (err, res2) => {
        console.log(res2);
        res.send(JSON.stringify(res2.rows));
 })
})

app.listen(port, () => {
    console.log(`App Server luistert op poort ${port}`)
})

app.post('/frituursnacks/nieuw', (req, res3) =>{
  console.log(req.body);
  let naam = req.body.naam;
  let tijd = req.body.frituurtijd;
  let veg = req.body.vegetarisch;
  pool.query('INSERT INTO frituursnacks(naam,frituurtijd,vegetarisch) VALUES ($1, $2, $3)',[ naam, tijd, veg], (error, results) => {
    if (error) {
      throw error
    }
    })
    res3.send("stop")
})
    