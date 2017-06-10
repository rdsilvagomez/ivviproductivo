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
var filtroServicio = (function () {
    function filtroServicio(http, utilSrv) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.ServicioUrl = "";
        this.ServicioUrl = utilSrv.rutaServicio;
    }
    filtroServicio.prototype.getFiltro = function () {
        return this.http.get(this.ServicioUrl.concat("/filtrousuario/filtrar")).map(function (response) { return response.json(); });
    };
    filtroServicio.prototype.actualizarFiltro = function (reg) {
        return this.http.post(this.ServicioUrl.concat("/filtrousuario/actualizar"), JSON.stringify(reg)).map(function (response) { return response.json(); });
    };
    return filtroServicio;
}());
filtroServicio = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, util_1.utilService])
], filtroServicio);
exports.filtroServicio = filtroServicio;
//# sourceMappingURL=filtros.js.map