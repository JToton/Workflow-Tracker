// Retrieve tasks and nextId from localStorage.
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

// * Function to generate a unique task id.
//  unique task id var.
function generateTaskId() {
  return nextId++;
}

// * Function to create a task card.
function createTaskCard(task) {
  // Generates elements for a card.
  const card = `
    <div class="draggable card mb-3" id="task-${task.id}">
      <div class="card-body">
        <h5 class="card-title">${task.name}</h5>
        <p class="card-text">${task.description}</p>
        <p class="card-text"><small class="text-muted">${task.dueDate}</small></p>
        <button type="button" class="btn btn-danger btn-sm delete-task" data-task-id="${task.id}">Delete</button>
      </div>
    </div>
  `;
  // Returns the generated card.
  return card;
}

// ! Applying color coding to create function caused draggable failure. Separated.
// * Function to apply color coding to task cards based on due dates.
function applyColorCoding() {
  // Iterate through each task card and apply the appropriate color class.
  $(".card").each(function () {
    const dueDate = $(this).find(".text-muted").text();
    const currentDate = dayjs();
    const diffInDays = dayjs(dueDate).diff(currentDate, "day");

    let cardColor = "";
    // If the Task is late, red.
    if (diffInDays < 0) {
      cardColor = "red";
      // If the task is due today or tomorrow, yellow.
    } else if (diffInDays === 0) {
      cardColor = "yellow";
    }
    // All others default style.

    // Remove existing color classes and apply the new one.
    $(this).removeClass("red yellow blue").addClass(cardColor);
  });
}

// * Function to remove color coding from task cards when entering the "done" column.
function removeColorCoding() {
  $("#done-cards").find(".card").removeClass("red yellow blue");
}

// * Function to render the task list and make cards draggable.
// Clear existing task cards from different lanes.
function renderTaskList() {
  $("#todo-cards").empty();
  $("#in-progress-cards").empty();
  $("#done-cards").empty();

  // Iterate through task list and render task cards.
  // Render in the correct lane.
  // Create task card.
  // Append card to appropriate lane.
  taskList.forEach((task) => {
    const card = createTaskCard(task);
    $(`#${task.status}-cards`).append(card);
  });

  // Listener for delete task button on cards.
  $(".delete-task").click(handleDeleteTask);

  // Make task cards draggable using jQuery UI.
  // Revert card to original position if dropped outside droppable area.
  $(".draggable").draggable({
    // Increase z-index while dragging for visibility.
    start: function (event, ui) {
      $(this).css("z-index", "10000");
    },
    // Reset z-index after dragging.
    stop: function (event, ui) {
      $(this).css("z-index", "");
    },
  });

  // Make droppable using jQuery UI.
  $(".lane").droppable({
    // Accept only cards for dropping.
    // Call handleDrop function when a card is dropped.
    accept: ".card",
    drop: handleDrop,
  });

  // Apply color coding to task cards.
  applyColorCoding();

  // Remove color coding when cards are moved to the "done" lane.
  removeColorCoding();
}

// * Function to handle adding a new task.
function handleAddTask(event) {
  event.preventDefault();

  // Get form input values.
  const name = $("#taskName").val();
  const description = $("#taskDescription").val();
  const dueDate = $("#taskDueDate").val();

  // Generate unique task id.
  // Initial status for new task.
  const id = generateTaskId();
  const status = "todo";

  // Create new object.
  const newTask = {
    id,
    name,
    description,
    dueDate,
    status,
  };

  // Add new task to task list.
  // Update tasks in localStorage.
  taskList.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(taskList));

  // Render updated task list.
  // Hide modal after adding task.
  renderTaskList();
  $("#formModal").modal("hide");

  // Clear form fields after submission.
  $("#taskName").val("");
  $("#taskDescription").val("");
}

// * Function to handle deleting a task.
function handleDeleteTask(event) {
  // Get task id from delete button / selected task.
  const taskId = $(this).data("task-id");
  // Remove task from taskList.
  taskList = taskList.filter((task) => task.id !== taskId);
  // Update localStorage.
  localStorage.setItem("tasks", JSON.stringify(taskList));
  // Render updated task list.
  renderTaskList();
}

// * Function to handle dropping a task into a new status lane.
function handleDrop(event, ui) {
  // Extract task id from card id.
  const cardId = ui.draggable.attr("id").split("-")[1];
  // Get new status from target lane id.
  const newStatus = event.target.id;
  console.log(event.target);

  // Find index of task in taskList.
  const taskIndex = taskList.findIndex((task) => task.id === parseInt(cardId));

  // Update task status based on lane.
  taskList[taskIndex].status = newStatus;
  // Update localStorage.
  localStorage.setItem("tasks", JSON.stringify(taskList));
  // Render task list.
  renderTaskList();
}

// * On page load: render the task list and add event listeners.
$(document).ready(function () {
  // Render initial task list.
  renderTaskList();
  // Add event listener for form submission.
  $("#taskForm").submit(handleAddTask);
});
