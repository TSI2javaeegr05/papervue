<template>
    <div>
        <div class="ui stackable grid">
            <div class="four wide column paperviu-e8" style="padding: 0; margin: 0">
                <div class="ui secondary pointing vertical fluid menu" style="margin: 0; padding: 0">
                    <div class="ui active border-bottom-paperviu-sky paperviu-e4 item">
                        <div class="ui transparent icon input huge" style="padding: 10px; margin-top: 10px">
                            <i @click="listarClientes(1)" class="search link icon"></i>
                            <input style="height: 30px; margin-left: 7px" v-model="filtro"
                                   @keyup.enter="listarClientes(1)"
                                   placeholder="Buscar clientes..." type="text">
                        </div>
                    </div>
                </div>
                <div v-bar="{preventParentScroll: true}">
                    <div style="max-height: 500px">
                        <div class="ui selection list" style="margin: 0; padding: 0">
                            <template v-for="cliente in clientes">
                                <a @click="usernameActual = cliente.username; getCliente(); isSuscripto();"
                                   style="margin: 0; padding: 13px"
                                   class="ui item text-paperviu-d7 hover-text-paperviu-sky hover-paperviu-e4">
                                    <h2 class="ui header"
                                        style="color: inherit; margin: 0; font-weight: 500; margin: 0; padding-left: 16px">
                                        {{cliente.nombreCompleto}}</h2>
                                    <h4 class="ui header"
                                        style="color: inherit; font-weight: 500; margin: 0; padding-left: 16px">
                                        {{cliente.username}}</h4>
                                </a>
                            </template>
                        </div>
                        <infinite-loading ref="infiniteLoading"
                                          style="padding: 10px"
                                          @infinite="infiniteHandler">
                            <div slot="no-more">
                                <h3 class="ui header text-paperviu-d7" style="opacity: 0.6"><i
                                        class="search icon text-paperviu-sky"></i>No hay m&aacute;s clientes.
                                </h3>
                            </div>
                            <div slot="no-results">
                                <h3 class="ui header text-paperviu-d7" style="opacity: 0.6"><i
                                        class="search icon text-paperviu-sky"></i>No hay clientes que mostrar.
                                </h3>
                            </div>
                        </infinite-loading>
                    </div>
                </div>
            </div>
            <div class="twelve wide column" style="margin: 0">
                <div class="row" style="padding: 16px">
                    <h1 class="ui header text-paperviu-dark" style="margin: 0">
                        {{cliente.nombreCompleto}}</h1>
                    <div v-show="cliente.username !== ''" class="ui toggle checkbox" style="margin-top: 16px">
                        <input v-model="cliente.estado" type="checkbox"
                               @click="cambiarEstado(cliente.username, !cliente.estado)">
                        <label class="ui sub header huge text-paperviu-d7"
                               style="margin-top: 0; font-size: 16px; font-weight: 500;">
                            {{cliente.estado ? 'Usuario habilitado' : 'Usuario bloqueado'}}
                        </label>
                    </div>
                </div>
                <div class="row" style="padding: 16px; margin: 0">
                    <h3 v-show="cliente.username !== ''" class="ui header text-paperviu-d7"
                        style="margin: 0; font-weight: 500;"><i
                            class="user outline circle text-paperviu-sky icon"></i>{{cliente.username}}</h3>
                    <h3 v-show="cliente.email !== ''" class="ui header text-paperviu-d7"
                        style="margin-top: 16px; font-weight: 500;"><i
                            class="at text-paperviu-sky icon"></i>{{cliente.email}}</h3>
                    <h3 v-show="cliente.username !== ''" class="ui header text-paperviu-d7"
                        style="margin-top: 16px; font-weight: 500;">
                        <i class="info text-paperviu-sky icon"></i>
                        {{cliente.suscripto ? "Cliente suscripto a Papervue" : 'Cliente no suscripto actualmente'}}
                    </h3>
                </div>
                <div class="row" v-show="cliente.username !== ''" style="margin: 0; padding: 10px">
                    <div class="ui accordion" style="margin: 0px">
                        <h2 @click="resetSuscripciones"
                            class="title header text-paperviu-d7 hover-text-paperviu-sky large"
                            style="margin: 0; font-size: 20px; padding: 10px; font-weight: 500">
                            <i class="payment text-paperviu-sky icon" style="margin-right: 10px"></i>Suscripci&oacute;nes
                        </h2>
                        <div class="content" style="padding: 0; margin: 0">
                            <div class="row" style="padding: 10px; height: 400px; max-height: 400px;">
                                <template v-for="suscripcion in cliente.suscripciones">
                                    <div class="row paperviu-e4 border-left-paperviu-sky"
                                         style="padding: 10px; margin-bottom: 10px">
                                        <div class="row">
                                            <div class="ui header text-paperviu-sky large"
                                                 style="margin: 0">
                                                {{suscripcion.tipo}}
                                            </div>
                                        </div>
                                        <h3 class="ui header text-paperviu-dark" style="margin: 0; font-weight: 500;">
                                            {{suscripcion.fechaInicio}}
                                            <span><i class="right angle icon"></i>{{suscripcion.fechaFin}}</span><br>
                                        </h3>
                                    </div>
                                </template>
                                <infinite-loading ref="infiniteLoadingSuscripciones"
                                                  style="padding: 10px"
                                                  @infinite="listarSuscripciones">
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
                        <h2 @click="resetComentarios"
                            class="active title header text-paperviu-d7 hover-text-paperviu-sky large"
                            style="margin: 0; font-size: 20px; padding: 10px; font-weight: 500">
                            <i class="comments text-paperviu-sky icon" style="margin-right: 10px"></i>Comentarios
                        </h2>
                        <div class="content" style="padding: 0; margin: 0">
                            <div v-bar>
                                <div class="row" style="padding: 30px; height: 400px; max-height: 400px;">
                                    <div class="ui relaxed items">
                                        <template v-for="comentario in cliente.comentarios">
                                            <div class="ui item"
                                                 style="background-color: #e5ecf3; padding: 10px; margin-top: 16px">
                                                <div class="image" style="width: auto">
                                                    <button :id="comentario.itemId"
                                                            @click="idComentarioEliminar = comentario.id; popupEliminar(comentario.itemId)"
                                                            class="ui circular paperviu-sky hover-paperviu-63 text-paperviu-e8 icon button">
                                                        <i class="trash icon"></i>
                                                    </button>
                                                </div>
                                                <div class="content">
                                                    <h3 class="ui author header text-paperviu-d7"
                                                        style="margin-bottom: 0">{{ comentario.titulo }}</h3>
                                                    <div class="metadata">
                                                        <h3 class="ui header text-paperviu-dark date"
                                                            style="font-weight: 500">
                                                            {{comentario.fecha}}</h3>
                                                    </div>
                                                    <h4 class="ui header text-paperviu-dark text"
                                                        style="margin: 5px; font-weight: 500">
                                                        {{comentario.texto}}
                                                    </h4>
                                                </div>
                                            </div>
                                        </template>
                                    </div>
                                    <div id="eliminarPopup" class="ui popup flowing transition hidden"
                                         style="padding: 0">
                                        <div class="ui secondary pointing border-bottom-paperviu-sky small menu"
                                             style="margin: 0; padding: 0">
                                            <h4 class="ui header text-paperviu-d7"
                                                style="margin-top: 8px; margin-left: 15px; margin-right: 5px">
                                                &iquest;Confirmar?</h4>
                                            <a @click="eliminarComentario"
                                               class="ui item hover-paperviu-e8" style="margin: 0"><span
                                                    class="ui header text-paperviu-sky">Eliminar</span></a>
                                        </div>
                                    </div>
                                    <infinite-loading ref="infiniteLoadingComentarios"
                                                      style="padding: 10px"
                                                      @infinite="listarComentarios">
                                        <div slot="no-more">
                                            <div class="ui icon header text-paperviu-d7" style="opacity: 0.6"><i
                                                    class="search icon text-paperviu-sky"></i>No hay m&aacute;s
                                                resultados.
                                            </div>
                                        </div>
                                        <div slot="no-results">
                                            <div class="ui icon header text-paperviu-d7" style="opacity: 0.6"><i
                                                    class="search icon text-paperviu-sky"></i>No hay resultados que
                                                mostrar.
                                            </div>
                                        </div>
                                    </infinite-loading>
                                </div>
                            </div>
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

    export default {
        data() {
            return {
                pagina: 1,
                filtro: '',
                usernameActual: '',
                estadoActual: '',
                clientes: [],
                paginaSuscripciones: 1,
                idComentarioEliminar: '',
                paginaComentarios: 1,
                cliente: {
                    username: '',
                    nombreCompleto: '',
                    email: '',
                    estado: false,
                    suscripto: false,
                    ingresos: [],
                    suscripciones: [],
                    comentarios: []
                }
            }
        },
        computed: {
            listarClientesURL() {
                return this.$store.state.baseUrl + "usuarios?usuario=" + this.filtro + "&pagina=" + this.pagina;
            },
            cambiarEstadoURL() {
                return this.$store.state.baseUrl + "usuarios/estado?username=" + this.usernameActual + "&estado=" + this.estadoActual;
            },
            getClienteURL() {
                return this.$store.state.baseUrl + "usuarios/" + this.usernameActual;
            },
            isSuscriptoURL() {
                return this.$store.state.baseUrl + "suscripciones/" + this.usernameActual;
            },
            listarSuscripcionesURL() {
                return this.$store.state.baseUrl + "suscripciones/all?username=" + this.cliente.username + "&pagina=" + this.paginaSuscripciones;
            },
            listarComentariosURL() {
                return this.$store.state.baseUrl + "comentarios/usuario?username=" + this.cliente.username + "&pagina=" + this.paginaComentarios;
            },
            eliminarComentarioURL() {
                return this.$store.state.baseUrl + "comentarios/" + this.idComentarioEliminar;
            }
        },
        mounted() {
            this.$store.commit('setVistaActual', 'Clientes');
            document.title = 'Clientes';
            this.cliente.suscripciones = [];
            this.cliente.comentarios = [];
            this.clientes = [];
            $('.ui.accordion').accordion();
        },
        methods: {
            popupEliminar(id) {
                $('#' + id).popup({
                    popup: $('#eliminarPopup'),
                    inline: true,
                    on: 'click'
                }).popup('show');
            },
            infiniteHandler($state) {
                var _this = this;
                setTimeout(() => {
                    $.get(_this.listarClientesURL, function (response) {
                        if (response !== undefined) {
                            if (response.length >= 1) {
                                var clientes = [];
                                $.each(response, function (index, usuario) {
                                    clientes.push({
                                        nombreCompleto: usuario.nombreCompleto,
                                        username: usuario.username,
                                    });
                                });
                                _this.clientes = _this.clientes.concat(clientes);
                                $state.loaded();
                                _this.pagina += 1;
                            } else $state.complete();
                        } else $state.complete();
                    });
                }, 800);
            },
            listarClientes(pagina) {
                if (pagina !== undefined) this.pagina = pagina;
                this.clientes = [];
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
            },
            getCliente() {
                if (this.usernameActual !== '') {
                    var _this = this;
                    this.cliente.suscripciones = [];
                    this.cliente.comentarios = [];
                    this.paginaComentarios = 1;
                    this.paginaSuscripciones = 1;
                    $('.ui.accordion').accordion('close', 0).accordion('close', 1);
                    $.get(this.getClienteURL, function (response) {
                        if (response !== undefined) {
                            _this.cliente.username = _this.usernameActual;
                            _this.cliente.nombreCompleto = response.nombre + " " + response.apellido;
                            _this.cliente.email = response.email;
                            _this.cliente.estado = response.estado;
                        }
                    }).fail(function () {
                        _this.getCliente();
                    });
                }
            },
            isSuscripto() {
                if (this.usernameActual !== '') {
                    var _this = this;
                    $.get(this.isSuscriptoURL, function (response) {
                        _this.cliente.suscripto = response === true;
                    });
                }
            },
            cambiarEstado(username, estado) {
                if (username !== '' && estado !== undefined) {
                    this.usernameActual = username;
                    this.estadoActual = estado;
                    var _this = this;
                    this.mostrarInfo("Actualizando estado...");
                    $.ajax({
                        url: _this.cambiarEstadoURL,
                        type: 'PUT',
                        success: function (response) {
                            if (response === true || response === "true") _this.mostrarExito(estado ? 'Usuario habilitado!' : 'Usuario bloqueado!');
                            else _this.mostrarExito("No se pudo actualizar el estado");
                        },
                        error: function () {
                            _this.mostrarError("No se pudo enviar solicitud. Por favor vuelve a intentar...");
                        }
                    });
                } else _this.mostrarAlerta("Debes seleccionar un cliente");
            },
            listarSuscripciones($state) {
                if (this.cliente.username !== '') {
                    var _this = this;
                    setTimeout(() => {
                        $.get(this.listarSuscripcionesURL, function (response) {
                            if (response !== undefined) {
                                if (response.length >= 1) {
                                    var suscripciones = [];
                                    $.each(response, function (index, suscripcion) {
                                        var inicio = new Date(suscripcion.fechaInicio);
                                        var fin = new Date(suscripcion.fechaFin);
                                        suscripciones.push({
                                            fechaInicio: inicio.getDate() + "/" + (inicio.getMonth() + 1) + "/" + inicio.getFullYear(),
                                            fechaFin: fin.getDate() + "/" + (fin.getMonth() + 1) + "/" + fin.getFullYear(),
                                            tipo: suscripcion.tipo
                                        });
                                    });
                                    _this.cliente.suscripciones = _this.cliente.suscripciones.concat(suscripciones);
                                    $state.loaded();
                                    _this.paginaSuscripciones += 1;
                                } else $state.complete();
                            } else $state.complete();
                        });
                    }, 800);
                }
            },
            resetSuscripciones() {
                if (this.cliente.suscripciones.length === 0) this.$refs.infiniteLoadingSuscripciones.$emit('$InfiniteLoading:reset');
            },
            listarComentarios($state) {
                if (this.cliente.username !== '') {
                    var _this = this;
                    setTimeout(() => {
                        $.get(this.listarComentariosURL, function (response) {
                            if (response !== undefined) {
                                if (response.length >= 1) {
                                    $.each(response, function (index, comentario) {
                                        var fecha = new Date(comentario.fecha);
                                        _this.cliente.comentarios.push({
                                            id: comentario.id,
                                            titulo: comentario.titulo,
                                            fecha: fecha.getDate() + "/" + (fecha.getMonth() + 1) + "  " + comentario.hora,
                                            texto: comentario.texto,
                                            itemId: _this.cliente.comentarios.length + 1
                                        });
                                    });
                                    $state.loaded();
                                    _this.paginaComentarios += 1;
                                } else $state.complete();
                            } else $state.complete();
                        });
                    }, 800);
                }
            },
            eliminarComentario() {
                if (this.idComentarioEliminar !== '') {
                    this.mostrarInfo("Eliminando comentario...");
                    var _this = this;
                    $.ajax({
                        type: 'DELETE',
                        url: _this.eliminarComentarioURL,
                        success: function (response) {
                            if (response === true || response === "true") {
                                _this.mostrarExito("Comentario eliminado!");
                                _this.cliente.comentarios = [];
                                _this.paginaComentarios = 1;
                                _this.resetComentarios();
                            } else _this.mostrarError("No se pudo eliminar el comentario");
                        },
                        error: function () {
                            _this.mostrarError("No se pudo enviar solicitud. Por favor vuelve a intentar...");
                        }
                    });
                }
            },
            resetComentarios() {
                if (this.cliente.comentarios.length === 0) this.$refs.infiniteLoadingComentarios.$emit('$InfiniteLoading:reset');
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