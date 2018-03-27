using System;
using System.Collections.Generic;

namespace Conectados2.Models
{
    public partial class PuntoSector
    {
        public int IdPuntoJurisdiccion { get; set; }
        public int IdJurisdiccion { get; set; }
        public decimal Longitud { get; set; }
        public decimal Latitud { get; set; }
        public int Orden { get; set; }

        public Jurisdiccion IdJurisdiccionNavigation { get; set; }
    }
}
