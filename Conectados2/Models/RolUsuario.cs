using System;
using System.Collections.Generic;

namespace Conectados2.Models
{
    public partial class RolUsuario
    {
        public int IdRolUsuario { get; set; }
        public string Descripcion { get; set; }
        public int IdRol { get; set; }
        public int IdUsuario { get; set; }

        public Rol IdRolNavigation { get; set; }
        public Usuario IdUsuarioNavigation { get; set; }
    }
}
