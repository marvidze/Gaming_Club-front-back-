let newsArray = new Array();

const URLForUserRole = "";
const URLForNewsArray = "http://localhost:8080/news/getNLastNews?n=100";
const URLForAddNews = "http://localhost:8080/news/addNews";
const URLForChangeNews = "http://localhost:8080/news/update";
const URLForDeleteNews = "http://localhost:8080/news/delete?id=";

let userRole;

window.onload = () => {
  const token = localStorage.getItem("token");
  const decodedToken = parseJWT(token);
  userRole = decodedToken.role;
};

createNewsArray = async () => {
  response = await fetch(URLForNewsArray);
  newsArray = await response.json();
  addNews();
};

createNewsArray();

const newsArea = document.getElementById("news-area");

const clickRedactIcon = (button) => {
  button.classList.add("none");
  button.parentNode.children[0].classList.remove("none");

  let news = button.parentNode.parentNode;

  let header = news.children[1];
  let body = news.children[2];

  header.innerHTML = `<input class="input-text-header" type="text" value="${header.textContent}"/>`;
  body.innerHTML = `<textarea class="input-text-body">${body.textContent}</textarea>`;
};

const clickConfirmIcon = async (button) => {
  button.classList.add("none");
  button.parentNode.children[1].classList.remove("none");

  let news = button.parentNode.parentNode;

  let id = news.id;

  let header = news.children[1];
  let body = news.children[2];

  let headerContent = header.firstChild.value;
  let bodyContent = body.firstChild.value;

  header.innerHTML = `${headerContent}`;
  body.innerHTML = `${bodyContent}`;

  let redactNews = {
    id: id,
    title: headerContent,
    body: bodyContent,
  };

  const response = await fetch(URLForChangeNews, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...redactNews,
    }),
  });
  const result = await response.json();
};

const clickTrashIcon = async (button) => {
  let div = button.parentNode.parentNode;
  div.parentNode.removeChild(div);

  let id = div.id;
  console.log(id);

  const response = await fetch(URLForDeleteNews + id, {
    method: "DELETE",
  });
};

const clickPlusIcon = async (button) => {
  let div = button.parentNode;
  addNewNews("Заголовок", "Содержание", "");
  div.parentNode.removeChild(div);

  let news = {
    title: "Заголовок",
    body: "Содержание",
  };

  const response = await fetch(URLForAddNews, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...news,
    }),
  });
  const result = await response.json();
  createPlusIcon();
  location.reload();
};

const createPlusIcon = () => {
  let newNews = document.createElement("div");
  newNews.classList.add("news");
  newNews.classList.add("flex");
  newNews.classList.add("news-animation");

  let iconPlus = document.createElement("img");
  iconPlus.classList.add("icon-plus");
  iconPlus.src = "./images/icons/icon-plus.png";
  iconPlus.addEventListener("click", () => {
    clickPlusIcon(iconPlus);
  });

  newNews.appendChild(iconPlus);
  newsArea.appendChild(newNews);
};

const addNewNews = (headerContent, bodyContent, imgContent, id) => {
  const newsHeader = document.createElement("div");
  newsHeader.classList.add("news-header");
  newsHeader.innerHTML = headerContent;

  // это не нужно
  const newsImg = document.createElement("img");
  newsImg.classList.add("news-img");
  newsImg.src = imgContent;
  //

  const newsBody = document.createElement("div");
  newsBody.classList.add("news-body");
  newsBody.innerHTML = bodyContent;

  const news = document.createElement("div");
  news.classList.add("news");
  news.classList.add("news-animation");
  news.id = id;

  if (userRole == "admin" || userRole == "moderator") {
    const redactElements = document.createElement("div");
    redactElements.classList.add("redact-area");

    const redactIcon = document.createElement("img");
    redactIcon.classList.add("redact-icon");
    redactIcon.src = "./images/icons/icon-change.png";
    redactIcon.addEventListener("click", () => {
      clickRedactIcon(redactIcon);
    });

    const confirmIcon = document.createElement("img");
    confirmIcon.classList.add("redact-icon");
    confirmIcon.classList.add("none");
    confirmIcon.src = "./images/icons/icon-confirm.png";
    confirmIcon.addEventListener("click", () => {
      clickConfirmIcon(confirmIcon);
    });

    const trashIcon = document.createElement("img");
    trashIcon.src = "./images/icons/icon-trash.png";
    trashIcon.classList.add("redact-icon");
    trashIcon.addEventListener("click", () => {
      clickTrashIcon(trashIcon);
    });

    redactElements.appendChild(confirmIcon);
    redactElements.appendChild(redactIcon);
    redactElements.appendChild(trashIcon);
    news.appendChild(redactElements);
  }

  // news.appendChild(newsImg);
  news.appendChild(newsHeader);
  news.appendChild(newsBody);
  newsArea.appendChild(news);
};
const addNews = () => {
  for (let i = 0; i < newsArray.length; i++) {
    addNewNews(
      newsArray[i].title,
      newsArray[i].body,
      newsArray[i].img,
      newsArray[i].id
    );
  }
  if (userRole == "moderator" || userRole == "admin") {
    createPlusIcon();
  }
};

// newsArray = [
//   {
//     img: "./images/new-year.png",
//     header: "Новогодние скидки в IT GAMER CLUB!",
//     body: "Все цены снижены на 20% (до 08.01.2025)",
//     id: "1",
//   },
//   {
//     img: "./images/team-spirit.jpeg",
//     header: "Team Spirit чемпионы мажора по CS 2!",
//     body: `15 декабря 2024 года российская команда Team Spirit стала чемпионом турнира Perfect World Shanghai Major 2024 по Counter-Strike 2. В финале она обыграла европейский коллектив FaZe Clan со счётом 2:1 по картам.`,
//     id: "2",
//   },
//   {
//     img: "./images/stalkraft.png",
//     header: "Новогоднее обновление STALKRAFT X!",
//     body: `В игру добавились новый игровой режим "Буря", новогодние подарки и многое другое. Наряжайте ёлку и вперёд за подарками и артефактами! Играйте в STALKRAFT X в нашем клубе и получайте незабываемые эмоции!`,
//     id: "3",
//   },
// ];
