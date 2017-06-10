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
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var asociacion_1 = require("../../Servicios/asociacion");
var asociacion = (function () {
    function asociacion(modalService, solCotSer) {
        this.modalService = modalService;
        this.solCotSer = solCotSer;
    }
    asociacion.prototype.ngOnInit = function () {
        this.cargarEncabezado();
    };
    asociacion.prototype.cargarEncabezado = function () {
        var _this = this;
        this.solCotSer.getSolicitudCotEncabezado().subscribe(function (res) { return _this.listadoEncabezado = res; });
    };
    asociacion.prototype.cargarDetalle = function (reg, detalle) {
        var _this = this;
        this.solCotSer.getSolicitudCotdetalle(reg.id).subscribe(function (res) { return _this.listadoDetalle = res; });
        this.modaldetalle = this.modalService.open(detalle, { size: 'lg' });
    };
    asociacion.prototype.EnviarCotizacion = function (contentMensajeConfirmacion) {
        var _this = this;
        this.solCotSer.guardarAsociacion(this.listadoDetalle.data).subscribe(function (res) {
            _this.modaldetalle.close();
            if (res.success == true) {
                _this.esError = 0;
                _this.modalMensaje = "Cotización Generada Correctamente";
                _this.modalService.open(contentMensajeConfirmacion, { size: 'lg' });
                _this.cargarEncabezado();
            }
            else {
                _this.esError = 1;
                _this.modalMensaje = res.message;
                _this.modalService.open(contentMensajeConfirmacion, { size: 'lg' });
            }
        });
    };
    return asociacion;
}());
asociacion = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'asociacion',
        templateUrl: '../../views/asociacion/asociacion.html'
    }),
    __metadata("design:paramtypes", [ng_bootstrap_1.NgbModal, asociacion_1.asociacionServicio])
], asociacion);
exports.asociacion = asociacion;
//# sourceMappingURL=asociacion.js.map