using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using IM_BACKEND._02_Logica;
using IM_BACKEND.DBInversionesMontiel;

namespace IM_BACKEND.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoDocumentoController : ControllerBase
    {
        TipoDocumentoLogica logica = new TipoDocumentoLogica();


        [HttpGet]
        public IActionResult get()
        {
            List<TipoDocumento> TipoDocumentos = logica.getAll();
            return Ok(TipoDocumentos);
        }


        [HttpGet("{documento_id}")]
        public IActionResult getByid(int documento_id)
        {
            TipoDocumento TipoDocumento = logica.getById(documento_id);
            return Ok(TipoDocumento);
        }

        [HttpPost]
        public IActionResult create(TipoDocumento request)
        {
            TipoDocumento TipoDocumento = logica.create(request);
            return Ok(TipoDocumento);
        }


        [HttpPut]
        public IActionResult update(TipoDocumento request)
        {
            TipoDocumento TipoDocumento = logica.update(request);
            return Ok(TipoDocumento);
        }



        [HttpDelete("{documento_id}")]
        public IActionResult delete(int documento_id)
        {
            int cantidad = logica.delete(documento_id);
            return Ok(cantidad);
        }

    }
}
