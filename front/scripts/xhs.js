const url = "ТУТА СВОЁ НАДО БЫ НАПИСАТЬ";

function sendRequest(method, url, body = null) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = "json";
    xhr.setRequestHeader("Content-type", "application/json");

    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject(xhr.response);
      } else {
        resolve(xhr.response);
      }
    };

    xhr.onerror = () => {
      reject(xhr.responce);
    };

    xhr.send(JSON.stringify(body));
  });
}

// Тута надо данные с формы написать
let body = {
  login: "kakashka",
  password: "вооооот такая",
};

sendRequest("POST", url, body)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
