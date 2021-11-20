window.onload = () => {
  const navButton = document.getElementById('sessionsNav');
  navButton.classList.add('activePage');

  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get('id');

  const dateInput = document.getElementById('date');
  const postulantInput = document.getElementById('postulant');

  const form = document.getElementById('form');
  const saveButton = document.getElementById('saveButton');
  const errorMessage = document.getElementById('error_massage');

  saveButton.disabled = !!sessionId;

  const onFocusInput = () => {
    errorMessage.innerText = '';
  };

  dateInput.onfocus = onFocusInput;
  postulantInput.onfocus = onFocusInput;

  // Get postulant list to fill postulant's select input
  fetch(`${window.location.origin}/api/postulants`)
    .then((response) => {
      if (response.status !== 200 && response.status !== 201) {
        return response.json().then(({ message }) => {
          throw new Error(message);
        });
      }
      return response.json();
    })
    .then((response) => {
      saveButton.disabled = false;
      response.data.forEach((postulant) => {
        // insert each postulant as a select option
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

  if (sessionId) {
    fetch(`${window.location.origin}/api/sessions?_id=${sessionId}`)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
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
          // eslint-disable-next-line no-underscore-dangle
          postulantInput.value = session.postulant ? session.postulant._id : undefined;
          // TODO: Complete Session object
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
        // TODO: Complete Session object
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
};
