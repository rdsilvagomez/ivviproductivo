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
var SolicitudCotServicio = (function () {
    function SolicitudCotServicio(http, utilSrv) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.solicitudCotizacionesUrl = utilSrv.rutaServicio;
    }
    SolicitudCotServicio.prototype.getSolicitudCotEncabezado = function () {
        return this.http.get(this.solicitudCotizacionesUrl.concat("/solicitudcotizaciones/list"))
            .map(function (response) { return response.json(); });
    };
    SolicitudCotServicio.prototype.getSolicitudCotDetalle = function (idencabezado) {
        return this.http.get(this.solicitudCotizacionesUrl.concat("/solicitudcotizacionesdetalle/list").concat("?idencabezado=").concat(idencabezado))
            .map(function (response) { return response.json(); });
    };
    SolicitudCotServicio.prototype.enviarCotizacionSap = function (listado, idSolicitudCotizacionCab) {
        return this.http.post(this.solicitudCotizacionesUrl.concat("/solicitudcotizacionsap/enviarcotsap"), JSON.stringify({ listado: listado, idSolicitudCotizacionCab: idSolicitudCotizacionCab }), { headers: this.headers })
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Server error'); });
    };
    SolicitudCotServicio.prototype.enviarCotizacionSapConArchivo = function (listado, idSolicitudCotizacionCab, file) {
        var formData = new FormData();
        formData.append('uploadFile', file, file.name);
        formData.append('listado', JSON.stringify(listado));
        formData.append('idSolicitudCotizacionCab', idSolicitudCotizacionCab);
        var headers = new http_1.Headers();
        headers.append('enctype', 'multipart/form-data');
        //headers.append('Content-Type', 'application/x-www-form-urlencoded'); 
        headers.append('Accept', 'application/json');
        return this.http.post(this.solicitudCotizacionesUrl.concat("/solicitudcotizacionsap/enviarcotsaparchivo"), formData, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    return SolicitudCotServicio;
}());
SolicitudCotServicio = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, util_1.utilService])
], SolicitudCotServicio);
exports.SolicitudCotServicio = SolicitudCotServicio;
//# sourceMappingURL=SolicitudCot.Service.js.map