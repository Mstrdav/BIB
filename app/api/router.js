const express = require('express');
const config = require('../../config/index');
const router = express.Router();

// retrieve all router functions
const getToken = require('./routes/u/getToken');

const getAllUsers = require('./routes/u/getAllUsers');
const getUserById = require('./routes/u/getUserById');
const createUser = require('./routes/u/createUser');
const updateUser = require('./routes/u/updateUser');
const deleteUser = require('./routes/u/deleteUser');

const getUserObjects = require('./routes/o/getUserObjects');

const getAllObjects = require('./routes/o/getAllObjects');
const getObjectById = require('./routes/o/getObjectById');
const createObject = require('./routes/o/createObject');
const updateObject = require('./routes/o/updateObject');
const deleteObject = require('./routes/o/deleteObject');

const getObjectComments = require('./routes/c/getObjectComments');
const createComment = require('./routes/c/createComment');
const updateComment = require('./routes/c/updateComment');
const deleteComment = require('./routes/c/deleteComment');

// Middleware for authentication
const verifyToken = require('./auth/verify');

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
router.get('/u/token', getToken);

router.get('/u', verifyToken, getAllUsers);
router.get('/u/:id', verifyToken, getUserById);
router.post('/u', createUser);
router.patch('/u/:id', verifyToken, updateUser);
router.delete('/u/:id', verifyToken, deleteUser);

router.get('/u/:id/o', verifyToken, getUserObjects);

// Objects
router.get('/o', verifyToken, getAllObjects);
router.get('/o/:id', verifyToken, getObjectById);
router.post('/o', verifyToken, createObject);
router.patch('/o/:id', verifyToken, updateObject);
router.delete('/o/:id', verifyToken, deleteObject);

// Comments
router.get('/o/:id/c', verifyToken, getObjectComments);
router.post('/o/:id/c', verifyToken, createComment);
router.patch('/o/:id/c/:id', verifyToken, updateComment);
router.delete('/o/:id/c/:id', verifyToken, deleteComment);

module.exports = router;
