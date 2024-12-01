const btn_reg = document.querySelector(".link-registration");
const btn_log = document.querySelector(".link-login");
const logForm = document.querySelector(".form-login");
const regForm = document.querySelector(".form-reg");
let box = document.querySelector(".box");

btn_reg.onclick = ()=> {
    box.classList.add("active");
    logForm.classList.add("hide");
    regForm.classList.remove("hide");
}

btn_log.onclick = ()=> {
    box.classList.remove("active");
    logForm.classList.remove("hide");
    regForm.classList.add("hide");
}
