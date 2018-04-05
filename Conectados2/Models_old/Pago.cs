using System;
using System.Collections.Generic;

namespace Conectados2.Models
{
    public partial class Pago
    {
        public int IdPago { get; set; }
        public int IdComiMuniMembresia { get; set; }
        public decimal Monto { get; set; }
        public byte[] CodTransaccion { get; set; }
        public DateTime FecModificacion { get; set; }
        public DateTime FecCreacion { get; set; }
        public string UsuarioMod { get; set; }

        public ComiMuniMembresia IdComiMuniMembresiaNavigation { get; set; }
    }
}
