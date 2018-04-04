using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Conectados2.Models;
using Conectados2.Helpers;
using Conectados2.Servicio.impl;
using Conectados2.Servicio;

namespace Conectados2.Controllers
{
    [Produces("application/json")]
    [Route("api/TipoMuni")]
    public class TipoMuniController : Controller
    {
        private readonly conectaDBContext _context;
        private readonly TipoMuniServicio tipoMuniServicio;

         public TipoMuniController(TipoMuniServicio tipoMuniServicio)
        {
            this.tipoMuniServicio = tipoMuniServicio;
        }

        // GET: api/tipoMuni
        [HttpGet]
        public RespuestaControlador GetTipoMuni()
        {
            return RespuestaControlador.respuestaExito( tipoMuniServicio.obtenerTodos());
        }    
    }
}