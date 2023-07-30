using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using IM_BACKEND._02_Logica;
using IM_BACKEND.DBInversionesMontiel;
using IM_BACKEND._05_Model;

namespace IM_BACKEND.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProveedorController : ControllerBase
    {
        ProveedorLogica logica = new ProveedorLogica();


        [HttpGet]
        public IActionResult get()
        {
            List<VistaProveedor> Proveedors = logica.getAllDetallado();
            return Ok(Proveedors);
        }


        [HttpGet("{proveedor_id}")]
        public IActionResult getByid(int proveedor_id)
        {
            Proveedor Proveedor = logica.getById(proveedor_id);
            return Ok(Proveedor);
        }

        [HttpPost]
        public IActionResult create(Proveedor request)
        {
            Proveedor Proveedor = logica.create(request);
            return Ok(Proveedor);
        }

        [HttpPost("filtro")]
        public IActionResult Filtrar([FromBody] FilterRequest request)
        {
            FilterResponse<VistaProveedor> Proveedor = logica.ListarPorFiltro(request);
            return Ok(Proveedor);
        }


        [HttpPut]
        public IActionResult update(Proveedor request)
        {
            Proveedor Proveedor = logica.update(request);
            return Ok(Proveedor);
        }



        [HttpDelete("{proveedor_id}")]
        public IActionResult delete(int proveedor_id)
        {
            int cantidad = logica.delete(proveedor_id);
            return Ok(cantidad);
        }

    }
}
