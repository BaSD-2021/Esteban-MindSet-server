window.onload = () => {
  const navButton = document.getElementById('profilesNav');
  navButton.classList.add('activePage');

  const nameInput = document.getElementById('name');

  const form = document.getElementById('form');
  const saveButton = document.getElementById('saveButton');
  const errorMessage = document.getElementById('error_massage');

  const params = new URLSearchParams(window.location.search);
  saveButton.disabled = !!params.get('ProfileId');

  const onFocusInput = () => {
    errorMessage.innerText = '';
  };

  nameInput.onfocus = onFocusInput;

  if (params.get('profileId')) {
    fetch(`${window.location.origin}/api/profiles?_id=${params.get('profileId')}`)
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

    if (params.get('profileId')) {
      options.method = 'PUT';
      url = `${window.location.origin}/api/profiles/${params.get('profileId')}`;
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
        // eslint-disable-next-line no-underscore-dangle
        window.location.href = `${window.location.origin}/views/profileList.html`;
      })
      .catch((error) => {
        errorMessage.innerText = error;
      })
      .finally(() => {
        saveButton.disabled = false;
      });
  };
};
