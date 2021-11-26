const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

const todos = JSON.parse(localStorage.getItem("todos"));
if (todos) {
  todos.forEach((todo) => {
    add(todo);
  });
}

//即時リロードされるのを防ぐ　addEventListener("いつ","何");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  add();
});

function add(todo) {
  let todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    const li = document.createElement("li");

    li.innerText = todoText;
    li.classList.add('list-group-item')

    if (todo && todo.completed) {
      li.classList.add("text-decoration-line-through");
    }

    // li.addEventListener("右クリック") →liに右クリックした時
    li.addEventListener("contextmenu", function (event) {
      event.preventDefault();
      li.remove();
      saveData();
    });

    li.addEventListener("click", function () {
    //重複線を引くやつ toggleは切り替え
      li.classList.toggle("text-decoration-line-through");
      saveData();
    });
    
    //
    ul.appendChild(li);
    input.value = "";
    saveData();
  }
}

function saveData() {
  const lists = document.querySelectorAll("li");
  const todos = [];

  lists.forEach((li) => {
    //オブジェクトの話
    todos.push({
      text: li.innerText,
      completed: li.classList.contains("text-decoration-line-through"),
    });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}