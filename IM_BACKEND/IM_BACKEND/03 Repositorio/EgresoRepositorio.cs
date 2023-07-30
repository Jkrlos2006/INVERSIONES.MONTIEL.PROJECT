using IM_BACKEND._05_Model;
using IM_BACKEND.DBInversionesMontiel;

namespace IM_BACKEND._03_Repositorio
{
    public class EgresoRepositorio
    {
        _DbContextInversionesMontiel db = new _DbContextInversionesMontiel();

        public List<VistaEgreso> getAllDetallado()
        {
            return db.VistaEgresos.ToList();
        }
        public List<Egreso> getAll()
        {
            return db.Egresos.ToList();
        }
                
        public Egreso getById(int salida_id)
            
        {            
            return db.Egresos.Find(salida_id);
        }
        
        public Egreso create(Egreso request)
        {
            db.Egresos.Add(request);
            db.SaveChanges();
            return request;
        }
                
        public Egreso update(Egreso request)
        {            
            db.Egresos.Update(request);
            db.SaveChanges();
            return request;
        }

        public int delete(int salida_id)
        {

            Egreso Egreso = db.Egresos.Find(salida_id);
            
            db.Egresos.Remove(Egreso);
            return db.SaveChanges();
        }

        public FilterResponse<VistaEgreso> ListarPorFiltro(FilterRequest request)
        {

            FilterResponse<VistaEgreso> res = new FilterResponse<VistaEgreso>();
            var query = db.VistaEgresos.Where(x => x.SalidaId == x.SalidaId);
            request.Filtros.ForEach(x =>
            {
                if (!string.IsNullOrEmpty(x.Valor))
                {
                    switch (x.Nombre)
                    {
                        case "TipoComprobante":
                            query = query.Where(y => y.TipoComprobante.ToLower().Contains(x.Valor.ToLower()));
                            break;
                        case "NumComprobante":
                            query = query.Where(y => y.NumComprobante.Contains(x.Valor));
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
