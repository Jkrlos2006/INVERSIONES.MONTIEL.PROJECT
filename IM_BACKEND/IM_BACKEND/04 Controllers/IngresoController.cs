using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using IM_BACKEND._02_Logica;
using IM_BACKEND.DBInversionesMontiel;
using IM_BACKEND._05_Model;

namespace IM_BACKEND.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IngresoController : ControllerBase
    {
        IngresoLogica logica = new IngresoLogica();


        [HttpGet]
        public IActionResult get()
        {
            List<VistaIngreso> Ingresos = logica.getAllDetallado();
            return Ok(Ingresos);
        }


        [HttpGet("{ingreso_id}")]
        public IActionResult getByid(int ingreso_id)
        {
            Ingreso Ingreso = logica.getById(ingreso_id);
            return Ok(Ingreso);
        }

        [HttpPost]
        public IActionResult create(Ingreso request)
        {
            Ingreso Ingreso = logica.create(request);
            return Ok(Ingreso);
        }


        [HttpPost("filtro")]
        public IActionResult Filtrar([FromBody] FilterRequest request)
        {
            FilterResponse<VistaIngreso> Ingreso = logica.ListarPorFiltro(request);
            return Ok(Ingreso);
        }

        [HttpPut]
        public IActionResult update(Ingreso request)
        {
            Ingreso Ingreso = logica.update(request);
            return Ok(Ingreso);
        }



        [HttpDelete("{ingreso_id}")]
        public IActionResult delete(int ingreso_id)
        {
            int cantidad = logica.delete(ingreso_id);
            return Ok(cantidad);
        }

    }
}

