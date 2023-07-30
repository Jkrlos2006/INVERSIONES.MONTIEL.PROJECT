using IM_BACKEND._03_Repositorio;
using IM_BACKEND._05_Model;
using IM_BACKEND.DBInversionesMontiel;

namespace IM_BACKEND._02_Logica
{
    public class ProveedorLogica
    {
        ProveedorRepositorio repo = new ProveedorRepositorio();

        public List<VistaProveedor> getAllDetallado()
        {
            return repo.getAllDetallado();
        }

        public List<Proveedor> getAll()
        {
            //select * from Proveedor
            return repo.getAll();
        }


        //select * from Proveedor wherd id = id
        public Proveedor getById(int proveedor_id)
        {
            //select * from Proveedor
            return repo.getById(proveedor_id);
        }


        //insert into Proveedor
        //select * from Proveedor wherd id = id
        public Proveedor create(Proveedor request)
        {
            //request.id = 0 // 4

            return repo.create(request);
        }

        //update into Proveedor
        //select * from Proveedor wherd id = id
        public Proveedor update(Proveedor request)
        {
            return repo.update(request);
        }


        public int delete(int proveedor_id)
        {

            return repo.delete(proveedor_id);
        }


        public FilterResponse<VistaProveedor> ListarPorFiltro(FilterRequest request)
        {
            FilterResponse<VistaProveedor> res = repo.ListarPorFiltro(request);
            return res;
        }

    }

}
