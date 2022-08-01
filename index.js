let arr = [
  {
    id: 123,
    task: "buy milk",
  },
  {
    id: 321,
    task: "buy eggs",
  },
  {
    id: 234,
    task: "clean my room",
  },
  {
    id: 543,
    task: "watch any video",
  },
];

document.getElementById("addBtn").addEventListener("click", () => {
  const inputValue = document.getElementById("taskInput").value;

  if (document.getElementById("taskInput").value.length == 0) {
    alert("empty");
    return;
  }

  const newTask = {
    id: new Date().getTime(),
    task: inputValue,
  };

  arr.push(newTask);
  drawTaskList();
});

const drawTaskList = () => {
  const tasksList = document.getElementById("tasksList");
  tasksList.innerHTML = null;
  arr.forEach((value) => {
    //creating elements
    const container = document.createElement("div");
    const myLi = document.createElement("li");
    const myInput = document.createElement("input");
    const myLabel = document.createElement("label");

    //adding styles
    myLi.className = "list-group-item";
    myInput.className = "form-check-input me-1";
    myLabel.className = "form-check-label";

    //adding other attributes
    //input
    myInput.setAttribute("type", "checkbox");
    myInput.setAttribute("id", value.id);

    //label
    myLabel.setAttribute("for", value.id);
    myLabel.textContent = value.task;

    //append childs
    myLi.append(myInput, myLabel);
    tasksList.append(myLi);
  });
};

drawTaskList();
