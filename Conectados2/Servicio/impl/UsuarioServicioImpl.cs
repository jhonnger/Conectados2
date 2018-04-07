using System.Collections.Generic;
using Conectados2.Models;
using Conectados2.Repositorio;
using Conectados2.Repositorio.impl;

namespace Conectados2.Servicio.impl
{
    public class UsuarioServicioImpl: BaseServicioImpl<Usuario, int>, UsuarioServicio
    {
         public UsuarioServicioImpl(UsuarioRepositorio usuarioRepositorio) 
            : base(usuarioRepositorio)
        {
        }

        public List<Rol> obtenerRoles(int id)
        {
            return ((UsuarioRepositorio)this.baseRepositorio).obtenerRoles(id);
        }
    }
}
