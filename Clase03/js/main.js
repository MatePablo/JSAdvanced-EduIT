/*
    Clase 03 - JavaScript Avanzado

    Temario:
        > Evento Submit

*/

/*
-----------------------------------------------
        Introduccion a Formuluarios
-----------------------------------------------
*/


/*
    Evento Submit:
        > En el caso de los formularios, podriamos estar tentados a trabajar con el boton de submit del forumulario para agregarle un callback
        cuando se clickea. Sin embargo esto no funcionara ya que al hacerle click, la pagina se recargara por default y el programa se salteara.
        > El mejor caso es trabajar directamente con el elemento <form>, y su evento "submit".
        
        > El evento submit es un evento dual, ya que nos permite trabajar con el evento 'click' y con eventos de teclado como:
            >> keyup (cuando una tecla se suelta)
            >> keydown (cuando una tecla recien se presiona)
            >> etc
*/

// Evento Submit:
let form = document.getElementById('formulario'); // Capturo el formulario
form.addEventListener('submit' , (e) => {
    e.preventDefault();   // Prevengo que el formulario ejecute su comportamiento por defecto.
    console.log(e);
})


/*
    API HTMLElement
        > Se utiliza para muchas cosas, en este caso para hacer una validacion standard en JS.

        NOTA: No nos podemos basar unicamente en las validaciones de HTML para hacer un formulario, ya que cualquier usuario puede inspeccionar el codigo
        y cambiar/saltear la validacion.
*/

// En este caso el boton y el input estan sueltos, al no estar dentro de un elemento <form> la validacion tengo que hacerla manualmente: (con HTMLInputElement)
var btn2 = document.getElementById('btn2');
var sub2 = document.getElementById('sub2');

btn2.addEventListener('click', () => {
    // Element.checkValidity -> Devuelve un booleano que es True si el elemento cumple con todas las validaciones establecidas por HTML.
    console.log(sub2.checkValidity());
})

/*
-----------------------------------------------
    Validacion Customizada (Personalizada)
-----------------------------------------------
*/

/*
    Vamos a probar hacer la misma validacion que si hubiese un 'required' en la etiqueta <input> pero dentro de JavaScript.

    Element.setCustomValidity('string'):
        > Este es un elemento especial de la API HTMLElement. El String que va de parametro denota si la validacion es exitosa o no.
        > Si el parametro String esta vacio, la validacion sera exitosa, sino, lo que este dentro del parametro String se mostrara como mensaje de error.

*/

// 1) Capturamos el <form> y el <input> en variables
var form2 = document.getElementById('form2');
var input = document.getElementById('input');
var msnj = document.getElementById('mnsj');

// 2) Usamos el evento submit y la api HTMLElement con su funcion Element.setCustomValidity()
form2.addEventListener('submit' , (e) => {
    e.preventDefault();

    let valor = input.value
    let longitud = valor.length

    if ( longitud > 3 ){
        msnj.innerHTML = '<b>Envio exitoso!</b>';
    }else{
        input.setCustomValidity('Debe ingresar mas de 3 caracteres');
    }
})

/*
    Funciones utiles para validacion:
        > .trim()   :   Remueve caracteres en blanco al principio y final de un String.
        > .includes() :     Nos permite comprobar si dentro de un String existe un caracter en particular.
        > .indexOf()    :   Comprueba dentro de un Array si determinado caracter se encuentra presente, de estarlo devuelve el indice, de lo contrario devuelve -1
        > encondeURIcomponent(valor)    :   Transforma caracteres especiales en caracteres que no sean potencialmente peligrosos para el servidor.
            >> Por ejemplo, para que no puedan ingresar cosas en un formulario como: <script> </script>
*/

var form3 = document.getElementById('form3');
var input2 = document.getElementById('input2');
var mnsj2 = document.getElementById('mnsj2');

// .trim()
// .includes()
//  encodeURIcomponent()
form3.addEventListener('submit' , (e) => {
    e.preventDefault();
    let valor = input2.value
    let valor_trim = valor.trim()    
    let longitud = valor_trim.length;

    if( valor_trim.includes(" ") ){
        input2.setCustomValidity("No puede haber espacios entre los caracteres");
    }else{
        mnsj2.innerHTML = '<b>Enviado con Exito!</b>';
    }

    console.log("Hay espacios entre los caracteres?: " + valor_trim.includes(" "));
    console.log(longitud);
    console.log(encodeURIComponent(valor_trim));
})

/*
-----------------------------------------------
        Expresiones Regulares / RegExp
-----------------------------------------------
*/

/*
    RegExp:
        > Son una secuencia de caracteres que conforman un patron de busqueda dentro de un String.
        > Nos evitan tener que usar las funciones de validacion manuales.
        > Son objetos bastante particulares. En lugar de empezar con {} o [] comienzan con "//"
    
    Desventajas:
        > Son formas de busqueda y validacion muy complejas. Se acomplejiza bastante la lectura de una expresion Regular.
*/

// 1) Las expresiones regulares son objetos que en lugar de escribirse con {} o [] se escriben con /secuencia/
let regexp = /a/;   // Esta expresion regular buscaria el caracter "a"
regexp = /ab/;      // Esta expresion regular buscaria "ab" JUNTOS, no buscaria las letras a y b por separado.

/*
    Caracteres especiales:
        > Supongamos que queremos solamente validar caracteres alfabeticos. 
        ¿Deberiamos escribir una expresion regular que sea /abcdefg.../ ?
        > Para eso las APIS de expresiones regulares nos brindan caracteres especiales:

    Ejemplos:
        > \w    :   (WORD). Intenta validar cualquier caracter alfabetico y numerico.
        > \W    :   (Negacion de WORD). Busca todos los caracteres que no sean alfabeticos y numericos.
        > \d    :   Digitos
        > \D    :   No-Digitos
        > \s    :   Espacios, saltos de linea, etc.
        > \S    :   No-espacios, no-saltos de linea, no tabulaciones.
*/

regexp = /\w/;

/*
    Caracteres de cantidad:
        > Estos caracteres especiales nos determinan la cantidad de repeticiones que queremos sobre un patron especifico dentro de nuestra expresion regular.

    Ejemplos: 
        > {N}       :   N = numero
        > {N, M}    :   N = minimo, M = Maximo de caracteres aceptables.
        > ()        :   Caracter especial de agrupamiento, busca todo lo que este dentro del parentesis.
        > *         :   Repeticion entre 0 o muchas instancias de ese caracter. Es igual a decir {0, inf}
        > +         :   Repeticion entre 1 o muchas instancias del caracter. Es igual a decir {1, inf}
*/

regexp = /l{2}/;        // Busca un patron donde el caracter "l" se repita dos veces, es decir, una "ll".
regexp = /abc{2}/;      // Esto NO VA a buscar un patron "abcabc", sino que va a buscar "abcc".
regexp = /(abc){2}/     // Esto SI VA a buscar el patron "abcabc".

/*
    Caracteres de posicion:
        > Sirven para determinar la posicion en la que queremos encontrar estos patrones de busqueda dentro del String que queremos validar.
    
    Ejemplos:
        > ^     :   El comienzo de TODO un String
        > $     :   El final de todo un String.
        > \b    :   (boundry)   El comienzo o final de una palabra. (borde-limite)
*/

regexp = /\ba/;     //  Busca palabras que empiecen con "a".
regexp = /a\b/;     //  Busca palabras que terminan con "a".

regexp = /^a/;      //  Busca todo un String que comience con "a"
regexp = /a$/;      // Busca todo un String que finalize con "a"


/*
    VALIDACION DE UN FORM CON REGEXP
*/

var inputReg = document.getElementById('inputReg');
var formReg = document.getElementById('formReg');

formReg.addEventListener('submit', (e) => {
    e.preventDefault();
    let valor = inputReg.value;

    let regExp = /^\w{5,10}$/;  // Debe empezar y terminar con caracter alfanumerico, y tener al menos 5 y maximo de 10

    if(regExp.test(valor)){ // El metodo .test() devuelve un booleano, que es True si la expresion regular coincide con el String analizado
        console.log('Ingreso valido');
    }else{
        console.log('Ingreso invalido');
    }
})