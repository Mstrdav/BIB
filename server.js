const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const db = require('./config/db');
const apiRoutes = require('./app/api/routes');
const guiRoutes = require('./app/gui/routes');

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// API routes
app.use('/api', apiRoutes);

// GUI routes
app.use('/', guiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
db.authenticate()
  .then(() => {
    console.log('Connected to the database successfully!');
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}.`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
