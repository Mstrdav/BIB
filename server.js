const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const fs = require('fs');

const apiRouter = require('./app/api/router');

const PORT = process.env.PORT || 3000;

// Middleware
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
  console.log(`Press Ctrl+C to quit.`);

  // Connect to the database
  console.log('\n * Connecting to the database...');
  
  const db = require('./config/db');

  db.connect().catch(err => {
    console.error('Database is not yet setup.\nRestarting ontainer...'); // TODO: add a wait for or dockerize command to wait for the database to be ready

    // Exit the process
    process.exit(1);
  }).finally(() => {
    console.log('Connected to the database!');

    // Seeding the database
    console.log('\n * Seeding the database...');
    // seed is a sql file in ./seeders/tableDeclaration.sql
    const seed = fs.readFileSync('./seeders/tableDeclarations.sql').toString();
    db.query(seed, (err, res) => {
      if (err) {
        console.error('Unable to seed the database:');
        console.error(err);
      } else {
        console.log('Database seeded!');
      }
    });
  });
});
