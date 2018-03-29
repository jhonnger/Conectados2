using System;
using System.Collections.Generic;

namespace Conectados2.Models
{
    public partial class Patrullero
    {
        public int IdPatrullero { get; set; }
        public string Placa { get; set; }
        public int IdPersona { get; set; }
        public int IdComiMuni { get; set; }

        public ComiMuni IdComiMuniNavigation { get; set; }
        public Persona IdPersonaNavigation { get; set; }
    }
}
