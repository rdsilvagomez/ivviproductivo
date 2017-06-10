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
var forms_1 = require("@angular/forms");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var solicitudcotizaciones_1 = require("../../clases/solicitudcotizaciones");
var SolicitudCot_Service_1 = require("../../Servicios/SolicitudCot.Service");
var solicitudCotizacion = (function () {
    function solicitudCotizacion(_fb, modalService, solCotSer) {
        var _this = this;
        this._fb = _fb;
        this.modalService = modalService;
        this.solCotSer = solCotSer;
        this.esError = 0;
        this.modalMensaje = "";
        this.total = 0;
        this.frmDetalleCotizaciones = this._fb.group({ listado: this._fb.array([]) });
        this.frmDetalleCotizaciones.valueChanges.subscribe(function (data) {
            _this.recalcular(data.listado);
        });
    }
    solicitudCotizacion.prototype.fileChange = function (event) {
        this.fileList = event.target.files;
    };
    solicitudCotizacion.prototype.recalcular = function (data) {
        var acumulado = 0;
        for (var i = 0; i < data.length; i++) {
            acumulado = acumulado + data[i].CANTIDAD_OFERTADA * data[i].PRECIOUNITARIO;
        }
        this.total = acumulado;
    };
    solicitudCotizacion.prototype.ngOnInit = function () {
        this.cargarEncabezado();
    };
    solicitudCotizacion.prototype.initSolicitudCotizacionRec = function (rec) {
        return this._fb.group({
            id: [rec.id],
            idSolicitudCotizacionCab: [rec.idSolicitudCotizacionCab],
            NUMERO_SOLPED: [rec.NUMERO_SOLPED],
            PREQ_ITEM: [rec.PREQ_ITEM],
            SHORT_TEXT: [rec.SHORT_TEXT],
            MATERIAL: [rec.MATERIAL],
            CANTIDAD: [rec.CANTIDAD],
            CANTIDAD_OFERTADA: [rec.CANTIDAD_OFERTADA],
            PRECIOUNITARIO: [rec.PRECIOUNITARIO]
        });
    };
    solicitudCotizacion.prototype.cargarEncabezado = function () {
        var _this = this;
        this.solCotSer.getSolicitudCotEncabezado().subscribe(function (res) { return _this.listadoEncabezado = res; }, function () { return _this.stopRefreshing(); }, function () { return _this.stopRefreshing(); });
    };
    solicitudCotizacion.prototype.cargarFormularioDetalle = function (listado) {
        var control = this.frmDetalleCotizaciones.controls['listado'];
        while (control.length) {
            control.removeAt(0);
        }
        this.listadoDetalle = listado;
        for (var i = 0; i < listado.data.length; i++) {
            control.push(this.initSolicitudCotizacionRec(listado.data[i]));
        }
    };
    solicitudCotizacion.prototype.cargarDetalle = function (detalleCotizacion, reg) {
        var _this = this;
        this.idSolicitudCotizacionCabSeleccionado = reg.id;
        this.solCotSer.getSolicitudCotDetalle(reg.id).subscribe(function (res) { return _this.cargarFormularioDetalle(res); }, function () { return _this.stopRefreshing(); }, function () { return _this.stopRefreshing(); });
        this.modalDetalleCotizacion = this.modalService.open(detalleCotizacion, { size: 'lg' });
    };
    solicitudCotizacion.prototype.calcularTotal = function () { return 10000; };
    solicitudCotizacion.prototype.recalcularTotal = function (event) {
        var acumulado = 0;
        for (var i = 0; i < this.listadoDetalle.data.length; i++) {
            acumulado = acumulado + this.listadoDetalle.data[i].CANTIDAD * this.listadoDetalle.data[i].PRECIOUNITARIO;
        }
        this.total = acumulado;
    };
    solicitudCotizacion.prototype.EnviarCotizacion = function (contentConfirmacion, FileCotizacion) {
        var _this = this;
        if (this.fileList.length > 0) {
            this.solCotSer.enviarCotizacionSapConArchivo(this.frmDetalleCotizaciones.value.listado, this.idSolicitudCotizacionCabSeleccionado, this.fileList[0])
                .subscribe(function (res) {
                _this.modalDetalleCotizacion.close();
                if (res.success == true) {
                    _this.esError = 0;
                    _this.modalMensaje = "Cotización Generada Correctamente";
                    _this.modalService.open(contentConfirmacion, { size: 'lg' });
                    _this.cargarEncabezado();
                }
                else {
                    _this.esError = 1;
                    _this.modalMensaje = res.message;
                    _this.modalService.open(contentConfirmacion, { size: 'lg' });
                }
            });
            return;
        }
        if (!this.frmDetalleCotizaciones.valid) {
            this.esError = 1;
            this.modalMensaje = "El formulario debe ser diligenciado correctamente";
            this.modalService.open(contentConfirmacion, { size: 'lg' });
            return;
        }
        this.solCotSer.enviarCotizacionSap(this.frmDetalleCotizaciones.value.listado, this.idSolicitudCotizacionCabSeleccionado)
            .subscribe(function (res) {
            _this.modalDetalleCotizacion.close();
            if (res.success == true) {
                _this.esError = 0;
                _this.modalMensaje = "Cotización Generada Correctamente";
                _this.modalService.open(contentConfirmacion, { size: 'lg' });
                _this.cargarEncabezado();
            }
            else {
                _this.esError = 1;
                _this.modalMensaje = res.message;
                _this.modalService.open(contentConfirmacion, { size: 'lg' });
            }
        }, function () { return _this.stopRefreshing(); }, function () { return _this.stopRefreshing(); });
    };
    solicitudCotizacion.prototype.stopRefreshing = function () {
        this.isRequesting = false;
    };
    return solicitudCotizacion;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", solicitudcotizaciones_1.listadoSolCotCab)
], solicitudCotizacion.prototype, "listadoEncabezado", void 0);
solicitudCotizacion = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'solicitudCotizacion',
        templateUrl: '../../views/solicitudCotizacion/solicitudCotizacion.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, ng_bootstrap_1.NgbModal, SolicitudCot_Service_1.SolicitudCotServicio])
], solicitudCotizacion);
exports.solicitudCotizacion = solicitudCotizacion;
//# sourceMappingURL=solicitudCotizacion.js.map