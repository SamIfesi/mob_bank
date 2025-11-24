const id = (id) => document.getElementById(id);
const className = (s) => document.getElementsByClassName(s);
const q = (s) => document.querySelector(s);

const form = q("form")
const regBtn = id("register");
const logBtn = id("login");
const username = id("username");
const password = id("password");
const psdShow = id("psdShow");
const msgSuccess = id("msg");
const userMsg = id("user-error");
const pwdMsg = id("password-error");

if (regBtn) {
  regBtn.addEventListener("click", function () {
    window.location.href = "register.html";
  });
}

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
// if (logBtn) {
//   logBtn.addEventListener("click", signIn);
// }
