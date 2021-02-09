window.onload = function () {
    var contIdTask = 0;

    var tittleText = document.createElement('h1');
    tittleText.id = 'tittleText';
    tittleText.innerText = 'Todo App';

    let db = JSON.parse(localStorage.getItem('todoDB'));

    if (!db || db == undefined) {
        db = {
            tasks: []
        };

        contIdTask = 0
    } else {
        contIdTask = db.tasks.length;
    }


    //PARENTS CONTAINER
    var app = document.getElementById('app');

    //INPUT
    var inputTask = document.createElement('input');
    inputTask.id = 'inputTask';
    inputTask.placeholder = 'New Task'

    //BUTTON ADD
    var buttonAdd = document.createElement('button');
    buttonAdd.id = 'buttonAdd';
    buttonAdd.innerText = 'Add';
    buttonAdd.type = 'button';
    buttonAdd.title = 'Agregar nueva tarea';

    var divContainer = document.createElement('div');
    divContainer.id = 'divContainer';

    //SECTION TASKS
    var sectionTask = document.createElement('section');
    sectionTask.id = 'sectionTask';

    //LIST TASKS
    var listTask = document.createElement('ul');
    listTask.id = 'listTask';

    app.appendChild(tittleText);
    divContainer.appendChild(inputTask);
    divContainer.appendChild(buttonAdd);
    app.appendChild(divContainer);
    sectionTask.appendChild(listTask);
    app.appendChild(sectionTask);

    //OBJECT TASK
    let task = function (id, taskName, complete) {
        this.id = id;
        this.taskName = taskName;
        this.complete = complete;
    };

    //functions
    function completeTaks(id) {

        console.log("Holas" + id);
        for (var i = 0; i < db.tasks.length; i++) {
            if (db.tasks[i].id == parseInt(id, 10)) {
                idTask = i;
                if (db.tasks[i].complete == 0) {
                    db.tasks[i].complete = 1;
                    document.getElementById('newTask' + id).classList.add('done');
                    document.getElementById('checkBoxTask' + id).checked = true;

                } else {
                    db.tasks[i].complete = 0;
                    document.getElementById('newTask' + id).classList.remove('done');
                    document.getElementById('checkBoxTask' + id).checked = false;
                }
            }

        }
        localStorage.setItem('todoDB', JSON.stringify(db));
        console.log(localStorage);
    }

    function addTask(id, value, complete) {
        let newTask = new task(id, value, complete);
        db.tasks.push(newTask);
        localStorage.setItem('todoDB', JSON.stringify(db));
        console.log(localStorage);
    }

    function deleteTask(id) {
        var idTask = 0;
        for (var i = 0; i < db.tasks.length; i++) {
            if (db.tasks[i].id == parseInt(id, 10)) {
                idTask = i;
            }
        }
        console.log(idTask);
        db.tasks.splice(idTask, 1);

        localStorage.setItem('todoDB', JSON.stringify(db));
        console.log(localStorage);
    }

    function getTask() {
        let db = JSON.parse(localStorage.getItem('todoDB'));
        console.log(localStorage);

        if (!db || db === undefined) {
            console.log('No hay tareas');
        } else {

            db.tasks.forEach(task => {

                var newTask = document.createElement('li');
                newTask.id = 'newTask' + task.id;

                var buttonDelete = document.createElement('button');
                buttonDelete.id = 'buttonDelete' + task.id;
                buttonDelete.innerText = 'Delete';
                buttonDelete.type = 'button';
                buttonDelete.title = 'Eliminar Tarea';

                var pText = document.createElement('p');
                pText.id = 'pText' + task.id;
                pText.innerText = task.taskName;

                var checkBoxTask = document.createElement('input');
                checkBoxTask.id = 'checkBoxTask' + task.id;
                checkBoxTask.type = 'checkbox';

                if (task.complete == 1) {
                    newTask.classList.add('done');
                    checkBoxTask.checked = true;

                } else {
                    newTask.classList.remove('done');
                    checkBoxTask.checked = false;
                }

                checkBoxTask.addEventListener("change", () => {
                    if (checkBoxTask.checked === true) {
                        document.getElementById('newTask' + checkBoxTask.id.substring(12)).classList.add('done');
                        completeTaks(task.id);
                    } else {
                        document.getElementById('newTask' + checkBoxTask.id.substring(12)).classList.remove('done');
                        completeTaks(task.id);
                    }
                });

                buttonDelete.addEventListener("click", () => {
                    var opcion = confirm(`¿Estas seguro que deseas eliminar la tarea: ${document.getElementById('pText'+checkBoxTask.id.substring(12)).innerText}?`);
                    if (opcion == true) {
                        const currentTask = document.getElementById('newTask' + checkBoxTask.id.substring(12));
                        currentTask.parentNode.removeChild(currentTask);
                        deleteTask(checkBoxTask.id.substring(12));
                    } else {
                        // Ok no hago nada
                    }
                });

                inputTask.value = '';
                newTask.appendChild(checkBoxTask);
                newTask.appendChild(pText);
                newTask.appendChild(buttonDelete);

                listTask.appendChild(newTask);

                contIdTask = task.id + 1;
            });
        }

    }

    getTask();

    buttonAdd.addEventListener("click", () => {
        if (inputTask.value != '') {
            var newTask = document.createElement('li');
            newTask.id = 'newTask' + contIdTask;

            var buttonDelete = document.createElement('button');
            buttonDelete.id = 'buttonDelete' + contIdTask;
            buttonDelete.innerText = 'Delete';
            buttonDelete.type = 'button';
            buttonDelete.title = 'Eliminar Tarea';

            buttonDelete.addEventListener("click", () => {
                var opcion = confirm(`¿Estas seguro que deseas eliminar la tarea: ${document.getElementById('pText'+checkBoxTask.id.substring(12)).innerText}?`);
                if (opcion == true) {
                    const currentTask = document.getElementById('newTask' + checkBoxTask.id.substring(12));
                    currentTask.parentNode.removeChild(currentTask);
                    deleteTask(checkBoxTask.id.substring(12));
                } else {
                    // Ok no hago nada
                }
            });

            var pText = document.createElement('p');
            pText.id = 'pText' + contIdTask;
            pText.innerText = inputTask.value;

            var checkBoxTask = document.createElement('input');
            checkBoxTask.id = 'checkBoxTask' + contIdTask;
            checkBoxTask.type = 'checkbox';

            checkBoxTask.addEventListener("change", () => {
                if (checkBoxTask.checked === true) {
                    document.getElementById('newTask' + checkBoxTask.id.substring(12)).classList.add('done');
                    completeTaks(task.id);
                } else {
                    document.getElementById('newTask' + checkBoxTask.id.substring(12)).classList.remove('done');
                    completeTaks(task.id);
                }
            });



            newTask.appendChild(checkBoxTask);
            newTask.appendChild(pText);
            newTask.appendChild(buttonDelete);

            listTask.appendChild(newTask);

            addTask(contIdTask, inputTask.value, 0);

            inputTask.value = '';


            contIdTask = contIdTask + 1;

            location.reload();

        } else {
            alert("No puede dejar vacio el campo con el titulo de la nueva tarea");
        }
    });
}
