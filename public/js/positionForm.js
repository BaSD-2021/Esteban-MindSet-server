window.onload = () => {
  const navButton = document.getElementById('positionsNav');
  navButton.classList.add('activePage');

  const params = new URLSearchParams(window.location.search);
  const positionId = params.get('_id');

  const clientInput = document.getElementById('client');
  const jobDescriptionInput = document.getElementById('jobDescription');
  const vacancyInput = document.getElementById('vacancy');
  const professionalProfilesInput = document.getElementById('professionalProfiles');
  const isOpenInput = document.getElementById('isOpen');

  const form = document.getElementById('form');
  const saveButton = document.getElementById('saveButton');
  const errorMessage = document.getElementById('error_msg');

  saveButton.disable = !!params.get('_id');

  const onFocusInput = () => {
    errorMessage.innerText = '';
  };

  clientInput.onfocus = onFocusInput;
  jobDescriptionInput.onfocus = onFocusInput;
  vacancyInput.onfocus = onFocusInput;
  professionalProfilesInput.onfocus = onFocusInput;
  isOpenInput.onfocus = onFocusInput;

  if (positionId) {
    fetch(`${window.location.origin}/api/positions?_id=${positionId}`)
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
        response.data.forEach((position) => {
          clientInput.value = position.client.name;
          jobDescriptionInput.value = position.jobDescription;
          vacancyInput.value = position.vacancy;
          professionalProfilesInput.value = position.professionalProfiles;
          isOpenInput.value = position.isOpen;
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
        client: clientInput.value,
        jobDescription: jobDescriptionInput.value,
        vacancy: vacancyInput.value,
        professionalProfiles: professionalProfilesInput.value,
        isOpen: isOpenInput.value,
      }),
    };

    if (positionId) {
      options.method = 'PUT';
      url = `${window.location.origin}/api/positions/${positionId}`;
    } else {
      options.method = 'POST';
      url = `${window.location.origin}/api/positions`;
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
        window.location.href = `${window.location.origin}/views/positionList.html`;
      })
      .catch((error) => {
        errorMessage.innerText = error;
      })
      .finally(() => {
        saveButton.disabled = false;
      });
  };
};
