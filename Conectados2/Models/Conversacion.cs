using System;
using System.Collections.Generic;

namespace Conectados2.Models
{
    public partial class Conversacion
    {
        public Conversacion()
        {
            Mensaje = new HashSet<Mensaje>();
            Participantes = new HashSet<Participantes>();
        }

        public int IdConversacion { get; set; }
        public string Descripcion { get; set; }

        public ICollection<Mensaje> Mensaje { get; set; }
        public ICollection<Participantes> Participantes { get; set; }
    }
}
