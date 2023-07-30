import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ConstanteFiltroProducto } from 'src/app/constantes/constante-filtro';
import { FilterRequest } from 'src/app/models/filter-request.model';
import { FilterResponse } from 'src/app/models/filter-response.model';
import { Producto } from 'src/app/models/producto';
import { ExportExcelService } from 'src/app/service/export-excel.service';
import { ProductoService } from 'src/app/service/producto.service';


@Component({
  selector: 'app-listaproducto',
  templateUrl: './listaproducto.component.html',
  styleUrls: ['./listaproducto.component.scss']
})
export class ListaproductoComponent implements OnInit {

  productos: Producto[] = [];
  accion: string = "lista";
  productoSeleccionado: Producto = new Producto();
  productoRequest: Producto = new Producto();
  currentPage: number = 1;

  filtroRequest: FilterRequest = new FilterRequest();
  myForm: FormGroup;
  myFormFiltro: FormGroup;
  totalRegistro: number = 0;


  constructor(
    private _productoService: ProductoService,
    private fb: FormBuilder,
    private _exportExcelService: ExportExcelService
  ) {
    this.myForm = this.fb.group({
      productoId: [{ value: 0, disabled: true }, [Validators.required]],
      categoria: [null, []],
      nombre: [null, []],
      descripcion: [null, []],
      stock: [null, []],
      costoSinIgv: [null, []],
      costoConIgv: [null, []],
      });


      
    this.myFormFiltro = this.fb.group({
      Categoria: ["", []],
      Nombre: ["", []],

    });

    this.filtroRequest.filtros.push({ nombre: ConstanteFiltroProducto.Categoria, valor: "" });
    this.filtroRequest.filtros.push({ nombre: ConstanteFiltroProducto.Nombre, valor: "" });

  }

  ngOnInit(): void {
    this.getProductosFiltro();
  }

  getProductosFiltro() {
    this._productoService.buscarPorFiltro(this.filtroRequest).subscribe(
      (data: FilterResponse<Producto>) => {
        this.productos = data.lista;
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

  eliminar(obj: Producto) {
    this._productoService.delete(obj.productoId).subscribe(
      (data: number) => {
        alert("registro eliminado de forma satisfactoria");
        this.getProductosFiltro();
      },
      err => {
        console.log(err);

      }
    );
  }

  btnCrear() {
    this.productoSeleccionado = new Producto();
    this.asignarValoresAlFormulario();
    setTimeout(() => {
      this.accion = "registro";
    }, 100);
  }

  btnEditar(obj: Producto) {
    this.productoSeleccionado = obj;
    this.asignarValoresAlFormulario();
    setTimeout(() => {
      this.accion = "registro";
    }, 100);
  }

  asignarValoresAlFormulario() {
    this.myForm.patchValue(this.productoSeleccionado);
  }


  crear(obj: Producto) {
    this._productoService.create(obj).subscribe(
      (data: Producto) => {
        alert("registro creado");
        this.getProductosFiltro();
      }
    );
  }

  editar(obj: Producto) {
    this._productoService.update(obj).subscribe(
      (data: Producto) => {
        alert("registro actualizado");
        this.getProductosFiltro();
      }
    );
  }

  btnGuardar() {
    this.productoSeleccionado = this.myForm.getRawValue();

    if(this.productoSeleccionado.productoId == 0) {
      this.crear(this.productoSeleccionado);
    }
    else {
      this.editar(this.productoSeleccionado);
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
        case ConstanteFiltroProducto.Categoria: x.valor = filtro.Categoria != null ? filtro.Categoria : ""; break;
        case ConstanteFiltroProducto.Nombre: x.valor = filtro.Nombre != null ? filtro.Nombre : ""; break;
      }
    });
    
    this.getProductosFiltro();
  
  }

  pageChanged(event: PageChangedEvent): void {
    this.filtroRequest.numeroPagina = event.page;
    this.buscarFiltro();
  }

  exportarLista() {
    this.getAllProducto();
  }

  getAllProducto() {
    this._productoService.getAll().subscribe(
      (data: Producto[]) => {
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

  generarExcel(lista: Producto[]) {
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



      nExt.productoId = x.productoId;
      nExt.categoria = x.categoria;
      nExt.nombre = x.nombre;
      nExt.descripcion = x.descripcion;
      nExt.stock = x.stock ;
      nExt.costoSinIgv = x.costoSinIgv ;
      nExt.costoConIgv = x.costoConIgv;

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
