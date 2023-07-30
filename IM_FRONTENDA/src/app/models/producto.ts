export class Producto {
    productoId: number;
    categoria: string | null;
    nombre: string | null;
    descripcion: string | null;
    stock: number | null;
    costoSinIgv: number | null;
    costoConIgv: number | null;
    constructor() {
        this.productoId = 0;
        this.categoria = "";
        this.nombre = "";
        this.descripcion = "";
        this.stock = 0;
        this.costoSinIgv = 0;
        this.costoConIgv = 0;
    }
}