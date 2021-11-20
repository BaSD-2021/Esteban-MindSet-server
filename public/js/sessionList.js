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

  const deleteSession = (id, postulantName, psychologistName, event) => {
    event.stopPropagation();
    event.stopPropagation();
    document.getElementById('modal-title').innerText = 'You are about to delete a Session between:';
    document.getElementById('modal-data-inputs').innerText = `${postulantName} and ${psychologistName}`;
    openModal();
    document.getElementById('cancel-button').onclick = () => {
      modalSection.classList.remove('modal-section-display-on');
      modalSection.classList.add('modal-display-off');
    };
    document.getElementById('procced-button').onclick = () => {
      const url = `http://localhost:4000/api/sessions/${id}`;
      fetch(url, {
        method: 'DELETE',
      })
        .then((response) => {
          response.json();
          window.location.href = `${window.location.origin}/views/sessionList.html`;
        });
    };
  };

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
        if (item.postulant) {
          postulantTD.innerText = `${item.postulant.firstName} ${item.postulant.lastName}`;
        }
        if (item.psychologist) {
          psychologistTD.innerText = `${item.psychologist.firstName} ${item.psychologist.lastName}`;
        }

        dateTD.innerText = item.date.replace('T', ' ');
        statusTD.innerText = item.status;

        const button = document.createElement('button');
        button.innerHTML = '<span class="material-icons">delete</span>';
        button.classList.add('deleteBtn');
        button.onclick = (event) => deleteSession(
        // eslint-disable-next-line no-underscore-dangle
          item._id,
          postulantTD.textContent,
          psychologistTD.textContent,
          event,
        );
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
