import Handlebars from 'handlebars';
import { guid } from '../../utils';

import template from './template.html';

let mensaje = '';

let database;

export default (_database) => {
  database = _database;
  render();
};
const cerrarSesion = (ev) => {
  var config = {
    apiKey: "AIzaSyCVxNA7QjvIA19BNYCEEN9C3ro95EiQqgU",
    authDomain: "padron-001.firebaseapp.com",
    databaseURL: "https://padron-001.firebaseio.com",
    projectId: "padron-001",
    storageBucket: "padron-001.appspot.com",
    messagingSenderId: "595972768080"
};
  ev.preventDefault();
  firebase.auth().signOut().then(function() {
    location.assign('/login');
  }).catch(function(error) {
    // An error happened.
  });
}


const agregarNuevaPersona = (e) => {

  e.preventDefault();

  const persona = {
    id: guid(),
    direccion: document.getElementById('direccion').value,
    dni: document.getElementById('numerodni').value,
    escuela: document.getElementById('escuela').value,
    mesa: document.getElementById('mesa').value,
    nombre: document.getElementById('nombre').value,
  };
console.log(persona);
  database.ref(`persona/${persona.id}`).set({
    nombre: persona.nombre,
    direccion: persona.direccion,
    mesa: persona.mesa,
    escuela: persona.escuela,
    dni:persona.dni,
  })
  .then(() => {
    mensaje = 'persona agregada correctamente!';
    render();
  });

  return false;
};

const render = () => {
	const t = Handlebars.compile(template);
	document.getElementById('main').innerHTML = t({mensaje});
  document.getElementById('boton-nuevo').onclick = agregarNuevaPersona;
  document.getElementById('btnCerrarSesion').addEventListener("click", cerrarSesion); 
}