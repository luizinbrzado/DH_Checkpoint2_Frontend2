let footer = document.querySelector('footer');

function footerNoDom() {
    let footerHTML =
    `<a href="https://github.com/luizinbrzado" target="_blank" rel="noopener"><i class="fab fa-github-square fa-3x"></i></a>
    <p><span>&#169</span> Copyleft -  Feito com &#128151 por <a href="https://beacons.ai/luizinbrzado" target="_blank" rel="noopener">luizinbrzado</a></p>
    <a href="https://www.linkedin.com/in/luizinbrzado/" target="_blank" rel="noopener"><i class="fab fa-linkedin fa-3x"></i></a>`

    footer.innerHTML += footerHTML;
}

footerNoDom();