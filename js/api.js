const completed = document.getElementById('completed');
const todo = document.getElementById('todo');
const mostrarDados = (result) => {
    for (const campo in result) {

        let divPai = document.createElement('div');
        divPai.classList.add('todo-div');

        let divFilha = document.createElement('div');

        let h4User = document.createElement('h4');
        h4User.textContent = `User ID: ${result[campo].userId}`

        let span = document.createElement('span');

        let h4Id = document.createElement('h4');
        h4Id.textContent = `ID: ${result[campo].id}`

        let h5 = document.createElement('h5');
        h5.textContent = `Tarefa: ${result[campo].title}`

        divFilha.append(h4User, span, h4Id);
        divPai.append(divFilha, h5);

        if (result[campo].completed) {
            completed.appendChild(divPai);
        } else {
            todo.appendChild(divPai);
        }
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
}

function carregarApi() {
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }
    fetch(`https://jsonplaceholder.typicode.com/todos/`, options)
        .then(response => {
            response.json()
                .then(dado => mostrarDados(dado))
        })
        .catch(e => console.error('Deu erro mano! ' + e, message))
}