const fs = require('fs');
const admins = require('../data/admins.json');

//Get all admins

const getAdmins = (req, res) => {
    res.status(200).json(
        res.json(admins)
    )
}

//Update an admin

const updateAdmin = (req, res) => {
    const found = admins.some(admin => admin.id === parseInt(req.params.id));

    if (found){
        admins.forEach(admin => {
            if (admin.id === parseInt(req.params.id)){
                !req.query.email ? null : admin.email = req.query.email;
                !req.query.password ? null : admin.password = req.query.password;
                !req.query.name ? null : admin.name = req.query.name;
            }   
        })
    }   else{
        res.status(400).json({msg: `Admin with id: ${req.params.id} was not found`})
    }

    fs.writeFile('./data/admin.json', JSON.stringify(admins), {}, (error) => {
        if (error){
            res.status(400).send(error)
        }   else{
            res.status(200).json({msg: 'Admin updated', admins})
        }
    })
}
    
module.exports = {
    getAdmins,
    updateAdmin,
};