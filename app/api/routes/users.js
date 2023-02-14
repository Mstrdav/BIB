const db = require('../../../config/db');

// Retrieve all users from the database
const getAllUsers = (req, res) => {
  db.query('SELECT * FROM users', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json(results.rows);
    }
  });
};

// Retrieve a specific user by ID from the database
const getUserById = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    } else if (results.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json(results.rows[0]);
    }
  });
};

// Create a new user in the database
const createUser = (req, res) => {
  const { name, email, password } = req.body;
  db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, password], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(201).json(results.rows[0]);
    }
  });
};

// Update an existing user in the database
const updateUser = (req, res) => {
  const id = req.params.id;
  const { name, email, password } = req.body;
  db.query('UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *', [name, email, password, id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    } else if (results.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json(results.rows[0]);
    }
  });
};

// Delete an existing user from the database
const deleteUser = (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM users WHERE id = $1 RETURNING *', [id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    } else if (results.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(204).send();
    }
  });
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
