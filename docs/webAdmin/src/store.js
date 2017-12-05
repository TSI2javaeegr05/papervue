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
        //baseUrl: 'http://localhost:8080/web/api/',
        baseUrl: 'https://191.243.199.172/web/api/'
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