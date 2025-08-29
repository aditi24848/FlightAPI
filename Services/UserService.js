const bcrypt = require('bcryptjs');
const users = require('../Model/User');

const addUser = async (name, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { name, email, password: hashedPassword };
    users.push(user);
    return user;
};

const findUserByEmail = (email) => {
    return users.find(u => u.email === email);
};

module.exports = { addUser, findUserByEmail };