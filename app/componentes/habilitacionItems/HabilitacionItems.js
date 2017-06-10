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
var forms_1 = require("@angular/forms");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var SolpedDisponible_1 = require("../../clases/SolpedDisponible");
var SolpedDisponible_Service_1 = require("../../Servicios/SolpedDisponible.Service");
var localstorage_service_1 = require("../../Servicios/localstorage.service");
var grupos_1 = require("../../componentes/grupos/grupos");
var proveedor_1 = require("../../componentes/proveedores/proveedor");
require("rxjs/add/operator/map");
var router_1 = require("@angular/router");
var habilitacionItems = (function () {
    function habilitacionItems(router, _fb, lgSrvc, modalService, soldispServ, fb) {
        this.router = router;
        this._fb = _fb;
        this.lgSrvc = lgSrvc;
        this.modalService = modalService;
        this.soldispServ = soldispServ;
        this.listado = [];
        this.listadoEnvio = [];
        this.listadoSolpedManual = [];
        this.solpedSeleccionada = "";
        this.posicionSeleccionada = "";
        this.modalMensaje = "";
        this.esError = 0;
        this.SeqPosicionesMantenimiento = "0";
        lgSrvc.announceLogin(localStorage.getItem('currentUser'));
    }
    habilitacionItems.prototype.ngOnInit = function () {
        if (localStorage.getItem('currentRol') === "proveedor") {
            this.router.navigate(['solcotizacion']);
        }
        this.frmSolpedisponibles = this._fb.group({ listadoDisponibles: this._fb.array([]) });
        this.frmSolpedManual = this._fb.group({ listadoSopedManual: this._fb.array([]) });
    };
    habilitacionItems.prototype.initSolpedManualRec = function (rec) {
        return this._fb.group({
            SHORT_TEXT: [rec.SHORT_TEXT],
            MATERIAL: [rec.MATERIAL],
            CANTIDAD: [rec.CANTIDAD, forms_1.Validators.required]
        });
    };
    habilitacionItems.prototype.initSolpedDisponibleRec = function (rec) {
        return this._fb.group({
            ID: [rec.ID],
            NUMERO_SOLPED: [rec.NUMERO_SOLPED],
            PREQ_ITEM: [rec.PREQ_ITEM],
            DOC_TYPE: [rec.DOC_TYPE],
            CREATED_BY: [rec.CREATED_BY],
            CH_ON: [rec.CH_ON],
            PREQ_NAME: [rec.PREQ_NAME],
            SHORT_TEXT: [rec.SHORT_TEXT],
            MATERIAL: [rec.MATERIAL],
            MATERIAL_EXTERNAL: [rec.MATERIAL_EXTERNAL],
            CANTIDAD: [rec.CANTIDAD, forms_1.Validators.required],
            UNIT: [rec.UNIT]
        });
    };
    habilitacionItems.prototype.removerSolpedisponible = function (n) {
        var control = this.frmSolpedisponibles.controls['listadoDisponibles'];
        control.removeAt(n);
    };
    habilitacionItems.prototype.removerSolpedManual = function (n) {
        var control = this.frmSolpedManual.controls['listadoSopedManual'];
        control.removeAt(n);
    };
    habilitacionItems.prototype.addItem = function (item) {
        var control = this.frmSolpedisponibles.controls['listadoDisponibles'];
        this.solpedSeleccionada = item.NUMERO_SOLPED;
        this.posicionSeleccionada = item.PREQ_ITEM;
        var arr_seleccionado = this.frmSolpedisponibles.value.listadoDisponibles;
        for (var i = 0; i < arr_seleccionado.length; i++) {
            if (arr_seleccionado[i].NUMERO_SOLPED === item.NUMERO_SOLPED && arr_seleccionado[i].PREQ_ITEM === item.PREQ_ITEM) {
                return;
            }
        }
        control.push(this.initSolpedDisponibleRec(item));
    };
    habilitacionItems.prototype.adicionarItemManual = function () {
        var item;
        item = new SolpedDisponible_1.SolpedDisponible();
        var control = this.frmSolpedManual.controls['listadoSopedManual'];
        control.push(this.initSolpedManualRec(item));
    };
    habilitacionItems.prototype.openProveedores = function (contentProveedores, solped, posicion) {
        var _this = this;
        this.solpedSeleccionada = solped;
        this.posicionSeleccionada = posicion;
        this.modalService.open(contentProveedores, { size: 'lg' }).result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
    };
    habilitacionItems.prototype.openGrupos = function (contentGroup, solped, posicion) {
        var _this = this;
        this.solpedSeleccionada = solped;
        this.posicionSeleccionada = posicion;
        this.modalService.open(contentGroup, { size: 'lg' }).result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
    };
    habilitacionItems.prototype.onProveedorSeleccionado = function (item) {
        this.ProveedoresSeleccionados.filtrarProveedoresxPosicion();
        this.ProveedoresNoSeleccionados.filtrarProveedoresxPosicion();
    };
    habilitacionItems.prototype.onGrupoSeleccionado = function (item) {
        this.GruposSeleccionados.filtrarGrupos("", "");
        this.GruposNoSeleccionados.filtrarGrupos("", "");
    };
    habilitacionItems.prototype.onPosicionSeleccionada = function (item) {
        this.removeritem(item);
        this.listado.push(item);
        this.addItem(item);
    };
    habilitacionItems.prototype.removeritemManual = function (item) {
        var index = this.listadoSolpedManual.indexOf(item);
        if (index != -1) {
            this.listadoSolpedManual.splice(index, 1);
        }
    };
    habilitacionItems.prototype.removeritem = function (item) {
        var index = this.listado.indexOf(item);
        if (index != -1) {
            this.listado.splice(index, 1);
        }
    };
    habilitacionItems.prototype.EnviarCotizacionManual = function (contentConfirmacion) {
        var _this = this;
        if (!this.frmSolpedManual.valid) {
            this.esError = 1;
            this.modalMensaje = "El formulario debe ser diligenciado correctamente";
            this.modalService.open(contentConfirmacion, { size: 'lg' });
            return;
        }
        if (this.frmSolpedManual.value.listadoSopedManual.length == 0) {
            this.esError = 1;
            this.modalMensaje = "Debe seleccionar al menos un item para cotizar";
            this.modalService.open(contentConfirmacion, { size: 'lg' });
            return;
        }
        this.soldispServ.SolicitarCotizacion(this.frmSolpedManual.value.listadoSopedManual, "", 1)
            .subscribe(function (res) {
            if (res.success == true) {
                _this.esError = 0;
                _this.listadoSolpedManual = [];
                _this.modalHabilitacionPedidoManual.close();
                _this.modalMensaje = "Solped Habilitadas para Cotizar";
                _this.modalService.open(contentConfirmacion, { size: 'lg' });
                _this.SeqPosicionesMantenimiento = "0";
                var control = _this.frmSolpedManual.controls['listadoSopedManual'];
                while (control.length) {
                    control.removeAt(0);
                }
            }
            else {
                _this.esError = 1;
                _this.modalMensaje = res.message;
                _this.modalService.open(contentConfirmacion, { size: 'lg' });
            }
        }, function (err) {
            _this.modalMensaje = err;
            _this.esError = 1;
            _this.modalService.open(contentConfirmacion, { size: 'lg' });
        });
    };
    habilitacionItems.prototype.solicitarCotizacion = function (contentConfirmacion, informacion) {
        var _this = this;
        if (this.frmSolpedisponibles.value.listadoDisponibles.length == 0) {
            this.esError = 1;
            this.modalMensaje = "Debe seleccionar al menos una posición para cotizar";
            this.modalService.open(contentConfirmacion, { size: 'lg' });
            this.modalHabilitacionPedido.close();
            return;
        }
        this.soldispServ.SolicitarCotizacion(this.frmSolpedisponibles.value.listadoDisponibles, informacion, 0)
            .subscribe(function (res) {
            if (res.success == true) {
                _this.esError = 0;
                _this.listado = [];
                _this.modalHabilitacionPedido.close();
                _this.modalMensaje = "Solped Habilitadas para Cotizar";
                _this.modalService.open(contentConfirmacion, { size: 'lg' });
                var control = _this.frmSolpedisponibles.controls['listadoDisponibles'];
                while (control.length) {
                    control.removeAt(0);
                }
            }
            else {
                _this.esError = 1;
                _this.modalService.open(contentConfirmacion, { size: 'lg' });
            }
        }, function (err) {
            _this.modalMensaje = err;
            _this.esError = 1;
            _this.modalService.open(contentConfirmacion, { size: 'lg' });
        });
    };
    habilitacionItems.prototype.save = function (model, isValid) {
    };
    habilitacionItems.prototype.stopRefreshing = function () {
        this.isRequesting = false;
    };
    habilitacionItems.prototype.CargarCotizacionManual = function (contentSolpedManual) {
        var _this = this;
        if (this.SeqPosicionesMantenimiento === "0") {
            this.soldispServ.getSequenciaManual()
                .subscribe(function (res) {
                _this.SeqPosicionesMantenimiento = res.data[0].SequenciaManual;
            });
        }
        this.modalHabilitacionPedidoManual = this.modalService.open(contentSolpedManual, { size: 'lg' });
    };
    habilitacionItems.prototype.guardarListado = function (contentConfirmacion, contentEnviarRegistros) {
        if (!this.frmSolpedisponibles.valid) {
            this.esError = 1;
            this.modalMensaje = "El formulario debe ser diligenciado correctamente";
            this.modalService.open(contentConfirmacion, { size: 'lg' });
            return;
        }
        this.modalHabilitacionPedido = this.modalService.open(contentEnviarRegistros, { size: 'lg' });
    };
    habilitacionItems.prototype.sincronizarPosiciones = function (contentConfirmacion) {
        var _this = this;
        this.isRequesting = true;
        this.soldispServ.SincronizarPosiciones()
            .subscribe(function (res) {
            if (res.success == true) {
                _this.esError = 0;
                _this.modalMensaje = "Solped y Posiciones cargadas correctamente.";
                _this.modalService.open(contentConfirmacion, { size: 'lg' });
            }
            else {
                _this.esError = 1;
                _this.modalMensaje = res.message;
                _this.modalService.open(contentConfirmacion, { size: 'lg' });
            }
            _this.stopRefreshing();
        }, function (err) {
            _this.esError = 1;
            _this.modalMensaje = err;
            _this.modalService.open(contentConfirmacion, { size: 'lg' });
            _this.stopRefreshing();
        });
    };
    habilitacionItems.prototype.getDismissReason = function (reason) {
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
    return habilitacionItems;
}());
__decorate([
    core_1.ViewChild('GruposSeleccionados'),
    __metadata("design:type", grupos_1.listadoGrupos)
], habilitacionItems.prototype, "GruposSeleccionados", void 0);
__decorate([
    core_1.ViewChild('GruposNoSeleccionados'),
    __metadata("design:type", grupos_1.listadoGrupos)
], habilitacionItems.prototype, "GruposNoSeleccionados", void 0);
__decorate([
    core_1.ViewChild('ProveedoresSeleccionados'),
    __metadata("design:type", proveedor_1.listadoProveedores)
], habilitacionItems.prototype, "ProveedoresSeleccionados", void 0);
__decorate([
    core_1.ViewChild('ProveedoresNoSeleccionados'),
    __metadata("design:type", proveedor_1.listadoProveedores)
], habilitacionItems.prototype, "ProveedoresNoSeleccionados", void 0);
habilitacionItems = __decorate([
    core_2.Component({
        moduleId: module.id,
        selector: 'habilitacionItems',
        templateUrl: '../../views/habilitacionItems/HabilitacionItem.html'
    }),
    __metadata("design:paramtypes", [router_1.Router, forms_1.FormBuilder, localstorage_service_1.LocalStorageService, ng_bootstrap_1.NgbModal, SolpedDisponible_Service_1.SolpedDisponibleServicio, forms_1.FormBuilder])
], habilitacionItems);
exports.habilitacionItems = habilitacionItems;
//# sourceMappingURL=HabilitacionItems.js.map