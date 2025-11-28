import "./send.css";
import "./home.css";
import "./style.css";
const id = (id) => document.getElementById(id);
const qa = (s) => document.querySelectorAll(s);
const q = (s) => document.querySelector(s);

const regBtn = id("register");
const logBtn = id("login");
const username = id("username");
const password = id("password");
const psdShow = id("psdShow");
const msgSuccess = id("msg");
const userMsg = id("user-error");
const pwdMsg = id("password-error");
const balanceEl = id("bal");
const toggleBal = id("toggleBal");
const eyeOpen = id("bal-eye");
const eyeClosed = id("bal-eye-off");
const backBtn = id("backBtn");
const sendBtn = id("sendBtn");
const receiveBtn = id("receiveBtn");
const withdrawBtn = id("withdrawBtn");
const moreBtn = id("moreBtn");
const recipientInput = id("recipient");
const msg = id("msg");

if (backBtn) {
  backBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "/components/home.html";
  });
}

if (regBtn) {
  regBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "/components/register.html";
  });
}

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
        window.location.href = "/components/home.html";
      }, 2000);
    }, 1500);
    username.value = "";
    password.value = "";
  });
}

// For the dashboard
const user = id("user-name");
if (user) {
  const userValue = sessionStorage.getItem("username");
  user.innerText = userValue;
}

// Store the original balance text
if (balanceEl) {
  const originalBalance = balanceEl.textContent;
  // Check sessionStorage for saved state of the Balance
  let savedState = sessionStorage.getItem("balanceState");
  if (savedState === "hidden") {
    balanceEl.textContent = "****** . **";
    eyeOpen.classList.remove("hide");
    eyeClosed.classList.add("hide");
  } else {
    balanceEl.textContent = originalBalance;
    eyeOpen.classList.add("hide");
    eyeClosed.classList.remove("hide");
  }
}

if (toggleBal) {
  toggleBal.addEventListener("click", () => {
    if (balanceEl.textContent === originalBalance) {
      // Hide balance
      balanceEl.textContent = "****** . **";
      eyeOpen.classList.remove("hide");
      eyeClosed.classList.add("hide");
      sessionStorage.setItem("balanceState", "hidden");
    } else {
      // Show balance
      balanceEl.textContent = originalBalance;
      eyeOpen.classList.add("hide");
      eyeClosed.classList.remove("hide");
      sessionStorage.setItem("balanceState", "visible");
    }
  });
}

// home.js navigation
if (sendBtn) {
  sendBtn.addEventListener("click", () => {
    console.log(`Hello user you just click send`);
    window.location.href = "/components/send.html";
  });
}
if (receiveBtn) {
  receiveBtn.addEventListener("click", () => {
    console.log(`Hello user you just click receive`);
    window.location.href = "/components/receive.html";
  });
}
if (withdrawBtn) {
  withdrawBtn.addEventListener("click", () => {
    console.log(`Hello user you just click withdraw`);
    window.location.href = "/components/withdraw.html";
  });
}
if (moreBtn) {
  moreBtn.addEventListener("click", () => {
    console.log(`Hello user you just click more`);
    window.location.href = "/components/more.html";
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

recipientInput.addEventListener("input", () => {
  if (recipientInput.value.length < 10) {
    msg.textContent = "Recipient account number too short!";
  } else {
    msg.textContent = "";
  }
});

// Check if user is authenticated
function checkAuth() {
  const username = sessionStorage.getItem("username");
  const password = sessionStorage.getItem("password");

  // Get current page path
  const currentPage = window.location.pathname;

  const publicPages = ["/", "/index.html", "/components/register.html"];

  if ((!username || !password) && !publicPages.includes(currentPage)) {
    window.location.href = "/index.html";
  }
}
checkAuth();
