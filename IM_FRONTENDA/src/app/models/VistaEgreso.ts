export class VistaEgreso {
    salidaId: number;
    comprobanteId: number | null;
    tipoComprobante: string | null;
    numComprobante: string | null;
    fechaSalida: string | null;
    cantidad: number | null;
    clienteId: number | null;
    cliente: string | null;
    productoId: number | null;
    producto: string;
    usuarioId: number | null;
    usuario: string;

    constructor() {
        this.salidaId=0;      
        this.comprobanteId=0;
        this.tipoComprobante="";
        this.numComprobante="";
        this.fechaSalida="";
        this.cantidad=0;
        this.clienteId=0;
        this.cliente="";
        this.productoId=0;
        this.producto="";     
        this.usuarioId=0;
        this.usuario="";
}
}