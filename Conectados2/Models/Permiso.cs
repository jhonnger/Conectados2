using System;
using System.Collections.Generic;

namespace Conectados2.Models
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
