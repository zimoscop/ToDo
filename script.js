const btnAdd = document.querySelector(".roof__btn");
const btnDelAll = document.querySelector(".base__delall");
const btnDel = document.querySelector(".base__del");
const lists = document.querySelector(".lists");
const input = document.querySelector(".roof__input");
const list = document.querySelector(".list");
const cross = document.querySelector(".cross");
const checkbox = document.querySelector(".checkbox");
const text = document.querySelector(".text");

window.addEventListener("load", getFromLs);
window.addEventListener("load", () => {
  input.value = "";
});

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
  lists.append(div);
  return lists;
}

btnAdd.addEventListener("click", addList);

function getFromLs() {
  for (let i = 0; i < localStorage.length; i++) {
    input.value = localStorage.getItem(localStorage.key(i));
    addList();
  }
}

function saveInLocalStorage() {
  let d = new Date();
  let dReal = d.toLocaleTimeString();
  let realTime = "case" + dReal;
  localStorage.setItem(realTime, input.value);
  input.value = "";
}
btnAdd.addEventListener("click", saveInLocalStorage);

function delAll() {
  let res = confirm("Новая жизнь с чистого листа?");
  if (res === true) {
    lists.style = "display: none";
    localStorage.clear();
  }
}
btnDelAll.addEventListener("click", delAll);

function delComplited() {
  const complited = document.querySelectorAll(".complited");
  const complited2 = document.querySelectorAll("div.complited>p");
  let arrC = [];
  for (let i = 0; i < complited2.length; i++) {
    arrC.push(complited2[i].textContent);
  }
  for (let i = 0; i < localStorage.length; i++) {
    if (arrC.includes(localStorage.getItem(localStorage.key(i))) === true) {
      localStorage.removeItem(localStorage.key(i));
    }
  }
  for (let el in complited) {
    complited[el].parentNode.removeChild(complited[el]);
  }
}
btnDel.addEventListener("click", delComplited);
