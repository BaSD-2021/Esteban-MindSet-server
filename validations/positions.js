const required = (req, res, next) => {
    if(!req.body.idClient){
        return res.status(400).send('You must complete the idClient');
    }
    if(!req.body.professionalProfiles){
        return res.status(400).send('You must complete at least one proffesional profile');
    }
    if(!req.body.isOpen){
        return res.status(400).send('You must Indicate if the position is open or close');
    }
    next()
}

module.exports = {
    required, 
};