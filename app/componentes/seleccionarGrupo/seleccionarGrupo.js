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
var grupos_1 = require("../../componentes/grupos/grupos");
var seleccionarGrupoContent = (function () {
    function seleccionarGrupoContent() {
        this.solpedSeleccionada = "";
        this.posicionSeleccionada = "";
    }
    seleccionarGrupoContent.prototype.ngOnInit = function () {
    };
    seleccionarGrupoContent.prototype.onGrupoSeleccionado = function (item) {
        this.GruposSeleccionados.filtrarGrupos("", "");
        this.GruposNoSeleccionados.filtrarGrupos("", "");
    };
    return seleccionarGrupoContent;
}());
__decorate([
    core_1.ViewChild('GruposSeleccionados'),
    __metadata("design:type", grupos_1.listadoGrupos)
], seleccionarGrupoContent.prototype, "GruposSeleccionados", void 0);
__decorate([
    core_1.ViewChild('GruposNoSeleccionados'),
    __metadata("design:type", grupos_1.listadoGrupos)
], seleccionarGrupoContent.prototype, "GruposNoSeleccionados", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], seleccionarGrupoContent.prototype, "solpedSeleccionada", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], seleccionarGrupoContent.prototype, "posicionSeleccionada", void 0);
seleccionarGrupoContent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'seleccionarGrupoContent',
        templateUrl: '../../views/seleccionarGrupo/seleccionarGrupo.html',
    })
], seleccionarGrupoContent);
exports.seleccionarGrupoContent = seleccionarGrupoContent;
var seleccionarGrupo = (function () {
    function seleccionarGrupo(modalService) {
        this.modalService = modalService;
        this.solpedSeleccionada = "";
        this.posicionSeleccionada = "";
    }
    seleccionarGrupo.prototype.ngOnInit = function () {
    };
    seleccionarGrupo.prototype.openGrupos = function () {
        var modalRef = this.modalService.open(seleccionarGrupoContent, { size: 'lg' });
        modalRef.componentInstance.solpedSeleccionada = this.solpedSeleccionada;
        modalRef.componentInstance.posicionSeleccionada = this.posicionSeleccionada;
    };
    return seleccionarGrupo;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], seleccionarGrupo.prototype, "solpedSeleccionada", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], seleccionarGrupo.prototype, "posicionSeleccionada", void 0);
seleccionarGrupo = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'seleccionarGrupo',
        template: '  <button type="button" class="btn btn-success btn-sm"  (click)="openGrupos()"><i class="fa fa-link"  ></i>Asociar Grupo</button>',
    }),
    __metadata("design:paramtypes", [ng_bootstrap_1.NgbModal])
], seleccionarGrupo);
exports.seleccionarGrupo = seleccionarGrupo;
//# sourceMappingURL=seleccionarGrupo.js.map