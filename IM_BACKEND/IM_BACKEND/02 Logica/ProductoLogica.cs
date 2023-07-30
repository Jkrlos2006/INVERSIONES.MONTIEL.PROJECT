using IM_BACKEND._03_Repositorio;
using IM_BACKEND._05_Model;
using IM_BACKEND.DBInversionesMontiel;

namespace IM_BACKEND._02_Logica
{
    public class ProductoLogica
    {
        ProductoRepositorio repo = new ProductoRepositorio();

        public List<Producto> getAll()
        {
            //select * from Producto
            return repo.getAll();
        }


        //select * from Producto wherd id = id
        public Producto getById(int id)
        {
            //select * from Producto
            return repo.getById(id);
        }


        //insert into Producto
        //select * from Producto wherd id = id
        public Producto create(Producto request)
        {
            //request.id = 0 // 4

            return repo.create(request);
        }

        //update into Producto
        //select * from Producto wherd id = id
        public Producto update(Producto request)
        {
            return repo.update(request);
        }


        public int delete(int id)
        {

            return repo.delete(id);
        }

        public FilterResponse<Producto> ListarPorFiltro(FilterRequest request)
        {
            FilterResponse<Producto> res = repo.ListarPorFiltro(request);
            return res;
        }
    }


}
