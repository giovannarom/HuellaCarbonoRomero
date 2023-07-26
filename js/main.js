// --------- Definiciones de funciones -------------------

// Uso de funcion para comparar elementos de arreglo
function comparar(a, b) {
  return huellacarbono[categorias.indexOf(a)] - huellacarbono[categorias.indexOf(b)];
}

// Uso de funcion para huella de carbono promedio por pais
function getCountryFromValue(countryValue) {
  switch (countryValue) {
    case "1":
      return 3.09;
    case "2":
      return 3.4;
    case "3":
      return 1.6;
    case "4":
      return 4.7;
    default:
      return 'País desconocido';
  }
}

// Uso de funcion constructora en objeto con datos del usuario
class Persona{
  constructor(nombre, edad, pais){
    this.nombre=nombre;  
    this.edad=edad;
    this.pais=pais;
  }
}

// --------- Definiciones de variables -------------------

// Definición de botones
const mascotasnoButton = document.getElementById('mascotasno');
const mascotassiperroButton = document.getElementById('mascotassiperro');
const mascotassigatoButton = document.getElementById('mascotassigato');
const comidapizzaButton = document.querySelector('#comidapizza');
const comidacarneButton = document.querySelector('#comidacarne');
const comidasalmonButton= document.querySelector('#comidasalmon');
const calculoButton=document.getElementById('btn-inicio');

// Definición de variables para codigo
let kgeqconducir;
let inicio;
let kgeqcomida;
let mascotas;
let kgmascotas;
const huellacarbono=[];
const categorias = ["Transporte", "Comida", "Mascotas"];


// --------- Event listeners -------------------

// Event listeners para los botones de comida favorita

comidapizzaButton.addEventListener('click', evt0 => {
  evt0.preventDefault();
  comidapizzaButton.classList.toggle('active');
  kgeqcomida = 0.263 * 25;
});

comidasalmonButton.addEventListener('click', evt1 => {
  evt1.preventDefault();
  comidasalmonButton.classList.toggle('active');
  kgeqcomida = 10.4 * 25;
});

comidacarneButton.addEventListener('click', evt2 => {
  evt2.preventDefault();
  comidacarneButton.classList.toggle('active');
  kgeqcomida = 21.7 * 25;
});

// Event listeners tipo de mascota

mascotasnoButton.addEventListener('click', evt3 => {
  evt3.preventDefault();
  mascotasnoButton.classList.toggle('active');
  kgmascotas = 0;
});

mascotassiperroButton.addEventListener('click', evt4 => {
  evt4.preventDefault();
  mascotassiperroButton.classList.toggle('active');
  kgmascotas = 770;
});

mascotassigatoButton.addEventListener('click', evt5 => {
  evt5.preventDefault();
  mascotassigatoButton.classList.toggle('active');
  kgmascotas = 330;
});

// Event listener para hacer el calculo

calculoButton.addEventListener('click', evt6 => {
  evt6.preventDefault();
  calcularHuellaCarbono();
});

// --------- Funcion principal para calculo de la huella -------------------
function calcularHuellaCarbono() {

  // Obtener datos ingresados por el usuario
  const nombre = document.getElementById('usrnombre').value;
  const pais = document.getElementById('department').value;
  const edad = document.getElementById('usredad').value;
  const kmDiarios = parseFloat(document.getElementById('usrkm').value);

  // Validar que todos los campos requeridos estén completos con Operadores Avanzados y Librerias
  if (!nombre || !pais || !edad || isNaN(kmDiarios)) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Por favor, completa todos los campos requeridos correctamente.'
    });
    return;
  }


  // Cálculo de la huella de carbono del transporte
  kgeqconducir = kmDiarios * 0.192 * 7 * 52;

  //------ Uso de objetos, arreglos y metodos de arreglos -----

  // Objeto perfil de usuario con funcion constructora
  const usuario=new Persona(nombre,edad,pais);

  // Creacion de arreglo con las emisiones por categoria
  huellacarbono.push(kgeqconducir);
  huellacarbono.push(kgeqcomida);
  huellacarbono.push(kgmascotas);

  // Uso del metodo reduce de arreglos
  let kgco2acum = huellacarbono.reduce(function (acumulador, numero) {
    return acumulador + numero;
  }, 0);
  
  // Uso de metodo sort para encontrar mayor impacto ambiental
  categorias.sort(comparar);
  huellacarbono.sort((a, b) => a - b);

  //------ Manipulacion de DOM para impresion de resultados -----

  // Resultado total de emisiones
  let totaltext = `🌏 Hola ${nombre}, tu transporte, alimentos y mascotas acumulan ${kgco2acum.toFixed(3)} kilogramos de CO2 equivalente`;
  let resultadoElement = document.getElementById('resultado');
  resultadoElement.textContent = totaltext;

  // Resultado categoria de mayor impacto
  let textcategoria="Tu categoría con mayor impacto ambiental es: "+categorias[categorias.length - 1];
  let categoriaElement=document.getElementById('resultadoimpacto');
  categoriaElement.textContent=textcategoria;


  // ----- Almacenamiento y recuperacion de datos LocalStorage ------
  
  // Almacenamiento en Local Storage
  huellacarbono.unshift(usuario);
  localStorage.setItem("perfilcarbono", JSON.stringify(huellacarbono));
  
  // Obtener datos de  Local Storage
  const dataFromLocalStorage = JSON.parse(localStorage.getItem('perfilcarbono'));
  const countryValue = dataFromLocalStorage[0].pais;


  // Obtener huella de carbono promedio en pais a partir del valor recuperado de Local Storage
  const countryfootprint = getCountryFromValue(countryValue);
  console.log(countryfootprint)
  let textavrg=`☘️ Sabías que ... El promedio de huella de carbono en tu país es de ${countryfootprint} toneladas de CO2 equivalente anualmente considerando transporte, energía, alimentos, ropa, entre otros.`;
  let avrgElement=document.getElementById('avrgpais');
  avrgElement.textContent=textavrg;

  // Uso de libreria sweet alert
  let calculoconcluido=true;
  if(calculoconcluido) {
    Swal.fire({
      icon: 'info',
      title: 'Calculando...',
      text: 'Estamos por ver tus resultados'
    });
  }
}

