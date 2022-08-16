let sortByName = false;
let sortByDate = false;

//function to draw a new task
const addTask = () => {
  const inputValue = document.getElementById("taskInput").value;
  const input = document.getElementById("taskInput");

  if (!inputValue.trim()) {
    alert("Incorrect value. Check if provided");
    input.value = null;
    return;
  }

  const newTask = {
    id: new Date().getTime(),
    task: inputValue,
  };

  const lsArr = JSON.parse(window.localStorage.getItem("tasks"));
  let arr = lsArr ? lsArr : [];
  arr.push(newTask);

  window.localStorage.setItem("tasks", JSON.stringify(arr));

  input.value = null;
  drawTaskList();
};

//function to read date
const formatDate = (date) => {
  const addZero = (num) => (num < 10 ? "0" + num : num);

  const h = addZero(new Date(date).getHours());
  const min = addZero(new Date(date).getMinutes());
  const s = addZero(new Date(date).getSeconds());
  const d = addZero(new Date(date).getDate());
  const mon = addZero(new Date(date).getMonth() + 1);
  const y = new Date(date).getFullYear();

  return `${h}:${min}:${s} \xa0 ${d}-${mon}-${y}`;
};

document.getElementById("addBtn").addEventListener("click", addTask);

//draw new task on Enter
document.getElementById("taskInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

const drawTaskList = () => {
  const tasksList = document.getElementById("tasksList");
  tasksList.innerHTML = null;

  //get data from localStorage
  const lsArr = JSON.parse(window.localStorage.getItem("tasks"));
  let arr = lsArr ? lsArr : [];

  if (sortByName) {
    arr.sort((a, b) => (a.task > b.task ? 1 : b.task > a.task ? -1 : 0));
  }

  if (sortByDate) {
    arr.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0));
  }

  arr.forEach((singleTask, ind) => {
    //creating elements
    const myLi = document.createElement("li");
    const myInput = document.createElement("input");
    const myLabel = document.createElement("label");
    // date group
    const myDate = document.createElement("div");
    //btn group
    const btnGroup = document.createElement("div");
    const deleteBtn = document.createElement("button");
    const editBtn = document.createElement("button");

    //adding styles
    myLi.className = "row d-flex justify-content-between list-group-item";
    myInput.className = "form-check-input me-1 col-1";
    myLabel.className = "form-check-label col-5";
    myDate.className = "col-4";

    btnGroup.className = "btn-group col-2";
    deleteBtn.className = "btn btn-outline-danger btn-sm ";
    editBtn.className = "btn btn-outline-primary btn-sm";

    //adding other attributes
    //input
    myInput.setAttribute("type", "checkbox");
    myInput.setAttribute("id", ind);

    //label
    myLabel.setAttribute("for", ind);
    myLabel.textContent = singleTask.task;

    //date
    myDate.textContent = formatDate(singleTask.id);

    //btn group
    btnGroup.setAttribute("role", "group");

    //delete btn
    deleteBtn.setAttribute("type", "button");
    deleteBtn.textContent = "Delete";

    //edit btn
    editBtn.setAttribute("type", "button");
    editBtn.textContent = "Edit";

    //append childs
    //handle btn group append
    btnGroup.append(editBtn, deleteBtn);
    myLi.append(myInput, myLabel, myDate, btnGroup);
    tasksList.append(myLi);

    //task events
    deleteBtn.addEventListener("click", () => {
      arr = arr.filter((filterTask) => filterTask.id !== singleTask.id);
      window.localStorage.setItem("tasks", JSON.stringify(arr));
      drawTaskList();
    });

    editBtn.addEventListener("click", () => {
      const updatedTask = prompt("Update your task:", singleTask.task);

      if (updatedTask?.trim()) {
        const newTask = {
          ...singleTask,
          task: updatedTask,
        };

        arr.splice(ind, 1, newTask);
        drawTaskList();
      }
    });
  });
};

document.getElementById("sortByName").addEventListener("click", function () {
  sortByName = !sortByName;
  sortByDate = false;
  document.getElementById("sortByDate").classList.remove("active");

  sortByName ? this.classList.add("active") : this.classList.remove("active");
  drawTaskList();
});

document.getElementById("sortByDate").addEventListener("click", function () {
  sortByDate = !sortByDate;
  sortByName = false;
  document.getElementById("sortByName").classList.remove("active");

  sortByDate ? this.classList.add("active") : this.classList.remove("active");
  drawTaskList();
});

drawTaskList();
