const navButton = document.getElementById('postulantsNav');
navButton.classList.add('activePage');

const params = new URLSearchParams(window.location.search);
const postulantId = params.get('_id');

const positionInput = document.getElementById('position');
const postulantInput = document.getElementById('postulant');
const interviewInput = document.getElementById('interview');
const resultInput = document.getElementById('result');

const form = document.getElementById('form');
const saveButton = document.getElementById('saveButton');
const errorMessage = document.getElementById('error_message');

saveButton.disabled = !!postulantId;

const onFocusInput = () => {
  errorMessage.innerText = '';
};

resultInput.onfocus = onFocusInput;

const fillSelect = (url, parent) => {
  fetch(`${window.location.origin}/api${url}`)
    .then((response) => {
      if (response.status !== 200) {
        return response.json().then(({ message }) => {
          throw new Error(message);
        });
      }
      return response.json();
    })
    .then((response) => {
      saveButton.disabled = false;
      response.data.forEach((el) => {
        const option = document.createElement('option');
        // eslint-disable-next-line no-underscore-dangle
        option.value = el._id;
        option.innerText = `${el.firstName ? el.firstName : ''} ${el.firstName ? el.lastName : ''}
        ${el.jobDescription ? el.jobDescription : ''}
        ${el.date ? el.date.slice(0, 19).replace('T', ' ') : ''}`;
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

if (postulantId) {
  positionInput.disabled = true;
  postulantInput.disabled = true;
  interviewInput.disabled = true;
  resultInput.disabled = true;
  saveButton.value = 'Back';
  fetch(`${window.location.origin}/api/postulants?_id=${postulantId}`)
    .then((response) => {
      if (response.status !== 200) {
        return response.json().then(({ message }) => {
          throw new Error(message);
        });
      }
      return response.json();
    })
    .then((response) => {
      saveButton.disabled = false;
      response.data.forEach((postulant) => {
        // eslint-disable-next-line no-underscore-dangle
        positionInput.value = postulant?.positions?._id;
        // eslint-disable-next-line no-underscore-dangle
        postulantInput.value = postulant?.postulants?._id;
        // eslint-disable-next-line no-underscore-dangle
        interviewInput.value = postulant?.interview?._id;
        resultInput.value = postulant.result;
      });
    })
    .catch((error) => {
      errorMessage.innerText = error;
    });
}

form.onsubmit = (event) => {
  event.preventDefault();
  saveButton.disabled = true;

  if (postulantId) {
    window.location.href = `${window.location.origin}/views/postulantList.html`;
    return;
  }

  const url = `${window.location.origin}/api/postulants`;

  const options = {
    headers: {
      'Content-Type': 'postulant/json',
    },
    body: JSON.stringify({
      positions: positionInput.value,
      postulants: postulantInput.value,
      interview: interviewInput.value,
      result: resultInput.value,
    }),
    method: 'POST',
  };

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
      window.location.href = `${window.location.origin}/views/postulantList.html`;
    })
    .catch((error) => {
      errorMessage.innerText = error;
    })
    .finally(() => {
      saveButton.disabled = false;
    });
};
