export class Egreso {
    salidaId: number;
    clienteId:number;
    productoId:number;
    comprobanteId: number;
    numComprobante: string | null;
    fechaSalida: string | null;
    cantidad: number | null;
    usuarioId: number;
        
    
    
    constructor() {
        this.salidaId = 0;
        this.clienteId = 0;
        this.productoId = 0;
        this.comprobanteId = 0;
        this.numComprobante = "";
        this.fechaSalida = "";
        this.cantidad =  0;
        this.usuarioId = 0;
        
        
    }


}
