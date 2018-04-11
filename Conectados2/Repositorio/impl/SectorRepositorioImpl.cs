using System.Collections.Generic;
using Conectados2.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Conectados2.Helpers;

namespace Conectados2.Repositorio.impl
{
    public class SectorRepositorioImpl : BaseRepositorioImpl<Sector, int>, SectorRepositorio
    {
        public SectorRepositorioImpl(conectaDBContext context) : base(context)
        {
        }

        public  override Sector obtener(int id)
        {
            Sector sector = this._context.Sector
                .Include(s => s.TipoSector)
                .Include(s => s.PuntoSector)
                .SingleOrDefault(s => s.IdSector == id);
            
            return sector;
        }
        

        public ICollection<PuntoSector> obtenerPuntos(int id)
        {
            return  this._context.PuntoSector   
                .Where(s => s.IdSector == id).ToList();
             
        }

        public override  List<Sector> obtenerTodos(){
            
            List<Sector> sectores = this._context.Sector
                .Include(sector => sector.TipoSector)
                .Where(s => s.TipoSector.Nombre == "Jurisdiccion")
                .ToList();

            return sectores;
            
        }
         public override void actualizar(Sector sector)
        {
            bool puntosNuevos = false;
            var sectorDB = _context.Sector
                            .Include(e => e.PuntoSector)
                            .Single(c => c.IdSector == sector.IdSector);

            
            _context.Entry(sectorDB).CurrentValues.SetValues(sector);

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

        public Sector ObtenerJurisdiccion(int id)
        {
            Sector sector = this._context.Sector
                .Include(s => s.TipoSector)
                .Include(s => s.PuntoSector)
                .SingleOrDefault(s => s.IdSector == id);

            List<Sector> secciones = this._context.Sector
                .Include(s => s.PuntoSector)
                .Include(s => s.TipoSector)
                .Where(s => (s.TipoSector.Nombre == "Seccion" && s.IdSectorPadre == sector.IdSector))
                .ToList();

            sector.Sectores = secciones;

            return sector;
        }

        public PaginatedList<Sector> obtenerPaginadosJurisdiccion(int? pagina, int cant)
        {
            
            var sectores = this._context.Sector
                .Include(sector => sector.TipoSector)
                .Where(s => s.TipoSector.Nombre == "Jurisdiccion");



            return PaginatedList<Sector>.Create(sectores.AsNoTracking(), pagina ?? 1, cant);

        }
        
    }
}
