
import Handlebars from 'handlebars';

import template from './template.html';

let database;

let personas = [];

export default (_database) => {
	database = _database;
	personas = [];
	listarPersona();
}
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
const listarPersona = () => {
	const lista = database
					.ref('/persona')
					.once("value")
					.then((dato_persona) => {
						console.log(dato_persona);
						dato_persona.forEach((element) => {
							const datoPersona = element.val();
							console.log(datoPersona);
							datoPersona.id = element.key;
							personas.push(datoPersona);
						});
						
						render();
					});
}

const render = () => {
	const t = Handlebars.compile(template);
	document.getElementById('main').innerHTML = t({ personas });
	document.getElementById('btnCerrarSesion').addEventListener("click", cerrarSesion); 
}