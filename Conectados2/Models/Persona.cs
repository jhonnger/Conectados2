using System;
using System.Collections.Generic;

namespace Conectados2.Models
{
    public partial class Persona
    {
        public Persona()
        {
            Patrullero = new HashSet<Patrullero>();
        }

        public long IdPersona { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string NumDoc { get; set; }
        public DateTime FecCreacion { get; set; }
        public DateTime FecModificacion { get; set; }
        public string UsuarioMod { get; set; }

        public Usuario Usuario { get; set; }
        public ICollection<Patrullero> Patrullero { get; set; }
    }
}
