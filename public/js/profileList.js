window.onload = () => {
  const navButton = document.getElementById('profilesNav');
  const tableContent = document.getElementById('table-content');

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
        tr.append(NameTD);
        tr.append(DeleteTD);
        tableContent.append(tr);
      });
    });
};
