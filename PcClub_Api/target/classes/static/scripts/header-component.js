let header = document.getElementById("header");

const endPointForUserToken = "";

const getUserRole = async () => {
  const response = await fetch(url);
  const result = await response.json();
};

const currentUser = "";

const urlForLogo = "images/icons/icon-club.png";
const urlForAccountPage = "account-page.html";
const urlForPricePage = "price-page.html";
const urlForUserTablePage = "user-table-page.html";
const urlLogoForIndex = "./";
const urlLogoForPages = ".././";
const urlPagesForIndex = "./pages/";
const urlPagesForPages = "./";

const htmlForAdmin = `<li class="header_dropdonw-menu-item-area">
                      <div class="header_dropdown-menu-item-shadow">
                        <a
                          class="header_dropdonw-menu-item"
                          href=${
                            document.URL.includes("index")
                              ? urlPagesForIndex + urlForUserTablePage
                              : urlPagesForPages + urlForUserTablePage
                          }
                          >КЛИЕНТЫ</a
                        >
                      </div>
                    </li>
                    <li class="header_dropdonw-menu-item-area">
                      <div class="header_dropdown-menu-item-shadow">
                        <a
                          class="header_dropdonw-menu-item"
                          href=${
                            document.URL.includes("index")
                              ? urlPagesForIndex + urlForAccountPage
                              : urlPagesForPages + urlForAccountPage
                          }
                          >РЕДАКТОР</a
                        >
                      </div>
                    </li>`;

const htmlForModerator = `<li class="header_dropdonw-menu-item-area">
                      <div class="header_dropdown-menu-item-shadow">
                        <a
                          class="header_dropdonw-menu-item"
                          href=${
                            document.URL.includes("index")
                              ? urlPagesForIndex + urlForAccountPage
                              : urlPagesForPages + urlForAccountPage
                          }
                          >РЕДАКТОР</a
                        >
                      </div>
                    </li>`;

header.insertAdjacentHTML(
  "beforeend",
  `<header class="header_area">
        <div class="header_container">
          <div class="header_logo-area">
            <div class="header_icon-logo-shadow">
              <img
                src=${
                  document.URL.includes("index")
                    ? urlLogoForIndex + urlForLogo
                    : urlLogoForPages + urlForLogo
                }
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
                <li id="home-page" class="header_menu-item-area">
                  <a class="header_menu-item" href=${
                    document.URL.includes("index") ? "" : "../index.html"
                  }
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
                          href=${
                            document.URL.includes("index")
                              ? urlPagesForIndex + urlForAccountPage
                              : urlPagesForPages + urlForAccountPage
                          }
                          >АККАУНТ</a
                        >
                      </div>
                    </li>
                    ${
                      currentUser == "admin"
                        ? htmlForAdmin
                        : currentUser == "moderator"
                        ? htmlForModerator
                        : ``
                    }
                    <li class="header_dropdonw-menu-item-area">
                      <div class="header_dropdown-menu-item-shadow">
                        <a
                          class="header_dropdonw-menu-item"
                          href=${
                            document.URL.includes("index")
                              ? urlPagesForIndex + urlForPricePage
                              : urlPagesForPages + urlForPricePage
                          }
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
const btnAnimateHomePage = document.getElementById("home-page");

document.addEventListener("DOMContentLoaded", () => {
  buttonMenu.addEventListener("click", () => {
    if (headerMenu.classList.contains("header_open")) {
      headerMenu.classList.remove("header_open");
      btnAnimate.classList.remove("header_btn-open");
      btnAnimateHomePage.classList.remove("header_btn-open");
    } else {
      headerMenu.classList.add("header_open");
      btnAnimate.classList.add("header_btn-open");
      btnAnimateHomePage.classList.add("header_btn-open");
    }
  });
});
