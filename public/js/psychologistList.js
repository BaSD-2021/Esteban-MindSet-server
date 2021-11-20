const openEditPsychologistForm = (psychologist) => {
  // eslint-disable-next-line no-underscore-dangle
  window.location.href = `${window.location.origin}/views/psychologistForm.html?psychologistId=${psychologist._id}`;
};

const openNewPsychologistForm = () => {
  // eslint-disable-next-line no-underscore-dangle
  window.location.href = `${window.location.origin}/views/psychologistForm.html`;
};

window.onload = () => {
  const navButton = document.getElementById('psychologistNav');
  const tableContent = document.getElementById('table-content');
  const addPsychologistButton = document.getElementById('addPsychologists');

  // MODAL SETTINGS
  const modalSection = document.getElementById('modal-section');
  const openModal = () => {
    modalSection.classList.add('modal-section-display-on');
  };

  const closeModal = (e) => {
    if (e.target === modalSection) {
      modalSection.classList.remove('modal-section-display-on');
      modalSection.classList.add('modal-display-off');
    }
  };

  window.addEventListener('click', closeModal);
  const modalCloseBtn = document.getElementById('modal-close-button');
  modalCloseBtn.onclick = () => {
    modalSection.classList.remove('modal-section-display-on');
    modalSection.classList.add('modal-display-off');
  };
  // END MODAL SETTING

  const deletePsychologist = (id, firstName, lastName, event) => {
    event.stopPropagation();
    document.getElementById('modal-title').innerText = 'You are about to delete a Profile:';
    document.getElementById('modal-data-inputs').innerText = `Psychologist: ${firstName} ${lastName}`;
    openModal();
    document.getElementById('cancel-button').onclick = () => {
      modalSection.classList.remove('modal-section-display-on');
      modalSection.classList.add('modal-display-off');
    };
    document.getElementById('procced-button').onclick = () => {
      const url = `${window.location.origin}/api/psychologists/${id}`;
      fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then(window.location.reload())
        .catch((error) => error);
    };
  };

  addPsychologistButton.onclick = openNewPsychologistForm;
  navButton.classList.add('activePage');
  fetch(`${window.location.origin}/api/psychologists`)
    .then((response) => response.json())
    .then((response) => {
      response.data.forEach((psychologist) => {
        const tr = document.createElement('tr');
        const firstNameTD = document.createElement('td');
        const lastNameTD = document.createElement('td');
        const availabilityTD = document.createElement('td');
        const emailTD = document.createElement('td');
        const phoneTD = document.createElement('td');
        const addressTD = document.createElement('td');
        const deleteTD = document.createElement('td');
        const button = document.createElement('button');
        firstNameTD.innerText = psychologist.firstName;
        lastNameTD.innerText = psychologist.lastName;
        availabilityTD.innerText = psychologist.availability.availability;
        emailTD.innerText = psychologist.email;
        phoneTD.innerText = psychologist.phone;
        addressTD.innerText = psychologist.address;
        deleteTD.append(button);
        button.innerHTML = "<img src='https://img.icons8.com/material-rounded/24/000000/delete.png'/>";
        button.classList.add('delete-button-list');
        button.onclick = (event) => {
          deletePsychologist(
            // eslint-disable-next-line no-underscore-dangle
            psychologist._id,
            psychologist.firstName,
            psychologist.lastName,
            event,
          );
        };
        firstNameTD.onclick = () => openEditPsychologistForm(psychologist);
        tr.append(firstNameTD, lastNameTD, availabilityTD, emailTD, phoneTD, addressTD, deleteTD);
        tableContent.append(tr);
      });
    });
};
