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
var proveedor_Service_1 = require("../../Servicios/proveedor.Service");
require("rxjs/add/observable/of");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
var listadoProveedores = (function () {
    function listadoProveedores(modalService, prvServicio) {
        this.modalService = modalService;
        this.prvServicio = prvServicio;
        this.codigoFiltro = "";
        this.descripcionFiltro = "";
        this.page = 0;
        this.showbuttons = 1;
        this.grupoid = "0";
        this.numeroSolped = "0";
        this.posicion = "0";
        this.asociar = 0;
        this.seleccion = 0;
        this.onProveedorSeleccionado = new core_1.EventEmitter();
    }
    listadoProveedores.prototype.ngOnInit = function () {
        if (this.grupoid == "0") {
            this.filtrarProveedoresxPosicion();
        }
        else {
            this.filtrarProveedor();
        }
    };
    listadoProveedores.prototype.filtrarProveedores = function (Codigo, descripcion) {
        this.codigoFiltro = Codigo;
        this.descripcionFiltro = descripcion;
        this.filtrarProveedor();
    };
    listadoProveedores.prototype.ingresarProveedor = function (descripcion) {
        console.log(descripcion);
    };
    listadoProveedores.prototype.filtrarProveedoresxPosicion = function () {
        var _this = this;
        this.prvServicio.filtrarProveedoresXposicion(this.page, this.codigoFiltro, this.seleccion, this.descripcionFiltro, this.numeroSolped, this.posicion, this.asociar).
            then(function (resultado) { return _this.listado = resultado; });
    };
    listadoProveedores.prototype.filtrarProveedor = function () {
        var _this = this;
        this.prvServicio.filtrarProveedores(this.page, this.codigoFiltro, this.descripcionFiltro, this.seleccion, this.grupoid).
            then(function (resultado) { return _this.listado = resultado; });
    };
    listadoProveedores.prototype.asociarproveedor = function (reg) {
        var _this = this;
        if (this.grupoid == "0") {
            this.prvServicio.asociarPosicion(reg.id, this.numeroSolped, this.posicion, this.asociar)
                .then(function () { return _this.onProveedorSeleccionado.emit(reg); });
        }
        else {
            this.prvServicio.asociarGrupo(reg.id, this.grupoid)
                .then(function () { return _this.onProveedorSeleccionado.emit(reg); });
        }
    };
    listadoProveedores.prototype.eliminarproveedor = function (reg) { };
    listadoProveedores.prototype.actualizarproveedor = function (reg) { };
    listadoProveedores.prototype.pageChanged = function (event) {
        if (this.grupoid == "0") {
            this.filtrarProveedoresxPosicion();
        }
        else {
            this.filtrarProveedor();
        }
    };
    return listadoProveedores;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], listadoProveedores.prototype, "showbuttons", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], listadoProveedores.prototype, "grupoid", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], listadoProveedores.prototype, "numeroSolped", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], listadoProveedores.prototype, "posicion", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], listadoProveedores.prototype, "asociar", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], listadoProveedores.prototype, "seleccion", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], listadoProveedores.prototype, "onProveedorSeleccionado", void 0);
listadoProveedores = __decorate([
    core_1.Component({
        selector: 'listadoProveedores',
        templateUrl: 'app/views/proveedores/proveedores.html'
    }),
    __metadata("design:paramtypes", [ng_bootstrap_1.NgbModal, proveedor_Service_1.ProveedorServicio])
], listadoProveedores);
exports.listadoProveedores = listadoProveedores;
//# sourceMappingURL=proveedor.js.map