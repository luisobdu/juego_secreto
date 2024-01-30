/* Forma de introducir elemnto por elemento
    NO ES UNA BUENA PÁCTICA
let titulo = document.querySelector('h1');
titulo.innerHTML = 'Juego del número secreto';

let parrafo = document.querySelector('p');
parrafo.innerHTML = 'Indica un número del 1 al 10';
*/


//De esta forma se genera una función que puede repetirse. En este caso de agregar un texto que se podría modificar.
let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

function asignarTextoElemento (elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return; //Es una buena práctica siempre agregar el return
    
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value); //el valor era STRING y no numero
    if (numeroDeUsuario === numeroSecreto){ //triple = compara valor y tipo
        asignarTextoElemento ('p', `Acertaste el número en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}`);
        document.querySelector('#intentar').setAttribute('disabled','true');
        document.getElementById('reiniciar').removeAttribute('disabled'); //eliminamos atributos de otro botón
    } else {
        if (numeroDeUsuario > numeroSecreto){
            asignarTextoElemento ('p', 'El número secreto es menor');
           }   else {
                asignarTextoElemento ('p', 'El número secreto es mayor');
            }
            intentos++;
            limpiarCaja();
        }   
    return;
}

function limpiarCaja () {
    /*let valorCaja = document.querySelector ('#valorUsuario');
    valorCaja.value = '';*/
    document.querySelector('#valorUsuario').value=''; //Al usar # pedimos que querySelector busque por ID
}

function condicionesIniciales() { //Se prefirió hacer una función que maneje condiciones iniciales
    asignarTextoElemento('h1','Juego del número secreto');
    asignarTextoElemento('p',`Indica un número del 1 al ${numeroMaximo}`);
    document.getElementById('intentar').removeAttribute('disabled');
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego(){ //la ventaja de las funciones es que solo se convocan en lugar de poner de nuevo el código
    limpiarCaja();
    condicionesIniciales();
    document.querySelector('#reiniciar').setAttribute('disabled','true'); //agregar un atributo al botón en HTML. pedirá 2 condicones
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;

    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p', 'Ya se han sorteado todos los números');
        document.querySelector('#intentar').setAttribute('disabled','true');

    } else {

        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }

}

condicionesIniciales();