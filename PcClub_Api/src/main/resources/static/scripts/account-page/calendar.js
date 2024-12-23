const calendar = document.querySelector(".date_row");
const calendarElements = document.querySelectorAll(".date_row div");
const zones = document.querySelector(".zones");
const zonesElements = document.querySelectorAll(".zones div");

const dateOptions = { day: "numeric", month: "short" };
let currentDate = new Date();
const dates = [];

dates.push(new Date(currentDate.setDate(currentDate.getDate())));
for (let i = 0; i < 6; i++) {
  dates.push(new Date(currentDate.setDate(currentDate.getDate() + 1)));
}

calendarElements.forEach((item, index) => {
  const formattedDate = dates[index].toLocaleString("ru-RU", dateOptions);
  item.innerText = formattedDate;
});

calendar.addEventListener("click", function (event) {
  if (!event.target.classList.contains("date_row")) {
    calendarElements.forEach((item) => {
      item.classList.remove("selected");
    });

    event.target.classList.add("selected");
  }
});

zones.addEventListener("click", function (event) {
  if (!event.target.classList.contains("zones")) {
    zonesElements.forEach((item) => {
      item.classList.remove("selected_zone");
    });

    event.target.classList.add("selected_zone");
  }
});
