const fs = require('fs');
const admins = require('../data/admin.json');

//Get all admins

const getAdmins = (req, res) => {
    res.status(200).json(
        res.json(admins)
    )
}

module.exports = {
    getAdmins
};