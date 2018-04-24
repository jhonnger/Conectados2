using Conectados2.Helpers;
using Conectados2.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
                    .ThenInclude(p => p.PuntoSector)
                .Include(s => s.Ubicacion)
                .SingleOrDefault(s => s.IdComiMuni == id);

            comiMuni.IdSectorNavigation.PuntoSector = comiMuni.IdSectorNavigation
                                                    .PuntoSector.OrderBy(p => p.Orden).ToList();

            return comiMuni;
        }

        public override  List<ComiMuni> obtenerTodos(){
            
            List<ComiMuni> munis = this._context.ComiMuni
                .Include(muni => muni.TipoComiMuni)
                .ToList();

            return munis;
            
        }
        public async Task<ComiMuni> ObtenerPorIdUsuario(int i){
            var usuarioMuni = await this._context.UsuarioMuni
                            .FirstOrDefaultAsync(u => u.IdUsuario == i);

            return (this.obtener(usuarioMuni.IdMuni));
                            
        }
        public override BusquedaPaginada<ComiMuni> obtenerPaginados(int? pagina, int cant)
        {
            var munis = this._context.ComiMuni
                .Include(muni => muni.TipoComiMuni)
                .OrderByDescending(m => m.FecModificacion)
                ;

            var results = PaginatedList<ComiMuni>.Create(munis.AsNoTracking(), pagina ?? 1, cant);
            var response = BusquedaPaginada<ComiMuni>.Create(results);

            return response;
        }

        public override void actualizar(ComiMuni muni)
        {
            bool puntosNuevos = false;

            var muniDB = _context.ComiMuni
                            .Include(e => e.Ubicacion)
                            .Include(m => m.IdSectorNavigation)
                                .ThenInclude(s => s.PuntoSector)
                            .Single(c => c.IdComiMuni == muni.IdComiMuni);


            _context.Entry(muniDB).CurrentValues.SetValues(muni);
            muniDB.FecModificacion = DateTime.Now;

            _context.Entry(muniDB.Ubicacion).CurrentValues.SetValues(muni.Ubicacion);

            var sector = muni.IdSectorNavigation;
            var sectorDB = muniDB.IdSectorNavigation;
            foreach (var puntos in sectorDB.PuntoSector.ToList()){
                 if (!sector.PuntoSector.Any(s => s.IdPuntoSector == puntos.IdPuntoSector)){
                     puntosNuevos = true;
                     _context.PuntoSector.Remove(puntos);
                 }
            }
            if(!puntosNuevos){
                foreach (var puntos in sector.PuntoSector.ToList()){
                    if(puntos.IdPuntoSector == 0){
                        puntosNuevos = true;
                        break;
                    }
                }
            }
            
            if(puntosNuevos){
                foreach (var newPuntos in sector.PuntoSector){
               
                    // Insert subFoos into the database that are not
                    // in the dbFoo.subFoo collection
                  
                       sectorDB.PuntoSector.Add(newPuntos);
                  
                        // Update subFoos that are in the newFoo.SubFoo collection                               
                }
            } 

            _context.SaveChanges();
        }

    }
}
