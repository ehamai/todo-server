const Pool = require('pg').Pool;
require('dotenv').config();

const connectionString = process.env.POSTGRES_POSTGRES_URL;
const pool = new Pool({
  connectionString
});

const getItems = (request, response) => {
  pool.query('SELECT * FROM TodoItems', (error, results) => {
    if (error) {
      console.log(error);
      return;
    }
    response.status(200).json(results.rows);
  });
};

const addItem = (request, response) => {
  const { description } = request.body;

  pool.query(
    'INSERT INTO TodoItems (Description) VALUES ($1) RETURNING *',
    [description],
    (error, results) => {
      if (error) {
        console.log(error);
        response.status(500).send(error.message);
        return;
      }
      response.status(201).send(results.rows[0]);
    }
  );
};

const deleteItem = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM TodoItems WHERE id = $1', [id], (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).send(error.message);
      return;
    }
    response.status(200).send();
  });
};

module.exports = {
  getItems,
  addItem,
  deleteItem,
};