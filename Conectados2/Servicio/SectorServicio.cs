using Conectados2.Helpers;
using Conectados2.Models;

namespace Conectados2.Servicio
{
   public interface SectorServicio : BaseServicio<Sector, int>
    {
        Sector obtenerJurisdiccion(int id);

        BusquedaPaginada<Sector> obtenerPaginadosJurisdiccion(int? pagina, int cantidad);
    }
}
