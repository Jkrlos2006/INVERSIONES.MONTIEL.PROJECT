using IM_BACKEND._05_Model;
using IM_BACKEND.DBInversionesMontiel;

namespace IM_BACKEND._03_Repositorio
{
    public class ProductoRepositorio
    {
        _DbContextInversionesMontiel db = new _DbContextInversionesMontiel();

        public List<Producto> getAll()
        {
            //select * from Producto
            return db.Productos.ToList();
        }


        //select * from Producto wherd id = id
        public Producto getById(int id)
        {
            //select * from Producto
            return db.Productos.Find(id);
        }


        //insert into Producto
        //select * from Producto wherd id = id
        public Producto create(Producto request)
        {
            //request.id = 0 // 4
            db.Productos.Add(request);
            db.SaveChanges();
            return request;
        }

        //update into Producto
        //select * from Producto wherd id = id
        public Producto update(Producto request)
        {
            //request.id = 0 // 4
            db.Productos.Update(request);
            db.SaveChanges();
            return request;
        }


        public int delete(int id)
        {

            //select * from Producto wherd id = id
            Producto Producto = db.Productos.Find(id);
            //request.id = 0 // 4
            db.Productos.Remove(Producto);
            return db.SaveChanges();
        }

        public FilterResponse<Producto> ListarPorFiltro(FilterRequest request)
        {

            FilterResponse<Producto> res = new FilterResponse<Producto>();
            var query = db.Productos.Where(x => x.ProductoId == x.ProductoId);
            request.Filtros.ForEach(x =>
            {
                if (!string.IsNullOrEmpty(x.Valor))
                {
                    switch (x.Nombre)
                    {
                        case "Categoria":
                            query = query.Where(y => y.Categoria.ToLower().Contains(x.Valor.ToLower()));
                            break;
                        case "Nombre":
                            query = query.Where(y => y.Nombre.Contains(x.Valor));
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
