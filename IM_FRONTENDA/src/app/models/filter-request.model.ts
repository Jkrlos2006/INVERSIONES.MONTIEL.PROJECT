import { ItemRequest } from "./Item-filter.model";

export class FilterRequest {
    numeroPagina: number;
    cantidad: number;
    filtros: ItemRequest[];
    constructor() {
        this.numeroPagina = 1;
        this.cantidad = 10;
        this.filtros = [];
    }
}