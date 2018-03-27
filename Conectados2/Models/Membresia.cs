using System;
using System.Collections.Generic;

namespace Conectados2.Models
{
    public partial class Membresia
    {
        public Membresia()
        {
            ComiMuniMembresia = new HashSet<ComiMuniMembresia>();
        }

        public int IdMembresia { get; set; }
        public string Descripcion { get; set; }
        public int CantUsuarios { get; set; }
        public int DiasDuracion { get; set; }
        public decimal Costo { get; set; }
        public int LimiteReportesDia { get; set; }
        public int LimiteUsuarios { get; set; }
        public DateTime FecCreacion { get; set; }
        public DateTime FecModificacion { get; set; }
        public string UsuarioMod { get; set; }
        public bool Estado { get; set; }

        public ICollection<ComiMuniMembresia> ComiMuniMembresia { get; set; }
    }
}
