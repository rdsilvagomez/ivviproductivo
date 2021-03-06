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
var login_service_1 = require("../../Servicios/login.service");
var router_1 = require("@angular/router");
var localstorage_service_1 = require("../../Servicios/localstorage.service");
var login = (function () {
    function login(modalService, lgnSrv, router, loclSrv) {
        this.modalService = modalService;
        this.lgnSrv = lgnSrv;
        this.router = router;
        this.loclSrv = loclSrv;
    }
    login.prototype.login = function (usuario, pwd) {
        var _this = this;
        this.lgnSrv.getAutorizacionLogin(usuario, pwd).subscribe(function (res) {
            _this.res = res;
            if (_this.res.success === true) {
                localStorage.setItem('currentUser', usuario);
                localStorage.setItem('currentRol', _this.res.data.role);
                _this.loclSrv.announceRole(_this.res.data.role);
                _this.loclSrv.announceLogin(usuario);
                if (_this.res.data.role === "admin" || _this.res.data.role === "compras") {
                    _this.router.navigate(['habilitacion']);
                }
                else {
                    _this.router.navigate(['solcotizacion']);
                }
            }
        });
    };
    login.prototype.announcelogin = function (usuario) { };
    login.prototype.ngOnInit = function () {
        this.lgnSrv.logout();
    };
    return login;
}());
login = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'login',
        templateUrl: '../../views/login/login.html'
    }),
    __metadata("design:paramtypes", [ng_bootstrap_1.NgbModal, login_service_1.loginServicio, router_1.Router, localstorage_service_1.LocalStorageService])
], login);
exports.login = login;
//# sourceMappingURL=login.js.map