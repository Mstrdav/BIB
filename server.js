const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const apiRouter = require('./app/api/router');

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Mount the API router at the /api endpoint
app.use('/api', apiRouter);

// Serve static files for the GUI
app.use(express.static('app/gui/public'));

// Redirect all other requests to the GUI
app.get('*', (req, res) => {
  res.sendFile('app/gui/views/index.html', { root: '.' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
