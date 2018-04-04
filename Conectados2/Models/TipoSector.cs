using System;
using System.Collections.Generic;

namespace Conectados2.Models
{
    public partial class TipoSector
    {
        public TipoSector()
        {
            Sector = new HashSet<Sector>();           
        }
        public int IdTipoSector { get; set; }
        public string Nombre { get; set; }

        public ICollection<Sector> Sector { get; set; }
    }
}
