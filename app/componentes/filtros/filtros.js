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
var filtros_1 = require("../../clases/filtros");
var filtros_2 = require("../../Servicios/filtros");
var filtros = (function () {
    function filtros(srv) {
        this.srv = srv;
        this.reg = new filtros_1.filtro();
    }
    filtros.prototype.ngOnInit = function () {
        this.cargarValores();
    };
    filtros.prototype.cargarValores = function () {
        var _this = this;
        this.srv.getFiltro().subscribe(function (resultado) {
            if (resultado.data.length > 0) {
                _this.reg = resultado.data[0];
            }
        });
    };
    filtros.prototype.actualizarValores = function () {
        this.srv.actualizarFiltro(this.reg).subscribe(function (res) { return console.log(res); });
    };
    return filtros;
}());
filtros = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'filtros',
        templateUrl: '../../views/filtros/filtros.html'
    }),
    __metadata("design:paramtypes", [filtros_2.filtroServicio])
], filtros);
exports.filtros = filtros;
//# sourceMappingURL=filtros.js.map