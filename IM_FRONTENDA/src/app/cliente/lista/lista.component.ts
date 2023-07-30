import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ConstanteFiltroCliente } from 'src/app/constantes/constante-filtro';
import { VistaCliente } from 'src/app/models/VistaCliente';
import { Cliente } from 'src/app/models/cliente';
import { FilterRequest } from 'src/app/models/filter-request.model';
import { FilterResponse } from 'src/app/models/filter-response.model';
import { Tipodocumento } from 'src/app/models/tipodocumento';
import { ClienteService } from 'src/app/service/cliente.service';
import { ExportExcelService } from 'src/app/service/export-excel.service';
import { TipoDocumentoService } from 'src/app/service/tipodocumento.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  clientes: VistaCliente[] = [];
  accion: string = "lista";
  clienteSeleccionado: VistaCliente = new VistaCliente();
  clienteRequest: Cliente = new Cliente();
  tipodocumentos: Tipodocumento[] = [];
  currentPage: number = 1;

  filtroRequest: FilterRequest = new FilterRequest();
  myForm: FormGroup;
  myFormFiltro: FormGroup;
  totalRegistro: number = 0;

  constructor(
    private _clienteService: ClienteService,
    private _tipodocumentoService: TipoDocumentoService,
    private fb: FormBuilder,
    private _exportExcelService: ExportExcelService
  ) {
    this.myForm = this.fb.group({
      clienteId: [{ value: 0, disabled: true }, [Validators.required]],
      codigocliente: [null, []],
      razonsocial: [null, []],
      documentoId: [null, []],
      numerodocumento: [null, []],
      direccion: [null, []],
      telefono: [null, []],
      email: [null, []],
    });

    this.myFormFiltro = this.fb.group({
      razonsocial: ["", []],
      numerodocumento: ["", []],

    });

    //constructor
    this.filtroRequest.filtros.push({ nombre: ConstanteFiltroCliente.Numerodocumento, valor: "" });
    this.filtroRequest.filtros.push({ nombre: ConstanteFiltroCliente.Razonsocial, valor: "" });

  }

  ngOnInit(): void {
    this.getClientesFiltro();
    this.getTipoDocumento();
  }

  getTipoDocumento() {
    this._tipodocumentoService.getAll().subscribe({
      next: (data: Tipodocumento[]) => {
        this.tipodocumentos = data;
        console.log("this.tipodocumentos", this.tipodocumentos);
      },
      error: () => { },
      complete: () => { }
    });
  }

  getClientesFiltro() {

    this._clienteService.buscarPorFiltro(this.filtroRequest).subscribe(
      (data: FilterResponse<VistaCliente>) => {
        this.clientes = data.lista;
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

  eliminar(obj: VistaCliente) {
    this._clienteService.delete(obj.clienteId).subscribe(
      (data: number) => {
        alert("registro eliminado de forma satisfactoria");
        this.getClientesFiltro();
      },
      err => {
        console.log(err);

      }
    );
  }

  btnCrear() {
    this.clienteSeleccionado = new VistaCliente();
    this.asignarValoresAlFormulario();
    setTimeout(() => {
      this.accion = "registro";
    }, 100);
  }

  btnEditar(obj: VistaCliente) {
    this.clienteSeleccionado = obj;
    this.asignarValoresAlFormulario();
    setTimeout(() => {
      this.accion = "registro";
    }, 100);
  }

  asignarValoresAlFormulario() {
    this.myForm.patchValue(this.clienteSeleccionado);
  }


  crear(obj: Cliente) {
    this._clienteService.create(obj).subscribe(
      (data: Cliente) => {
        alert("registro creado");
        this.getClientesFiltro();
      }
    );
  }

  editar(obj: Cliente) {
    this._clienteService.update(obj).subscribe(
      (data: Cliente) => {
        alert("registro actualizado");
        this.getClientesFiltro();
      }
    );
  }

  btnGuardar() {
    let resultForm = this.myForm.getRawValue();
    this.clienteRequest = new Cliente();
    this.clienteRequest = this.myForm.getRawValue();
    if (this.clienteRequest.clienteId == 0) {
      this.crear(this.clienteRequest); return;
    }
    else {
      this.editar(this.clienteRequest);
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
        case ConstanteFiltroCliente.Numerodocumento: x.valor = filtro.numerodocumento != null ? filtro.numerodocumento : ""; break;
        case ConstanteFiltroCliente.Razonsocial: x.valor = filtro.razonsocial != null ? filtro.razonsocial : ""; break;
      }
    });

    this.getClientesFiltro();


  }


  pageChanged(event: PageChangedEvent): void {
    this.filtroRequest.numeroPagina = event.page;
    this.buscarFiltro();
  }


  exportarLista() {
    this.getAllClientes();
  }

  getAllClientes() {
    this._clienteService.getAll().subscribe(
      (data: VistaCliente[]) => {
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

  generarExcel(lista: VistaCliente[]) {
    let exports: any = [];
    lista.forEach(x => {
      let nExt: any = {};
      nExt.Id = x.clienteId;
      nExt.Codigo = x.codigocliente;
      nExt.RazonSocial = x.razonsocial;
      nExt.Documento = x.documentoId;
      nExt.RUC = x.tipoDocumento;
      nExt.NroDocumento = x.numerodocumento;
      nExt.Direccion = x.direccion;
      nExt.Telefono = x.telefono;
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