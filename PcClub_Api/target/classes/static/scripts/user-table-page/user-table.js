const url = "http://localhost:8080/users/nUsers?n=100";

let usersInfo = new Array();

async function fetchFunction() {
  const response = await fetch(url);
  usersInfo = await response.json();
}

fetchFunction();

const redact = `
    <div class="table-actions">
        <div onClick="editData(this)">
            <img
                class="icons"
                src="../images/icons/icon-change.png"
            />
        </div>
        <div class="none" onClick="confirmEditData(this)">
            <img
                class="icons"
                src="../images/icons/icon-confirm.png"
            />
        </div>
        <div onClick="deleteData(this)">
            <img class="icons" src="../images/icons/icon-trash.png" />
        </div>
    </div>
`;

const table = document.getElementById("table");

const insertRow = (user) => {
  let row = document.createElement("tr");
  let cell0 = document.createElement("td");
  let cell1 = document.createElement("td");
  let cell2 = document.createElement("td");
  let cell3 = document.createElement("td");
  cell0.innerHTML = user.id;
  cell1.innerHTML = user.login;
  cell2.innerHTML = user.role;
  cell3.innerHTML = redact;
  row.appendChild(cell0);
  row.appendChild(cell1);
  row.appendChild(cell2);
  row.appendChild(cell3);
  table.appendChild(row);
};

const deleteData = (button) => {
  let row = button.parentNode.parentNode.parentNode;
  row.parentNode.removeChild(row);
  for (i = 0; i < usersInfo.length; i++) {
    if (usersInfo[i].login == row.firstChild.innerHTML) {
      usersInfo.splice(i, 1);
      console.log(usersInfo);
    }
  }
};

const editData = (button) => {
  let row = button.parentNode.parentNode.parentNode;

  button.classList.add("none");
  button.parentNode.children[1].classList.remove("none");
  // .log((confirmButton = button.parentNode.children[1]))
  // ;

  let loginCell = row.cells[1];
  let roleCell = row.cells[2];

  loginCell.innerHTML = `<input class="input-text" type="text" value="${loginCell.innerHTML}"/>`;
  roleCell.innerHTML = `<select class="select-role">
  <option value="admin">admin</option>
  <option value="moderator">moderator</option>
  <option value="common">common</option>
</select>`;
};

const confirmEditData = (button) => {
  let row = button.parentNode.parentNode.parentNode;

  button.classList.add("none");
  button.parentNode.children[0].classList.remove("none");
  let id = row.cells[0];
  let loginCell = row.cells[1];
  let roleCell = row.cells[2];
  console.log(roleCell);
  loginCell.innerHTML = loginCell.firstChild.value;
  roleCell.innerHTML = roleCell.firstChild.value;
};

const resetTable = () => {
  // Находим все строки таблицы
  var tableHeaderRowCount = 1;
  var rowCount = table.rows.length;
  for (var i = tableHeaderRowCount; i < rowCount; i++) {
    table.deleteRow(tableHeaderRowCount);
  }
};

const showAllusers = () => {
  for (let i = 0; i < usersInfo.length; i++) {
    insertRow(usersInfo[i]);
  }
};

const buttonSearchByID = document.getElementById("button-search");

buttonSearchByID.addEventListener("click", () => {
  let input = document.getElementById("input-id").value;
  if (input === "") {
    return;
  } else {
    resetTable();

    for (let i = 0; i < usersInfo.length; i++) {
      if (usersInfo[i].id == input) insertRow(usersInfo[i]);
    }
  }
});

const buttonShowAll = document.getElementById("button-show-all");

buttonShowAll.addEventListener("click", () => {
  resetTable();
  showAllusers();
});

showAllusers();
