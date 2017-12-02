<template>
    <div>
        <div id="listado" class="ui stackable two column grid" style="margin: 0">
            <div class="three wide column paperviu-e8"
                 style="padding: 0; height: auto; max-height: 600px">
                <div class="ui secondary pointing vertical fluid menu" style="border: 0">
                    <div @click="mostrarNuevo = !mostrarNuevo"
                         class="ui active paperviu-dark hover-paperviu-d7 item"
                         style="cursor: pointer; padding: 16px; margin: 0; border: 0">
                        <i class="add icon" style="margin-top: 5px"></i><span
                            style="font-size: 20px">Crear contenido</span>
                    </div>
                    <div class="ui item inverted paperviu-d7" style="border: 0; margin: 0">
                        <div class="ui fluid transparent input big inverted icon focus"
                             style="padding: 0">
                            <i @click="listarContenidos(1)" class="search icon link"></i>
                            <input style="height: 30px" @keyup.enter="listarContenidos(1)" v-model="filtro"
                                   type="text"
                                   placeholder="Buscar por titulo...">
                        </div>
                    </div>
                    <div class="ui accordion" style="margin: 0px; padding-left: 16px; padding-top: 10px">
                        <h2 @click="resetTipos" class="title header text-paperviu-dark large" style="margin: 0px">
                            <i class="sitemap text-paperviu-sky icon" style="margin-right: 7px"></i>Tipos
                        </h2>
                        <div class="content">
                            <div v-bar="{preventParentScroll: true}">
                                <div style="max-height: 400px">
                                    <div class="ui selection list">
                                        <h3 class="ui item hover-border-paperviu-sky text-paperviu-dark hover-text-paperviu-sky"
                                            style="padding: 10px"
                                            v-for="tipo in tipos"
                                            :class="{'active text-paperviu-sky border-right-paperviu-sky': tipoFiltro === tipo}"
                                            @click="listado = true;tipoFiltro = tipo; listarContenidos(1);"
                                        >{{ tipo }}</h3>
                                    </div>
                                    <infinite-loading ref="infiniteLoadingTipos"
                                                      @infinite="cargarTipos">
                                        <div slot="no-more">
                                            <h5 class="ui icon header text-paperviu-d7"
                                                style="opacity: 0.6; margin: 0; padding: 0">No hay m&aacute;s
                                                tipos.</h5>
                                        </div>
                                        <div slot="no-results">
                                            <h5 class="ui icon header text-paperviu-d7"
                                                style="opacity: 0.6; margin: 0; padding: 0">No hay tipos.</h5>
                                        </div>
                                    </infinite-loading>
                                </div>
                            </div>
                        </div>
                        <h2 @click="resetCategorias" class="title header text-paperviu-dark large" style="margin: 0px">
                            <i class="tags text-paperviu-sky icon" style="margin-right: 7px"></i>Categorias
                        </h2>
                        <div class="content">
                            <div v-bar="{preventParentScroll: true}">
                                <div style="max-height: 400px">
                                    <div class="ui selection list">
                                        <h3 class="ui item hover-border-paperviu-sky hover-paperviu-e4 text-paperviu-dark hover-text-paperviu-sky"
                                            style="padding: 10px"
                                            v-for="cat in categorias"
                                            @click="listado = true;categoriaFiltro = cat; listarContenidos(1);"
                                            :class="{'active text-paperviu-sky': categoriaFiltro === cat}"
                                        >{{ cat }}</h3>
                                    </div>
                                    <infinite-loading ref="infiniteLoadingCategorias"
                                                      @infinite="cargarCategorias">
                                        <div slot="no-more">
                                            <h5 class="ui icon header text-paperviu-d7" style="opacity: 0.6">No hay m&aacute;s
                                                categor&iacute;as.</h5>
                                        </div>
                                        <div slot="no-results">
                                            <h5 class="ui icon header text-paperviu-d7" style="opacity: 0.6">No hay
                                                categor&iacute;as.</h5>
                                        </div>
                                    </infinite-loading>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="padding:0" class="thirteen wide column">
                <div class="row border-bottom-paperviu-sky" v-show="mostrarNuevo" style="background-color: #e5ecf3">
                    <div class="ui right aligned text container" style="padding: 20px">
                        <div class="ui secondary menu pointing" style="margin: 0; border: 0">
                            <h1 class="ui header text-paperviu-sky" style="margin: 0">Contenido nuevo</h1>
                            <div class="right menu">
                                <i @click="mostrarNuevo = !mostrarNuevo" class="close icon link red large"
                                   style="margin-top: 2px"></i>
                            </div>
                        </div>
                        <div class="ui fluid labeled input" style="padding: 10px; margin-top: 10px">
                            <div class="ui basic label">T&iacute;tulo</div>
                            <input v-model="titulo" type="text" placeholder="Ingrese el titulo...">
                        </div>
                        <div class="ui fluid labeled input" style="padding: 10px">
                            <div class="ui basic label">Tipo</div>
                            <select id="tipo" v-model="tipo" class="ui fluid dropdown" style="width: 100%">
                                <option v-for="tipo in tiposList" :value="tipo.nombre">{{ tipo.nombre }}</option>
                                <option value="" selected disabled>Seleccione un tipo...</option>
                            </select>
                        </div>
                        <div class="row" style="padding: 10px">
                            <button @click="crearContenido"
                                    class="ui large button paperviu-d7 text-paperviu-e8 hover-paperviu-dark">Crear
                                contenido
                            </button>
                        </div>
                    </div>
                </div>
                <div class="ui secondary menu">
                    <div class="ui tag icon small labels">
                        <div v-show="tipoFiltro !== ''" class="ui label paperviu-sky"
                             style="background-color: #f1f5f9">
                            <i @click="tipoFiltro = ''; listarContenidos(1);"
                               class="remove link text-paperviu-e8 large icon"
                               style="margin-right: 5px"></i>
                            <span class="ui detail header inverted"
                                  style="margin: 0">{{ tipoFiltro }}</span>
                        </div>
                        <div v-show="categoriaFiltro !== ''" class="ui paperviu-sky label">
                            <i @click="categoriaFiltro = ''; listarContenidos(1);"
                               class="remove link text-paperviu-e8 large icon"
                               style="margin-right: 5px"></i>
                            <span class="ui detail header inverted"
                                  style="margin: 0">{{ categoriaFiltro }}</span>
                        </div>
                    </div>
                </div>
                <div class="ui stackable two column relaxed grid container">
                    <paperviu-contenido-item
                            v-for="(contenido, index) in contenidosList"
                            :key="index"
                            :id="contenido.id"
                            :titulo="contenido.titulo"
                            :tipo="contenido.tipo"
                            :valoracion="contenido.valoracion"
                            :imagen="contenido.imagen"
                            :fecha="contenido.fecha"
                            :estado="contenido.estado"
                            :estadoAdmin="contenido.estadoAdmin"
                            @verModificacion="mostrarMod(contenido.id, contenido.tipo)"
                    ></paperviu-contenido-item>
                </div>
                <infinite-loading ref="infiniteLoading" style="padding: 50px" @infinite="infiniteHandler">
                    <div slot="no-more">
                        <div class="ui icon header text-paperviu-d7" style="opacity: 0.6"><i
                                class="search icon text-paperviu-sky"></i>No hay m&aacute;s resultados.
                        </div>
                    </div>
                    <div slot="no-results">
                        <div class="ui icon header text-paperviu-d7" style="opacity: 0.6"><i
                                class="search icon text-paperviu-sky"></i>No hay resultados que mostrar.
                        </div>
                    </div>
                </infinite-loading>
            </div>
        </div>
        <div class="ui row" id="mod" style="padding-bottom: 60px; display: none">
            <paperviu-contenido-mod
                    v-if="modificarContenido"
                    :contenido="idContenidoActual"
                    :tipo="tipoContenidoActual"
                    @volver="mostrarListado"
            ></paperviu-contenido-mod>
        </div>
    </div>
</template>
<script>
    import {dropbox} from '../dropbox_token';
    import {noty} from '../noty';
    import InfiniteLoading from 'vue-infinite-loading';

    export default {
        data() {
            return {
                mostrarNuevo: false,
                pagina: 1,
                filtro: '',
                categoriaFiltro: '',
                tipoFiltro: '',
                titulo: '',
                tipo: '',
                mostrarFiltros: false,
                idContenidoActual: '',
                tipoContenidoActual: '',
                modificarContenido: false,
                tipos: [],
                categorias: [],
                paginaTipos: 1,
                paginaCategorias: 1
            }
        },
        computed: {
            getCategoriasURL() {
                return this.$store.state.baseUrl + "categorias/pag?filtro=&pagina=" + this.paginaCategorias;
            },
            cargarTiposURL() {
                return this.$store.state.baseUrl + "tipos?filtro=&pagina=" + this.paginaTipos;
            },
            listarContenidosURL() {
                return this.$store.state.baseUrl + "contenidos?contenido=" + this.filtro + "&tipo=" + this.tipoFiltro + "&categoria=" + this.categoriaFiltro + "&pagina=" + this.pagina + "&empresa=" + this.empresa.nombre + "&empresaLike=false";
            },
            crearContenidoURL() {
                return this.$store.state.baseUrl + "contenidos?titulo=" + this.titulo + "&empresa=" + this.empresa.nombre + "&tipo=" + this.tipo;
            },
            contenidosList() {
                return this.$store.state.contenidosList;
            },
            empresa() {
                return this.$store.state.empresa;
            }
        },
        mounted() {
            document.title = 'Contenidos';
            this.$store.commit('setVistaActual', 'Contenidos');
            this.$store.commit('setContenidosList', []);
            $('.ui.dropdown').dropdown();
            $('.ui.accordion').accordion();
        },
        methods: {
            infiniteHandler($state) {
                var _this = this;
                setTimeout(() => {
                    $.get(_this.listarContenidosURL, function (response) {
                        if (response !== undefined) {
                            if (response.length >= 1) {
                                var contenidos = [];
                                $.each(response, function (index, dt) {
                                    contenidos.push({
                                        id: dt.contenido.id,
                                        estado: dt.contenido.estado,
                                        estadoAdmin: dt.contenido.estadoAdmin,
                                        fecha: dt.contenido.fecha,
                                        tipo: dt.contenido.tipo.nombre,
                                        titulo: dt.contenido.titulo,
                                        valoracion: dt.valoracion,
                                        imagen: dt.contenido.portada
                                    });
                                });
                                _this.$store.state.contenidosList = _this.$store.state.contenidosList.concat(contenidos);
                                $state.loaded();
                                _this.pagina += 1;
                            } else $state.complete();
                        } else $state.complete();
                    });
                }, 1000);
            },
            mostrarMod(contenido, tipo) {
                this.idContenidoActual = contenido;
                this.tipoContenidoActual = tipo;
                this.modificarContenido = true;
                $('#listado').transition({
                    animation: 'fade out',
                    onComplete: function () {
                        $('#mod').transition('fade in');
                    }
                });
                $('#menu2').transition('fade out');
            },
            mostrarListado() {
                var _this = this;
                $('#mod').transition({
                    animation: 'fade out',
                    onComplete: function () {
                        $('#listado').transition('fade in');
                        _this.modificarContenido = false;
                        _this.listarContenidos(1);
                        document.title = 'Contenidos';
                    }
                });
                $('#menu2').transition('fade in');
            },
            cargarCategorias($state) {
                var _this = this;
                setTimeout(() => {
                    $.get(_this.getCategoriasURL, function (response) {
                        if (response !== undefined) {
                            if (response.length >= 1) {
                                $.each(response, function (index, categoria) {
                                    _this.categorias.push(categoria.nombre);
                                    _this.$store.commit('agregarCategoria', categoria.nombre);
                                });
                                $state.loaded();
                                _this.paginaCategorias += 1;
                            } else $state.complete();
                        } else $state.complete();
                    });
                }, 1000);
            },
            cargarTipos($state) {
                var _this = this;
                setTimeout(() => {
                    $.get(_this.cargarTiposURL, function (response) {
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
            resetCategorias() {
                if (this.categorias.length === 0) {
                    this.paginaCategorias = 1;
                    this.$refs.infiniteLoadingCategorias.$emit('$InfiniteLoading:reset');
                }
            },
            resetTipos() {
                if (this.tipos.length === 0) {
                    this.paginaTipos = 1;
                    this.$refs.infiniteLoadingTipos.$emit('$InfiniteLoading:reset');
                }
            },
            crearContenido() {
                var _this = this;
                if (this.tipo === '' || this.titulo === '') this.mostrarAlertContendio();
                else {
                    this.mostrarCreandoContenido();
                    $.post(this.crearContenidoURL, function (response) {
                        if (response !== undefined) {
                            if (response > 0) _this.crearCarpetaDropbox(response);
                            else _this.mostrarErrorCrearContenido();
                        } else _this.mostrarErrorCrearContenido();
                    }).fail(function () {
                        _this.mostrarErrorCrearContenido();
                    });
                }
            },
            listarContenidos(pagina) {
                if (pagina !== undefined) this.pagina = pagina;
                this.$store.commit('setContenidosList', []);
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
            },
            crearCarpetaDropbox(id) {
                var _this = this;
                var dbx = new Dropbox({accessToken: dropbox.token});
                dbx.filesCreateFolderV2({
                    path: '/Aplicaciones/contenidos/' + id
                }).then(function (response) {
                    _this.mostrarContenidoCreado();
                    _this.mostrarNuevo = false;
                    _this.listarContenidos(1);
                });
            },
            mostrarAlertContendio() {
                this.$noty.warning("<h3 class=\"ui inverted header\"><i class=\"warning icon\"></i>Debes ingresar el t&iacute;tulo y el tipo!</h3>", noty.warning);
            },
            mostrarContenidoCreado() {
                this.$noty.success("<h3 class=\"ui inverted header\"><i class=\"checkmark icon\"></i>Contenido creado!</h3>", noty.success);
            },
            mostrarCreandoContenido() {
                this.$noty.info("<h3 class=\"ui inverted header\"><i class=\"info icon\"></i>Creando contenido...</h3>", noty.info);
            },
            mostrarErrorCrearContenido() {
                this.$noty.error("<h3 class=\"ui inverted header\"><i class=\"warning icon\"></i>No se pudo crear el contenido.</h3>", noty.error);
            }
        },
        components: {
            InfiniteLoading
        }
    }
</script>
<style>

</style>