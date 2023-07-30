export class FilterResponse<T> {
    totalRegistro: number;
    lista: T[];
    constructor() {
        this.totalRegistro = 0;
        this.lista = [];
    }
}