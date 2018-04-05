using System;
using System.Collections.Generic;

namespace Conectados2.Models
{
    public partial class TipoMuni
    {
        public TipoMuni()
        {
            ComiMuni = new HashSet<ComiMuni>();
        }

        public int IdTipoMuni { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }

        public ICollection<ComiMuni> ComiMuni { get; set; }
    }
}
