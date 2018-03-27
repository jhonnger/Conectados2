﻿using System;
using System.Collections.Generic;

namespace Conectados2.Models
{
    public partial class Rol
    {
        public Rol()
        {
            RolPermiso = new HashSet<RolPermiso>();
            RolUsuario = new HashSet<RolUsuario>();
        }

        public long IdRol { get; set; }
        public string Descripcion { get; set; }

        public ICollection<RolPermiso> RolPermiso { get; set; }
        public ICollection<RolUsuario> RolUsuario { get; set; }
    }
}
