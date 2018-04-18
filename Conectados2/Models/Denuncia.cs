using System;
using System.Collections.Generic;

namespace Conectados2.Models
{
    public partial class Denuncia
    {
        public int IdDenuncia { get; set; }
        public int IdTipoDenuncia { get; set; }
        public int IdUsuario { get; set; }
        public int IdEstadoDenuncia { get; set; }
        public int IdPosicionDenuncia { get; set; }
        public int IdPosicionUsuario { get; set; }
        public string Descripcion { get; set; }
        public DateTime FecDenuncia { get; set; }
        public string Navegador { get; set; }
        public string Dispositivo { get; set; }
        public string UsuarioMod { get; set; }
        public DateTime FecModificacion { get; set; }
        public DateTime FecCreacion { get; set; }
        public bool Estado { get; set; }

        public EstadoDenuncia IdEstadoDenunciaNavigation { get; set; }
        public Ubicacion IdPosicionDenunciaNavigation { get; set; }
        public Ubicacion IdPosicionUsuarioNavigation { get; set; }
        public TipoDenuncia IdTipoDenunciaNavigation { get; set; }
        public Usuario IdUsuarioNavigation { get; set; }
    }
}
