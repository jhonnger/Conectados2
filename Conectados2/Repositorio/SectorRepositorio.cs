using System.Collections.Generic;
using Conectados2.Helpers;
using Conectados2.Models;

namespace Conectados2.Repositorio
{
    public interface SectorRepositorio : BaseRepositorio<Sector, int>
    {
        ICollection<PuntoSector> obtenerPuntos(int id);
        
        Sector ObtenerJurisdiccion(int id);

        BusquedaPaginada<Sector> obtenerPaginadosJurisdiccion(int? pagina, int cant);
    }
}