const url =
  "http://localhost:8080/auth";

const signInFormElement = document.querySelector(".form-login");
const registerFormElement = document.querySelector(".form-reg");

signInFormElement.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(signInFormElement);
  const formDataObject = Object.fromEntries(formData);

  const response = await fetch(url, {
    method: "POST",
     headers: {
        "Content-Type": "application/json",
     },
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
