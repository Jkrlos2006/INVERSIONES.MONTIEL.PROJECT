using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using IM_BACKEND._02_Logica;
using IM_BACKEND.DBInversionesMontiel;
using IM_BACKEND._05_Model;

namespace IM_BACKEND.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoController : ControllerBase
    {
        ProductoLogica logica = new ProductoLogica();


        [HttpGet]
        public IActionResult get()
        {
            List<Producto> Productos = logica.getAll();
            return Ok(Productos);
        }


        [HttpGet("{id}")]
        public IActionResult getByid(int id)
        {
            Producto Producto = logica.getById(id);
            return Ok(Producto);
        }

        [HttpPost]
        public IActionResult create(Producto request)
        {
            Producto Producto = logica.create(request);
            return Ok(Producto);
        }


        [HttpPost("filtro")]
        public IActionResult Filtrar([FromBody] FilterRequest request)
        {
            FilterResponse<Producto> Producto = logica.ListarPorFiltro(request);
            return Ok(Producto);
        }


        [HttpPut]
        public IActionResult update(Producto request)
        {
            Producto Producto = logica.update(request);
            return Ok(Producto);
        }



        [HttpDelete("{id}")]
        public IActionResult delete(int id)
        {
            int cantidad = logica.delete(id);
            return Ok(cantidad);
        }

    }
}
