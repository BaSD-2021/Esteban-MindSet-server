const navButton = document.getElementById('sessionsNav');
navButton.classList.add('activePage');

const params = new URLSearchParams(window.location.search);
const applicationId = params.get('id');

const positionInput = document.getElementById('position');
const postulantInput = document.getElementById('postulant');
const interviewInput = document.getElementById('interview');
const resultInput = document.getElementById('result');

const form = document.getElementById('form');
const saveButton = document.getElementById('saveButton');
const errorMessage = document.getElementById('error_message');

saveButton.disabled = !!applicationId;

const onFocusInput = () => {
  errorMessage.innerText = '';
};

resultInput.onfocus = onFocusInput;

const fillSelect = (url, parent) => {
  fetch(`${window.location.origin}/api${url}`)
    .then((response) => {
      if (response.status !== 200 && response.status !== 201) {
        return response.json().then(({ message }) => {
          throw new Error(message);
        });
      }
      return response.json();
    })
    .then((response) => {
      saveButton.disabled = false;
      console.log(url, response.data);
      response.data.forEach((el) => {
        const option = document.createElement('option');
        // eslint-disable-next-line no-underscore-dangle
        option.value = el._id;
        option.innerText = `${el.firstName ? el.firstName : ''} ${el.firstName ? el.lastName : ''}${el.jobDescription ? el.jobDescription : ''}${el.date ? new Date(el.date).toLocaleString() : ''}`;
        parent.append(option);
      });
    })
    .catch((error) => {
      errorMessage.innerText = error;
    });
};

fillSelect('/positions', positionInput);
fillSelect('/postulants', postulantInput);
fillSelect('/interviews', interviewInput);

form.onsubmit = (event) => {
  event.preventDefault();
  saveButton.disabled = true;
  let url;
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      positions: positionInput.value,
      postulants: postulantInput.value,
      interview: interviewInput.value,
      result: resultInput.value,
    }),
  };

  if (applicationId) {
    options.method = 'PUT';
    url = `${window.location.origin}/api/applications/${applicationId}`;
  } else {
    options.method = 'POST';
    url = `${window.location.origin}/api/applications`;
  }

  fetch(url, options)
    .then((response) => {
      if (response.status !== 200 && response.status !== 201) {
        return response.json().then(({ message }) => {
          throw new Error(message);
        });
      }
      return response.json();
    })
    .then(() => {
      window.location.href = `${window.location.origin}/views/applicationList.html`;
    })
    .catch((error) => {
      errorMessage.innerText = error;
    })
    .finally(() => {
      saveButton.disabled = false;
    });
};
