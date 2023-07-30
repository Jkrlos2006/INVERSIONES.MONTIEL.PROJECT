import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Egreso } from 'src/app/models/egreso';
import { Cliente } from 'src/app/models/cliente';
import { EgresoService } from 'src/app/service/egreso.service';
import { ClienteService } from 'src/app/service/cliente.service';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { deLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { VistaEgreso } from 'src/app/models/VistaEgreso';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/service/producto.service';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { TipoComprobante } from 'src/app/models/tipocomprobante';
import { TipoComprobanteService } from 'src/app/service/tipocomprobante';
import { FilterRequest } from 'src/app/models/filter-request.model';
import { ConstanteFiltroEgreso } from 'src/app/constantes/constante-filtro';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ExportExcelService } from 'src/app/service/export-excel.service';
import { FilterResponse } from 'src/app/models/filter-response.model';
/* defineLocale('en', deLocale); */

@Component({
  selector: 'app-lista',
  templateUrl: './listaegreso.component.html',
  styleUrls: ['./listaegreso.component.scss']
})

export class ListaegresoComponent implements OnInit {

  egresos:VistaEgreso[] = [];
  accion: string = "lista";
  egresoSeleccionado:VistaEgreso = new VistaEgreso();
  egresoRequest: Egreso = new Egreso();
  clientes: Cliente [] = [];
  productos: Producto [] = [];
  usuarios: Usuario [] = [];
  tipocomprobantes: TipoComprobante [] = [];
  bsValue = new Date();
  currentPage: number = 1

  filtroRequest: FilterRequest = new FilterRequest();
  myForm: FormGroup;
  myFormFiltro: FormGroup;
  totalRegistro: number = 0;

  constructor(
    private _egresoservice:EgresoService,
    private _clienteservice:ClienteService,
    private _productoservice:ProductoService,
    private _usuarioservice:UsuarioService,
    private _tipocomprobanteservice:TipoComprobanteService,
    /* private localeService: BsLocaleService, */
    private fb: FormBuilder,
    private _exportExcelService: ExportExcelService
   ) 
   {
    /* this.localeService.use("en"); */
    this.myForm = this.fb.group({
      salidaId:[{value:0,disable:true},[Validators.required]],
      clienteId:[null,[]],
      productoId:[null,[]],
      comprobanteId:[null,[]],
      numComprobante:[null,[]],
      fechaSalida:[{ value: null, disabled: true }, []],
      cantidad:[null,[]],
      usuarioId:[null,[]],
      
      });

   this.myFormFiltro = this.fb.group({
      TipoComprobante: ["", []],
      NumComprobante: ["", []],

    });

    this.filtroRequest.filtros.push({ nombre: ConstanteFiltroEgreso.TipoComprobante, valor: "" });
    this.filtroRequest.filtros.push({ nombre: ConstanteFiltroEgreso.NumComprobante, valor: "" });


   }

   ngOnInit(): void {
    this.getEgresosFiltro();
    this.getClientes();
    this.getProductos();
    this.getUsuarios();
    this.getTipoComprobantes();
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

  getClientes() {
    this._clienteservice.getAll().subscribe({
      next: (data: Cliente[]) => {
        this.clientes = data;
        console.log("this.clientes", this.clientes);
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

  getEgresosFiltro() {
    this._egresoservice.buscarPorFiltro(this.filtroRequest).subscribe(
      (data: FilterResponse<VistaEgreso>) => {
        this.egresos = data.lista;
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


  eliminar(obj: VistaEgreso) {
    this._egresoservice.delete(obj.salidaId).subscribe(
      (data: number) => {
        alert("Registro eliminado de forma satisfactoria");
        this.getEgresosFiltro();
      },
      err => {
        console.log(err);
      }
    );
  }


  btnCrear() {
    this.egresoSeleccionado = new VistaEgreso();
    this.asignarValoresAlFormulario();
    setTimeout(() => {
      this.accion = "registro";
    }, 150);

  }

  btnEditar(obj: VistaEgreso) {
    console.log(obj);
    this.egresoSeleccionado = obj;
    this.asignarValoresAlFormulario();
    setTimeout(() => {
      this.accion = "registro";
    }, 150);
  }

  asignarValoresAlFormulario() {
    this.myForm.patchValue(this.egresoSeleccionado);
  }

  crear(obj: Egreso) {
    this._egresoservice.create(obj).subscribe(
      (data: Egreso) => {
        alert("Registro Creado");
        this.getEgresosFiltro();
      }
    );
  }

  editar(obj: Egreso) {
    this._egresoservice.update(obj).subscribe(
      (data: Egreso) => {
        alert("Registro Actualizado");
        this.getEgresosFiltro();
      }
    );
  }

  btnGuardar() {

    let resultForm = this.myForm.getRawValue();
    this.egresoRequest = new Egreso();
    this.egresoRequest = this.myForm.getRawValue();
    this.egresoRequest.fechaSalida = this.date_to_string_complete(resultForm.fechaSalida);
    if (this.egresoRequest.salidaId == 0) {
      this.crear(this.egresoRequest); return;
    }
    else {
      this.editar(this.egresoRequest);
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
        case ConstanteFiltroEgreso.TipoComprobante: x.valor = filtro.TipoComprobante != null ? filtro.TipoComprobante : ""; break;
        case ConstanteFiltroEgreso.NumComprobante: x.valor = filtro.NumComprobante != null ? filtro.NumComprobante : ""; break;
      }
    });

    this.getEgresosFiltro();
  }

  pageChanged(event: PageChangedEvent): void {
    this.filtroRequest.numeroPagina = event.page;
    this.buscarFiltro();
  }

  exportarLista() {
    this.getAllEgreso();
  }

  getAllEgreso() {
    this._egresoservice.getAll().subscribe(
      (data: VistaEgreso[]) => {
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

  generarExcel(lista: VistaEgreso[]) {
    let exports: any = [];
    lista.forEach(x => {
      let nExt: any = {};
      // nExt.Id = x.clienteId;
      // nExt.Codigo = x.codigocliente;
      // nExt.RazonSocial = x.razonsocial;
      // nExt.Documento = x.documentoId;
      // nExt.RUC = x.tipoDocumento;
      // nExt.NroDocumento = x.numerodocumento;
      // nExt.Direccion = x.direccion;
      // nExt.Telefono = x.telefono;
      // nExt.email = x.email;


      nExt.salidaId= x.salidaId;
      nExt.comprobanteId = x.comprobanteId;
      nExt.tipoComprobante = x.tipoComprobante;
      nExt.numComprobante = x.numComprobante;
      nExt.fechaSalida = x.fechaSalida;
      nExt.cantidad = x.cantidad;
      nExt.clienteId = x.clienteId;
      nExt.cliente = x.cliente;
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