using Conectados2.Models;

namespace Conectados2.Repositorio.impl
{
    public class TipoMuniRepositorioImpl : BaseRepositorioImpl<TipoMuni, int>, TipoMuniRepositorio
    {
        public TipoMuniRepositorioImpl(conectaDBContext context) : base(context)
        {
        }

        public override TipoMuni obtener(int id)
        {
            throw new System.NotImplementedException();
        }
    }
}
