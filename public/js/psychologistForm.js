window.onload = () => {
  const navButton = document.getElementById('psychologistNav');
  const params = new URLSearchParams(window.location.search);
  const firstNameInput = document.getElementById('firstName');
  const lastNameInput = document.getElementById('lastName');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const addressInput = document.getElementById('address');
  const mondayAvailability = document.getElementById('monday-availability');
  const mondayFromInput = document.getElementById('monday-from');
  const mondayToInput = document.getElementById('monday-to');
  const tuesdayAvailability = document.getElementById('tuesday-availability');
  const tuesdayFromInput = document.getElementById('tuesday-from');
  const tuesdayToInput = document.getElementById('tuesday-to');
  const wednesdayAvailability = document.getElementById('wednesday-availability');
  const wednesdayFromInput = document.getElementById('wednesday-from');
  const wednesdayToInput = document.getElementById('wednesday-to');
  const thursdayAvailability = document.getElementById('thursday-availability');
  const thursdayFromInput = document.getElementById('thursday-from');
  const thursdayToInput = document.getElementById('thursday-to');
  const fridayAvailability = document.getElementById('friday-availability');
  const fridayFromInput = document.getElementById('friday-from');
  const fridayToInput = document.getElementById('friday-to');
  const saturdayAvailability = document.getElementById('saturday-availability');
  const saturdayFromInput = document.getElementById('saturday-from');
  const saturdayToInput = document.getElementById('saturday-to');
  const sundayAvailability = document.getElementById('sunday-availability');
  const sundayFromInput = document.getElementById('sunday-from');
  const sundayToInput = document.getElementById('sunday-to');
  const paramsId = params.get('psychologistId');

  const form = document.getElementById('form');
  const saveButton = document.getElementById('saveButton');
  const errorMessage = document.getElementById('error_massage');

  navButton.classList.add('activePage');

  saveButton.disabled = !!paramsId;

  const onFocusInput = () => {
    errorMessage.innerText = '';
  };

  firstNameInput.onfocus = onFocusInput;
  lastNameInput.onfocus = onFocusInput;
  emailInput.onfocus = onFocusInput;
  phoneInput.onfocus = onFocusInput;
  addressInput.onfocus = onFocusInput;

  if (paramsId) {
    fetch(`${window.location.origin}/api/psychologists?_id=${paramsId}`)
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
        response.data.forEach((psychologist) => {
          firstNameInput.value = psychologist.firstName;
          lastNameInput.value = psychologist.lastName;
          usernameInput.value = psychologist.username;
          passwordInput.value = psychologist.password;
          emailInput.value = psychologist.email;
          phoneInput.value = psychologist.phone;
          addressInput.value = psychologist.address;
          mondayAvailability.value = psychologist.availability.monday.availability;
          mondayFromInput.value = psychologist.availability.monday.from;
          mondayToInput.value = psychologist.availability.monday.to;
          tuesdayAvailability.value = psychologist.availability.tuesday.availability;
          tuesdayFromInput.value = psychologist.availability.tuesday.from;
          tuesdayToInput.value = psychologist.availability.tuesday.to;
          wednesdayAvailability.value = psychologist.availability.wednesday.availability;
          wednesdayFromInput.value = psychologist.availability.wednesday.from;
          wednesdayToInput.value = psychologist.availability.wednesday.to;
          thursdayAvailability.value = psychologist.availability.thursday.availability;
          thursdayFromInput.value = psychologist.availability.thursday.from;
          thursdayToInput.value = psychologist.availability.thursday.to;
          fridayAvailability.value = psychologist.availability.friday.availability;
          fridayFromInput.value = psychologist.availability.friday.from;
          fridayToInput.value = psychologist.availability.friday.to;
          saturdayAvailability.value = psychologist.availability.saturday.availability;
          saturdayFromInput.value = psychologist.availability.saturday.from;
          saturdayToInput.value = psychologist.availability.saturday.to;
          sundayAvailability.value = psychologist.availability.sunday.availability;
          sundayFromInput.value = psychologist.availability.sunday.from;
          sundayToInput.value = psychologist.availability.sunday.to;
        });
      })
      .catch((error) => {
        errorMessage.innerText = error;
      });
  }

  form.onsubmit = (event) => {
    event.preventDefault();
    saveButton.disabled = true;

    let url;
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        username: usernameInput.value,
        password: passwordInput.value,
        email: emailInput.value,
        phone: parseInt(phoneInput.value, 10),
        address: addressInput.value,
        availability: {
          monday: {
            availability: !!mondayAvailability.value,
            from: parseInt(mondayFromInput.value, 10),
            to: parseInt(mondayToInput.value, 10),
          },
          tuesday: {
            availability: !!tuesdayAvailability.value,
            from: parseInt(tuesdayFromInput.value, 10),
            to: parseInt(tuesdayToInput.value, 10),
          },
          wednesday: {
            availability: !!wednesdayAvailability.value,
            from: parseInt(wednesdayFromInput.value, 10),
            to: parseInt(wednesdayToInput.value, 10),
          },
          thursday: {
            availability: !!thursdayAvailability.value,
            from: parseInt(thursdayFromInput.value, 10),
            to: parseInt(thursdayToInput.value, 10),
          },
          friday: {
            availability: !!fridayAvailability.value,
            from: parseInt(fridayFromInput.value, 10),
            to: parseInt(fridayToInput.value, 10),
          },
          saturday: {
            availability: !!saturdayAvailability.value,
            from: parseInt(saturdayFromInput.value, 10),
            to: parseInt(saturdayToInput.value, 10),
          },
          sunday: {
            availability: !!sundayAvailability.value,
            from: parseInt(sundayFromInput.value, 10),
            to: parseInt(sundayToInput.value, 10),
          },
        },
      }),
    };

    if (paramsId) {
      options.method = 'PUT';
      url = `${window.location.origin}/api/psychologists/${paramsId}`;
    } else {
      options.method = 'POST';
      url = `${window.location.origin}/api/psychologists`;
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
        window.location.href = `${window.location.origin}/views/psychologistList.html`;
      })
      .catch((error) => {
        errorMessage.innerText = error;
      })
      .finally(() => {
        saveButton.disabled = false;
      });
  };
};
