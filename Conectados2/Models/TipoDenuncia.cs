using System;
using System.Collections.Generic;

namespace Conectados2.Models
{
    public partial class TipoDenuncia
    {
        public TipoDenuncia()
        {
            Denuncia = new HashSet<Denuncia>();
        }

        public int IdTipoDenuncia { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string UsuarioMod { get; set; }
        public DateTime FecCreacion { get; set; }
        public DateTime FechaModificacion { get; set; }
        public bool Estado { get; set; }

        public ICollection<Denuncia> Denuncia { get; set; }
    }
}
