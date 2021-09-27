const titlePrincipal = document.title;

let isNotificacaoAceita = (localStorage.getItem('aviso')) ?
    JSON.parse(localStorage.getItem('aviso')) : aceitarNotificacaoHTML();

function reloadDivs() {
    divs = document.getElementById('todo').querySelectorAll('.todo-div');
}

function reloadIsNotificacaoAceita() {
    isNotificacaoAceita = (localStorage.getItem('aviso')) ?
        JSON.parse(localStorage.getItem('aviso')) : aceitarNotificacaoHTML();
}

function notificacao() {
    if (isNotificacaoAceita) {
        window.addEventListener('blur', () => {
            reloadDivs();
            let titleAlternativo = `(${divs.length}) ${titlePrincipal}`;

            if (document.title == titlePrincipal) {
                document.title = titleAlternativo;
            }
        })

        window.addEventListener('focus', () => {
            document.title = titlePrincipal;
        })
    } else if (isNotificacaoAceita === undefined) {
    } else if (!isNotificacaoAceita) {
        avisoNotificacaoNaoAceitaHTML();
    };
}

notificacao();

function aceitarNotificacaoHTML() {

    let div = document.createElement('div');
    div.id = "aceitar-not";

    let h3 = document.createElement('h3');
    h3.textContent = `Deseja ser notificado através do título da página?`;

    let divFilha = document.createElement('div');

    let buttonAceitar = document.createElement('button');
    buttonAceitar.innerHTML = 'Sim';

    buttonAceitar.addEventListener('click', () => {
        localStorage.setItem('aviso', true);
        div.style.animation = 'animate_notificacao_out 1s ease-in-out';

        reloadIsNotificacaoAceita();
        notificacao();

        setTimeout(() => {
            div.remove();
        }, 1000);
    })

    let buttonNegar = document.createElement('button');
    buttonNegar.innerHTML = 'Não';

    buttonNegar.addEventListener('click', () => {
        localStorage.setItem('aviso', false);
        div.style.animation = 'animate_notificacao_out 1s ease-in-out';
        setTimeout(() => {
            div.remove();
        }, 1000);
    })

    divFilha.append(buttonAceitar, buttonNegar);
    div.append(h3, divFilha);
    document.querySelector('main').append(div);
}

function avisoNotificacaoNaoAceitaHTML() {
    let divPai = document.createElement('div');
    divPai.id = 'aviso-not';

    let divMensagem = document.createElement('div');

    let divButtons = document.createElement('div');

    let buttonFechar = document.createElement('button');
    buttonFechar.innerHTML = '<i class="fas fa-times-circle"></i>';

    buttonFechar.addEventListener('click', () => {
        divPai.style.animation = 'animate_notificacao_out 1s ease-in-out';
        setTimeout(() => {
            divPai.remove();
        }, 1000);
    })

    let buttonAtivarNotificacao = document.createElement('button');
    buttonAtivarNotificacao.innerText = 'Ativar notificações'

    buttonAtivarNotificacao.addEventListener('click', () => {
        localStorage.setItem('aviso', true);
        divPai.style.animation = 'animate_notificacao_out 1s ease-in-out';

        reloadIsNotificacaoAceita();
        notificacao();

        setTimeout(() => {
            divPai.remove();
        }, 1000);
    })

    let image = document.createElement('i');
    image.classList.add('fas', 'fa-exclamation-triangle')

    let h3 = document.createElement('h3');
    h3.textContent = 'Você não ativou as notificações no título!';

    divMensagem.append(image, h3);
    divButtons.append(buttonAtivarNotificacao, buttonFechar);
    divPai.append(divMensagem, divButtons);

    document.querySelector('main').append(divPai);
}