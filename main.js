const select = selector => document.querySelector(selector);
const selectAll = selector => document.querySelectorAll(selector);

const form = select("form");
const ul = select("ul");

const todos = JSON.parse(localStorage.getItem("todos"));

// RENDER TODOS

const makeTodoElement = (task, completed) => {
	const newTodo = document.createElement("li");
	const newDeleteBtn = document.createElement("button");
	newDeleteBtn.textContent = "❌";
	newTodo.innerText = task;
	newTodo.appendChild(newDeleteBtn);

	if (completed) {
		newTodo.classList.add("completed");
	}

	return newTodo;
};

for (const todo of todos) {
	ul.appendChild(makeTodoElement(todo.task, todo.isCompleted));
}

// ADD TODO

form.addEventListener("submit", e => {
	e.preventDefault();

	const newTodo = makeTodoElement(e.target[0].value, false);

	ul.appendChild(newTodo);

	todos.push({ task: e.target[0].value, isCompleted: false });

	localStorage.setItem("todos", JSON.stringify(todos));

	e.target[0].value = "";
});

// COMPLETE TODO

ul.addEventListener("click", e => {
	if (e.target.tagName === "LI") {
		e.target.classList.toggle("completed");
		const todoText = e.target.innerText.slice(0, e.target.innerText.length - 1);

		for (const key in todos) {
			if (todos[key].task === todoText) {
				todos[key].isCompleted = !todos[key].isCompleted;
			}
		}

		localStorage.setItem("todos", JSON.stringify(todos));
	}
});

// REMOVE TODO

const addTodo = todo => {
	const todoText = todo.innerText.slice(0, todo.innerText.length - 1);
	return todos.filter(t => t.task !== todoText);
};

ul.addEventListener("click", e => {
	if (e.target.tagName === "BUTTON") {
		const todo = e.target.parentElement;

		const modifiedTodos = addTodo(todo);

		localStorage.setItem("todos", JSON.stringify(modifiedTodos));

		todo.remove();
	}
});
