const btnAdd = document.querySelector(".roof__btn");
const btnDelAll = document.querySelector(".base__delall");
const btnDel = document.querySelector(".base__del");
const lists = document.querySelector(".lists");
const input = document.querySelector(".roof__input");
const list = document.querySelector(".list");
const cross = document.querySelector(".cross");
const checkbox = document.querySelector(".checkbox");
const text = document.querySelector(".text");
const base = document.querySelector(".base");

// загрузка страницы, достает данные из lS и очищает поле input
window.addEventListener("load", getFromLs);
window.addEventListener("load", () => {
  input.value = "";
});

// создает строку todo-листа с обработчиками закрытия по крестику и выделение завершенных
function addList() {
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
  lists.style = "padding: 32px 24px 32px 24px;";
  lists.append(div);
  return lists;
}

btnAdd.addEventListener("click", addList);

// отображает блок с кнопками
function openBase() {
  base.style = "opacity: 1;";
}
btnAdd.addEventListener("click", openBase);

// достает данные из LS(используется при загрузке и перезагрузке страницы)
function getFromLs() {
  for (let i = 0; i < localStorage.length; i++) {
    input.value = localStorage.getItem(localStorage.key(i));
    addList();
  }
}

//сохраняет знаение input в lS
function saveInLocalStorage() {
  let d = new Date();
  let dReal = d.toLocaleTimeString();
  let realTime = "case" + dReal;
  localStorage.setItem(realTime, input.value);
  input.value = "";
}
btnAdd.addEventListener("click", saveInLocalStorage);

// удаляет список дел и очищает хранилище
function delAll() {
  let res = confirm("Новая жизнь с чистого листа?");
  if (res === true) {
    lists.style = "display: none";
    localStorage.clear();
  }
}
btnDelAll.addEventListener("click", delAll);

// удаляет список завершенных дел
function delComplitedList() {
  const complited = document.querySelectorAll("div.complited");
  for (let i = 0; i < complited.length; i++) {
    document.querySelector(".complited").remove();
  }
}

// очищает хранилище от значений, соответвующих тексту, завершенных дел(!!!исправить: периодически удаляет не все значения, поэтому оставлены console.log )
function cleanLsItem() {
  const complited2 = document.querySelectorAll("div.complited>p");
  let complitedCases = [];
  for (let i = 0; i < complited2.length; i++) {
    complitedCases.push(complited2[i].textContent);
  }
  let arr = [...complitedCases];
  console.log(arr);
  // let numOfChecks = arr.length;
  let numOfChecks = localStorage.length;

  for (let i = 0; i < numOfChecks; i++) {
    let keyLs = localStorage.key(i);
    let valueLs = localStorage.getItem(localStorage.key(i));
    // numOfChecks = arr.length
    if (arr.indexOf(valueLs) !== -1) {
      console.log(valueLs);
      localStorage.removeItem(keyLs);
      numOfChecks--;
      console.log(localStorage.length);
      console.log(numOfChecks);
    }
  }
}

btnDel.addEventListener("click", delComplitedList);
btnDel.addEventListener("mousedown", cleanLsItem);
