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
var core_2 = require("@angular/core");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var Grupo_Service_1 = require("../../Servicios/Grupo.Service");
var proveedor_1 = require("../../componentes/proveedores/proveedor");
require("rxjs/add/observable/of");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
var listadoGrupos = (function () {
    function listadoGrupos(modalService, grpServicio) {
        this.modalService = modalService;
        this.grpServicio = grpServicio;
        this.codigoFiltro = "";
        this.descripcionFiltro = "";
        this.page = 1;
        this.showbuttons = 1;
        this.solped = "";
        this.posicion = "";
        this.filtrarXgrupo = 2;
        this.onGrupoSeleccionado = new core_2.EventEmitter();
        this.GrupoIdSeleccionado = "0";
    }
    listadoGrupos.prototype.ngOnInit = function () {
        this.filtrarGrupoServicio();
    };
    listadoGrupos.prototype.filtrarGrupoServicio = function () {
        var _this = this;
        this.isRequesting = true;
        this.grpServicio.filtrarGrupos(this.page, this.codigoFiltro, this.descripcionFiltro, this.filtrarXgrupo, this.solped, this.posicion).
            subscribe(function (resultado) { return _this.listado = resultado; }, function () { return _this.stopRefreshing(); }, function () { return _this.stopRefreshing(); });
    };
    listadoGrupos.prototype.stopRefreshing = function () {
        this.isRequesting = false;
    };
    listadoGrupos.prototype.filtrarGrupoSol = function () {
    };
    listadoGrupos.prototype.filtrarGrupos = function (codigo, descripcion) {
        this.codigoFiltro = codigo;
        this.descripcionFiltro = descripcion;
        this.filtrarGrupoServicio();
    };
    listadoGrupos.prototype.seleccionarGrupo = function (reg) {
        var _this = this;
        this.grpServicio.seleccionarGrupo(this.solped, this.posicion, reg.id).then(function () { return _this.onGrupoSeleccionado.emit(reg); });
    };
    listadoGrupos.prototype.ingresarGrupo = function (descripcion) {
        var _this = this;
        this.grpServicio.ingresarGrupo(descripcion).then(function () { return _this.filtrarGrupos("", ""); });
    };
    listadoGrupos.prototype.eliminarGrupo = function (reg) {
        var _this = this;
        this.grpServicio.eliminarGrupo(reg).then(function () { return _this.filtrarGrupos("", ""); });
    };
    listadoGrupos.prototype.actualizarGrupo = function (reg) {
        var _this = this;
        this.grpServicio.actualizarGrupo(reg).then(function () { return _this.filtrarGrupos("", ""); });
    };
    listadoGrupos.prototype.asociarProveedores = function (contentProveedores, reg) {
        var _this = this;
        this.GrupoIdSeleccionado = reg.id;
        this.modalService.open(contentProveedores, { size: 'lg' }).result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
    };
    listadoGrupos.prototype.pageChanged = function (event) {
        this.filtrarGrupos(this.codigoFiltro, this.descripcionFiltro);
    };
    listadoGrupos.prototype.onProveedorSeleccionado = function (proveedor) {
        this.ProveedoresSeleccionados.filtrarProveedor();
        this.ProveedoresNoSeleccionados.filtrarProveedor();
    };
    listadoGrupos.prototype.getDismissReason = function (reason) {
        if (reason === ng_bootstrap_1.ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        }
        else if (reason === ng_bootstrap_1.ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        }
        else {
            return "with: " + reason;
        }
    };
    return listadoGrupos;
}());
__decorate([
    core_1.ViewChild('ProveedoresSeleccionados'),
    __metadata("design:type", proveedor_1.listadoProveedores)
], listadoGrupos.prototype, "ProveedoresSeleccionados", void 0);
__decorate([
    core_1.ViewChild('ProveedoresNoSeleccionados'),
    __metadata("design:type", proveedor_1.listadoProveedores)
], listadoGrupos.prototype, "ProveedoresNoSeleccionados", void 0);
__decorate([
    core_2.Input(),
    __metadata("design:type", Number)
], listadoGrupos.prototype, "showbuttons", void 0);
__decorate([
    core_2.Input(),
    __metadata("design:type", String)
], listadoGrupos.prototype, "solped", void 0);
__decorate([
    core_2.Input(),
    __metadata("design:type", String)
], listadoGrupos.prototype, "posicion", void 0);
__decorate([
    core_2.Input(),
    __metadata("design:type", Number)
], listadoGrupos.prototype, "filtrarXgrupo", void 0);
__decorate([
    core_2.Output(),
    __metadata("design:type", Object)
], listadoGrupos.prototype, "onGrupoSeleccionado", void 0);
listadoGrupos = __decorate([
    core_2.Component({
        moduleId: module.id,
        selector: 'listadoGrupos',
        templateUrl: '../../views/grupos/grupos.html'
    }),
    __metadata("design:paramtypes", [ng_bootstrap_1.NgbModal, Grupo_Service_1.GrupoServicio])
], listadoGrupos);
exports.listadoGrupos = listadoGrupos;
//# sourceMappingURL=grupos.js.map