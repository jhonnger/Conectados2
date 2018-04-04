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
                .SingleOrDefault(s => s.IdSector == id);
        }

        public override  List<Sector> obtenerTodos(){
            
            List<Sector> sectores = this._context.Sector
                .Include(sector => sector.TipoSector)
                .ToList();

            return sectores;
            
        }
    }
}
