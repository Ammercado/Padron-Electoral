import Navigo from 'navigo';
import firebase from 'firebase';
import catchLinks from 'catch-links';

import listar from './modulos/listar';
import nuevo from './modulos/nuevo';
import consulta from './modulos/consultar';
import admin from './modulos/admin';
import login from './modulos/login';

import firebaseConfig from '../firebase.config';

import './index.scss';

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

var root = null;
var useHash = false;

var router = new Navigo(root, useHash);

router
	.on({
		'listar': () => listar(database),
		'nuevo': () => nuevo(database),
		'consultar' : () => consulta(database),
		'login': () => login(database),
		'admin' : () => admin(database)
	})
	.resolve();


catchLinks(window, function (href) {
    router.navigate(href);
});

