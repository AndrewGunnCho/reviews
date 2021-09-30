const express = require('express');
const path = require('path');

const db = require(path.join('..', 'database', 'index.js'));

const PORT = 3000;
const app = express();

app.use(express.json());



app.get('/:id', (req, res, next) => {
  db.get((err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})


app.listen(PORT, () => {
  console.log(`Make me suffer at port: ${PORT}`);
});