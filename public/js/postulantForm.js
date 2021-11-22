const navButton = document.getElementById('postulantsNav');
navButton.classList.add('activePage');

const params = new URLSearchParams(window.location.search);
const postulantId = params.get('_id');

const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const contactFromInput = document.getElementById('contactFrom');
const contactToInput = document.getElementById('contactTo');
const addressInput = document.getElementById('address');
const birthdayInput = document.getElementById('birthday');
const availableInput = document.getElementById('available');
const phoneInput = document.getElementById('phone');
const primarySDInput = document.getElementById('primarySD');
const primaryEDInput = document.getElementById('primaryED');
const primarySchoolInput = document.getElementById('primarySchool');
const secondarySDInput = document.getElementById('secondarySD');
const secondaryEDInput = document.getElementById('secondaryED');
const secondarySchoolInput = document.getElementById('secondarySchool');
const tertiarySDInputs = document.querySelectorAll('.tertiarySD');
const tertiaryEDInputs = document.querySelectorAll('.tertiaryED');
const tertiaryDescriptionInputs = document.querySelectorAll('.tertiaryDescription');
const tertiaryInstituteInputs = document.querySelectorAll('.tertiaryInstitute');
const universitySDInputs = document.querySelectorAll('.universitySD');
const universityEDInputs = document.querySelectorAll('.universityED');
const universityDescriptionInputs = document.querySelectorAll('.universityDescription');
const universityInstituteInputs = document.querySelectorAll('.universityInstitute');
const informalSDInputs = document.querySelectorAll('.informalSD');
const informalEDInputs = document.querySelectorAll('.informalED');
const informalDescriptionInputs = document.querySelectorAll('.informalDescription');
const informalInstituteInputs = document.querySelectorAll('.informalInstitute');
const workExperienceCompanyInputs = document.querySelectorAll('.workExperienceCompany');
const workExperienceSDInputs = document.querySelectorAll('.workExperienceSD');
const workExperienceEDInputs = document.querySelectorAll('.workExperienceED');
const workExperienceDescriptionInputs = document.querySelectorAll('.workExperienceDescription');
const addFieldButtons = document.querySelectorAll('.addFields');
const profilesForm = document.getElementById('profilesForm');
const form = document.getElementById('form');
const saveButton = document.getElementById('saveButton');
const errorMessage = document.getElementById('error_message');

saveButton.disabled = !!postulantId;

const onFocusInput = () => {
  errorMessage.innerText = '';
};

firstNameInput.onfocus = onFocusInput;
lastNameInput.onfocus = onFocusInput;
emailInput.onfocus = onFocusInput;
passwordInput.onfocus = onFocusInput;
contactFromInput.onfocus = onFocusInput;
contactToInput.onfocus = onFocusInput;
addressInput.onfocus = onFocusInput;
birthdayInput.onfocus = onFocusInput;
availableInput.onfocus = onFocusInput;
phoneInput.onfocus = onFocusInput;
primarySDInput.onfocus = onFocusInput;
primaryEDInput.onfocus = onFocusInput;
primarySchoolInput.onfocus = onFocusInput;
secondarySDInput.onfocus = onFocusInput;
secondaryEDInput.onfocus = onFocusInput;
secondarySchoolInput.onfocus = onFocusInput;
tertiarySDInputs.onfocus = onFocusInput;
tertiaryEDInputs.onfocus = onFocusInput;
tertiaryDescriptionInputs.onfocus = onFocusInput;
tertiaryInstituteInputs.onfocus = onFocusInput;
universitySDInputs.onfocus = onFocusInput;
universityEDInputs.onfocus = onFocusInput;
universityDescriptionInputs.onfocus = onFocusInput;
universityInstituteInputs.onfocus = onFocusInput;
informalSDInputs.onfocus = onFocusInput;
informalEDInputs.onfocus = onFocusInput;
informalDescriptionInputs.onfocus = onFocusInput;
informalInstituteInputs.onfocus = onFocusInput;
workExperienceCompanyInputs.onfocus = onFocusInput;
workExperienceSDInputs.onfocus = onFocusInput;
workExperienceEDInputs.onfocus = onFocusInput;
workExperienceDescriptionInputs.onfocus = onFocusInput;

const fillProfiles = (postulantProfiles) => {
  fetch(`${window.location.origin}/api/profiles`)
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
        // eslint-disable-next-line no-underscore-dangle
        const id = el._id;
        const label = document.createElement('label');
        const input = document.createElement('input');
        const div = document.createElement('div');
        div.classList = 'flex';
        input.value = id;
        input.type = 'checkbox';
        input.name = `profile-${id}`;
        input.id = `profile-${id}`;
        label.htmlFor = `profile-${id}`;
        label.innerText = el.name;
        input.checked = id in (postulantProfiles ?? [false]);
        div.append(label, input);
        profilesForm.append(div);
      });
    })
    .catch((error) => {
      errorMessage.innerText = error;
    });
};

const profilesBodyContructor = () => {
  const profiles = document.querySelectorAll("[name^='profile']");
  const bodyProfiles = [];
  profiles.forEach((el) => {
    if (el.checked) bodyProfiles.push({ profileId: el.value });
  });
  return bodyProfiles;
};

const workExperienceBodyConstructor = () => {
  const workExperienceBody = [];
  workExperienceSDInputs.forEach((el, idx) => {
    workExperienceBody.push({
      startDate: el.value,
      endDate: workExperienceEDInputs[idx].value,
      description: workExperienceDescriptionInputs[idx].value,
      company: workExperienceCompanyInputs[idx].value,
    });
  });
  return workExperienceBody;
};

const studiesBodyConstructor = () => {
  const primaryStudies = {
    startDate: primarySDInput.value,
    endDate: primaryEDInput.value,
    school: primarySchoolInput,
  };

  const secondaryStudies = {
    startDate: secondarySDInput.value,
    endDate: secondaryEDInput.value,
    school: secondarySchoolInput,
  };

  const tertiaryStudies = [];
  tertiarySDInputs.forEach((el, idx) => {
    tertiaryStudies.push({
      startDate: el.value,
      endDate: tertiaryEDInputs[idx].value,
      description: tertiaryDescriptionInputs[idx].value,
      institute: tertiaryInstituteInputs[idx].value,
    });
  });

  const universityStudies = [];
  universitySDInputs.forEach((el, idx) => {
    universityStudies.push({
      startDate: el.value,
      endDate: universityEDInputs[idx].value,
      description: universityDescriptionInputs[idx].value,
      institute: universityInstituteInputs[idx].value,
    });
  });

  const informalStudies = [];
  informalSDInputs.forEach((el, idx) => {
    informalStudies.push({
      startDate: el.value,
      endDate: informalEDInputs[idx].value,
      description: informalDescriptionInputs[idx].value,
      institute: informalInstituteInputs[idx].value,
    });
  });

  return {
    primaryStudies,
    secondaryStudies,
    tertiaryStudies,
    universityStudies,
    informalStudies,
  };
};

const addNewSection = (ev) => {
  const firstSection = ev.target.parentElement.nextElementSibling;
  const newSection = document.createElement('section');
  newSection.innerHTML = firstSection.innerHTML;
  ev.target.parentElement.parentElement.append(newSection);
};

addFieldButtons.forEach((el) => el.addEventListener('click', addNewSection));

fillProfiles();

// if (postulantId) {
//   positionInput.disabled = true;
//   postulantInput.disabled = true;
//   interviewInput.disabled = true;
//   resultInput.disabled = true;
//   saveButton.value = 'Back';
//   fetch(`${window.location.origin}/api/postulants?_id=${postulantId}`)
//     .then((response) => {
//       if (response.status !== 200) {
//         return response.json().then(({ message }) => {
//           throw new Error(message);
//         });
//       }
//       return response.json();
//     })
//     .then((response) => {
//       saveButton.disabled = false;
//       response.data.forEach((postulant) => {
//         // eslint-disable-next-line no-underscore-dangle
//         positionInput.value = postulant?.positions?._id;
//         // eslint-disable-next-line no-underscore-dangle
//         postulantInput.value = postulant?.postulants?._id;
//         // eslint-disable-next-line no-underscore-dangle
//         interviewInput.value = postulant?.interview?._id;
//         resultInput.value = postulant.result;
//       });
//     })
//     .catch((error) => {
//       errorMessage.innerText = error;
//     });
// }

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
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
      address: addressInput.value,
      birthday: birthdayInput.value,
      available: availableInput.value,
      phone: phoneInput.value,
      profiles: profilesBodyContructor(),
      'contactRange.from': contactFromInput.value,
      'contactRange.to': contactToInput.value,
      studies: studiesBodyConstructor(),
      workExperience: workExperienceBodyConstructor(),
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
