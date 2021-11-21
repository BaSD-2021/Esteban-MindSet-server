const openEditPosition = (id) => {
  window.location.href = `${window.location.origin}/views/positionForm.html?_id=${id}`;
};

const openNewPosition = () => {
  window.location.href = `${window.location.origin}/views/positionForm.html`;
};

window.onload = () => {
  const navButton = document.getElementById('positionsNav');
  navButton.classList.add('activePage');

  const tableContent = document.getElementById('positions-table-content');

  const addPosition = document.getElementById('addPosition');
  addPosition.onclick = openNewPosition;

  // Modal

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

  const deletePosition = (id, jobDescription, event) => {
    event.stopPropagation();
    document.getElementById('modal-title').innerText = 'You are about to delete the open Position of';
    document.getElementById('modal-data-inputs').innerText = `${jobDescription}`;
    openModal();
    document.getElementById('cancel-button').onclick = () => {
      modalSection.classList.remove('modal-section-display-on');
      modalSection.classList.add('modal-display-off');
    };
    document.getElementById('procced-button').onclick = () => {
      const url = `${window.location.origin}/api/positions/${id}`;
      fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then(window.location.reload())
        .catch((error) => error);
    };
  };

  fetch(`${window.location.origin}/api/positions`)
    .then((response) => response.json())
    .then((response) => {
      console.log('response', response);
      response.data.forEach((item) => {
        const tr = document.createElement('tr');
        const jobDescriptionTd = document.createElement('td');
        const vacancyTd = document.createElement('td');
        const actionsTd = document.createElement('td');
        jobDescriptionTd.innerText = item.jobDescription;
        vacancyTd.innerText = item.vacancy;
        const button = document.createElement('button');
        button.innerHTML = '<img src="../assets/images/deleteIcon.png">';
        button.classList.add('delete-btn');
        // eslint-disable-next-line no-underscore-dangle
        button.onclick = (event) => deletePosition(item._id, item.jobDescription, event);
        actionsTd.append(button);

        tr.append(jobDescriptionTd, vacancyTd, actionsTd);
        tableContent.append(tr);
        // eslint-disable-next-line no-underscore-dangle
        tr.onclick = () => openEditPosition(item._id);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
