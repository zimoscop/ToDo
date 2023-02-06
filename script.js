const btnAdd = document.querySelector(".roof__btn");
const btnDelAll = document.querySelector(".base__delall");
const btnDel = document.querySelector(".base__del");
const lists = document.querySelector(".lists");
const input = document.querySelector(".roof__input");
const list = document.querySelector(".list");
const cross = document.querySelector(".cross");
const checkbox = document.querySelector(".checkbox");
const text = document.querySelector(".text");

function delAll() {
  lists.style = "display: none";
}

btnDelAll.addEventListener("click", delAll);

function addList() {
  let text = input.value;
  const div = document.createElement("div");
  div.className = "list";
  const checkbox = document.createElement("input");
  checkbox.className = "checkbox mark";
  checkbox.type = "checkbox";
  const p = document.createElement("p");
  p.className = "text";
  p.textContent = text;
  const divCross = document.createElement("div");
  divCross.className = "cross";
  const pCross = document.createElement("p");
  pCross.style = "width: 16px; height: 16px; font-size: 14px;";
  pCross.textContent = "❌";
  divCross.append(pCross);
  div.append(checkbox, p, divCross);
  lists.append(div);
}
btnAdd.addEventListener("click", addList);

function delList() {
  list.style = "display:none";
}
cross.addEventListener("click", delList);

checkbox.addEventListener("change", () => {
  text.classList.toggle("done");
});
