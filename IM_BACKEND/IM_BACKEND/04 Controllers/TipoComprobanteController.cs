using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using IM_BACKEND._02_Logica;
using IM_BACKEND.DBInversionesMontiel;

namespace IM_BACKEND.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoComprobanteController : ControllerBase
    {
        TipoComprobanteLogica logica = new TipoComprobanteLogica();
        [HttpGet]
        public IActionResult get()
        {
            List<TipoComprobante> TipoComprobantes = logica.getAll();
            return Ok(TipoComprobantes);
        }
        [HttpGet("{comprobante_id}")]
        public IActionResult getByid(int comprobante_id)
        {
            TipoComprobante TipoComprobante = logica.getById(comprobante_id);
            return Ok(TipoComprobante);
        }
        [HttpPost]
        public IActionResult create(TipoComprobante request)
        {
            TipoComprobante TipoComprobante = logica.create(request);
            return Ok(TipoComprobante);
        }
        [HttpPut]
        public IActionResult update(TipoComprobante request)
        {
            TipoComprobante TipoComprobante = logica.update(request);
            return Ok(TipoComprobante);
        }
        [HttpDelete("{documento_id}")]
        public IActionResult delete(int comprobante_id)
        {
            int cantidad = logica.delete(comprobante_id);
            return Ok(cantidad);
        }
    }
}
