import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VistaProveedor } from 'src/app/models/VistaProveedor';
import { Proveedor } from 'src/app/models/proveedor';
import { Tipodocumento } from 'src/app/models/tipodocumento';
import { ProveedorService } from 'src/app/service/proveedor.service';
import { TipoDocumentoService } from 'src/app/service/tipodocumento.service';
import { FilterRequest } from 'src/app/models/filter-request.model';
import { FilterResponse } from 'src/app/models/filter-response.model';
import { ConstanteFiltroProveedor } from 'src/app/constantes/constante-filtro';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ExportExcelService } from 'src/app/service/export-excel.service';

@Component({
  selector: 'app-listaproveedor',
  templateUrl: './listaproveedor.component.html',
  styleUrls: ['./listaproveedor.component.scss']

})

export class ListaproveedorComponent {


  proveedors: VistaProveedor[] = [];
  accion: string = "lista";
  proveedorSeleccionado: VistaProveedor = new VistaProveedor();
  proveedorRequest: Proveedor = new Proveedor();
  tipodocumentos: Tipodocumento[] = [];
  currentPage: number = 1;


  filtroRequest: FilterRequest = new FilterRequest();
  myForm: FormGroup;
  myFormFiltro: FormGroup;
  totalRegistro: number = 0;



  constructor(
    private _proveedorService: ProveedorService,
    private _tipodocumentoService: TipoDocumentoService,
    private fb: FormBuilder,
    private _exportExcelService: ExportExcelService
  ) {
    this.myForm = this.fb.group({
      proveedorId: [{ value: 0, disabled: true }, [Validators.required]],
      nombre: [null, []],
      tipoDocumento: [null, []],
      numeroDocumento: [null, []],
      direccion: [null, []],
      telefono: [null, []],
      email: [null, []],
    });


    this.myFormFiltro = this.fb.group({
      Email: ["", []],
      Nombre: ["", []],

    });

    this.filtroRequest.filtros.push({ nombre: ConstanteFiltroProveedor.Email, valor: "" });
    this.filtroRequest.filtros.push({ nombre: ConstanteFiltroProveedor.Nombre, valor: "" });

  }

  ngOnInit(): void {
    this.getProveedorsFiltro();
    this.getTipoDocumentos();
  }

  getTipoDocumentos() {
    this._tipodocumentoService.getAll().subscribe({
      next: (data: Tipodocumento[]) => {
        this.tipodocumentos = data;
        console.log("this.tipodocumentos", this.tipodocumentos);
      },
      error: () => { },
      complete: () => { }
    });
  }

  getProveedorsFiltro() {
    this._proveedorService.buscarPorFiltro(this.filtroRequest).subscribe(
      (data: FilterResponse<VistaProveedor>) => {
        this.proveedors = data.lista;
        this.totalRegistro = data.totalRegistro;
        console.log(data);
        this.despuesDeGuardar();
      },
      err => {
        console.log(err);
      },
      () => {
        console.log("termino");

      }
    );
  }

  eliminar(obj: VistaProveedor) {
    this._proveedorService.delete(obj.proveedorId).subscribe(
      (data: number) => {
        alert("registro eliminado de forma satisfactoria");
        this.getProveedorsFiltro();
      },
      err => {
        console.log(err);

      }
    );
  }

  btnCrear() {
    this.proveedorSeleccionado = new VistaProveedor();
    this.asignarValoresAlFormulario();
    setTimeout(() => {
      this.accion = "registro";
    }, 100);
  }

  btnEditar(obj: VistaProveedor) {
    this.proveedorSeleccionado = obj;
    this.asignarValoresAlFormulario();
    setTimeout(() => {
      this.accion = "registro";
    }, 100);
  }

  asignarValoresAlFormulario() {
    this.myForm.patchValue(this.proveedorSeleccionado);
  }


  crear(obj: Proveedor) {
    this._proveedorService.create(obj).subscribe(
      (data: Proveedor) => {
        alert("registro creado");
        this.getProveedorsFiltro();
      }
    );
  }

  editar(obj: Proveedor) {
    this._proveedorService.update(obj).subscribe(
      (data: Proveedor) => {
        alert("registro actualizado");
        this.getProveedorsFiltro();
      }
    );
  }

  btnGuardar() {
    let resultForm = this.myForm.getRawValue();
    this.proveedorRequest = new Proveedor();
    this.proveedorRequest = this.myForm.getRawValue();
    if (this.proveedorRequest.proveedorId == 0) {
      this.crear(this.proveedorRequest); return;
    }
    else {
      this.editar(this.proveedorRequest);
    }

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
        case ConstanteFiltroProveedor.Email: x.valor = filtro.Email != null ? filtro.Email : ""; break;
        case ConstanteFiltroProveedor.Nombre: x.valor = filtro.Nombre != null ? filtro.Nombre : ""; break;
      }
    });

    this.getProveedorsFiltro();
  }

  pageChanged(event: PageChangedEvent): void {
    this.filtroRequest.numeroPagina = event.page;
    this.buscarFiltro();
  }

  exportarLista() {
    this.getAllProveedor();
  }

  getAllProveedor() {
    this._proveedorService.getAll().subscribe(
      (data: VistaProveedor[]) => {
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

  generarExcel(lista: VistaProveedor[]) {
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



   
      nExt.nombre = x.nombre;
      nExt.tipoDocumento = x.tipoDocumento;
      nExt.tipoDocumento1 = x.tipoDocumento1;
      nExt.numeroDocumento = x.tipoDocumento1;
      nExt.direccion = x.direccion;
      nExt.telefono = x.telefono;
      nExt.email = x.email;
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
