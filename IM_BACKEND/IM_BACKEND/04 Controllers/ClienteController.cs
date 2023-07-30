
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using IM_BACKEND._02_Logica;
using IM_BACKEND.DBInversionesMontiel;
using IM_BACKEND._05_Model;

namespace IM_BACKEND.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        ClienteLogica logica = new ClienteLogica();


        [HttpGet]
        public IActionResult get()
        {
            List<VistaCliente> Clientes = logica.getAllDetallado();
            return Ok(Clientes);
        }


        [HttpGet("{id}")]
        public IActionResult getByid(int id)
        {
            Cliente Cliente = logica.getById(id);
            return Ok(Cliente);
        }

        [HttpPost]
        public IActionResult create(Cliente request)
        {
            Cliente Cliente = logica.create(request);
            return Ok(Cliente);
        }

        [HttpPost("filtro")]
        public IActionResult Filtrar([FromBody] FilterRequest request)
        {
            FilterResponse<VistaCliente> Cliente = logica.ListarPorFiltro(request);
            return Ok(Cliente);
        }



        [HttpPut]
        public IActionResult update(Cliente request)
        {
            Cliente Cliente = logica.update(request);
            return Ok(Cliente);
        }



        [HttpDelete("{id}")]
        public IActionResult delete(int id)
        {
            int cantidad = logica.delete(id);
            return Ok(cantidad);
        }

    }
}
