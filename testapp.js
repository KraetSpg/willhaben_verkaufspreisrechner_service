const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const willhaben = require('willhaben');

let allowedOrigins = ['*']; // INSERT RIGHT DOMAIN HERE

app.use(express.json());

app.get('/', (req, res) => {
    willhaben.new()
    .category(willhaben.getCategories["immobilien"])
    .count(100)
    .search().then(json => {
        res.header("Access-Control-Allow-Origin", allowedOrigins);
        res.send(json)
    })
})

app.listen(port, () => {
    console.log(`App is listening http://localhost:${port}`)
  })