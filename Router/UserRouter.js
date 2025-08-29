const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { addUser, findUserByEmail } = require('../Services/UserService');

const router = express.Router();
const JWT_SECRET = 'your_jwt_secret'; 

router.post('/signup', async (req, res) => {
    const { name , email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields required' });
    }
    if (findUserByEmail(email)) {
        return res.status(409).json({ message: 'User already exists' });
    }
    await addUser(name, email, password);
    res.status(201).json({ message: 'User registered successfully' });
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = findUserByEmail(email);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '30m' });
    res.status(200).json({ token });
});

module.exports = router;
