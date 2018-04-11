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
    
    public class SectorController : Controller
    {
        
        private readonly SectorServicio sectorServicio;

         public SectorController(SectorServicio sectorServicio)
        {
            this.sectorServicio = sectorServicio;
        }

       // [Route("/api/jurisdiccion/{id}")]
        [HttpGet("/api/jurisdiccion/{id}")]
        public RespuestaControlador GetJurisdiccion([FromRoute] int id)
        {
            return RespuestaControlador.respuestaExito(sectorServicio.obtenerJurisdiccion(id));
        }

        //[Route("/api/sector/{id}")]
        [HttpGet("/api/sector/{id}")]
        public RespuestaControlador GetSector([FromRoute] int id)
        {
            return RespuestaControlador.respuestaExito(sectorServicio.obtener(id));
        }

        
         // GET: api/sector
         [Route("api/jurisdiccion/pagina/{page}/cant/{cant}")]
         [Authorize(Roles = "Admin")]
        [HttpGet]
        public RespuestaControlador GetJurisdicciones([FromRoute] int page, [FromRoute] int cant)
        {
            return RespuestaControlador.respuestaExito( sectorServicio.obtenerPaginadosJurisdiccion(page, cant));
        }

        // POST: api/Municipalidad
        [Route("api/Sector")]
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
        [Route("api/Sector")]
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