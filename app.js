const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const willhaben = require('willhaben');

// Dashboard: https://app.koyeb.com/services/42a3e2b7-3496-45ca-b0c9-2e810d09bef0?deploymentId=db9c4347-0184-43e1-beeb-5b6aa65622f0
// Deployment Link: https://independent-otha-kraetsoranisation-bb6455f7.koyeb.app/

/*
  - Since this got a bit complicated to my future self here is how it works:
  Condition can be alle or specified
  Searchtext can be none or specified
  Category has to be specified

  then im building a request with the willhaben module based on these factors

  this has to be improved in the future
*/

app.get('/api/:category/:condition/:searchtext', (req, res) => {
  let allowedOrigins = ['*']; // INSERT RIGHT DOMAIN HERE

  if (req.params.searchtext == "none") { // if no searchtext is entered
    if (req.params.condition == "alle") { // if no condition is selected
      willhaben.new()
        .category(willhaben.getCategories[req.params.category])
        .count(100)
        .search().then(json => {
          res.header("Access-Control-Allow-Origin", allowedOrigins);
          res.send(json)
        })
    } else {
      willhaben.new()
        .category(willhaben.getCategories[req.params.category])
        .condition(willhaben.getConditions[req.params.condition])
        .count(100)
        .search().then(json => {
          res.header("Access-Control-Allow-Origin", allowedOrigins);
          res.send(json)
        })
    }
  } else { // searchstring is selected
    if (req.params.condition == "alle") {
      willhaben.new()
        .category(willhaben.getCategories[req.params.category])
        .keyword(req.params.searchtext)
        .count(100)
        .search().then(json => {
          res.header("Access-Control-Allow-Origin", allowedOrigins);
          res.send(json)
        })
    } else { // with condition
      willhaben.new()
        .category(willhaben.getCategories[req.params.category])
        .keyword(req.params.searchtext)
        .condition(willhaben.getConditions[req.params.condition])
        .count(100)
        .search().then(json => {
          res.header("Access-Control-Allow-Origin", allowedOrigins);
          res.send(json)
        })
    }
  }
})

app.listen(port, () => {
  console.log(`App is listening http://localhost:${port}`)
})