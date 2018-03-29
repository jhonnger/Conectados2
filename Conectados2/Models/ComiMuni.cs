using System;
using System.Collections.Generic;

namespace Conectados2.Models
{
    public partial class ComiMuni
    {
        public ComiMuni()
        {
            ComiMuniMembresia = new HashSet<ComiMuniMembresia>();
            Configuracion = new HashSet<Configuracion>();
            Patrullero = new HashSet<Patrullero>();
            UsuarioMuni = new HashSet<UsuarioMuni>();
        }

        public int IdComiMuni { get; set; }
        public int IdTipoComiMuni { get; set; }
        public int IdJurisdiccion { get; set; }
        public int IdUbicacion { get; set; }
        public int IdMembresia { get; set; }
        public DateTime FecCreacion { get; set; }
        public DateTime FecModificacion { get; set; }
        public string UsuarioMod { get; set; }
        public bool Estado { get; set; }
        public string Nombre { get; set; }

        public Jurisdiccion IdJurisdiccionNavigation { get; set; }
        public TipoMuni IdTipoComiMuniNavigation { get; set; }
        public ICollection<ComiMuniMembresia> ComiMuniMembresia { get; set; }
        public ICollection<Configuracion> Configuracion { get; set; }
        public ICollection<Patrullero> Patrullero { get; set; }
        public ICollection<UsuarioMuni> UsuarioMuni { get; set; }
    }
}
