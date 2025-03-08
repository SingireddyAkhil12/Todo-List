let todoList = [];
check();
requestNotificationPermission();

function add() {
    let inputElement = document.querySelector('.todo-input');
    let inputText = inputElement.value.trim();

    let dateElement = document.querySelector('.todo-date');
    let inputDate = dateElement.value;

    let timeElement = document.querySelector('.todo-time');
    let inputTime = timeElement.value;

    let spanElement = document.querySelector('.no-tasks');
    let messageElement = document.querySelector('.task-message');

    if (inputText === '' || inputDate === '' || inputTime === '') {
        alert("Please enter task details!");
        return;
    }

    todoList.push({ item: inputText, dueDate: inputDate, dueTime: inputTime });

    inputElement.value = '';
    dateElement.value = "";
    timeElement.value = "";
    spanElement.innerHTML = '';

    // messageElement.innerHTML = `<p class="task-started-msg">Task "${inputText}" has started!</p>`;
    
    display();
}

function display() {
    let containerElement = document.querySelector('.show-container');
    let newHTML = '';

    for (let i = 0; i < todoList.length; i++) {
        let { item, dueDate, dueTime } = todoList[i];

        newHTML += `
        <span>${item}</span>
        <span>${dueDate}</span>
        <span>${dueTime}</span>
        <button class="btn-del btn" onclick="deleteTask(${i})">Delete</button>
        `;
    }
    containerElement.innerHTML = newHTML;
}

function deleteTask(index) {
    todoList.splice(index, 1);
    display();
    check();
}

function check() {
    let spanElement = document.querySelector('.no-tasks');
    let messageElement = document.querySelector('.task-message');

    if (todoList.length === 0) {
        spanElement.innerHTML = `
        <img src="images/No-Tasks.gif" alt="No Tasks">
        <p class="no-tasks-heading">No Tasks to do...</p>
        `;
        
        messageElement.innerHTML = "";
    }
}

function requestNotificationPermission() {
    if ("Notification" in window) {
        Notification.requestPermission();
    }
}

function checkTaskTime() {
    let now = new Date();
    let currentHour = now.getHours().toString().padStart(2, '0');
    let currentMinute = now.getMinutes().toString().padStart(2, '0');
    let currentTime = `${currentHour}:${currentMinute}`;

    for (let i = 0; i < todoList.length; i++) {
        if (todoList[i].dueTime === currentTime) {
            showNotification(todoList[i].item);
            alert(`Time for task: ${todoList[i].item}`);
            deleteTask(i); 
            break; 
        }
    }
}

function showNotification(taskName) {
    if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Task Reminder", {
            body: `Time for task: ${taskName}`,
            icon: "images/to-do-list.png"
        });
    }
}

setInterval(checkTaskTime, 60000);
