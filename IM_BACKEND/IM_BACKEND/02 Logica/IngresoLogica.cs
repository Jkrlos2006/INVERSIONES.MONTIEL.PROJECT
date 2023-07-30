using IM_BACKEND._03_Repositorio;
using IM_BACKEND._05_Model;
using IM_BACKEND.DBInversionesMontiel;

namespace IM_BACKEND._02_Logica
{
    public class IngresoLogica
    {
        IngresoRepositorio repo = new IngresoRepositorio();
        ProductoLogica ProNeg = new ProductoLogica();

        public List<VistaIngreso> getAllDetallado()
        {
            return repo.getAllDetallado();
        }

        public List<Ingreso> getAll()
        {
            return repo.getAll();
        }

        public Ingreso getById(int ingreso_id)
        {
            return repo.getById(ingreso_id);
        }


        public Ingreso create(Ingreso request)
        {
            //insertando registro de ingresos
            request = repo.create(request);

            //obteniendo registro de producto

            Producto prd = ProNeg.getById(request.ProductoId);
            prd.Stock = (decimal)(prd.Stock + request.Cantidad);

            ProNeg.update(prd);

            return request;

        }

        public Ingreso update(Ingreso request)
        {
            return repo.update(request);
        }


        public int delete(int ingreso_id)
        {

            return repo.delete(ingreso_id);
        }

        public FilterResponse<VistaIngreso> ListarPorFiltro(FilterRequest request)
        {
            FilterResponse<VistaIngreso> res = repo.ListarPorFiltro(request);
            return res;
        }
    }

}

