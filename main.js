
window.onload = function () {
    var contIdTask = 0;

    var tittleText = document.createElement('h1');
    tittleText.id = 'tittleText';
    tittleText.innerText = 'Todo App';
    
    var inputTask = document.createElement('input');
    inputTask.id = 'inputTask';
    inputTask.placeholder = 'New Task'

    var buttonAdd = document.createElement('button');
    buttonAdd.id = 'buttonAdd';
    buttonAdd.innerText = 'Add';
    buttonAdd.type = 'button';
    buttonAdd.title = 'Agregar nueva tarea';
    
    var divContainer = document.createElement('div');
    divContainer.id = 'divContainer';
    
    
    var app = document.getElementById('app');

    var sectionTask = document.createElement('section');
    sectionTask.id = 'sectionTask';

    var listTask = document.createElement('ul');
    listTask.id = 'listTask';
    
    
    app.appendChild(tittleText);
    divContainer.appendChild(inputTask);
    divContainer.appendChild(buttonAdd);
    app.appendChild(divContainer);
    sectionTask.appendChild(listTask);
    app.appendChild(sectionTask);

    buttonAdd.addEventListener("click", () => {
        if (inputTask.value != '') {
            var newTask = document.createElement('li');
            newTask.id = 'newTask' + contIdTask;

            var buttonDelete = document.createElement('button');
            buttonDelete.id = 'buttonDelete' + contIdTask;
            buttonDelete.innerText = 'Delete';
            buttonDelete.type = 'button';
            buttonDelete.title = 'Eliminar Tarea';

            var pText = document.createElement('p');
            pText.id = 'pText' + contIdTask;
            pText.innerText = inputTask.value;

            var checkBoxTask = document.createElement('input');
            checkBoxTask.id = 'checkBoxTask' + contIdTask;
            checkBoxTask.type = 'checkbox';
            
            checkBoxTask.addEventListener("change", () => {
                
                checkBoxTaskId = checkBoxTask.id.substring(12);
                /*var pText = document.getElementById('pText'+checkBoxTaskId);*/
                alert('TareaCompletada'+checkBoxTaskId);
            });
            

            inputTask.value = '';
            newTask.appendChild(checkBoxTask);
            newTask.appendChild(pText);
            newTask.appendChild(buttonDelete);

            listTask.appendChild(newTask);
            contIdTask = contIdTask + 1;
        }
        else{
            alert("No puede dejar vacio el campo con el titulo de la nueva tarea");
        }
    });
}


