using System.Collections.Generic;
using System.Linq;
using Conectados2.Models;
using Microsoft.EntityFrameworkCore;

namespace Conectados2.Repositorio.impl
{
    public class UsuarioRepositorioImpl : BaseRepositorioImpl<Usuario, int>, UsuarioRepositorio
    {
        public UsuarioRepositorioImpl(conectaDBContext context) : base(context)
        {
        }

        public override Usuario obtener(int id)
        {
            throw new System.NotImplementedException();
        }

        public List<Rol> obtenerRoles(int id)
        {
            IList<RolUsuario> rolesUsuario = this._context.Usuario
                .Include(u => u.RolUsuario)
                .ThenInclude(rol => rol.IdRolNavigation)
                .SingleOrDefault(u => u.IdUsuario == id)
                .RolUsuario.ToList();

            List<Rol> roles = new List<Rol>();

            foreach(RolUsuario rolUsuario in rolesUsuario){
                roles.Add(rolUsuario.IdRolNavigation);
            }

            return roles;
        }
    }
}
