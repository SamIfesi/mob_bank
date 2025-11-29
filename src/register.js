const qa = (s) => document.querySelectorAll(s);
const id = (id) => document.getElementById(id);

const emailform = id("email-form");
const nameform = id("name-form");
const passwordform = id("password-form");
const confirmPswdform = id("confirm-Pswd-form");
const username = id("username");
const email = id("email");
const fullname = id("fullname");
const cfmPassword = id("cfm-password");
const password = id("password");
const msgSuccess = id("msg-success");
const emailMsg = id("email-error");
const fullnameMsg = id("fullname-error");
const userMsg = id("user-error");
const pwdMsg = id("password-error");
const cfmPwdMsg = id("cfm-psd-error");
const checker = qa(".psd-check");

const backPsd = id("backPsd");
const backName = id("backName");
const backEmail = id("backEmail");
const backLogin = id("backLogin");

async function registerUsers() {
  //  Email form submission
  if (emailform) {
    emailform.addEventListener("submit", (e) => {
      e.preventDefault();
      let emailValue = email.value.toLowerCase().trim();
      const emailPattern = /^[A-Za-z\d._%+-]+@[A-Za-z\d.-]+\.[A-Za-z]{2,}$/;

      let valid = true;
      emailMsg.textContent = "";
      emailMsg.classList.remove("showMsg");

      const validation = [
        {
          condition: emailValue.length === 0,
          message: "Email is required.",
          element: emailMsg,
        },
        {
          condition: !emailPattern.test(emailValue),
          message: "Invalid email address.",
          element: emailMsg,
        },
      ];

      if (email) {
        for (const validate of validation) {
          if (validate.condition) {
            valid = false;
            validate.element.textContent = validate.message;
            validate.element.classList.add("showMsg");
            break;
          }
        }
      }

      if (valid) {
        emailMsg.textContent = "";
        emailMsg.classList.remove("showMsg");
        console.log("Email form is valid");
        emailform.classList.add("hide");
        loader.classList.remove("hide");
        setTimeout(() => {
          loader.classList.add("hide");
          nameform.classList.remove("hide");
        }, 2000);
      }
      localStorage.setItem("email", emailValue);
    });
  }

  //   Name form submission
  if (nameform) {
    nameform.addEventListener("submit", (e) => {
      e.preventDefault();
      let nameValue = fullname.value.toLowerCase().trim();
      let usernameValue = username.value.toLowerCase().trim();
      const namePattern = /^[\p{L}\s'-]+$/u;
      const userPattern = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/;

      let valid = true;
      fullnameMsg.textContent = "";
      userMsg.textContent = "";
      fullnameMsg.classList.remove("showMsg");
      userMsg.classList.remove("showMsg");

      const validation = [
        {
          condition: nameValue.length === 0,
          message: "Fullname is required.",
          element: fullnameMsg,
        },
        {
          condition: nameValue.length > 0 && !namePattern.test(nameValue),
          message: "Invalid fullname.",
          element: fullnameMsg,
        },
        {
          condition: usernameValue.length === 0,
          message: "Username is required.",
          element: userMsg,
        },
        {
          condition:
            usernameValue.length > 0 && !userPattern.test(usernameValue),
          message: "Invalid username.",
          element: userMsg,
        },
      ];

      if (fullname) {
        for (const validate of validation) {
          if (validate.condition) {
            valid = false;
            validate.element.textContent = validate.message;
            validate.element.classList.add("showMsg");
          }
        }
      }

      if (valid) {
        fullnameMsg.textContent = "";
        userMsg.textContent = "";
        fullnameMsg.classList.remove("showMsg");
        userMsg.classList.remove("showMsg");

        console.log("Fullname form is valid");
        nameform.classList.add("hide");
        loader.classList.remove("hide");
        setTimeout(() => {
          loader.classList.add("hide");
          passwordform.classList.remove("hide");
        }, 2000);
      }
      localStorage.setItem("fullname", nameValue);
      localStorage.setItem("username", usernameValue);
    });
  }

  //  password form submission
  if (passwordform) {
    const pswdPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[\W_]).{8,}$/;
    password.addEventListener("input", () => {
      let pwdValue = password.value;

      checker.forEach((check) => {
        if (check.textContent.includes("Minimum 8 characters")) {
          check.classList.toggle("valid", pwdValue.length >= 8);
        }
        if (check.textContent.includes("1 uppercase character")) {
          check.classList.toggle("valid", /[A-Z]/.test(pwdValue));
        }
        if (check.textContent.includes("1 lowercase character")) {
          check.classList.toggle("valid", /[a-z]/.test(pwdValue));
        }
        if (check.textContent.toLowerCase().includes("1 number character")) {
          check.classList.toggle("valid", /[\d]/.test(pwdValue));
        }
        if (check.textContent.includes("Atleast 1 special character")) {
          check.classList.toggle("valid", /[\W_]/.test(pwdValue));
        }
      });
      pwdMsg.textContent = "";
      pwdMsg.classList.remove("showMsg");
    });

    passwordform.addEventListener("submit", (e) => {
      e.preventDefault();
      let pwdValue = password.value;

      let valid = true;
      pwdMsg.textContent = "";
      pwdMsg.classList.remove("showMsg");

      const validation = [
        {
          condition: pwdValue.length === 0,
          message: "Password is required.",
          element: pwdMsg,
        },
        {
          condition: pwdValue.length > 0 && !pswdPattern.test(pwdValue),
          message: "Password must meet all requirements.",
          element: pwdMsg,
        },
      ];

      if (password) {
        for (const validate of validation) {
          if (validate.condition) {
            valid = false;
            validate.element.textContent = validate.message;
            validate.element.classList.add("showMsg");
          }
        }
      }

      if (valid) {
        pwdMsg.textContent = "";
        pwdMsg.classList.remove("showMsg");
        console.log("Password form is valid");
        passwordform.classList.add("hide");
        loader.classList.remove("hide");
        setTimeout(() => {
          loader.classList.add("hide");
          confirmPswdform.classList.remove("hide");
        }, 2000);
      }
      localStorage.setItem("password", pwdValue);
    });
  }

  // Confirm password form submission
  if (confirmPswdform) {
    confirmPswdform.addEventListener("submit", (e) => {
      e.preventDefault();
      let cfmPsdValue = cfmPassword.value;
      let pswdValue = password.value;

      let valid = true;
      cfmPwdMsg.textContent = "";
      cfmPwdMsg.classList.remove("showMsg");

      const validation = [
        {
          condition: cfmPsdValue.length === 0,
          message: "Confirm Password is required.",
          element: cfmPwdMsg,
        },
        {
          condition: cfmPsdValue !== pswdValue,
          message: "Passwords do not match.",
          element: cfmPwdMsg,
        },
      ];

      if (cfmPassword) {
        for (const validate of validation) {
          if (validate.condition) {
            valid = false;
            validate.element.textContent = validate.message;
            validate.element.classList.add("showMsg");
            break;
          }
        }
      }

      if (valid) {
        cfmPwdMsg.textContent = "";
        cfmPwdMsg.classList.remove("showMsg");
        console.log("Confirm Password form is valid");

        confirmPswdform.classList.add("hide");
        loader.classList.remove("hide");

        const storedEmail = localStorage.getItem("email"); 

        if (storedEmail.toLowerCase() === email.value.toLowerCase()) {
          
          cfmPwdMsg.classList.add("showMsg");
          cfmPwdMsg.innerText = "This Email already has an account. Please Login.";
          loader.classList.add("hide");
          confirmPswdform.classList.remove("hide"); 
        } else {
          msgSuccess.innerText = "Creating your Account in a moment";
          setTimeout(() => {
            msgSuccess.innerText = "Account created successfully!";
            setTimeout(() => {
              loader.classList.add("hide");
              window.location.href = "/pages/home.html";
            }, 3000);
          }, 1500);
        }
      }
    });
  }
}
registerUsers();

// Back buttons functionality
if (backPsd) {
  backPsd.addEventListener("click", () => {
    loader.classList.remove("hide");
    confirmPswdform.classList.add("hide");
    setTimeout(() => {
      loader.classList.add("hide");
      passwordform.classList.remove("hide");
    }, 2000);
  });
}
if (backName) {
  backName.addEventListener("click", () => {
    loader.classList.remove("hide");
    confirmPswdform.classList.add("hide");
    setTimeout(() => {
      loader.classList.add("hide");
      passwordform.classList.remove("hide");
    }, 2000);
  });
}
if (backEmail) {
  backEmail.addEventListener("click", () => {
    loader.classList.remove("hide");
    nameform.classList.add("hide");
    setTimeout(() => {
      loader.classList.add("hide");
      emailform.classList.remove("hide");
    }, 2000);
  });
}
if (backLogin) {
  backLogin.addEventListener("click", () => {
    loader.classList.remove("hide");
    emailform.classList.add("hide");
    setTimeout(() => {
      loader.classList.add("hide");
      window.location.href = "/index.html";
    }, 2000);
  });
}
