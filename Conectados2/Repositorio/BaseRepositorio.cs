using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Conectados2.Repositorio
{
    public interface BaseRepositorio<Entidad, key>
    {
        Entidad obtener(key id);

        List<Entidad> obtenerTodos();

        List<Entidad> obtenerPaginados(int? pagina, int cant);

        void actualizar(Entidad entidad);

        void crear(Entidad entidad);

        void grabarTodos(List<Entidad> list);

        void removeTracking(Entidad entidad);

    }
}
