using Conectados2.Models;

namespace Conectados2.Repositorio.impl
{
    public class TipoSectorRepositorioImpl : BaseRepositorioImpl<TipoSector, int>, TipoSectorRepositorio
    {
        public TipoSectorRepositorioImpl(conectaDBContext context) : base(context)
        {
        }

        public override TipoSector obtener(int id)
        {
            throw new System.NotImplementedException();
        }
    }
}
