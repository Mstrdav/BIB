const express = require('express');
const config = require('../../config/index');
const router = express.Router();

// retrieve all router functions
const getAllUsers = require('./routes/u/getAllUsers');
const getUserById = require('./routes/u/getUserById');
const createUser = require('./routes/u/createUser');
const updateUser = require('./routes/u/updateUser');
const deleteUser = require('./routes/u/deleteUser');

const getUserObjects = require('./routes/u/getUserObjects');

const getAllObjects = require('./routes/o/getAllObjects');
const getObjectById = require('./routes/o/getObjectById');
const createObject = require('./routes/o/createObject');
const updateObject = require('./routes/o/updateObject');
const deleteObject = require('./routes/o/deleteObject');

const getObjectComments = require('./routes/c/getObjectComments');
const createComment = require('./routes/c/createComment');
const updateComment = require('./routes/c/updateComment');
const deleteComment = require('./routes/c/deleteComment');

// Main route
router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the API'
    });
});

// Status
router.get('/status', (req, res) => {
    res.status(200).json({
        status: 'OK'
    });
});

// Instance
router.get('/instance', (req, res) => {
    res.status(200).json({
        instance: config.instance,
        version: config.version,
        software: config.software,
        contact: config.contact,
        description: config.description,
    });
});

// Users
router.get('/u', getAllUsers);
router.get('/u/:id', getUserById);
router.post('/u', createUser);
router.patch('/u/:id', updateUser);
router.delete('/u/:id', deleteUser);

router.get('/u/:id/o', getUserObjects);

// Objects
router.get('/o', getAllObjects);
router.get('/o/:id', getObjectById);
router.post('/o', createObject);
router.patch('/o/:id', updateObject);
router.delete('/o/:id', deleteObject);

// Comments
router.get('/o/:id/c', getObjectComments);
router.post('/o/:id/c', createComment);
router.patch('/o/:id/c/:id', updateComment);
router.delete('/o/:id/c/:id', deleteComment);

module.exports = router;
