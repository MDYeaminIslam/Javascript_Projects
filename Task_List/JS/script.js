// Define UI elements
let form = document.querySelector('#task_form');
let taskList = document.querySelector('ul#task_li');
let clearBtn = document.querySelector('#clear_task_btn');
let filter = document.querySelector('#task_filter');
let taskInput = document.querySelector('#new_task');

// Define event listeners
form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clearTask);
filter.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getTasks); //when the DOM is loaded we are calling the getTasks function


// Define functions
// Add Task
function addTask(e) {
  e.preventDefault(); // Prevent form submission.In the context of your code, e.preventDefault() is used inside the addTask function, which is triggered when the form is submitted. By default, when a form is submitted, the page gets refreshed or redirected to another page.

  if (taskInput.value === '') {
    alert('Add a task!');
  } else {
    // Create li element
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(taskInput.value + ' '));

    let link = document.createElement('a');
    link.setAttribute('href', '#');
    link.innerHTML = 'x';
    li.appendChild(link);
    taskList.appendChild(li); // Append li element to the taskList
    storeTaskInLocalStorage(taskInput.value); // Store in LS
    taskInput.value = '';
  }
}

// Remove Task
function removeTask(e) {
    //here we are checking if the target element has the attribute href
    //target is the element that triggered the event and if it has the attribute href then we are removing the parent element of the target element.
    if(e.target.hasAttribute("href")) {
        if(confirm("Are you sure?")) {
            let ele = e.target.parentElement;
            ele.remove(); //removing the parent element of the target element
            //console.log(ele);
            removeFromLS(ele); //removing from local storage
        }
    }
    
}



//Clear Task

function clearTask(e) {
    //slower way
    //taskList.innerHTML = "";

    //faster way
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
        console.log(taskList.firstChild);
    }
    localStorage.clear(); //clearing the local storage


}


//Filter Function

function filterTask(e) {
    let text = e.target.value.toLowerCase(); //getting the value of the input field and converting it to lowercase

    document.querySelectorAll("li").forEach(task => {
        let item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    });
}


//Store in Local Storage

function storeTaskInLocalStorage(task){
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = []; //if there is no task in the local storage then we are creating an empty array
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks')); //if there is already a task in the local storage then we are parsing it to JSON. Local storage is build in object.
  }
  tasks.push(task); //pushing the task to the array

  localStorage.setItem('tasks', JSON.stringify(tasks)); //setting the item in the local storage. Local storage can only store string so we are converting the array to string using JSON.stringify
}


function getTasks(){
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = []; //if there is no task in the local storage then we are creating an empty array
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks')); //if there is already a task in the local storage then we are parsing it to JSON. Local storage is build in object.
  }

  tasks.forEach(task => {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(task + ' '));

    let link = document.createElement('a');
    link.setAttribute('href', '#');
    link.innerHTML = 'x';
    li.appendChild(link);
    taskList.appendChild(li);
  });
}

//Remove from Local Storage
function removeFromLS(taskItem){
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = []; //if there is no task in the local storage then we are creating an empty array
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks')); //if there is already a task in the local storage then we are parsing it to JSON. Local storage is build in object.
  }

  let li = taskItem;
  li.removeChild(li.lastChild); //removing the link from the li element
  tasks.forEach((task, index) => {
    if(li.textContent.trim() === task){
      tasks.splice(index, 1); //removing the task from the array
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks)); //setting the item in the local storage. Local storage can only store string so we are converting the array to string using JSON.stringify
}