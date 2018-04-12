using System;
using System.Collections.Generic;

namespace Conectados2.Models
{
    public partial class Ubicacion
    {
        public Ubicacion()
        {
            DenunciaIdPosicionDenunciaNavigation = new HashSet<Denuncia>();
            ComiMuni = new HashSet<ComiMuni>();
            DenunciaIdPosicionUsuarioNavigation = new HashSet<Denuncia>();
        }

        public int IdUbicacion { get; set; }
        public decimal Latitud { get; set; }
        public decimal Longitud { get; set; }
        public string Descripcion { get; set; }

        public ICollection<Denuncia> DenunciaIdPosicionDenunciaNavigation { get; set; }
        public ICollection<Denuncia> DenunciaIdPosicionUsuarioNavigation { get; set; }
        public ICollection<ComiMuni> ComiMuni { get; set; }
    }
}
