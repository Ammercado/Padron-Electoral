import Handlebars from 'handlebars';
import template from './template.html';
import swal from 'sweetalert2';

let consulta= '';
let database;
let _content ="";
let ListaDatos = [];
export default (_database) => {
  database = _database;
  render();
};
const consultarDNI = (ev) => {
    ev.preventDefault();
    const referencia = database.ref('/persona').once("value", mostrarDatos)
function mostrarDatos(todos_datos){
    var doc = document.getElementById('txtConsulta').value;
    todos_datos.forEach((child) => {
        //console.log(todos_datos);
        const dato = child.val();
        //console.log(dato);
        ListaDatos.push(dato);
        //console.log(ListaDatos);
    });
   for(var i = 0, len = ListaDatos.length; i < len; i++) {
        if (ListaDatos[i].dni === doc) {
            swal({
            title: "Usted Vota",
            html: _content = "<div><b><i>Nº de documento:</i></b></div>"+ListaDatos[i].dni+
            "<div><b><i>Nombre y Apellido:</i></b></div>"+ListaDatos[i].nombre+
            "<div><b><i>Establecimiento:</i></b></div>"+ListaDatos[i].escuela+
            "<div><b><i>Direccion:</i></b></div>"+ListaDatos[i].direccion+
            "<div><b><i>Nº de Mesa:</i></b></div>" +ListaDatos[i].mesa+"",
            type: 'success',
            allowOutsideClick: false,
            });
             render(); 
             break;
        }else{
             swal({
                text: 'El Numero de Documento '+ doc +' no se encuentra',
                type: 'error',
                allowOutsideClick:false,
              });
              render();
        }
    }
}
}

const render = () => {
    const t = Handlebars.compile(template);
    const appDOM = document.getElementById("main");
    appDOM.innerHTML = t({consulta});
    document.getElementById('btn-consultar').addEventListener("click", consultarDNI); 
}
