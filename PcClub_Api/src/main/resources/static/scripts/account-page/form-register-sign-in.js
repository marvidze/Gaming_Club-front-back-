const url = "http://localhost:8080/JavaLaba5/PcClub_Api/src/main/java/com/example/PcClub/Controllers/AuthController.java";

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

const error_repeatPassword = document.querySelector(".error_repeat-password");

const uploadAvatar = document.getElementById(".upload-avatar");

const accountName = document.getElementById(".account_name");

signInFormElement.addEventListener("submit", async (event) => {
  event.preventDefault();

  // const formData = new FormData(signInFormElement);
  // const formDataObject = Object.fromEntries(formData);

  // const response = await fetch(url, {
  //   method: "POST",
  //   body: JSON.stringify({
  //     ...formDataObject,
  //   }),
  // });
  // const result = await response.json();
  
  sectionAuthorization.classList.add("hide-trans");
  setTimeout(() => {
    sectionAuthorization.classList.add("hide");
    sectionProfile.classList.remove("hide");
  }, 800);
});

registerFormElement.addEventListener("submit", async (event) => {
  event.preventDefault();
  error_repeatPassword.classList.add("hide");
  const formData = new FormData(registerFormElement);
  const formDataObject = Object.fromEntries(formData);
  if (formDataObject.password == formDataObject.repeatPassword) {
    // const response = await fetch(url, {
    //   method: "POST",
    //   body: JSON.stringify({
    //     ...formDataObject,
    //   }),
    // });
    // const result = await response.json();

    sectionAuthorization.classList.add("hide-trans");
    setTimeout(() => {
      sectionAuthorization.classList.add("hide");
      sectionProfile.classList.remove("hide");
    }, 800);
  } else {
    error_repeatPassword.classList.remove("hide");
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
  result = await response.json();

  if (response.status !== 200) {
    throw new Error(result.message);
  }

  account_avatar.src = result.ProfileImageURL;
});
