let led = document.getElementById("led");
let maisVelo = document.getElementById("maisVelo");
let menosVelo = document.getElementById("menosVelo");
let tela = document.getElementById("tela");
let serra = document.getElementById("serra");
let monitor = document.getElementById("monitor");

let clickAudio = new Audio("audio/click.mp3")
let clickMenoseMais = new Audio("audio/click-e+.mp3")
let fan01 = new Audio("audio/fan01.mp3")

fan01.loop = true;
fan01.volume = 0.7

let statusBotao = false;

let veloAtual = 0;
let maxVelo = 4;
let minVelo = 0;


function limparInput(input, tempo = 3000) {
    setTimeout(() => {
        input.value = '';
    }, tempo);
}

function atualizarMonitor(mensagem) {
    monitor.value = mensagem;
    limparInput(monitor);
    // console.log(mensagem);
}

//para ligar e desligar
function ligaDesliga() {
    clickAudio.play()
    //desligar: torna vermelho
    if (statusBotao) {
        statusBotao = false
        veloAtual = 0
        tela.value = 0;       //zera a velocidade atual no input
        fan01.pause();
        fan01.currentTime = 0;
        serra.style.animation = "none";
        led.classList.remove("ledLigado")
        led.classList.add("ledDesligado");
        atualizarMonitor("Desligado");
    //ligar: torna verde
    } else {
        statusBotao = true
        led.classList.remove("ledDesligado");
        led.classList.add("ledLigado")
        atualizarMonitor("Ligado");
    }
};


//aumentar a velocidade ao clicar no botão +
function aumentarVelo(){
    clickMenoseMais.play();

    if (statusBotao && veloAtual < maxVelo) {
        fan01.play();
        veloAtual += 1;
        tela.value = veloAtual; //mostra a velocidade atual no input
        serra.style.animation = `girarSerra ${1 / veloAtual}s linear infinite`;

    } else if (!statusBotao) {
        atualizarMonitor("Ventilador está desligado.");
    }else {
        atualizarMonitor("Velocidade máxima atingida.");
    }
}
//diminuir a velocidade ao clicar no botão -
function diminuirVelo(){
    clickMenoseMais.play();

    if (statusBotao && veloAtual > minVelo) {
        veloAtual -=1;
        fan01.play();
        tela.value = veloAtual;

        if (veloAtual > 0){
            serra.style.animation = `girarSerra ${1 / veloAtual}s linear infinite`;
        } else {
            fan01.pause();
            fan01.currentTime = 0;
            serra.style.animation = "none";
        }

    } else if (!statusBotao) {
        atualizarMonitor("Ventilador está desligado.");
    } else {
        atualizarMonitor("Velocidade mínima atingida.");
    }
}







