using System;
using System.Collections.Generic;

namespace Conectados2.Models
{
    public partial class Configuracion
    {
        public int IdConfiguracion { get; set; }
        public string ColorPrimario { get; set; }
        public int CamposReporte { get; set; }
        public int IdComiMuni { get; set; }

        public ComiMuni IdComiMuniNavigation { get; set; }
    }
}
