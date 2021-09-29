let header = document.querySelector('header');
let tema;

function reloadTemaJSON() {
    tema = (localStorage.getItem('tema')) ?
        JSON.parse(localStorage.getItem('tema')) : localStorage.setItem('tema', 0);
}

function headerNoDOM() {
    reloadTemaJSON();
    let nav = document.createElement('nav');

    let buttonHome = document.createElement('button');
    let imageHome = document.createElement('img');
    imageHome.src = './img/to_do.png';
    buttonHome.addEventListener('click', () => {
        window.location.pathname = '/DH_Checkpoint2_Frontend2/index.html';
        temaSite();
    })

    let divButtons = document.createElement('div');

    let buttonTema = document.createElement('button');
    let buttonTemaContent;

    function temaSite() {
        if (tema === 0) {
            buttonTemaContent = `<i class="fas fa-sun"></i>`

            document.body.style.backgroundColor = '#5865f2';

            document.querySelector('header').querySelector('img').style.filter = 'invert(1)'

            document.querySelector('header').querySelectorAll('button').forEach((element) => {
                element.style.color = '#fff';
            })

            document.querySelectorAll('.todo-div').forEach(element => {
                element.style.backgroundColor = '#36393f'
                element.style.color = '#fff'
            });

            if (window.location.pathname.includes('index') || window.location.pathname == ('/DH_Checkpoint2_Frontend2/')) {
                document.querySelector('.criar-tarefa').style.backgroundColor = '#36393f';

                document.querySelector('.criar-tarefa').querySelectorAll('input').forEach(element => {
                    element.style.backgroundColor = '#2f3136';
                    element.style.color = '#fff'
                })
            }

        } else {
            buttonTemaContent = `<i class="fas fa-moon"></i>`

            document.body.style.backgroundColor = '#36393f';

            document.querySelector('header').querySelector('img').style.filter = 'invert(1)'

            document.querySelectorAll('.todo-div').forEach(element => {
                element.style.backgroundColor = '#2f3136'
                element.style.color = '#fff'
            });

            document.querySelector('header').querySelectorAll('button').forEach((element) => {
                element.style.color = '#fff';
            })

            if (window.location.pathname.includes('index') || window.location.pathname == ('/DH_Checkpoint2_Frontend2/')) {
                document.querySelector('.criar-tarefa').style.backgroundColor = '#2f3136';

                document.querySelector('.criar-tarefa').querySelectorAll('input').forEach(element => {
                    element.style.backgroundColor = '#36393f';
                    element.style.color = '#fff'
                })
            }
        }

        buttonTema.innerHTML = buttonTemaContent;
    }


    buttonTema.addEventListener('click', () => {
        if (tema === 0) {
            localStorage.setItem('tema', 1)
        } else {
            localStorage.setItem('tema', 0)
        }
        reloadTemaJSON();
        temaSite();
    })

    let buttonSiteAPI = document.createElement('button');
    buttonSiteAPI.textContent = 'API Site'
    buttonSiteAPI.addEventListener('click', () => {
        window.location.pathname = '/DH_Checkpoint2_Frontend2/api.html'
    })

    buttonHome.appendChild(imageHome);
    divButtons.append(buttonSiteAPI, buttonTema);
    nav.append(buttonHome, divButtons);
    header.appendChild(nav);

    temaSite();
}

reloadTemaJSON();
headerNoDOM();
