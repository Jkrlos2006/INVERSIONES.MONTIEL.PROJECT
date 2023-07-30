using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using IM_BACKEND._02_Logica;
using IM_BACKEND.DBInversionesMontiel;
using IM_BACKEND._05_Model;

namespace IM_BACKEND.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EgresoController : ControllerBase
    {
        EgresoLogica logica = new EgresoLogica();


        [HttpGet]
        public IActionResult get()
        {
            List<VistaEgreso> Egresos = logica.getAllDetallado();
            return Ok(Egresos);
        }


        [HttpGet("{salida_id}")]
        public IActionResult getByid(int salida_id)
        {
            Egreso Egreso = logica.getById(salida_id);
            return Ok(Egreso);
        }

        [HttpPost]
        public IActionResult create(Egreso request)
        {
            Egreso Egreso = logica.create(request);
            return Ok(Egreso);
        }

        [HttpPost("filtro")]
        public IActionResult Filtrar([FromBody] FilterRequest request)
        {
            FilterResponse<VistaEgreso> Egreso = logica.ListarPorFiltro(request);
            return Ok(Egreso);
        }

        [HttpPut]
        public IActionResult update(Egreso request)
        {
            Egreso Egreso = logica.update(request);
            return Ok(Egreso);
        }



        [HttpDelete("{salida_id}")]
        public IActionResult delete(int salida_id)
        {
            int cantidad = logica.delete(salida_id);
            return Ok(cantidad);
        }

    }
}
