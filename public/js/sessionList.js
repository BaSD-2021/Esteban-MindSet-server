const openEditSession = (id) => {
  // eslint-disable-next-line no-underscore-dangle
  window.location.href = `${window.location.origin}/views/sessionForm.html?_id=${id}`;
};
const openNewSession = () => {
  // eslint-disable-next-line no-underscore-dangle
  window.location.href = `${window.location.origin}/views/sessionForm.html`;
};

window.onload = () => {
  const navButton = document.getElementById('sessionsNav');
  navButton.classList.add('activePage');

  const tableContent = document.getElementById('session-table');

  const addSession = document.getElementById('addSession');
  addSession.onclick = openNewSession;

  fetch(`${window.location.origin}/api/sessions`)
    .then((response) => response.json())
    .then((response) => {
      response.data.forEach((item) => {
        const tr = document.createElement('tr');
        const postulantTD = document.createElement('td');
        const psychologistTD = document.createElement('td');
        const dateTD = document.createElement('td');
        const statusTD = document.createElement('td');
        postulantTD.innerText = item.postulant;
        psychologistTD.innerText = item.postulant;
        dateTD.innerText = item.date;
        statusTD.innerText = item.status;
        tr.append(postulantTD, psychologistTD, dateTD, statusTD);
        tableContent.append(tr);
        // eslint-disable-next-line no-underscore-dangle
        tr.onclick = () => openEditSession(item._id);
      });
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    });
};
