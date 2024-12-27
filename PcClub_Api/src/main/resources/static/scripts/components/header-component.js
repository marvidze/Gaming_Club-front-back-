let header = document.getElementById("header");

const parseJWT = (token) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
};

let currentUser;

try {
  const token = localStorage.getItem("token");
  const decodedToken = parseJWT(token);
  currentUser = decodedToken.roles[0];
} catch {
  currentUser = "ROLE_common_user";
}

const urlForLogo = "images/icons/icon-club.png";
const urlForAccountPage = "account-page.html";
const urlForPricePage = "price-page.html";
const urlForUserTablePage = "user-table-page.html";
const urlLogoForIndex = "./";
const urlLogoForPages = ".././";
const urlPagesForIndex = "./pages/";
const urlPagesForPages = "./";

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
                      currentUser == "ROLE_admin_user"
                        ? `<li class="header_dropdonw-menu-item-area">
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
                   `
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

document.addEventListener("DOMContentLoaded", () => {
  buttonMenu.addEventListener("click", () => {
    if (headerMenu.classList.contains("header_open")) {
      if (currentUser == "ROLE_admin_user") {
        btnAnimate.classList.remove("header_btn-open-admin");
      } else if (currentUser == "ROLE_moderator_user") {
        btnAnimate.classList.remove("header_btn-open");
      } else {
        btnAnimate.classList.remove("header_btn-open");
      }
      headerMenu.classList.remove("header_open");
    } else {
      headerMenu.classList.add("header_open");
      if (currentUser == "ROLE_admin_user") {
        btnAnimate.classList.add("header_btn-open-admin");
      } else if (currentUser == "ROLE_moderator_user") {
        btnAnimate.classList.add("header_btn-open");
      } else {
        btnAnimate.classList.add("header_btn-open");
      }
    }
  });
});
