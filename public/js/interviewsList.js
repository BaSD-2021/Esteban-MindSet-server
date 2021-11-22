const navButton = document.getElementById('interviewsNav');
const addInterviewButton = document.getElementById('addClient');
const errorMessage = document.getElementById('error-message');
const confirmDeleteButton = document.getElementById('procced-button');
const tableContent = document.getElementById('table-content');

const openEditInterviewsForm = (interview) => {
  // eslint-disable-next-line no-underscore-dangle
  window.location.href = `${window.location.origin}/views/interviewsForm.html?interviewsId=${interview._id}`;
};

const openNewInterviewsForm = () => {
  // eslint-disable-next-line no-underscore-dangle
  window.location.href = `${window.location.origin}/views/interviewsForm.html`;
};

let interviewId;

const deleteInterview = (interview, event) => {
  event.stopPropagation();
  // eslint-disable-next-line no-underscore-dangle
  interviewId = interview._id;
  // eslint-disable-next-line no-undef
  updateModalInfo(
    'You are about to delete an Interview between',
    `Postulant: ${interview?.postulant?.firstName} ${interview?.postulant?.lastName} \n
    client: ${interview?.client?.name}`,
  );
  // eslint-disable-next-line no-undef
  openModal();
};

const getInterviews = () => {
  while (tableContent.firstChild) {
    tableContent.removeChild(tableContent.firstChild);
  }

  fetch(`${window.location.origin}/api/interviews`)
    .then((response) => response.json())
    .then((response) => {
      response.data.forEach((interview) => {
        const tr = document.createElement('tr');
        const dateTD = document.createElement('td');
        const postulantNameTD = document.createElement('td');
        const clientNameTD = document.createElement('td');
        const actionsTD = document.createElement('td');

        const date = interview.date.substring(0, 10);

        dateTD.innerText = date;
        postulantNameTD.innerText = `${interview?.postulant?.firstName} ${interview?.postulant?.lastName}`;
        clientNameTD.innerText = interview?.client?.name;

        const button = document.createElement('button');
        button.innerText = 'Delete';

        // eslint-disable-next-line no-underscore-dangle
        button.onclick = (event) => deleteInterview(interview, event);
        actionsTD.append(button);

        tr.onclick = () => openEditInterviewsForm(interview);
        tr.append(dateTD, postulantNameTD, clientNameTD, actionsTD);
        tableContent.append(tr);
      });
    });
};

confirmDeleteButton.onclick = () => {
  const url = `${window.location.origin}/api/interviews/${interviewId}`;
  fetch(url, {
    method: 'DELETE',
  })
    .then((response) => {
      if (response.status !== 204) {
        return response.json().then(({ message }) => {
          throw new Error(message);
        });
      }
      getInterviews();
      // eslint-disable-next-line no-undef
      return closeModal();
    })
    .catch((error) => {
      errorMessage.innerText = error;
    });
};

addInterviewButton.onclick = openNewInterviewsForm;

navButton.classList.add('activePage');

getInterviews();
