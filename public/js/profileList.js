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
        NameTD.innerText = profile.name;
        tr.append(NameTD);
        tableContent.append(tr);
      });
    });
};
