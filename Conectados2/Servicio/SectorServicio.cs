using Conectados2.Models;
using System.Collections.Generic;

namespace Conectados2.Servicio
{
   public interface SectorServicio : BaseServicio<Sector, int>
    {
        Sector obtenerJurisdiccion(int id);

        List<Sector> obtenerPaginadosJurisdiccion(int? pagina, int cantidad);
    }
}
