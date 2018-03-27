using System;
using System.Collections.Generic;

namespace Conectados2.Models
{
    public partial class Seccion
    {
        public Seccion()
        {
            SubSeccion = new HashSet<SubSeccion>();
        }

        public int IdSeccion { get; set; }
        public string Descripcion { get; set; }
        public int IdJurisdiccion { get; set; }

        public Jurisdiccion IdJurisdiccionNavigation { get; set; }
        public ICollection<SubSeccion> SubSeccion { get; set; }
    }
}
