let input = document.querySelector(".main input");
let btn = document.querySelector(".main button");
let taskContainer = document.querySelector(".main .tasks");
let tasks = [];

if (localStorage.getItem("task")) {
  tasks = JSON.parse(localStorage.getItem("task"));
}

getDataFromLocalSrtg();

btn.addEventListener("click", () => {
  if (input.value !== "") {
    addDataToArray(input.value);
  }
  input.value = "";
});

function addDataToArray(data) {
  let date = new Date();
  let dateYear = date.getFullYear();
  let dateMonth = date.getMonth() + 1;
  let dateDay = date.getDate();  
  let dateHours = date.getHours()
  let dateMin = date.getMinutes()
  if (dateMin < 10) {
    dateMin = "0" + dateMin;
  };
  let AorP;
  if (dateHours >= 0 && dateHours <= 12) {
    AorP = "AM"
  } else {
    AorP = "PM"
  }
  if (dateHours > 12) {
    dateHours -= 12
  }
  let dateText = `${dateYear}/${dateMonth}/${dateDay} ${dateHours}:${dateMin}${AorP}`;
  const task = {
    value: data,
    date: dateText,
    id: Date.now(),
  };
  tasks.push(task);
  addElements(tasks);
  addToLocalStrg(tasks);
}

function addElements(tasks) {
  taskContainer.innerHTML = "";
  tasks.forEach((task) => {
    let dev = document.createElement("div");
    let icon = document.createElement("i");
    let info = document.createElement("div");
    let h3 = document.createElement("h3");
    let p = document.createElement("p");
    let remove = document.createElement("i");

    let h3Text = document.createTextNode(task.value);
    h3.appendChild(h3Text);
    let pText = document.createTextNode(task.date);
    p.appendChild(pText);

    dev.className = "task";
    dev.setAttribute("data-id", task.id);
    icon.className = "fas fa-hourglass-half";
    info.className = "info";
    remove.className = "fas fa-trash-can del";

    remove.onclick = function (e) {
      removeTask(e.currentTarget.parentElement.getAttribute("data-id"));
      e.currentTarget.parentElement.remove();
    };

    taskContainer.appendChild(dev);
    dev.appendChild(icon);
    dev.appendChild(info);
    info.appendChild(h3);
    info.appendChild(p);
    dev.appendChild(remove);
  });
}

function addToLocalStrg(tasks) {
  localStorage.setItem("task", JSON.stringify(tasks));
}

function getDataFromLocalSrtg() {
  let data = localStorage.getItem("task");
  if (data) {
    let task = JSON.parse(data);
    addElements(task);
  }
}

function removeTask(data) {
  tasks = tasks.filter((task) => task.id != data);
  addToLocalStrg(tasks);
}
