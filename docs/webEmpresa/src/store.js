import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        autenticado: false,
        empresa: {
            nombre: '',
            link: '',
            imagen: '',
            email: '',
            tokenUsr: ''
        },
        username: '',
        vistaActual: 'Inicio',
        contenidosList: [],
        //baseUrl: 'http://localhost:8080/web/api/',
        baseUrl: 'https://191.243.199.172/web/api/',
        contenidosModList: [],
        videoNuevo: {},
        categorias: [],
        tipos: []
    },
    mutations: {
        setVideoNuevo(state, video) {
            state.videoNuevo = video;
        },
        addContenidoModList(state, id) {
            state.contenidosModList.push({
                id: id,
                info: undefined,
                actores: undefined,
                directores: undefined,
                categorias: undefined,
                atributos: undefined,
                videos: undefined,
                imagenSrc: ''
            });
        },
        setAutenticado(state, estado) {
            state.autenticado = estado;
        },
        setUsuario(state, username) {
            state.username = username;
        },
        setContenidosList(state, contenidos) {
            state.contenidosList = contenidos;
        },
        setVistaActual(state, vista) {
            state.vistaActual = vista;
        },
        agregarCategoria(state, categoria) {
            if (state.categorias.indexOf(categoria) === -1) state.categorias.push(categoria);
        },
        agregarTipo(state, tipo) {
            if (state.tipos.indexOf(tipo) === -1) state.tipos.push(tipo);
        }
    }
});