const id = (id) => document.getElementById(id);
const className = (s) => document.getElementsByClassName(s);
const q = (s) => document.querySelector(s);

const form = q("form");
const regBtn = id("register");
const logBtn = id("login");
const username = id("username");
const password = id("password");
const psdShow = id("psdShow");
const msgSuccess = id("msg");
const userMsg = id("user-error");
const pwdMsg = id("password-error");

if (regBtn) {
  regBtn.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "register.html";
  });
}

if (psdShow) {
  psdShow.addEventListener("click", (e) => {
    const eye = e.target;
    if (eye.classList.contains("ti-eye")) {
      eye.classList.remove("ti-eye");
      eye.classList.add("ti-eye-off");
      if (password.type === "password") {
        password.type = "text";
      } else {
        password.type = "password";
      }
    } else {
      eye.classList.remove("ti-eye-off");
      eye.classList.add("ti-eye");
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
        window.location.href = "home.html";
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

const balanceEl = id("bal");
const toggleBal = id("toggleBal");
const eyeOpen = toggleBal.querySelector(".ti-eye");
const eyeClosed = toggleBal.querySelector(".ti-eye-off");

// Store the original balance text
const originalBalance = balanceEl.textContent;
// Check sessionStorage for saved state of the Balance
let savedState = sessionStorage.getItem("balanceState");
if (savedState === "hidden") {
  balanceEl.textContent = "****** . **";
  eyeOpen.classList.remove("hide");
  eyeClosed.classList.add("hide");
}else {
  balanceEl.textContent = originalBalance;
  eyeOpen.classList.add("hide");
  eyeClosed.classList.remove("hide");
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
const sendBtn = id("sendBtn");
if (sendBtn) {
  sendBtn.addEventListener("click", () => {
    console.log(`Hello user you just click send`);
    window.location.href = "send.html";
  });
}
const receiveBtn = id("receiveBtn");
if (receiveBtn) {
  receiveBtn.addEventListener("click", () => {
    console.log(`Hello user you just click receive`);
    window.location.href = "receive.html";
  });
}
const withdrawBtn = id("withdrawBtn");
if (withdrawBtn) {
  withdrawBtn.addEventListener("click", () => {
    console.log(`Hello user you just click withdraw`);
    window.location.href = "withdraw.html";
  });
}
const moreBtn = id("moreBtn");
if (moreBtn) {
  moreBtn.addEventListener("click", () => {
    console.log(`Hello user you just click more`);
    window.location.href = "more.html";
  });
}
