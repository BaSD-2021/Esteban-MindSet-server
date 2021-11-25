const navButton = document.getElementById('clientsNav');
navButton.classList.add('activePage');

const params = new URLSearchParams(window.location.search);
const clientId = params.get('_id');

const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const countryInput = document.getElementById('country');
const stateInput = document.getElementById('state');
const cityInput = document.getElementById('city');
const addressInput = document.getElementById('address');
const logoInput = document.getElementById('logo');
const descriptionInput = document.getElementById('description');

const form = document.getElementById('form');
const saveButton = document.getElementById('saveButton');
const errorMessage = document.getElementById('error_msg');

saveButton.disable = !!clientId;

const onFocusInput = () => {
  errorMessage.innerText = '';
};

nameInput.onfocus = onFocusInput;
phoneInput.onfocus = onFocusInput;
countryInput.onfocus = onFocusInput;
stateInput.onfocus = onFocusInput;
cityInput.onfocus = onFocusInput;
addressInput.onfocus = onFocusInput;
logoInput.onfocus = onFocusInput;
descriptionInput.onfocus = onFocusInput;

if (clientId) {
  fetch(`${window.location.origin}/api/clients?_id=${clientId}`)
    .then((response) => {
      if (response.status !== 200) {
        return response.json()
          .then(({ message }) => {
            throw new Error(message);
          });
      }
      return response.json();
    })
    .then((response) => {
      saveButton.disabled = false;
      response.data.forEach((item) => {
        nameInput.value = item.name;
        phoneInput.value = item.phone;
        countryInput.value = item.location.country;
        stateInput.value = item.location.state;
        cityInput.value = item.location.city;
        addressInput.value = item.location.address;
        logoInput.value = item.logo;
        descriptionInput.value = item.description;
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
      location: {
        country: countryInput.value,
        state: stateInput.value,
        city: cityInput.value,
        address: addressInput.value,
      },
      logo: logoInput.value,
      description: descriptionInput.value,
    }),
  };

  if (clientId) {
    options.method = 'PUT';
    url = `${window.location.origin}/api/clients/${clientId}`;
  } else {
    options.method = 'POST';
    url = `${window.location.origin}/api/clients`;
  }

  fetch(url, options)
    .then((response) => {
      if (response.status !== 200 && response.status !== 201) {
        return response.json()
          .then(({ message }) => {
            throw new Error(message);
          });
      }
      return response.json();
    })
    .then(() => {
      window.location.href = `${window.location.origin}/views/clientList.html`;
    })
    .catch((error) => {
      errorMessage.innerText = error;
    })
    .finally(() => {
      saveButton.disabled = false;
    });
};
