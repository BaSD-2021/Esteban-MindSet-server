const modalSection = document.getElementById('modal-section');
// eslint-disable-next-line no-unused-vars
function openModal() {
  modalSection.classList.add('modal-section-display-on');
}

// eslint-disable-next-line no-unused-vars
function updateModalInfo(title, text) {
  document.getElementById('modal-title').innerText = title;
  document.getElementById('modal-data-inputs').innerText = text;
}

function closeModal() {
  modalSection.classList.remove('modal-section-display-on');
  modalSection.classList.add('modal-display-off');
}

document.getElementById('cancel-button').onclick = closeModal;

const modalCloseBtn = document.getElementById('modal-close-button');
modalCloseBtn.onclick = () => {
  modalSection.classList.remove('modal-section-display-on');
  modalSection.classList.add('modal-display-off');
};