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
var ProveedorServicio = (function () {
    function ProveedorServicio(http, utilSrv) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.proveedorUrl = utilSrv.rutaServicio.concat("/proveedor");
    }
    ProveedorServicio.prototype.filtrarProveedores = function (event, codigo, descripcion, seleccion, grupoid) {
        return this.http.get(this.proveedorUrl.concat("/filtrar").concat("?page=").concat(event).concat("&codigo=").concat(codigo).concat("&descripcion=").concat(descripcion)
            .concat("&seleccion=").concat(seleccion).concat("&grupoid=").concat(grupoid))
            .toPromise()
            .then(function (response) { return response.json(); });
    };
    ProveedorServicio.prototype.filtrarProveedoresXposicion = function (event, codigo, seleccion, descripcion, numeroSolped, posicion, asociar) {
        return this.http.get(this.proveedorUrl.concat("/filtrarposicion")
            .concat("?page=").concat(event)
            .concat("&codigo=").concat(codigo)
            .concat("&descripcion=").concat(descripcion)
            .concat("&seleccion=").concat(seleccion)
            .concat("&numeroSolped=").concat(numeroSolped)
            .concat("&posicion=").concat(posicion)
            .concat("&asociar=").concat(asociar))
            .toPromise()
            .then(function (response) { return response.json(); });
    };
    ProveedorServicio.prototype.asociarGrupo = function (idProveedor, idGrupo) {
        return this.http
            .post(this.proveedorUrl.concat("/asociar"), JSON.stringify({ idProveedor: idProveedor,
            idGrupo: idGrupo }), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ProveedorServicio.prototype.asociarPosicion = function (idProveedor, numeroSolped, posicion, asociar) {
        return this.http
            .post(this.proveedorUrl.concat("/asociarposicion"), JSON.stringify({
            idProveedor: idProveedor,
            numeroSolped: numeroSolped,
            posicion: posicion,
            asociar: asociar
        }), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ProveedorServicio.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return ProveedorServicio;
}());
ProveedorServicio = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, util_1.utilService])
], ProveedorServicio);
exports.ProveedorServicio = ProveedorServicio;
//# sourceMappingURL=proveedor.Service.js.map