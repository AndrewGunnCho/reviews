const express = require('express');
const path = require('path');

const db = require(path.join('..', 'database', 'index.js'));

const PORT = 3000;
const app = express();

app.use(express.json());


app.get('/reviews/', (req, res) => {
  var params = Object.assign([], req.query.product_id);
  db.get(params, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

// app.get('/reviews/meta', (req,res) => {
//   var params = Object.assign([], req.query.product_id);
// })




app.listen(PORT, () => {
  console.log(`Make me suffer at port: ${PORT}`);
});