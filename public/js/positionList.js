window.onload = () => {
  const navButton = document.getElementById('positionsNav');
  navButton.classList.add('activePage');

  const tableContent = document.getElementById('positions-table-content');

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
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
