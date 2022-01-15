'use strict'

const display = document.getElementById('display');
// * qualquer elemento ou parte do atributo q seja tecla
const numeros = document.querySelectorAll('[id*=tecla]');
const operadores = document.querySelectorAll('[id*=operador]');

let novoNumero = true;
//q vai guardar operador
let operador;
let numeroAnterior;

//se operador esta vazio
const operacaoPendente = () => operador !== undefined;

const calcular = () => {
    if (operacaoPendente()) {
        const numeroAtual = parseFloat(display.textContent.replace(',', '.'));
        novoNumero = true;
        //eval envez da verificao com o if else
        const resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`);
        atualizarDisplay(resultado);

        //substituimos o eval no lugar do if

        // if (operador == '+') {
        //     atualizarDisplay(numeroAnterior + numeroAtual);
        // } else
        // if (operador == '-') {
        //     atualizarDisplay(numeroAnterior - numeroAtual);
        // } else if (operador == '*') {
        //     atualizarDisplay(numeroAnterior * numeroAtual);
        // } else if (operador == '/') {
        //     atualizarDisplay(numeroAnterior / numeroAtual);
        // }
    }
}

//atualizar
const atualizarDisplay = (texto) => {
    if (novoNumero) {
        //quando for novo numero ele substitui
        display.textContent = texto;
        //se ja clikou ele deixa de ser novo
        novoNumero = false;
    } else {
        //+= para concatenar os click quando nao for novo numero
        display.textContent += texto;
    }
};

// inserirNumero
const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);

//capturar o click das teclas
numeros.forEach(
    numero => numero.addEventListener('click', inserirNumero)
);

const selecionarOperador = (evento) => {
    if (!novoNumero) {
        calcular();
        novoNumero = true;
        operador = evento.target.textContent;
        //vai guardar o operador e numeroAnterior depois d click
        numeroAnterior = parseFloat(display.textContent.replace(',', '.'));
    }
}

operadores.forEach(operador => operador.addEventListener('click', selecionarOperador));


const ativarIgual = () => {
    calcular();
    //zerar operador para evitar refazer conexao
    operador = undefined;
}

document.getElementById('igual').addEventListener('click', ativarIgual);

const limparDisplay = () => display.textContent = '';

document.getElementById('limparDisplay').addEventListener('click', limparDisplay);

const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
}

document.getElementById('limparCalculo').addEventListener('click', limparCalculo);

//metodo para array
const removerUltimoCaractere = () => display.textContent = display.textContent.slice(0, -1);

document.getElementById('backspace').addEventListener('click', removerUltimoCaractere);

//* -1, vai pegar o numero e inverter o sinal do mesmo
const inverterSinal = () => {
    novoNumero = true;
    atualizarDisplay(display.textContent * -1);
}

document.getElementById('inverter').addEventListener('click', inverterSinal);

//true quando for diferent d -1,  e false quando igual a -1
const existeDecimal = () => display.textContent.indexOf(',') !== -1;

const existeValor = () => display.textContent.length > 0;

const inserirDecimal = () => {
    //so pode inserir quando nao existe virgula
    if (!existeDecimal()) {
        if (existeValor()) {
            atualizarDisplay(',');
        } else {
            atualizarDisplay('0,');
        }
    }
}

document.getElementById('decimal').addEventListener('click', inserirDecimal);

const mapaTeclado = {
    '0': 'tecla0',
    '1': 'tecla1',
    '2': 'tecla2',
    '3': 'tecla3',
    '4': 'tecla4',
    '5': 'tecla5',
    '6': 'tecla6',
    '7': 'tecla7',
    '8': 'tecla8',
    '9': 'tecla9',
    '/': 'operadorDividir',
    '*': 'operadorMultiplicar',
    '-': 'operadorSubtrair',
    '+': 'operadorAdicionar',
    '=': 'igual',
    'Enter': 'igual',
    'Backspace': 'backspace',
    'c': 'limparDisplay',
    'Espace': 'limparCalculo',
    ',': 'decimal'
}
const mapearTeclado = (evento) => {
    const tecla = evento.key;
    //verifica se uma das chaves do objeto mapaTeclado tem a tecla precionado
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;
    if (teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click();
}

document.addEventListener('keydown', mapearTeclado);