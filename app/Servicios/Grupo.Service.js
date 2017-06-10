"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/map");
var util_1 = require("../Servicios/util");
var GrupoServicio = (function () {
    function GrupoServicio(http, utilSrv) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.gruposUrl = utilSrv.rutaServicio.concat("/grupos");
    }
    GrupoServicio.prototype.filtrarGrupos = function (event, codigo, descripcion, seleccion, numeroSolped, posicion) {
        if (seleccion == 2) {
            return this.http.get(this.gruposUrl.concat("/filtrar").concat("?page=").concat(event).concat("&codigo=").concat(codigo).concat("&descripcion=").concat(descripcion))
                .map(function (response) { return response.json(); });
        }
        return this.http.get(this.gruposUrl.concat("/filtrar").concat("?page=").concat(event).concat("&codigo=").concat(codigo).concat("&descripcion=").concat(descripcion)
            .concat("&seleccion=").concat(seleccion)
            .concat("&numeroSolped=").concat(numeroSolped)
            .concat("&posicion=").concat(posicion))
            .map(function (response) { return response.json(); });
    };
    GrupoServicio.prototype.filtrarGrupoSol = function (event, codigo, descripcion) {
        return this.http.get(this.gruposUrl.concat("/list").concat("?page=").concat(event).concat("&codigo=").concat(codigo).concat("&descripcion=").concat(descripcion))
            .toPromise()
            .then(function (response) { return response.json(); });
    };
    GrupoServicio.prototype.ingresarGrupo = function (descripcion) {
        return this.http
            .post(this.gruposUrl.concat("/crear"), JSON.stringify({ descripcion: descripcion }), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    GrupoServicio.prototype.seleccionarGrupo = function (numeroSolped, posicion, idGrupo) {
        return this.http
            .post(this.gruposUrl.concat("/asociar"), JSON.stringify({ numeroSolped: numeroSolped,
            posicion: posicion,
            idGrupo: idGrupo }), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    GrupoServicio.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    GrupoServicio.prototype.eliminarGrupo = function (reg) {
        return this.http
            .post(this.gruposUrl.concat("/eliminar/"), JSON.stringify({ id: reg.id }), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    GrupoServicio.prototype.actualizarGrupo = function (reg) {
        return this.http
            .post(this.gruposUrl.concat("/actualizar/"), JSON.stringify({ id: reg.id,
            descripcion: reg.descripcion }), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    return GrupoServicio;
}());
GrupoServicio = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, util_1.utilService])
], GrupoServicio);
exports.GrupoServicio = GrupoServicio;
//# sourceMappingURL=Grupo.Service.js.map