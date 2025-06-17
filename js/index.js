// get elements
let name = document.getElementById("name");
let email = document.getElementById("email");
let pass = document.getElementById("pass");
let form = document.getElementsByTagName("form");
let logOutbtn = document.getElementById("log-out");
let seePass = document.getElementById("see-password");
// regex
let input = Array.from(document.querySelectorAll(".input"));
let regexValid = [
  {
    regex: /^([a-z]|\s){3,15}$/,
    flag: false,
  },
  {
    regex: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
    flag: false,
  },
  {
    regex: /^([a-z]|[A-Z]|[0-9]){3,20}$/,
    flag: false,
  },
];

// make sure there are any data in the local storage
let signUpArr;
if (localStorage.user != null) {
  signUpArr = JSON.parse(localStorage.user);
} else {
  signUpArr = [];
}
// submit form

form[0]?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (location.href.endsWith("sign-up.html")) {
    signUpCheck();
  }
  // log in
  else if (location.href.endsWith("index.html")) {
    logIncheck();
  }
});

// sign up
function signUpCheck() {
  let success = document.getElementById("success");
  if (
    emailExist() != false &&
    regexValid.every((item) => item.flag == true) &&
    input.every((input) => input.value != "")
  ) {
    let signOb = {
      name: name.value.toLowerCase().trim(),
      email: email.value.toLowerCase().trim(),
      pass: pass.value.toLowerCase().trim(),
    };
    signUpArr.push(signOb);
    localStorage.setItem("user", JSON.stringify(signUpArr));
    successRemove();
    success.style.color = "green";
    success.innerHTML = "success";
    clearData();
  } else if (emailExist() == false) {
    successRemove();
    success.style.color = "red";
    success.innerHTML = "email already exist";
  } else {
    successRemove();
    success.innerHTML = "inputs are require";
    success.style.color = "red";
  }
}

// remove class success
function successRemove() {
  success.classList.remove("d-none");
}

// log in
function logIncheck() {
  let found = false;
  for (let i = 0; i < signUpArr.length; i++) {
    if (
      email.value.toLowerCase() == signUpArr[i].email &&
      pass.value.toLowerCase() == signUpArr[i].pass
    ) {
      location.href = "./html-pages/home.html";
      localStorage.setItem("name", signUpArr[i].name);
      found = true;
      clearData();
    }
  }
  if (found != true) {
    let encorrect = document.getElementById("encorrect");
    encorrect.classList.remove("d-none");
  }
}

// check email exist
function emailExist() {
  for (let i = 0; i < signUpArr.length; i++) {
    if (signUpArr[i].email == email.value.toLowerCase()) {
      return false;
    }
  }
}
// clear date
function clearData() {
  name.value = "";
  email.value = "";
  pass.value = "";
}
// creat home page
window.addEventListener("load", () => {
  if (location.href.includes("home.html")) {
    let welcome = document.getElementById("welcome");
    welcome.innerHTML += localStorage.getItem("name");
  }
});

// logout
logOutbtn?.addEventListener("click", () => {
  location.href = "./../index.html";
});

// regex validation

// at log in page input would b 2 , delete the first regex from array
if (input.length <= 2) {
  regexValid.shift();
}
// validation

function validation(input, regex, i) {
  if (regex.regex.test(input.value)) {
    regexValid[i].flag = true;
    input.nextElementSibling.classList.replace("d-block", "d-none");
  } else if (location.href.endsWith("sign-up.html")) {
    input.nextElementSibling.classList.replace("d-none", "d-block");
  }
}
// input loop
for (let i = 0; i < input.length; i++) {
  input[i].addEventListener("input", () => {
    validation(input[i], regexValid[i], i);
  });
}
