import Handlebars from 'handlebars';
import template from './template.html';
import swal from 'sweetalert2';
let iniciar= '';

let database;

export default (_database) => {
    database = _database;
    render();
  };

const iniciarSesion = (ev) => {
    var config = {
        apiKey: "AIzaSyCVxNA7QjvIA19BNYCEEN9C3ro95EiQqgU",
        authDomain: "padron-001.firebaseapp.com",
        databaseURL: "https://padron-001.firebaseio.com",
        projectId: "padron-001",
        storageBucket: "padron-001.appspot.com",
        messagingSenderId: "595972768080"
    };
    ev.preventDefault();
    const email = document.getElementById('txtEmail').value;
    const password = document.getElementById('txtPassword').value;
    console.log(email, password);
    firebase.auth().onAuthStateChanged( firebaseUser => {
        if(firebaseUser) {
          console.log(firebaseUser);
          btnLogin.classList.remove('hide');
        } else {
          console.log('no logueado');
          btnLogin.classList.add('hide');
        }
      });
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => {
            swal({
                title: "Bienvenido/a ",
                text: "Hola",
                type: "success",
                allowOutsideClick:false,
                confirmButtonText: 'Ir al Gestor del Padron'
            }).then((result) => {
              if (result.value) {
                location.assign('/admin');
              }
            });
            render();
        }).catch(function (error) {
            swal({
                title: "Error de Inicio",
                text: "El Correo electronico y/o Contraseña Incorrecta",
                icon: "warning",
                allowOutsideClick: false,
              });
            render();
        }, false);
    
    
}

const render = () => {
    const t = Handlebars.compile(template);
    const appDOM = document.getElementById("main");
    appDOM.innerHTML = t({iniciar});
    document.getElementById('btnLogin').addEventListener("click", iniciarSesion); 
}