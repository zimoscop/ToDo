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
  div.className = "list";
  const checkbox = document.createElement("input");
  checkbox.className = "checkbox mark";
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", () => {
    p.classList.toggle("done");
    div.classList.toggle("complited");
  });
  const p = document.createElement("p");
  p.className = "text";
  p.textContent = text;
  const divCross = document.createElement("div");
  divCross.className = "cross";
  const pCross = document.createElement("p");
  pCross.className = "cross__symbol";
  pCross.textContent = "❌";
  divCross.addEventListener("click", () => {
    div.style = "display:none;";
  });
  divCross.append(pCross);
  div.append(checkbox, p, divCross);
  lists.append(div);
  btnDel.addEventListener("click", () => {
    const elems = document.querySelectorAll(".complited");
    for (let elem in elems) {
      elems[elem].parentNode.removeChild(elems[elem]);
    }
  });
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
  let res = confirm("Новая жизнь с нового листа?");
  if (res === true) {
    lists.style = "display: none";
    localStorage.clear();
  }
}
btnDelAll.addEventListener("click", delAll);
