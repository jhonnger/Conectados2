using System;
using System.Collections.Generic;

namespace Conectados2.Models
{
    public partial class PuntoSector
    {
        public int IdPuntoSector { get; set; }
        public int IdSector { get; set; }
        public decimal Longitud { get; set; }
        public decimal Latitud { get; set; }
        public int Orden { get; set; }

        public Sector IdSectorNavigation { get; set; }
    }
}
