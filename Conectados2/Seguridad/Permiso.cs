using System;
using System.Collections.Generic;

namespace Conectados2.Seguridad
{
    public partial class Permiso
    {
        public Permiso()
        {
            RolPermiso = new HashSet<RolPermiso>();
        }

        public int IdPermiso { get; set; }
        public string Descripcion { get; set; }

        public ICollection<RolPermiso> RolPermiso { get; set; }
    }
}
