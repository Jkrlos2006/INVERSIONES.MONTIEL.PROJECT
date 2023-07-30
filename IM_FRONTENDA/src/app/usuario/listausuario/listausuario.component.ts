import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ConstanteFiltroUsario } from 'src/app/constantes/constante-filtro';
import { FilterRequest } from 'src/app/models/filter-request.model';
import { FilterResponse } from 'src/app/models/filter-response.model';
import { Perfil } from 'src/app/models/perfil';
import { Tipodocumento } from 'src/app/models/tipodocumento';
import { Usuario } from 'src/app/models/usuario';
import { ExportExcelService } from 'src/app/service/export-excel.service';
import { PerfilService } from 'src/app/service/perfil';
import { TipoDocumentoService } from 'src/app/service/tipodocumento.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-listausuario',
  templateUrl: './listausuario.component.html',
  styleUrls: ['./listausuario.component.scss']
})
export class ListausuarioComponent {

  usuarios: Usuario[] = [];
  accion: string = "lista";
  myForm: FormGroup;
  usuarioSeleccionado: Usuario = new Usuario();
  perfils: Perfil [] = [];
  tipodocumentos: Tipodocumento [] = [];
  currentPage: number = 1;

  filtroRequest: FilterRequest = new FilterRequest();
  myFormFiltro: FormGroup;
  totalRegistro: number = 0;


  constructor(
    private _usuarioService: UsuarioService,
    private _pefilService: PerfilService,
    private _tipodocumentoService: TipoDocumentoService,
    private fb: FormBuilder,
    private _exportExcelService: ExportExcelService
  ) {
    this.myForm = this.fb.group({
      usuarioId: [{ value: 0, disabled: true }, [Validators.required]],
      username: [null, []],
      nombre: [null, []],
      apellidoPaterno: [null, []],
      apellidoMaterno: [null, []],
      documentoId: [null, []],
      numeroDocumento: [null, []],
      password: [null, []],
      perfilId: [null, []],
      });

      this.myFormFiltro = this.fb.group({
        Nombre: ["", []],
        NumeroDocumento: ["", []],
  
      });

      this.filtroRequest.filtros.push({ nombre: ConstanteFiltroUsario.NumeroDocumento, valor: "" });
      this.filtroRequest.filtros.push({ nombre: ConstanteFiltroUsario.Nombre, valor: "" });
  


  }

  ngOnInit(): void {
    this.getPerfil();
    this.getTipoDocumento();
    this.getUsuariosFiltro();
  }

  getPerfil() {
    this._pefilService.getAll().subscribe({
      next: (data: Perfil[]) => {
        this.perfils = data;
        console.log("this.perfils", this.perfils);
      },
      error: () => { },
      complete: () => { }
    });
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

  getUsuariosFiltro() {
    this._usuarioService.buscarPorFiltro(this.filtroRequest).subscribe(
      (data: FilterResponse <Usuario>) => {
        this.usuarios = data.lista;
        this.totalRegistro = data.totalRegistro;
        console.log(data);
      },
      err => {
        console.log(err);
      },
      () => {
        console.log("termino");

      }
    );
  }

  eliminar(obj: Usuario) {
    this._usuarioService.delete(obj.usuarioId).subscribe(
      (data: number) => {
        alert("registro eliminado de forma satisfactoria");
        this.getUsuariosFiltro();
      },
      err => {
        console.log(err);

      }
    );
  }

  btnCrear() {
    this.usuarioSeleccionado = new Usuario();
    this.asignarValoresAlFormulario();
    setTimeout(() => {
      this.accion = "registro";
    }, 100);
  }

  btnEditar(obj: Usuario) {
    this.usuarioSeleccionado = obj;
    this.asignarValoresAlFormulario();
    setTimeout(() => {
      this.accion = "registro";
    }, 100);
  }

  asignarValoresAlFormulario() {
    this.myForm.patchValue(this.usuarioSeleccionado);
  }


  crear(obj: Usuario) {
    this._usuarioService.create(obj).subscribe(
      (data: Usuario) => {
        alert("registro creado");
        this.getUsuariosFiltro();
      }
    );
  }

  editar(obj: Usuario) {
    this._usuarioService.update(obj).subscribe(
      (data: Usuario) => {
        alert("registro actualizado");
        this.getUsuariosFiltro();
      }
    );
  }

  btnGuardar() {
    this.usuarioSeleccionado = this.myForm.getRawValue();

    if(this.usuarioSeleccionado.usuarioId == 0) {
      this.crear(this.usuarioSeleccionado);
    }
    else {
      this.editar(this.usuarioSeleccionado);
    }

    this.despuesDeGuardar();
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
        case ConstanteFiltroUsario.NumeroDocumento: x.valor = filtro.NumeroDocumento != null ? filtro.NumeroDocumento : ""; break;
        case ConstanteFiltroUsario.Nombre: x.valor = filtro.Nombre != null ? filtro.Nombre : ""; break;
      }
    });
    
    this.getUsuariosFiltro();
  
  }

  pageChanged(event: PageChangedEvent): void {
    this.filtroRequest.numeroPagina = event.page;
    this.buscarFiltro();
  }

  exportarLista() {
    this.getAllUsuario();
  }

  getAllUsuario() {
    this._usuarioService.getAll().subscribe(
      (data: Usuario[]) => {
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

  generarExcel(lista: Usuario[]) {
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




       nExt.usuarioId = x.usuarioId;
       nExt.username = x.username;
       nExt.nombre = x.nombre;
       nExt.apellidoPaterno = x.apellidoPaterno;
       nExt.apellidoMaterno = x.apellidoMaterno;
       nExt.documentoId = x.documentoId;
       nExt.numeroDocumento = x.numeroDocumento;
       nExt.password = x.password;
       nExt.perfilId = x.perfilId;

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