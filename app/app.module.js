"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var app_component_1 = require("./app.component");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var seleccionarGrupo_1 = require("./componentes/seleccionarGrupo/seleccionarGrupo");
var seleccionarGrupo_2 = require("./componentes/seleccionarGrupo/seleccionarGrupo");
var HabilitacionItems_1 = require("./componentes/habilitacionItems/HabilitacionItems");
var listadoSolpedDisponibles_1 = require("./componentes/listadoSolpedDisponibles/listadoSolpedDisponibles");
var SolpedDisponible_Service_1 = require("./Servicios/SolpedDisponible.Service");
var Grupo_Service_1 = require("./Servicios/Grupo.Service");
var grupos_1 = require("./componentes/grupos/grupos");
var proveedor_Service_1 = require("./Servicios/proveedor.Service");
var proveedor_1 = require("./componentes/proveedores/proveedor");
var solicitudCotizacion_1 = require("./componentes/solicitudCotizacion/solicitudCotizacion");
var SolicitudCot_Service_1 = require("./Servicios/SolicitudCot.Service");
var SpinnerComponent_1 = require("./componentes/spinner/SpinnerComponent");
var login_1 = require("./componentes/login/login");
var login_service_1 = require("./Servicios/login.service");
var auth_guard_1 = require("./_guards/auth.guard");
var forms_1 = require("@angular/forms");
var localstorage_service_1 = require("./Servicios/localstorage.service");
var asociacion_1 = require("./Servicios/asociacion");
var asociacion_2 = require("./componentes/asociacion/asociacion");
var seleccionarProveedor_1 = require("./componentes/seleccionarProveedor/seleccionarProveedor");
var seleccionarProveedor_2 = require("./componentes/seleccionarProveedor/seleccionarProveedor");
var principal_1 = require("./componentes/principal/principal");
var util_1 = require("./Servicios/util");
var filtros_1 = require("./componentes/filtros/filtros");
var filtros_2 = require("./Servicios/filtros");
var routes = [{ path: 'habilitacion', component: HabilitacionItems_1.habilitacionItems, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'filtros', component: filtros_1.filtros, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'asociacion', component: asociacion_2.asociacion, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'grupos', component: grupos_1.listadoGrupos, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'proveedores', component: proveedor_1.listadoProveedores, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'solcotizacion', component: solicitudCotizacion_1.solicitudCotizacion, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'login', component: login_1.login },
    /* { path: 'principal'        , component:principal           , canActivate: [AuthGuard]   },*/
    { path: '**', redirectTo: 'habilitacion' }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes), http_1.HttpModule, ng_bootstrap_1.NgbModule.forRoot(), platform_browser_1.BrowserModule, forms_1.FormsModule, forms_1.ReactiveFormsModule /*,CustomFormsModule */],
        declarations: [app_component_1.AppComponent, HabilitacionItems_1.habilitacionItems, listadoSolpedDisponibles_1.listadoSolpedDisponibles, grupos_1.listadoGrupos, proveedor_1.listadoProveedores, solicitudCotizacion_1.solicitudCotizacion, login_1.login, SpinnerComponent_1.SpinnerComponent, seleccionarGrupo_2.seleccionarGrupoContent, seleccionarGrupo_1.seleccionarGrupo, asociacion_2.asociacion, seleccionarProveedor_2.seleccionarProveedorContent, seleccionarProveedor_1.seleccionarProveedor, principal_1.principal, filtros_1.filtros],
        entryComponents: [seleccionarGrupo_2.seleccionarGrupoContent, seleccionarProveedor_2.seleccionarProveedorContent, seleccionarProveedor_1.seleccionarProveedor],
        bootstrap: [app_component_1.AppComponent],
        providers: [SolpedDisponible_Service_1.SolpedDisponibleServicio, Grupo_Service_1.GrupoServicio, proveedor_Service_1.ProveedorServicio, SolicitudCot_Service_1.SolicitudCotServicio, login_service_1.loginServicio, auth_guard_1.AuthGuard, localstorage_service_1.LocalStorageService, asociacion_1.asociacionServicio, util_1.utilService, filtros_2.filtroServicio]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map