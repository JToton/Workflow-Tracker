// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
  if (taskList.length === 0) {
    nextId = 1; // Reset to zero if no cards are present
  }

  const newId = nextId++;
  localStorage.setItem("nextId", JSON.stringify(nextId)); // Update nextId in localStorage
  return newId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  // Create a new task card element
  const card = document.createElement("div");
  card.classList.add("task-card"); // Add the "task-card" class to the card element

  // Set the HTML content of the task card
  card.innerHTML = `
        <div class="card mb-3"> <!-- Create a card div with Bootstrap styling -->
          <div class="card-body"> <!-- Create a card body div -->
            <h5 class="card-title">${task.name}</h5> <!-- Display the task name as the card title -->
            <p class="card-text">${task.description}</p> <!-- Display the task description -->
            <p class="card-text"><small class="text-muted">Due Date: ${task.dueDate}</small></p> <!-- Display the task due date -->
          </div>
        </div>
      `;

  return card; // Return the created task card element
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  // Code to handle deleting a task
  const taskId = event.target.dataset.taskId;
  const index = taskList.findIndex((task) => task.id === taskId);
  if (index !== -1) {
    taskList.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(taskList)); // Update tasks in localStorage

    // Decrement nextId when a task is removed
    nextId--;
    localStorage.setItem("nextId", JSON.stringify(nextId)); // Update nextId in localStorage
  }
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {});
