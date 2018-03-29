using Conectados2.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Conectados2.Servicio
{
   public interface BaseServicio <Entidad, key>
    {
        Entidad obtener(key id);

        void grabarTodos(List<Entidad> list);

        List<Entidad> obtenerTodos();

        RespuestaControlador crear(Entidad entidad);

        RespuestaControlador actualizar(Entidad entidad);

        RespuestaControlador eliminar(key entidadId);
    }
}
