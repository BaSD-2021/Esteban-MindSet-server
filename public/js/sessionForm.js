const navButton = document.getElementById('sessionsNav');
navButton.classList.add('activePage');

const params = new URLSearchParams(window.location.search);
const sessionId = params.get('_id');

const dateInput = document.getElementById('date');
const postulantInput = document.getElementById('postulant');
const psychologistInput = document.getElementById('psychologist');
const statusInput = document.getElementById('status');
const notesInput = document.getElementById('notes');

const form = document.getElementById('form');
const saveButton = document.getElementById('saveButton');
const errorMessage = document.getElementById('error_massage');

saveButton.disabled = !!sessionId;

const onFocusInput = () => {
  errorMessage.innerText = '';
};

dateInput.onfocus = onFocusInput;
postulantInput.onfocus = onFocusInput;

fetch(`${window.location.origin}/api/postulants`)
  .then((response) => {
    if (response.status !== 200) {
      return response.json().then(({ message }) => {
        throw new Error(message);
      });
    }
    return response.json();
  })
  .then((response) => {
    saveButton.disabled = false;
    response.data.forEach((postulant) => {
      const option = document.createElement('option');
      // eslint-disable-next-line no-underscore-dangle
      option.value = postulant._id;
      option.innerText = `${postulant.firstName} ${postulant.lastName}`;
      postulantInput.append(option);
    });
  })
  .catch((error) => {
    errorMessage.innerText = error;
  });

fetch(`${window.location.origin}/api/psychologists`)
  .then((response) => {
    if (response.status !== 200) {
      return response.json().then(({ message }) => {
        throw new Error(message);
      });
    }
    return response.json();
  })
  .then((response) => {
    saveButton.disabled = false;
    response.data.forEach((psychologist) => {
      const option = document.createElement('option');
      // eslint-disable-next-line no-underscore-dangle
      option.value = psychologist._id;
      option.innerText = `${psychologist.firstName} ${psychologist.lastName}`;
      psychologistInput.append(option);
    });
  })
  .catch((error) => {
    errorMessage.innerText = error;
  });

if (sessionId) {
  fetch(`${window.location.origin}/api/sessions?_id=${sessionId}`)
    .then((response) => {
      if (response.status !== 200) {
        return response.json().then(({ message }) => {
          throw new Error(message);
        });
      }
      return response.json();
    })
    .then((response) => {
      saveButton.disabled = false;
      response.data.forEach((session) => {
        dateInput.value = session.date;
        statusInput.value = session.status;
        // eslint-disable-next-line no-underscore-dangle
        postulantInput.value = session.postulant ? session.postulant._id : undefined;
        // eslint-disable-next-line no-underscore-dangle
        psychologistInput.value = session.psychologist ? session.psychologist._id : undefined;
        notesInput.value = session.notes;
      });
    })
    .catch((error) => {
      errorMessage.innerText = error;
    });
}

form.onsubmit = (event) => {
  event.preventDefault();
  saveButton.disabled = true;
  let url;
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      date: dateInput.value,
      postulant: postulantInput.value,
      psychologist: psychologistInput.value,
      status: statusInput.value,
      notes: notesInput.value,
    }),
  };

  if (sessionId) {
    options.method = 'PUT';
    url = `${window.location.origin}/api/sessions/${sessionId}`;
  } else {
    options.method = 'POST';
    url = `${window.location.origin}/api/sessions`;
  }

  fetch(url, options)
    .then((response) => {
      if (response.status !== 200 && response.status !== 201) {
        return response.json().then(({ message }) => {
          throw new Error(message);
        });
      }
      return response.json();
    })
    .then(() => {
      window.location.href = `${window.location.origin}/views/sessionList.html`;
    })
    .catch((error) => {
      errorMessage.innerText = error;
    })
    .finally(() => {
      saveButton.disabled = false;
    });
};
