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

function closeModal(e) {
  if (e.target === modalSection) {
    modalSection.classList.remove('modal-section-display-on');
    modalSection.classList.add('modal-display-off');
  }
}

// eslint-disable-next-line no-unused-vars
function cancelModal() {
  modalSection.classList.remove('modal-section-display-on');
  modalSection.classList.add('modal-display-off');
}

window.addEventListener('click', closeModal);
const modalCloseBtn = document.getElementById('modal-close-button');
modalCloseBtn.onclick = () => {
  modalSection.classList.remove('modal-section-display-on');
  modalSection.classList.add('modal-display-off');
};
