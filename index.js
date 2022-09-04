import { formatDate } from "./helpers/dateHelpers.js";
import { addTask } from "./helpers/taskHelpers.js";

let sortByName = false;
let sortByDate = false;
let taskStatus = "active"; //status can be: active and completed

document.getElementById("addBtn").addEventListener("click", () => {
  addTask(drawTaskList);
});

//draw new task on Enter
document.getElementById("taskInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask(drawTaskList);
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

  // filtering active
  if (taskStatus === "active") {
    arr = arr.filter(({ status }) => status === "active");
  }

  // filtering completed
  if (taskStatus === "completed") {
    arr = arr.filter(({ status }) => status === "completed");
  }

  arr.forEach((singleTask, ind) => {
    //creating elements
    const myLi = document.createElement("li");
    const myInput = document.createElement("input");
    const myLabel = document.createElement("label");
    const myDate = document.createElement("div");
    //btn group
    const btnGroup = document.createElement("div");
    const deleteBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    const completeBtn = document.createElement("button");

    //adding styles
    myLi.className = "row d-flex justify-content-between list-group-item";
    myInput.className = "form-check-input me-1 col-1";
    myLabel.className = "form-check-label col-4";
    myDate.className = "col-5";

    btnGroup.className = "btn-group col-2";
    deleteBtn.className = "btn btn-outline-danger btn-sm ";
    editBtn.className = "btn btn-outline-primary btn-sm";
    completeBtn.className = "btn btn-outline-success btn-sm";

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

    // complete on click
    completeBtn.setAttribute("type", "button");
    completeBtn.textContent = "Done";

    //append childs
    //handle btn group append
    switch (taskStatus) {
      case "active":
        btnGroup.append(editBtn, completeBtn, deleteBtn);
        break;
      case "completed":
        btnGroup.append(deleteBtn);
        break;
      default:
        btnGroup.append(editBtn, completeBtn, deleteBtn);
        break;
    }

    myLi.append(myInput, myLabel, myDate, btnGroup);
    tasksList.append(myLi);

    //task events
    deleteBtn.addEventListener("click", () => {
      console.log(lsArr);
      const filteredArr = lsArr.filter(
        (filterTask) => filterTask.id !== singleTask.id
      );
      window.localStorage.setItem("tasks", JSON.stringify(filteredArr));
      drawTaskList();
    });

    editBtn.addEventListener("click", () => {
      const updatedTask = prompt("Update your task:", singleTask.task);

      if (updatedTask?.trim()) {
        const newTask = {
          ...singleTask,
          task: updatedTask,
        };

        const updatedArr = lsArr.map((task) =>
          task.id === singleTask.id ? newTask : task
        );

        window.localStorage.setItem("tasks", JSON.stringify(updatedArr));
        drawTaskList();
      }
    });

    completeBtn.addEventListener("click", () => {
      if ((singleTask.status = "active")) {
        const newTask = {
          ...singleTask,
          status: "completed",
        };

        const updatedArr = lsArr.map((task) =>
          task.id === singleTask.id ? newTask : task
        );

        window.localStorage.setItem("tasks", JSON.stringify(updatedArr));
        drawTaskList();
      }
    });
  });
};

// sorting by name
document.getElementById("sortByName").addEventListener("click", function () {
  sortByName = !sortByName;
  sortByName ? this.classList.add("active") : this.classList.remove("active");
  document.getElementById("sortByDate").classList.remove("active");
  sortByDate = false;
  drawTaskList();
});

// sorting by date
document.getElementById("sortByDate").addEventListener("click", function () {
  sortByDate = !sortByDate;
  sortByDate ? this.classList.add("active") : this.classList.remove("active");
  document.getElementById("sortByName").classList.remove("active");
  sortByName = false;
  drawTaskList();
});

// filtering active
document.getElementById("activeTask").addEventListener("click", function () {
  taskStatus = "active";
  document.getElementById("completedTask").classList.remove("active-nav");
  this.classList.add("active-nav");
  drawTaskList();
});

// filtering completed
document.getElementById("completedTask").addEventListener("click", function () {
  taskStatus = "completed";
  document.getElementById("activeTask").classList.remove("active-nav");
  this.classList.add("active-nav");
  drawTaskList();
});

drawTaskList();

function getWeather() {
  fetch("https://weatherdbi.herokuapp.com/data/weather/alanija")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      const weatherContainer = document.getElementById("weather");

      //create elements
      const weatherInfo = document.createElement("div");
      const weatherImg = document.createElement("img");
      const weatherDescription = document.createElement("h5");
      const weatherTemp = document.createElement("h3");
      const weatherText = document.createElement("div");
      const location = document.createElement("h1");
      const date = document.createElement("h3");

      //adding styles
      weatherInfo.className = "weather-info";
      weatherTemp.className = "temperature";
      weatherText.className = "weather-text";

      //adding attributes
      weatherImg.setAttribute("src", data.currentConditions.iconURL);
      weatherImg.setAttribute("alt", "weather icon");

      //adding textContent
      weatherDescription.textContent = data.currentConditions.comment;
      weatherTemp.textContent = `°C ${data.currentConditions.temp.c}`;
      location.textContent = data.region;
      date.textContent = data.currentConditions.dayhour;

      //appending
      weatherInfo.append(weatherImg, weatherDescription);
      weatherText.append(location, date);

      weatherContainer.append(weatherInfo, weatherTemp, weatherText);
    });
}
getWeather();
