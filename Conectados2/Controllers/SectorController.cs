using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Conectados2.Models;
using Conectados2.Helpers;
using Conectados2.Servicio.impl;
using Conectados2.Servicio;
using System.Diagnostics;
using Microsoft.AspNetCore.Authorization;

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
         [Authorize(Roles = "Admin")]
        [HttpGet]
        public RespuestaControlador GetSectores()
        {
            Debug.Write("Holi"+ HttpContext.User.Identity.Name);
            return RespuestaControlador.respuestaExito( sectorServicio.obtenerTodos());
        }

        // POST: api/Municipalidad
        [HttpPost]
        public RespuestaControlador PostSector([FromBody] Sector sector)
        {
            if (!ModelState.IsValid)
            {
                return RespuestaControlador.respuetaError("Parametro incorrecto");
            }           

            return RespuestaControlador.respuestaExito(sectorServicio.crear(sector));
        }

        // PUT: api/sector
        [HttpPut]
        public  RespuestaControlador PutSector([FromBody] Sector sector)
        {
            if (!ModelState.IsValid)
            {
                 return RespuestaControlador.respuetaError("Parametro incorrecto");
            }

            var sectorUpd = sectorServicio.actualizar(sector);
            return RespuestaControlador.respuestaExito(sectorUpd);
        }
    }
}