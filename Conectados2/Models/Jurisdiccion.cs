using System;
using System.Collections.Generic;

namespace Conectados2.Models
{
    public partial class Jurisdiccion
    {
        public Jurisdiccion()
        {
            ComiMuni = new HashSet<ComiMuni>();
            PuntoSector = new HashSet<PuntoSector>();
            Seccion = new HashSet<Seccion>();
        }

        public int IdJurisdiccion { get; set; }
        public string Nombre { get; set; }

        public ICollection<ComiMuni> ComiMuni { get; set; }
        public ICollection<PuntoSector> PuntoSector { get; set; }
        public ICollection<Seccion> Seccion { get; set; }
    }
}
