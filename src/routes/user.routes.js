const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// User Model
let User = [
    {"id":"1", "firstName": "Pedro", "lastName": "Perez", "email": "pedro@gmail.com", "phone": 1234},
    {"id":"2", "firstName": "Juan", "lastName": "Gil", "email": "juan@gmail.com", "phone": 1234},
    {"id":"3", "firstName": "Maria", "lastName": "Lopez", "email": "maria@gmail.com", "phone": 1234},
]

// GET all Users
router.get('/', (req, res) => {
    const users = User;
    res.json(users);
});

// GET all Users
router.get('/:id', (req, res) => {
    const user = User.find(user => user.id == req.params.id);
    res.json(user);
});

// ADD a new user
router.post('/', (req, res) => {
    const { firstName, lastName, email, phone } = req.body;
    const id = uuidv4();
    User.push({id, firstName, lastName, email, phone})
    res.json({status: 'User Saved'});
});

// UPDATE a new user
router.put('/:id', (req, res) => {
    const { firstName, lastName, email, phone } = req.body;
    User = User.filter((user) => user.id != req.params.id)
    User.push({id: req.params.id, firstName, lastName, email, phone})
    res.json({status: 'User Updated'});
});

router.delete('/:id', (req, res) => {
    User = User.filter((user) => {
        return user.id != req.params.id;
    });
    res.json({status: 'User Deleted'});
});

module.exports = router;
