const openEditPosition = (id) => {
  window.location.href = `${window.location.origin}/views/positionForm.html?_id=${id}`;
};

const openNewPosition = () => {
  window.location.href = `${window.location.origin}/views/positionForm.html`;
};

const deletePosition = (id, jobDescription, event) => {
  event.stopPropagation();
  document.getElementById('modal-title').innerText = 'You are about to delete the open Position of';
  document.getElementById('modal-data-inputs').innerText = `${jobDescription}`;
  document.getElementById('modal-section').classList.add('modal-section-display-on');
  document.getElementById('procced-button').onclick = () => {
    const url = `${window.location.origin}/api/positions/${id}`;
    fetch(url, {
      method: 'DELETE',
    })
      .then((response) => {
        response.json();
        window.location.href = `${window.location.origin}/views/positionList.html`;
      })
      .catch((error) => error);
  };
};

const positionListOnLoad = () => {
  const navButton = document.getElementById('positionsNav');
  navButton.classList.add('activePage');

  const tableContent = document.getElementById('positions-table-content');

  const addPosition = document.getElementById('addPosition');
  addPosition.onclick = openNewPosition;

  fetch(`${window.location.origin}/api/positions`)
    .then((response) => response.json())
    .then((response) => {
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
    .catch((error) => error);
};

window.addEventListener('load', positionListOnLoad);
