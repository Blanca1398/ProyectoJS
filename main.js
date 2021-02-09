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

            buttonDelete.addEventListener("click", () => {
                var opcion = confirm(`¿Estas seguro que deseas eliminar la tarea: ${document.getElementById('pText'+checkBoxTask.id.substring(12)).innerText}?`);
                if (opcion == true) {
                    const currentTask = document.getElementById('newTask'+checkBoxTask.id.substring(12));	
                    currentTask.parentNode.removeChild(currentTask);
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
                if(checkBoxTask.checked === true){
                    document.getElementById('newTask'+checkBoxTask.id.substring(12)).classList.add('done');
                } else {
                    document.getElementById('newTask'+checkBoxTask.id.substring(12)).classList.remove('done');
                }
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