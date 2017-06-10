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
var router_1 = require("@angular/router");
var localstorage_service_1 = require("./Servicios/localstorage.service");
var AppComponent = (function () {
    function AppComponent(localStorageService, router) {
        var _this = this;
        this.localStorageService = localStorageService;
        this.router = router;
        this.name = 'Angular';
        this.subscription = localStorageService.loginAnnounced$.subscribe(function (currentUser) {
            _this.currentUser = currentUser;
        });
        this.roleSubscription = localStorageService.roleAnnounced$.subscribe(function (currentRole) {
            _this.currentRole = currentRole;
        });
        this.subscription = localStorageService.logoutAnnounced$.subscribe(function (empty) {
            _this.currentUser = null;
        });
    }
    AppComponent.prototype.ngOnInit = function () {
        this.logout();
    };
    AppComponent.prototype.logout = function () {
        this.localStorageService.announceLogout();
        this.router.navigate(['/login'], {});
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-app',
        templateUrl: 'views/navbar.html'
    }),
    __metadata("design:paramtypes", [localstorage_service_1.LocalStorageService, router_1.Router])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map