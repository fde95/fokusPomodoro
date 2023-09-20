const html = document.querySelector('html');
const focoBtn = document.querySelector('.app__card-button--foco');;
const curtoBtn = document.querySelector('.app__card-button--curto')
const longoBtn = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const startPauseBtn = document.querySelector('#start-pause');
const iniciarOuPausarBtn = document.querySelector('#start-pause span');
const iconeStartPause = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');

let tempoDecorridoEmSegundos = 1500
let intervaloId = null

const musica = new Audio ('/sons/luna-rise-part-one.mp3');
musica.loop = true

const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3')


function alterarContexto (contexto) {
    mostrarTempo();
    botoes.forEach(function(contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);

    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
        default:
            break;
    }
};

focoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    tempoInicialEmSegundos = tempoDecorridoEmSegundos;
    alterarContexto('foco');
    focoBtn.classList.add('active')
});

curtoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    tempoInicialEmSegundos = tempoDecorridoEmSegundos;
    alterarContexto('descanso-curto');
    curtoBtn.classList.add('active')
});

longoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    tempoInicialEmSegundos = tempoDecorridoEmSegundos;
    alterarContexto('descanso-longo');
    longoBtn.classList.add('active')
})

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    };
});

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        audioTempoFinalizado.play()
        alert('Tempo finalizado!');
        tempoDecorridoEmSegundos = tempoInicialEmSegundos
        mostrarTempo()
        zerar();
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo();
}

startPauseBtn.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intervaloId){
        audioPausa.play()
        zerar()
        return
    }
    audioPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBtn.textContent = "Pausar"
    iconeStartPause.setAttribute('src', '/imagens/pause.png')
}

function zerar() {
    clearInterval(intervaloId) 
    iniciarOuPausarBtn.textContent = "Começar"
    iconeStartPause.setAttribute('src', '/imagens/play_arrow.png')
    intervaloId = null
}


function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', { minute: '2-digit', second: '2-digit' });
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}


mostrarTempo();