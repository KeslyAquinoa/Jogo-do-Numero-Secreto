
// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do Número Secreto!';

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Descubra o número secreto entre 1 e 10.'
let listaDeNumerosSorteados = [];
let numeroLimite = 100;

gerarNumeroAleatorio = () => {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite) + 1;
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista === numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

exibirTextoNaTela = (tag, texto) => {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.2});
}

function escreverMensagemInicial(mensagem) {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto!');
    exibirTextoNaTela('p', 'Descubra o número secreto entre 1 e 100.');
}

escreverMensagemInicial();

verificarChute = () => {
    let chute = Number(document.querySelector('input').value);

    if (chute === numeroSecreto) {
        exibirTextoNaTela('h1', 'Parabéns! Você acertou!');

        let palavraTentativa = tentativas === 1 ? 'tentativa' : 'tentativas';

        let mensagemTentativas = `Você acertou o número secreto ${numeroSecreto} em ${tentativas} ${palavraTentativa}.`;

        exibirTextoNaTela('p', mensagemTentativas);

        document.getElementById('reiniciar').removeAttribute('disabled');

    } else if (chute < numeroSecreto) {
        exibirTextoNaTela('p', 'O número secreto é maior. Tente novamente!');
    } else {
        exibirTextoNaTela('p', 'O número secreto é menor. Tente novamente!');
    }

    tentativas++;
    limparCampo();
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    escreverMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
