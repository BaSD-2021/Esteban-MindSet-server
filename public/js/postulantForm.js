const navButton = document.getElementById('postulantsNav');
navButton.classList.add('activePage');

const params = new URLSearchParams(window.location.search);
const postulantId = params.get('id');

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
const tertiarySection = document.querySelector('#tertiaryStudies div.flex');
const tertiarySDInputs = document.querySelectorAll('.tertiarySD');
const tertiaryEDInputs = document.querySelectorAll('.tertiaryED');
const tertiaryDescriptionInputs = document.querySelectorAll('.tertiaryDescription');
const tertiaryInstituteInputs = document.querySelectorAll('.tertiaryInstitute');
const universitySection = document.querySelector('#universityStudies div.flex');
const universitySDInputs = document.querySelectorAll('.universitySD');
const universityEDInputs = document.querySelectorAll('.universityED');
const universityDescriptionInputs = document.querySelectorAll('.universityDescription');
const universityInstituteInputs = document.querySelectorAll('.universityInstitute');
const informalSection = document.querySelector('#informalStudies div.flex');
const informalSDInputs = document.querySelectorAll('.informalSD');
const informalEDInputs = document.querySelectorAll('.informalED');
const informalDescriptionInputs = document.querySelectorAll('.informalDescription');
const informalInstituteInputs = document.querySelectorAll('.informalInstitute');
const workExperienceSection = document.querySelector('#workExperience div.flex');
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
        input.checked = (postulantProfiles ?? [false]).find((obj) => obj.profileId === id);
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

const addNewSection = (parent) => {
  const firstSection = parent.nextElementSibling;
  const newSection = document.createElement('section');
  newSection.innerHTML = firstSection.innerHTML;
  parent.parentElement.append(newSection);
};

const studiesHTMLConstructor = (studies) => {
  primarySDInput.value = studies.primaryStudies.startDate;
  primaryEDInput.value = studies.primaryStudies.endDate;
  primarySchoolInput.value = studies.primaryStudies.school;

  secondarySDInput.value = studies.secondaryStudies.startDate;
  secondaryEDInput.value = studies.secondaryStudies.endDate;
  secondarySchoolInput.value = studies.secondaryStudies.school;

  for (let i = 1; i < studies.tertiaryStudies.length; i += 1) {
    addNewSection(tertiarySection);
  }

  studies.tertiaryStudies.forEach((el, idx) => {
    tertiarySDInputs[idx].value = el.startDate;
    tertiaryEDInputs[idx].value = el.endDate;
    tertiaryDescriptionInputs[idx].value = el.description;
    tertiaryInstituteInputs[idx].value = el.institute;
  });

  for (let i = 1; i < studies.universityStudies.length; i += 1) {
    addNewSection(universitySection);
  }

  studies.universityStudies.forEach((el, idx) => {
    universitySDInputs[idx].value = el.startDate;
    universityEDInputs[idx].value = el.endDate;
    universityDescriptionInputs[idx].value = el.description;
    universityInstituteInputs[idx].value = el.institute;
  });

  for (let i = 1; i < studies.informalStudies.length; i += 1) {
    addNewSection(informalSection);
  }

  studies.informalStudies.forEach((el, idx) => {
    informalSDInputs[idx].value = el.startDate;
    informalEDInputs[idx].value = el.endDate;
    informalDescriptionInputs[idx].value = el.description;
    informalInstituteInputs[idx].value = el.institute;
  });
};

const workExperienceHTMLConstructor = (workExperience) => {
  for (let i = 1; i < workExperience.length; i += 1) {
    addNewSection(workExperienceSection);
  }

  workExperience.forEach((el, idx) => {
    workExperienceSDInputs[idx].value = el.startDate;
    workExperienceEDInputs[idx].value = el.endDate;
    workExperienceDescriptionInputs[idx].value = el.description;
    workExperienceCompanyInputs[idx].value = el.company;
  });
};

addFieldButtons.forEach((el) => el.addEventListener('click', (ev) => addNewSection(ev.target.parentElement)));

if (postulantId) {
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
        firstNameInput.value = postulant.firstName;
        lastNameInput.value = postulant.lastName;
        emailInput.value = postulant.email;
        passwordInput.value = postulant.password;
        addressInput.value = postulant.address;
        birthdayInput.value = postulant.birthday;
        availableInput.value = postulant.available;
        phoneInput.value = postulant.phone;
        fillProfiles(postulant.profiles);
        contactFromInput.value = postulant.contactRange?.from;
        contactToInput.value = postulant.contactRange?.to;
        studiesHTMLConstructor(postulant.studies);
        workExperienceHTMLConstructor(postulant.workExperience);
      });
    })
    .catch((error) => {
      errorMessage.innerText = error;
    });
} else {
  fillProfiles();
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

  options.method = 'POST';
  url = `${window.location.origin}/api/postulants`;

  if (postulantId) {
    options.method = 'PUT';
    url = `${window.location.origin}/api/postulants/${postulantId}`;
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
      window.location.href = `${window.location.origin}/views/postulantList.html`;
    })
    .catch((error) => {
      errorMessage.innerText = error;
    })
    .finally(() => {
      saveButton.disabled = false;
    });
};
