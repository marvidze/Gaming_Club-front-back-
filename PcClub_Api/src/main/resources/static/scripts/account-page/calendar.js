const urlGetTimes = "http://localhost:8080/slots/";
const urlReservation = "http://localhost:8080/slots/addSlot";

const calendar = document.querySelector(".date_row");
const arraySevenDays = document.querySelectorAll(".date_row label");
const btnReservation = document.querySelector(".btn_send-reservation");

const formZones = document.querySelector("#form_zones");
const formDates = document.querySelector("#form_dates");
const formTimes = document.querySelector("#form_times");

const dateOptions = { day: "numeric", month: "short" };
let currentDate = new Date();
const dates = [];
dates.push(new Date(currentDate.setDate(currentDate.getDate())));
for (let i = 0; i < 6; i++) {
  dates.push(new Date(currentDate.setDate(currentDate.getDate() + 1)));
}

arraySevenDays.forEach((item, index) => {
  const formattedDate = dates[index].toLocaleString("ru-RU", dateOptions);
  item.innerText = formattedDate;
});

const renderTimes = (element) => {
  let arrayAllDates = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];

  let date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  let idForCheckbox = 0;
  let plusNumber = element.htmlFor;

  let arrayDates = new Array();

  for (let i = 0; i < arrayDates.length; i++) {
    if (arrayDates[i].date == Number(day) + Number(plusNumber)) {
      let index = arrayAllDates.indexOf(arrayDates[i].time);
      arrayAllDates.splice(index, 1);
    }
  }
document.addEventListener("DOMContentLoaded", async () => {
  if (
    localStorage.getItem("login") != null &&
    localStorage.getItem("password") != null
  ) {
    let idForCheckbox = 0;

    const selectedZone = document.querySelector("#form_zones input:checked");
    let date = new Date();
    const year = date.getFullYear().toString();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const resultDate = `${year}.${month}.${day}`;

    console.log(urlGetTimes + selectedZone.id);
//    const response = await fetch(urlGetTimes + selectedZone.id);
//    const result = await response.json();
//
//    let arrayDates = result; // массив объектов

    arrayDates = [
      {
        date: "27",
        time: "1",
      },
      {
        date: "27",
        time: "2",
      },
      {
        date: "27",
        time: "3",
      },
      {
        date: "27",
        time: "4",
      },
    ];

  let timesRow = document.getElementById("times-row");
  let checkboxes = ``;

  for (let i = 0; i < arrayAllDates.length; i++) {
    let checkbox = `
    <input
      class="input_time"
      type="checkbox"
      id=${"time" + idForCheckbox}
      hidden
    />
    <label class="label_time" for=${"time" + idForCheckbox}>
      ${
        arrayAllDates[i] < 10
          ? "0" + arrayAllDates[i] + " : 00"
          : arrayAllDates[i] + " : 00"
      }
    </label>
    `;

    idForCheckbox++;

    checkboxes += checkbox;
  }

  timesRow.innerHTML = checkboxes;
};

document.addEventListener("DOMContentLoaded", async () => {
  if (
    localStorage.getItem("login") != null &&
    localStorage.getItem("password") != null
  ) {
    const selectedZone = document.querySelector("#form_zones input:checked");
    let date = new Date();
    const year = date.getFullYear().toString();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const resultDate = `${year}.${month}.${day}`;

    const response = await fetch(urlGetTimes + selectedZone.id);
    const result = await response.json();

    let arrayDates = result;
    const selectedDay = document.querySelector("#form_dates input:checked");
  }
});

btnReservation.addEventListener("click", async () => {
  const selectedZone = document.querySelector("#form_zones input:checked");
  const selectedDay = document.querySelector("#form_dates input:checked");
  console.log(selectedDay);
  const arraySelectedTimes = document.querySelectorAll(
    "#form_times input:checked"
  );

  let date = new Date();

  // Форматируем дату в нужный формат
  const year = date.getFullYear().toString();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate() + parseInt(selectedDay.id)).padStart(
    2,
    "0"
  );

  // Формируем строку в нужном формате
  const resultDay = `${day}.${month}.${year}`;

  // const response = await fetch(urlReservation, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     zone: selectedZone.id,
  //     date: ,
  //   }),
  // });
  // const result = await response.json();
});
