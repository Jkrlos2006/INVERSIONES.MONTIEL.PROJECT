using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using IM_BACKEND._02_Logica;
using IM_BACKEND.DBInversionesMontiel;
using Microsoft.AspNetCore.Authorization;

namespace IM_BACKEND.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "administrador,ventas,soporte_tecnico")]
    public class UsuarioController : ControllerBase
    {
        UsuarioLogica logica = new UsuarioLogica();


        [HttpGet]
        public IActionResult get()
        {
            List<Usuario> Usuarios = logica.getAll();
            return Ok(Usuarios);
        }


        [HttpGet("{id}")]
        public IActionResult getByid(int id)
        {
            Usuario Usuario = logica.getById(id);
            return Ok(Usuario);
        }

        [HttpPost]
        public IActionResult create(Usuario request)
        {
            Usuario Usuario = logica.create(request);
            return Ok(Usuario);
        }


        [HttpPut]
        public IActionResult update(Usuario request)
        {
            Usuario Usuario = logica.update(request);
            return Ok(Usuario);
        }



        [HttpDelete("{id}")]
        public IActionResult delete(int id)
        {
            int cantidad = logica.delete(id);
            return Ok(cantidad);
        }

    }
}
