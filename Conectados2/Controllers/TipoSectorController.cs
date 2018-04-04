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
    [Route("api/TipoSector")]
    public class TipoSectorController : Controller
    {
        private readonly TipoSectorServicio tipoSectorServicio;

         public TipoSectorController(TipoSectorServicio tipoSectorServicio)
        {
            this.tipoSectorServicio = tipoSectorServicio;
        }

        // GET: api/tipoSector
        [HttpGet]
        public RespuestaControlador GetTipoSector()
        {
            return RespuestaControlador.respuestaExito( tipoSectorServicio.obtenerTodos());
        }    
    }
}