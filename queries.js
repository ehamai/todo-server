const Pool = require('pg').Pool;
require('dotenv').config();

const connectionString = process.env.PGWEB_DATABASE_URL;
const pool = new Pool({
  connectionString
});

const getItems = (request, response) => {
  pool.query('SELECT * FROM TodoItems', (error, results) => {
    if (error) {
      throw error;
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
      response.status(500).send(error.message);
      return;
    }
    response.status(200).send();
  });
};


const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

module.exports = {
  getItems,
  addItem,
  deleteItem,
  updateUser,
};