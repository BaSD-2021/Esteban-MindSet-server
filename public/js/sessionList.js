const openEditForm = (id) => {
  window.location.href = `${window.location.origin}/views/sessionForm.html?id=${id}`;
};

const openNewForm = () => {
  window.location.href = `${window.location.origin}/views/sessionForm.html`;
};

window.onload = () => {
  const navButton = document.getElementById('sessionsNav');
  navButton.classList.add('activePage');

  const addButton = document.getElementById('addSession');
  addButton.onclick = openNewForm;

  const tableContent = document.getElementById('table-content');
  fetch(`${window.location.origin}/api/sessions`)
    .then((response) => response.json())
    .then((response) => {
      response.data.forEach((session) => {
        const tr = document.createElement('tr');
        const statusTD = document.createElement('td');
        const dateTD = document.createElement('td');
        const postulantTD = document.createElement('td');
        const psychologistTD = document.createElement('td');
        statusTD.innerText = session.status;
        dateTD.innerText = session.date.replace('T', ' ');
        if (session.postulant) {
          postulantTD.innerText = `${session.postulant.firstName} ${session.postulant.lastName}`;
        }
        if (session.psychologist) {
          psychologistTD.innerText = `${session.psychologist.firstName} ${session.psychologist.lastName}`;
        }
        // eslint-disable-next-line no-underscore-dangle
        tr.onclick = () => openEditForm(session._id);
        tr.append(postulantTD, psychologistTD, dateTD, statusTD);
        tableContent.append(tr);
      });
    });
};
