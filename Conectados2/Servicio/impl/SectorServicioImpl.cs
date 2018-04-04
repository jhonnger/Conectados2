using Conectados2.Models;
using Conectados2.Repositorio;
using Conectados2.Repositorio.impl;

namespace Conectados2.Servicio.impl
{
    public class SectorServicioImpl: BaseServicioImpl<Sector, int>, SectorServicio
    {
         public SectorServicioImpl(SectorRepositorio sectorRepositorio) 
            : base(sectorRepositorio)
        {
        }
    }
}
