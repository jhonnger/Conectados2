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
    [Route("api/TipoDenuncia")]
    public class TipoDenunciaController : Controller
    {
        private readonly conectaDBContext _context;
        private readonly TipoDenunciaServicio tipoDenunciaServicioImpl;

         public TipoDenunciaController(TipoDenunciaServicio tipoDenunciaServicioImpl,
                                        conectaDBContext conectaDBContext)
        {
            this.tipoDenunciaServicioImpl = tipoDenunciaServicioImpl;
            this._context = conectaDBContext;
        }

        // GET: api/TipoDenuncia
        [HttpGet]
        public RespuestaControlador GetTipoDenuncia()
        {
            return RespuestaControlador.respuestaExito( tipoDenunciaServicioImpl.obtenerTodos());
        }

        // GET: api/TipoDenuncia/5
        [HttpGet("{id}" )]
        public async Task<IActionResult> GetTipoDenuncia([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tipoDenuncia = await _context.TipoDenuncia.SingleOrDefaultAsync(m => m.IdTipoDenuncia == id);

            if (tipoDenuncia == null)
            {
                return NotFound();
            }

            return Ok(tipoDenuncia);
        }

        // PUT: api/TipoDenuncia/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTipoDenuncia([FromRoute] int id, [FromBody] TipoDenuncia tipoDenuncia)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tipoDenuncia.IdTipoDenuncia)
            {
                return BadRequest();
            }

            _context.Entry(tipoDenuncia).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TipoDenunciaExists(id))
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

        // POST: api/TipoDenuncia
        [HttpPost]
        public async Task<IActionResult> PostTipoDenuncia([FromBody] TipoDenuncia tipoDenuncia)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.TipoDenuncia.Add(tipoDenuncia);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTipoDenuncia", new { id = tipoDenuncia.IdTipoDenuncia }, tipoDenuncia);
        }

        // DELETE: api/TipoDenuncia/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTipoDenuncia([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tipoDenuncia = await _context.TipoDenuncia.SingleOrDefaultAsync(m => m.IdTipoDenuncia == id);
            if (tipoDenuncia == null)
            {
                return NotFound();
            }

            _context.TipoDenuncia.Remove(tipoDenuncia);
            await _context.SaveChangesAsync();

            return Ok(tipoDenuncia);
        }

        private bool TipoDenunciaExists(int id)
        {
            return _context.TipoDenuncia.Any(e => e.IdTipoDenuncia == id);
        }
    }
}