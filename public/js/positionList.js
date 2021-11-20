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
  // const modalSection = document.getElementById('modal-section');
  // const openModal = () => {
  //   modalSection.classList.add('modal-section-display-on');
  // };

  // const closeModal = (e) => {
  //   if (e.target === modalSection) {
  //     modalSection.classList.remove('modal-section-display-on');
  //     modalSection.classList.add('modal-display-off');
  //   }
  // };

  // window.addEventListener('click', closeModal);
  // const modalCloseBtn = document.getElementById('modal-close-button');
  // modalCloseBtn.onclick = () => {
  //   modalSection.classList.remove('modal-section-display-on');
  //   modalSection.classList.add('modal-display-off');
  // };

  // End Modal

  fetch(`${window.location.origin}/api/positions`)
    .then((response) => response.json())
    .then((response) => {
      console.log('response', response);
      response.data.forEach((item) => {
        const tr = document.createElement('tr');
        const jobDescriptionTd = document.createElement('td');
        const vacancyTd = document.createElement('td');
        jobDescriptionTd.innerText = item.jobDescription;
        vacancyTd.innerText = item.vacancy;
        tr.append(jobDescriptionTd, vacancyTd);
        tableContent.append(tr);
        // eslint-disable-next-line no-underscore-dangle
        tr.onclick = () => openEditPosition(item._id);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
