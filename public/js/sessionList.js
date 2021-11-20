const openEditSession = (id) => {
  // eslint-disable-next-line no-underscore-dangle
  window.location.href = `${window.location.origin}/views/sessionForm.html?_id=${id}`;
};
const openNewSession = () => {
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

  const deleteSession = (item, event) => {
    event.stopPropagation();
    event.stopPropagation();
    document.getElementById('modal-title').innerText = 'You are about to delete a Session between:';
    document.getElementById('modal-data-inputs').innerText = `${item.postulant.firstName} ${item.postulant.lastName}
    and ${item.psychologist.firstName} ${item.psychologist.lastName}`;
    openModal();
    document.getElementById('cancel-button').onclick = () => {
      modalSection.classList.remove('modal-section-display-on');
      modalSection.classList.add('modal-display-off');
    };
    document.getElementById('procced-button').onclick = () => {
      // eslint-disable-next-line no-underscore-dangle
      const url = `${window.location.origin}/api/sessions/${item._id}`;
      fetch(url, {
        method: 'DELETE',
      })
        .then((response) => {
          response.json();
          window.location.href = `${window.location.origin}/views/sessionList.html`;
        })
        .catch((error) => error);
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
        button.innerHTML = '<img src="/assets/deleteIcon.png" alt="" srcset="">';
        button.classList.add('deleteBtn');
        button.onclick = (event) => deleteSession(item, event);
        actionsTD.append(button);

        tr.append(postulantTD, psychologistTD, dateTD, statusTD, actionsTD);
        tableContent.append(tr);
        // eslint-disable-next-line no-underscore-dangle
        tr.onclick = () => openEditSession(item._id);
      });
    })
    .catch((error) => error);
};
