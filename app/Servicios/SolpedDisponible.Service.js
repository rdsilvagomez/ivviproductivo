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
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
var util_1 = require("../Servicios/util");
var SolpedDisponibleServicio = (function () {
    function SolpedDisponibleServicio(http, utilSrv) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.solpedDisponibleUrl = utilSrv.rutaServicio.concat("/posicionesDisponibles");
    }
    SolpedDisponibleServicio.prototype.getSolpedDisponibles = function (event, solped, posicion) {
        return this.http.get(this.solpedDisponibleUrl.concat("/list").concat("?page=").concat(event).concat("&solped=").concat(solped).concat("&posicion=").concat(posicion))
            .map(function (response) { return response.json(); });
    };
    SolpedDisponibleServicio.prototype.SolicitarCotizacion = function (listado, informacion, esmanual) {
        return this.http
            .post(this.solpedDisponibleUrl.concat("/solicitarcot"), JSON.stringify({ listado: listado, informacion: informacion, esmanual: esmanual }), { headers: this.headers })
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Server error'); });
    };
    SolpedDisponibleServicio.prototype.SincronizarPosiciones = function () {
        return this.http.get(this.solpedDisponibleUrl.concat("/sincposlibres"))
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Server error'); });
    };
    SolpedDisponibleServicio.prototype.getSequenciaManual = function () {
        return this.http.get(this.solpedDisponibleUrl.concat("/sequencia"))
            .map(function (res) { return res.json(); });
    };
    return SolpedDisponibleServicio;
}());
SolpedDisponibleServicio = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, util_1.utilService])
], SolpedDisponibleServicio);
exports.SolpedDisponibleServicio = SolpedDisponibleServicio;
//# sourceMappingURL=SolpedDisponible.Service.js.map