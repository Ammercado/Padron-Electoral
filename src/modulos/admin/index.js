import Handlebars from 'handlebars';
import template from './template.html';

let admin= '';
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
const render = () => {
  const t = Handlebars.compile(template);
  const appDOM = document.getElementById("main");
  appDOM.innerHTML = t({admin});
  document.getElementById('btnCerrarSesion').addEventListener("click", cerrarSesion); 
}
