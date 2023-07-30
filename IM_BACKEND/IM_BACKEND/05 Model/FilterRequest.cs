namespace IM_BACKEND._05_Model
{
    public class FilterRequest
    {
        public int NumeroPagina { get; set; } = 0;
        public int Cantidad { get; set; } = 0;
        public List<ItemRequest> Filtros { get; set; } = new List<ItemRequest>();

    }
}
