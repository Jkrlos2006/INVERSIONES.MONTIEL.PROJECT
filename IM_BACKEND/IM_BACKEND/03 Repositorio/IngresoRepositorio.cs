using IM_BACKEND._05_Model;
using IM_BACKEND.DBInversionesMontiel;

namespace IM_BACKEND._03_Repositorio
{
    public class IngresoRepositorio
    {
        _DbContextInversionesMontiel db = new _DbContextInversionesMontiel();

        public List<VistaIngreso> getAllDetallado()
        {
            return db.VistaIngresos.ToList();
        }

        public List<Ingreso> getAll()
        {
            return db.Ingresos.ToList();
        }

        public Ingreso getById(int ingreso_id)

        {
            return db.Ingresos.Find(ingreso_id);
        }

        public Ingreso create(Ingreso request)
        {
            db.Ingresos.Add(request);
            db.SaveChanges();
            return request;
        }

        public Ingreso update(Ingreso request)
        {
            db.Ingresos.Update(request);
            db.SaveChanges();
            return request;
        }

        public int delete(int ingreso_id)
        {

            Ingreso Ingreso = db.Ingresos.Find(ingreso_id);

            db.Ingresos.Remove(Ingreso);
            return db.SaveChanges();
        }

        public FilterResponse<VistaIngreso> ListarPorFiltro(FilterRequest request)
        {

            FilterResponse<VistaIngreso> res = new FilterResponse<VistaIngreso>();
            var query = db.VistaIngresos.Where(x => x.IngresoId == x.IngresoId);
            request.Filtros.ForEach(x =>
            {
                if (!string.IsNullOrEmpty(x.Valor))
                {
                    switch (x.Nombre)
                    {
                        case "NumComprobante":
                            query = query.Where(y => y.NumComprobante.ToLower().Contains(x.Valor.ToLower()));
                            break;
                        case "TipoComprobante1":
                            query = query.Where(y => y.TipoComprobante1.Contains(x.Valor));
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
