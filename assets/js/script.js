// Tasks and nextId from localStorage.
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
  if (taskList.length === 0) {
    // Reset to if no cards are present.
    nextId = 1;
  }

  const newId = nextId++;
  // Update nextId in localStorage.
  localStorage.setItem("nextId", JSON.stringify(nextId));
  return newId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  // Create a new task / card element.
  const card = document.createElement("div");
  // Add task-card to the card element.
  card.classList.add("task-card");

  // Set content of the task card.
  card.innerHTML = `
        <div class="card mb-3"> <!-- Create a card div with Bootstrap styling -->
          <div class="card-body"> <!-- Create a card body div -->
            <h5 class="card-title">${task.name}</h5> <!-- Display the task name as the card title -->
            <p class="card-text">${task.description}</p> <!-- Display the task description -->
            <p class="card-text"><small class="text-muted">Due Date: ${task.dueDate}</small></p> <!-- Display the task due date -->
          </div>
        </div>
      `;

  // Return card element.
  return card;
}

// * Function to render the task list and make cards draggable.
function renderTaskList() {
  // Code to render the task list and make cards draggable.
  const todoContainer = document.getElementById("todo-cards");
  // Clear existing cards.
  todoContainer.innerHTML = "";

  taskList.forEach((task) => {
    const card = createTaskCard(task);
    todoContainer.appendChild(card);
  });

  // Make cards draggable using jQuery UI.
  $(".task-card").draggable({
    revert: true,
    revertDuration: 0,
    containment: ".swim-lanes",
    helper: "clone",
    zIndex: 100,
    cursor: "grabbing",
  });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {}

// * Function to handle deleting a task.
function handleDeleteTask(event) {
  // Code to handle deleting a task.
  const taskId = event.target.dataset.taskId;
  const index = taskList.findIndex((task) => task.id === taskId);
  if (index !== -1) {
    taskList.splice(index, 1);
    // Update tasks in localStorage.
    localStorage.setItem("tasks", JSON.stringify(taskList));

    // Decrement nextId when a task is removed.
    nextId--;
    // Update nextId in localStorage.
    localStorage.setItem("nextId", JSON.stringify(nextId));
  }
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// * When the page loads, render the task list, add event listeners, make lanes droppable.
$(document).ready(function () {
  // Render initial task list.
  renderTaskList();

  // Add event listeners.
  document.getElementById("taskForm").addEventListener("submit", handleAddTask);
  document.querySelectorAll(".task-card").forEach((card) => {
    card.addEventListener("click", handleDeleteTask);
  });

  // Make lanes droppable using jQuery UI.
  $(".lane").droppable({
    accept: ".task-card",
    drop: handleDrop,
  });
});
