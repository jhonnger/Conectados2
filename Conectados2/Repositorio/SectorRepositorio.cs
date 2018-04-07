using System.Collections.Generic;
using Conectados2.Models;

namespace Conectados2.Repositorio
{
    public interface SectorRepositorio : BaseRepositorio<Sector, int>
    {
        ICollection<PuntoSector> obtenerPuntos(int id);
    }
}