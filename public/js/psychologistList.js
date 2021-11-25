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
  const confirmButton = document.getElementById('confirm-button');
  const cancelButton = document.getElementById('cancel-button');

  const deletePsychologist = (id, firstName, lastName, event) => {
    event.stopPropagation();
    document.getElementById('modal-title').innerText = 'You are about to delete a Profile:';
    document.getElementById('modal-data-inputs').innerText = `Psychologist: ${firstName} ${lastName}`;
    // eslint-disable-next-line no-undef
    openModal();
    // eslint-disable-next-line no-undef
    cancelButton.onclick = closeModal;
    confirmButton.onclick = () => {
      const url = `${window.location.origin}/api/psychologists/${id}`;
      fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then((res) => {
          if (res.status !== 204) {
            return res.json().then((message) => {
              throw new Error(message);
            });
          }
          // eslint-disable-next-line no-use-before-define
          psychologistsList();
          // eslint-disable-next-line no-undef
          return closeModal();
        })
        .catch((error) => error);
    };
  };

  addPsychologistButton.onclick = openNewPsychologistForm;
  navButton.classList.add('activePage');
  const psychologistsList = () => {
    tableContent.innerHTML = '';
    fetch(`${window.location.origin}/api/psychologists`)
      .then((response) => response.json())
      .then((response) => {
        response.data.forEach((psychologist) => {
          const tr = document.createElement('tr');
          const firstNameTD = document.createElement('td');
          const lastNameTD = document.createElement('td');
          const usernameTD = document.createElement('td');
          const passwordTD = document.createElement('td');
          const availabilityTD = document.createElement('td');
          const emailTD = document.createElement('td');
          const phoneTD = document.createElement('td');
          const addressTD = document.createElement('td');
          const deleteTD = document.createElement('td');
          const button = document.createElement('button');
          const availabilityButton = document.createElement('button');
          firstNameTD.innerText = psychologist.firstName;
          lastNameTD.innerText = psychologist.lastName;
          usernameTD.innerText = psychologist.username;
          passwordTD.innerText = psychologist.password;
          emailTD.innerText = psychologist.email;
          phoneTD.innerText = psychologist.phone;
          addressTD.innerText = psychologist.address;
          availabilityTD.append(availabilityButton);
          availabilityButton.innerText = 'Click to see';
          availabilityButton.onclick = (event) => {
            event.stopPropagation();
            document.getElementById('modal-data-inputs').innerText = `Monday: ${psychologist.availability.monday.from} - ${psychologist.availability.monday.to}\n
              Tuesday: ${psychologist.availability.tuesday.from} - ${psychologist.availability.tuesday.to}\n
              Wednesday: ${psychologist.availability.wednesday.from} - ${psychologist.availability.wednesday.to}\n
              Friday: ${psychologist.availability.friday.from} - ${psychologist.availability.friday.to}\n
              Saturday: ${psychologist.availability.saturday.from} - ${psychologist.availability.saturday.to}\n
              Thursday: ${psychologist.availability.thursday.from} - ${psychologist.availability.thursday.to}\n
              Sunday: ${psychologist.availability.sunday.from} - ${psychologist.availability.sunday.to}\n`;
            // modalContent.setAttribute('id', 'adjunst-modal');
            confirmButton.style.display = 'none';
            cancelButton.style.display = 'none';
            // eslint-disable-next-line no-undef
            openModal();
          };
          deleteTD.append(button);
          button.innerHTML = "<img src='../assets/deleteIcon.png'/>";
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
          tr.onclick = () => openEditPsychologistForm(psychologist);
          tr.append(
            firstNameTD,
            lastNameTD,
            usernameTD,
            passwordTD,
            availabilityTD,
            emailTD,
            phoneTD,
            addressTD,
            deleteTD,
          );
          tableContent.append(tr);
        });
      });
  };
  psychologistsList();
};
