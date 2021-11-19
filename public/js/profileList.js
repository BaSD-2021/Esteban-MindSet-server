const openEditProfileForm = (profile) => {
  // eslint-disable-next-line no-underscore-dangle
  window.location.href = `${window.location.origin}/views/profileForm.html?profileId=${profile._id}`;
};

const openNewProfileForm = () => {
  // eslint-disable-next-line no-underscore-dangle
  window.location.href = `${window.location.origin}/views/profileForm.html`;
};

const deleteProfile = (id, event) => {
  event.stopPropagation();
};

window.onload = () => {
  const navButton = document.getElementById('profilesNav');
  const tableContent = document.getElementById('table-content');

  const addProfileButton = document.getElementById('addProfile');
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
        // eslint-disable-next-line no-underscore-dangle
        button.onclick = (event) => deleteProfile(profile._id, event);
        tr.onclick = () => openEditProfileForm(profile);
        tr.append(NameTD, DeleteTD);
        tableContent.append(tr);
      });
    });
};
