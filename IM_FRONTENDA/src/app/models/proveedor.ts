export class Proveedor {
    proveedorId: number;
    nombre: string | null;
    tipoDocumento: string | null;
    numeroDocumento: string | null;
    direccion: string | null;
    telefono: string | null;
    email: string | null;
    
    constructor() {
        this.proveedorId = 0;
        this.nombre = "";
        this.tipoDocumento = "";
        this.numeroDocumento = "";
        this.direccion = "";
        this.telefono = "";
        this.email = "";
        
    }
}