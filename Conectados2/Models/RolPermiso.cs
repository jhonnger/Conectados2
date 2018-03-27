using System;
using System.Collections.Generic;

namespace Conectados2.Models
{
    public partial class RolPermiso
    {
        public int IdRolPermiso { get; set; }
        public long IdRol { get; set; }
        public int IdPermiso { get; set; }

        public Permiso IdPermisoNavigation { get; set; }
        public Rol IdRolNavigation { get; set; }
    }
}
