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
  addProfileButton.onclick = openNewProfileForm;

  navButton.classList.add('activePage');
  fetch(`${window.location.origin}/api/profiles`)
    .then((response) => response.json())
    .then((response) => {
      response.data.forEach((profile) => {
        const tr = document.createElement('tr');
        const NameTD = document.createElement('td');
        const DeleteTD = document.createElement('td');
        NameTD.innerText = profile.name;
        DeleteTD.innerText = 'DELETE';
        tr.onclick = () => openEditProfileForm(profile);
        tr.append(NameTD);
        tr.append(DeleteTD);
        tableContent.append(tr);
      });
    });
};
