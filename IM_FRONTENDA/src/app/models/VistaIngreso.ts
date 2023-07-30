export class VistaIngreso {
    ingresoId: number;
    tipoComprobante: number | null;
    tipoComprobante1: string;
    numComprobante: string | null;
    fechaRecepcion: string | null;
    cantidad: number | null;
    numLote: string | null;
    proveedorId: number | null;
    proveedor: string | null;
    productoId: number | null;
    producto: string | null;
    usuarioId: number;
    usuario: string;

constructor() {

    this.ingresoId=0;
    this.tipoComprobante=0;
    this.tipoComprobante1="";
    this.numComprobante="";
    this.fechaRecepcion="";
    this.cantidad=0;
    this.numLote="";
    this.proveedorId=0;
    this.proveedor="";
    this.productoId=0;
    this.producto="";
    this.usuarioId=0;
    this.usuario="";
}}

