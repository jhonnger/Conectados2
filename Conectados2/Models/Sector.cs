using System;
using System.Collections.Generic;

namespace Conectados2.Models
{
    public partial class Sector
    {
        public Sector()
        {
            ComiMuni = new HashSet<ComiMuni>();
           // InverseIdSectorPadreNavigation = new HashSet<Sector>();
            PuntoSector = new HashSet<PuntoSector>();
        }

        public int IdSector { get; set; }
        public string Nombre { get; set; }
        public int IdTipoSector { get; set; }
        public int? IdSectorPadre { get; set; }

       // public Sector IdSectorPadreNavigation { get; set; }
        public TipoSector TipoSector { get; set; }
        public ICollection<ComiMuni> ComiMuni { get; set; }
        //public ICollection<Sector> InverseIdSectorPadreNavigation { get; set; }

        public ICollection<Sector> Sectores { get; set; }
        public ICollection<PuntoSector> PuntoSector { get; set; }
    }
}