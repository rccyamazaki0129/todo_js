const task_list = window.document.querySelector('#task-list ul');
const task_form = window.document.forms['add-task'];
const done_list = window.document.querySelector('#done-list ul');
const task_list_storage = JSON.parse(localStorage.getItem('task_list_storage')) || [];
const done_list_storage = JSON.parse(localStorage.getItem('done_list_storage')) || [];

/* load tasks from local storage */
window.onload = () => {
    const task_arr = Array.from(task_list_storage);
    task_arr.forEach(function(task){
        /* create a new list item element */
        const new_task = window.document.createElement('li');
        const new_task_item = window.document.createElement('span');
        const new_task_done_btn = window.document.createElement('button');

        /* add content */
        new_task_item.className = 'task';
        new_task_item.textContent = task;
        new_task_done_btn.className = 'done';
        new_task_done_btn.textContent = 'done';

        /* append the new task to the list */
        new_task.appendChild(new_task_item);
        new_task.appendChild(new_task_done_btn);
        task_list.appendChild(new_task);
    })
    
    const done_arr = Array.from(done_list_storage);
    done_arr.forEach(function(task){
        /* create a new list item element */
        const new_task = window.document.createElement('li');
        const new_task_item = window.document.createElement('span');
        const new_task_done_btn = window.document.createElement('button');

        /* add content */
        new_task_item.className = 'task';
        new_task_item.textContent = task;
        new_task_done_btn.className = 'done';
        new_task_done_btn.textContent = 'done';

        /* append the new task to the list */
        new_task.appendChild(new_task_item);
        new_task.appendChild(new_task_done_btn);
        new_task.querySelector('button').style.display = 'none';
        done_list.appendChild(new_task);
    })

}

/* move task to done list */
task_list.addEventListener('click', function(e){
    if (e.target.className == 'done'){
        const task = e.target.parentNode;
        task.querySelector('button').style.display = 'none';
        done_list.appendChild(task);

        /* update local strage */
        saveDoneToLocalStorage(task.children[0].textContent);
        // deleteTodoFromLocalStorage(task.children[0].textContent);
    }
});

/* add new task */
task_form.addEventListener('submit', (e) => {
    e.preventDefault();
    const new_task_value = task_form.querySelector('input[type="text"]').value;
    if (new_task_value == "") return;
    /* create a new list item element */
    const new_task = window.document.createElement('li');
    const new_task_item = window.document.createElement('span');
    const new_task_done_btn = window.document.createElement('button');

    /* add content */
    new_task_item.className = 'task';
    new_task_item.textContent = new_task_value;
    new_task_done_btn.className = 'done';
    new_task_done_btn.textContent = 'done';

    /* append the new task to the list */
    new_task.appendChild(new_task_item);
    new_task.appendChild(new_task_done_btn);
    task_list.appendChild(new_task);

    /* save info to local strage */
    saveTodoToLocalStorage(new_task_value);

    /* clear the form */
    task_form.querySelector('input[type="text"]').value = '';
});

/* show done tasks */
const show_done_check = window.document.querySelector('#show-done');
show_done_check.addEventListener('change', function(e){
    if (show_done_check.checked){
        done_list.parentElement.style.display = "initial";
    }
    else {
        done_list.parentElement.style.display = "none";
    }
});

/* delete all task from done-list */
const delete_btn = window.document.querySelector('#delete-done');
delete_btn.addEventListener('click', function(e){
    e.preventDefault();
    Array.from(done_list.children).forEach(function(done_task){
        done_list.removeChild(done_task);
    });

    /* save info to local strage */
    const empty = [];
    localStorage.setItem('done_list_storage', JSON.stringify(empty));
});

function saveDoneToLocalStorage(data){
    done_list_storage.push(data);
    localStorage.setItem('done_list_storage', JSON.stringify(done_list_storage));
    /* delete from task_list_storage */
    let index = 0;
    task_list_storage.forEach(function(task){
        if (task == data){
            task_list_storage.splice(index, 1);
        }
        index++;
    })
    localStorage.setItem('task_list_storage', JSON.stringify(task_list_storage));
    console.log("task_list_storage: " + task_list_storage);
    console.log("done_list_storage: " + done_list_storage);
}

function saveTodoToLocalStorage(new_task){
    task_list_storage.push(new_task);
    localStorage.setItem('task_list_storage', JSON.stringify(task_list_storage));
    console.log("task_list_storage: " + task_list_storage);
    console.log("done_list_storage: " + done_list_storage);
}