using Conectados2.Models;
using Conectados2.Repositorio;
using Conectados2.Repositorio.impl;

namespace Conectados2.Servicio.impl
{
    public class TipoMuniServicioImpl: BaseServicioImpl<TipoMuni, int>, TipoMuniServicio
    {
         public TipoMuniServicioImpl(TipoMuniRepositorio tipoMuniRepositorio) 
            : base(tipoMuniRepositorio)
        {
        }
    }
}
