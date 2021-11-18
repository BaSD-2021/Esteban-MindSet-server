window.onload = () => {
  const navButton = document.getElementById('clientsNav');
  navButton.classList.add('activePage');

  const nameInput = document.getElementById('name');
  const phoneInput = document.getElementById('phone');
  const logoInput = document.getElementById('logo');
  const addressInput = document.getElementById('address');
  const cityInput = document.getElementById('city');
  const countryInput = document.getElementById('country');
  const stateInput = document.getElementById('state');
  const descriptionInput = document.getElementById('description');

  const form = document.getElementById('form');
  const saveButton = document.getElementById('saveButton');
  const errorMessage = document.getElementById('error_massage');

  const params = new URLSearchParams(window.location.search);
  saveButton.disabled = !!params.get('clientId');

  const onFocusInput = () => {
    errorMessage.innerText = '';
  };

  nameInput.onfocus = onFocusInput;
  phoneInput.onfocus = onFocusInput;
  logoInput.onfocus = onFocusInput;
  addressInput.onfocus = onFocusInput;
  cityInput.onfocus = onFocusInput;
  countryInput.onfocus = onFocusInput;
  stateInput.onfocus = onFocusInput;
  descriptionInput.onfocus = onFocusInput;

  if (params.get('clientId')) {
    fetch(`${window.location.origin}/api/clients?_id=${params.get('clientId')}`)
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
        response.forEach((client) => {
          nameInput.value = client.name;
          phoneInput.value = client.phone;
          logoInput.value = client.logo;
          addressInput.value = client.location.address;
          cityInput.value = client.location.city;
          countryInput.value = client.location.country;
          stateInput.value = client.location.state;
          descriptionInput.value = client.description;
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
        phone: parseInt(phoneInput.value, 10),
        logo: logoInput.value,
        description: descriptionInput.value,
        location: {
          address: addressInput.value,
          city: cityInput.value,
          country: countryInput.value,
          state: stateInput.value,
        },
      }),
    };

    if (params.get('clientId')) {
      options.method = 'PUT';
      url = `${window.location.origin}/api/clients/${params.get('clientId')}`;
    } else {
      options.method = 'POST';
      url = `${window.location.origin}/api/clients`;
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
        window.location.href = `${window.location.origin}/views/clientList.html`;
      })
      .catch((error) => {
        errorMessage.innerText = error;
      })
      .finally(() => {
        saveButton.disabled = false;
      });
  };
};
