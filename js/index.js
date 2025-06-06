let siteName = document.getElementById("book-name");
let siteUrl = document.getElementById("site-url");
let submit = document.getElementById("submit");
let box = document.getElementById("box");
let closeBox = document.getElementById("close");
// create
if (localStorage.site != null) {
  siteList = JSON.parse(localStorage.site);
  display();
} else {
  siteList = [];
}
submit.addEventListener("click", () => {
  if (
    siteName.classList.contains("is-valid") &&
    siteUrl.classList.contains("is-valid")
  ) {
    let siteDatails = {
      name: siteName.value.trim(),
      url: siteUrl.value.trim(),
    };
    siteList.push(siteDatails);
    localStorage.setItem("site", JSON.stringify(siteList));
    display();
    clearData();
  } else {
    box.classList.remove("d-none");
  }
});
// show data
function display() {
  let table = ``;
  for (let i = 0; i < siteList.length; i++) {
    if (!siteList[i].url.startsWith("https://")&&!siteList[i].url.startsWith("http://")) {
      siteList[i].url = `https://${siteList[i].url}`;
    }
    table += `
   <tr>
                    <td>${i + 1}</td>
                    <td>${siteList[i].name}</td>
                    <td>
                      <a id="url" target="_blank" href="${
                        siteList[i].url
                      }" class="btn url btn-success">
                        <i class="fa-solid fa-eye pe-2"></i>
                        <span class="text-capitalize">visit</span>
                      </a>
                    </td >
                    <td>
                      <p class="btn btn-danger mb-0" onclick=" deleteItem(${i})">
                        <i class="fa-solid fa-trash-can me-1"></i>
                        <span class="text-capitalize">delete</span>
                      </p>
                    </td>
                  </tr>    `;
  }
  let tbody = (document.getElementById("tbody").innerHTML = table);
}
// clear data
function clearData() {
  siteName.value = "";
  siteUrl.value = "";
  siteName.classList.remove("is-valid");
  siteUrl.classList.remove("is-valid");
  siteName.style.cssText = `
          box-shadow: none;
      border-color:none;`;
  siteUrl.style.cssText = `
          box-shadow: none;
      border-color:none;`;
}
// deleteItem
function deleteItem(index) {
  siteList.splice(index, 1);
  localStorage.site = JSON.stringify(siteList);
  display();
}

// validate
let inputForm = Array.from(document.getElementsByClassName("input"));
let validData = [
  /^\w{3,}(\s+\w+)*$/,
  /^(https:\/\/|http:\/\/)?(w{3}\.)[a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
];

for (let i = 0; i < inputForm.length; i++) {
  inputForm[i].addEventListener("input", () => {
    validation(validData[i], inputForm[i]);
  });
}

function validation(regex, input) {
  if (regex.test(input.value)) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    input.style.cssText = `
          box-shadow: 0 0 0 .25rem #19875440;
      border-color: #198754;`;
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    input.style.cssText = `
    box-shadow: 0 0 0 0.25rem #dc354540;
        border-color: #dc3545;
    `;
  }
}
// remove box-info
closeBox.addEventListener("click", () => {
  close();
});
document.body.addEventListener("click", (e) => {
  if (e.target == box) {
    close();
  }
});
document.body.addEventListener("keyup", (e) => {
  if (e.key == "Escape") {
    close();
  }
});
function close() {
  box.classList.add("d-none");
}
