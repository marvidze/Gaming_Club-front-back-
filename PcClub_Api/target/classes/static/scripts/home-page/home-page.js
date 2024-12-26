let newsArray = new Array();

let userRole;

// const url = "";

// const getUserRole = async () => {
//   const response = await fetch(url);
//   const userRole = await response.json();
// };

userRole = "moderator";

newsArray = [
  {
    img: "./images/new-year.png",
    header: "Новогодние скидки в IT GAMER CLUB!",
    body: "Все цены снижены на 20% (до 08.01.2025)",
  },
  {
    img: "./images/team-spirit.jpeg",
    header: "Team Spirit чемпионы мажора по CS 2!",
    body: `15 декабря 2024 года российская команда Team Spirit стала чемпионом турнира Perfect World Shanghai Major 2024 по Counter-Strike 2. В финале она обыграла европейский коллектив FaZe Clan со счётом 2:1 по картам.`,
  },
  {
    img: "./images/stalkraft.png",
    header: "Новогоднее обновление STALKRAFT X!",
    body: `В игру добавились новый игровой режим "Буря", новогодние подарки и многое другое. Наряжайте ёлку и вперёд за подарками и артефактами! Играйте в STALKRAFT X в нашем клубе и получайте незабываемые эмоции!`,
  },
];

const newsArea = document.getElementById("news-area");

const clickRedactIcon = (button) => {
  button.classList.add("none");
  button.parentNode.children[0].classList.remove("none");

  let news = button.parentNode.parentNode;

  let header = news.children[2];
  let body = news.children[3];

  header.innerHTML = `<input class="input-text-header" type="text" value="${header.textContent}"/>`;
  body.innerHTML = `<textarea class="input-text-body">${body.textContent}</textarea>`;
};

const clickConfirmIcon = (button) => {
  button.classList.add("none");
  button.parentNode.children[1].classList.remove("none");

  let news = button.parentNode.parentNode;

  let header = news.children[2];
  let body = news.children[3];
  header.innerHTML = `${header.firstChild.value}`;
  body.innerHTML = `${body.firstChild.value}`;
};

const clickTrashIcon = (button) => {
  let div = button.parentNode.parentNode;
  div.parentNode.removeChild(div);
};

const clickPlusIcon = (button) => {
  let div = button.parentNode;
  addNewNews("Заголовок", "Содержание", "");
  div.parentNode.removeChild(div);
  createPlusIcon();
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

const addNewNews = (headerContent, bodyContent, imgContent) => {
  const newsHeader = document.createElement("div");
  newsHeader.classList.add("news-header");
  newsHeader.innerHTML = headerContent;

  const newsImg = document.createElement("img");
  newsImg.classList.add("news-img");
  newsImg.src = imgContent;

  const newsBody = document.createElement("div");
  newsBody.classList.add("news-body");
  newsBody.innerHTML = bodyContent;

  const news = document.createElement("div");
  news.classList.add("news");
  news.classList.add("news-animation");
  news.appendChild(newsImg);
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
  news.appendChild(newsHeader);
  news.appendChild(newsBody);
  newsArea.appendChild(news);
};

const addNews = () => {
  for (let i = 0; i < newsArray.length; i++) {
    addNewNews(newsArray[i].header, newsArray[i].body, newsArray[i].img);
  }
  if (userRole == "moderator" || userRole == "admin") {
    createPlusIcon();
  }
};

addNews();
