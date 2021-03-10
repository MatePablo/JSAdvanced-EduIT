/*
    Clase 02 - JavaScript Avanzado

    Temario:
        > Eventos
        > Objeto Event
        > Callbacks
        > Propagacion de eventos
        > Eventos con comportamiento predeterminado

*/

/*
-----------------------------------------------
            Funciones y Callbacks
-----------------------------------------------
*/

/*
    Antes de explicar lo que son los eventos, se necesita saber lo que son los CallBack.

    CallBack:
        > Es una funcion cualquiera de JavaScript pero asociada a un evento.
        > Se diferencia de una "funcion normal" en que no se ejecuta inmediatamente, sino que se elije
        su momento y lugar de ejecucion.
        > Los eventos son los lugares donde se van a registrar los callbacks para su futura ejecucion.
*/

// Ejemplo de funcion normal:
console.log('Funcion normal:')

var uno = () => {
    console.log('Soy la funcion uno')
}

uno();

// Ejemplo de CallBack:
console.log('\nCallback:')

function foo( a, funcion ){
    console.log(a);
    funcion();
}

foo(1, uno);

console.log('\n')

/*
-----------------------------------------------
                Eventos y DOM
-----------------------------------------------
*/

/*
    Eventos:
        > Son la piedra angular de JavaScript.
        > Los eventos son la ejecucion de funciones como respuesta a una accion.
        > Se envian para notificar al codigo de algo que haya ocurrido.
*/


//  >> Registrar un CallBack a un elemento del DOM es sumamente sensillo:

// 1) Referencia al elemento que necesitamos:
var btn = document.getElementById('btn');

// 2) Tener preconstruidos los CallBacks
function clickeastePrueba(){
    console.log('Clickeaste "Boton de Prueba"!');
}

function clickeasteGeneral(){
    console.log('Clickeaste un boton!')
}

// 3) Trabajar sobre el atributo que nosotros necesitamos.
btn.onclick = clickeastePrueba;
btn.onClick = clickeasteGeneral;


/*
    PROBLEMA: Ambos CallBacks (clickeastePrueba y clickeasteGeneral) deberian ejecutarse, pero no lo hacen.
    El unico metodo que se ejecuta es el ultimo, ya que al pasarse como dato de variable este PISA a los demas CallBacks.

    La forma de solucionar esto es con:

    API EventTarget:
        > Se usa el metodo addEventListener() que registra un evento a un objeto en especifico.
        > Dicho objeto puede ser un simple elemento en el HTML, el documento en si, una ventana o un XMLHttpRequest.
*/

// addEventListener( Evento, CallBack )
btn.addEventListener('click' , clickeastePrueba); // 'click' es un evento de JS, no se escribe onClick como en HTML)
btn.addEventListener('click' , clickeasteGeneral);


/*
    Objeto Event:
        > Dado que la mayor parte del codigo que se pueda escribir en JS esta basado en la ideologia de asignar
        eventos a distintos elementos, es fundamental conocer la estructura de un evento.
        > El motor de JavaScript va a pasarnos el objeto Event como parametro de nuestros CallBacks por defecto.
        > A partir del objeto Event van a salir varias propiedades y metodos que nos permitiran manipular de forma mas avanzada
        los eventos en JavaScript.
*/

// Por convenio, el objeto Event es representado como una 'e'
btn.addEventListener('click' , function(e){
    console.log(e);     // Imprimo el objeto Event para ver todas sus propiedades y funciones
})

/*
-----------------------------------------------
            Propagacion de Eventos
-----------------------------------------------
*/

/*
    Propagacion de eventos:
        > Un evento siempre se va a propagar por el DOM, desde el elemento interno hacia los elementos padres directos.
        > Al hacerlo, va a ir disparando los eventos de los elementos padre.
        > En la mayoria de los casos, no queremos que esto suceda.

        > Cuando el evento del elemento hijo dispara los eventos de los padres se llama BUBLING. (Por defecto)
        > Cuando es al revez (padre a hijo) se lo llama CAPTURING.

*/

// Ejemplo de propagacion de eventos BUBBLING
var div1 = document.getElementById('div1');
var div2 = document.getElementById('div2');
var div3 = document.getElementById('div3');

// Si hacemos click al div3, va a disparar los eventos de sus elementos padre. (BUBBLING)
div3.addEventListener('click' , function(){
    console.log('Hiciste click al div3')
})

div1.addEventListener('click' , function(){
    console.log('Hiciste click al div1')
})

/*
    ¿Cuando es beneficiosa la propagacion de eventos?
        > Cuando queremos asignarle eventos a elementos que no estan en el DOM ya que fueron creados mediante JS.
*/

// Por ejemplo, supongamos que este boton crea dinamicamente otros botones, y quiero a esos botones añadirles un evento:
var estatico = document.getElementById('estatico');
var divPro = document.getElementById('botonPro');

estatico.addEventListener( 'click' , function(){
    dinamico = document.createElement('button');
    dinamico.innerText = "Boton Dinamico";
    dinamico.id = 'dinamico';
    divPro.appendChild(dinamico)
})

//Si quisiera añadirle un evento al boton 'dinamico' no podria, ya que JS lo reconoce como NULL por no estar en el DOM.
/*
    ESTO NO SE PODRIA:

    dinamico.addEventListener('click' , function(){
        console.log('Soy el boton dinamico');
    })
*/

// Sin embargo, con la propagacion de eventos, podemos solucionar este problema mediante el uso de la propiedad .target del objeto Event
document.addEventListener('click' ,function(e){
    if(e.target.id == 'dinamico'){
        console.log('Clickeaste el boton dinamico');
    }
})

/*
-----------------------------------------------
    Eventos con comportamiento predeterminado
-----------------------------------------------
*/

/*
    Existen ciertos elementos que de forma predeterminada tienen un evento automatico.
    Por ejemplo los links <a>, de forma predeterminada su comportamiento es abrir una url/documento etc
*/

var link = document.getElementById('linkcito');

link.addEventListener('click' , function(e){
    e.preventDefault();  // Con el metodo preventDefault() prevengo que se abra el link.
    console.log('Se clickeo el Link a Google sin que se abra por Default');
})

/*
-----------------------------------------------
    Manipulacion del DOM en un evento del BOM
-----------------------------------------------
*/

// Ej: El evento resize
var parrafoTamaño = document.getElementById('pWindow');

window.addEventListener('resize' , function(){
    parrafoTamaño.innerText = "Tamaño de la pantalla:\n" + "Alto: " + window.outerHeight + " Ancho: " + window.outerWidth;
})