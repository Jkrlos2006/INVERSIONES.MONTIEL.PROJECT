using IM_BACKEND._03_Repositorio;
using IM_BACKEND.DBInversionesMontiel;

namespace IM_BACKEND._02_Logica
{
    public class TipoDocumentoLogica
    {
        TipoDocumentoRepositorio repo = new TipoDocumentoRepositorio();

        public List<TipoDocumento> getAll()
        {
            //select * from Proveedor
            return repo.getAll();
        }


        //select * from Proveedor wherd id = id
        public TipoDocumento getById(int documento_id)
        {
            //select * from Proveedor
            return repo.getById(documento_id);
        }


        //insert into Proveedor
        //select * from Proveedor wherd id = id
        public TipoDocumento create(TipoDocumento request)
        {
            //request.id = 0 // 4

            return repo.create(request);
        }

        //update into Proveedor
        //select * from Proveedor wherd id = id
        public TipoDocumento update(TipoDocumento request)
        {
            return repo.update(request);
        }


        public int delete(int documento_id)
        {

            return repo.delete(documento_id);
        }

    }

}
