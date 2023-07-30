import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ingreso } from 'src/app/models/ingreso';
import { IngresoService } from 'src/app/service/ingreso.service';
import { ProveedorService } from 'src/app/service/proveedor.service';
import { VistaIngreso } from 'src/app/models/VistaIngreso';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/service/producto.service';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { TipoComprobante } from 'src/app/models/tipocomprobante';
import { TipoComprobanteService } from 'src/app/service/tipocomprobante';
import { VistaProveedor } from 'src/app/models/VistaProveedor';
import { FilterRequest } from 'src/app/models/filter-request.model';
import { ExportExcelService } from 'src/app/service/export-excel.service';
import { ConstanteFiltroIngreso } from 'src/app/constantes/constante-filtro';
import { FilterResponse } from 'src/app/models/filter-response.model';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
/* defineLocale('en', deLocale); */

@Component({
  selector: 'app-lista',
  templateUrl: './listaingreso.component.html',
  styleUrls: ['./listaingreso.component.scss']
})

export class ListaingresoComponent implements OnInit {

  ingresos:VistaIngreso[] = [];
  accion: string = "lista";
  myForm: FormGroup;
  ingresoSeleccionado:VistaIngreso = new VistaIngreso();
  ingresoRequest: Ingreso = new Ingreso();
  proveedores: VistaProveedor [] = [];
  productos: Producto [] = [];
  usuarios: Usuario [] = [];
  tipocomprobantes: TipoComprobante [] = [];
  bsValue = new Date();
  currentPage: number = 1;

  filtroRequest: FilterRequest = new FilterRequest();
  myFormFiltro: FormGroup;
  totalRegistro: number = 0;

  constructor(
    private _ingresoservice:IngresoService,
    private _proveedorservice:ProveedorService,
    private _productoservice:ProductoService,
    private _usuarioservice:UsuarioService,
    private _tipocomprobanteservice:TipoComprobanteService,
    /* private localeService: BsLocaleService, */
    private fb: FormBuilder,
    private _exportExcelService: ExportExcelService
   ) {
    /* this.localeService.use("en"); */
    this.myForm = this.fb.group({
      ingresoId:[{value:0,disable:true},[Validators.required]],
      tipoComprobante:[null,[]],
      numComprobante:[null,[]],
      fechaRecepcion:[{ value: null, disabled: true }, []],
      cantidad:[null,[]],
      numLote:[null,[]],
      proveedorId:[null,[]],
      productoId:[null,[]],
      usuarioId:[null,[]],
      });

      this.myFormFiltro = this.fb.group({
        NumComprobante: ["", []],
        TipoComprobante1: ["", []],
  
      });

      this.filtroRequest.filtros.push({ nombre: ConstanteFiltroIngreso.NumComprobante, valor: "" });
      this.filtroRequest.filtros.push({ nombre: ConstanteFiltroIngreso.TipoComprobante1, valor: "" });
  
   }

   ngOnInit(): void {
  
    this.getProveedores();
    this.getProductos();
    this.getUsuarios();
    this.getTipoComprobantes();
    this.getIngresosFiltro();
  }

  getProductos() {
    this._productoservice.getAll().subscribe({
      next: (data: Producto[]) => {
        this.productos = data;
        console.log("this.productos", this.productos);
      },
      error: () => { },
      complete: () => { }
    });
  }

  getProveedores() {
    this._proveedorservice.getAll().subscribe({
      next: (data: VistaProveedor[]) => {
        this.proveedores = data;
        console.log("this.proveedores", this.proveedores);
      },
      error: () => { },
      complete: () => { }
    });
  }

  getUsuarios() {
    this._usuarioservice.getAll().subscribe({
      next: (data: Usuario[]) => {
        this.usuarios = data;
        console.log("this.usuarios", this.usuarios);
      },
      error: () => { },
      complete: () => { }
    });
  }
  getTipoComprobantes() {
    this._tipocomprobanteservice.getAll().subscribe({
      next: (data: TipoComprobante[]) => {
        this.tipocomprobantes = data;
        console.log("this.tipocomprobantes", this.tipocomprobantes);
      },
      error: () => { },
      complete: () => { }
    });
  }

  getIngresosFiltro() {
    this._ingresoservice.buscarPorFiltro(this.filtroRequest).subscribe(
      (data: FilterResponse<VistaIngreso>) => {
        this.ingresos = data.lista;
        this.totalRegistro = data.totalRegistro;
        console.log(data)
        this.despuesDeGuardar();
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('termino');
      }
    )
  }


  eliminar(obj: VistaIngreso) {
    this._ingresoservice.delete(obj.ingresoId).subscribe(
      (data: number) => {
        alert("Registro eliminado de forma satisfactoria");
        this.getIngresosFiltro();
      },
      err => {
        console.log(err);
      }
    );
  }


  btnCrear() {
    this.ingresoSeleccionado = new VistaIngreso();
    this.asignarValoresAlFormulario();
    setTimeout(() => {
      this.accion = "registro";
    }, 150);

  }

  btnEditar(obj: VistaIngreso) {
    console.log(obj);
    this.ingresoSeleccionado = obj;
    this.asignarValoresAlFormulario();
    setTimeout(() => {
      this.accion = "registro";
    }, 150);
  }

  asignarValoresAlFormulario() {
    this.myForm.patchValue(this.ingresoSeleccionado);
  }

  crear(obj: Ingreso) {
    this._ingresoservice.create(obj).subscribe(
      (data: Ingreso) => {
        alert("Registro Creado");
        this.getIngresosFiltro();
      }
    );
  }

  editar(obj: Ingreso) {
    this._ingresoservice.update(obj).subscribe(
      (data: Ingreso) => {
        alert("Registro Actualizado");
        this.getIngresosFiltro();
      }
    );
  }

  btnGuardar() {

    let resultForm = this.myForm.getRawValue();
    this.ingresoRequest = new Ingreso();
    this.ingresoRequest = this.myForm.getRawValue();
    this.ingresoRequest.fechaRecepcion = this.date_to_string_complete(resultForm.fechaRecepcion);
    if (this.ingresoRequest.ingresoId == 0) {
      this.crear(this.ingresoRequest); return;
    }
    else {
      this.editar(this.ingresoRequest);
    }

  }

  date_to_string_complete(date: Date) {
    let fecha: string = "";
    let anio = date.getFullYear();
    let mes = String(date.getMonth() + 1).padStart(2, '0');
    let dia = String(date.getDate()).padStart(2, '0');
    // let hora = String(date.getHours()).padStart(2, '0');
    // let minuto = String(date.getMinutes()).padStart(2, '0');
    // let second = "00";
    // fecha = `${anio}-${mes}-${dia}T${hora}:${minuto}:00`
    fecha = `${anio}-${mes}-${dia}T00:00:00`
    return fecha;
  }


  despuesDeGuardar() {
    this.accion = "lista";
  }
  LimpiarFiltro() {
    this.filtroRequest = new FilterRequest();
    this.myFormFiltro.reset();
    this.buscarFiltro();
  }

  buscarFiltro() {
    let filtro = this.myFormFiltro.getRawValue();

    this.filtroRequest.filtros.forEach(x => {
      switch (x.nombre) {
        case ConstanteFiltroIngreso.NumComprobante: x.valor = filtro.NumComprobante != null ? filtro.NumComprobante : ""; break;
        case ConstanteFiltroIngreso.TipoComprobante1: x.valor = filtro.TipoComprobante1 != null ? filtro.TipoComprobante1 : ""; break;
      }
    });

    this.getIngresosFiltro();


  }


  pageChanged(event: PageChangedEvent): void {
    this.filtroRequest.numeroPagina = event.page;
    this.buscarFiltro();
  }


  exportarLista() {
    this.getAllIngresos();
  }

  getAllIngresos() {
    this._ingresoservice.getAll().subscribe(
      (data: VistaIngreso[]) => {
        this.generarExcel(data);
      },
      err => {
        console.log(err);
      },
      () => {
        console.log("termino");

      }
    );
  }

  generarExcel(lista: VistaIngreso[]) {
    let exports: any = [];
    lista.forEach(x => {
      let nExt: any = {};

      nExt.ingresoId = x.ingresoId;
      nExt.tipoComprobante = x.tipoComprobante;
      nExt.tipoComprobante1 = x.tipoComprobante1;
      nExt.numComprobante = x.numComprobante;
      nExt.fechaRecepcion = x.fechaRecepcion;
      nExt.cantidad  = x.cantidad;
      nExt.numLote = x.numLote;
      nExt.proveedorId = x.productoId;
      nExt.proveedor = x.producto;
      nExt.productoId = x.productoId;
      nExt.producto = x.producto;
      nExt.usuarioId = x.usuarioId; 
      nExt.usuario = x.usuario;
      exports.push(nExt);
      exports.push(nExt);
      exports.push(nExt);
      exports.push(nExt);
      exports.push(nExt);
      exports.push(nExt);
      exports.push(nExt);
      exports.push(nExt);
      exports.push(nExt);
      exports.push(nExt);
      exports.push(nExt);
      exports.push(nExt);
    });
    this._exportExcelService.exportJsonToExcel(exports, "LIsta Cliente");
  }

}