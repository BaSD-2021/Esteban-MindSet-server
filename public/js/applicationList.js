const errorMsg = document.getElementById('error-message');
const proceedBtn = document.getElementById('procced-button');
const navButton = document.getElementById('applicationsNav');
const addButton = document.getElementById('addApplication');
const tableContent = document.getElementById('table-content');

let applicationId;

const openEditApplication = (id) => {
  // eslint-disable-next-line no-underscore-dangle
  window.location.href = `${window.location.origin}/views/applicationForm.html?_id=${id}`;
};
const openNewApplication = () => {
  window.location.href = `${window.location.origin}/views/applicationForm.html`;
};

navButton.classList.add('activePage');
addButton.onclick = openNewApplication;

const deleteApplication = (application, e) => {
  e.stopPropagation();
  // eslint-disable-next-line no-underscore-dangle
  applicationId = application._id;
  // eslint-disable-next-line no-undef
  updateModalInfo(
    'You are about to delete an Application',
    `Postulant: ${application?.postulants?.firstName} ${application?.postulants?.lastName} \n
    Job: ${application?.positions?.jobDescription}`,
  );
  // eslint-disable-next-line no-undef
  openModal();
};

const getApplications = () => {
  while (tableContent.firstChild) {
    tableContent.removeChild(tableContent.firstChild);
  }

  fetch(`${window.location.origin}/api/applications`)
    .then((response) => response.json())
    .then((response) => {
      response.data.forEach((application) => {
        const tr = document.createElement('tr');
        const jobDescriptionTD = document.createElement('td');
        const postulantTD = document.createElement('td');
        const interviewTD = document.createElement('td');
        const resultTD = document.createElement('td');
        const button = document.createElement('td');

        jobDescriptionTD.innerText = application.positions?.jobDescription;
        postulantTD.innerText = `${application.postulants?.firstName} ${application.postulants?.lastName}`;
        interviewTD.innerText = application.interview?.date.substr(0, 10) ?? '---';
        resultTD.innerText = application.result ?? '---';
        button.innerHTML = '<img src="/assets/deleteIcon.png" alt="" srcset="">';
        button.classList.add('deleteBtn');

        button.onclick = (e) => deleteApplication(application, e);
        // eslint-disable-next-line no-underscore-dangle
        tr.onclick = () => openEditApplication(application._id);
        tr.append(jobDescriptionTD, postulantTD, interviewTD, resultTD, button);
        tableContent.append(tr);
      });
    });
};

proceedBtn.onclick = () => {
  const url = `${window.location.origin}/api/applications/${applicationId}`;
  fetch(url, {
    method: 'DELETE',
  })
    .then((response) => {
      if (response.status !== 204) {
        return response.json().then(({ message }) => {
          throw new Error(message);
        });
      }
      getApplications();
      // eslint-disable-next-line no-undef
      return closeModal();
    })
    .catch((error) => {
      errorMsg.innerText = error;
    });
};

getApplications();
