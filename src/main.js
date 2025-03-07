document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("formMain").addEventListener("submit", function(event){
        event.preventDefault();
    });
});

tasks = [];
taskCount = 0

function createTask() {
    let taskID = taskCount;
    taskCount += 1;
    let title = document.getElementById("formText").value;
    let priority = document.getElementById("formSelect").value;
    let status = document.getElementById("formCheck").checked;
    tasks.push({taskID: taskID, title: title, priority: priority, status: status});
    console.log(tasks);
    
    if (status) {
        area = document.getElementById("divComplete");
    } else if (priority == "1") {
        area = document.getElementById("divLow");
    } else if (priority == "2") {
        area = document.getElementById("divMedium");
    } else if (priority == "3") {
        area = document.getElementById("divHigh");
    }
    
    const newContainer = document.createElement("div");
    newContainer.id = taskID;
    newContainer.className = "row";
    area.appendChild(newContainer);

    const newTask = document.createElement("div");
    newTask.id = "task";
    newTask.className = "col-12";
    newContainer.appendChild(newTask);

    const newDelete = document.createElement("button");
    newDelete.className = "delete";
    newDelete.addEventListener('click', function() {
        deleteTask(this);
    });
    newDelete.textContent = "x";
    newTask.appendChild(newDelete);

    const newCheck = document.createElement("input");
    newCheck.id = "taskCheck";
    newCheck.type = "checkbox";
    newCheck.checked = status;
    newCheck.addEventListener('change', function() {
        onCheck(this)
    });
    newTask.appendChild(newCheck);

    const newBullet = document.createElement("label");
    newBullet.id = "bullet"
    if (priority == "1") {
        newBullet.style.color = "green";
    } else if (priority == "2") {
        newBullet.style.color = "yellow";
    } else if (priority == "3") {
        newBullet.style.color = "red";
    }
    newBullet.textContent = "•";
    newTask.appendChild(newBullet);

    const newTitle = document.createElement("label");
    newTitle.id = "formLabel";
    newTitle.textContent = title;
    newTask.appendChild(newTitle);

    if (status) {
        newCheck.parentElement.lastElementChild.style.textDecoration = "line-through";
    }

    document.getElementById("formText").value = "";
    document.getElementById("formSelect").value = "1";
    document.getElementById("formCheck").checked = false;
}

function deleteTask(element) {
    const taskDiv = element.parentElement.parentElement;
    const taskFilter = tasks.filter(task => task.taskID !== parseInt(taskDiv.id));
    tasks = taskFilter;
    taskDiv.remove();
}

function onCheck(element) {
    const taskDiv = element.parentElement.parentElement;
    const taskFind = tasks.find(task => task.taskID === parseInt(taskDiv.id));
    if (element.checked) {
        document.getElementById("divComplete").appendChild(taskDiv)
        element.parentElement.lastElementChild.style.textDecoration = "line-through";
        taskFind.status = true;
    } else {
        element.parentElement.lastElementChild.style.textDecoration = "none";
        if (taskFind.priority == "1") {
            document.getElementById("divLow").appendChild(taskDiv)
        } else if (taskFind.priority == "2") {
            document.getElementById("divMedium").appendChild(taskDiv)
        } else if (taskFind.priority == "3") {
            document.getElementById("divHigh").appendChild(taskDiv)
        }
        taskFind.status = false;
    }
}