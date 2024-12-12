let header = document.getElementById("header");

const url = "";
const userInfo = {};

header.insertAdjacentHTML(
  "beforeend",
  `<header class="header_area">
        <div class="header_container">
          <div class="header_logo-area">
            <div class="header_icon-logo-shadow">
              <img
                src="../../front/images/icons/icon-club.png"
                class="header_icon-logo"
              />
            </div>
            <div class="header_name-club-area">
              <div class="header_name-club">IT GAMER CLUB</div>
            </div>
          </div>
          <div>
            <nav>
              <ul class="header_menu-area-list">
                <li class="header_menu-item-area">
                  <a class="header_menu-item" href="../../front/index.html"
                    >ГЛАВНАЯ</a
                  >
                </li>
                <li id="btn-animate" class="header_menu-item-area">
                  <button
                    id="button"
                    class="header_menu-item header_remove-button"
                  >
                    МЕНЮ
                  </button>
                </li>
                <div id="header-menu" class="header_dropdown-menu">
                  <ul class="header_dropdown-menu-list">
                    <li class="header_dropdonw-menu-item-area">
                      <div class="header_dropdown-menu-item-shadow">
                        <a
                          class="header_dropdonw-menu-item"
                          href="../../front/pages/account-page.html"
                          >АККАУНТ</a
                        >
                      </div>
                    </li>
                    <li class="header_dropdonw-menu-item-area">
                      <div class="header_dropdown-menu-item-shadow">
                        <a
                          class="header_dropdonw-menu-item"
                          href="../../front/pages/account-page.html"
                          >КЛИЕНТЫ</a
                        >
                      </div>
                    </li>
                    <li class="header_dropdonw-menu-item-area">
                      <div class="header_dropdown-menu-item-shadow">
                        <a
                          class="header_dropdonw-menu-item"
                          href="../../front/pages/account-page.html"
                          >РЕДАКТОР</a
                        >
                      </div>
                    </li>
                    <li class="header_dropdonw-menu-item-area">
                      <div class="header_dropdown-menu-item-shadow">
                        <a
                          class="header_dropdonw-menu-item"
                          href="../../front/pages/price-page.html"
                          >ЦЕНЫ</a
                        >
                      </div>
                    </li>
                  </ul>
                </div>
              </ul>
            </nav>
          </div>
        </div>
      </header>`
);

const buttonMenu = document.getElementById("button");
const headerMenu = document.getElementById("header-menu");
const btnAnimate = document.getElementById("btn-animate");

document.addEventListener("DOMContentLoaded", () => {
  buttonMenu.addEventListener("click", () => {
    if (headerMenu.classList.contains("header_open")) {
      headerMenu.classList.remove("header_open");
      btnAnimate.classList.remove("header_btn-open");
    } else {
      headerMenu.classList.add("header_open");
      btnAnimate.classList.add("header_btn-open");
    }
  });
});

// const getUserRole = async () => {
//   const response = await fetch(url, {
//     method: "POST",
//     body: JSON.stringify({
//       ...userInfo,
//     }),
//   });
//   const result = await response.json();
// };
