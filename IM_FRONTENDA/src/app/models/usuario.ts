export class Usuario {
    usuarioId: number;
    username: string | null;
    nombre: string | null;
    apellidoPaterno: string | null;
    apellidoMaterno: string | null;
    documentoId: number | null;
    numeroDocumento: string | null;
    password: string;
    perfilId: number | null;
    
    constructor() {
        this.usuarioId = 0;
        this.username="";
        this.nombre = "";
        this.apellidoPaterno = "";
        this.apellidoMaterno = "";
        this.documentoId = 0;
        this.numeroDocumento = "";
        this.password = "";
        this.perfilId= 0;
    }
}