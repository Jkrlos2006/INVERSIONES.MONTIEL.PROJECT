export class Ingreso {
  ingresoId: number;
  tipoComprobante: number;
  numComprobante: string | null;
  fechaRecepcion: string | null;
  cantidad: number | null;
  numLote: string | null;
  proveedorId: number;
  productoId: number;
  usuarioId: number;

  constructor(){
    this.ingresoId = 0;
    this.tipoComprobante = 0;
    this.numComprobante = "";
    this.fechaRecepcion = "";
    this.cantidad = 0;
    this.numLote = "";
    this.proveedorId = 0;
    this.productoId =  0;
    this.usuarioId = 0;
  }

}
