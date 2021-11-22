const openEditInterviewsForm = (interview) => {
  // eslint-disable-next-line no-underscore-dangle
  window.location.href = `${window.location.origin}/views/interviewsForm.html?interviewsId=${interview._id}`;
};

const openNewInterviewsForm = () => {
  // eslint-disable-next-line no-underscore-dangle
  window.location.href = `${window.location.origin}/views/interviewsForm.html`;
};

const navButton = document.getElementById('interviewsNav');
navButton.classList.add('activePage');

const addInterviewButton = document.getElementById('addClient');
addInterviewButton.onclick = openNewInterviewsForm;

const tableContent = document.getElementById('table-content');

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
      button.onclick = () => deleteInterview(interview._id);
      actionsTD.append(button);

      tr.onclick = () => openEditInterviewsForm(interview);
      tr.append(dateTD, postulantNameTD, clientNameTD, actionsTD);
      tableContent.append(tr);
    });
  });
