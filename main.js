window.onload = function () {
    var contIdTask = 0;

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
    inputTask.placeholder = 'Escribe tu tarea aqui C:'

    //BUTTON ADD
    var buttonAdd = document.createElement('button');
    buttonAdd.id = 'buttonAdd';
    buttonAdd.innerText = 'Agregar';
    buttonAdd.type = 'button';
    buttonAdd.title = 'Agregar nueva tarea';

    //SECTION TASKS
    var sectionTask = document.createElement('section');
    sectionTask.id = 'sectionTask';

    //LIST TASKS
    var listTask = document.createElement('ul');
    listTask.id = 'listTask';


    //VIEW IN BROWSER
    app.appendChild(inputTask);
    app.appendChild(buttonAdd);
    sectionTask.appendChild(listTask);
    app.appendChild(sectionTask);

    //OBJECT TASK
    let task = function (id, taskName, complete) {
        this.id = id;
        this.taskName = taskName;
        this.complete = complete;
    };

    //functions
    function addTask(id, value, complete) {
        let newTask = new task(id, value, complete);
        db.tasks.push(newTask);
        localStorage.setItem('todoDB', JSON.stringify(db));
    }

    function getTask() {
        let db = JSON.parse(localStorage.getItem('todoDB'));

        if(!db || db === undefined){
            console.log('No hay tareas');
        }else{

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
    
                checkBoxTask.addEventListener("change", () => {
    
                    checkBoxTaskId = checkBoxTask.id.substring(12);
                    /*var pText = document.getElementById('pText'+checkBoxTaskId);*/
                    alert('TareaCompletada' + task.id);
                });
    
    
                inputTask.value = '';
                newTask.appendChild(checkBoxTask);
                newTask.appendChild(pText);
                newTask.appendChild(buttonDelete);
    
                listTask.appendChild(newTask);
            });
        }

    }

    getTask();

    buttonAdd.addEventListener("click", () => {
        if (inputTask.value != '') {

            addTask(contIdTask, inputTask.value, false);

            inputTask.value = '';


            contIdTask = contIdTask + 1;

            location.reload();

        } else {
            alert("No puede dejar vacio el campo con el titulo de la nueva tarea");
        }
    });
}