using System;
using System.Collections.Generic;

namespace Conectados2.Models
{
    public partial class ComiMuniMembresia
    {
        public ComiMuniMembresia()
        {
            Pago = new HashSet<Pago>();
        }

        public int IdComiMuniMembresia { get; set; }
        public int IdMembresia { get; set; }
        public int IdComiMuni { get; set; }
        public int CantMeses { get; set; }
        public DateTime FecCreacion { get; set; }
        public DateTime FecModificacion { get; set; }
        public string UsuarioMod { get; set; }
        public bool Estado { get; set; }

        public ComiMuni IdComiMuniNavigation { get; set; }
        public Membresia IdMembresiaNavigation { get; set; }
        public ICollection<Pago> Pago { get; set; }
    }
}
