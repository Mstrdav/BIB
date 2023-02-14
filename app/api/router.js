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
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

router.get('/users/:id/objects', getUserObjects);

// Objects
router.get('/objects', getAllObjects);
router.get('/objects/:id', getObjectById);
router.post('/objects', createObject);
router.put('/objects/:id', updateObject);
router.delete('/objects/:id', deleteObject);

// Tags
router.get('/tags', getAllTags);
router.get('/tags/:id', getTagById);
router.post('/tags', createTag);
router.put('/tags/:id', updateTag);
router.delete('/tags/:id', deleteTag);

router.get('/tags/:id/objects', getTagObjects);

module.exports = router;
