window.onload = () => {
  const navButton = document.getElementById('positionsNav');
  navButton.classList.add('activePage');

  const clientInput = document.getElementById('client');
  const jobDescriptionInput = document.getElementById('jobDescription');
  const vacancyInput = document.getElementById('vacancy');
  const professionalProfilesInput = document.getElementById('professionalProfiles');
  const isOpenInput = document.getElementById('isOpen');

  //const form = document.getElementById('form');
  const saveButton = document.getElementById('saveButton');
  const errorMessage = document.getElementById('error_msg');

  const params = new URLSearchParams(window.location.search);
  saveButton.disable = !!params.get('positionId');

  const onFocusInput = () => {
    errorMessage.innerText = '';
  };

  clientInput.onfocus = onFocusInput;
  jobDescriptionInput.onfocus = onFocusInput;
  vacancyInput.onfocus = onFocusInput;
  professionalProfilesInput.onfocus = onFocusInput;
  isOpenInput.onfocus = onFocusInput;
};
