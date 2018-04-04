using Conectados2.Models;
using Conectados2.Repositorio;
using Conectados2.Repositorio.impl;

namespace Conectados2.Servicio.impl
{
    public class TipoSectorServicioImpl: BaseServicioImpl<TipoSector, int>, TipoSectorServicio
    {
         public TipoSectorServicioImpl(TipoSectorRepositorio jurisdiccionRepositorio) 
            : base(jurisdiccionRepositorio)
        {
        }
    }
}
