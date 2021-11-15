const fs = require('fs');
const Postulants = require('../data/postulants.json');

const getPostulants = (req, res) => {
  res.status(200).json(Postulants);
};

const createPostulant = (req, res) => {
  const params = req.query;
  const newPostulant = {
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

  Postulants.push(newPostulant);

  fs.writeFile('./data/postulants.json', JSON.stringify(Postulants), {}, (error) => {
    if (error) {
      res.status(400).send(error);
    }
    return res.status(201).json(newPostulant);
  });
};

const deletePostulant = (req, res) => {
  const params = req.query;
  const filteredPostulants = Postulants.filter((postulant) => postulant.id !== params.id);

  if (JSON.stringify(filteredPostulants) === JSON.stringify(Postulants)) {
    return res.status(404).send('postulant not found');
  }

  fs.writeFile('./data/postulants.json', JSON.stringify(filteredPostulants), {}, (error) => {
    if (error) {
      res.status(400).send(error);
    }
    return res.status(204).json(filteredPostulants);
  });
  return 'fixing eslint error';
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
  if (JSON.stringify(updatedPostulants) === JSON.stringify(Postulants)) {
    return res.status(200).send('postulant found, but no changes made');
  }

  fs.writeFile('./data/postulants.json', JSON.stringify(updatedPostulants), {}, (error) => {
    if (error) {
      res.status(400).send(error);
    }
  });
  res.send(updatedPostulants);
  return 'fixing eslint error';
};

module.exports = {
  getPostulants,
  createPostulant,
  deletePostulant,
  updatePostulants,
};
