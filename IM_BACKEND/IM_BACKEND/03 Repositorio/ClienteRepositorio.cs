using IM_BACKEND._05_Model;
using IM_BACKEND.DBInversionesMontiel;

namespace IM_BACKEND._03_Repositorio
{
    public class ClienteRepositorio
    {
        _DbContextInversionesMontiel db = new _DbContextInversionesMontiel();

        public List<VistaCliente> getAllDetallado()
        {
            return db.VistaClientes.ToList();
        }


        public List<Cliente> getAll()
        {
            //select * from Cliente
            return db.Clientes.ToList();
        }


        //select * from Cliente wherd id = id
        public Cliente getById(int id)
        {
            //select * from Cliente
            return db.Clientes.Find(id);
        }


        //insert into Cliente
        //select * from Cliente wherd id = id
        public Cliente create(Cliente request)
        {
            //request.id = 0 // 4
            db.Clientes.Add(request);
            db.SaveChanges();
            return request;
        }

        //update into Cliente
        //select * from Cliente wherd id = id
        public Cliente update(Cliente request)
        {
            //request.id = 0 // 4
            db.Clientes.Update(request);
            db.SaveChanges();
            return request;
        }


        public int delete(int id)
        {

            //select * from Cliente wherd id = id
            Cliente Cliente = db.Clientes.Find(id);
            //request.id = 0 // 4
            db.Clientes.Remove(Cliente);
            return db.SaveChanges();
        }


        public FilterResponse<VistaCliente> ListarPorFiltro(FilterRequest request)
        {

            FilterResponse<VistaCliente> res = new FilterResponse<VistaCliente>();
            var query = db.VistaClientes.Where(x => x.ClienteId == x.ClienteId);
            request.Filtros.ForEach(x =>
            {
                if (!string.IsNullOrEmpty(x.Valor))
                {
                    switch (x.Nombre)
                    {
                        case "Razonsocial":
                            query = query.Where(y => y.Razonsocial.ToLower().Contains(x.Valor.ToLower()));
                            break;
                        case "Numerodocumento":
                            query = query.Where(y => y.Numerodocumento.Contains(x.Valor));
                            break;
                    }
                }
            });
            res.TotalRegistro = query.Count();
            res.Lista =
                query
                .Skip((request.NumeroPagina - 1) * request.Cantidad)
                .Take(request.Cantidad)
                .ToList();

            return res;
        }



    }
}
