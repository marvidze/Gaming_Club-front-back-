const urlLog = "http://localhost:8080/auth";
const urlReg = "http://localhost:8080/registration";
const urlPicDownload = "http://localhost:8080/files/download";
const urlPicUpload = "http://localhost:8080/files/upload";

const sectionAuthorization = document.querySelector(".section_authorization");
const sectionProfile = document.querySelector(".section_profile");
const loader = document.querySelector(".loader");

const btn_reg = document.querySelector(".link-registration");
const btn_log = document.querySelector(".link-login");

const logForm = document.querySelector(".form-login");
const regForm = document.querySelector(".form-reg");

let box = document.querySelector(".form-box");

const signInFormElement = document.querySelector(".form-login");
const registerFormElement = document.querySelector(".form-reg");

const account_avatar = document.querySelector(".account_avatar");

const errorMessage = document.querySelector(".error_message");

const uploadAvatar = document.getElementById("upload-avatar");

const accountName = document.querySelector(".account_name");

document.addEventListener("DOMContentLoaded", async function () {
  const login = localStorage.getItem("login");
  const password = localStorage.getItem("password");
  if (login != null && password != null) {
    const response = await fetch(urlLog, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: login,
        password: password,
      }),
    });
    const result = await response.json();

    if (result.status == 200) {
      const decodedToken = parseJWT(result.token);
      accountName.innerText = decodedToken.sub;
      loader.classList.add("hide");
      sectionProfile.classList.remove("hide");
    } else {
      loader.classList.add("hide");
      sectionAuthorization.classList.remove("hide");
    }
  } else {
    loader.classList.add("hide");
    sectionAuthorization.classList.remove("hide");
  }
});

signInFormElement.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(signInFormElement);
  const formDataObject = Object.fromEntries(formData);
  console.log(formDataObject);
  const response = await fetch(urlLog, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...formDataObject,
    }),
  });
  const result = await response.json();

  if (result.status == 200) {
    localStorage.setItem("token", result.token);
    localStorage.setItem("login", formDataObject.login);
    localStorage.setItem("password", formDataObject.password);
    const decodedToken = parseJWT(result.token);
    accountName.innerText = decodedToken.sub;

    const responseImg = await fetch(urlLog, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: decodedToken.iconUrl,
      }),
    });
    const resultImg = await responseImg.blob();
    console.log(resultImg);

    sectionAuthorization.classList.add("hide-trans");
    setTimeout(() => {
      sectionAuthorization.classList.add("hide");
      sectionProfile.classList.remove("hide");
    }, 800);
  } else {
    errorMessage.textContent = "Логин или пароль неверный!";
    errorMessage.classList.remove("hide");
    s;
  }
});

registerFormElement.addEventListener("submit", async (event) => {
  event.preventDefault();
  errorMessage.classList.add("hide");
  const formData = new FormData(registerFormElement);
  const formDataObject = Object.fromEntries(formData);

  if (formDataObject.password == formDataObject.repeatPassword) {
    const response = await fetch(urlReg, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formDataObject,
      }),
    });
    const result = await response.json();
  } else {
    errorMessage.textContent = "Пароли не совпадают.";
    errorMessage.classList.remove("hide");
  }

  if (result.status == 200) {
    localStorage.setItem("token", result.token);
    localStorage.setItem("login", formDataObject.login);
    localStorage.setItem("password", formDataObject.password);
    sectionAuthorization.classList.add("hide-trans");
    setTimeout(() => {
      sectionAuthorization.classList.add("hide");
      sectionProfile.classList.remove("hide");
    }, 800);
  } else {
    errorMessage.textContent = "Логин занят.";
    errorMessage.classList.remove("hide");
  }
});

btn_reg.onclick = () => {
  box.classList.add("active");
  logForm.classList.add("hide");
  regForm.classList.remove("hide");
};

btn_log.onclick = () => {
  box.classList.remove("active");
  logForm.classList.remove("hide");
  regForm.classList.add("hide");
};

uploadAvatar.addEventListener("change", async function (event) {
  const token = localStorage.getItem("token");
  const decodedToken = parseJWT(token);
  const login = decodedToken.sub;
  const file = event.target.files[0]; // Получаем первый выбранный файл
  const formData = new FormData();
  formData.append("file", file);
  formData.append("login", login);

  const response = await fetch(urlPicUpload, {
    method: "POST",
    body: decodedToken.token,
  });
  const result = await response.text();
  console.log(result);
});
