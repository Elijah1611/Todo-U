const select = selector => document.querySelector(selector);
const selectAll = selector => document.querySelectorAll(selector);

const form = select("form");
const ul = select("ul");

form.addEventListener("submit", e => {
	e.preventDefault();

	const newTodo = document.createElement("li");
	const newDeleteBtn = document.createElement("button");
	newDeleteBtn.innerText = "X";
	newTodo.innerText = e.target[0].value;
	newTodo.appendChild(newDeleteBtn);
	ul.appendChild(newTodo);
	e.target[0].value = "";
});

ul.addEventListener("click", e => {
	if (e.target.tagName === "LI") {
		e.target.classList.toggle("completed");
	}
});

ul.addEventListener("click", e => {
	if (e.target.tagName === "BUTTON") {
		console.dir(e.target.parentElement);
		e.target.parentElement.remove();
	}
});
