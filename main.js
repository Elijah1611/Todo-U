const select = selector => document.querySelector(selector);
const selectAll = selector => document.querySelectorAll(selector);

const form = select("form");
const ul = select("ul");

if (!localStorage.getItem("todos")) {
	console.log("running ");
	localStorage.setItem(
		"todos",
		JSON.stringify([{ task: "Add a todo", isCompleted: false }]),
	);
}

let todos = JSON.parse(localStorage.getItem("todos"));

// RENDER TODOS

const makeTodoElement = (task, completed) => {
	const newTodo = document.createElement("li");
	const todoTextSpan = document.createElement("span");
	const newDeleteBtn = document.createElement("button");
	todoTextSpan.classList.add("todoText");
	newDeleteBtn.innerText = "-";
	todoTextSpan.innerText = task;
	newTodo.appendChild(todoTextSpan);
	newTodo.appendChild(newDeleteBtn);

	if (completed) {
		todoTextSpan.classList.add("completedText");
		newTodo.classList.add("completedItem");
	}

	return newTodo;
};

for (const todo of todos) {
	ul.appendChild(makeTodoElement(todo.task, todo.isCompleted));
}

// PROGRESS SETUP

const progressBar = select(".bar");
const progressTracker = select(".progressTracker");

// PROGRESS

const updateProgress = todoNodeList => {
	let numOfCompleted = 0;
	for (const todo of todoNodeList) {
		if (todo.classList.contains("completedText")) numOfCompleted += 1;
	}
	const percent = numOfCompleted / todoNodeList.length;
	const progressStatus = percent * 100;
	progressBar.style.width = `${progressStatus}%`;
	progressTracker.innerText = `${numOfCompleted} / ${todoNodeList.length}`;
};

updateProgress(selectAll(".todoText"));

// ADD TODO

form.addEventListener("submit", e => {
	e.preventDefault();

	const newTodo = makeTodoElement(e.target[0].value, false);

	ul.appendChild(newTodo);

	todos.push({ task: e.target[0].value, isCompleted: false });

	updateProgress(selectAll(".todoText"));

	localStorage.setItem("todos", JSON.stringify(todos));

	e.target[0].value = "";
});

// COMPLETE TODO

ul.addEventListener("click", e => {
	if (e.target.tagName === "SPAN") {
		e.target.classList.toggle("completedText");
		e.target.parentElement.classList.toggle("completedItem");
		const todoText = e.target.innerText;

		for (const key in todos) {
			if (todos[key].task === todoText) {
				todos[key].isCompleted = !todos[key].isCompleted;
			}
		}

		updateProgress(selectAll(".todoText"));

		localStorage.setItem("todos", JSON.stringify(todos));
	}
});

// REMOVE TODO

const removeTodo = todo => {
	const todoText = todo.children[0].innerText;
	return todos.filter(t => t.task !== todoText);
};

ul.addEventListener("click", e => {
	if (e.target.tagName === "BUTTON") {
		const todo = e.target.parentElement;

		const modifiedTodos = removeTodo(todo);

		todos = modifiedTodos;
		localStorage.setItem("todos", JSON.stringify(modifiedTodos));

		todo.remove();

		updateProgress(selectAll(".todoText"));
	}
});
