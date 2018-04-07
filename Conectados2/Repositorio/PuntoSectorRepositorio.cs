using Conectados2.Models;

namespace Conectados2.Repositorio
{
    public interface PuntoSectorRepositorio : BaseRepositorio<PuntoSector, int>
    {
        void eliminar(PuntoSector puntoSector);
    }
}