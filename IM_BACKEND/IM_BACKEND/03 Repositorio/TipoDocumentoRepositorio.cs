using IM_BACKEND.DBInversionesMontiel;

namespace IM_BACKEND._03_Repositorio
{
    public class TipoDocumentoRepositorio
    {
        _DbContextInversionesMontiel db = new _DbContextInversionesMontiel();

        public List<TipoDocumento> getAll()
        {
            //select * from Proveedor
            return db.TipoDocumentos.ToList();
        }


        //select * from Proveedor wherd id = id
        public TipoDocumento getById(int documento_id)
            
        {
            //select * from Proveedor
            return db.TipoDocumentos.Find(documento_id);
        }


        //insert into Proveedor
        //select * from Proveedor wherd id = id
        public TipoDocumento create(TipoDocumento request)
        {
            //request.id = 0 // 4
            db.TipoDocumentos.Add(request);
            db.SaveChanges();
            return request;
        }

        //update into Proveedor
        //select * from Proveedor wherd id = id
        public TipoDocumento update(TipoDocumento request)
        {
            //request.id = 0 // 4
            db.TipoDocumentos.Update(request);
            db.SaveChanges();
            return request;
        }


        public int delete(int documento_id)
        {

            //select * from Proveedor wherd id = id
            TipoDocumento TipoDocumento = db.TipoDocumentos.Find(documento_id);
            //request.id = 0 // 4
            db.TipoDocumentos.Remove(TipoDocumento);
            return db.SaveChanges();
        }



    }
}
