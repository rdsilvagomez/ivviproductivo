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
var SolpedDisponible_Service_1 = require("../../Servicios/SolpedDisponible.Service");
require("rxjs/add/observable/of");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
require("rxjs/add/observable/of");
var listadoSolpedDisponibles = (function () {
    function listadoSolpedDisponibles(modalService, soldispServ) {
        this.modalService = modalService;
        this.soldispServ = soldispServ;
        this.onPosicionSeleccionada = new core_1.EventEmitter();
        this.page = 0;
        this.solpedFiltro = "";
        this.posicionFiltro = "";
    }
    listadoSolpedDisponibles.prototype.open = function (content) {
        var _this = this;
        this.modalService.open(content, { size: 'lg' }).result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
    };
    listadoSolpedDisponibles.prototype.filtrarPosiciones = function (Solped, Posicion) {
        this.solpedFiltro = Solped;
        this.posicionFiltro = Posicion;
        this.getSolpedDisponibles();
    };
    listadoSolpedDisponibles.prototype.seleccionarItem = function (item) {
        this.onPosicionSeleccionada.emit(item);
    };
    listadoSolpedDisponibles.prototype.getSolpedDisponibles = function () {
        var _this = this;
        this.soldispServ
            .getSolpedDisponibles(this.page, this.solpedFiltro, this.posicionFiltro)
            .subscribe(function (soldisponibles) { return _this.listado = soldisponibles; }, function () { return _this.stopRefreshing(); }, function () { return _this.stopRefreshing(); });
    };
    listadoSolpedDisponibles.prototype.stopRefreshing = function () {
        this.isRequesting = false;
    };
    listadoSolpedDisponibles.prototype.ngOnInit = function () { this.getSolpedDisponibles(); };
    listadoSolpedDisponibles.prototype.pageChanged = function (event) { this.getSolpedDisponibles(); };
    listadoSolpedDisponibles.prototype.getDismissReason = function (reason) {
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
    return listadoSolpedDisponibles;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], listadoSolpedDisponibles.prototype, "onPosicionSeleccionada", void 0);
listadoSolpedDisponibles = __decorate([
    core_1.Component({
        moduleId: module.id,
        encapsulation: core_1.ViewEncapsulation.None,
        selector: 'listadoDisponiblesmdl',
        templateUrl: '../../views/listadoSolpedDisponibles/listadoSolpedDisponibles.html'
    }),
    __metadata("design:paramtypes", [ng_bootstrap_1.NgbModal, SolpedDisponible_Service_1.SolpedDisponibleServicio])
], listadoSolpedDisponibles);
exports.listadoSolpedDisponibles = listadoSolpedDisponibles;
//# sourceMappingURL=listadoSolpedDisponibles.js.map