window.onload = () => {
  const navButton = document.getElementById('positionsNav');
  navButton.classList.add('activePage');

  const clientInput = document.getElementById('client');
  const jobDescriptionInput = document.getElementById('jobDescription');
  const vacancyInput = document.getElementById('vacancy');
  const professionalProfilesInput = document.getElementById('professionalProfiles');
  const isOpenInput = document.getElementById('isOpen');

  // const form = document.getElementById('form');
  const saveButton = document.getElementById('saveButton');
  const errorMessage = document.getElementById('error_msg');

  const params = new URLSearchParams(window.location.search);
  saveButton.disable = !!params.get('_id');

  const onFocusInput = () => {
    errorMessage.innerText = '';
  };

  clientInput.onfocus = onFocusInput;
  jobDescriptionInput.onfocus = onFocusInput;
  vacancyInput.onfocus = onFocusInput;
  professionalProfilesInput.onfocus = onFocusInput;
  isOpenInput.onfocus = onFocusInput;

  if (params.get('_id')) {
    fetch(`${window.location.origin}/api/positions?_id=${params.get('_id')}`)
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
          clientInput.value = position.client;
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
};
