namespace IM_BACKEND._05_Model
{

    public class FilterResponse<T>
    {
        public int TotalRegistro { get; set; } = 0;
        public List<T> Lista { get; set; } = new List<T>();
    }
}
