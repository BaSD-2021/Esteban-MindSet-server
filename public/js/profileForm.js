window.onload = () => {
  const navButton = document.getElementById('profilesNav');
  navButton.classList.add('activePage');

  const params = new URLSearchParams(window.location.search);
  const paramsId = params.get('profileId');
  const nameInput = document.getElementById('name');
  const form = document.getElementById('form');
  const saveButton = document.getElementById('saveButton');
  const errorMessage = document.getElementById('error_massage');

  saveButton.disabled = !!paramsId;

  const onFocusInput = () => {
    errorMessage.innerText = '';
  };

  nameInput.onfocus = onFocusInput;

  if (paramsId) {
    fetch(`${window.location.origin}/api/profiles?_id=${paramsId}`)
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
        response.data.forEach((profile) => {
          nameInput.value = profile.name;
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
        name: nameInput.value,
      }),
    };

    if (paramsId) {
      options.method = 'PUT';
      url = `${window.location.origin}/api/profiles/${paramsId}`;
    } else {
      options.method = 'POST';
      url = `${window.location.origin}/api/profiles`;
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
        window.location.href = `${window.location.origin}/views/profileList.html`;
      })
      .catch((error) => {
        errorMessage.innerText = error;
      })
      .finally(() => {
        saveButton.disabled = false;
      });
  };

  nameInput.onblur = () => {
    saveButton.disabled = false;
    if (!Number.isNaN(parseFloat(nameInput.value))) {
      saveButton.disabled = true;
      document.getElementById('name-error').classList.remove('name-error-message');
      document.getElementById('name-error').classList.add('error-visibility-show');
    }
  };

  nameInput.onfocus = () => {
    document.getElementById('name-error').classList.add('name-error-message');
  };
};
