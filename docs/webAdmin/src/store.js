import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        autenticado: false,
        username: '',
        tokenUsr: '',
        nombreEmpresa: '',
        vistaActual: 'Inicio',
        baseUrl: 'https://papervue.jelastic.saveincloud.net/web/api'
    },
    mutations: {
        setAutenticado(state, estado) {
            state.autenticado = estado;
        },
        setUsuario(state, username) {
            state.username = username;
        },
        setVistaActual(state, vista) {
            state.vistaActual = vista;
        },
        setTokenUsr(state, token) {
            state.tokenUsr = token;
        }
    }
});