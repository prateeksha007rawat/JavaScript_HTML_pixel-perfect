document.addEventListener("DOMContentLoaded", function () {
  // Add smooth scrolling to all links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Add random color border for teams view
  const colors = ["#FFE4E1	", "#E6E6FA", "#FFDAB9", "#F0FFF0", "#FFFACD	"];
  const boxes = document.querySelectorAll(".member-avatar");
  boxes.forEach((box) => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    box.style.backgroundColor = randomColor;
  });

  // Modal functionality
  const signUpBtn = document.getElementById("signUpBtn");
  const signInBtn = document.getElementById("signInBtn");
  const closeModal = document.getElementById("closeModal");
  const closeSignInModal = document.getElementById("closeSignInModal");
  const signUpModal = document.getElementById("signUpModal");
  const signInModal = document.getElementById("signInModal");
  const switchToSignIn = document.getElementById("switchToSignIn");
  const switchToSignUp = document.getElementById("switchToSignUp");

  // Open Sign Up Modal
  signUpBtn.addEventListener("click", function (e) {
    e.preventDefault();
    signUpModal.style.display = "flex";
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  });

  // Open Sign In Modal
  signInBtn.addEventListener("click", function (e) {
    e.preventDefault();
    signInModal.style.display = "flex";
    document.body.style.overflow = "hidden";
  });

  // Close Sign Up Modal
  closeModal.addEventListener("click", function () {
    signUpModal.style.display = "none";
    document.body.style.overflow = "";
  });

  // Close Sign In Modal
  closeSignInModal.addEventListener("click", function () {
    signInModal.style.display = "none";
    document.body.style.overflow = "";
  });

  // Close modal when clicking outside
  window.addEventListener("click", function (e) {
    if (e.target === signUpModal) {
      signUpModal.style.display = "none";
      document.body.style.overflow = "";
    }
    if (e.target === signInModal) {
      signInModal.style.display = "none";
      document.body.style.overflow = "";
    }
  });

  // Switch between modals
  switchToSignIn.addEventListener("click", function (e) {
    e.preventDefault();
    signUpModal.style.display = "none";
    signInModal.style.display = "flex";
  });

  switchToSignUp.addEventListener("click", function (e) {
    e.preventDefault();
    signInModal.style.display = "none";
    signUpModal.style.display = "flex";
  });

  // Form validation
  const signUpForm = document.getElementById("signUpForm");
  const signInForm = document.getElementById("signInForm");

  // Sign Up Form Validation
  signUpForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    // Full Name validation
    const fullName = document.getElementById("fullName");
    const fullNameError = document.getElementById("fullNameError");

    if (fullName.value.trim() === "") {
      showError(fullName, fullNameError, "Please enter your full name");
      isValid = false;
    } else {
      hideError(fullName, fullNameError);
    }

    // Email validation
    const email = document.getElementById("email");
    const emailError = document.getElementById("emailError");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.value)) {
      showError(email, emailError, "Please enter a valid email address");
      isValid = false;
    } else {
      hideError(email, emailError);
    }

    // Password validation
    const password = document.getElementById("password");
    const passwordError = document.getElementById("passwordError");

    if (password.value.length < 8) {
      showError(
        password,
        passwordError,
        "Password must be at least 8 characters"
      );
      isValid = false;
    } else {
      hideError(password, passwordError);
    }

    // Confirm Password validation
    const confirmPassword = document.getElementById("confirmPassword");
    const confirmPasswordError = document.getElementById(
      "confirmPasswordError"
    );

    if (password.value !== confirmPassword.value) {
      showError(
        confirmPassword,
        confirmPasswordError,
        "Passwords do not match"
      );
      isValid = false;
    } else {
      hideError(confirmPassword, confirmPasswordError);
    }

    // If form is valid, submit the form (in this case, just show an alert)
    if (isValid) {
      alert("Account created successfully!");
      signUpForm.reset();
      signUpModal.style.display = "none";
      document.body.style.overflow = "";
    }
  });

  // Sign In Form Validation
  signInForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    // Email validation
    const loginEmail = document.getElementById("loginEmail");
    const loginEmailError = document.getElementById("loginEmailError");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(loginEmail.value)) {
      showError(
        loginEmail,
        loginEmailError,
        "Please enter a valid email address"
      );
      isValid = false;
    } else {
      hideError(loginEmail, loginEmailError);
    }

    // Password validation
    const loginPassword = document.getElementById("loginPassword");
    const loginPasswordError = document.getElementById("loginPasswordError");

    if (loginPassword.value === "") {
      showError(
        loginPassword,
        loginPasswordError,
        "Please enter your password"
      );
      isValid = false;
    } else {
      hideError(loginPassword, loginPasswordError);
    }

    // If form is valid, submit the form (in this case, just show an alert)
    if (isValid) {
      alert("Signed in successfully!");
      signInForm.reset();
      signInModal.style.display = "none";
      document.body.style.overflow = "";
    }
  });

  // Helper functions for form validation
  function showError(input, errorElement, errorMessage) {
    input.classList.add("error");
    errorElement.textContent = errorMessage;
    errorElement.style.display = "block";
  }

  function hideError(input, errorElement) {
    input.classList.remove("error");
    errorElement.style.display = "none";
  }

  // Real-time validation for better user experience
  const formInputs = document.querySelectorAll(".form-input");

  formInputs.forEach((input) => {
    input.addEventListener("input", function () {
      const errorElement = document.getElementById(`${this.id}Error`);

      // Remove error styling as user types
      if (this.value.trim() !== "") {
        hideError(this, errorElement);
      }

      // Real-time password match validation
      if (this.id === "confirmPassword" || this.id === "password") {
        const password = document.getElementById("password");
        const confirmPassword = document.getElementById("confirmPassword");
        const confirmPasswordError = document.getElementById(
          "confirmPasswordError"
        );

        if (
          confirmPassword.value !== "" &&
          password.value !== confirmPassword.value
        ) {
          showError(
            confirmPassword,
            confirmPasswordError,
            "Passwords do not match"
          );
        } else if (confirmPassword.value !== "") {
          hideError(confirmPassword, confirmPasswordError);
        }
      }
    });
  });
});
