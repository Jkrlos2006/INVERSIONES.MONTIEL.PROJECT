using IM_BACKEND._03_Repositorio;
using IM_BACKEND.DBInversionesMontiel;

namespace IM_BACKEND._02_Logica
{
    public class PerfilLogica
    {
        PerfilRepositorio repo = new PerfilRepositorio();
        public List<Perfil> getAll()
        {
            return repo.getAll();
        }
        public Perfil getById(int perfil_id)
        {   
            return repo.getById(perfil_id);
        }
        public Perfil create(Perfil request)
        {
            return repo.create(request);
        }
        public Perfil update(Perfil request)
        {
            return repo.update(request);
        }
        public int delete(int perfil_id)
        {
            return repo.delete(perfil_id);
        }

    }

}
