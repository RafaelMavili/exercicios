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
        const numeroAtual = parseFloat(display.textContent);
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
        numeroAnterior = parseFloat(display.textContent);
    }
}

operadores.forEach(operador => operador.addEventListener('click', selecionarOperador));

document.getElementById('igual').addEventListener('click', calcular);