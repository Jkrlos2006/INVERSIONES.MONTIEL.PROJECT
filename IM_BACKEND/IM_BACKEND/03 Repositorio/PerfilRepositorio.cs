using IM_BACKEND.DBInversionesMontiel;

namespace IM_BACKEND._03_Repositorio
{
    public class PerfilRepositorio
    {
        _DbContextInversionesMontiel db = new _DbContextInversionesMontiel();

        public List<Perfil> getAll()
        {
            return db.Perfils.ToList();
        }
        public Perfil getById(int perfil_id)
            
        {
            return db.Perfils.Find(perfil_id);
        }
        public Perfil create(Perfil request)
        {
            db.Perfils.Add(request);
            db.SaveChanges();
            return request;
        }
        public Perfil update(Perfil request)
        {
            db.Perfils.Update(request);
            db.SaveChanges();
            return request;
        }
        public int delete(int perfil_id)
        {
            Perfil Perfil = db.Perfils.Find(perfil_id);
            db.Perfils.Remove(Perfil);
            return db.SaveChanges();
        }



    }
}
