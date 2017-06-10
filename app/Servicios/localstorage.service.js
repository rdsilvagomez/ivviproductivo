"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var LocalStorageService = (function () {
    function LocalStorageService() {
        this.missionAnnouncedSource = new Subject_1.Subject();
        this.logoutAnnoucedSource = new Subject_1.Subject();
        this.roleAnnouncedSource = new Subject_1.Subject();
        this.loginAnnounced$ = this.missionAnnouncedSource.asObservable();
        this.logoutAnnounced$ = this.logoutAnnoucedSource.asObservable();
        this.roleAnnounced$ = this.roleAnnouncedSource.asObservable();
    }
    LocalStorageService.prototype.announceLogin = function (mission) {
        this.missionAnnouncedSource.next(mission);
    };
    LocalStorageService.prototype.announceLogout = function () {
        this.logoutAnnoucedSource.next(null);
    };
    LocalStorageService.prototype.announceRole = function (Role) {
        this.roleAnnouncedSource.next(Role);
    };
    return LocalStorageService;
}());
LocalStorageService = __decorate([
    core_1.Injectable()
], LocalStorageService);
exports.LocalStorageService = LocalStorageService;
//# sourceMappingURL=localstorage.service.js.map