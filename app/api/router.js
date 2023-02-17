const express = require('express');
const config = require('../../config/index');
const router = express.Router();
// const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('./routes/users');

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
