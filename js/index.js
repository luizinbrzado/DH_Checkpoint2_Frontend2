const btnAdd = document.getElementById('btn-add');
const counterTarefa = document.getElementById("counter-tarefa");
let tarefaInput = document.getElementById('tarefa');
const maxTarefaLenght = tarefaInput.getAttribute('maxlength');
let dataCriacaoInput = document.getElementById('data-criacao');
let dataFinalInput = document.getElementById('data-final');
let pesquisaInput = document.getElementById('search');

function reloadTemaJSON() {
    tema = (localStorage.getItem('tema')) ?
        JSON.parse(localStorage.getItem('tema')) : localStorage.setItem('tema', 0);
}

let dados = (localStorage.getItem('todoList')) ?
    JSON.parse(localStorage.getItem('todoList')) : {
        todo: [],
        completed: []
    };

let timing = setInterval(() => {
    let now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset())
    dataCriacaoInput.value = now.toISOString().slice(0, -8);
}, 200);

carregarToDoNoDOM()

tarefaInput.addEventListener("input", function (e) {
    const inputTarefaLenght = tarefaInput.value.length;

    counterTarefa.innerText = `${maxTarefaLenght - inputTarefaLenght}`;
    if (inputTarefaLenght >= maxTarefaLenght - 20) {
        counterTarefa.style.color = '#f55';
    } else {
        counterTarefa.style.color = '';
    };
});

btnAdd.addEventListener('click', () => {
    if (tarefaInput.value.replace(/\s/g, '') === '') {
        tarefaInput.placeholder = 'Campo obrigatório';
        tarefaInput.style.border = '1px solid #f55';
        tarefaInput.value = '';

        tarefaInput.addEventListener('focus', () => {
            tarefaInput.placeholder = '';
        });
    } else {
        tarefaInput.style.border = '';
    }

    if (dataFinalInput.value.trim().replace(/\s/g, '') === '') {
        dataFinalInput.type = 'text';
        dataFinalInput.style.border = '1px solid #f55';
        dataFinalInput.placeholder = 'Campo obrigatório';

        dataFinalInput.addEventListener('focus', () => {
            dataFinalInput.type = 'datetime-local'
            dataFinalInput.placeholder = '';
        });
    } else {
        dataFinalInput.style.border = '';
    }

    if (dataFinalInput.value < dataCriacaoInput.value) return;

    else if (tarefaInput.value.trim().replace(/\s/g, '') !== ''
        && dataCriacaoInput.value.trim().replace(/\s/g, '') !== ''
        && dataFinalInput.value.trim().replace(/\s/g, '') !== '') {
        addTarefa(tarefaInput.value.trim(), dataCriacaoInput.value.replace('T', ' ').replace(/-/g, '/'), dataFinalInput.value.replace('T', ' ').replace(/-/g, '/'))
    }
    if (tema === 0) {
        document.querySelectorAll('.todo-div').forEach(element => {
            element.style.backgroundColor = '#36393f'
            element.style.color = '#fff'
        });
    } else {
        document.querySelectorAll('.todo-div').forEach(element => {
            element.style.backgroundColor = '#2f3136'
            element.style.color = '#fff'
        });
    }

    counterTarefa.innerHTML = maxTarefaLenght;
})

function addTarefa(tarefaValue, dataCriacaoValue, dataFinalValue) {

    addTarefaNoDOM(tarefaValue, dataCriacaoValue, dataFinalValue);

    dados.todo.push({
        tarefa: tarefaValue,
        dataCriacao: dataCriacaoValue,
        dataFinal: dataFinalValue
    })

    localStorage.setItem('todoList', JSON.stringify(dados));

    tarefaInput.value = '';
    dataFinalInput.value = '';

    tarefaInput.focus();
}

function removerTarefa() {
    if (confirm("Quer mesmo apagar? (Clique em 'OK' ou pressione 'ENTER')")) {
        let item = this.parentNode.parentNode;
        let parent = item.parentNode;
        let id = parent.id;

        let tarefaTxt = item.firstChild.textContent;
        let dataCriacaoTxt = item.children[1].children[0].textContent;
        let dataFinalTxt = item.children[1].children[1].textContent;

        let value = {
            tarefa: tarefaTxt,
            dataCriacao: dataCriacaoTxt,
            dataFinal: dataFinalTxt
        }

        let todo = dados.todo;
        let completed = dados.completed;

        if (id === 'todo') {
            dados.todo.splice(todo.findIndex((a) => {
                return a.tarefa === value.tarefa;
            }), 1);
        } else {
            dados.completed.splice(completed.findIndex((a) => {
                return a.tarefa === value.tarefa;
            }), 1);
        }

        localStorage.setItem('todoList', JSON.stringify(dados));

        parent.removeChild(item);
    }
}

function completarTarefa() {
    let item = this.parentNode.parentNode;
    let parent = item.parentNode;
    let id = parent.id;

    let tarefaTxt = item.firstChild.textContent;
    let dataCriacaoTxt = item.children[1].children[0].children[0].textContent;
    let dataFinalTxt = item.children[1].children[2].children[0].textContent;

    let value = {
        tarefa: tarefaTxt,
        dataCriacao: dataCriacaoTxt,
        dataFinal: dataFinalTxt
    }

    if (id === 'todo') {
        dados.todo.splice(dados.todo.findIndex((a) => {
            return a.tarefa === value.tarefa;
        }), 1);
        dados.completed.push(value);
    } else {
        dados.completed.splice(dados.completed.findIndex((a) => {
            return a.tarefa === value.tarefa;
        }), 1);
        dados.todo.push(value);
    }

    localStorage.setItem('todoList', JSON.stringify(dados));

    let itemAlvo = (id === 'todo') ? document.getElementById('completed') : document.getElementById('todo');

    parent.removeChild(item);
    itemAlvo.insertBefore(item, itemAlvo.childNodes[0]);
}

function addTarefaNoDOM(tarefaValue, dataCriacaoValue, dataFinalValue, isCompleted) {
    let list = (isCompleted) ? document.getElementById('completed') : document.getElementById('todo');

    let item = document.createElement('div');
    item.classList.add('todo-div');
    item.innerHTML =
        `<h3>${tarefaValue}</h3>
        <div class="datas-tarefa">
        <p>Criado em: <span>${dataCriacaoValue}</span></p>
        <hr>
        <p>Data final: <span>${dataFinalValue}</span></p>
        </div>
        `;

    let buttons = document.createElement('div');
    buttons.classList.add('buttons');

    let remover = document.createElement('button');
    remover.classList.add('remover');
    remover.innerHTML =
        `<span class="fa-stack fa-1x">
        <i class="fas fa-circle fa-stack-2x"></i>
        <i class="fas fa-trash fa-stack-1x fa-inverse"></i>
        </span>`;

    remover.addEventListener('click', removerTarefa)

    let completar = document.createElement('button');
    completar.classList.add('completar');
    completar.innerHTML =
        `<span class="fa-stack fa-1x">
        <i class="fas fa-circle fa-stack-2x"></i>
        <i class="fas fa-check fa-stack-1x fa-inverse"></i>
        </span>`;

    completar.addEventListener('click', completarTarefa)

    buttons.appendChild(remover);
    buttons.appendChild(completar);
    item.appendChild(buttons);

    list.insertBefore(item, list.childNodes[0]);
}

function carregarToDoNoDOM() {
    if (!dados.todo.length && !dados.completed.length) return;

    for (let i = 0; i < dados.todo.length; i++) {
        let valueToDo = dados.todo[i];
        addTarefaNoDOM(valueToDo.tarefa, valueToDo.dataCriacao, valueToDo.dataFinal);
    }

    for (let j = 0; j < dados.completed.length; j++) {
        let valueCompleted = dados.completed[j];
        addTarefaNoDOM(valueCompleted.tarefa, valueCompleted.dataCriacao, valueCompleted.dataFinal, true);
    }
}

pesquisaInput.addEventListener('input', (e) => {
    let filtro = pesquisaInput.value.toLowerCase();
    let menu = document.querySelector('.todo-list');
    let menuItens = menu.querySelectorAll('.todo-div');

    for (let i = 0; i < menuItens.length; i++) {
        let links = menuItens[i].getElementsByTagName('h3')[0];
        if (links.innerHTML.toLowerCase().indexOf(filtro) > -1) {
            menuItens[i].style.display = "";
        } else {
            menuItens[i].style.display = "none";
        }
    }
})