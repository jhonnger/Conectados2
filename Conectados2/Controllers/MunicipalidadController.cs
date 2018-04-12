using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Conectados2.Models;
using Conectados2.Helpers;
using Conectados2.Servicio.impl;
using Conectados2.Servicio;
using Microsoft.AspNetCore.Authorization;

namespace Conectados2.Controllers
{
    [Produces("application/json")]
    [Route("api/Municipalidad")]
    public class MunicipalidadController : Controller
    {
        private readonly conectaDBContext _context;
        private readonly MunicipalidadServicio municipalidadServicio;

         public MunicipalidadController(MunicipalidadServicio municipalidadServicio, conectaDBContext conectaDB)
        {
            this.municipalidadServicio = municipalidadServicio;
            this._context = conectaDB;
        }

        [HttpGet]
        [Route("/api/Municipalidad/pagina/{pagina}/cant/{cant}")]
        public RespuestaControlador GetMunicipalidadPaginada([FromRoute] int pagina, [FromRoute] int cant)
        {
            return RespuestaControlador.respuestaExito( municipalidadServicio.obtenerPaginados(pagina, cant));
        }

        // GET: api/municipalidad
        [HttpGet]
        public RespuestaControlador GetMunicipalidad()
        {
            return RespuestaControlador.respuestaExito( municipalidadServicio.obtenerTodos());
        }

        // GET: api/municipalidad/5
        [HttpGet("{id}" )]
        public RespuestaControlador GetMunicipalidad([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return RespuestaControlador.respuetaError(ModelState.ToString());
            }

            var municipalidad = this.municipalidadServicio.obtener(id);

            if (municipalidad == null)
            {
                return RespuestaControlador.respuetaError("Entidad no existe o no está disponible");
            }

            return RespuestaControlador.respuestaExito(municipalidad);
        }

        // PUT: api/municipalidad/5
        [Authorize(Roles = "Admin")]
        [HttpPut()]
        public RespuestaControlador PutMunicipalidad([FromBody] ComiMuni municipalidad)
        {
           
           

            if (!ModelState.IsValid)
            {
                return RespuestaControlador.respuetaError("Parametro incorrecto");
            }
            municipalidad.FecModificacion = DateTime.Now;
            municipalidad.UsuarioMod = User.Identity.Name;
           // _context.Entry(municipalidad).State = EntityState.Modified;

            var sectorUpd = municipalidadServicio.actualizar(municipalidad);
            return RespuestaControlador.respuestaExito(sectorUpd);

            //try
            //{
            //    await _context.SaveChangesAsync();
            //}
            //catch (DbUpdateConcurrencyException)
            //{
            //    if (!MunicipalidadExists(municipalidad.IdComiMuni))
            //    {
            //        return NotFound();
            //    }
            //    else
            //    {
            //        throw;
            //    }
            //}

            //return NoContent();
        }

        // POST: api/Municipalidad
        [HttpPost]
        public RespuestaControlador PostMunicipalidad([FromBody] ComiMuni municipalidad)
        {
            if (!ModelState.IsValid)
            {
                return RespuestaControlador.respuetaError("Parametro incorrecto");
            }

            municipalidad.UsuarioMod = HttpContext.User.Identity.Name;

            return municipalidadServicio.crear(municipalidad);
        }

        // DELETE: api/municipalidad/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMunicipalidad([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var municipalidad = await _context.ComiMuni.SingleOrDefaultAsync(m => m.IdComiMuni == id);
            if (municipalidad == null)
            {
                return NotFound();
            }

            _context.ComiMuni.Remove(municipalidad);
            await _context.SaveChangesAsync();

            return Ok(municipalidad);
        }

        private bool MunicipalidadExists(int id)
        {
            return _context.ComiMuni.Any(e => e.IdComiMuni == id);
        }
    }
}