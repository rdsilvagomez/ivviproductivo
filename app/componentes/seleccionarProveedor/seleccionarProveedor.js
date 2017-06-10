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
require("rxjs/add/observable/of");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
var proveedor_1 = require("../../componentes/proveedores/proveedor");
var seleccionarProveedorContent = (function () {
    function seleccionarProveedorContent(modalService) {
        this.modalService = modalService;
        this.solpedSeleccionada = "";
        this.posicionSeleccionada = "";
        this.asociar = 0;
    }
    seleccionarProveedorContent.prototype.ngOnInit = function () {
    };
    seleccionarProveedorContent.prototype.onProveedorSeleccionado = function (item) {
        this.ProveedoresSeleccionados.filtrarProveedoresxPosicion();
        this.ProveedoresNoSeleccionados.filtrarProveedoresxPosicion();
    };
    return seleccionarProveedorContent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], seleccionarProveedorContent.prototype, "solpedSeleccionada", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], seleccionarProveedorContent.prototype, "posicionSeleccionada", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], seleccionarProveedorContent.prototype, "asociar", void 0);
__decorate([
    core_1.ViewChild('ProveedoresSeleccionados'),
    __metadata("design:type", proveedor_1.listadoProveedores)
], seleccionarProveedorContent.prototype, "ProveedoresSeleccionados", void 0);
__decorate([
    core_1.ViewChild('ProveedoresNoSeleccionados'),
    __metadata("design:type", proveedor_1.listadoProveedores)
], seleccionarProveedorContent.prototype, "ProveedoresNoSeleccionados", void 0);
seleccionarProveedorContent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'seleccionarProveedorContent',
        templateUrl: '../../views/seleccionarProveedor/seleccionarProveedor.html',
    }),
    __metadata("design:paramtypes", [ng_bootstrap_1.NgbModal])
], seleccionarProveedorContent);
exports.seleccionarProveedorContent = seleccionarProveedorContent;
var seleccionarProveedor = (function () {
    function seleccionarProveedor(modalService) {
        this.modalService = modalService;
        this.solpedSeleccionada = "";
        this.posicionSeleccionada = "";
        this.asociar = 0;
    }
    seleccionarProveedor.prototype.ngOnInit = function () {
    };
    seleccionarProveedor.prototype.openProveedores = function () {
        var modalRef = this.modalService.open(seleccionarProveedorContent, { size: 'lg' });
        modalRef.componentInstance.solpedSeleccionada = this.solpedSeleccionada;
        modalRef.componentInstance.posicionSeleccionada = this.posicionSeleccionada;
        modalRef.componentInstance.asociar = this.asociar.toString();
    };
    return seleccionarProveedor;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], seleccionarProveedor.prototype, "solpedSeleccionada", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], seleccionarProveedor.prototype, "posicionSeleccionada", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], seleccionarProveedor.prototype, "asociar", void 0);
seleccionarProveedor = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'seleccionarProveedor',
        templateUrl: '../../views/seleccionarProveedor/seleccionarProveedorCab.html',
    }),
    __metadata("design:paramtypes", [ng_bootstrap_1.NgbModal])
], seleccionarProveedor);
exports.seleccionarProveedor = seleccionarProveedor;
//# sourceMappingURL=seleccionarProveedor.js.map