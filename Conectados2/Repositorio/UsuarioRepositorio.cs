using System.Collections.Generic;
using Conectados2.Models;

namespace Conectados2.Repositorio
{
    public interface UsuarioRepositorio : BaseRepositorio<Usuario, int>
    {
        List<Rol> obtenerRoles(int id);
    }

}