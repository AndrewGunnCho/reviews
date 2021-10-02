const express = require('express');
const path = require('path');

const db = require(path.join('..', 'database', 'index.js'));

const PORT = 3000;
const app = express();

app.use(express.json());


app.get('/reviews/', (req, res) => {
  var params = [req.query.product_id];
  db.get(params, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

app.get('/reviews/meta', (req,res) => {
  var params = [req.query.product_id];
  db.getMeta(params, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data);
    }
  })
})

app.post('/reviews', (req,res) => {
  console.log(req.body)
  var params = [req.body.product_id, req.body.rating, new Date(), req.body.summary, req.body.body, req.body.recommend, req.body.name, req.body.email, req.body.photos, req.body.characteristics];
  console.log(params)
  // db.getMeta(params, (err, data) => {
  //   if (err) {
  //     res.send(err)
  //   } else {
  //     res.sendStatus(201);
  //   }
  // })
})




app.listen(PORT, () => {
  console.log(`Make me suffer at port: ${PORT}`);
});