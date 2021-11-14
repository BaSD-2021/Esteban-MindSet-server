const fs = require('fs');
const Postulants = require('../models/Postulants');

const listPostulants = (req, res) => {
  Postulants.find()
    .then((postulants) => {
      res.status(200).json(postulants);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

const createPostulant = (req, res) => {
  const bodyReq = req.body;
  const postulant = new Postulants({
    first_name: bodyReq.first_name,
    last_name: bodyReq.last_name,
    email: bodyReq.email,
    password: bodyReq.password,
    contactRange: bodyReq.contactRange,
    address: bodyReq.address,
    birthday: bodyReq.birthday,
    available: bodyReq.available,
    phone: bodyReq.phone,
    profiles: bodyReq.profiles,
    studies: bodyReq.studies,
    workExperience: bodyReq.workExperience,
  });

  postulant.save(((error) => {
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(201).json(postulant);
  }));
};

const deletePostulant = (req, res) => {
  Postulants.findByIdAndDelete(req.params.id, (error, pointedPostulant) => {
    if (!pointedPostulant) {
      return res.status(404).json('Postulant id does not exist');
    }
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(204).send();
  });
};

const updatePostulants = (req, res) => {
  const params = req.query;
  let updatedPostulant;

  const updatedPostulants = Postulants.map((postulant) => {
    if (postulant.id === params.id) {
      updatedPostulant = {
        id: params.id,
        first_name: params.first_name,
        last_name: params.last_name,
        email: params.email,
        phone: params.phone,
        address: params.address,
        birthday: params.birthday,
        password: params.password,
        primary_studies: {
          date: {
            start_date: params.start_date,
            end_date: params.end_date,
          },
          school: params.school,
        },
        secondary_studies: {
          date: {
            start_date: params.start_date,
            end_date: params.end_date,
          },
          school: params.school,
        },
        tertiary_studies: {
          date: {
            start_date: params.start_date,
            end_date: params.end_date,
          },
          institute: params.institute,
        },
        university_studies: {
          date: {
            start_date: params.start_date,
            end_date: params.end_date,
          },
          university: params.university,
        },
        work_experience: [{
          company: params.company,
          date: {
            start_date: params.start_date,
            end_date: params.end_date,
          },
          description: params.description,
        }],
        course: [{
          institute: params.institute,
          date: {
            start_date: params.start_date,
            end_date: params.end_date,
          },
          description: params.description,
        }],
        about: {
          date: {
            start_date: params.start_date,
            end_date: params.end_date,
          },
          description: params.description,
        },
        available: params.available,
      };
      return updatedPostulant;
    }
    return postulant;
  });

  if (!updatedPostulant) {
    return res.status(404).send('postulant not found');
  }
  if (JSON.stringify(updatedPostulants) === JSON.stringify(Psychologists)) {
    return res.status(200).send('postulant found, but no changes made');
  }

  fs.writeFile('./data/postulants.json', JSON.stringify(updatedPostulants), {}, (err) => {
    if (error) {
      res.status(400).send(error);
    }
  });
  res.send(updatedPostulants);
};

module.exports = {
  listPostulants,
  createPostulant,
  deletePostulant,
  updatePostulants,
};
