const modalOnLoad = () => {
  const modalSection = document.getElementById('modal-section');

  function closeModal() {
    modalSection.classList.remove('modal-section-display-on');
    modalSection.classList.add('modal-display-off');
  }

  document.getElementById('cancel-button').onclick = () => {
    closeModal();
  };

  modalSection.onclick = () => {
    closeModal();
  };

  const modalCloseBtn = document.getElementById('modal-close-button');
  modalCloseBtn.onclick = closeModal;
};

window.addEventListener('load', modalOnLoad);
