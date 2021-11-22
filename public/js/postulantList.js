const errorMsg = document.getElementById('error-message');
const proceedBtn = document.getElementById('procced-button');
const navButton = document.getElementById('postulantsNav');
const addButton = document.getElementById('addPostulant');
const tableContent = document.getElementById('table-content');

let postulantId;

const openEditPostulant = (id) => {
  window.location.href = `${window.location.origin}/views/postulantForm.html?id=${id}`;
};
const openNewPostulant = () => {
  window.location.href = `${window.location.origin}/views/postulantForm.html`;
};

navButton.classList.add('activePage');
addButton.onclick = openNewPostulant;

const deletePostulant = (postulant, e) => {
  e.stopPropagation();
  // eslint-disable-next-line no-underscore-dangle
  postulantId = postulant._id;
  // eslint-disable-next-line no-undef
  updateModalInfo(
    'You are about to delete a postulant',
    `${postulant.firstName} ${postulant.lastName} \n
    Mail: ${postulant.email}\n
    Phone: ${postulant.phone}`,
  );
  // eslint-disable-next-line no-undef
  openModal();
};

const getPostulants = () => {
  while (tableContent.firstChild) {
    tableContent.removeChild(tableContent.firstChild);
  }

  fetch(`${window.location.origin}/api/postulants`)
    .then((response) => response.json())
    .then((response) => {
      response.data.forEach((postulant) => {
        const tr = document.createElement('tr');
        const nameTD = document.createElement('td');
        const mailTD = document.createElement('td');
        const availableTD = document.createElement('td');
        const button = document.createElement('td');

        nameTD.innerText = `${postulant.firstName} ${postulant.lastName}`;
        mailTD.innerText = postulant.email;
        availableTD.innerHTML = postulant.available ? '&#10004;' : '&#10006;';
        availableTD.style.textAlign = 'center';
        button.innerHTML = '<img src="/assets/deleteIcon.png" alt="" srcset="">';
        button.classList.add('deleteBtn');

        button.onclick = (e) => deletePostulant(postulant, e);
        // eslint-disable-next-line no-underscore-dangle
        tr.onclick = () => openEditPostulant(postulant._id);
        tr.append(nameTD, mailTD, availableTD, button);
        tableContent.append(tr);
      });
    });
};

proceedBtn.onclick = () => {
  const url = `${window.location.origin}/api/postulants/${postulantId}`;
  fetch(url, {
    method: 'DELETE',
  })
    .then((response) => {
      if (response.status !== 204) {
        return response.json().then(({ message }) => {
          throw new Error(message);
        });
      }
      getPostulants();
      // eslint-disable-next-line no-undef
      return closeModal();
    })
    .catch((error) => {
      errorMsg.innerText = error;
    });
};

getPostulants();
