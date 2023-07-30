using IM_BACKEND._03_Repositorio;
using IM_BACKEND._05_Model;
using IM_BACKEND.DBInversionesMontiel;

namespace IM_BACKEND._02_Logica
{
    public class ClienteLogica
    {
        ClienteRepositorio repo = new ClienteRepositorio();

        public List<VistaCliente> getAllDetallado()
        {
            return repo.getAllDetallado();
        }


        public List<Cliente> getAll()
        {
            //select * from Cliente
            return repo.getAll();
        }


        //select * from Cliente wherd id = id
        public Cliente getById(int id)
        {
            //select * from Cliente
            return repo.getById(id);
        }


        //insert into Cliente
        //select * from Cliente wherd id = id
        public Cliente create(Cliente request)
        {
            //request.id = 0 // 4

            return repo.create(request);
        }

        //update into Cliente
        //select * from Cliente wherd id = id
        public Cliente update(Cliente request)
        {
            return repo.update(request);
        }


        public int delete(int id)
        {

            return repo.delete(id);
        }

        public FilterResponse<VistaCliente> ListarPorFiltro(FilterRequest request)
        {
            FilterResponse<VistaCliente> res = repo.ListarPorFiltro(request);
            return res;
        }

    }

}
