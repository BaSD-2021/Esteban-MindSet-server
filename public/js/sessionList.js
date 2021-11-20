const openEditSession = (id) => {
  // eslint-disable-next-line no-underscore-dangle
  window.location.href = `${window.location.origin}/views/sessionForm.html?_id=${id}`;
};
const openNewSession = () => {
  // eslint-disable-next-line no-underscore-dangle
  window.location.href = `${window.location.origin}/views/sessionForm.html`;
};

const deleteSession = (id, event) => {
  event.stopPropagation();
  const url = `http://localhost:4000/api/sessions/${id}`;
  fetch(url, {
    method: 'DELETE',
  })
    .then((response) => {
      response.json();
      window.location.href = `${window.location.origin}/views/sessionList.html`;
    });
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
        const actionsTD = document.createElement('td');
        const postulantName = `${item.postulant.firstName} ${item.postulant.lastName}`;
        const psychologistName = `${item.psychologist.firstName} ${item.psychologist.lastName}`;
        const date = new Date(item.date);
        const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`;

        postulantTD.innerText = postulantName;
        psychologistTD.innerText = psychologistName;
        dateTD.innerText = formattedDate;
        statusTD.innerText = item.status;

        const button = document.createElement('button');
        button.innerText = 'Delete';
        // eslint-disable-next-line no-underscore-dangle
        button.onclick = (event) => deleteSession(item._id, event);
        actionsTD.append(button);

        tr.append(postulantTD, psychologistTD, dateTD, statusTD, actionsTD);
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
