const navButton = document.getElementById('interviewsNav');
navButton.classList.add('activePage');

const params = new URLSearchParams(window.location.search);
const interviewId = params.get('_id');

const postulantNameInput = document.getElementById('postulantName');
const clientNameInput = document.getElementById('clientName');
const statusInput = document.getElementById('status');
const applicationInput = document.getElementById('applicationId');
const dateInput = document.getElementById('date');
const notesInput = document.getElementById('notes');

const form = document.getElementById('form');
const saveButton = document.getElementById('saveButton');
const errorMessage = document.getElementById('error_massage');

saveButton.disabled = !!interviewId;

const onFocusInput = () => {
  errorMessage.innerText = '';
};

postulantNameInput.onfocus = onFocusInput;
clientNameInput.onfocus = onFocusInput;
applicationInput.onfocus = onFocusInput;
dateInput.onfocus = onFocusInput;
statusInput.onfocus = onFocusInput;
dateInput.onfocus = onFocusInput;
notesInput.onfocus = onFocusInput;

const fillSelect = (url, parent, makeText) => {
  fetch(`${window.location.origin}/api${url}`)
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
      response.data.forEach((el) => {
        const option = document.createElement('option');
        // eslint-disable-next-line no-underscore-dangle
        option.value = el._id;
        option.innerText = makeText(el);
        parent.append(option);
      });
    })
    .catch((error) => {
      errorMessage.innerText = error;
    });
};
fillSelect('/postulants', postulantNameInput, (el) => `${el.firstName} ${el.lastName}`);
fillSelect('/clients', clientNameInput, (el) => el.name);
// eslint-disable-next-line no-underscore-dangle
fillSelect('/applications', applicationInput, (el) => el._id);

const statusValues = ['successful', 'failed', 'cancelled', 'assigned', 'confirmed'];

// eslint-disable-next-line no-plusplus
for (let i = 0; i < statusValues.length; i++) {
  const option = document.createElement('option');
  // eslint-disable-next-line no-underscore-dangle
  option.value = statusValues[i];
  option.innerText = statusValues[i];
  statusInput.append(option);
}

if (interviewId) {
  fetch(`${window.location.origin}/api/interviews?_id=${interviewId}`)
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
      response.data.forEach((interview) => {
        dateInput.value = interview.date.substring(0, interview.date.length - 1);
        statusInput.value = interview.status;
        // eslint-disable-next-line no-underscore-dangle
        postulantNameInput.value = `${interview.postulant.firstName} ${interview.postulant.lastName}`;
        // eslint-disable-next-line no-underscore-dangle
        postulantNameInput.option = interview.postulant._id;
        // eslint-disable-next-line no-underscore-dangle
        clientNameInput.value = interview.client.name;
        // eslint-disable-next-line no-underscore-dangle
        clientNameInput.option = interview.client._id;
        // eslint-disable-next-line no-underscore-dangle
        applicationInput.value = interview.application._id;
        notesInput.value = interview.notes;
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
      'Content-Type': 'interview/json',
    },
    body: JSON.stringify({
      postulant: postulantNameInput.option,
      client: clientNameInput.option,
      application: applicationInput.value,
      status: statusInput.value,
      date: dateInput.value,
      notes: notesInput.value,
    }),
  };

  if (interviewId) {
    options.method = 'PUT';
    url = `${window.location.origin}/api/interviews/${interviewId}`;
  } else {
    options.method = 'POST';
    url = `${window.location.origin}/api/interviews`;
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
      window.location.href = `${window.location.origin}/views/interviewList.html`;
    })
    .catch((error) => {
      errorMessage.innerText = error;
    })
    .finally(() => {
      saveButton.disabled = false;
    });
};
