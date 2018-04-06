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

        // GET: api/municipalidad
        [HttpGet]
        public RespuestaControlador GetMunicipalidad()
        {
            return RespuestaControlador.respuestaExito( municipalidadServicio.obtenerTodos());
        }

        // GET: api/municipalidad/5
        [HttpGet("{id}" )]
        public async Task<IActionResult> GetMunicipalidad([FromRoute] int id)
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

            return Ok(municipalidad);
        }

        // PUT: api/municipalidad/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMunicipalidad([FromRoute] int id, [FromBody] ComiMuni municipalidad)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != municipalidad.IdComiMuni)
            {
                return BadRequest();
            }

            _context.Entry(municipalidad).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MunicipalidadExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Municipalidad
        [HttpPost]
        public async Task<IActionResult> PostMunicipalidad([FromBody] ComiMuni municipalidad)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.ComiMuni.Add(municipalidad);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMunicipalidad", new { id = municipalidad.IdComiMuni }, municipalidad);
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