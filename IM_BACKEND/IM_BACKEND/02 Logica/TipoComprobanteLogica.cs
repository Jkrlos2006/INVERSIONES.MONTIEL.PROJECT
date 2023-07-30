using IM_BACKEND._03_Repositorio;
using IM_BACKEND.DBInversionesMontiel;

namespace IM_BACKEND._02_Logica
{
    public class TipoComprobanteLogica
    {
        TipoComprobanteRepositorio repo = new TipoComprobanteRepositorio();
        public List<TipoComprobante> getAll()
        {
            return repo.getAll();
        }
        public TipoComprobante getById(int comprobante_id)
        {   
            return repo.getById(comprobante_id);
        }
        public TipoComprobante create(TipoComprobante request)
        {
            return repo.create(request);
        }
        public TipoComprobante update(TipoComprobante request)
        {
            return repo.update(request);
        }
        public int delete(int comprobante_id)
        {
            return repo.delete(comprobante_id);
        }

    }

}
