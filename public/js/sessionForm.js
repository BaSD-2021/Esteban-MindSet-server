window.onload = () => {
  const navButton = document.getElementById('sessionsNav');
  navButton.classList.add('activePage');

  const postulantInput = document.getElementById('postulant');
  const psychologistInput = document.getElementById('psychologist');
  const statusInput = document.getElementById('status');
  const dateInput = document.getElementById('date');
  const notesInput = document.getElementById('notes');

  const form = document.getElementById('form');
  const saveButton = document.getElementById('saveButton');
  const errorMessage = document.getElementById('error_massage');

  const params = new URLSearchParams(window.location.search);
  saveButton.disabled = !!params.get('_id');

  const onFocusInput = () => {
    errorMessage.innerText = '';
  };

  postulantInput.onfocus = onFocusInput;
  psychologistInput.onfocus = onFocusInput;
  statusInput.onfocus = onFocusInput;
  dateInput.onfocus = onFocusInput;
  notesInput.onfocus = onFocusInput;

  if (params.get('_id')) {
    fetch(`${window.location.origin}/api/sessions?_id=${params.get('_id')}`)
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
          postulantInput.value = session.postulant;
          psychologistInput.value = session.psychologist;
          statusInput.value = session.status;
          dateInput.value = session.date;
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
        postulant: postulantInput.value,
        psychologist: psychologistInput.value,
        status: statusInput.value,
        date: dateInput.value,
        notes: notesInput.value,
      }),
    };

    if (params.get('clientId')) {
      options.method = 'PUT';
      url = `${window.location.origin}/api/sessions/${params.get('_id')}`;
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
        // eslint-disable-next-line no-underscore-dangle
        window.location.href = `${window.location.origin}/views/sessionList.html`;
      })
      .catch((error) => {
        errorMessage.innerText = error;
      })
      .finally(() => {
        saveButton.disabled = false;
      });
  };
};
