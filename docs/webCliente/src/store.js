import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        vistaActual: 'Inicio',
        usuario: {
            username: '',
            nombre: '',
            apellido: '',
            token: '',
            email: '',
            facebook: false
        },
        autenticado: false,
        suscripto: false,
        baseUrl: 'https://papervue.jelastic.saveincloud.net/web/api',
        contenidosDestacados: [],
        contenidoActual: {
            id: '',
            titulo: '',
            descripcion: '',
            destacado: false,
            payperview: false,
            fecha: '',
            empresa: '',
            tipo: '',
            precio: '',
            imagen: '',
            enVivo: false,
            url: '',
            tipoVideo: '',
            pago: false,
            imagenSrc: '',
            actores: [],
            directores: [],
            categorias: [],
            comentarios: [],
            atributos: [],
            videos: [],
            valoracion: ''
        },
        favoritosList: [],
        reproducciones: [],
        clientes: [],
        solicitudes: [],
        amistades: [],
        pagos: []
    },
    mutations: {
        setVistaActual(state, vista) {
            state.vistaActual = vista;
        },
        setUsuario(state, usuario) {
            state.usuario = usuario;
        },
        setAutenticado(state, autenticado) {
            state.autenticado = autenticado;
        },
        setContenidoActual(state, contenido) {
            state.contenidoActual = contenido;
        },
        setContenidosDestacados(state, contenidos) {
            state.contenidosDestacados = contenidos;
        },
        setFavoritosList(state, favoritos) {
            state.favoritosList = favoritos;
        },
        quitarFavorito(state, idFavorito) {
            state.favoritosList = state.favoritosList.filter(function (fav) {
                return fav.id !== idFavorito;
            });
        },
        agregarFavorito(state, fav) {
            state.favoritosList.push(fav);
        },
        setReproducciones(state, reproducciones) {
            state.reproducciones = reproducciones;
        },
        setSolicitudes(state, solicitudes) {
            state.solicitudes = solicitudes;
        },
        setAmistades(state, amistades) {
            state.amistades = amistades;
        },
        setSuscripto(state, suscripto) {
            state.suscripto = suscripto;
        },
        quitarReproduccion(state, id){
            state.reproducciones = state.reproducciones.filter(function (item) {
                return item.idRep !== id;
            });
        }
    }
});