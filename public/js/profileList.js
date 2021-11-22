const openEditProfileForm = (profile) => {
  // eslint-disable-next-line no-underscore-dangle
  window.location.href = `${window.location.origin}/views/profileForm.html?profileId=${profile._id}`;
};

const openNewProfileForm = () => {
  window.location.href = `${window.location.origin}/views/profileForm.html`;
};

window.onload = () => {
  const navButton = document.getElementById('profilesNav');
  const tableContent = document.getElementById('table-content');
  const addProfileButton = document.getElementById('addProfile');

  addProfileButton.onclick = openNewProfileForm;
  navButton.classList.add('activePage');

  const deleteProfile = (id, name, event) => {
    event.stopPropagation();
    document.getElementById('modal-title').innerText = 'You are about to delete a Professional Profile:';
    document.getElementById('modal-data-inputs').innerText = `Profile: ${name}`;
    // eslint-disable-next-line no-undef
    openModal();
    // eslint-disable-next-line no-undef
    document.getElementById('cancel-button').onclick = closeModal;
    document.getElementById('confirm-button').onclick = () => {
      const url = `${window.location.origin}/api/profiles/${id}`;
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
          profileList();
          // eslint-disable-next-line no-undef
          return closeModal();
        })
        .catch((error) => error);
    };
  };

  const profileList = () => {
    tableContent.innerHTML = '';
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
          button.innerHTML = "<img src='../assets/deleteIcon.png' alt='Delete icon'>";
          button.classList.add('delete-button-list');
          // eslint-disable-next-line no-underscore-dangle
          button.onclick = (event) => deleteProfile(profile._id, profile.name, event);
          NameTD.onclick = () => openEditProfileForm(profile);
          tr.append(NameTD, DeleteTD);
          tableContent.append(tr);
        });
      });
  };
  profileList();
};
