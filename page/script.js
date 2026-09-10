let jogoAtivo = false;
let corridaComecou = false;
let posJogador = 0;
let posSonic = 0;
let intervaloSonic = null;
let distanciaTotal = 0;
let duracaoAtual = 0;

const passoJogador = 25;

const duracoes = {
    facil: 4032,
    medio: 3360,
    dificil: 2688,
    impossivel: 336
};

function iniciarJogo(nivel) {
    jogoAtivo = true;
    corridaComecou = false;
    posJogador = 0;
    posSonic = 0;
    duracaoAtual = duracoes[nivel];

    $('#telaDificuldade').addClass('escondido');
    $('#telaJogo').removeClass('escondido');
    $('#btnCorrer').removeClass('escondido');
    $('#btnReiniciar').addClass('escondido');

    distanciaTotal = $('.raia').width() - $('#jogador').width() - 10;

    $('#jogador').css('left', posJogador + 'px');
    $('#sonic').css('left', posSonic + 'px');
    $('#status').text('Clique ou aperte espaço para começar a corrida!');
}

function iniciarCorridaSonic() {
    const passoSonic = distanciaTotal / (duracaoAtual / 50);

    intervaloSonic = setInterval(function() {
        posSonic += passoSonic;
        if (posSonic >= distanciaTotal) {
            posSonic = distanciaTotal;
            $('#sonic').css('left', posSonic + 'px');
            terminarJogo('derrota');
            return;
        }
        $('#sonic').css('left', posSonic + 'px');
    }, 50);
}

function avancar() {
    if (!jogoAtivo) return;

    if (!corridaComecou) {
        corridaComecou = true;
        iniciarCorridaSonic();
        $('#status').text('Vai! Clique rápido para vencer o Sonic!');
    }

    posJogador += passoJogador;
    if (posJogador >= distanciaTotal) {
        posJogador = distanciaTotal;
        $('#jogador').css('left', posJogador + 'px');
        terminarJogo('vitoria');
        return;
    }
    $('#jogador').css('left', posJogador + 'px');
}

function terminarJogo(resultado) {
    jogoAtivo = false;
    clearInterval(intervaloSonic);

    if (resultado == 'vitoria') {
        $('#status').text('Você venceu o Sonic! Vitória!');
    } else {
        $('#status').text('O Sonic chegou primeiro. Derrota!');
    }

    $('#btnCorrer').addClass('escondido');
    $('#btnReiniciar').removeClass('escondido');
}

function reiniciarJogo() {
    jogoAtivo = false;
    corridaComecou = false;
    clearInterval(intervaloSonic);
    $('#status').text('');
    $('#telaJogo').addClass('escondido');
    $('#telaDificuldade').removeClass('escondido');
}

$(document).on('keydown', function(e) {
    if (e.code == 'Space') {
        e.preventDefault();
        avancar();
    }
});
