const openEditClient = (id) => {
  window.location.href = `${window.location.origin}/views/clientForm.html?_id=${id}`;
};

const openNewClient = () => {
  window.location.href = `${window.location.origin}/views/clientForm.html`;
};

const deleteClient = (id, name, event) => {
  event.stopPropagation();
  document.getElementById('modal-title').innerText = 'You are about to delete';
  document.getElementById('modal-data-inputs').innerText = `${name}`;
  document.getElementById('modal-section').classList.add('modal-section-display-on');
  document.getElementById('procced-button').onclick = () => {
    const url = `${window.location.origin}/api/clients/${id}`;
    fetch(url, {
      method: 'DELETE',
    })
      .then((response) => {
        response.json();
        window.location.href = `${window.location.origin}/views/clientList.html`;
      })
      .catch((error) => error);
  };
};

const clientListOnLoad = () => {
  const navButton = document.getElementById('clientsNav');
  navButton.classList.add('activePage');

  const tableContent = document.getElementById('clients-table-content');

  const addClient = document.getElementById('addClient');
  addClient.onclick = openNewClient;

  fetch(`${window.location.origin}/api/clients`)
    .then((response) => response.json())
    .then((response) => {
      response.data.forEach((client) => {
        const tr = document.createElement('tr');
        const nameTd = document.createElement('td');
        const phoneTd = document.createElement('td');
        const actionsTd = document.createElement('td');
        nameTd.innerText = client.name;
        phoneTd.innerText = client.phone;
        const button = document.createElement('button');
        button.innerHTML = '<img src="../assets/images/deleteIcon.png">';
        button.classList.add('delete-btn');
        // eslint-disable-next-line no-underscore-dangle
        button.onclick = (event) => deleteClient(client._id, client.name, event);
        actionsTd.append(button);

        tr.append(nameTd, phoneTd, actionsTd);
        tableContent.append(tr);
        // eslint-disable-next-line no-underscore-dangle
        tr.onclick = () => openEditClient(client._id);
      });
    })
    .catch((error) => error);
};

window.addEventListener('load', clientListOnLoad);
