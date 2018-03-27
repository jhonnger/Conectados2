using System;
using System.Collections.Generic;

namespace Conectados2.Seguridad
{
    public partial class RolUsuario
    {
        public int IdRolUsuario { get; set; }
        public string Descripcion { get; set; }
        public long IdRol { get; set; }
        public long IdUsuario { get; set; }

        public Rol IdRolNavigation { get; set; }
        public Usuario IdUsuarioNavigation { get; set; }
    }
}
