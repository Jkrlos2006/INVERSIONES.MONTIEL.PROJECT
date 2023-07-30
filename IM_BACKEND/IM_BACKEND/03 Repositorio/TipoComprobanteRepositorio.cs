using IM_BACKEND.DBInversionesMontiel;

namespace IM_BACKEND._03_Repositorio
{
    public class TipoComprobanteRepositorio
    {
        _DbContextInversionesMontiel db = new _DbContextInversionesMontiel();

        public List<TipoComprobante> getAll()
        {
            return db.TipoComprobantes.ToList();
        }
        public TipoComprobante getById(int comprobante_id)
            
        {
            return db.TipoComprobantes.Find(comprobante_id);
        }
        public TipoComprobante create(TipoComprobante request)
        {
            db.TipoComprobantes.Add(request);
            db.SaveChanges();
            return request;
        }
        public TipoComprobante update(TipoComprobante request)
        {
            db.TipoComprobantes.Update(request);
            db.SaveChanges();
            return request;
        }
        public int delete(int comprobante_id)
        {
            TipoComprobante TipoComprobante = db.TipoComprobantes.Find(comprobante_id);
            db.TipoComprobantes.Remove(TipoComprobante);
            return db.SaveChanges();
        }
    }
}
