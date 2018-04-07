using System.Collections.Generic;
using Conectados2.Models;

namespace Conectados2.Servicio
{
   public interface UsuarioServicio : BaseServicio<Usuario, int>
    {
        List<Rol> obtenerRoles(int id);
    }
}
