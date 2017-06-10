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
var util_1 = require("../Servicios/util");
require("rxjs/add/operator/map");
var asociacionServicio = (function () {
    function asociacionServicio(http, utilSrv) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.solicitudCotizacionesUrl = utilSrv.rutaServicio;
    }
    asociacionServicio.prototype.getSolicitudCotEncabezado = function () {
        return this.http.get(this.solicitudCotizacionesUrl.concat("/solicitudcotizacionsap/listarmansinasoc"))
            .map(function (response) { return response.json(); });
    };
    asociacionServicio.prototype.getSolicitudCotdetalle = function (idencabezado) {
        return this.http.get(this.solicitudCotizacionesUrl.concat("/solicitudcotizacionsap/listarmansinasocdet").concat("?idencabezado=").concat(idencabezado))
            .map(function (response) { return response.json(); });
    };
    asociacionServicio.prototype.guardarAsociacion = function (listado) {
        return this.http.post(this.solicitudCotizacionesUrl.concat("/solicitudcotizacionsap/guardarasoc"), JSON.stringify({ listado: listado }), { headers: this.headers })
            .map(function (response) { return response.json(); });
    };
    return asociacionServicio;
}());
asociacionServicio = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, util_1.utilService])
], asociacionServicio);
exports.asociacionServicio = asociacionServicio;
//# sourceMappingURL=asociacion.js.map