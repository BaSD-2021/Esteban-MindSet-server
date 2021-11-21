const openEditApplication = (id) => {
  // eslint-disable-next-line no-underscore-dangle
  window.location.href = `${window.location.origin}/views/applicationForm.html?_id=${id}`;
};
const openNewApplication = () => {
  window.location.href = `${window.location.origin}/views/applicationForm.html`;
};

window.onload = () => {
  const navButton = document.getElementById('applicationsNav');
  navButton.classList.add('activePage');

  const addButton = document.getElementById('addApplication');
  addButton.onclick = openNewApplication;

  const tableContent = document.getElementById('table-content');
  fetch(`${window.location.origin}/api/applications`)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      response.data.forEach((application) => {
        const tr = document.createElement('tr');
        const jobDescriptionTD = document.createElement('td');
        const postulantTD = document.createElement('td');
        const interviewTD = document.createElement('td');
        const resultTD = document.createElement('td');
        jobDescriptionTD.innerText = application.positions?.jobDescription;
        postulantTD.innerText = `${application.postulants?.firstName} ${application.postulants?.lastName}`;
        interviewTD.innerText = application.interview ?? '---';
        resultTD.innerText = application.result ?? '---';

        // eslint-disable-next-line no-underscore-dangle
        tr.onclick = () => openEditApplication(application._id);
        tr.append(jobDescriptionTD, postulantTD, interviewTD, resultTD);
        tableContent.append(tr);
      });
    });
};
