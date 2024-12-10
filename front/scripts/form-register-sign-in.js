const url =
  "http://localhost:8080/JavaLaba5/PcClub_Api/src/main/java/com/example/PcClub/Controllers/AuthController.java";

const signInFormElement = document.querySelector(".form-login");
const registerFormElement = document.querySelector(".form-reg");

signInFormElement.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(signInFormElement);
  const formDataObject = Object.fromEntries(formData);

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      ...formDataObject,
    }),
  });

  const result = await response.json();
});

//
// fetch(url, {
//   method: "POST",
//   body: JSON.stringify({
//     ...formDataObject,
//   }),
// })
//   .then((response) => {
//     console.log("response: ", response);

//     return response.json();
//   })
//   .then((json) => {
//     console.log("json: ", json);
//   });
