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
    [Route("api/Sector")]
    public class SectorController : Controller
    {
        
        private readonly SectorServicio sectorServicio;

         public SectorController(SectorServicio sectorServicio)
        {
            this.sectorServicio = sectorServicio;
        }

       

        [HttpGet("{id}")]
        public RespuestaControlador GetSector([FromRoute] int id)
        {
            return RespuestaControlador.respuestaExito(sectorServicio.obtener(id));
        }

         // GET: api/sector
        [HttpGet]
        public RespuestaControlador GetSectores()
        {
            return RespuestaControlador.respuestaExito( sectorServicio.obtenerTodos());
        }    
    }
}