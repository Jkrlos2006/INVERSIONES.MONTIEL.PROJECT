using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using IM_BACKEND._02_Logica;
using IM_BACKEND.DBInversionesMontiel;

namespace IM_BACKEND.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PerfilController : ControllerBase
    {
        PerfilLogica logica = new PerfilLogica();


        [HttpGet]
        public IActionResult get()
        {
            List<Perfil> Perfils = logica.getAll();
            return Ok(Perfils);
        }


        [HttpGet("{perfil_id}")]
        public IActionResult getByid(int perfil_id)
        {
            Perfil Perfil = logica.getById(perfil_id);
            return Ok(Perfil);
        }

        [HttpPost]
        public IActionResult create(Perfil request)
        {
            Perfil Perfil = logica.create(request);
            return Ok(Perfil);
        }


        [HttpPut]
        public IActionResult update(Perfil request)
        {
            Perfil Perfil = logica.update(request);
            return Ok(Perfil);
        }



        [HttpDelete("{perfil_id}")]
        public IActionResult delete(int perfil_id)
        {
            int cantidad = logica.delete(perfil_id);
            return Ok(cantidad);
        }

    }
}
