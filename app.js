const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

const db = require('./queries');
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/items', db.getItems);
app.post('/items', db.addItem);
app.delete('/items/:id', db.deleteItem);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})