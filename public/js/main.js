const validateForm = (formId, validationRules) => {
  const form = document.getElementById(formId);

  validationRules.forEach((rule) => {
    const input = document.getElementById(rule.inputId);

    // Add 'input' event listener for live validation
    input.addEventListener("input", () => {
      validateInput(input, rule.regex);
    });
  });

  // Add 'submit' event listener for form submission validation
  form.addEventListener("submit", (event) => {
    let isValid = true;

    // Loop through each validation rule
    validationRules.forEach((rule) => {
      const input = document.getElementById(rule.inputId);

      // Validate input and accumulate overall form validity
      if (!validateInput(input, rule.regex)) {
        isValid = false;
      }
    });

    // Prevent form submission if any input is invalid
    if (!isValid) {
      event.preventDefault();
      event.stopPropagation();
    }
  });
};

// Helper function to validate individual input and provide feedback
const validateInput = (input, regex) => {
  if (!regex.test(input.value)) {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  } else {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    return true;
  }
};

const nameRegex = /^[a-zA-Z]{3,20}$/;
const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

validateForm("addForm", [
  { inputId: "name", regex: nameRegex },
  { inputId: "email", regex: emailRegex },
  { inputId: "password", regex: passwordRegex },
]);

validateForm("updateForm", [
  { inputId: "userName", regex: nameRegex },
  { inputId: "userEmail", regex: emailRegex },
  { inputId: "userPassword", regex: passwordRegex },
]);

const openUpdateModal = (id, name, email, password) => {
  // Set form values in the modal
  document.getElementById("userId").value = id;
  document.getElementById("userName").value = name;
  document.getElementById("userEmail").value = email;
  document.getElementById("userPassword").value = password;
};
