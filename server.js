const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const { createHash } = require('crypto');
/**
 * Returns a SHA256 hash using SHA-3 for the given `content`.
 *
 * @see https://en.wikipedia.org/wiki/SHA-3
 *
 * @param {String} content
 *
 * @returns {String}
 */
const sha256 = (content) => createHash('sha3-256').update(content).digest('hex');

const fs = require('fs');

const apiRouter = require('./app/api/router');

const PORT = process.env.PORT || 3000;

const TEXTS = require("./locales/" + process.env.LANGUAGE + ".json");

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
  res.status(500).send(TEXTS.middleware.error);
});

// Start the server
app.listen(PORT, () => {
  console.log(TEXTS.server.listening_A + PORT + TEXTS.server.listening_B);

  // Connect to the database
  console.log(TEXTS.database.connecting);
  
  const db = require('./config/db');

  db.connect().catch(err => {
    console.error(TEXTS.database.notConfigured); // TODO: add a wait for or dockerize command to wait for the database to be ready

    // Exit the process
    process.exit(1);
  }).finally(() => {
    console.log(TEXTS.database.connected);

    // Seeding the database
    console.log(TEXTS.database.seeding.pending);
    // seed is a sql file in ./seeders/tableDeclaration.sql
    const seed = fs.readFileSync('./seeders/tableDeclarations.sql').toString();
    let adminUSer = fs.readFileSync('./seeders/adminUser.sql').toString().replace('password', sha256(process.env.ADMIN_PASSWORD || 'password'));
    
    console.log(TEXTS.database.seeding.tablesPending);
    db.query(seed, (err, res) => {
      if (err) {
        console.error(TEXTS.database.seeding.error);
        console.error(err);
      } else {
        console.log(TEXTS.database.seeding.tablesSuccess);
        console.log(TEXTS.database.seeding.adminPending);
        db.query(adminUSer, (err, res) => {
          if (err) {
            console.error(TEXTS.database.seeding.adminError);
            console.error(err);
          } else {
            console.log(TEXTS.database.seeding.adminSuccess);
          }
        });
        console.log(TEXTS.database.seeding.success);
      }
    });
  });
});
