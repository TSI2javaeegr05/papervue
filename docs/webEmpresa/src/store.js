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
        baseUrl: 'https://papervue.jelastic.saveincloud.net/web/api',
        contenidosModList: [],
        videoNuevo: {},
        categorias: []
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
        }
    }
});