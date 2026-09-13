const form = document.getElementById("task-form"); //get form
const taskName = document.getElementById("taskName");
const taskList = document.getElementById("taskList"); //get task list area


//storing tasks
const tasks = [];

//when clicking submit, runs addTask function 
form.addEventListener("submit", addTask);

function addTask(event){

    //stop refresh
    event.preventDefault();

    let text = taskName.value.trim();
    if(text === "")
    {
        return;
    }

    //which priority level did user pick
    let priority = "";
    
    if(document.getElementById("lowPriority").checked)
    {
        priority="Low";
    }
    else if(document.getElementById("medPriority").checked)
    {
        priority="Medium";
    }
    else if(document.getElementById("highPriority").checked)
    {
        priority="High";
    }

    //stop no level was picked
    if(priority === "")
    {
        return;
    }

    //task details
    const task = {
        name: text,
        priority: priority,
        completed: false
    };

    tasks.push(task); //add task to array

    displayTasks();
}

//displays tasks
function displayTasks()
{
    taskList.textContent = "";

    //goes through each task in array
    for(let i=0; i<tasks.length; i++)
    {
        const task = tasks[i];

        //rows for task
        const taskRow = document.createElement("div");
        taskRow.className = "task";

        //names for task
        const taskText = document.createElement("span");
        taskText.className = "taskName";
        taskText.textContent = task.name;

        //level for priority
        const priorityLevel = document.createElement("span");
        priorityLevel.className = "priority";
        priorityLevel.textContent = task.priority;


        //connects our CSS color styles to our priority level color
        if(task.priority === "Low")
        {
            priorityLevel.classList.add("low");
        }
        else if(task.priority === "Medium")
        {
            priorityLevel.classList.add("medium");
        }
        else if(task.priority === "High")
        {
            priorityLevel.classList.add("high");
        }

        //complete button
        const completeButton = document.createElement("button");
        completeButton.textContent = "Complete";

        //when complete button is clicked, task is crossed out
        completeButton.addEventListener("click", function()
        {
            completeTask(i);
        });

        //delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        //when delete button is clicked, task is deleted
        deleteButton.addEventListener("click", function()
        {
            removeTask(i);
        });

        if(task.completed)
        {
            taskRow.classList.add("completed");
        }
        taskRow.appendChild(taskText);
        taskRow.appendChild(priorityLevel);
        taskRow.appendChild(completeButton);
        taskRow.appendChild(deleteButton);

        taskList.appendChild(taskRow);

    }
}
//complete task
function completeTask(i)
{
    tasks[i].completed = true;
    displayTasks();
}

//remove the task
function removeTask(i)
{
    tasks.splice(i, 1);
    displayTasks();
}
