using System.Collections.Generic;
using Conectados2.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Conectados2.Repositorio.impl
{
    public class SectorRepositorioImpl : BaseRepositorioImpl<Sector, int>, SectorRepositorio
    {
        public SectorRepositorioImpl(conectaDBContext context) : base(context)
        {
        }

        public  override Sector obtener(int id)
        {
            
            return this._context.Sector
                .Include(sector => sector.TipoSector)
                .Include(sector => sector.PuntoSector)
                .SingleOrDefault(s => s.IdSector == id);
        }

        public ICollection<PuntoSector> obtenerPuntos(int id)
        {
            return  this._context.PuntoSector   
                .Where(s => s.IdSector == id).ToList();
             
        }

        public override  List<Sector> obtenerTodos(){
            
            List<Sector> sectores = this._context.Sector
                .Include(sector => sector.TipoSector)
                .ToList();

            return sectores;
            
        }
         public override void actualizar(Sector sector)
        {
            var sectorDB = _context.Sector
                            .Include(e => e.PuntoSector)
                            .Single(c => c.IdSector == sector.IdSector);

            
            _context.Entry(sector).CurrentValues.SetValues(sector);

             foreach (var puntos in sectorDB.PuntoSector.ToList()){
                 if (!sector.PuntoSector.Any(s => s.IdPuntoSector == puntos.IdPuntoSector))
                    _context.PuntoSector.Remove(puntos);
             }
             foreach (var newPuntos in sector.PuntoSector){
               
                    // Insert subFoos into the database that are not
                    // in the dbFoo.subFoo collection
                    sectorDB.PuntoSector.Add(newPuntos);
            }
            _context.SaveChanges();
        }
    }
}
