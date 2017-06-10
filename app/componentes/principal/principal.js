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
require("rxjs/add/observable/of");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
var router_1 = require("@angular/router");
var principal = (function () {
    function principal(router) {
        this.router = router;
    }
    principal.prototype.ngOnInit = function () {
        /*if (   localStorage.getItem('currentRol')==="proveedor")
            {
            this.router.navigate(['solcotizacion'] );
            }*/
    };
    return principal;
}());
principal = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'principal',
        template: '<h1>wéfk´wekf´pwekf´wekf´wekf´wekp</h1>',
    }),
    __metadata("design:paramtypes", [router_1.Router])
], principal);
exports.principal = principal;
//# sourceMappingURL=principal.js.map