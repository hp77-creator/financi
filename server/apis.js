//dependencies
const db = require('./queries')
const express = require('express')

const { request } = require('http')
const { countReset } = require('console')
const dotenv = require('dotenv')
dotenv.config()
const app = express()
var bodyParser = require('body-parser');

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


  
// PORT
const port = process.env.REST_PORT || 8000

app.get('/', (req, res) => {
    res.send('This is an Node.js REST API example using node-postres driver')
})

app.options('')
app.post('/api/customers',db.createCustomer)
app.get('/api/customers/:id', db.getCustomerById)
app.get('/api/tags', db.getAllPublicTags)
//app.put('/api/customers/:id', db.updateCustomer)
//app.delete('/api/customers/:id', db.deleteCustomer)
//app.get('/api/customers', db.getCustomers)
app.listen(port, () => console.log(`Listening on port ${port}`))