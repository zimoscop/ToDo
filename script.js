const btnAdd = document.querySelector(".roof__btn");
const btnDelAll = document.querySelector(".base__delall");
const btnDel = document.querySelector(".base__del");
const lists = document.querySelector(".lists");
const input = document.querySelector(".roof__input");
const list = document.querySelector(".list");
const text = document.querySelector(".text");
const base = document.querySelector(".base");
const roof = document.querySelector(".roof");
// создает строку todo-листа с обработчиками закрытия по крестику и выделение завершенных
function addList() {
  if (input.value !== "") {
    let text = input.value;
    const div = document.createElement("div");
    const checkbox = document.createElement("input");
    const p = document.createElement("p");
    const divCross = document.createElement("div");
    const pCross = document.createElement("p");
    div.className = "list";
    checkbox.className = "checkbox mark";
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", () => {
      p.classList.toggle("done");
      div.classList.toggle("complited");
    });
    p.className = "text";
    p.textContent = text;
    divCross.className = "cross";
    pCross.className = "cross__symbol";
    pCross.textContent = "❌";
    divCross.addEventListener("click", () => {
      div.style = "display:none;";
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.getItem(localStorage.key(i)) === text) {
          localStorage.removeItem(localStorage.key(i));
        }
      }
    });
    divCross.append(pCross);
    div.append(checkbox, p, divCross);
    lists.style = "padding: 32px 24px;";
    roof.style = "border-radius: 16px 16px 0 0";
    base.style = "opacity: 1;";
    lists.append(div);
  }
  return lists;
}
btnAdd.addEventListener("click", addList);
// загрузка страницы, достает данные из lS и очищает поле input
window.addEventListener("load", () => {
  getFromLs();
  document.contains(document.querySelector(".list"))
    ? ((roof.style = "border-radius: 16px 16px 0 0"),
      (base.style = "opacity: 1;"))
    : ((roof.style = "border-radius: 16px"), (base.style = "opacity: 0;"));
  input.value = "";
});
// проверка пустого содержимого input и выдает какое-то сообщение
function emptyInput() {
  if (input.value === "") {
    alert("Полить кактус и погулять с собакой?");
    roof.style = "border-radius: 16px";
  }
}
btnAdd.addEventListener("click", emptyInput);
// достает данные из LS(используется при загрузке и перезагрузке страницы)
function getFromLs() {
  for (let i = 0; i < localStorage.length; i++) {
    input.value = localStorage.getItem(localStorage.key(i));
    addList();
  }
}
//сохраняет значение input в lS
function saveInLocalStorage() {
  let realTime = new Date().toLocaleTimeString();
  if (input.value !== "") {
    localStorage.setItem("case" + realTime, input.value);
    input.value = "";
  }
}
btnAdd.addEventListener("click", saveInLocalStorage);
// удаляет весь список дел и очищает всё хранилище
function delAll() {
  let res = confirm("Новая жизнь с чистого листа?");
  if (res === true) {
    lists.style = "display: none";
    localStorage.clear();
    base.style = "opacity: 0;";
    roof.style = "border-radius: 16px";
  }
}
btnDelAll.addEventListener("click", delAll);
// удаляет список завершенных дел из листа на странице браузера
function delComplitedList() {
  const complited = document.querySelectorAll("div.complited");
  for (let i = 0; i < complited.length; i++) {
    document.querySelector(".complited").remove();
  }
}
// очищает хранилище от значений, соответвующих тексту, завершенных дел
function cleanLsItem() {
  const complited2 = document.querySelectorAll("div.complited>p");
  let complitedCases = [];
  for (let i = 0; i < complited2.length; i++) {
    complitedCases.push(complited2[i].textContent);
  }
  let arr = [...complitedCases];
  for (let keys in localStorage) {
    for (let i = 0; i < arr.length; i++) {
      if (localStorage.getItem(keys) === arr[i]) {
        localStorage.removeItem(keys);
      }
    }
  }
}
btnDel.addEventListener("click", delComplitedList);
btnDel.addEventListener("mousedown", cleanLsItem);
