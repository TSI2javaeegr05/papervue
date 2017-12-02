<template>
    <div>
        <div class="ui stackable two column grid" style="margin: 0">
            <div class="four wide column paperviu-e8"
                 style="padding: 0px">
                <div class="ui secondary pointing inverted two item menu paperviu-dark"
                     style="margin: 0; border-left: 0; border-top: 0; border-right: 0">
                    <a class="ui item" @click="listado = true"
                       style="border-bottom-width: 4px"
                       :class="{'active border-bottom-paperviu-sky inverted': listado, 'text-paperviu-e4': !listado}">
                        <h3 style="color: inherit;">Listado</h3>
                    </a>
                    <a class="ui item" @click="listado = false" style="border-bottom-width: 4px"
                       :class="{'active border-bottom-paperviu-sky inverted': !listado, 'text-paperviu-e4': listado}">
                        <h3 style="color: inherit;">Filtros</h3>
                    </a>
                </div>
                <div v-show="listado">
                    <div class="ui secondary pointing vertical fluid menu" style="margin: 0">
                        <div class="ui active border-bottom-paperviu-sky inverted paperviu-d7 item">
                            <div class="ui transparent icon inverted input big" style="padding: 5px">
                                <i @click="cargarContenidos" class="search link icon"></i>
                                <input style="height: 30px" v-model="filtro"
                                       @keyup.enter="cargarContenidos"
                                       placeholder="Buscar contenidos..." type="text">
                            </div>
                        </div>
                    </div>
                    <div v-bar="{preventParentScroll: true}">
                        <div style="max-height: 500px">
                            <div class="ui items">
                                <template v-for="cont in contenidos">
                                    <a @click="contenido.id = cont.id; getContenido();"
                                       class="ui item text-paperviu-d7 hover-text-paperviu-sky hover-border-paperviu-sky hover-paperviu-e4"
                                       style="padding: 16px; margin: 0">
                                        <h2 class="ui header" style="color: inherit; font-weight: 500">
                                            {{cont.titulo}}</h2>
                                    </a>
                                </template>
                            </div>
                            <infinite-loading ref="infiniteLoading"
                                              style="padding: 30px"
                                              @infinite="infiniteHandler">
                                <div slot="no-more">
                                    <h3 class="ui header text-paperviu-d7" style="opacity: 0.6"><i
                                            class="search icon text-paperviu-sky"></i>No hay m&aacute;s contenidos.
                                    </h3>
                                </div>
                                <div slot="no-results">
                                    <h3 class="ui header text-paperviu-d7" style="opacity: 0.6"><i
                                            class="search icon text-paperviu-sky"></i>No hay contenidos que mostrar.
                                    </h3>
                                </div>
                            </infinite-loading>
                        </div>
                    </div>
                </div>
                <div v-show="!listado" class="ui secondary pointing vertical fluid menu">
                    <div class="ui tag icon small labels" style="padding: 10px">
                        <div v-show="tipoFiltro !== ''" class="ui label paperviu-sky"
                             style="background-color: #f1f5f9">
                            <i @click="listado = true;tipoFiltro = ''; cargarContenidos();"
                               class="remove link text-paperviu-e8 large icon"
                               style="margin-right: 5px"></i>
                            <span class="ui detail header inverted"
                                  style="margin: 0">{{ tipoFiltro }}</span>
                        </div>
                        <div v-show="categoriaFiltro !== ''" class="ui paperviu-sky label">
                            <i @click="listado = true;categoriaFiltro = ''; cargarContenidos();"
                               class="remove link text-paperviu-e8 large icon"
                               style="margin-right: 5px"></i>
                            <span class="ui detail header inverted"
                                  style="margin: 0">{{ categoriaFiltro }}</span>
                        </div>
                        <div v-show="empresaFiltro !== ''" class="ui paperviu-sky label">
                            <i @click="listado = true;empresaFiltro = ''; cargarContenidos();"
                               class="remove link text-paperviu-e8 large icon"
                               style="margin-right: 5px"></i>
                            <span class="ui detail header inverted"
                                  style="margin: 0">{{ empresaFiltro }}</span>
                        </div>
                    </div>
                    <div class="ui accordion" style="margin: 0; padding-left: 10px; padding-bottom: 10px">
                        <h2 @click="resetEmpresas" class="title header text-paperviu-d7 large"
                            style="margin: 0; font-size: 16px;">
                            <i class="dropdown icon"></i>Empresas
                        </h2>
                        <div class="content" style="padding: 0">
                            <div v-bar="{preventParentScroll: true}">
                                <div style="max-height: 400px">
                                    <div class="ui selection list">
                                        <h3 class="ui item hover-border-paperviu-sky text-paperviu-dark hover-text-paperviu-sky"
                                            style="padding: 10px; font-weight: 300; margin-left: 10px"
                                            v-for="empresa in empresas"
                                            :class="{'active text-paperviu-sky border-right-paperviu-sky': empresaFiltro === empresa}"
                                            @click="listado = true;empresaFiltro = empresa; cargarContenidos();"
                                        >{{ empresa }}</h3>
                                    </div>
                                    <infinite-loading ref="infiniteLoadingEmpresas"
                                                      @infinite="listarEmpresas">
                                        <div slot="no-more">
                                            <h5 class="ui icon header text-paperviu-d7" style="opacity: 0.6">No hay m&aacute;s
                                                empresas.</h5>
                                        </div>
                                        <div slot="no-results">
                                            <h5 class="ui icon header text-paperviu-d7" style="opacity: 0.6">No hay
                                                empresas.</h5>
                                        </div>
                                    </infinite-loading>
                                </div>
                            </div>
                        </div>
                        <h2 @click="resetTipos" class="title header text-paperviu-d7 large"
                            style="margin: 0; font-size: 16px;">
                            <i class="dropdown icon"></i>Tipos
                        </h2>
                        <div class="content">
                            <div v-bar="{preventParentScroll: true}">
                                <div style="max-height: 400px">
                                    <div class="ui selection list">
                                        <h3 class="ui item hover-border-paperviu-sky text-paperviu-dark hover-text-paperviu-sky"
                                            style="padding: 10px"
                                            v-for="tipo in tipos"
                                            :class="{'active text-paperviu-sky border-right-paperviu-sky': tipoFiltro === tipo}"
                                            @click="listado = true;tipoFiltro = tipo; cargarContenidos();"
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
                        <h2 @click="resetCategorias" class="title header text-paperviu-d7 large"
                            style="margin: 0; font-size: 16px;">
                            <i class="dropdown icon"></i>Categorias
                        </h2>
                        <div class="content">
                            <div v-bar="{preventParentScroll: true}">
                                <div style="max-height: 400px">
                                    <div class="ui selection list">
                                        <h3 class="ui item hover-border-paperviu-sky hover-paperviu-e4 text-paperviu-dark hover-text-paperviu-sky"
                                            style="padding: 10px"
                                            v-for="cat in categorias"
                                            @click="listado = true;categoriaFiltro = cat; cargarContenidos();"
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
            <div style="padding: 0"
                 class="twelve wide column">
                <div v-show="contenido.id !== ''" class="row">
                    <div v-if="contenido.imagenSrc === ''" class="bkg3">
                        <div class="transp5"></div>
                    </div>
                    <div v-else :style="{backgroundImage: 'url(' + contenido.imagenSrc + ')'}" class="bkg4">
                        <div class="transp5"></div>
                    </div>
                </div>
                <div v-show="contenido.titulo !== ''" class="row" style="padding: 16px; margin: 0">
                    <h1 class="ui header text-paperviu-d7" style="font-size: 35px">{{contenido.titulo}}</h1>
                </div>
                <div v-show="contenido.id !== ''" class="ui toggle checkbox" style="padding-left: 16px">
                    <input @change="cambiarEstado" v-model="contenido.estadoAdmin" type="checkbox">
                    <label class="ui sub header huge text-paperviu-d7"
                           style="margin-top: 0; font-size: 16px; font-weight: 500;">
                        {{contenido.estadoAdmin ? 'Habilitado por administrador' : 'Bloqueado por administrador'}}
                    </label>
                </div>
                <div class="ui relaxed items" style="margin-top: 16px">
                    <div v-show="contenido.empresa !== '' && contenido.id !== ''"
                         class="ui item"
                         style="padding: 16px; margin: 0">
                        <div class="image" style="width: auto">
                            <i class="user circle outline icon text-paperviu-sky" style="font-size: 25px"></i>
                        </div>
                        <div class="content">
                            <p class="ui header text-paperviu-d7">
                                {{contenido.empresa}}
                            </p>
                        </div>
                    </div>
                    <div v-show="contenido.fecha !== '' && contenido.id !== ''"
                         class="ui item"
                         style="padding: 16px; margin: 0">
                        <div class="image" style="width: auto">
                            <i class="calendar icon text-paperviu-sky" style="font-size: 25px"></i>
                        </div>
                        <div class="content">
                            <p class="ui header text-paperviu-d7">
                                {{contenido.fecha}}
                            </p>
                        </div>
                    </div>
                    <div v-show="contenido.payperview && contenido.id !== ''"
                         class="ui item"
                         style="padding: 16px; margin: 0">
                        <div class="image" style="width: auto">
                            <i class="checkmark icon text-paperviu-sky" style="font-size: 25px"></i>
                        </div>
                        <div class="content">
                            <p class="ui header text-paperviu-d7">Disponible como Pay-Per-View</p>
                        </div>
                    </div>
                    <div v-show="contenido.payperview && contenido.id !== ''"
                         class="ui item"
                         style="padding: 16px; margin: 0">
                        <div class="image" style="width: auto">
                            <i class="dollar icon text-paperviu-sky" style="font-size: 25px"></i>
                        </div>
                        <div class="content">
                            <p class="ui header text-paperviu-d7">
                                {{contenido.precio}} <span style="font-weight: 500;">USD</span>
                            </p>
                        </div>
                    </div>
                    <div v-show="contenido.id !== ''"
                         class="ui item"
                         style="padding: 16px; margin: 0">
                        <div class="image" style="width: auto">
                            <i class="star icon text-paperviu-sky" style="font-size: 25px"></i>
                        </div>
                        <div class="content">
                            <div id="valoracion" class="ui huge star rating"></div>
                        </div>
                    </div>
                    <div v-show="contenido.descripcion !== '' && contenido.descripcion !== null && contenido.descripcion !== 'null'"
                         class="ui item"
                         style="padding: 16px; margin: 0">
                        <div class="image" style="width: auto">
                            <i class="quote left icon text-paperviu-sky" style="font-size: 27px"></i>
                        </div>
                        <div class="content">
                            <p class="ui header text-paperviu-dark" style="font-weight: 500;">
                                {{contenido.descripcion}}</p>
                        </div>
                    </div>
                    <div v-show="contenido.id !== ''"
                         class="ui item"
                         style="padding: 16px; margin: 0">
                        <div class="image" style="width: auto">
                            <i class="info icon text-paperviu-sky" style="font-size: 27px"></i>
                        </div>
                        <div class="content">
                            <p class="ui header text-paperviu-d7">
                                {{contenido.estado?'Habilitado por la empresa':'Deshabilitado por la empresa'}}
                            </p>
                        </div>
                    </div>
                    <div v-show="contenido.tipo !== '' && contenido.id !== ''"
                         class="ui item"
                         style="padding: 16px; margin: 0">
                        <div class="image" style="width: auto">
                            <i class="tag icon text-paperviu-sky" style="font-size: 25px"></i>
                        </div>
                        <div class="content">
                            <p class="ui header text-paperviu-d7">
                                {{contenido.tipo}}
                            </p>
                        </div>
                    </div>
                    <div v-show="contenido.enVivo && contenido.id !== ''"
                         class="ui item"
                         style="padding: 16px; margin: 0">
                        <div class="image" style="width: auto">
                            <i class="record icon text-paperviu-sky" style="font-size: 25px"></i>
                        </div>
                        <div class="content">
                            <h3 class="ui header text-paperviu-d7">Streaming en vivo</h3>
                        </div>
                    </div>
                    <div v-show="contenido.enVivo && contenido.id !== '' && contenido.tipoVideo !== ''"
                         class="ui item"
                         style="padding: 16px; margin: 0">
                        <div class="image" style="width: auto">
                            <i :class="{'youtube play': contenido.tipoVideo === 'video/youtube', 'facebook': contenido.tipoVideo === 'video/facebook', 'film': contenido.tipoVideo === 'video/dailymotion', 'twitch': contenido.tipoVideo === 'video/twitch', 'vimeo': contenido.tipoVideo === 'video/vimeo'}"
                               class=" icon text-paperviu-sky" style="font-size: 25px"></i>
                        </div>
                        <div class="content">
                            <h3 class="ui header text-paperviu-d7">Fuente de
                                {{contenido.tipoVideo.slice(contenido.tipoVideo.indexOf('/')+1)}}</h3>
                        </div>
                    </div>
                    <div v-show="contenido.enVivo && contenido.id !== '' && contenido.url !== ''"
                         class="ui item"
                         style="padding: 16px; margin: 0">
                        <div class="image" style="width: auto">
                            <i class="external icon text-paperviu-sky" style="font-size: 25px"></i>
                        </div>
                        <div class="content">
                            <h3 class="ui header text-paperviu-d7">{{contenido.url}}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {noty} from '../noty';
    import InfiniteLoading from 'vue-infinite-loading';
    import {dropbox} from '../dropbox_token';

    export default {
        data() {
            return {
                filtro: '',
                listado: true,
                tipoFiltro: '',
                categoriaFiltro: '',
                empresaFiltro: '',
                mostrarFiltros: false,
                pagina: 1,
                paginaTipos: 1,
                paginaCategorias: 1,
                paginaEmpresas: 1,
                contenidos: [],
                empresas: [],
                categorias: [],
                tipos: [],
                contenido: {
                    id: '',
                    titulo: '',
                    tipo: '',
                    fecha: '',
                    imagen: '',
                    imagenSrc: '',
                    empresa: '',
                    descripcion: '',
                    estado: false,
                    destacado: false,
                    payperview: false,
                    estadoAdmin: false,
                    url: '',
                    tipoVideo: '',
                    precio: 0,
                    enVivo: false,
                    valoracion: 0,
                }
            }
        },
        computed: {
            cargarContenidosURL() {
                return this.$store.state.baseUrl + "contenidos/titulos?filtro=" + this.filtro + "&tipo=" + this.tipoFiltro + "&categoria=" + this.categoriaFiltro + "&pagina=" + this.pagina + "&empresa=" + this.empresaFiltro;
            },
            getCategoriasURL() {
                return this.$store.state.baseUrl + "categorias/pag?filtro=&pagina=" + this.paginaCategorias;
            },
            cargarTiposURL() {
                return this.$store.state.baseUrl + "tipos?filtro=&pagina=" + this.paginaTipos;
            },
            cambiarEstadoURL() {
                return this.$store.state.baseUrl + "contenidos/estadoAdmin?id=" + this.contenido.id + "&estadoAdmin=" + this.contenido.estadoAdmin;
            },
            listarEmpresasURL() {
                return this.$store.state.baseUrl + "empresas?filtro=&pagina=" + this.paginaEmpresas;
            },
            getContenidoURL() {
                return this.$store.state.baseUrl + "contenidos/" + this.contenido.id;
            }
        },
        mounted() {
            this.$store.commit('setVistaActual', 'Contenidos');
            document.title = 'Contenidos';
            $('.ui.accordion').accordion();
            $('#valoracion')
                .rating({maxRating: 5})
                .rating('set rating', this.valoracion || 0)
                .rating('disable');
        },
        methods: {
            getContenido() {
                if (this.contenido.id !== '') {
                    var _this = this;
                    $.get(this.getContenidoURL, function (dt) {
                        if (dt !== undefined) {
                            _this.contenido.titulo = dt.contenido.titulo;
                            _this.contenido.tipo = dt.contenido.tipo.nombre;
                            _this.contenido.descripcion = dt.contenido.descripcion;
                            _this.contenido.estado = dt.contenido.estado;
                            _this.contenido.destacado = dt.contenido.destacado;
                            _this.contenido.payperview = dt.contenido.payperview;
                            _this.contenido.url = dt.contenido.url || '';
                            _this.contenido.enVivo = dt.contenido.tipo.enVivo;
                            _this.contenido.tipoVideo = dt.contenido.tipoVideo || '';
                            _this.contenido.precio = dt.contenido.precio || 0;
                            _this.contenido.valoracion = dt.valoracion || 0;
                            _this.contenido.fecha = dt.contenido.fecha || '';
                            _this.contenido.imagen = dt.contenido.portada || '';
                            _this.contenido.estadoAdmin = dt.contenido.estadoAdmin;
                            _this.contenido.empresa = dt.empresa;
                            $('#valoracion')
                                .rating({maxRating: 5})
                                .rating('set rating', dt.valoracion || 0)
                                .rating('disable');
                            _this.getImagen();
                        }
                    });
                }
            },
            infiniteHandler($state) {
                var _this = this;
                setTimeout(() => {
                    $.get(_this.cargarContenidosURL, function (response) {
                        if (response !== undefined) {
                            if (response.length >= 1) {
                                $.each(response, function (index, contenido) {
                                    _this.contenidos.push({
                                        id: contenido[0],
                                        titulo: contenido[1]
                                    });
                                });
                                $state.loaded();
                                _this.pagina += 1;
                            } else $state.complete();
                        } else $state.complete();
                    });
                }, 1000);
            },
            cargarContenidos() {
                this.pagina = 1;
                this.contenidos = [];
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
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
            resetEmpresas() {
                if (this.empresas.length === 0) {
                    this.paginaEmpresas = 1;
                    this.$refs.infiniteLoadingEmpresas.$emit('$InfiniteLoading:reset');
                }
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
            getImagen() {
                if (this.contenido.imagen !== "" && this.contenido.id !== '') {
                    var _this = this;
                    var dbx = new Dropbox({accessToken: dropbox.token});
                    dbx.filesGetTemporaryLink({path: '/Aplicaciones/contenidos/' + _this.contenido.id + '/' + _this.contenido.imagen})
                        .then(function (response) {
                            if (response !== undefined && response.link !== undefined && response.link !== "") {
                                _this.contenido.imagenSrc = response.link;
                            }
                        });
                }
            },
            cambiarEstado() {
                if (this.contenido.id !== '') {
                    var _this = this;
                    this.mostrarInfo("Actualizando estado...");
                    $.ajax({
                            url: _this.cambiarEstadoURL,
                            type: 'PUT',
                            success: function (response) {
                                if (response === true || response === "true") _this.mostrarExito("Estado actualizado!");
                                else _this.mostrarError("No se pudo actualizar el estado");
                            },
                            error: function () {
                                _this.mostrarError("No se pudo enviar solicitud. Por favor vuelve a intentar...");
                            }
                        }
                    );
                }
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
        },
        components: {
            InfiniteLoading
        }
    }
</script>