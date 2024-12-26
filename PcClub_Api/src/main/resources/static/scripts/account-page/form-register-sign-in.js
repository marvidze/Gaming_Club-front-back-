const urlLog = "http://localhost:8080/auth";
const urlReg = "http://localhost:8080/registration";

const sectionAuthorization = document.querySelector(".section_authorization");
const sectionProfile = document.querySelector(".section_profile");

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

signInFormElement.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(signInFormElement);
  const formDataObject = Object.fromEntries(formData);

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

  if (result.ok) {
    const parts = result.token.split(".");
    const decodedPayload = base64UrlDecode(parts[1]);
    const payload = JSON.parse(decodedPayload);
    console.log(payload);
    accountName.innerText = decodedPayload.sub;

    sectionAuthorization.classList.add("hide-trans");
    setTimeout(() => {
      sectionAuthorization.classList.add("hide");
      sectionProfile.classList.remove("hide");
    }, 800);
  } else {
    errorMessage.textContent = "Логин или пароль неверный!";
    errorMessage.classList.remove("hide");
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

    if (result.status == 200) {
      sectionAuthorization.classList.add("hide-trans");
      setTimeout(() => {
        sectionAuthorization.classList.add("hide");
        sectionProfile.classList.remove("hide");
      }, 800);
    } else {
      errorMessage.textContent = "Логин занят.";
      errorMessage.classList.remove("hide");
    }
  } else {
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
  const file = event.target.files[0]; // Получаем первый выбранный файл
  const formData = new FormData();
  formData.append("image", file, "image.png");

  const response = await fetch("URL", {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
  const result = await response.json();

  account_avatar.src = result.ProfileImageURL;
});
