export class Cliente {
    clienteId: number;
    codigocliente: string | null;
    razonsocial: string | null;
    documentoId: number | null; 
    numerodocumento: string | null;
    direccion: string | null;
    telefono: string | null;
    email: string | null;
    constructor() {
        this.clienteId = 0;
        this.codigocliente = "";
        this.razonsocial = "";
        this.documentoId= 0;
        this.numerodocumento = "";
        this.direccion = "";
        this.telefono = "";
        this.email = "";
    }
}