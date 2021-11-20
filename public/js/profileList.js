const openEditProfileForm = (profile) => {
  // eslint-disable-next-line no-underscore-dangle
  window.location.href = `${window.location.origin}/views/profileForm.html?profileId=${profile._id}`;
};

const openNewProfileForm = () => {
  // eslint-disable-next-line no-underscore-dangle
  window.location.href = `${window.location.origin}/views/profileForm.html`;
};

window.onload = () => {
  const navButton = document.getElementById('profilesNav');
  const tableContent = document.getElementById('table-content');
  const addProfileButton = document.getElementById('addProfile');

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

  const deleteProfile = (id, name, event) => {
    event.stopPropagation();
    document.getElementById('modal-title').innerText = 'You are about to delete a Professional Profile:';
    document.getElementById('modal-data-inputs').innerText = `Profile: ${name}`;
    openModal();
    document.getElementById('cancel-button').onclick = () => {
      modalSection.classList.remove('modal-section-display-on');
      modalSection.classList.add('modal-display-off');
    };
    document.getElementById('procced-button').onclick = () => {
      const url = `${window.location.origin}/api/profiles/${id}`;
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

  addProfileButton.onclick = openNewProfileForm;
  navButton.classList.add('activePage');
  fetch(`${window.location.origin}/api/profiles`)
    .then((response) => response.json())
    .then((response) => {
      response.data.forEach((profile) => {
        const tr = document.createElement('tr');
        const NameTD = document.createElement('td');
        const DeleteTD = document.createElement('td');
        const button = document.createElement('button');
        NameTD.innerText = profile.name;
        DeleteTD.append(button);
        button.innerHTML = "<img src='https://img.icons8.com/material-rounded/24/000000/delete.png'/>";
        button.classList.add('delete-button-list');
        // eslint-disable-next-line no-underscore-dangle
        button.onclick = (event) => deleteProfile(profile._id, profile.name, event);
        NameTD.onclick = () => openEditProfileForm(profile);
        tr.append(NameTD, DeleteTD);
        tableContent.append(tr);
      });
    });
};
