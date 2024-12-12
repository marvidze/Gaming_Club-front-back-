let body = document.getElementById("header");

body.insertAdjacentHTML(
  "beforeend",
  `<header class="header_area">
        <div class="header_icon-logo-area">
            <img src="../images/icons/icon-club.png" class="header_icon-logo" />
        </div>
        <div class="header_name-club-area">
            <div class="header_name-club">IT GAMER CLUB</div>
        </div>
        <div class="header_menu-area">
            <div class="header_menu-text-area">
                <a class="header_menu-text" href="../index.html">ГЛАВНАЯ</a>
            </div>
            <div class="header_menu-text-area">
                <a class="header_menu-text" href="../pages/account-page.html">АККАУНТ</a>
            </div>
            <div class="header_menu-text-area">
                <a class="header_menu-text" href="../pages/price-page.html">ЦЕНЫ</a>
            </div>
        </div>
    </header>`
);
