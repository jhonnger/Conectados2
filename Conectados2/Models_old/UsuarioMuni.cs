using System;
using System.Collections.Generic;

namespace Conectados2.Models
{
    public partial class UsuarioMuni
    {
        public int IdUsuarioMuni { get; set; }
        public int IdUsuario { get; set; }
        public int IdMuni { get; set; }

        public ComiMuni IdMuniNavigation { get; set; }
        public Usuario IdUsuarioNavigation { get; set; }
    }
}
