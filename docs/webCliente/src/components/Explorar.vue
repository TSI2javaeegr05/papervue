<template>
    <div>
        <div id="contenidos" class="ui stackable grid">
            <div v-show="mostrarFiltros" class="three wide column"
                 style="padding-right: 0; padding-top: 20px; padding-left: 30px">
                <div class="ui secondary pointing vertical fluid large menu">
                    <a class="ui title item"
                       @click="destacadoFiltro = false; payperviewFiltro = false; listarContenidos(1)"
                       :class="{'active text-paperviu-sky border-top-paperviu-sky': !destacadoFiltro && !payperviewFiltro, 'hover-border-paperviu-sky text-paperviu-e8 hover-text-paperviu-sky': destacadoFiltro || payperviewFiltro}">Todos</a>
                    <a class="ui title item" @click="destacadoFiltro = !destacadoFiltro; listarContenidos(1)"
                       :class="{'active text-paperviu-sky border-top-paperviu-sky': destacadoFiltro, 'hover-border-paperviu-sky text-paperviu-e8 hover-text-paperviu-sky': !destacadoFiltro}">Destacados</a>
                    <a class="ui title item" @click="payperviewFiltro = !payperviewFiltro; listarContenidos(1)"
                       :class="{'active text-paperviu-sky border-top-paperviu-sky': payperviewFiltro, 'hover-border-paperviu-sky text-paperviu-e8 hover-text-paperviu-sky': !payperviewFiltro}">Pay
                        Per View</a>
                    <div class="ui accordion" style="margin: 0">
                        <h2 @click="resetEmpresas" class="title header text-paperviu-sky large" style="margin: 0">
                            <i class="dropdown icon"></i>Empresas
                        </h2>
                        <div class="content" style="padding: 0">
                            <div v-bar="{preventParentScroll: true}">
                                <div style="max-height: 400px">
                                    <div class="ui selection list">
                                        <h4 class="ui item hover-border-paperviu-sky text-paperviu-e8 hover-paperviu-d7 hover-text-paperviu-sky"
                                            style="padding: 10px; font-weight: 600; margin-left: 10px"
                                            v-for="empresa in empresas"
                                            :class="{'active text-paperviu-sky': empresaFiltro === empresa}"
                                            @click="empresaFiltro = empresa; listarContenidos(1)"
                                        >{{ empresa }}</h4>
                                    </div>
                                    <infinite-loading ref="infiniteLoadingEmpresas"
                                                      @infinite="listarEmpresas">
                                        <div slot="no-more">
                                            <h5 class="ui icon header text-paperviu-e4" style="opacity: 0.6">No hay m&aacute;s
                                                empresas.</h5>
                                        </div>
                                        <div slot="no-results">
                                            <h5 class="ui icon header text-paperviu-e4" style="opacity: 0.6">No hay
                                                empresas.</h5>
                                        </div>
                                    </infinite-loading>
                                </div>
                            </div>
                        </div>
                        <h2 @click="resetTipos" class="title header text-paperviu-sky large" style="margin: 0">
                            <i class="dropdown icon"></i>Tipos
                        </h2>
                        <div class="content">
                            <div v-bar="{preventParentScroll: true}">
                                <div style="max-height: 400px">
                                    <div class="ui selection list">
                                        <h4 class="ui item hover-border-paperviu-sky hover-paperviu-d7 text-paperviu-e8 hover-text-paperviu-sky"
                                            style="padding: 10px; font-weight: 600; margin-left: 10px"
                                            v-for="tipo in tipos"
                                            :class="{'active text-paperviu-sky': tipoFiltro === tipo}"
                                            @click="tipoFiltro = tipo; listarContenidos(1)"
                                        >{{ tipo }}</h4>
                                    </div>
                                    <infinite-loading ref="infiniteLoadingTipos"
                                                      @infinite="listarTipos">
                                        <div slot="no-more">
                                            <h5 class="ui icon header text-paperviu-e4"
                                                style="opacity: 0.6; margin: 0; padding: 0">No hay m&aacute;s
                                                tipos.</h5>
                                        </div>
                                        <div slot="no-results">
                                            <h5 class="ui icon header text-paperviu-e4"
                                                style="opacity: 0.6; margin: 0; padding: 0">No hay tipos.</h5>
                                        </div>
                                    </infinite-loading>
                                </div>
                            </div>
                        </div>
                        <h2 @click="resetCategorias" class="title header text-paperviu-sky large" style="margin: 0">
                            <i class="dropdown icon"></i>Categorias
                        </h2>
                        <div class="content">
                            <div v-bar="{preventParentScroll: true}">
                                <div style="max-height: 400px">
                                    <div class="ui selection list">
                                        <h4 class="ui item hover-border-paperviu-sky hover-paperviu-d7 text-paperviu-e8 hover-text-paperviu-sky"
                                            style="padding: 10px; font-weight: 600; margin-left: 10px"
                                            v-for="cat in categorias"
                                            :class="{'active text-paperviu-sky': categoriaFiltro === cat}"
                                            @click="categoriaFiltro = cat; listarContenidos(1)"
                                        >{{ cat }}</h4>
                                    </div>
                                    <infinite-loading ref="infiniteLoadingCategorias"
                                                      @infinite="cargarCategorias">
                                        <div slot="no-more">
                                            <h5 class="ui icon header text-paperviu-e4" style="opacity: 0.6">No hay m&aacute;s
                                                categor&iacute;as.</h5>
                                        </div>
                                        <div slot="no-results">
                                            <h5 class="ui icon header text-paperviu-e4" style="opacity: 0.6">No hay
                                                categor&iacute;as.</h5>
                                        </div>
                                    </infinite-loading>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div :class="{'thirteen wide column': mostrarFiltros, 'sixteen wide column': !mostrarFiltros}"
                 style="padding-left: 0">
                <div class="ui row" style="background-color: #3e444a">
                    <div class="ui center aligned text container" style="padding-top: 16px;">
                        <div class="ui fluid icon large left icon inverted transparent input paperviu-dark"
                             style="padding: 7px; margin-top: -16px;">
                            <i @click="listarContenidos(1)" class="search link icon" style="margin-left: 10px"></i>
                            <input style="height: 30px" v-model="filtro" @keyup.enter="listarContenidos(1)" type="text"
                                   placeholder="Buscar contenidos...">
                        </div>
                        <div class="ui secondary pointing inverted menu" style="border: 0; margin: 5px">
                            <a @click="mostrarFiltros = !mostrarFiltros"
                               :class="{'active border-bottom-paperviu-sky': mostrarFiltros}"
                               class="ui item">
                                <i :class="{'text-paperviu-sky': mostrarFiltros}"
                                   class="filter icon"></i>{{ mostrarFiltros ? 'Ocultar filtros' : 'Mostrar filtros' }}
                            </a>
                            <div class="right menu">
                                <div class="ui item" style="padding: 0">
                                    <div class="ui tag icon tiny labels">
                                        <div v-show="tipoFiltro !== ''" class="ui label"
                                             style="background-color: #f1f5f9">
                                            <i @click="tipoFiltro = ''; listarContenidos(1)"
                                               class="remove link text-paperviu-sky large icon"
                                               style="margin-right: 5px"></i>
                                            <span class="ui detail header text-paperviu-dark"
                                                  style="margin: 0">{{ tipoFiltro }}</span>
                                        </div>
                                        <div v-show="categoriaFiltro !== ''" class="ui label"
                                             style="background-color: #f1f5f9">
                                            <i @click="categoriaFiltro = ''; listarContenidos(1)"
                                               class="remove link text-paperviu-sky large icon"
                                               style="margin-right: 5px"></i>
                                            <span class="ui detail header text-paperviu-dark"
                                                  style="margin: 0">{{ categoriaFiltro }}</span>
                                        </div>
                                        <div v-show="empresaFiltro !== ''" class="ui label"
                                             style="background-color: #f1f5f9">
                                            <i @click="empresaFiltro = ''; listarContenidos(1)"
                                               class="remove link text-paperviu-sky large icon"
                                               style="margin-right: 5px"></i>
                                            <span class="ui detail header text-paperviu-dark"
                                                  style="margin: 0">{{ empresaFiltro }}</span>
                                        </div>
                                        <div v-show="destacadoFiltro" class="ui label"
                                             style="background-color: #f1f5f9">
                                            <i @click="destacadoFiltro = false; listarContenidos(1)"
                                               class="remove link text-paperviu-sky large icon"
                                               style="margin-right: 5px"></i>
                                            <span class="ui detail header text-paperviu-dark"
                                                  style="margin: 0">Destacados</span>
                                        </div>
                                        <div v-show="payperviewFiltro" class="ui label"
                                             style="background-color: #f1f5f9">
                                            <i @click="payperviewFiltro = false; listarContenidos(1)"
                                               class="remove link text-paperviu-sky large icon"
                                               style="margin-right: 5px; background-color: #f1f5f9"></i>
                                            <span class="ui detail header text-paperviu-dark"
                                                  style="margin: 0">Pay-Per-View</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ui stackable two column grid container" style="padding: 20px">
                    <paperviu-contenido-item
                            v-for="(contenido, index) in contenidos"
                            :key="index"
                            :id="contenido.id"
                            :titulo="contenido.titulo"
                            :empresa="contenido.empresa"
                            :tipo="contenido.tipo"
                            :valoracion="contenido.valoracion"
                            :imagen="contenido.imagen"
                            @valorandoContenido="mostrarInfo('Valorando contenido...')"
                            @contenidoValorado="getPromedioValoraciones(contenido.id)"
                            @errorValorarContenido="mostrarError('No se pudo valorar el contenido')"
                            @favoritoAgregado="mostrarExito(contenido.titulo + ' agregado a favoritos!')"
                            @agregandoFavorito="mostrarInfo('Agregando '+ contenido.titulo + ' a favoritos...')"
                            @errorAgregarFavorito="mostrarError('No se pudo agregar el favorito')"
                            @favoritoEliminado="mostrarExito(contenido.titulo + ' eliminado de favoritos!')"
                            @eliminandoFavorito="mostrarInfo('Eliminando ' + contenido.titulo + ' de favoritos')"
                            @errorEliminarFavorito="mostrarError('No se pudo eliminar el favorito')"
                    ></paperviu-contenido-item>
                </div>
                <infinite-loading ref="infiniteLoading"
                                  style="padding: 50px"
                                  @infinite="infiniteHandler">
                    <div slot="no-more">
                        <div class="ui center aligned text container">
                            <div class="ui icon header text-paperviu-e8" style="opacity: 0.6"><i
                                    class="search icon text-paperviu-sky"></i>No hay m&aacute;s contenidos.
                            </div>
                        </div>
                    </div>
                    <div slot="no-results">
                        <div class="ui center aligned text container">
                            <div class="ui icon header text-paperviu-e8" style="opacity: 0.6"><i
                                    class="search icon text-paperviu-sky"></i>No hay contenidos que mostrar.
                            </div>
                        </div>
                    </div>
                </infinite-loading>
            </div>
        </div>
    </div>
</template>
<script>
    import {dropbox} from '../dropbox_token';
    import {noty} from '../noty';
    import InfiniteLoading from 'vue-infinite-loading';

    export default {
        props: {
            search: {
                type: String,
                default: ''
            },
            tipoSearch: {
                type: String,
                default: ''
            },
            categoriaSearch: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                filtro: '',
                tipoFiltro: '',
                categoriaFiltro: '',
                empresaFiltro: '',
                destacadoFiltro: false,
                payperviewFiltro: false,
                pagina: 1,
                mostrarFiltros: false,
                contenidos: [],
                tipos: [],
                categorias: [],
                empresas: [],
                paginaTipos: 1,
                paginaEmpresas: 1,
                paginaCategorias: 1
            }
        },
        computed: {
            getContenidosURL() {
                return this.$store.state.baseUrl + "contenidos/webcliente?contenido=" + this.filtro + "&tipo=" + this.tipoFiltro + "&categoria=" + this.categoriaFiltro + "&pagina=" + this.pagina + "&empresa=" + this.empresaFiltro + "&destacado=" + this.destacadoFiltro + "&payperview=" + this.payperviewFiltro;
            },
            getCategoriasURL() {
                return this.$store.state.baseUrl + "categorias/pag?filtro=&pagina=" + this.paginaCategorias;
            },
            listarEmpresasURL() {
                return this.$store.state.baseUrl + "empresas?filtro=&pagina=" + this.paginaEmpresas;
            },
            listarTiposURL() {
                return this.$store.state.baseUrl + "tipos?filtro=&pagina=" + this.paginaTipos;
            },
            getPromedioValoracionesURL() {
                return this.$store.state.baseUrl + "valoraciones/prom/";
            }
        },
        mounted() {
            this.$store.commit('setVistaActual', 'Explorar');
            document.title = 'Explorar';
            this.filtro = this.search;
            this.tipoFiltro = this.tipoSearch;
            this.categoriaFiltro = this.categoriaSearch;
            $('.ui.accordion').accordion();
        },
        methods: {
            infiniteHandler($state) {
                var _this = this;
                setTimeout(() => {
                    $.get(this.getContenidosURL, function (response) {
                        if (response !== undefined) {
                            if (response.length >= 1) {
                                $.each(response, function (index, contenido) {
                                    _this.contenidos.push({
                                        id: contenido.id,
                                        tipo: contenido.tipo,
                                        titulo: contenido.titulo,
                                        imagen: contenido.imagen,
                                        fecha: contenido.fecha,
                                        empresa: contenido.empresa,
                                        valoracion: contenido.valoracion
                                    });
                                });
                                $state.loaded();
                                _this.pagina += 1;
                            } else {
                                $state.complete();
                            }
                        }
                    });
                }, 1000);
            },
            listarContenidos(pagina) {
                if (pagina !== undefined) this.pagina = pagina;
                this.contenidos = [];
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
            },
            listarEmpresas($state) {
                var _this = this;
                setTimeout(() => {
                    $.get(_this.listarEmpresasURL, function (response) {
                        if (response !== undefined) {
                            if (response.length >= 1) {
                                $.each(response, function (index, empresa) {
                                    _this.empresas.push(empresa);
                                });
                                $state.loaded();
                                _this.paginaEmpresas += 1;
                            } else $state.complete();
                        } else $state.complete();
                    });
                }, 1000);
            },
            cargarCategorias($state) {
                var _this = this;
                setTimeout(() => {
                    $.get(_this.getCategoriasURL, function (response) {
                        if (response !== undefined) {
                            if (response.length >= 1) {
                                $.each(response, function (index, categoria) {
                                    _this.categorias.push(categoria.nombre);
                                });
                                $state.loaded();
                                _this.paginaCategorias += 1;
                            } else $state.complete();
                        } else $state.complete();
                    });
                }, 1000);
            },
            getPromedioValoraciones(idContenido) {
                this.mostrarExito("Contenido valorado!");
                var _this = this;
                $.get(this.getPromedioValoracionesURL + idContenido, function (response) {
                    if (response !== undefined) {
                        _this.contenidoActual(idContenido).valoracion = response;
                        if (_this.$store.state.contenidoActual.id === idContenido) _this.$store.state.contenidoActual.valoracion = response;
                    }
                });
            },
            resetTipos() {
                if (this.tipos.length === 0) {
                    this.paginaTipos = 1;
                    this.$refs.infiniteLoadingTipos.$emit('$InfiniteLoading:reset');
                }
            },
            resetCategorias() {
                if (this.categorias.length === 0) {
                    this.paginaCategorias = 1;
                    this.$refs.infiniteLoadingCategorias.$emit('$InfiniteLoading:reset');
                }
            },
            resetEmpresas() {
                if (this.empresas.length === 0) {
                    this.paginaEmpresas = 1;
                    this.$refs.infiniteLoadingEmpresas.$emit('$InfiniteLoading:reset');
                }
            },
            listarTipos($state) {
                var _this = this;
                setTimeout(() => {
                    $.get(_this.listarTiposURL, function (response) {
                        if (response !== undefined) {
                            if (response.length >= 1) {
                                $.each(response, function (index, tipo) {
                                    _this.tipos.push(tipo.nombre);
                                });
                                $state.loaded();
                                _this.paginaTipos += 1;
                            } else $state.complete();
                        } else $state.complete();
                    });
                }, 1000);
            },
            mostrarExito(mensaje) {
                this.$noty.success("<h3 class=\"ui inverted header\"><i class=\"checkmark icon\"></i> " + mensaje + "</h3>", noty.success);
            },
            mostrarError(mensaje) {
                this.$noty.error("<h3 class=\"ui inverted header\"><i class=\"warning icon\"></i> " + mensaje + "</h3>", noty.error);
            },
            mostrarInfo(mensaje) {
                this.$noty.info("<h3 class=\"ui inverted header\"><i class=\"info icon\"></i> " + mensaje + "</h3>", noty.info);
            },
            mostrarAlerta(mensaje) {
                this.$noty.warning("<h3 class=\"ui inverted header\"><i class=\"warning icon\"></i> " + mensaje + "</h3>", noty.warning);
            },
            contenidoActual(id) {
                return this.contenidos.find(c => c.id === id);
            }
        },
        components: {
            InfiniteLoading
        }
    }
</script>