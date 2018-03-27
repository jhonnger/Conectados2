using System;
using System.Collections.Generic;

namespace Conectados2.Models
{
    public partial class SubSeccion
    {
        public int IdSubSeccion { get; set; }
        public string Descripcion { get; set; }
        public int IdSeccion { get; set; }

        public Seccion IdSeccionNavigation { get; set; }
    }
}
