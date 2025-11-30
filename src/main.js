import "./style.css";
import "./home.css";
import "./send.css";

const id = (id) => document.getElementById(id);
const qa = (s) => document.querySelectorAll(s);
const q = (s) => document.querySelector(s);

const userLoginForm = id("userLogin-form");
const pswdLoginForm = id("pswdLogin-form");
const regBtn = id("register");
const username = id("username");
const password = id("password");
const cfmPassword = id("cfm-password");
const psdShow = id("psdShow");
const cfmPsdShow = id("iconCmf-psdShow");
const msgSuccess = id("msg-success");
const userMsg = id("user-error");
const pwdMsg = id("password-error");
const balance = id("bal");
const eye = id("balShow");
const backBtn = id("backBtn");
const sendBtn = id("sendBtn");
const receiveBtn = id("receiveBtn");
const withdrawBtn = id("withdrawBtn");
const moreBtn = id("moreBtn");
const recipientInput = id("recipient");
const msg = id("msg");
const loader = id("loader");
const backToLogin = id("backToLogin");

import "./register.js";

// Navigate back to home page
if (backBtn) {
  backBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "/pages/home.html";
  });
}

// Navigate to registration page
if (regBtn) {
  regBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "/pages/register.html";
  });
}

if (backToLogin) {
  backToLogin.addEventListener("click", () => {
    loader.classList.remove("hide");
    pswdLoginForm.classList.add("hide");
    setTimeout(() => {
      loader.classList.add("hide");
      userLoginForm.classList.remove("hide");
    }, 2000);
  });
}

// Password show/hide toggle
if (psdShow) {
  psdShow.addEventListener("click", (e) => {
    const eye = e.target;
    if (
      eye.classList.contains("ti-eye") &&
      !eye.classList.contains("ti-eye-off") &&
      password.type === "password"
    ) {
      eye.classList.replace("ti-eye", "ti-eye-off");
      password.type = "text";
    } else {
      eye.classList.replace("ti-eye-off", "ti-eye");
      password.type = "password";
    }
  });
}
// Confirm Password show/hide toggle
if (cfmPsdShow) {
  cfmPsdShow.addEventListener("click", (e) => {
    const eye = e.target;
    if (
      eye.classList.contains("ti-eye") &&
      !eye.classList.contains("ti-eye-off") &&
      cfmPassword.type === "password"
    ) {
      eye.classList.replace("ti-eye", "ti-eye-off");
      cfmPassword.type = "text";
    } else {
      eye.classList.replace("ti-eye-off", "ti-eye");
      cfmPassword.type = "password";
    }
  });
}

// For the dashboard
const user = id("user-name");
if (user) {
  const userStored = JSON.parse(sessionStorage.getItem("tempUser"));
  const userValue = userStored ? userStored.username : null;
  user.innerText = userValue || "Guest";
}

// Store the original balance text
let originalBalance;

if (balance) {
  let savedState = sessionStorage.getItem("balanceState");
  originalBalance = balance.innerText;
  if (savedState === "hidden") {
    balance.innerText = "****** . **";
    eye.classList.replace("ti-eye-off", "ti-eye");
  } else {
    balance.innerText = originalBalance;
    eye.classList.replace("ti-eye", "ti-eye-off");
  }
}

// Balance show/hide toggle
if (eye) {
  eye.addEventListener("click", () => {
    if (balance.innerText === originalBalance) {
      // Hide balance
      balance.innerText = "****** . **";
      eye.classList.replace("ti-eye-off", "ti-eye");
      sessionStorage.setItem("balanceState", "hidden");
    } else {
      // Show balance
      balance.innerText = originalBalance;
      eye.classList.replace("ti-eye", "ti-eye-off");
      sessionStorage.setItem("balanceState", "visible");
    }
  });
}

// home.js navigation
if (sendBtn) {
  sendBtn.addEventListener("click", () => {
    console.log(`Hello user you just click send`);
    window.location.href = "/pages/send.html";
  });
}
if (receiveBtn) {
  receiveBtn.addEventListener("click", () => {
    console.log(`Hello user you just click receive`);
    window.location.href = "/pages/receive.html";
  });
}
if (withdrawBtn) {
  withdrawBtn.addEventListener("click", () => {
    console.log(`Hello user you just click withdraw`);
    window.location.href = "/pages/withdraw.html";
  });
}
if (moreBtn) {
  moreBtn.addEventListener("click", () => {
    console.log(`Hello user you just click more`);
    window.location.href = "/pages/more.html";
  });
}

// Quick amount buttons in send.html
const quickAmountBtns = qa(".quick-btn");
const amountInput = id("amount");
if (quickAmountBtns) {
  quickAmountBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      amountInput.value = btn.dataset.amount;
    });
  });
}

if (recipientInput) {
  recipientInput.addEventListener("input", () => {
    if (recipientInput.value.length < 10) {
      msg.textContent = "Recipient account number too short!";
    } else {
      msg.textContent = "";
    }
  });
}
// Check if user is authenticated
function checkAuth() {
  const userDetail = JSON.parse(sessionStorage.getItem("tempUser"));
  const user = userDetail ? userDetail.password && userDetail.username : null;

  // Get current page path
  const currentPage = window.location.pathname;

  const publicPages = ["/", "/index.html", "/pages/register.html"];

  if (!user && !publicPages.includes(currentPage)) {
    window.location.href = "/index.html";
  }
}
checkAuth();

async function loginUsers() {
  // Username form for Login
  if (userLoginForm) {
    userLoginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const usernameValue = username.value.toLowerCase().trim();
      const userPattern = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/;

      let valid = true;
      userMsg.textContent = "";
      userMsg.classList.remove("showMsg");

      // Get userDatabase from localStorage
      const userDB = JSON.parse(localStorage.getItem("userDatabase")) || [];

      // Check if username exists in the database
      const userExists = userDB.find((user) => user.username === usernameValue);

      const validation = [
        {
          condition: usernameValue === "",
          message: "Username is required",
          element: userMsg,
        },
        {
          condition: usernameValue !== "" && !userPattern.test(usernameValue),
          message: "Invalid username.",
          element: userMsg,
        },
        {
          condition: usernameValue !== "" && !userExists,
          message: "Username not found. Please register.",
          element: userMsg,
        },
      ];

      for (const validate of validation) {
        if (validate.condition) {
          valid = false;
          validate.element.textContent = validate.message;
          validate.element.classList.add("showMsg");
          break;
        }
      }

      if (valid) {
        userMsg.textContent = "";
        userMsg.classList.remove("showMsg");
        console.log("Username form is valid");
        userLoginForm.classList.add("hide");
        loader.classList.remove("hide");

        // Store the matched user data for password verification
        sessionStorage.setItem("tempUser", JSON.stringify(userExists));

        setTimeout(() => {
          loader.classList.add("hide");
          pswdLoginForm.classList.remove("hide");
        }, 2000);
      }
    });
  }

  if (pswdLoginForm) {
    pswdLoginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const pswdValue = password.value;
      const pswdMatchedUser = JSON.parse(sessionStorage.getItem("tempUser"));
      const matchedPassword = pswdMatchedUser ? pswdMatchedUser.password : null;

      let valid = true;
      pwdMsg.textContent = "";
      pwdMsg.classList.remove("showMsg");

      const validation = [
        {
          condition: pswdValue === "",
          message: "Password is required",
          element: pwdMsg,
        },
        {
          condition: pswdValue !== "" && pswdValue !== matchedPassword,
          message: "Password does not match.",
          element: pwdMsg,
        },
      ];

      for (let validate of validation) {
        if (validate.condition) {
          valid = false;
          validate.element.textContent = validate.message;
          validate.element.classList.add("showMsg");
          break;
        }
      }

      if (valid) {
        pwdMsg.textContent = "";
        pwdMsg.classList.remove("showMsg");
        console.log("Password form is valid");
        pswdLoginForm.classList.add("hide");
        loader.classList.remove("hide");

        msgSuccess.innerText = "Logging In...";
        setTimeout(() => {
          msgSuccess.innerText = `Welcome back, ${pswdMatchedUser.username}!`;
          setTimeout(() => {
            // Store username in sessionStorage
            sessionStorage.setItem("username", pswdMatchedUser.username);
            window.location.href = "/pages/home.html";
            loader.classList.add("hide");
          }, 2000);
        }, 1500);
      }
    });
  }
}
loginUsers();
