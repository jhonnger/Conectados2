using Conectados2.Helpers;
using Conectados2.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Conectados2.Repositorio.impl
{
    public class MunicipalidadRepositorioImpl : BaseRepositorioImpl<ComiMuni, int>, MunicipalidadRepositorio
    {
        public MunicipalidadRepositorioImpl(conectaDBContext context) : base(context)
        {
        }

        public override ComiMuni obtener(int id)
        {
            ComiMuni comiMuni = this._context.ComiMuni
                .Include(s => s.TipoComiMuni)
                .Include(s => s.IdSectorNavigation)
                .Include(s => s.Ubicacion)
                .SingleOrDefault(s => s.IdComiMuni == id);

            return comiMuni;
        }

        public override  List<ComiMuni> obtenerTodos(){
            
            List<ComiMuni> munis = this._context.ComiMuni
                .Include(muni => muni.TipoComiMuni)
                .ToList();

            return munis;
            
        }
        public override BusquedaPaginada<ComiMuni> obtenerPaginados(int? pagina, int cant)
        {
            var munis = this._context.ComiMuni
                .Include(muni => muni.TipoComiMuni)
                ;

            var results = PaginatedList<ComiMuni>.Create(munis.AsNoTracking(), pagina ?? 1, cant);
            var response = BusquedaPaginada<ComiMuni>.Create(results);

            return response;
        }

        public override void actualizar(ComiMuni muni)
        {

            var muniDB = _context.ComiMuni
                            .Include(e => e.Ubicacion)
                            .Single(c => c.IdComiMuni == muni.IdComiMuni);


            _context.Entry(muniDB).CurrentValues.SetValues(muni);
            muniDB.FecModificacion = DateTime.Now;

            _context.Entry(muniDB.Ubicacion).CurrentValues.SetValues(muni.Ubicacion);

            _context.SaveChanges();
        }

    }
}
