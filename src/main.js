import "./style.css";
import "./home.css";
import "./send.css";

const id = (id) => document.getElementById(id);
const qa = (s) => document.querySelectorAll(s);
const q = (s) => document.querySelector(s);

const regBtn = id("register");
const logBtn = id("login");
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
};

// Login form submission
if (logBtn) {
  logBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const userValue = username.value;
    const pswdValue = password.value;

    if (!userValue || !pswdValue) {
      if (!userValue) {
        userMsg.innerText = "Username is required";
      } else {
        userMsg.innerText = "";
      }

      if (!pswdValue) {
        pwdMsg.innerText = "Password is required";
      } else {
        pwdMsg.innerText = "";
      }
      return;
    }

    if (userValue.length < 3) {
      userMsg.innerText = "Invalid Username";
    } else {
      userMsg.innerText = "";
    }
    if (pswdValue.length < 6) {
      pwdMsg.innerText = "Invalid Password";
    } else {
      pwdMsg.innerText = "";
    }
    if (userValue.length < 3 || pswdValue.length < 6) {
      return;
    }

    // Store username and password in sessionStorage
    sessionStorage.setItem("username", userValue);
    sessionStorage.setItem("password", pswdValue);

    msgSuccess.innerText = "Logging In...";
    setTimeout(() => {
      msgSuccess.innerText = `Welcome back, ${userValue}!`;

      setTimeout(() => {
        window.location.href = "/pages/home.html";
      }, 2000);
    }, 1500);
    username.value = "";
    password.value = "";
  });
}

// For the dashboard
const user = id("user-name");
if (user) {
  const userValue = localStorage.getItem("username");
  user.innerText = userValue;
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
// function checkAuth() {
//   const username = sessionStorage.getItem("username");
//   const password = sessionStorage.getItem("password");

//   // Get current page path
//   const currentPage = window.location.pathname;

//   const publicPages = ["/", "/index.html", "/pages/register.html"];

//   if ((!username || !password) && !publicPages.includes(currentPage)) {
//     window.location.href = "/index.html";
//   }
// }
// checkAuth();
